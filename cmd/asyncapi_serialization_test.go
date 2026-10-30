package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	v3 "github.com/pb33f/doctor/model/high/v3"
	htmlReport "github.com/pb33f/openapi-changes/html-report"
	"github.com/pb33f/testify/require"
)

func TestAsyncAPIHTMLExplorerConnectivityAndCounts(t *testing.T) {
	commits, err := loadLeftRightCommits("../sample-specs/asyncapi-original.yaml", "../sample-specs/asyncapi.yaml", summaryOpts{})
	require.NoError(t, err)
	items, err := buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	require.Len(t, items, 1)
	item := items[0]
	require.Equal(t, 5, item.Summary.TotalChanges)
	require.Equal(t, 4, item.Summary.BreakingChanges)
	for _, graph := range []*htmlReport.GraphData{item.Graph, item.ExplorerGraph} {
		require.NotNil(t, graph)
		var nodes []struct {
			ID           string            `json:"id"`
			ParentID     string            `json:"parentId"`
			Timeline     []json.RawMessage `json:"timeline"`
			Subtree      *v3.ChangeSummary `json:"subtreeChanges"`
			Height       int               `json:"height"`
			Extensions   int               `json:"extensions"`
			ChildChanges []json.RawMessage `json:"childChanges"`
		}
		var edges []*v3.Edge
		require.NoError(t, json.Unmarshal(graph.Nodes, &nodes))
		require.NoError(t, json.Unmarshal(graph.Edges, &edges))
		ids := make(map[string]bool, len(nodes))
		for _, node := range nodes {
			ids[node.ID] = true
			if graph.Mode == "change" {
				rows := 1 + len(node.ChildChanges)
				if node.Extensions > 0 {
					rows++
				}
				require.Equal(t, rows*v3.HEIGHT, node.Height, "card height must match its visible rows: %s", node.ID)
			}
			if node.ID == "$.components.schemas.Order.properties.id" {
				require.Len(t, node.Timeline, 1, "one edit must produce one detail row")
			}
			if graph.Mode == "change" && node.ID == "root" {
				require.NotNil(t, node.Subtree)
				require.Equal(t, item.Summary.TotalChanges, node.Subtree.Total)
				require.Equal(t, item.Summary.BreakingChanges, node.Subtree.Breaking)
			}
		}
		require.Contains(t, ids, "$.components.schemas.Order.properties.id")
		pairs := make(map[string]bool, len(edges))
		edgeIDs := make(map[string]bool, len(edges))
		for _, edge := range edges {
			require.NotEmpty(t, edge.Id)
			require.False(t, edgeIDs[edge.Id], "duplicate edge ID")
			edgeIDs[edge.Id] = true
			require.Len(t, edge.Sources, 1)
			require.Len(t, edge.Targets, 1)
			require.Contains(t, ids, edge.Sources[0])
			require.Contains(t, ids, edge.Targets[0])
			pairs[edge.Sources[0]+" -> "+edge.Targets[0]] = true
		}
		for _, node := range nodes {
			if node.ParentID != "" {
				require.True(t, pairs[node.ParentID+" -> "+node.ID], "disconnected node: %s", node.ID)
			}
		}
	}
}

func TestAsyncAPIHTMLPreservesAliasBounds(t *testing.T) {
	var source strings.Builder
	source.WriteString("asyncapi: 3.0.0\ninfo: {title: Events, version: 1.0.0}\nx-data:\n  a0: &a0 {value: data}\n")
	var sizes []int
	for _, levels := range []int{0, 8} {
		for i := 1; i <= levels; i++ {
			aliases := strings.TrimSuffix(strings.Repeat(fmt.Sprintf("*a%d, ", i-1), 8), ", ")
			fmt.Fprintf(&source, "  a%d: &a%d [%s]\n", i, i, aliases)
		}
		dir := t.TempDir()
		left, right := filepath.Join(dir, "left.yaml"), filepath.Join(dir, "right.yaml")
		require.NoError(t, os.WriteFile(left, []byte(source.String()), 0600))
		require.NoError(t, os.WriteFile(right, []byte(strings.Replace(source.String(), "title: Events", "title: Events v2", 1)), 0600))
		commits, err := loadLeftRightCommits(left, right, summaryOpts{})
		require.NoError(t, err)
		report, err := generateHTMLReport(commits, nil, false, left, right)
		require.NoError(t, err)
		sizes = append(sizes, len(report))
		if levels > 0 {
			require.Contains(t, string(report), "$yamlAlias")
		}
	}
	require.Less(t, sizes[1]-sizes[0], 100000, "HTML must not expand alias targets in node properties")
}
