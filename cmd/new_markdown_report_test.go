// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"strings"
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewMarkdownReport_UnchangedLeftRight(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	report, err := generateNewMarkdownReport(commits, nil, false)
	assert.NoError(t, err)
	assert.Nil(t, report)
}

func TestNewMarkdownReport_AllCommitsFail(t *testing.T) {
	// A Swagger 2.0 spec is valid YAML but BuildV3Model() will fail
	swagger2Spec := `swagger: "2.0"
info:
  title: test
  version: "1.0"
paths: {}`

	doc, docErr := libopenapi.NewDocument([]byte(swagger2Spec))
	require.NoError(t, docErr)

	commit := &model.Commit{
		Hash:        "abc123",
		Message:     "test commit",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        []byte(swagger2Spec),
		OldData:     []byte(swagger2Spec),
		Document:    doc,
		OldDocument: doc,
	}

	report, err := generateNewMarkdownReport([]*model.Commit{commit}, nil, false)
	assert.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "all 1 commits failed to render")
}

func TestNewMarkdownReport_HeadingStripping(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	report, err := generateNewMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.NotContains(t, content, "# What Changed Report\n\n")
}

func TestNewMarkdownReport_SingleCommitLeftRight(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	report, err := generateNewMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.True(t, strings.HasPrefix(content, "# OpenAPI Changes Report"))
	assert.NotContains(t, content, "## Commit 1:")
	assert.Contains(t, content, "**42** changes detected, **18** are **(💔 breaking)**.")
}

func TestNewMarkdownReport_UsesDeduplicatedCounts(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	report, err := generateNewMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.Contains(t, content, "**42** changes detected, **18** are **(💔 breaking)**.")
	assert.Contains(t, content, "- Additions: **12**")
	assert.Contains(t, content, "- Modifications: **20**")
	assert.Contains(t, content, "- Removals: **10**")
}

func TestNewMarkdownReport_UsesDeduplicatedObjectStats(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	report, err := generateNewMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.Contains(t, content, "| Operation | 5 | 2 |")
	assert.Contains(t, content, "| PathItem | 9 | 5 |")
	assert.Contains(t, content, "| Responses | 3 | 2 |")
	assert.Contains(t, content, "| Schema | 10 | 4 |")
	assert.Contains(t, content, "| Tag | 3 | 1 |")
	assert.NotContains(t, content, "| Operation | 9 |")
	assert.NotContains(t, content, "| PathItem | 9 | 6 |")
}

func TestNewMarkdownReport_LeftRightOmitsSyntheticCommitMetadata(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	report, err := generateNewMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.NotContains(t, content, "## Commit 1:")
	assert.NotContains(t, content, "- **Hash**:")
	assert.NotContains(t, content, "- **Author**:")
	assert.NotContains(t, content, "- **Date**:")
	assert.Contains(t, content, "**42** changes detected, **18** are **(💔 breaking)**.")
}

func TestNewMarkdownReport_RenderErrorWithSomeSuccesses(t *testing.T) {
	// Create a valid OAS3 commit
	opts := newSummaryOpts{noColor: true}
	validCommits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, validCommits)

	// Create an invalid commit (Swagger 2.0 that will fail BuildV3Model)
	swagger2Spec := `swagger: "2.0"
info:
  title: test
  version: "1.0"
paths: {}`
	doc, docErr := libopenapi.NewDocument([]byte(swagger2Spec))
	require.NoError(t, docErr)

	badCommit := &model.Commit{
		Hash:        "bad123",
		Message:     "bad commit",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        []byte(swagger2Spec),
		OldData:     []byte(swagger2Spec),
		Document:    doc,
		OldDocument: doc,
	}

	// Mix valid commit(s) with the bad one
	mixed := append(validCommits, badCommit)

	report, err := generateNewMarkdownReport(mixed, nil, false)
	assert.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "1 commits failed to render")
}

func TestNewMarkdownReport_IncludeDiffFlag(t *testing.T) {
	opts := newSummaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	// Without --include-diff: no diff block
	reportNoDiff, err := generateNewMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, reportNoDiff)
	assert.NotContains(t, string(reportNoDiff), "<details>")
	assert.NotContains(t, string(reportNoDiff), "Unified Diff")

	// Reload commits (Documents get consumed)
	commits, err = loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)
	require.NoError(t, err)

	// With --include-diff: collapsible diff block present
	reportWithDiff, err := generateNewMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.NotNil(t, reportWithDiff)
	assert.Contains(t, string(reportWithDiff), "<details>")
	assert.Contains(t, string(reportWithDiff), "Unified Diff")
	assert.Contains(t, string(reportWithDiff), "````diff")
}

// Command dispatch tests — persistent flags (--no-logo etc.) live on rootCmd,
// so we add the subcommand to a fresh root for testing.

func TestNewMarkdownReportCommand_ZeroArgs(t *testing.T) {
	cmd := newTestRootCmd(GetNewMarkdownReportCommand(), "--no-logo", "--no-color")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestNewMarkdownReportCommand_TooManyArgs(t *testing.T) {
	cmd := newTestRootCmd(GetNewMarkdownReportCommand(), "--no-logo", "a", "b", "c")
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "too many arguments")
}

func TestNewMarkdownReportCommand_LeftRightFiles(t *testing.T) {
	cmd := newTestRootCmd(GetNewMarkdownReportCommand(),
		"--no-logo", "--no-color",
		"--report-file", "/dev/null",
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestNewMarkdownReportCommand_BadFirstArg(t *testing.T) {
	cmd := newTestRootCmd(GetNewMarkdownReportCommand(),
		"--no-logo", "--no-color",
		"/nonexistent/path",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "cannot open file/repository")
}

func TestNewMarkdownReportCommand_SingleArgNonGithub(t *testing.T) {
	cmd := newTestRootCmd(GetNewMarkdownReportCommand(), "--no-logo", "--no-color", "not-a-url")
	err := cmd.Execute()
	// Single non-GitHub arg prints usage hint, no error
	assert.NoError(t, err)
}
