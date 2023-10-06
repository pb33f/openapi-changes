// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package html_report

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"fmt"
	"github.com/pb33f/openapi-changes/builder"
	"github.com/pb33f/openapi-changes/model"
	"text/template"
	"time"
)

//go:embed templates/report.gohtml
var reportTemplate string

//go:embed templates/header.gohtml
var header string

//go:embed ui/build/static/bundle.js
var bundledJS string

//go:embed ui/build/static/bundle.css
var bundledCSS string

type HTMLReportGenerator interface {
	GetHTMLReport() *model.HTMLReport
	GenerateReport(testMode, useCDN, embeddedMode bool) []byte
}

type ReportData struct {
	BundledJS        string            `json:"bundledJS"`
	BundledCSS       string            `json:"bundledCSS"`
	UseCDN           bool              `json:"useCDN"`
	JsCDN            string            `json:"jsCDN"`
	CssCDN           string            `json:"cssCDN"`
	TestMode         bool              `json:"test"`
	Report           string            `json:"data"`
	ReportData       *model.HTMLReport `json:"-"`
	Generated        time.Time         `json:"generated"`
	DisableTimestamp bool              `json:"-"`
	EmbeddedMode     bool              `json:"-"`
}

type htmlReport struct {
	disableTimestamp bool
	generated        time.Time
	model            *model.HTMLReport
}

func NewHTMLReport(
	disableTimestamp bool,
	generated time.Time,
	history []*model.Commit) HTMLReportGenerator {

	var reportItems []*model.HTMLReportItem

	for x := range history {
		historyItem := history[x]

		if historyItem.Changes != nil {
			tree, stats := builder.BuildTree(historyItem.Changes)
			nodes, edges := builder.BuildGraph(historyItem.Changes)
			graph := &model.GraphResult{Nodes: nodes, Edges: edges}
			commit := &model.CommitStatistics{ // JS format: 01 Jan 1970 00:00:00 GMT
				Date:        historyItem.CommitDate.Format("02 Jan 2006 15:04:05 MST"),
				Message:     historyItem.Message,
				Author:      historyItem.Author,
				AuthorEmail: historyItem.AuthorEmail,
				Hash:        historyItem.Hash,
			}

			stats.Commit = commit

			reportItem := &model.HTMLReportItem{
				OriginalSpec: string(historyItem.OldData),
				ModifiedSpec: string(historyItem.Data),
				Statistics:   stats,
				TreeNodes:    []*model.TreeNode{tree},
				Graph:        graph,
			}
			reportItems = append(reportItems, reportItem)
		} else {
			// first item
			commit := &model.CommitStatistics{ // JS format: 01 Jan 1970 00:00:00 GMT
				Date:        historyItem.CommitDate.Format("02 Jan 2006 15:04:05 MST"),
				Message:     historyItem.Message,
				Author:      historyItem.Author,
				AuthorEmail: historyItem.AuthorEmail,
				Hash:        historyItem.Hash,
			}

			stats := &model.ChangeStatistics{}
			stats.Commit = commit

			reportItem := &model.HTMLReportItem{
				OriginalSpec: string(historyItem.OldData),
				ModifiedSpec: string(historyItem.Data),
				Statistics:   stats,
			}
			reportItems = append(reportItems, reportItem)
		}
	}

	report := &model.HTMLReport{
		DateGenerated: time.Now().Format("Mon, 2 Jan 2006 15:04:05 EST"),
		ReportItems:   reportItems,
	}

	return &htmlReport{
		disableTimestamp: disableTimestamp,
		generated:        generated,
		model:            report,
	}
}

func (html *htmlReport) GetHTMLReport() *model.HTMLReport {
	return html.model
}

func (html *htmlReport) GenerateReport(test, useCDN, embedded bool) []byte {

	templateFuncs := template.FuncMap{
		"renderJSON": func(data interface{}) string {
			b, _ := json.Marshal(data)
			return string(b)
		},
	}
	tmpl := template.New("header")
	tmpl.Funcs(templateFuncs)
	t, _ := tmpl.Parse(header)
	_, err := t.New("report").Parse(reportTemplate)
	if err != nil {
		return nil
	}

	var byteBuf bytes.Buffer
	data, _ := json.Marshal(html.model)

	reportData := &ReportData{
		BundledJS:    bundledJS,
		BundledCSS:   bundledCSS,
		JsCDN:        "https://pb33f.github.io/openapi-changes/html-report/ui/build/static/bundle.js",
		CssCDN:       "https://pb33f.github.io/openapi-changes/html-report/ui/build/static/bundle.css",
		Report:       string(data),
		ReportData:   html.model,
		Generated:    time.Now(),
		TestMode:     test,
		UseCDN:       useCDN,
		EmbeddedMode: embedded,
	}
	if html.disableTimestamp {
		reportData.DisableTimestamp = true
	}
	err = t.ExecuteTemplate(&byteBuf, "report", reportData)
	if err != nil {
		return []byte(fmt.Sprintf("failed to render: %v", err.Error()))
	}

	return byteBuf.Bytes()
}
