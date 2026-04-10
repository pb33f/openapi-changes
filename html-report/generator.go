// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package html_report

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"fmt"
	"html"
	"strings"
	"sync"
	"time"

	"github.com/alecthomas/chroma/v2"
	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/alecthomas/chroma/v2/lexers"
	"github.com/alecthomas/chroma/v2/styles"
	"github.com/pb33f/doctor/changerator"
	"github.com/pb33f/doctor/changerator/renderer"
	drModel "github.com/pb33f/doctor/model"
	v3 "github.com/pb33f/doctor/model/high/v3"
	what_changed "github.com/pb33f/libopenapi/what-changed"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/changecounts"
	"github.com/pb33f/openapi-changes/model"
)

//go:embed templates/report.gohtml
var reportTemplate string

//go:embed templates/header.gohtml
var headerTemplate string

//go:embed ui/build/static/bundle.js
var bundledJS string

//go:embed ui/build/static/bundle-lite.js
var bundledLiteJS string

//go:embed ui/build/static/bundle.css
var bundledCSS string

// ReportData is the template rendering context.
type ReportData struct {
	BundledJS  string
	BundledCSS string
	Report     string
}

// NewReportData creates a ReportData for template rendering.
func NewReportData(payloadJSON string, noExplorer bool) *ReportData {
	js := bundledJS
	if noExplorer {
		js = bundledLiteJS
	}
	return &ReportData{
		BundledJS:  js,
		BundledCSS: bundledCSS,
		Report:     payloadJSON,
	}
}

// GetHeaderTemplate returns the HTML header template.
func GetHeaderTemplate() string {
	return headerTemplate
}

// GetReportTemplate returns the HTML report template.
func GetReportTemplate() string {
	return reportTemplate
}

// ReportPayload is the top-level JSON structure injected into the HTML template.
// It is the versioned contract between Go and the TypeScript frontend.
type ReportPayload struct {
	Version       int           `json:"version"`
	DateGenerated string        `json:"dateGenerated"`
	AppVersion    string        `json:"appVersion,omitempty"`
	OriginalPath  string        `json:"originalPath,omitempty"`
	ModifiedPath  string        `json:"modifiedPath,omitempty"`
	Items         []*ReportItem `json:"items"`
	History       *HistoryData  `json:"history"`
}

// ReportItem represents a single commit/comparison in the report.
type ReportItem struct {
	ChangeId            string         `json:"changeId"`
	Graph               *GraphData     `json:"graph"`
	ExplorerGraph       *GraphData     `json:"explorerGraph,omitempty"`
	Summary             *SummaryData   `json:"summary"`
	HtmlReport          string         `json:"htmlReport"`
	OriginalSpec        string         `json:"originalSpec"`
	ModifiedSpec        string         `json:"modifiedSpec"`
	OriginalHighlighted map[int]string `json:"originalHighlighted,omitempty"`
	ModifiedHighlighted map[int]string `json:"modifiedHighlighted,omitempty"`
	Commit              *CommitInfo    `json:"commit"`
}

// highlightSpecLines uses Chroma to syntax-highlight each line of a spec,
// returning a map from 1-based line number to highlighted HTML.
func highlightSpecLines(spec string) map[int]string {
	if len(spec) == 0 {
		return nil
	}

	lang := "yaml"
	if len(spec) > 0 && (spec[0] == '{' || spec[0] == '[') {
		lang = "json"
	}

	lexer := lexers.Get(lang)
	if lexer == nil {
		return escapeLines(spec)
	}
	lexer = chroma.Coalesce(lexer)

	formatter := chromahtml.New(
		chromahtml.WithClasses(true),
		chromahtml.PreventSurroundingPre(true),
	)
	style := styles.Get("dracula")

	// Tokenize the entire spec in a single pass (preserves cross-line lexer state)
	// then format and split by line. Much faster than per-line tokenization.
	iterator, err := lexer.Tokenise(nil, spec)
	if err != nil {
		return escapeLines(spec)
	}

	var buf bytes.Buffer
	buf.Grow(len(spec) * 2) // highlighted HTML is roughly 2x the source
	if err := formatter.Format(&buf, style, iterator); err != nil {
		return escapeLines(spec)
	}

	highlighted := buf.String()
	htmlLines := strings.Split(highlighted, "\n")
	result := make(map[int]string, len(htmlLines))
	for i, line := range htmlLines {
		result[i+1] = line
	}
	return result
}

func escapeLines(spec string) map[int]string {
	lines := strings.Split(spec, "\n")
	result := make(map[int]string, len(lines))
	for i, line := range lines {
		result[i+1] = html.EscapeString(line)
	}
	return result
}

// GraphData mirrors the cowboy-components GraphResponse interface.
// All node/edge/change fields use json.RawMessage to avoid triple-marshal
// (marshal nodes -> unmarshal to interface{} -> re-marshal in payload).
// Instead: marshal once, store raw bytes, embed directly in final JSON.
type GraphData struct {
	Mode           string          `json:"mode"`
	Nodes          json.RawMessage `json:"nodes"`
	Edges          json.RawMessage `json:"edges"`
	Changes        json.RawMessage `json:"changes,omitempty"`
	NodeChangeTree json.RawMessage `json:"nodeChangeTree,omitempty"`
	GraphMap       map[int]string  `json:"graphMap,omitempty"`
	Stripped       bool            `json:"stripped,omitempty"`
	StrippedCount  int             `json:"strippedCount,omitempty"`
}

// SummaryData mirrors the cowboy-components SpecSummary interface (no vacuum fields).
type SummaryData struct {
	ChangeId        string `json:"changeId"`
	Created         string `json:"created"`
	TotalChanges    int    `json:"totalChanges"`
	BreakingChanges int    `json:"breakingChanges"`
	Additions       int    `json:"additions"`
	Modifications   int    `json:"modifications"`
	Removals        int    `json:"removals"`
	GitCommitSha    string `json:"gitCommitSha,omitempty"`
	GitAuthor       string `json:"gitAuthor,omitempty"`
	GitMessage      string `json:"gitMessage,omitempty"`
}

// CommitInfo holds git metadata for a single commit.
type CommitInfo struct {
	Hash        string `json:"hash"`
	Date        string `json:"date"`
	Message     string `json:"message"`
	Author      string `json:"author"`
	AuthorEmail string `json:"authorEmail"`
}

// HistoryData matches cowboy-components ChangeHistory interface.
// QualityData and ViolationData are always nil (serializes as JSON null).
type HistoryData struct {
	QualityData   *ChartResult `json:"qualityData"`
	ChangeData    *ChartResult `json:"changeData"`
	ViolationData *ChartResult `json:"violationData"`
	ChangeIds     []string     `json:"changeIds"`
}

// ChartResult holds chart labels and datasets for history charts.
type ChartResult struct {
	Labels   []string       `json:"labels"`
	Datasets []*LineDataSet `json:"datasets"`
}

// LineDataSet is a single line in a history chart.
type LineDataSet struct {
	Label string    `json:"label"`
	Data  []float64 `json:"data"`
}

const (
	graphModeStandard = "standard"
	graphModeChange   = "change"
)

// BuildReportItem mirrors the bunkhouse production path in
// timeline_service.go:compareAndBuildReports(). It runs the full changerator
// pipeline on a single commit and packages the result for the HTML report.
//
// The caller is responsible for calling Release() on the changeratorResult
// after BuildReportItem returns — this function does not take ownership.
func BuildReportItem(
	commit *model.Commit,
	result *changerator.Changerator,
	docChanges *whatChangedModel.DocumentChanges,
	rightDrDoc *drModel.DrDocument,
	changeId string,
) (*ReportItem, error) {

	// Pipeline mirrors bunkhouse timeline_service.go:compareAndBuildReports().
	// Find root, build the raw changed tree, calculate stats, render, sanitize, marshal.
	//
	// Important: preserve the raw BuildNodeChangeTree result for graph serialization.
	// PrepareChangeViewGraph prunes and rewrites the tree for summary-style rendering,
	// which can strip valid branches (for example changed component schemas) from the
	// HTML document tree payload. The HTML report needs the full changed tree.
	var rootNode *v3.Node
	for _, node := range result.ChangedNodes {
		if node.Id == "root" {
			result.BuildNodeChangeTree(node)
			rootNode = node
			break
		}
	}

	deduplicatedChanges := result.DeduplicateChanges()
	counts := changecounts.FromChanges(deduplicatedChanges)

	htmlConfig := renderer.DefaultRenderConfig()
	htmlConfig.HTML.EnableFloatingSidebar = true
	htmlConfig.HTML.EnableNestedListFix = true
	htmlRenderer := renderer.NewHTMLRenderer(htmlConfig)
	htmlReport, err := htmlRenderer.RenderHTML(&renderer.RenderInput{
		DocumentChanges:     docChanges,
		Doctor:              rightDrDoc,
		RightDocContent:     commit.Data,
		Config:              htmlConfig,
		DeduplicatedChanges: deduplicatedChanges,
	})
	if err != nil {
		return nil, fmt.Errorf("rendering HTML report: %w", err)
	}

	result.ClearContextCache()
	drModel.SanitizeGraph(result.ChangedNodes, nil)
	graphMap := rightDrDoc.BuildGraphMap()

	standardGraph, err := buildGraphData(
		graphModeStandard,
		result.ChangedNodes,
		result.ChangedEdges,
		deduplicatedChanges,
		rootNode,
		graphMap,
	)
	if err != nil {
		return nil, err
	}

	explorerGraph, err := buildChangeExplorerGraph(result, rootNode, graphMap)
	if err != nil {
		return nil, err
	}

	summary := &SummaryData{
		ChangeId:        changeId,
		Created:         commit.CommitDate.Format(time.RFC3339),
		TotalChanges:    counts.Total,
		BreakingChanges: counts.Breaking,
		Additions:       counts.Additions,
		Modifications:   counts.Modifications,
		Removals:        counts.Removals,
		GitCommitSha:    commit.Hash,
		GitAuthor:       commit.Author,
		GitMessage:      commit.Message,
	}

	item := &ReportItem{
		ChangeId:            changeId,
		Graph:               standardGraph,
		ExplorerGraph:       explorerGraph,
		Summary:             summary,
		HtmlReport:          htmlReport,
		OriginalSpec:        string(commit.OldData),
		ModifiedSpec:        string(commit.Data),
		OriginalHighlighted: highlightSpecLines(string(commit.OldData)),
		ModifiedHighlighted: highlightSpecLines(string(commit.Data)),
		Commit:              buildCommitInfo(commit),
	}

	return item, nil
}

func buildGraphData(
	mode string,
	nodes []*v3.Node,
	edges []*v3.Edge,
	changes []*whatChangedModel.Change,
	rootNode *v3.Node,
	graphMap map[int]string,
) (*GraphData, error) {
	nodesJSON, err := json.Marshal(nodes)
	if err != nil {
		return nil, fmt.Errorf("marshaling nodes: %w", err)
	}
	edgesJSON, err := json.Marshal(edges)
	if err != nil {
		return nil, fmt.Errorf("marshaling edges: %w", err)
	}

	var changesJSON json.RawMessage
	if changes != nil {
		cj, err := json.Marshal(changes)
		if err != nil {
			return nil, fmt.Errorf("marshaling changes: %w", err)
		}
		changesJSON = json.RawMessage(cj)
	}

	var nodeChangeTreeJSON json.RawMessage
	if rootNode != nil {
		nctJSON, err := json.Marshal(rootNode)
		if err != nil {
			return nil, fmt.Errorf("marshaling nodeChangeTree: %w", err)
		}
		nodeChangeTreeJSON = json.RawMessage(nctJSON)
	}

	return &GraphData{
		Mode:           mode,
		Nodes:          json.RawMessage(nodesJSON),
		Edges:          json.RawMessage(edgesJSON),
		Changes:        changesJSON,
		NodeChangeTree: nodeChangeTreeJSON,
		GraphMap:       graphMap,
	}, nil
}

func buildChangeExplorerGraph(
	result *changerator.Changerator,
	rootNode *v3.Node,
	graphMap map[int]string,
) (*GraphData, error) {
	if rootNode == nil {
		return nil, nil
	}

	rootCopy := cloneNodeTree(rootNode)
	changeResult := changerator.NewChangerator(result.Config)
	changeResult.PrepareChangeViewGraph(rootCopy)
	filteredEdges := filterEdgesForNodes(result.ChangedEdges, changeResult.ChangedNodes)
	drModel.SanitizeGraph(changeResult.ChangedNodes, nil)

	return buildGraphData(
		graphModeChange,
		changeResult.ChangedNodes,
		filteredEdges,
		nil,
		nil,
		graphMap,
	)
}

func filterEdgesForNodes(edges []*v3.Edge, nodes []*v3.Node) []*v3.Edge {
	seen := make(map[string]bool, len(nodes))
	for _, node := range nodes {
		seen[node.Id] = true
	}

	filtered := make([]*v3.Edge, 0, len(edges))
	for _, edge := range edges {
		if edge == nil || len(edge.Sources) == 0 || len(edge.Targets) == 0 {
			continue
		}
		sourceSeen := false
		for _, source := range edge.Sources {
			if seen[source] {
				sourceSeen = true
				break
			}
		}
		if !sourceSeen {
			continue
		}
		targetSeen := false
		for _, target := range edge.Targets {
			if seen[target] {
				targetSeen = true
				break
			}
		}
		if sourceSeen && targetSeen {
			filtered = append(filtered, edge)
		}
	}
	return filtered
}

func cloneNodeTree(node *v3.Node) *v3.Node {
	if node == nil {
		return nil
	}

	clone := *node
	clone.Mutex = sync.RWMutex{}
	clone.SubtreeChanges = nil
	clone.ChildChangeSummaries = nil
	if node.Changes != nil {
		clone.Changes = append([]what_changed.Changed(nil), node.Changes...)
	}
	if node.RenderedChanges != nil {
		clone.RenderedChanges = append([]*whatChangedModel.Change(nil), node.RenderedChanges...)
	}
	if node.CleanedChanged != nil {
		clone.CleanedChanged = append([]*whatChangedModel.Change(nil), node.CleanedChanged...)
	}
	if len(node.Children) > 0 {
		clone.Children = make([]*v3.Node, len(node.Children))
		for i, child := range node.Children {
			clone.Children[i] = cloneNodeTree(child)
		}
	} else {
		clone.Children = nil
	}
	return &clone
}

func buildCommitInfo(commit *model.Commit) *CommitInfo {
	return &CommitInfo{
		Hash:        commit.Hash,
		Date:        commit.CommitDate.Format(time.RFC3339),
		Message:     commit.Message,
		Author:      commit.Author,
		AuthorEmail: commit.AuthorEmail,
	}
}

// BuildHistoryData aggregates across all ReportItems to produce chart datasets
// for the history line charts. Items are reversed so the chart reads
// oldest (left) to newest (right).
func BuildHistoryData(items []*ReportItem) *HistoryData {
	n := len(items)
	labels := make([]string, n)
	additions := make([]float64, n)
	modifications := make([]float64, n)
	removals := make([]float64, n)
	changeIds := make([]string, n)

	for i, item := range items {
		j := n - 1 - i
		labels[j] = item.Commit.Date
		additions[j] = float64(item.Summary.Additions)
		modifications[j] = float64(item.Summary.Modifications)
		removals[j] = float64(item.Summary.Removals)
		changeIds[j] = item.ChangeId
	}

	return &HistoryData{
		ChangeData: &ChartResult{
			Labels: labels,
			Datasets: []*LineDataSet{
				{Label: "Additions", Data: additions},
				{Label: "Modifications", Data: modifications},
				{Label: "Removals", Data: removals},
			},
		},
		ChangeIds: changeIds,
	}
}
