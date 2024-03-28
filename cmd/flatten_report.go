// Copyright 2023-2024 Princess Beef Heavy Industries, LLC / Dave Shanley
// https://pb33f.io

package cmd

import (
	whatChanged "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

func FlattenReport(report *model.Report) *model.FlatReport {

	flatReport := &model.FlatReport{}
	flatReport.Summary = report.Summary
	var changes []*whatChanged.Change
	rpt := report.Commit.Changes
	for _, change := range rpt.GetAllChanges() {
		changes = append(changes, change)
	}
	flatReport.Changes = changes

	// Copy the Commit information from the report to the flatReport and then delete the changes
	flatReport.Commit = &model.Commit{}
	*flatReport.Commit = *report.Commit
	flatReport.Commit.Changes = nil

	return flatReport
}

func FlattenHistoricalReport(report *model.HistoricalReport) *model.FlatHistoricalReport {

	flatReport := &model.FlatHistoricalReport{}
	flatReport.GitRepoPath = report.GitRepoPath
	flatReport.GitFilePath = report.GitFilePath
	flatReport.DateGenerated = report.DateGenerated
	flatReport.Filename = report.Filename
	for _, r := range report.Reports {
		flatReport.Reports = append(flatReport.Reports, FlattenReport(r))
	}
	return flatReport
}
