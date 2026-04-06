// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"encoding/json"
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

func TestGenerateHTMLReport_UnchangedLeftRight(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)

	report, err := generateHTMLReport(commits, nil, false,
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
	)
	require.NoError(t, err)
	assert.Nil(t, report)
}

func TestGenerateHTMLReport_LeftRightIncludesSanitizedPaths(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)

	report, err := generateHTMLReport(commits, nil, true,
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

func TestGenerateHTMLReport_PartialFailureReturnsError(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	mixed := append(commits, makeSwagger2Commit(t))

	report, err := generateHTMLReport(mixed, nil, false,
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)
	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "1 commits failed to build report items")
}

func TestHTMLReportCommand_LeftRightFiles(t *testing.T) {
	reportFile := filepath.Join(t.TempDir(), "report.html")
	cmd := testRootCmd(GetHTMLReportCommand(),
		"--no-logo", "--no-color",
		"--report-file", reportFile,
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)

	err := cmd.Execute()
	require.NoError(t, err)
	assert.FileExists(t, reportFile)
}

func TestHTMLReportCommand_SingleArgNonGithub(t *testing.T) {
	cmd := testRootCmd(GetHTMLReportCommand(), "--no-logo", "--no-color", "not-a-url")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestHTMLReportCommand_TooManyArgs(t *testing.T) {
	cmd := testRootCmd(GetHTMLReportCommand(), "--no-logo", "a", "b", "c")
	err := cmd.Execute()
	require.Error(t, err)
	assert.True(t, strings.Contains(err.Error(), "too many arguments"))
}

func TestBuildHTMLReportItems_PreservesSchemaNodesInDocumentTree(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		newSummaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	items, err := buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	require.NotEmpty(t, items)

	target := &newHtmlNodeGraph{}
	require.NotNil(t, items[0].Graph)
	require.NoError(t, json.Unmarshal(items[0].Graph.Nodes, &target.Nodes))
	require.NoError(t, json.Unmarshal(items[0].Graph.NodeChangeTree, &target.Root))

	nodeIDs := make(map[string]struct{})
	for _, node := range target.Nodes {
		id, _ := node["id"].(string)
		if id != "" {
			nodeIDs[id] = struct{}{}
		}
	}

	assert.Contains(t, nodeIDs, "$.components")
	assert.Contains(t, nodeIDs, "$.components.schemas['Pet']")
	assert.Contains(t, nodeIDs, "$.components.schemas['User']")

	rootChildren, ok := target.Root["nodes"].([]any)
	require.True(t, ok)

	rootChildIDs := make([]string, 0, len(rootChildren))
	for _, child := range rootChildren {
		if id, ok := child.(string); ok {
			rootChildIDs = append(rootChildIDs, id)
		}
	}
	assert.Contains(t, rootChildIDs, "$.components")
}

type newHtmlNodeGraph struct {
	Nodes []map[string]any
	Root  map[string]any
}
