// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package new_html_report

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"fmt"
	"html"
	"strings"
	"time"

	"github.com/alecthomas/chroma/v2"
	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/alecthomas/chroma/v2/lexers"
	"github.com/alecthomas/chroma/v2/styles"
	"github.com/pb33f/doctor/changerator"
	"github.com/pb33f/doctor/changerator/renderer"
	drModel "github.com/pb33f/doctor/model"
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
	var rootNode interface{}
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

	nodesJSON, err := json.Marshal(result.ChangedNodes)
	if err != nil {
		return nil, fmt.Errorf("marshaling nodes: %w", err)
	}
	edgesJSON, err := json.Marshal(result.ChangedEdges)
	if err != nil {
		return nil, fmt.Errorf("marshaling edges: %w", err)
	}

	changesJSON, err := json.Marshal(deduplicatedChanges)
	if err != nil {
		return nil, fmt.Errorf("marshaling changes: %w", err)
	}

	var nodeChangeTreeJSON json.RawMessage
	if rootNode != nil {
		nctJSON, err := json.Marshal(rootNode)
		if err != nil {
			return nil, fmt.Errorf("marshaling nodeChangeTree: %w", err)
		}
		nodeChangeTreeJSON = json.RawMessage(nctJSON)
	}

	graphData := &GraphData{
		Nodes:          json.RawMessage(nodesJSON),
		Edges:          json.RawMessage(edgesJSON),
		Changes:        json.RawMessage(changesJSON),
		NodeChangeTree: nodeChangeTreeJSON,
		GraphMap:       graphMap,
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
		Graph:               graphData,
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
// for the history line charts.
func BuildHistoryData(items []*ReportItem) *HistoryData {
	labels := make([]string, len(items))
	additions := make([]float64, len(items))
	modifications := make([]float64, len(items))
	removals := make([]float64, len(items))
	changeIds := make([]string, len(items))

	for i, item := range items {
		labels[i] = item.Commit.Date
		additions[i] = float64(item.Summary.Additions)
		modifications[i] = float64(item.Summary.Modifications)
		removals[i] = float64(item.Summary.Removals)
		changeIds[i] = item.ChangeId
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
