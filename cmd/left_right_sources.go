// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/pb33f/doctor/terminal"
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/libopenapi/index"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
)

type comparisonSource struct {
	Display   string
	RootBytes []byte
	DocConfig *datamodel.DocumentConfiguration
	Cleanup   func()
}

func newComparisonDocConfig(opts summaryOpts) *datamodel.DocumentConfiguration {
	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.IgnoreArrayCircularReferences = true
	docConfig.IgnorePolymorphicCircularReferences = true
	docConfig.ExcludeExtensionRefs = !opts.extRefs
	docConfig.Logger = terminal.NewPrettyLogger(&terminal.PrettyHandlerOptions{
		Level:      slog.LevelError,
		TimeFormat: terminal.TimeFormatDateTime,
	})
	if opts.remote {
		docConfig.AllowRemoteReferences = true
	}
	return docConfig
}

func resolveBaseOverride(base string) (string, *url.URL, error) {
	if base == "" {
		return "", nil, nil
	}
	if parsed, err := url.Parse(base); err == nil && parsed != nil && parsed.Scheme != "" && parsed.Host != "" {
		parsed.Path = path.Dir(parsed.Path)
		parsed.RawQuery = ""
		parsed.Fragment = ""
		return "", parsed, nil
	}
	absBase, err := filepath.Abs(base)
	if err != nil {
		return "", nil, fmt.Errorf("cannot resolve base path '%s': %w", base, err)
	}
	return absBase, nil, nil
}

func resolveComparisonSource(raw string, opts summaryOpts) (comparisonSource, error) {
	if revision, filePath, ok := parseGitRef(raw); ok {
		return resolveGitRefSource(raw, revision, filePath, opts)
	}
	if isHTTPURL(raw) {
		return resolveURLSource(raw, opts)
	}
	return resolveLocalFileSource(raw, opts)
}

func resolveLocalFileSource(raw string, opts summaryOpts) (comparisonSource, error) {
	absPath, err := filepath.Abs(raw)
	if err != nil {
		return comparisonSource{}, fmt.Errorf("cannot resolve file '%s': %w", raw, err)
	}
	bits, err := os.ReadFile(absPath)
	if err != nil {
		return comparisonSource{}, fmt.Errorf("cannot read file '%s': %w", raw, err)
	}
	if len(bits) == 0 {
		return comparisonSource{}, fmt.Errorf("file '%s' is empty", raw)
	}

	docConfig := newComparisonDocConfig(opts)
	docConfig.AllowFileReferences = true
	docConfig.BasePath = filepath.Dir(absPath)
	docConfig.SpecFilePath = absPath

	if basePathOverride, baseURLOverride, err := resolveBaseOverride(opts.base); err != nil {
		return comparisonSource{}, err
	} else {
		if basePathOverride != "" {
			docConfig.AllowFileReferences = true
			docConfig.BasePath = basePathOverride
		}
		if baseURLOverride != nil {
			docConfig.BaseURL = baseURLOverride
			docConfig.AllowRemoteReferences = true
		}
	}
	if err := attachLazyLocalFS(docConfig); err != nil {
		return comparisonSource{}, err
	}

	return comparisonSource{
		Display:   raw,
		RootBytes: bits,
		DocConfig: docConfig,
		Cleanup:   func() {},
	}, nil
}

func resolveGitRefSource(raw, revision, filePath string, opts summaryOpts) (comparisonSource, error) {
	wd, err := os.Getwd()
	if err != nil {
		return comparisonSource{}, fmt.Errorf("cannot determine working directory: %w", err)
	}

	repoRoot, err := git.GetTopLevel(wd)
	if err != nil {
		return comparisonSource{}, fmt.Errorf(
			"git revision input '%s' requires the current working directory to be inside a git repository: %w",
			raw, err,
		)
	}

	normalizedPath, err := normalizeGitRefPath(wd, repoRoot, filePath)
	if err != nil {
		return comparisonSource{}, err
	}
	rootBytes, err := git.ReadFileAtRevision(repoRoot, revision, normalizedPath)
	if err != nil {
		return comparisonSource{}, err
	}
	if len(rootBytes) == 0 {
		return comparisonSource{}, fmt.Errorf("file '%s' at revision '%s' is empty", normalizedPath, revision)
	}

	basePath := repoRoot
	basePathOverride, baseURLOverride, err := resolveBaseOverride(opts.base)
	if err != nil {
		return comparisonSource{}, err
	}
	if basePathOverride != "" {
		basePath = basePathOverride
	}

	docConfig := newComparisonDocConfig(opts)
	docConfig.AllowFileReferences = true
	specActualPath := filepath.Join(repoRoot, filepath.FromSlash(normalizedPath))
	relativeSpecPath, err := filepath.Rel(basePath, specActualPath)
	if err != nil {
		return comparisonSource{}, fmt.Errorf("cannot relate spec path '%s' to base path '%s': %w", specActualPath, basePath, err)
	}
	if relativeSpecPath == ".." || filepath.IsAbs(relativeSpecPath) || strings.HasPrefix(relativeSpecPath, ".."+string(filepath.Separator)) {
		return comparisonSource{}, fmt.Errorf("git ref path '%s' is not contained by base path '%s'", normalizedPath, basePath)
	}
	virtualBasePath := filepath.Join(repoRoot, ".openapi-changes-gitref", uuid.NewString())
	docConfig.BasePath = virtualBasePath
	docConfig.SpecFilePath = filepath.Join(virtualBasePath, relativeSpecPath)
	if baseURLOverride != nil {
		docConfig.BaseURL = baseURLOverride
		docConfig.AllowRemoteReferences = true
	}

	revisionFS, err := git.NewGitRevisionFS(repoRoot, basePath, virtualBasePath, revision, docConfig)
	if err != nil {
		return comparisonSource{}, err
	}
	docConfig.LocalFS = revisionFS

	return comparisonSource{
		Display:   raw,
		RootBytes: rootBytes,
		DocConfig: docConfig,
		Cleanup:   func() {},
	}, nil
}

func resolveURLSource(raw string, opts summaryOpts) (comparisonSource, error) {
	resp, err := httpGet(raw)
	if err != nil {
		return comparisonSource{}, fmt.Errorf("error downloading file '%s': %w", raw, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		return comparisonSource{}, fmt.Errorf("error downloading file '%s': unexpected status %s", raw, resp.Status)
	}

	const maxDownloadSize = 100 << 20 // 100 MB
	bits, err := io.ReadAll(io.LimitReader(resp.Body, maxDownloadSize))
	if err != nil {
		return comparisonSource{}, fmt.Errorf("error reading downloaded file '%s': %w", raw, err)
	}
	if len(bits) == 0 {
		return comparisonSource{}, fmt.Errorf("downloaded file '%s' is empty", raw)
	}

	baseURL, err := url.Parse(raw)
	if err != nil {
		return comparisonSource{}, fmt.Errorf("invalid URL '%s': %w", raw, err)
	}
	baseURL.Path = path.Dir(baseURL.Path)
	baseURL.RawQuery = ""
	baseURL.Fragment = ""

	docConfig := newComparisonDocConfig(opts)
	docConfig.BaseURL = baseURL
	docConfig.AllowRemoteReferences = true
	docConfig.UseSchemaQuickHash = true

	if basePathOverride, baseURLOverride, err := resolveBaseOverride(opts.base); err != nil {
		return comparisonSource{}, err
	} else {
		if basePathOverride != "" {
			docConfig.AllowFileReferences = true
			docConfig.BasePath = basePathOverride
		}
		if baseURLOverride != nil {
			docConfig.BaseURL = baseURLOverride
		}
	}
	if err := attachLazyLocalFS(docConfig); err != nil {
		return comparisonSource{}, err
	}

	return comparisonSource{
		Display:   raw,
		RootBytes: bits,
		DocConfig: docConfig,
		Cleanup:   func() {},
	}, nil
}

func attachLazyLocalFS(docConfig *datamodel.DocumentConfiguration) error {
	if docConfig == nil || docConfig.BasePath == "" || !docConfig.AllowFileReferences || docConfig.LocalFS != nil {
		return nil
	}

	localFS, err := index.NewLocalFSWithConfig(&index.LocalFSConfig{
		BaseDirectory: docConfig.BasePath,
		IndexConfig: &index.SpecIndexConfig{
			BaseURL:                             docConfig.BaseURL,
			BasePath:                            docConfig.BasePath,
			SpecFilePath:                        docConfig.SpecFilePath,
			AllowRemoteLookup:                   docConfig.AllowRemoteReferences,
			AllowFileLookup:                     true,
			IgnorePolymorphicCircularReferences: docConfig.IgnorePolymorphicCircularReferences,
			IgnoreArrayCircularReferences:       docConfig.IgnoreArrayCircularReferences,
			AvoidCircularReferenceCheck:         docConfig.SkipCircularReferenceCheck,
			UseSchemaQuickHash:                  true,
			Logger:                              docConfig.Logger,
		},
	})
	if err != nil {
		return fmt.Errorf("cannot create local filesystem for base path '%s': %w", docConfig.BasePath, err)
	}
	docConfig.LocalFS = localFS
	return nil
}

func buildLeftRightCommit(left, right comparisonSource) (*model.Commit, error) {
	leftDoc, err := libopenapi.NewDocumentWithConfiguration(left.RootBytes, left.DocConfig)
	if err != nil {
		return nil, fmt.Errorf("unable to parse original document '%s': %w", left.Display, err)
	}
	rightDoc, err := libopenapi.NewDocumentWithConfiguration(right.RootBytes, right.DocConfig)
	if err != nil {
		leftDoc.Release()
		return nil, fmt.Errorf("unable to parse modified document '%s': %w", right.Display, err)
	}

	return &model.Commit{
		Hash:        uuid.New().String()[:6],
		Message:     fmt.Sprintf("Original: %s, Modified: %s", left.Display, right.Display),
		CommitDate:  time.Now(),
		OldData:     left.RootBytes,
		Data:        right.RootBytes,
		OldDocument: leftDoc,
		Document:    rightDoc,
		Synthetic:   true,
	}, nil
}
