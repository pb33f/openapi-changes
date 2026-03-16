// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"net/url"
	"os"
	"strings"
	"time"

	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/changerator/renderer"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pmezard/go-difflib/difflib"
	"github.com/spf13/cobra"
)

type markdownReportStyles struct {
	title   lipgloss.Style
	success lipgloss.Style
	warn    lipgloss.Style
}

func newMarkdownReportStyles() markdownReportStyles {
	return markdownReportStyles{
		title:   lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true),
		success: lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGreen)).Bold(true),
		warn:    lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)).Bold(true),
	}
}


func printMarkdownReportUsage(noColor bool) {
	printNewCommandUsage("new-markdown-report",
		"Generates a detailed markdown report of API changes using the doctor changerator engine.",
		noColor)
}

// renderCommitMarkdown runs the doctor changerator on a single commit and returns markdown.
// Returns (markdown, nil) on success, ("", nil) for no changes, ("", err) for failures.
func renderCommitMarkdown(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (string, error) {
	result, err := runChangerator(commit, breakingConfig)
	if err != nil {
		return "", err
	}
	if result == nil {
		return "", nil
	}
	defer result.Release()

	reporter := renderer.NewMarkdownReporter(result.DocChanges, result.RightDrDoc, commit.Data, renderer.DefaultRenderConfig())
	return reporter.Generate(), nil
}

// generateUnifiedDiff produces a unified diff between original and modified strings.
func generateUnifiedDiff(original, modified string) string {
	diff := difflib.UnifiedDiff{
		A:        difflib.SplitLines(original),
		B:        difflib.SplitLines(modified),
		FromFile: "Original",
		ToFile:   "Modified",
		Context:  3,
	}
	text, err := difflib.GetUnifiedDiffString(diff)
	if err != nil {
		fmt.Fprintf(os.Stderr, "warning: failed to generate diff: %s\n", err)
		return ""
	}
	return text
}

// generateNewMarkdownReport assembles markdown from all commits.
// Returns (nil, nil) if no commits produce changes and no errors occurred.
// Returns (nil, err) if all commits failed to render.
// Returns (bytes, nil) when at least one commit produced markdown.
func generateNewMarkdownReport(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, includeDiff bool) ([]byte, error) {
	var sb strings.Builder
	successCount := 0
	errorCount := 0
	headerWritten := false

	for i, commit := range commits {
		markdown, err := renderCommitMarkdown(commit, breakingConfig)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warning: commit %s: %s\n", commit.Hash, err)
			errorCount++
			continue
		}
		if markdown == "" {
			continue
		}

		// Write header on first success
		if !headerWritten {
			sb.WriteString("# OpenAPI Changes Report\n\n")
			sb.WriteString(fmt.Sprintf("*Generated: %s*\n\n", time.Now().Format(time.RFC3339)))
			headerWritten = true
		}

		successCount++

		// Section heading
		sb.WriteString(fmt.Sprintf("## Commit %d: %s\n\n", i+1, commit.Message))
		sb.WriteString(fmt.Sprintf("- **Hash**: %s\n", commit.Hash))
		sb.WriteString(fmt.Sprintf("- **Author**: %s\n", commit.Author))
		sb.WriteString(fmt.Sprintf("- **Date**: %s\n\n", commit.CommitDate.Format(time.RFC3339)))

		// Strip the doctor heading prefix
		content := markdown
		if strings.HasPrefix(content, "# What Changed Report\n\n") {
			content = strings.TrimPrefix(content, "# What Changed Report\n\n")
		}
		sb.WriteString(content)
		sb.WriteString("\n")

		if includeDiff && len(commit.OldData) > 0 && len(commit.Data) > 0 {
			diffText := generateUnifiedDiff(string(commit.OldData), string(commit.Data))
			if diffText != "" {
				sb.WriteString("<details>\n")
				sb.WriteString("<summary>Unified Diff</summary>\n\n")
				sb.WriteString("````diff\n")
				sb.WriteString(diffText)
				sb.WriteString("````\n\n")
				sb.WriteString("</details>\n\n")
			}
		}

		sb.WriteString("---\n\n")
	}

	if successCount == 0 && errorCount > 0 {
		return nil, fmt.Errorf("all %d commits failed to render", errorCount)
	}
	if successCount == 0 && errorCount == 0 {
		return nil, nil
	}
	return []byte(sb.String()), nil
}

func runNewLeftRightMarkdownReport(left, right string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig, includeDiff bool) ([]byte, error) {
	commits, err := loadLeftRightCommits(left, right, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	return generateNewMarkdownReport(commits, breakingConfig, includeDiff)
}

func runNewGitHistoryMarkdownReport(gitPath, filePath string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig, includeDiff bool) ([]byte, error) {
	commits, err := loadGitHistoryCommits(gitPath, filePath, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	return generateNewMarkdownReport(commits, breakingConfig, includeDiff)
}

func runNewGithubHistoryMarkdownReport(rawURL string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig, includeDiff bool) ([]byte, error) {
	commits, err := loadGitHubCommits(rawURL, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	return generateNewMarkdownReport(commits, breakingConfig, includeDiff)
}

func writeMarkdownReportFile(reportFile string, report []byte, styles markdownReportStyles) error {
	err := os.WriteFile(reportFile, report, 0644)
	if err != nil {
		return fmt.Errorf("failed to write report: %w", err)
	}
	fmt.Println(styles.success.Render(fmt.Sprintf("report written to '%s' (%dkb)", reportFile, len(report)/1024)))
	return nil
}

func GetNewMarkdownReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "new-markdown-report",
		Short:        "Generate a markdown report (new engine)",
		Long:         "Generate a detailed markdown report of API changes using the doctor changerator engine.",
		Example:      "openapi-changes new-markdown-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			noColorFlag, _ := cmd.Flags().GetBool("no-color")
			latestFlag, _ := cmd.Flags().GetBool("top")
			limitFlag, _ := cmd.Flags().GetInt("limit")
			limitTimeFlag, _ := cmd.Flags().GetInt("limit-time")
			baseFlag, _ := cmd.Flags().GetString("base")
			baseCommitFlag, _ := cmd.Flags().GetString("base-commit")
			remoteFlag, _ := cmd.Flags().GetBool("remote")
			extRefs, _ := cmd.Flags().GetBool("ext-refs")
			configFlag, _ := cmd.Flags().GetString("config")
			globalRevisionsFlag, _ := cmd.Flags().GetBool("global-revisions")
			reportFile, _ := cmd.Flags().GetString("report-file")
			includeDiff, _ := cmd.Flags().GetBool("include-diff")

			styles := markdownReportStyles{}
			if !noColorFlag {
				styles = newMarkdownReportStyles()
			}

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintNewBanner(noColorFlag)
			}

			if len(args) == 0 {
				printMarkdownReportUsage(noColorFlag)
				return nil
			}

			if len(args) == 1 {
				specURL, err := url.Parse(args[0])
				if err != nil || specURL.Host != "github.com" {
					fmt.Println("A single argument requires a github.com URL.")
					fmt.Println("For local comparison, provide two arguments: a git repository path and a file path within it.")
					return nil
				}
			}

			if len(args) > 2 {
				return fmt.Errorf("too many arguments provided, expecting at most two (2)")
			}

			opts := newSummaryOpts{
				noColor:         noColorFlag,
				latest:          latestFlag,
				limit:           limitFlag,
				limitTime:       limitTimeFlag,
				base:            baseFlag,
				baseCommit:      baseCommitFlag,
				remote:          remoteFlag,
				extRefs:         extRefs,
				globalRevisions: globalRevisionsFlag,
			}

			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				fmt.Println(styles.warn.Render(fmt.Sprintf("config error: %s", err)))
				return err
			}

			var report []byte
			switch {
			case len(args) == 1:
				report, err = runNewGithubHistoryMarkdownReport(args[0], opts, breakingConfig, includeDiff)
			case len(args) == 2:
				// Check if the first arg is a URL — if so, it's a left/right comparison,
				// not a git history operation. Resolve before os.Stat.
				firstURL, _ := url.Parse(args[0])
				if firstURL != nil && strings.HasPrefix(firstURL.Scheme, "http") {
					report, err = runNewLeftRightMarkdownReport(args[0], args[1], opts, breakingConfig, includeDiff)
				} else {
					f, statErr := os.Stat(args[0])
					if statErr != nil {
						return fmt.Errorf("cannot open file/repository: '%s'", args[0])
					}
					if f.IsDir() {
						report, err = runNewGitHistoryMarkdownReport(args[0], args[1], opts, breakingConfig, includeDiff)
					} else {
						report, err = runNewLeftRightMarkdownReport(args[0], args[1], opts, breakingConfig, includeDiff)
					}
				}
			}
			if err != nil {
				return err
			}

			if report == nil {
				fmt.Println("No changes found between specifications")
				return nil
			}
			return writeMarkdownReportFile(reportFile, report, styles)
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	cmd.Flags().StringP("report-file", "", "report.md", "The name of the Markdown report file (defaults to 'report.md')")
	cmd.Flags().Bool("include-diff", false, "Include a collapsible unified diff of the raw spec for each commit")
	return cmd
}
