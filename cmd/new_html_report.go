// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"text/template"
	"time"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	newHtmlReport "github.com/pb33f/openapi-changes/new-html-report"
	"github.com/spf13/cobra"
)

func printHTMLReportUsage(noColor bool) {
	printNewCommandUsage("html-report",
		"Generates an interactive HTML report of API changes.\nThe report is fully self-contained and works offline.",
		noColor)
}

// buildHTMLReportItems runs the changerator pipeline on each commit and produces
// ReportItems for the HTML report. Any commit/render failure aborts report generation.
func buildHTMLReportItems(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*newHtmlReport.ReportItem, error) {
	items := make([]*newHtmlReport.ReportItem, 0, len(commits))
	var buildErrors []error

	for i, commit := range commits {
		result, err := runChangerator(commit, breakingConfig)
		if err != nil {
			emitCommitWarning(commit.Hash, err)
			buildErrors = append(buildErrors, err)
			continue
		}
		if result == nil {
			continue
		}

		changeId := strconv.Itoa(i)
		item, err := newHtmlReport.BuildReportItem(
			commit,
			result.Changerator,
			result.DocChanges,
			result.RightDrDoc,
			changeId,
		)
		result.Release()

		if err != nil {
			emitCommitWarning(commit.Hash, fmt.Errorf("building report item: %w", err))
			buildErrors = append(buildErrors, err)
			continue
		}

		items = append(items, item)
	}

	if len(buildErrors) > 0 {
		if len(items) == 0 {
			return nil, fmt.Errorf("all %d commits failed to build report items: %w", len(buildErrors), errors.Join(buildErrors...))
		}
		return nil, fmt.Errorf("%d commits failed to build report items: %w", len(buildErrors), errors.Join(buildErrors...))
	}
	return items, nil
}

// generateNewHTMLReport assembles the full HTML report from commits.
func generateNewHTMLReport(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, noExplorer bool, args ...string) ([]byte, error) {
	items, err := buildHTMLReportItems(commits, breakingConfig)
	if err != nil {
		return nil, err
	}
	if len(items) == 0 {
		return nil, nil
	}

	history := newHtmlReport.BuildHistoryData(items)

	payload := &newHtmlReport.ReportPayload{
		Version:       1,
		DateGenerated: time.Now().Format(time.RFC3339),
		AppVersion:    Version,
		Items:         items,
		History:       history,
	}

	// For left/right comparisons, include sanitized spec paths (basename only)
	if len(args) == 2 && len(items) == 1 {
		payload.OriginalPath = filepath.Base(args[0])
		payload.ModifiedPath = filepath.Base(args[1])
	}

	// json.Marshal escapes <, >, & by default — prevents </script> injection.
	payloadJSON, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("marshaling report payload: %w", err)
	}

	// Use text/template, NOT html/template — html/template would HTML-escape the JSON payload.
	// This is intentional and matches the old html-report/build_report.go pattern.
	reportData := newHtmlReport.NewReportData(string(payloadJSON), noExplorer)

	tmpl := template.New("header")
	t, err := tmpl.Parse(newHtmlReport.GetHeaderTemplate())
	if err != nil {
		return nil, fmt.Errorf("parsing header template: %w", err)
	}
	_, err = t.New("report").Parse(newHtmlReport.GetReportTemplate())
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

func writeHTMLReportFile(reportFile string, report []byte, styles commandStyles) error {
	err := os.WriteFile(reportFile, report, 0644)
	if err != nil {
		return fmt.Errorf("failed to write report: %w", err)
	}
	fmt.Println(styles.success.Render(fmt.Sprintf("report written to '%s' (%dkb)", reportFile, len(report)/1024)))
	return nil
}

func GetNewHTMLReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "html-report",
		Short:        "Generate an interactive HTML report",
		Long:         "Generate a rich, interactive HTML report. The report is fully self-contained and works offline.",
		Example:      "openapi-changes html-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, configFlag := readCommonFlags(cmd)
			reportFile, _ := cmd.Flags().GetString("report-file")
			noExplorer, _ := cmd.Flags().GetBool("no-explorer")

			styles := newCommandStyles(opts.noColor)

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintNewBanner(opts.noColor)
			}

			if len(args) == 0 {
				printHTMLReportUsage(opts.noColor)
				return nil
			}

			if len(args) == 1 && !validateGitHubURL(args[0]) {
				return nil
			}

			if len(args) > 2 {
				return fmt.Errorf("too many arguments provided, expecting at most two (2)")
			}

			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				fmt.Println(styles.warn.Render(fmt.Sprintf("config error: %s", err)))
				return err
			}

			commits, err := loadCommitsFromArgs(args, opts, breakingConfig)
			if err != nil {
				return err
			}

			report, err := generateNewHTMLReport(commits, breakingConfig, noExplorer, args...)
			if err != nil {
				return err
			}

			if report == nil {
				printNoChangesText()
				return nil
			}
			return writeHTMLReportFile(reportFile, report, styles)
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	cmd.Flags().String("report-file", "report.html", "The name of the HTML report file (defaults to 'report.html')")
	cmd.Flags().Bool("no-explorer", false, "Exclude the explorer graph tab (smaller bundle size")
	return cmd
}
