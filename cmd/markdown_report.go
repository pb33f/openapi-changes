// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"bytes"
	"cmp"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"time"

	"github.com/pb33f/doctor/changerator/renderer"
	"github.com/pb33f/doctor/terminal"
	"github.com/pb33f/libopenapi/jsonschema"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/changecounts"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pmezard/go-difflib/difflib"
	"github.com/spf13/cobra"
)

func printMarkdownReportUsage(palette terminal.Palette) {
	printCommandUsage("markdown-report",
		"Generates a detailed Markdown change report using the doctor changerator engine.",
		palette)
}

// renderCommitMarkdown runs the doctor changerator on a single commit and returns markdown.
// Returns (markdown, nil) on success, ("", nil) for no changes, ("", err) for failures.
func renderCommitMarkdown(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, includeDiff bool) (string, error) {
	result, err := runChangerator(commit, breakingConfig)
	if err != nil {
		return "", err
	}
	if result == nil {
		return "", nil
	}
	defer result.Release()
	deduplicatedChanges := changecounts.Deduplicate(result.DocChanges.GetAllChanges())

	markdown, err := renderer.NewHTMLRenderer(renderer.DefaultRenderConfig()).RenderMarkdown(&renderer.RenderInput{
		ChangeReport:        result.DocChanges,
		SchemaLabels:        result.Changerator.SchemaLabels,
		Doctor:              result.RightDrDoc,
		RightDocContent:     commit.Data,
		DeduplicatedChanges: deduplicatedChanges,
		Config:              renderer.DefaultRenderConfig(),
	})
	if err != nil {
		return "", err
	}
	if includeDiff {
		diff := comparisonDiff(commit, result)
		if diff != "" {
			markdown += "\n<details>\n<summary>Unified Diff</summary>\n\n"
			fence := diffFence(diff)
			markdown += fence + "diff\n" + diff + fence + "\n\n</details>\n"
		}
	}
	return markdown, nil
}

// Choose a fence that can contain the entire authored diff.
func diffFence(diff string) string {
	width, run := 3, 0
	for _, ch := range diff {
		if ch == 96 {
			run++
			width = max(width, run)
		} else {
			run = 0
		}
	}
	return strings.Repeat(string(rune(96)), width+1)
}

func comparisonDiff(commit *model.Commit, result *changeratorResult) string {
	if result.originalSchema == nil {
		return generateUnifiedDiff("Original", "Modified", commit.OldData, commit.Data)
	}
	type filePair struct{ original, modified string }
	old, newer := result.originalSchema, result.modifiedSchema
	filesByID := func(doc *jsonschema.Document) map[string]string {
		m := make(map[string]string, len(doc.Resources))
		for _, r := range doc.Resources {
			m[r.ID] = r.Source.Name
		}
		return m
	}
	oldFiles, newFiles := filesByID(old), filesByID(newer)
	pairs := make(map[filePair]struct{})
	for _, change := range result.DocChanges.GetAllChanges() {
		from, to := oldFiles[change.SchemaResource], newFiles[change.SchemaResource]
		if ctx := change.Context; ctx != nil {
			if ctx.OriginalDocument != "" {
				from = ctx.OriginalDocument
			}
			if ctx.ModifiedDocument != "" {
				to = ctx.ModifiedDocument
			}
		}
		if from == "" && old.Sources[to] != nil {
			from = to
		}
		if to == "" && newer.Sources[from] != nil {
			to = from
		}
		if old.Root != nil && newer.Root != nil {
			if from == "" && to == newer.Root.Source.Name {
				from = old.Root.Source.Name
			}
			if to == "" && from == old.Root.Source.Name {
				to = newer.Root.Source.Name
			}
		}
		pairs[filePair{from, to}] = struct{}{}
	}
	sorted := make([]filePair, 0, len(pairs))
	for pair := range pairs {
		sorted = append(sorted, pair)
	}
	slices.SortFunc(sorted, func(a, b filePair) int {
		return cmp.Or(strings.Compare(a.original, b.original), strings.Compare(a.modified, b.modified))
	})
	var diffs strings.Builder
	for _, pair := range sorted {
		var a, b []byte
		if f := old.Sources[pair.original]; f != nil {
			a = f.Data
		}
		if f := newer.Sources[pair.modified]; f != nil {
			b = f.Data
		}
		from, to := pair.original, pair.modified
		if from == "" {
			from = "/dev/null"
		}
		if to == "" {
			to = "/dev/null"
		}
		diffs.WriteString(generateUnifiedDiff(from, to, a, b))
	}
	return diffs.String()
}

func generateUnifiedDiff(from, to string, original, modified []byte) string {
	if bytes.Equal(original, modified) {
		return ""
	}
	lines := func(data []byte) []string {
		if len(data) == 0 {
			return nil
		}
		return difflib.SplitLines(string(data))
	}
	text, err := difflib.GetUnifiedDiffString(difflib.UnifiedDiff{A: lines(original), B: lines(modified), FromFile: from, ToFile: to, Context: 3})
	if err != nil {
		fmt.Fprintf(os.Stderr, "warning: failed to generate diff: %s\n", err)
		return ""
	}
	return text
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
	defer releaseHistoryWindows(commits)
	var sb strings.Builder
	successCount := 0
	comparedCount := 0
	var renderErrors []error
	apiLabel := ""
	includeCommitMetadata := true

	for i, commit := range commits {
		markdown, err := renderCommitMarkdown(commit, breakingConfig, includeDiff)
		if err != nil {
			emitCommitWarning(commit, err)
			renderErrors = append(renderErrors, wrapCommitError(commit, err))
			continue
		}
		if commit.Comparable() {
			comparedCount++
		}
		if markdown == "" {
			continue
		}

		apiLabel = mergeAPILabel(apiLabel, commit.APILabel())
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

		sb.WriteString("---\n\n")
	}

	if comparedCount == 0 && len(renderErrors) > 0 {
		return nil, fmt.Errorf("all %d commits failed to render: %w", len(renderErrors), errors.Join(renderErrors...))
	}
	if len(renderErrors) > 0 {
		fmt.Fprintf(os.Stderr, "warning: %d commits failed to render\n", len(renderErrors))
	}
	if successCount == 0 {
		return nil, nil
	}
	// The title waits for every commit because history can change format between revisions.
	header := fmt.Sprintf("# %s Changes Report\n\n*Generated: %s*\n\n", apiLabel, time.Now().Format(time.RFC3339))
	return []byte(header + sb.String()), nil
}

// mergeAPILabel keeps a shared format label and falls back to a neutral one when formats mix.
func mergeAPILabel(current, next string) string {
	if current == "" || current == next {
		return next
	}
	return "API"
}

func GetMarkdownReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "markdown-report",
		Short:        "Generate a markdown report",
		Long:         "Generate a detailed Markdown change report",
		Example:      "openapi-changes markdown-report HEAD~1:openapi.yaml ./openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			compact, _ := cmd.Flags().GetBool("compact")
			resultFile, _ := cmd.Flags().GetString("result-file")
			reportFile, _ := cmd.Flags().GetString("report-file")
			includeDiff, _ := cmd.Flags().GetBool("include-diff")
			if err := validateCompactOptions(args, compact, includeDiff, reportFile, resultFile); err != nil {
				return err
			}
			input, err := prepareCommandRun(cmd, args, printMarkdownReportUsage)
			if err != nil {
				return err
			}
			if input == nil {
				return nil
			}
			defer input.releaseDirectInputs()
			styles := commandStylesFor(input.Opts.palette)

			if compact {
				report, outcome, err := generateCompactMarkdown(input.Commits, input.BreakingConfig)
				if err != nil {
					return err
				}
				if err := writeReportFile(reportFile, report, styles); err != nil {
					return err
				}
				if resultFile != "" {
					data, err := json.Marshal(outcome)
					if err != nil {
						return err
					}
					return os.WriteFile(resultFile, append(data, '\n'), 0600)
				}
				return nil
			}

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
	cmd.Flags().Bool("compact", false, "Write a short Markdown report for a direct left/right comparison")
	cmd.Flags().String("result-file", "", "Write completed comparison counts as JSON (requires --compact)")
	cmd.Flags().Bool("include-diff", false, "Include a collapsible unified diff of the raw spec for each commit")
	return cmd
}

func validateCompactOptions(args []string, compact, includeDiff bool, reportFile, resultFile string) error {
	if resultFile != "" && !compact {
		return errors.New("--result-file requires --compact")
	}
	if !compact {
		return nil
	}
	if len(args) != 2 {
		return errors.New("--compact requires two direct comparison inputs; history is not supported")
	}
	if info, err := os.Stat(args[0]); err == nil && info.IsDir() {
		return errors.New("--compact does not support repository history")
	}
	if includeDiff {
		return errors.New("--compact cannot be combined with --include-diff")
	}
	if resultFile != "" {
		reportPath, err := filepath.Abs(reportFile)
		if err != nil {
			return err
		}
		resultPath, err := filepath.Abs(resultFile)
		if err != nil {
			return err
		}
		reportInfo, reportErr := os.Stat(reportPath)
		resultInfo, resultErr := os.Stat(resultPath)
		if reportPath == resultPath || (reportErr == nil && resultErr == nil && os.SameFile(reportInfo, resultInfo)) {
			return errors.New("--report-file and --result-file must be different files")
		}
	}
	return nil
}
