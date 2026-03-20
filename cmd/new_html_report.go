// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"text/template"
	"time"

	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	newHtmlReport "github.com/pb33f/openapi-changes/new-html-report"
	"github.com/spf13/cobra"
)

type htmlReportStyles struct {
	title   lipgloss.Style
	success lipgloss.Style
	warn    lipgloss.Style
}

func newHTMLReportStyles() htmlReportStyles {
	return htmlReportStyles{
		title:   lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true),
		success: lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGreen)).Bold(true),
		warn:    lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)).Bold(true),
	}
}

func printHTMLReportUsage(noColor bool) {
	printNewCommandUsage("new-html-report",
		"Generates an interactive HTML report of API changes using the doctor changerator engine.\nThe report is fully self-contained and works offline.",
		noColor)
}

// buildHTMLReportItems runs the changerator pipeline on each commit and produces
// ReportItems for the HTML report. Returns (items, nil) on success.
func buildHTMLReportItems(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*newHtmlReport.ReportItem, error) {
	items := make([]*newHtmlReport.ReportItem, 0, len(commits))
	var lastErr error

	for i, commit := range commits {
		result, err := runChangerator(commit, breakingConfig)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warning: commit %s: %s\n", commit.Hash, err)
			lastErr = err
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
		// Release after BuildReportItem is done with the data
		result.Release()

		if err != nil {
			fmt.Fprintf(os.Stderr, "warning: commit %s: building report item: %s\n", commit.Hash, err)
			lastErr = err
			continue
		}

		items = append(items, item)
	}

	if len(items) == 0 && lastErr != nil {
		return nil, fmt.Errorf("all commits failed to build report items: %w", lastErr)
	}
	return items, nil
}

// generateNewHTMLReport assembles the full HTML report from commits.
func generateNewHTMLReport(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, useCDN bool) ([]byte, error) {
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
		Items:         items,
		History:       history,
	}

	// json.Marshal escapes <, >, & by default — prevents </script> injection.
	payloadJSON, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("marshaling report payload: %w", err)
	}

	// Use text/template, NOT html/template — html/template would HTML-escape the JSON payload.
	// This is intentional and matches the old html-report/build_report.go pattern.
	reportData := newHtmlReport.NewReportData(string(payloadJSON), useCDN)

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
	bufSize := len(payloadJSON) + 4096
	if !useCDN {
		bufSize += len(reportData.BundledJS) + len(reportData.BundledCSS)
	}
	buf.Grow(bufSize)
	if err := t.ExecuteTemplate(&buf, "report", reportData); err != nil {
		return nil, fmt.Errorf("executing template: %w", err)
	}

	return buf.Bytes(), nil
}

func writeHTMLReportFile(reportFile string, report []byte, styles htmlReportStyles) error {
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
		Use:          "new-html-report",
		Short:        "Generate an interactive HTML report (new engine)",
		Long:         "Generate a rich, interactive HTML report with the doctor changerator engine.\nThe report is fully self-contained and works offline.",
		Example:      "openapi-changes new-html-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, configFlag := readCommonFlags(cmd)
			reportFile, _ := cmd.Flags().GetString("report-file")
			useCDN, _ := cmd.Flags().GetBool("use-cdn")

			styles := htmlReportStyles{}
			if !opts.noColor {
				styles = newHTMLReportStyles()
			}

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

			report, err := generateNewHTMLReport(commits, breakingConfig, useCDN)
			if err != nil {
				return err
			}

			if report == nil {
				fmt.Println("No changes found between specifications")
				return nil
			}
			return writeHTMLReportFile(reportFile, report, styles)
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	cmd.Flags().Bool("use-cdn", false, "Use CDN for JS/CSS instead of inline bundling")
	cmd.Flags().StringP("report-file", "", "report.html", "The name of the HTML report file (defaults to 'report.html')")
	return cmd
}
