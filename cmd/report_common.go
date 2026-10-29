// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"
	wc "github.com/pb33f/libopenapi/what-changed/model"
	"os"
	"strings"

	"github.com/pb33f/libopenapi/what-changed/reports"
	"github.com/pb33f/openapi-changes/model"
)

func createReport(commit *model.Commit) *model.Report {
	if native, ok := commit.AllChanges().(*wc.DocumentChanges); ok {
		report := reports.CreateOverallReport(native)
		return &model.Report{Summary: report.ChangeReport, Commit: commit}
	}
	summary := make(map[string]*reports.Changed)
	for _, change := range commit.AllChanges().GetAllChanges() {
		name := strings.TrimPrefix(change.Path, "$.")
		if i := strings.IndexAny(name, ".["); i >= 0 {
			name = name[:i]
		}
		if summary[name] == nil {
			summary[name] = &reports.Changed{}
		}
		summary[name].Total++
		if change.Breaking {
			summary[name].Breaking++
		}
	}
	return &model.Report{Summary: summary, Commit: commit}
}

func writeReportFile(reportFile string, report []byte, styles commandStyles) error {
	err := os.WriteFile(reportFile, report, 0644)
	if err != nil {
		return fmt.Errorf("failed to write report: %w", err)
	}
	fmt.Println(styles.success.Render(fmt.Sprintf("report written to '%s' (%dkb)", reportFile, len(report)/1024)))
	return nil
}
