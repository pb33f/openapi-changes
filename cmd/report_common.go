// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"github.com/pb33f/libopenapi/what-changed/reports"
	"github.com/pb33f/openapi-changes/model"
)

func createReport(commit *model.Commit) *model.Report {
	report := reports.CreateOverallReport(commit.Changes)
	return &model.Report{Summary: report.ChangeReport, Commit: commit}
}
