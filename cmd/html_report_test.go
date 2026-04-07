// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"encoding/json"
	"path/filepath"
	"strings"
	"testing"

	htmlReport "github.com/pb33f/openapi-changes/html-report"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGenerateHTMLReport_UnchangedLeftRight(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
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
		summaryOpts{noColor: true},
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

func TestBuildHTMLReportItems_PartialFailureReturnsPartialResults(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	mixed := append(commits, makeSwagger2Commit(t))

	var items []*htmlReport.ReportItem
	stderr := captureStderr(t, func() {
		items, err = buildHTMLReportItems(mixed, nil)
	})
	require.NoError(t, err)
	assert.NotEmpty(t, items, "should return successfully built items despite partial failure")
	assert.Contains(t, stderr, "warning: commit abc123: building right model")
	assert.Contains(t, stderr, "warning: 1 commits failed to build report items")
}

func TestGenerateHTMLReport_PartialFailureReturnsPartialReport(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	mixed := append(commits, makeSwagger2Commit(t))

	report, err := generateHTMLReport(mixed, nil, false,
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	)
	require.NoError(t, err)
	assert.NotNil(t, report, "should return a report with successfully built items despite partial failure")
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
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "github.com URL")
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
		summaryOpts{noColor: true},
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

func TestBuildHTMLReportItems_SplitsStandardAndChangeExplorerGraphs(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	items, err := buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	require.NotEmpty(t, items)

	item := items[0]
	require.NotNil(t, item.Graph)
	require.NotNil(t, item.ExplorerGraph)

	assert.Equal(t, "standard", item.Graph.Mode)
	assert.Equal(t, "change", item.ExplorerGraph.Mode)
	assert.NotEmpty(t, item.Graph.NodeChangeTree, "raw document tree must stay on the standard graph")
	assert.Empty(t, item.ExplorerGraph.NodeChangeTree, "change explorer graph should not transport the raw tree")
	assert.NotEmpty(t, item.Graph.Changes, "standard graph should preserve deduplicated changes")
	assert.Empty(t, item.ExplorerGraph.Changes, "change explorer graph should not duplicate the change list")

	var standardNodes []map[string]any
	var explorerNodes []map[string]any
	require.NoError(t, json.Unmarshal(item.Graph.Nodes, &standardNodes))
	require.NoError(t, json.Unmarshal(item.ExplorerGraph.Nodes, &explorerNodes))
	require.NotEmpty(t, standardNodes)
	require.NotEmpty(t, explorerNodes)

	var standardNodeWithInstance map[string]any
	for _, node := range standardNodes {
		if _, ok := node["instance"]; ok {
			standardNodeWithInstance = node
			break
		}
	}
	var explorerNodeWithChildChanges map[string]any
	for _, node := range explorerNodes {
		if _, ok := node["childChanges"]; ok {
			explorerNodeWithChildChanges = node
			break
		}
	}

	require.NotNil(t, standardNodeWithInstance)
	require.NotNil(t, explorerNodeWithChildChanges)
	assert.Contains(t, standardNodeWithInstance, "instance", "standard graph nodes render semantic bodies")
	assert.Contains(t, explorerNodeWithChildChanges, "childChanges", "change explorer nodes render change summaries")
}

type newHtmlNodeGraph struct {
	Nodes []map[string]any
	Root  map[string]any
}
