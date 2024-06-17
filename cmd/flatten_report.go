// Copyright 2023-2024 Princess Beef Heavy Industries, LLC / Dave Shanley
// https://pb33f.io

package cmd

import (
	"github.com/pb33f/openapi-changes/model"
)

func FlattenReport(report *model.Report) *model.FlatReport {

	flatReport := &model.FlatReport{}
	flatReport.Summary = report.Summary
	var changes []*model.HashedChange
	rpt := report.Commit.Changes
	for _, change := range rpt.GetAllChanges() {
		hashedChange := model.HashedChange{
			Change: change,
		}

		hashedChange.HashChange()

		changes = append(changes, &hashedChange)
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
	flatReport.Reports = make([]*model.FlatReport, 0)
	for _, r := range report.Reports {
		flatReport.Reports = append(flatReport.Reports, FlattenReport(r))
	}
	return flatReport
}
