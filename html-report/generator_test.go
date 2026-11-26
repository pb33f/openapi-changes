// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package html_report

import (
	"encoding/json"
	"testing"
	"testing/fstest"
	"time"

	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/libopenapi/jsonschema"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestHighlightSpecLines_YAML(t *testing.T) {
	spec := "openapi: \"3.0.0\"\ninfo:\n  title: Petstore\n"
	result := highlightSpecLines(spec)

	require.NotNil(t, result)
	assert.True(t, len(result) >= 3, "should have at least 3 lines")
	// Line 1 should be present and non-empty (highlighted HTML)
	assert.NotEmpty(t, result[1])
}

func TestHighlightSpecLines_JSON(t *testing.T) {
	spec := `{"openapi": "3.0.0", "info": {"title": "Petstore"}}`
	result := highlightSpecLines(spec)

	require.NotNil(t, result)
	assert.NotEmpty(t, result[1])
}

func TestHighlightSpecLines_Empty(t *testing.T) {
	result := highlightSpecLines("")
	assert.Nil(t, result)
}

func TestHighlightSpecLines_LineNumbering(t *testing.T) {
	spec := "line1\nline2\nline3"
	result := highlightSpecLines(spec)

	require.NotNil(t, result)
	// Lines should be 1-based
	assert.NotEmpty(t, result[1])
	assert.NotEmpty(t, result[2])
	assert.NotEmpty(t, result[3])
	// Line 0 should not exist
	_, hasZero := result[0]
	assert.False(t, hasZero)
}

func TestEscapeLines(t *testing.T) {
	spec := "<script>alert('xss')</script>\nnormal line"
	result := escapeLines(spec)

	require.NotNil(t, result)
	assert.Contains(t, result[1], "&lt;script&gt;")
	assert.Equal(t, "normal line", result[2])
}

func TestEscapeLines_LineNumbering(t *testing.T) {
	spec := "a\nb\nc"
	result := escapeLines(spec)

	assert.Equal(t, "a", result[1])
	assert.Equal(t, "b", result[2])
	assert.Equal(t, "c", result[3])
}

func TestNewReportData_Full(t *testing.T) {
	rd := NewReportData(`{"test": true}`, false)

	assert.Equal(t, `{"test": true}`, rd.Report)
	assert.NotEmpty(t, rd.BundledJS)
	assert.NotEmpty(t, rd.BundledCSS)
	// Full bundle should include the full JS
	assert.Equal(t, bundledJS, rd.BundledJS)
}

func TestNewReportData_Lite(t *testing.T) {
	rd := NewReportData(`{"test": true}`, true)

	assert.Equal(t, bundledLiteJS, rd.BundledJS)
	assert.NotEqual(t, bundledJS, rd.BundledJS, "lite should use the lite bundle")
}

func TestStandaloneSchemaReportItem(t *testing.T) {
	root := []byte("{\"title\":\"Order\",\"properties\":{\"amount\":{\"$ref\":\"money.yaml\"}}}")
	load := func(body string) *jsonschema.Document {
		cfg := datamodel.NewDocumentConfiguration()
		cfg.BasePath = "/snapshot"
		cfg.LocalFS = fstest.MapFS{"money.yaml": {Data: []byte(body)}}
		doc, err := jsonschema.Load(root, "order.json", cfg, true)
		require.NoError(t, err)
		t.Cleanup(doc.Release)
		return doc
	}
	left, right := load("minLength: 2"), load("minLength: 3")
	result, err := changerator.CompareJSONSchema(left, right, nil)
	require.NoError(t, err)
	require.NotNil(t, result)
	defer result.Release()
	commit := &model.Commit{OldData: root, Data: root, Synthetic: true, Hash: "synthetic", Message: "placeholder",
		Specification:   &model.ComparisonSpecification{Kind: "jsonschema", OriginalVersion: jsonschema.Dialect, ModifiedVersion: jsonschema.Dialect},
		OriginalSchemas: model.NewSchemaSources(left), ModifiedSchemas: model.NewSchemaSources(right)}
	item, err := BuildReportItem(commit, result.Changerator, result.Changes, nil, "0")
	require.NoError(t, err)
	require.Equal(t, 1, item.Summary.TotalChanges)
	require.Equal(t, 1, item.Summary.BreakingChanges)
	require.Equal(t, string(root), item.OriginalSpec)
	require.Equal(t, string(root), item.ModifiedSpec)
	require.Equal(t, map[string]string{"money.yaml": "minLength: 2"}, item.OriginalSources)
	require.Equal(t, map[string]string{"money.yaml": "minLength: 3"}, item.ModifiedSources)
	require.Contains(t, item.OriginalSourcesHighlighted["money.yaml"][1], "minLength")
	require.Contains(t, item.ModifiedSourcesHighlighted["money.yaml"][1], "minLength")
	require.Nil(t, item.Commit)
	require.Nil(t, BuildHistoryData([]*ReportItem{item}))
	encoded, err := json.Marshal(item)
	require.NoError(t, err)
	assert.NotContains(t, string(encoded), "\"commit\":")
	assert.NotContains(t, string(encoded), "gitCommitSha")
	assert.Contains(t, string(item.Graph.Nodes), "\"documentKind\":\"jsonschema\"")
	assert.Contains(t, string(item.Graph.Nodes), "\"modifiedDocument\":\"money.yaml\"")
}

func TestCollectionReportKeepsBothReferencesToMovedSchemaWithRemovedConstraint(t *testing.T) {
	load := func(name, money string) *jsonschema.Document {
		doc, err := jsonschema.LoadCollection(map[string][]byte{
			"order.yaml":   []byte("title: Order\nproperties:\n  total:\n    $ref: urn:money\n"),
			"invoice.yaml": []byte("title: Invoice\nproperties:\n  amount:\n    $ref: urn:money\n"),
			name:           []byte(money),
		}, t.TempDir(), nil)
		require.NoError(t, err)
		t.Cleanup(doc.Release)
		return doc
	}
	const money = "$id: urn:money\ntitle: Money\nproperties:\n  currency:\n    type: string\n"
	left, right := load("a/money.yaml", money+"    minLength: 3\n"), load("b/money.yaml", money)
	result, err := changerator.CompareJSONSchema(left, right, nil)
	require.NoError(t, err)
	require.NotNil(t, result)
	t.Cleanup(result.Release)
	commit := &model.Commit{
		Synthetic: true, Specification: &model.ComparisonSpecification{Kind: "jsonschema"},
		OriginalSchemas: model.NewSchemaSources(left), ModifiedSchemas: model.NewSchemaSources(right),
	}
	item, err := BuildReportItem(commit, result.Changerator, result.Changes, nil, "0")
	require.NoError(t, err)
	require.Equal(t, 1, item.Summary.TotalChanges)
	require.Equal(t, 1, item.Summary.Removals)
	require.Empty(t, item.OriginalSpec)
	require.Empty(t, item.ModifiedSpec)
	require.Len(t, item.OriginalSources, 3)
	require.Len(t, item.ModifiedSources, 3)
	require.Len(t, item.OriginalSourcesHighlighted, 3)
	require.Len(t, item.ModifiedSourcesHighlighted, 3)
	require.Equal(t, money+"    minLength: 3\n", item.OriginalSources["a/money.yaml"])
	require.Equal(t, money, item.ModifiedSources["b/money.yaml"])

	for _, graph := range []*GraphData{item.Graph, item.ExplorerGraph} {
		require.NotNil(t, graph)
		type graphNode struct {
			ID, Label, Origin string
			Timeline          []*whatChangedModel.Change
		}
		var nodes []graphNode
		require.NoError(t, json.Unmarshal(graph.Nodes, &nodes))
		byID := make(map[string]graphNode, len(nodes))
		var edits []*whatChangedModel.Change
		for _, node := range nodes {
			byID[node.ID] = node
			edits = append(edits, node.Timeline...)
		}
		require.Equal(t, "Schemas", byID["root"].Label)
		require.Len(t, edits, 1)
		require.Equal(t, "a/money.yaml", edits[0].Context.OriginalDocument)
		require.Equal(t, "b/money.yaml", edits[0].Context.ModifiedDocument)
		require.Equal(t, 6, *edits[0].Context.OriginalLine)
		require.Nil(t, edits[0].Context.NewLine)
		var edges []v3.Edge
		require.NoError(t, json.Unmarshal(graph.Edges, &edges))
		var uses []string
		for _, edge := range edges {
			if edge.Ref == "urn:money" {
				require.Len(t, edge.Sources, 1)
				require.Len(t, edge.Targets, 1)
				use := byID[edge.Sources[0]]
				require.Empty(t, use.Timeline)
				require.Equal(t, "Money", byID[edge.Targets[0]].Label)
				uses = append(uses, use.Origin)
			}
		}
		require.ElementsMatch(t, []string{"order.yaml", "invoice.yaml"}, uses)
	}
}

func TestBuildHistoryData(t *testing.T) {
	items := []*ReportItem{
		{
			ChangeId: "0",
			Commit:   &CommitInfo{Date: "2024-01-01T00:00:00Z"},
			Summary: &SummaryData{
				Additions:     5,
				Modifications: 3,
				Removals:      1,
			},
		},
		{
			ChangeId: "1",
			Commit:   &CommitInfo{Date: "2024-02-01T00:00:00Z"},
			Summary: &SummaryData{
				Additions:     2,
				Modifications: 0,
				Removals:      4,
			},
		},
	}

	history := BuildHistoryData(items)

	require.NotNil(t, history)
	require.NotNil(t, history.ChangeData)
	assert.Nil(t, history.QualityData)
	assert.Nil(t, history.ViolationData)

	// Items are newest-first, chart data is reversed to chronological (oldest-first)
	assert.Equal(t, []string{"2024-02-01T00:00:00Z", "2024-01-01T00:00:00Z"}, history.ChangeData.Labels)
	assert.Equal(t, []string{"1", "0"}, history.ChangeIds)

	require.Len(t, history.ChangeData.Datasets, 3)
	assert.Equal(t, "Additions", history.ChangeData.Datasets[0].Label)
	assert.Equal(t, []float64{2, 5}, history.ChangeData.Datasets[0].Data)
	assert.Equal(t, "Modifications", history.ChangeData.Datasets[1].Label)
	assert.Equal(t, []float64{0, 3}, history.ChangeData.Datasets[1].Data)
	assert.Equal(t, "Removals", history.ChangeData.Datasets[2].Label)
	assert.Equal(t, []float64{4, 1}, history.ChangeData.Datasets[2].Data)
}

func TestBuildHistoryData_Empty(t *testing.T) {
	history := BuildHistoryData([]*ReportItem{})

	require.NotNil(t, history)
	assert.Empty(t, history.ChangeIds)
	assert.Empty(t, history.ChangeData.Labels)
}

func TestBuildCommitInfo(t *testing.T) {
	now := time.Now()
	info := buildCommitInfo(&model.Commit{
		Hash:        "abc123",
		Message:     "fix things",
		Author:      "Dave",
		AuthorEmail: "dave@example.com",
		CommitDate:  now,
	})

	assert.Equal(t, "abc123", info.Hash)
	assert.Equal(t, "fix things", info.Message)
	assert.Equal(t, "Dave", info.Author)
	assert.Equal(t, "dave@example.com", info.AuthorEmail)
	assert.Equal(t, now.Format(time.RFC3339), info.Date)
}

// The report tree must have independent children and change slices so report
// sanitization cannot remove data from the explorer tree.
func TestCloneNodeTree(t *testing.T) {
	require.Nil(t, cloneNodeTree(nil))
	originalChange := &whatChangedModel.Change{Property: "description"}
	source := &v3.Node{
		Id: "$.paths", Label: "paths", OriginLocation: "petstore.yaml",
		RenderedChanges:      []*whatChangedModel.Change{originalChange},
		CleanedChanged:       []*whatChangedModel.Change{originalChange},
		SubtreeChanges:       &v3.ChangeSummary{},
		ChildChangeSummaries: []*v3.ChildChangeSummary{{NodeId: "child"}},
		Children:             []*v3.Node{{Id: "child", Label: "pet"}, nil},
	}
	source.Mutex.Lock()
	defer source.Mutex.Unlock()

	clone := cloneNodeTree(source)
	require.NotSame(t, source, clone)
	require.True(t, clone.Mutex.TryLock(), "the clone must not inherit the source lock")
	clone.Mutex.Unlock()
	assert.Equal(t, source.Id, clone.Id)
	assert.Equal(t, source.OriginLocation, clone.OriginLocation)
	assert.Nil(t, clone.SubtreeChanges)
	assert.Nil(t, clone.ChildChangeSummaries)
	require.Len(t, clone.Children, 2)
	require.NotSame(t, source.Children[0], clone.Children[0])
	assert.Nil(t, clone.Children[1])
	assert.Nil(t, clone.Children[0].Children)

	clone.Children[0].Label = "report-only label"
	clone.RenderedChanges[0] = nil
	clone.CleanedChanged[0] = nil
	assert.Equal(t, "pet", source.Children[0].Label)
	assert.Same(t, originalChange, source.RenderedChanges[0])
	assert.Same(t, originalChange, source.CleanedChanged[0])
	assert.NotNil(t, source.SubtreeChanges)
	assert.Len(t, source.ChildChangeSummaries, 1)
}
