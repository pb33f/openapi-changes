// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

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

func TestMarkdownReport_UnchangedLeftRight(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	report, err := generateMarkdownReport(commits, nil, false)
	assert.NoError(t, err)
	assert.Nil(t, report)
}

func TestMarkdownReport_AllCommitsFail(t *testing.T) {
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

	report, err := generateMarkdownReport([]*model.Commit{commit}, nil, false)
	assert.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "all 1 commits failed to render")
}

func TestMarkdownReport_LeftRightModelBuildErrorNamesFiles(t *testing.T) {
	leftPath, rightPath := createBrokenReferenceSpecPair(t)

	commits, err := loadLeftRightCommits(leftPath, rightPath, summaryOpts{noColor: true})
	require.NoError(t, err)

	var report []byte
	stderr := captureStderr(t, func() {
		report, err = generateMarkdownReport(commits, nil, false)
	})

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "all 1 commits failed to render")
	assert.Contains(t, err.Error(), rightPath)
	assert.Contains(t, err.Error(), "building modified model")
	assert.Contains(t, stderr, leftPath)
	assert.Contains(t, stderr, rightPath)
}

func TestMarkdownReport_HeadingStripping(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	report, err := generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.NotContains(t, content, "# What Changed Report\n\n")
}

func TestMarkdownReport_SingleCommitLeftRight(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	report, err := generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.True(t, strings.HasPrefix(content, "# OpenAPI Changes Report"))
	assert.NotContains(t, content, "## Commit 1:")
	assert.Contains(t, content, "**42** changes detected, **18** are **(💔 breaking)**.")
}

func TestMarkdownReport_UsesDeduplicatedCounts(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	report, err := generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.Contains(t, content, "**42** changes detected, **18** are **(💔 breaking)**.")
	assert.Contains(t, content, "- Additions: **12**")
	assert.Contains(t, content, "- Modifications: **20**")
	assert.Contains(t, content, "- Removals: **10**")
}

func TestMarkdownReport_UsesDeduplicatedObjectStats(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	report, err := generateMarkdownReport(commits, nil, false)
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

func TestMarkdownReport_LeftRightOmitsSyntheticCommitMetadata(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	report, err := generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.NotContains(t, content, "## Commit 1:")
	assert.NotContains(t, content, "- **Hash**:")
	assert.NotContains(t, content, "- **Author**:")
	assert.NotContains(t, content, "- **Date**:")
	assert.Contains(t, content, "**42** changes detected, **18** are **(💔 breaking)**.")
}

func TestMarkdownReport_PartialFailureReturnsPartialResults(t *testing.T) {
	// Create a valid OAS3 commit
	opts := summaryOpts{noColor: true}
	validCommits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
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

	var report []byte
	var reportErr error
	stderr := captureStderr(t, func() {
		report, reportErr = generateMarkdownReport(mixed, nil, false)
	})
	assert.NoError(t, reportErr)
	assert.NotNil(t, report, "should return partial report with successfully rendered commits")
	assert.Contains(t, stderr, "warning: commit bad123: building modified model")
	assert.Contains(t, stderr, "warning: 1 commits failed to render")
}

func TestMarkdownReport_IncludeDiffFlag(t *testing.T) {
	opts := summaryOpts{noColor: true}
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	// Without --include-diff: no diff block
	reportNoDiff, err := generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.NotNil(t, reportNoDiff)
	assert.NotContains(t, string(reportNoDiff), "<details>")
	assert.NotContains(t, string(reportNoDiff), "Unified Diff")

	// Reload commits (Documents get consumed)
	commits, err = loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		opts,
	)
	require.NoError(t, err)

	// With --include-diff: collapsible diff block present
	reportWithDiff, err := generateMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.NotNil(t, reportWithDiff)
	assert.Contains(t, string(reportWithDiff), "<details>")
	assert.Contains(t, string(reportWithDiff), "Unified Diff")
	assert.Contains(t, string(reportWithDiff), "````diff")
}

// Command dispatch tests — persistent flags (--no-logo etc.) live on rootCmd,
// so we add the subcommand to a fresh root for testing.

func TestMarkdownReportCommand_ZeroArgs(t *testing.T) {
	cmd := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "--no-color")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestMarkdownReportCommand_TooManyArgs(t *testing.T) {
	cmd := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "a", "b", "c")
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "too many arguments")
}

func TestMarkdownReportCommand_LeftRightFiles(t *testing.T) {
	cmd := testRootCmd(GetMarkdownReportCommand(),
		"--no-logo", "--no-color",
		"--report-file", "/dev/null",
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestMarkdownReportCommand_BadFirstArg(t *testing.T) {
	cmd := testRootCmd(GetMarkdownReportCommand(),
		"--no-logo", "--no-color",
		"/nonexistent/path",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "cannot open file/repository")
}

func TestMarkdownReportCommand_SingleArgNonGithub(t *testing.T) {
	cmd := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "--no-color", "not-a-url")
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "github.com URL")
}
