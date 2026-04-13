// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/openapi-changes/git"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestParseGitRef(t *testing.T) {
	tests := []struct {
		name     string
		raw      string
		revision string
		filePath string
		ok       bool
	}{
		{name: "branch", raw: "main:openapi.yaml", revision: "main", filePath: "openapi.yaml", ok: true},
		{name: "head relative", raw: "HEAD~1:spec.yaml", revision: "HEAD~1", filePath: "spec.yaml", ok: true},
		{name: "tag", raw: "v1.0.0:path/to/spec.yaml", revision: "v1.0.0", filePath: "path/to/spec.yaml", ok: true},
		{name: "remote branch", raw: "origin/main:spec.yaml", revision: "origin/main", filePath: "spec.yaml", ok: true},
		{name: "http-looking git ref", raw: "http-fix:openapi.yaml", revision: "http-fix", filePath: "openapi.yaml", ok: true},
		{name: "https-looking git ref", raw: "https-cleanup:spec.yaml", revision: "https-cleanup", filePath: "spec.yaml", ok: true},
		{name: "url", raw: "https://example.com/spec.yaml", ok: false},
		{name: "local file", raw: "./local/file.yaml", ok: false},
		{name: "windows path", raw: `C:\path\spec.yaml`, ok: false},
		{name: "empty revision", raw: ":path.yaml", ok: false},
		{name: "empty path", raw: "main:", ok: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			revision, filePath, ok := parseGitRef(tt.raw)
			assert.Equal(t, tt.ok, ok)
			assert.Equal(t, tt.revision, revision)
			assert.Equal(t, tt.filePath, filePath)
		})
	}
}

func TestParseGitRef_ExistingLocalColonPathIsNotGitRef(t *testing.T) {
	dir := t.TempDir()
	chdirForTest(t, dir)

	path := "v1:beta.yaml"
	require.NoError(t, os.WriteFile(path, []byte("openapi: 3.0.3\ninfo:\n  title: test\n  version: '1.0'\npaths: {}\n"), 0o644))

	revision, filePath, ok := parseGitRef(path)
	assert.False(t, ok)
	assert.Equal(t, "", revision)
	assert.Equal(t, "", filePath)
}

func TestNormalizeGitRefPath_FromRepoRoot(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))

	got, err := normalizeGitRefPath(repoRoot, "sample-specs/petstorev3.json")
	require.NoError(t, err)
	assert.Equal(t, "sample-specs/petstorev3.json", got)
}

func TestNormalizeGitRefPath_FromSubdirectory(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))

	got, err := normalizeGitRefPath(repoRoot, "sample-specs/petstorev3.json")
	require.NoError(t, err)
	assert.Equal(t, "sample-specs/petstorev3.json", got)
}

func TestNormalizeGitRefPath_AbsolutePathInsideRepo(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))
	absPath := filepath.Join(repoRoot, "sample-specs", "petstorev3.json")

	got, err := normalizeGitRefPath(repoRoot, absPath)
	require.NoError(t, err)
	assert.Equal(t, "sample-specs/petstorev3.json", got)
}

func TestNormalizeGitRefPath_SymlinkedWorkingTreeAlias(t *testing.T) {
	parentDir := t.TempDir()
	repoRoot := filepath.Join(parentDir, "repo")
	require.NoError(t, os.Mkdir(repoRoot, 0o755))
	require.NoError(t, os.WriteFile(filepath.Join(repoRoot, "openapi.yaml"), []byte("openapi: 3.0.3\npaths: {}\n"), 0o644))

	linkPath := filepath.Join(parentDir, "repo-link")
	err := os.Symlink(repoRoot, linkPath)
	if err != nil {
		t.Skipf("symlink not supported: %v", err)
	}

	got, err := normalizeGitRefPath(repoRoot, filepath.Join(linkPath, "openapi.yaml"))
	require.NoError(t, err)
	assert.Equal(t, "openapi.yaml", got)
}

func TestNormalizeGitRefPath_MissingPathUnderSymlinkedAliasStaysInsideRepo(t *testing.T) {
	parentDir := t.TempDir()
	repoRoot := filepath.Join(parentDir, "repo")
	require.NoError(t, os.Mkdir(repoRoot, 0o755))
	require.NoError(t, os.Mkdir(filepath.Join(repoRoot, "nested"), 0o755))

	linkPath := filepath.Join(parentDir, "repo-link")
	err := os.Symlink(repoRoot, linkPath)
	if err != nil {
		t.Skipf("symlink not supported: %v", err)
	}

	got, err := normalizeGitRefPath(repoRoot, filepath.Join(linkPath, "nested", "missing.yaml"))
	require.NoError(t, err)
	assert.Equal(t, "nested/missing.yaml", got)
}

func TestNormalizeGitRefPath_RejectsOutsideRepo(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))

	_, err = normalizeGitRefPath(repoRoot, "../../outside.yaml")
	require.Error(t, err)
	assert.Contains(t, err.Error(), "resolves outside the current repository")
}

func TestResolveGitRefSource(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))
	chdirForTest(t, repoRoot)

	source, err := resolveGitRefSource("HEAD:go.mod", "HEAD", "go.mod", summaryOpts{})
	require.NoError(t, err)
	assert.Equal(t, "HEAD:go.mod", source.Display)
	assert.NotEmpty(t, source.RootBytes)
	require.NotNil(t, source.DocConfig)
	assert.True(t, strings.HasSuffix(source.DocConfig.SpecFilePath, string(filepath.Separator)+"go.mod"))
	assert.NotNil(t, source.DocConfig.LocalFS)
}

func TestResolveGitRefSource_FromSubdirectoryUsesRepoRootRelativePath(t *testing.T) {
	repoDir := createGitSpecRepo(t)
	subDir := filepath.Join(repoDir, "child")
	require.NoError(t, os.Mkdir(subDir, 0o755))
	chdirForTest(t, subDir)

	source, err := resolveGitRefSource("HEAD:openapi.yaml", "HEAD", "openapi.yaml", summaryOpts{})
	require.NoError(t, err)
	assert.Equal(t, "HEAD:openapi.yaml", source.Display)
	assert.NotEmpty(t, source.RootBytes)
	assert.True(t, strings.HasSuffix(source.DocConfig.SpecFilePath, string(filepath.Separator)+"openapi.yaml"))
}

func TestResolveGitRefSource_AbsolutePathInsideCurrentRepo(t *testing.T) {
	repoDir := createGitSpecRepo(t)
	chdirForTest(t, repoDir)

	absSpecPath := filepath.Join(repoDir, "openapi.yaml")
	raw := "HEAD:" + absSpecPath

	source, err := resolveGitRefSource(raw, "HEAD", absSpecPath, summaryOpts{})
	require.NoError(t, err)
	assert.Equal(t, raw, source.Display)
	assert.NotEmpty(t, source.RootBytes)
	expectedSpecPath, err := git.CanonicalizePath(absSpecPath)
	require.NoError(t, err)
	assert.Equal(t, expectedSpecPath, source.DocConfig.SpecFilePath)
	assert.True(t, strings.HasSuffix(source.DocConfig.SpecFilePath, string(filepath.Separator)+"openapi.yaml"))
}

func TestResolveGitRefSource_RequiresGitRepo(t *testing.T) {
	chdirForTest(t, t.TempDir())

	_, err := resolveGitRefSource("HEAD:go.mod", "HEAD", "go.mod", summaryOpts{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "requires the current working directory to be inside a git repository")
}

func TestResolveComparisonSource_URLSanitizesDisplay(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("openapi: 3.0.3\ninfo:\n  title: test\n  version: '1.0'\npaths: {}\n"))
	}))
	defer server.Close()

	source, err := resolveComparisonSource(server.URL+"/spec.yaml?token=secret#section", summaryOpts{})
	require.NoError(t, err)

	assert.Equal(t, server.URL+"/spec.yaml", source.Display)
	assert.NotEmpty(t, source.RootBytes)
	require.NotNil(t, source.DocConfig)
	require.NotNil(t, source.DocConfig.BaseURL)
	assert.Equal(t, server.URL+"/", source.DocConfig.BaseURL.String())
}

func TestResolveComparisonSource_HTTPStyleGitRefsAreNotURLs(t *testing.T) {
	repoDir, specPath := createExplodedGitSpecRepo(t)
	chdirForTest(t, repoDir)

	source, err := resolveComparisonSource("HEAD:apis/openapi.yaml", summaryOpts{})
	require.NoError(t, err)
	assert.Equal(t, "HEAD:apis/openapi.yaml", source.Display)
	assert.True(t, strings.HasSuffix(source.DocConfig.SpecFilePath, filepath.ToSlash(specPath)) ||
		strings.HasSuffix(filepath.ToSlash(source.DocConfig.SpecFilePath), "/apis/openapi.yaml"))
}

func TestResolveComparisonSource_URLReturnsStatusErrors(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "missing", http.StatusNotFound)
	}))
	defer server.Close()

	_, err := resolveComparisonSource(server.URL+"/spec.yaml", summaryOpts{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "unexpected status 404 Not Found")
}

func TestLoadLeftRightCommits_UsesSafeDisplayLabels(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))
	chdirForTest(t, repoRoot)

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte("openapi: 3.0.3\ninfo:\n  title: test\n  version: '1.0'\npaths: {}\n"))
	}))
	defer server.Close()

	tests := []struct {
		name          string
		left          string
		right         string
		originalLabel string
		modifiedLabel string
	}{
		{
			name:          "git ref and local file",
			left:          "HEAD:sample-specs/petstorev3.json",
			right:         "sample-specs/petstorev3.json",
			originalLabel: "HEAD:sample-specs/petstorev3.json",
			modifiedLabel: "sample-specs/petstorev3.json",
		},
		{
			name:          "git ref and git ref",
			left:          "HEAD:sample-specs/petstorev3.json",
			right:         "HEAD:sample-specs/petstorev3.json",
			originalLabel: "HEAD:sample-specs/petstorev3.json",
			modifiedLabel: "HEAD:sample-specs/petstorev3.json",
		},
		{
			name:          "url and local file",
			left:          server.URL + "/spec.yaml?token=secret#section",
			right:         "sample-specs/petstorev3.json",
			originalLabel: server.URL + "/spec.yaml",
			modifiedLabel: "sample-specs/petstorev3.json",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			commits, err := loadLeftRightCommits(tt.left, tt.right, summaryOpts{})
			require.NoError(t, err)
			require.Len(t, commits, 1)
			assert.Equal(t, "Original: "+tt.originalLabel+", Modified: "+tt.modifiedLabel, commits[0].Message)
			assert.NotNil(t, commits[0].Document)
			assert.NotNil(t, commits[0].OldDocument)
		})
	}
}

func TestLoadLeftRightCommits_GitRefFromSubdirectoryUsesRepoRootSemantics(t *testing.T) {
	repoDir := createGitSpecRepo(t)
	subDir := filepath.Join(repoDir, "child")
	require.NoError(t, os.Mkdir(subDir, 0o755))
	chdirForTest(t, subDir)

	commits, err := loadLeftRightCommits("HEAD:openapi.yaml", filepath.Join(repoDir, "openapi.yaml"), summaryOpts{})
	require.NoError(t, err)
	require.Len(t, commits, 1)
	assert.Equal(t, "Original: HEAD:openapi.yaml, Modified: "+filepath.Join(repoDir, "openapi.yaml"), commits[0].Message)
}

func TestLoadCommitsFromArgs_GitRefUsesLeftRightDispatch(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))
	chdirForTest(t, repoRoot)

	commits, err := loadCommitsFromArgs([]string{
		"HEAD:sample-specs/petstorev3.json",
		"sample-specs/petstorev3.json",
	}, summaryOpts{}, nil)

	require.NoError(t, err)
	require.Len(t, commits, 1)
	assert.Equal(t, "Original: HEAD:sample-specs/petstorev3.json, Modified: sample-specs/petstorev3.json", commits[0].Message)
}

func TestLoadCommitsFromArgs_LocalColonPathOutsideGitRepoStaysFileComparison(t *testing.T) {
	dir := t.TempDir()
	chdirForTest(t, dir)

	leftPath := filepath.Join(dir, "v1:beta.yaml")
	rightPath := filepath.Join(dir, "spec.yaml")
	spec := []byte("openapi: 3.0.3\ninfo:\n  title: test\n  version: '1.0'\npaths: {}\n")

	require.NoError(t, os.WriteFile(leftPath, spec, 0o644))
	require.NoError(t, os.WriteFile(rightPath, spec, 0o644))

	commits, err := loadCommitsFromArgs([]string{leftPath, rightPath}, summaryOpts{}, nil)
	require.NoError(t, err)
	require.Len(t, commits, 1)
	assert.Equal(t, "Original: "+leftPath+", Modified: "+rightPath, commits[0].Message)
}

func TestLoadCommitsFromArgs_RepoHistoryColonPathUsesHistoryDispatch(t *testing.T) {
	repoDir := createGitSpecRepoForFile(t, "v1:beta.yaml")
	chdirForTest(t, t.TempDir())

	commits, err := loadCommitsFromArgs([]string{repoDir, "v1:beta.yaml"}, summaryOpts{limitTime: -1}, nil)
	require.NoError(t, err)
	require.NotEmpty(t, commits)
	assert.Equal(t, repoDir, commits[0].RepoDirectory)
	assert.Equal(t, "v1:beta.yaml", commits[0].FilePath)
}
