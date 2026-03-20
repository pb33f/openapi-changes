// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package new_html_report

import (
	_ "embed"
	"encoding/json"
	"fmt"
	"time"

	"github.com/pb33f/doctor/changerator"
	"github.com/pb33f/doctor/changerator/renderer"
	drModel "github.com/pb33f/doctor/model"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

//go:embed templates/report.gohtml
var reportTemplate string

//go:embed templates/header.gohtml
var headerTemplate string

//go:embed ui/build/static/bundle.js
var bundledJS string

//go:embed ui/build/static/bundle.css
var bundledCSS string

// ReportData is the template rendering context.
type ReportData struct {
	BundledJS  string
	BundledCSS string
	UseCDN     bool
	JsCDN      string
	CssCDN     string
	TestMode   bool
	Report     string
}

// NewReportData creates a ReportData for template rendering.
func NewReportData(payloadJSON string, useCDN bool) *ReportData {
	return &ReportData{
		BundledJS:  bundledJS,
		BundledCSS: bundledCSS,
		UseCDN:     useCDN,
		JsCDN:      "https://pb33f.github.io/openapi-changes/new-html-report/ui/build/static/bundle.js",
		CssCDN:     "https://pb33f.github.io/openapi-changes/new-html-report/ui/build/static/bundle.css",
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
	Items         []*ReportItem `json:"items"`
	History       *HistoryData  `json:"history"`
}

// ReportItem represents a single commit/comparison in the report.
type ReportItem struct {
	ChangeId     string       `json:"changeId"`
	Graph        *GraphData   `json:"graph"`
	Summary      *SummaryData `json:"summary"`
	HtmlReport   string       `json:"htmlReport"`
	OriginalSpec string       `json:"originalSpec"`
	ModifiedSpec string       `json:"modifiedSpec"`
	Commit       *CommitInfo  `json:"commit"`
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
// The caller must provide a changeratorResult from cmd.runChangerator().
// This function takes ownership of the result (calls Release() internally).
func BuildReportItem(
	commit *model.Commit,
	result *changerator.Changerator,
	docChanges *whatChangedModel.DocumentChanges,
	rightDrDoc *drModel.DrDocument,
	changeId string,
) (*ReportItem, error) {

	// Pipeline mirrors bunkhouse timeline_service.go:compareAndBuildReports().
	// Find root, build change tree, calculate stats, render, sanitize, marshal.
	var rootNode interface{}
	for _, node := range result.ChangedNodes {
		if node.Id == "root" {
			result.BuildNodeChangeTree(node)
			rootNode = node
			break
		}
	}

	changeStats := result.Calculatoratron()

	htmlConfig := renderer.DefaultRenderConfig()
	htmlRenderer := renderer.NewHTMLRenderer(htmlConfig)
	htmlReport, err := htmlRenderer.RenderHTML(&renderer.RenderInput{
		DocumentChanges: docChanges,
		Doctor:          rightDrDoc,
		RightDocContent: commit.Data,
		Config:          htmlConfig,
	})
	if err != nil {
		htmlReport = fmt.Sprintf("<p>Error rendering report: %s</p>", err.Error())
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

	deduplicatedChanges := result.DeduplicateChanges()
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

	// TotalChanges/BreakingChanges use raw counts from DocumentChanges.
	// Additions/Modifications/Removals use deduplicated counts from Calculatoratron.
	summary := &SummaryData{
		ChangeId:        changeId,
		Created:         commit.CommitDate.Format(time.RFC3339),
		TotalChanges:    docChanges.TotalChanges(),
		BreakingChanges: docChanges.TotalBreakingChanges(),
		Additions:       changeStats.Additions,
		Modifications:   changeStats.Modifications,
		Removals:        changeStats.Deletions,
		GitCommitSha:    commit.Hash,
		GitAuthor:       commit.Author,
		GitMessage:      commit.Message,
	}

	item := &ReportItem{
		ChangeId:     changeId,
		Graph:        graphData,
		Summary:      summary,
		HtmlReport:   htmlReport,
		OriginalSpec: string(commit.OldData),
		ModifiedSpec: string(commit.Data),
		Commit:       buildCommitInfo(commit),
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
