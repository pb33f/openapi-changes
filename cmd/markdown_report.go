// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/pb33f/doctor/changerator/renderer"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/changecounts"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pmezard/go-difflib/difflib"
	"github.com/spf13/cobra"
)

var (
	reChangesDetected = regexp.MustCompile(`(?m)^\*\*\d+\*\* changes detected, \*\*\d+\*\* are \*\*\(💔 breaking\)\*\*\.$`)
	reAdditions       = regexp.MustCompile(`(?m)^- Additions: \*\*\d+\*\*$`)
	reModifications   = regexp.MustCompile(`(?m)^- Modifications: \*\*\d+\*\*$`)
	reRemovals        = regexp.MustCompile(`(?m)^- Removals: \*\*\d+\*\*$`)
)

func printMarkdownReportUsage(palette terminal.Palette) {
	printCommandUsage("markdown-report",
		"Generates a detailed markdown report of API changes using the doctor changerator engine.",
		palette)
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
	deduplicatedChanges := result.Changerator.DeduplicateChanges()

	markdown, err := renderer.NewHTMLRenderer(renderer.DefaultRenderConfig()).RenderMarkdown(&renderer.RenderInput{
		DocumentChanges:     result.DocChanges,
		Doctor:              result.RightDrDoc,
		RightDocContent:     commit.Data,
		DeduplicatedChanges: deduplicatedChanges,
		Config:              renderer.DefaultRenderConfig(),
	})
	if err != nil {
		return "", err
	}
	return rewriteMarkdownSummary(markdown, deduplicatedChanges), nil
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

func rewriteMarkdownSummary(markdown string, deduplicatedChanges []*whatChangedModel.Change) string {
	if markdown == "" || len(deduplicatedChanges) == 0 {
		return markdown
	}

	counts := changecounts.FromChanges(deduplicatedChanges)

	markdown = reChangesDetected.
		ReplaceAllString(markdown, fmt.Sprintf("**%d** changes detected, **%d** are **(💔 breaking)**.", counts.Total, counts.Breaking))
	markdown = reAdditions.
		ReplaceAllString(markdown, fmt.Sprintf("- Additions: **%d**", counts.Additions))
	markdown = reModifications.
		ReplaceAllString(markdown, fmt.Sprintf("- Modifications: **%d**", counts.Modifications))
	markdown = reRemovals.
		ReplaceAllString(markdown, fmt.Sprintf("- Removals: **%d**", counts.Removals))

	if table := buildDeduplicatedObjectStatsTable(deduplicatedChanges); table != "" {
		start := strings.Index(markdown, "| Object")
		breakdown := strings.Index(markdown, "## Change Breakdown")
		if start >= 0 && breakdown > start {
			markdown = markdown[:start] + table + markdown[breakdown:]
		}
	}

	return markdown
}

type markdownObjectStat struct {
	label    string
	total    int
	breaking int
	order    int
}

func buildDeduplicatedObjectStatsTable(deduplicatedChanges []*whatChangedModel.Change) string {
	typeOrders := map[string]int{
		"Contact":              10,
		"Info":                 20,
		"Operation":            30,
		"Parameter":            40,
		"PathItem":             50,
		"Request Body":         60,
		"Response":             70,
		"Responses":            80,
		"Schema":               90,
		"Security Requirement": 100,
		"Security Scheme":      110,
		"OAuth Flow":           120,
		"Tag":                  130,
	}

	normalizeType := func(changeType string) string {
		switch changeType {
		case "contact":
			return "Contact"
		case "info":
			return "Info"
		case "operation":
			return "Operation"
		case "parameter":
			return "Parameter"
		case "pathItem":
			return "PathItem"
		case "requestBody":
			return "Request Body"
		case "response":
			return "Response"
		case "responses":
			return "Responses"
		case "schema":
			return "Schema"
		case "security":
			return "Security Requirement"
		case "securityScheme":
			return "Security Scheme"
		case "oauthFlow":
			return "OAuth Flow"
		case "tag", "tags":
			return "Tag"
		default:
			return ""
		}
	}

	statsByLabel := make(map[string]*markdownObjectStat)
	for _, change := range deduplicatedChanges {
		if change == nil {
			continue
		}
		label := normalizeType(change.Type)
		if label == "" {
			continue
		}
		stat := statsByLabel[label]
		if stat == nil {
			stat = &markdownObjectStat{label: label, order: typeOrders[label]}
			statsByLabel[label] = stat
		}
		stat.total++
		if change.Breaking {
			stat.breaking++
		}
	}

	if len(statsByLabel) == 0 {
		return ""
	}

	rows := make([]*markdownObjectStat, 0, len(statsByLabel))
	for _, stat := range statsByLabel {
		rows = append(rows, stat)
	}
	sort.Slice(rows, func(i, j int) bool {
		if rows[i].order != rows[j].order {
			return rows[i].order < rows[j].order
		}
		return rows[i].label < rows[j].label
	})

	var sb strings.Builder
	sb.WriteString("| Object               | Total Changes | Breaking Changes |\n")
	sb.WriteString("|----------------------|---------------|------------------|\n")
	for _, row := range rows {
		breaking := "-"
		if row.breaking > 0 {
			breaking = fmt.Sprintf("%d", row.breaking)
		}
		sb.WriteString(fmt.Sprintf("| %s | %d | %s |\n", row.label, row.total, breaking))
	}
	sb.WriteString("\n")
	return sb.String()
}

func isSyntheticLeftRightCommit(commit *model.Commit) bool {
	if commit == nil {
		return false
	}
	return commit.Synthetic
}

// generateMarkdownReport assembles markdown from all commits.
// Returns (nil, nil) if no commits produce changes and no errors occurred.
// Returns (nil, err) if every candidate commit fails to render.
// Returns (bytes, nil) when at least one commit renders successfully; failed
// commits are logged to stderr and skipped.
func generateMarkdownReport(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, includeDiff bool) ([]byte, error) {
	var sb strings.Builder
	successCount := 0
	errorCount := 0
	headerWritten := false
	includeCommitMetadata := true

	for i, commit := range commits {
		markdown, err := renderCommitMarkdown(commit, breakingConfig)
		if err != nil {
			emitCommitWarning(commit.Hash, err)
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
		if successCount == 1 {
			includeCommitMetadata = !isSyntheticLeftRightCommit(commit)
		}

		if includeCommitMetadata {
			sb.WriteString(fmt.Sprintf("## Commit %d: %s\n\n", i+1, commit.Message))
			sb.WriteString(fmt.Sprintf("- **Hash**: %s\n", commit.Hash))
			sb.WriteString(fmt.Sprintf("- **Author**: %s\n", commit.Author))
			sb.WriteString(fmt.Sprintf("- **Date**: %s\n\n", commit.CommitDate.Format(time.RFC3339)))
		}

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
	if errorCount > 0 {
		fmt.Fprintf(os.Stderr, "warning: %d commits failed to render\n", errorCount)
	}
	if successCount == 0 && errorCount == 0 {
		return nil, nil
	}
	return []byte(sb.String()), nil
}

func GetMarkdownReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "markdown-report",
		Short:        "Generate a markdown report",
		Long:         "Generate a detailed markdown report of API changes rendered as markdown",
		Example:      "openapi-changes markdown-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			input, err := prepareCommandRun(cmd, args, printMarkdownReportUsage)
			if err != nil {
				return err
			}
			if input == nil {
				return nil
			}
			reportFile, _ := cmd.Flags().GetString("report-file")
			includeDiff, _ := cmd.Flags().GetBool("include-diff")
			styles := commandStylesFor(input.Opts.palette)

			report, err := generateMarkdownReport(input.Commits, input.BreakingConfig, includeDiff)
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
	cmd.Flags().StringP("report-file", "", "report.md", "The name of the Markdown report file (defaults to 'report.md')")
	cmd.Flags().Bool("include-diff", false, "Include a collapsible unified diff of the raw spec for each commit")
	return cmd
}
