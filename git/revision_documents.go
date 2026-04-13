// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"fmt"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/openapi-changes/model"
)

type RevisionDocumentContext struct {
	RepoRoot         string
	RepoFilePath     string
	SpecFilePath     string
	BasePath         string
	BaseURL          *url.URL
	DocumentRewriter model.DocumentPathRewriter
}

func ResolveBaseOverride(base string) (string, *url.URL, error) {
	if base == "" {
		return "", nil, nil
	}
	if parsed, err := url.Parse(base); err == nil && parsed != nil && parsed.Scheme != "" && parsed.Host != "" {
		parsed.Path = path.Dir(parsed.Path)
		parsed.RawQuery = ""
		parsed.Fragment = ""
		return "", parsed, nil
	}
	absBase, err := CanonicalizePath(base)
	if err != nil {
		return "", nil, fmt.Errorf("cannot resolve base path '%s': %w", base, err)
	}
	return absBase, nil, nil
}

func NewRepoRelativeDocumentPathRewriter(repoRoot, basePath string) model.DocumentPathRewriter {
	canonicalRepoRoot, err := CanonicalizePath(repoRoot)
	if err != nil {
		return nil
	}
	canonicalBasePath, err := CanonicalizePath(basePath)
	if err != nil {
		return nil
	}

	baseRelPath, err := filepath.Rel(canonicalRepoRoot, canonicalBasePath)
	if err != nil {
		return nil
	}
	if baseRelPath == ".." || strings.HasPrefix(baseRelPath, ".."+string(filepath.Separator)) {
		return nil
	}
	cleanBasePath := filepath.Clean(canonicalBasePath)
	if baseRelPath == "." {
		baseRelPath = ""
	}

	return func(raw string) string {
		cleaned := filepath.Clean(filepath.FromSlash(raw))
		relPath, err := filepath.Rel(cleanBasePath, cleaned)
		if err != nil {
			return raw
		}
		if relPath == "." || relPath == "" {
			return raw
		}
		if relPath == ".." || strings.HasPrefix(relPath, ".."+string(filepath.Separator)) {
			return raw
		}
		if baseRelPath != "" {
			relPath = filepath.Join(baseRelPath, relPath)
		}
		return filepath.ToSlash(filepath.Clean(relPath))
	}
}

func BuildRevisionDocumentContext(repoDir, filePath, basePathOverride string, baseURLOverride *url.URL) (*RevisionDocumentContext, error) {
	repoRoot, err := GetTopLevel(repoDir)
	if err != nil {
		return nil, fmt.Errorf("cannot determine repository root for '%s': %w", repoDir, err)
	}
	repoRoot, err = CanonicalizePath(repoRoot)
	if err != nil {
		return nil, fmt.Errorf("cannot canonicalize repository root '%s': %w", repoRoot, err)
	}

	repoFilePath, err := normalizeRevisionRepoPath(repoDir, repoRoot, filePath)
	if err != nil {
		return nil, err
	}

	basePath := repoRoot
	if basePathOverride != "" {
		basePath = basePathOverride
	}

	specPath := filepath.Join(repoRoot, filepath.FromSlash(repoFilePath))
	relativeSpecPath, err := filepath.Rel(basePath, specPath)
	if err != nil {
		return nil, fmt.Errorf("cannot relate spec path '%s' to base path '%s': %w", specPath, basePath, err)
	}
	if relativeSpecPath == ".." || filepath.IsAbs(relativeSpecPath) || strings.HasPrefix(relativeSpecPath, ".."+string(filepath.Separator)) {
		return nil, fmt.Errorf("revision path '%s' is not contained by base path '%s'", repoFilePath, basePath)
	}

	return &RevisionDocumentContext{
		RepoRoot:         repoRoot,
		RepoFilePath:     repoFilePath,
		SpecFilePath:     specPath,
		BasePath:         basePath,
		BaseURL:          baseURLOverride,
		DocumentRewriter: NewRepoRelativeDocumentPathRewriter(repoRoot, basePath),
	}, nil
}

func BuildRevisionDocumentConfiguration(ctx *RevisionDocumentContext, revision string,
	baseDocConfig *datamodel.DocumentConfiguration,
) (*datamodel.DocumentConfiguration, error) {
	if ctx == nil {
		return nil, fmt.Errorf("revision document context is required")
	}

	docConfig := cloneDocumentConfiguration(baseDocConfig)
	docConfig.AllowFileReferences = true
	docConfig.BasePath = ctx.BasePath
	docConfig.SpecFilePath = ctx.SpecFilePath
	if ctx.BaseURL != nil {
		docConfig.BaseURL = ctx.BaseURL
		docConfig.AllowRemoteReferences = true
	}

	revisionFS, err := NewGitRevisionFS(ctx.RepoRoot, ctx.BasePath, revision, docConfig)
	if err != nil {
		return nil, err
	}
	docConfig.LocalFS = revisionFS
	return docConfig, nil
}

func cloneDocumentConfiguration(base *datamodel.DocumentConfiguration) *datamodel.DocumentConfiguration {
	if base == nil {
		return datamodel.NewDocumentConfiguration()
	}
	cloned := *base
	cloned.LocalFS = nil
	return &cloned
}

func normalizeRevisionRepoPath(repoDir, repoRoot, filePath string) (string, error) {
	repoRoot, err := CanonicalizePath(repoRoot)
	if err != nil {
		return "", fmt.Errorf("cannot canonicalize repository root '%s': %w", repoRoot, err)
	}

	var absPath string
	switch {
	case filepath.IsAbs(filePath):
		absPath, err = CanonicalizePath(filePath)
		if err != nil {
			return "", fmt.Errorf("cannot canonicalize revision path '%s': %w", filePath, err)
		}
	default:
		absPath, err = CanonicalizePath(filepath.Join(repoDir, filepath.Clean(filePath)))
		if err != nil {
			return "", fmt.Errorf("cannot canonicalize revision path '%s': %w", filePath, err)
		}
	}

	relPath, err := filepath.Rel(repoRoot, absPath)
	if err != nil {
		return "", fmt.Errorf("cannot normalize revision path '%s': %w", filePath, err)
	}
	if relPath == "." || relPath == "" {
		return "", fmt.Errorf("revision path '%s' must point to a file", filePath)
	}
	if relPath == ".." || strings.HasPrefix(relPath, ".."+string(filepath.Separator)) {
		return "", fmt.Errorf("revision path '%s' resolves outside repository root '%s'", filePath, repoRoot)
	}
	return filepath.ToSlash(relPath), nil
}

func CanonicalizePath(path string) (string, error) {
	absPath, err := filepath.Abs(filepath.Clean(path))
	if err != nil {
		return "", err
	}

	existingPath := absPath
	var missingParts []string
	for {
		if _, err := os.Lstat(existingPath); err == nil {
			break
		} else if !os.IsNotExist(err) {
			return "", err
		}

		parent := filepath.Dir(existingPath)
		if parent == existingPath {
			return absPath, nil
		}
		missingParts = append([]string{filepath.Base(existingPath)}, missingParts...)
		existingPath = parent
	}

	resolvedPath, err := filepath.EvalSymlinks(existingPath)
	if err != nil {
		return "", err
	}
	for _, part := range missingParts {
		resolvedPath = filepath.Join(resolvedPath, part)
	}
	return resolvedPath, nil
}
