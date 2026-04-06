// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"os"

	"github.com/pb33f/libopenapi/what-changed/reports"
	"github.com/pb33f/openapi-changes/model"
)

func createReport(commit *model.Commit) *model.Report {
	report := reports.CreateOverallReport(commit.Changes)
	return &model.Report{Summary: report.ChangeReport, Commit: commit}
}

func writeReportFile(reportFile string, report []byte, styles commandStyles) error {
	err := os.WriteFile(reportFile, report, 0644)
	if err != nil {
		return fmt.Errorf("failed to write report: %w", err)
	}
	fmt.Println(styles.success.Render(fmt.Sprintf("report written to '%s' (%dkb)", reportFile, len(report)/1024)))
	return nil
}
