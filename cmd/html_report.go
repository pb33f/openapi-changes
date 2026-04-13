// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strconv"
	"text/template"
	"time"

	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	htmlReport "github.com/pb33f/openapi-changes/html-report"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

func printHTMLReportUsage(palette terminal.Palette) {
	printCommandUsage("html-report",
		"Generates an interactive HTML report of API changes.\nThe report is fully self-contained and works offline.",
		palette)
}

// buildHTMLReportItems runs the changerator pipeline on each commit and produces
// ReportItems for the HTML report. If at least one commit succeeds, failed
// commits are logged and skipped; an error is returned only when every
// candidate commit fails.
func buildHTMLReportItems(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*htmlReport.ReportItem, error) {
	items := make([]*htmlReport.ReportItem, 0, len(commits))
	var buildErrors []error

	for i, commit := range commits {
		result, err := runChangerator(commit, breakingConfig)
		if err != nil {
			emitCommitWarning(commit, err)
			buildErrors = append(buildErrors, wrapCommitError(commit, err))
			continue
		}
		if result == nil {
			continue
		}

		changeId := strconv.Itoa(i)
		item, err := htmlReport.BuildReportItem(
			commit,
			result.Changerator,
			result.DocChanges,
			result.RightDrDoc,
			changeId,
		)
		result.Release()

		if err != nil {
			wrappedErr := fmt.Errorf("building report item: %w", err)
			emitCommitWarning(commit, wrappedErr)
			buildErrors = append(buildErrors, wrapCommitError(commit, wrappedErr))
			continue
		}

		items = append(items, item)
	}

	if len(buildErrors) > 0 {
		if len(items) == 0 {
			return nil, fmt.Errorf("all %d commits failed to build report items: %w", len(buildErrors), errors.Join(buildErrors...))
		}
		fmt.Fprintf(os.Stderr, "warning: %d commits failed to build report items\n", len(buildErrors))
	}
	return items, nil
}

// generateHTMLReport assembles the full HTML report from commits.
func generateHTMLReport(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, noExplorer bool, args ...string) ([]byte, error) {
	items, err := buildHTMLReportItems(commits, breakingConfig)
	if err != nil {
		return nil, err
	}
	if len(items) == 0 {
		return nil, nil
	}

	history := htmlReport.BuildHistoryData(items)

	payload := &htmlReport.ReportPayload{
		Version:       1,
		DateGenerated: time.Now().Format(time.RFC3339),
		AppVersion:    Version,
		Items:         items,
		History:       history,
	}

	// For left/right comparisons, preserve explicit git-ref labels, sanitize URL
	// labels, and keep plain local files compact.
	if len(args) == 2 && len(items) == 1 {
		payload.OriginalPath = displayLabelForHTML(args[0])
		payload.ModifiedPath = displayLabelForHTML(args[1])
	}

	// json.Marshal escapes <, >, & by default — prevents </script> injection.
	payloadJSON, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("marshaling report payload: %w", err)
	}

	// Use text/template, NOT html/template — html/template would HTML-escape the JSON payload.
	// This is intentional and matches the old html-report/build_report.go pattern.
	reportData := htmlReport.NewReportData(string(payloadJSON), noExplorer)

	tmpl := template.New("header")
	t, err := tmpl.Parse(htmlReport.GetHeaderTemplate())
	if err != nil {
		return nil, fmt.Errorf("parsing header template: %w", err)
	}
	_, err = t.New("report").Parse(htmlReport.GetReportTemplate())
	if err != nil {
		return nil, fmt.Errorf("parsing report template: %w", err)
	}

	var buf bytes.Buffer
	buf.Grow(len(payloadJSON) + len(reportData.BundledJS) + len(reportData.BundledCSS) + 4096)
	if err := t.ExecuteTemplate(&buf, "report", reportData); err != nil {
		return nil, fmt.Errorf("executing template: %w", err)
	}

	return buf.Bytes(), nil
}

func GetHTMLReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "html-report",
		Short:        "Generate an interactive HTML report",
		Long:         "Generate a rich, interactive HTML report. The report is fully self-contained and works offline.",
		Example:      "openapi-changes html-report HEAD~1:openapi.yaml ./openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			input, err := prepareCommandRun(cmd, args, printHTMLReportUsage)
			if err != nil {
				return err
			}
			if input == nil {
				return nil
			}
			reportFile, _ := cmd.Flags().GetString("report-file")
			noExplorer, _ := cmd.Flags().GetBool("no-explorer")
			styles := commandStylesFor(input.Opts.palette)

			report, err := generateHTMLReport(input.Commits, input.BreakingConfig, noExplorer, args...)
			if err != nil {
				return err
			}

			if report == nil {
				printNoChangesText()
				return nil
			}
			return writeReportFile(reportFile, report, styles)
		},
	}
	addTerminalThemeFlags(cmd)
	cmd.Flags().String("report-file", "report.html", "The name of the HTML report file (defaults to 'report.html')")
	cmd.Flags().Bool("no-explorer", false, "Exclude the explorer graph tab (smaller bundle size)")
	return cmd
}
