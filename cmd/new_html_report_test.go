// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func makeSwagger2Commit(t *testing.T) *model.Commit {
	t.Helper()

	swagger2Spec := `swagger: "2.0"
info:
  title: test
  version: "1.0"
paths: {}`

	doc, err := libopenapi.NewDocument([]byte(swagger2Spec))
	require.NoError(t, err)

	return &model.Commit{
		Hash:        "abc123",
		Message:     "swagger commit",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        []byte(swagger2Spec),
		OldData:     []byte(swagger2Spec),
		Document:    doc,
		OldDocument: doc,
	}
}

func TestGenerateNewHTMLReport_UnchangedLeftRight(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)

	report, err := generateNewHTMLReport(commits, nil, false,
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
	)
	require.NoError(t, err)
	assert.Nil(t, report)
}

func TestGenerateNewHTMLReport_LeftRightIncludesSanitizedPaths(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)

	report, err := generateNewHTMLReport(commits, nil, true,
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)
	require.NoError(t, err)
	require.NotNil(t, report)

	content := string(report)
	assert.Contains(t, content, `"originalPath":"petstorev3-original.json"`)
	assert.Contains(t, content, `"modifiedPath":"petstorev3.json"`)
	assert.Contains(t, content, "<!DOCTYPE html")
}

func TestBuildHTMLReportItems_AllCommitsFail(t *testing.T) {
	items, err := buildHTMLReportItems([]*model.Commit{makeSwagger2Commit(t)}, nil)
	require.Error(t, err)
	assert.Nil(t, items)
	assert.Contains(t, err.Error(), "all 1 commits failed to build report items")
}

func TestBuildHTMLReportItems_PartialFailureReturnsError(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	mixed := append(commits, makeSwagger2Commit(t))

	items, err := buildHTMLReportItems(mixed, nil)
	require.Error(t, err)
	assert.Nil(t, items)
	assert.Contains(t, err.Error(), "1 commits failed to build report items")
}

func TestGenerateNewHTMLReport_PartialFailureReturnsError(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	mixed := append(commits, makeSwagger2Commit(t))

	report, err := generateNewHTMLReport(mixed, nil, false,
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)
	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "1 commits failed to build report items")
}

func TestNewHTMLReportCommand_LeftRightFiles(t *testing.T) {
	reportFile := filepath.Join(t.TempDir(), "report.html")
	cmd := newTestRootCmd(GetNewHTMLReportCommand(),
		"--no-logo", "--no-color",
		"--report-file", reportFile,
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)

	err := cmd.Execute()
	require.NoError(t, err)
	assert.FileExists(t, reportFile)
}

func TestNewHTMLReportCommand_SingleArgNonGithub(t *testing.T) {
	cmd := newTestRootCmd(GetNewHTMLReportCommand(), "--no-logo", "--no-color", "not-a-url")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestNewHTMLReportCommand_TooManyArgs(t *testing.T) {
	cmd := newTestRootCmd(GetNewHTMLReportCommand(), "--no-logo", "a", "b", "c")
	err := cmd.Execute()
	require.Error(t, err)
	assert.True(t, strings.Contains(err.Error(), "too many arguments"))
}
