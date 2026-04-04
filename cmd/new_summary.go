// Copyright 2025 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"fmt"
	"os"
	"sort"
	"strings"

	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/changerator/renderer"
	v3 "github.com/pb33f/doctor/model/high/v3"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/libopenapi/what-changed/reports"
	"github.com/pb33f/openapi-changes/internal/changecounts"
	"github.com/pb33f/openapi-changes/internal/security"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

// summaryStyles holds Lip Gloss v2 styles for output formatting.
type summaryStyles struct {
	title        lipgloss.Style
	breaking     lipgloss.Style
	addition     lipgloss.Style
	modification lipgloss.Style
	removal      lipgloss.Style
	stat         lipgloss.Style
}

func newSummaryStyles() summaryStyles {
	return summaryStyles{
		title:        lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true),
		breaking:     lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)).Bold(true),
		addition:     lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGreen)),
		modification: lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossYellow)),
		removal:      lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)),
		stat:         lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGrey)),
	}
}

// lipglossColorScheme adapts Lip Gloss styles to the doctor terminal.ColorScheme interface.
type lipglossColorScheme struct {
	styles summaryStyles
}

func (l lipglossColorScheme) Addition(s string) string     { return l.styles.addition.Render(s) }
func (l lipglossColorScheme) Modification(s string) string { return l.styles.modification.Render(s) }
func (l lipglossColorScheme) Removal(s string) string      { return l.styles.removal.Render(s) }
func (l lipglossColorScheme) Breaking(s string) string     { return l.styles.breaking.Render(s) }
func (l lipglossColorScheme) TreeBranch(s string) string   { return l.styles.stat.Render(s) }
func (l lipglossColorScheme) LocationInfo(s string) string { return l.styles.stat.Render(s) }
func (l lipglossColorScheme) Statistics(s string) string   { return l.styles.stat.Render(s) }

type elementSummary struct {
	name     string
	total    int
	breaking int
}

func buildElementSummaries(changes *whatChangedModel.DocumentChanges) []elementSummary {
	report := reports.CreateOverallReport(changes)
	if report == nil || len(report.ChangeReport) == 0 {
		return nil
	}

	summaries := make([]elementSummary, 0, len(report.ChangeReport))
	for name, stats := range report.ChangeReport {
		summaries = append(summaries, elementSummary{
			name:     name,
			total:    stats.Total,
			breaking: stats.Breaking,
		})
	}
	sort.Slice(summaries, func(i, j int) bool {
		return summaries[i].name < summaries[j].name
	})
	return summaries
}

func renderElementSummaryTable(summaries []elementSummary, markdown bool, styles summaryStyles) string {
	if len(summaries) == 0 {
		return ""
	}

	var sb strings.Builder
	if markdown {
		sb.WriteString("| Document Element | Total Changes | Breaking Changes |\n")
		sb.WriteString("|------------------|---------------|------------------|\n")
		for _, summary := range summaries {
			sb.WriteString(fmt.Sprintf("| %s | %d | %d |\n", summary.name, summary.total, summary.breaking))
		}
		sb.WriteString("\n")
		return sb.String()
	}

	nameWidth := len("Document Element")
	totalWidth := len("Total Changes")
	breakingWidth := len("Breaking Changes")
	for _, summary := range summaries {
		if len(summary.name) > nameWidth {
			nameWidth = len(summary.name)
		}
		if l := len(fmt.Sprint(summary.total)); l > totalWidth {
			totalWidth = l
		}
		if l := len(fmt.Sprint(summary.breaking)); l > breakingWidth {
			breakingWidth = l
		}
	}

	top := fmt.Sprintf("┌─%s─┬─%s─┬─%s─┐\n",
		strings.Repeat("─", nameWidth),
		strings.Repeat("─", totalWidth),
		strings.Repeat("─", breakingWidth))
	divider := fmt.Sprintf("├─%s─┼─%s─┼─%s─┤\n",
		strings.Repeat("─", nameWidth),
		strings.Repeat("─", totalWidth),
		strings.Repeat("─", breakingWidth))
	bottom := fmt.Sprintf("└─%s─┴─%s─┴─%s─┘\n",
		strings.Repeat("─", nameWidth),
		strings.Repeat("─", totalWidth),
		strings.Repeat("─", breakingWidth))

	renderCell := func(width int, text string, alignRight bool, style lipgloss.Style) string {
		padding := width - len(text)
		if padding < 0 {
			padding = 0
		}
		cell := text
		if alignRight {
			cell = strings.Repeat(" ", padding) + cell
		} else {
			cell = cell + strings.Repeat(" ", padding)
		}
		if style.GetForeground() == nil {
			return cell
		}
		return style.Render(cell)
	}

	sb.WriteString(top)
	sb.WriteString("│ ")
	sb.WriteString(renderCell(nameWidth, "Document Element", false, styles.title))
	sb.WriteString(" │ ")
	sb.WriteString(renderCell(totalWidth, "Total Changes", true, styles.title))
	sb.WriteString(" │ ")
	sb.WriteString(renderCell(breakingWidth, "Breaking Changes", true, styles.title))
	sb.WriteString(" │\n")
	sb.WriteString(divider)
	for _, summary := range summaries {
		sb.WriteString("│ ")
		sb.WriteString(renderCell(nameWidth, summary.name, false, lipgloss.NewStyle()))
		sb.WriteString(" │ ")
		sb.WriteString(renderCell(totalWidth, fmt.Sprint(summary.total), true, styles.title))
		sb.WriteString(" │ ")
		breakingStyle := lipgloss.NewStyle()
		if summary.breaking > 0 {
			breakingStyle = styles.breaking
		} else if styles.stat.GetForeground() != nil {
			breakingStyle = styles.stat
		}
		sb.WriteString(renderCell(breakingWidth, fmt.Sprint(summary.breaking), true, breakingStyle))
		sb.WriteString(" │\n")
	}
	sb.WriteString(bottom)
	sb.WriteString("\n")
	return sb.String()
}

func enrichSummaryTreeLabels(root *v3.Node) {
	if root == nil {
		return
	}
	enrichSummaryNodeLabels(root)
}

func enrichSummaryNodeLabels(node *v3.Node) {
	if node == nil {
		return
	}
	for _, changed := range node.GetChanges() {
		if changed == nil {
			continue
		}
		for _, change := range changed.GetPropertyChanges() {
			enrichSummaryChangeLabel(node, change)
		}
	}
	for _, child := range node.Children {
		enrichSummaryNodeLabels(child)
	}
}

func enrichSummaryChangeLabel(node *v3.Node, change *whatChangedModel.Change) {
	if node == nil || change == nil {
		return
	}

	if security.IsSecurityScopeChange(change) {
		change.Property = security.FormatSecurityScopeTitle(change)
		return
	}

	switch {
	case node.Type == "responses" && change.Property == "codes":
		if label := firstNonEmpty(change.New, change.Original); label != "" {
			change.Property = label
		}
	case node.Type == "tags" && change.Property == "tags":
		if label := firstNonEmpty(change.New, change.Original); label != "" {
			change.Property = label
		}
	case node.Type == "schema" && change.Property == "properties":
		if label := firstNonEmpty(change.New, change.Original); label != "" {
			change.Property = fmt.Sprintf("properties/%s", label)
		}
	}
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if value != "" {
			return value
		}
	}
	return ""
}

func isDirectFileComparison(commits []*model.Commit) bool {
	if len(commits) != 2 {
		return false
	}
	return strings.HasPrefix(commits[0].Message, "Original: ") &&
		strings.HasPrefix(commits[1].Message, "Original file: ")
}

// renderNewSummary builds the output string using the doctor changerator and tree renderer.
// Returns: rendered output, hasBreaking, hasChanges, error.
func renderNewSummary(
	commits []*model.Commit,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
	markdown bool,
	noColor bool,
	styles summaryStyles,
) (string, bool, bool, error) {
	if len(commits) == 0 {
		return noChangesFoundMessage + "\n", false, false, nil
	}

	var sb strings.Builder
	totalChanges := 0
	totalBreaking := 0
	renderedCommits := 0
	var renderErrors []error

	for c, commit := range commits {
		if commit.Document == nil || commit.OldDocument == nil {
			if !isDirectFileComparison(commits) && totalChanges == 0 && totalBreaking == 0 && c+1 < len(commits) {
				sb.WriteString(fmt.Sprintf("No changes detected between %s and %s\n",
					commit.Hash, commits[c+1].Hash))
			}
			continue
		}

		result, err := runChangerator(commit, breakingConfig)
		if err != nil {
			sb.WriteString(fmt.Sprintf("Error: %s\n", err))
			renderErrors = append(renderErrors, fmt.Errorf("commit %s: %w", commit.Hash, err))
			continue
		}
		if result == nil {
			if !isDirectFileComparison(commits) && totalChanges == 0 && c+1 < len(commits) {
				sb.WriteString(fmt.Sprintf("No changes detected between %s and %s\n",
					commit.Hash, commits[c+1].Hash))
			}
			continue
		}
		renderedCommits++

		deduplicatedChanges := result.Changerator.DeduplicateChanges()

		// Build node change tree and render tree for first commit only
		if c == 0 {
			result.Changerator.BuildNodeChangeTree(result.RightDrDoc.V3Document.Node)
			enrichSummaryTreeLabels(result.RightDrDoc.V3Document.Node)

			var colorScheme terminal.ColorScheme
			if noColor || markdown {
				colorScheme = terminal.NoColorScheme{}
			} else {
				colorScheme = lipglossColorScheme{styles: styles}
			}

			treeRenderer := renderer.NewTreeRenderer(result.RightDrDoc.V3Document.Node, &renderer.TreeConfig{
				UseEmojis:       markdown,
				ShowLineNumbers: false,
				ShowStatistics:  true,
				ColorScheme:     colorScheme,
			})
			treeOutput := treeRenderer.Render()

			if markdown {
				sb.WriteString("```\n")
				sb.WriteString(treeOutput)
				sb.WriteString("\n```\n")
			} else {
				sb.WriteString(treeOutput)
				sb.WriteString("\n")
			}
		}

		sb.WriteString(renderElementSummaryTable(buildElementSummaries(result.DocChanges), markdown, styles))

		counts := changecounts.FromChanges(deduplicatedChanges)
		breaking := counts.Breaking
		total := counts.Total
		totalChanges += total
		totalBreaking += breaking

		// Build output
		sb.WriteString("\n")

		// Commit metadata
		dateStr := commit.CommitDate.Format("01/02/06")
		if markdown {
			sb.WriteString(fmt.Sprintf("**Date**: %s | **Commit**: %s\n", dateStr, commit.Message))
		} else {
			sb.WriteString(styles.title.Render(fmt.Sprintf("Date: %s | Commit: %s", dateStr, commit.Message)))
			sb.WriteString("\n")
		}

		// Total changes + breaking
		if breaking == 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Total Changes**: _%d_\n", total))
			} else {
				sb.WriteString(fmt.Sprintf("  Total Changes: %s\n", styles.title.Render(fmt.Sprint(total))))
			}
		} else {
			if markdown {
				sb.WriteString(fmt.Sprintf("- ❌ **BREAKING Changes**: _%d_ out of _%d_\n", breaking, total))
			} else {
				sb.WriteString(fmt.Sprintf("  %s\n", styles.breaking.Render(fmt.Sprintf("❌  %d Breaking changes out of %d", breaking, total))))
			}
		}

		// Additions / Modifications / Deletions
		if counts.Additions > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Additions**: _%d_\n", counts.Additions))
			} else {
				sb.WriteString(fmt.Sprintf("  Additions: %s\n", styles.addition.Render(fmt.Sprint(counts.Additions))))
			}
		}
		if counts.Modifications > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Modifications**: _%d_\n", counts.Modifications))
			} else {
				sb.WriteString(fmt.Sprintf("  Modifications: %s\n", styles.modification.Render(fmt.Sprint(counts.Modifications))))
			}
		}
		if counts.Removals > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Removals**: _%d_\n", counts.Removals))
			} else {
				sb.WriteString(fmt.Sprintf("  Removals: %s\n", styles.removal.Render(fmt.Sprint(counts.Removals))))
			}
		}

		// Breaking breakdown
		if counts.BreakingAdditions > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Breaking Additions**: _%d_\n", counts.BreakingAdditions))
			} else {
				sb.WriteString(fmt.Sprintf("  Breaking Additions: %s\n", styles.breaking.Render(fmt.Sprint(counts.BreakingAdditions))))
			}
		}
		if counts.BreakingModifications > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Breaking Modifications**: _%d_\n", counts.BreakingModifications))
			} else {
				sb.WriteString(fmt.Sprintf("  Breaking Modifications: %s\n", styles.breaking.Render(fmt.Sprint(counts.BreakingModifications))))
			}
		}
		if counts.BreakingRemovals > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Breaking Removals**: _%d_\n", counts.BreakingRemovals))
			} else {
				sb.WriteString(fmt.Sprintf("  Breaking Removals: %s\n", styles.breaking.Render(fmt.Sprint(counts.BreakingRemovals))))
			}
		}

		sb.WriteString("\n")

		result.Release()
	}

	hasBreaking := totalBreaking > 0
	hasChanges := totalChanges > 0
	if renderedCommits == 0 && len(renderErrors) > 0 {
		return sb.String(), false, false, fmt.Errorf("all %d commits failed to render: %w", len(renderErrors), errors.Join(renderErrors...))
	}
	if !hasChanges && len(renderErrors) == 0 {
		if sb.Len() == 0 {
			return noChangesFoundMessage + "\n", false, false, nil
		}
		return sb.String(), false, false, nil
	}
	return sb.String(), hasBreaking, hasChanges, nil
}

// GetNewSummaryCommand returns the cobra command for the new-summary command.
func GetNewSummaryCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "new-summary",
		Short:        "See a summary of changes (new engine)",
		Long:         "print a summary of what changed using the doctor changerator engine with tree visualization",
		Example:      "openapi-changes new-summary /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, configFlag := readCommonFlags(cmd)
			opts.markdown, _ = cmd.Flags().GetBool("markdown")
			opts.errorOnDiff, _ = cmd.Flags().GetBool("error-on-diff")

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintNewBanner(opts.noColor)
			}

			if len(args) == 0 {
				printNewSummaryUsage(opts.noColor)
				return nil
			}

			if len(args) == 1 && !validateGitHubURL(args[0]) {
				return nil
			}

			if len(args) > 2 {
				return fmt.Errorf("too many arguments provided, expecting at most two (2)")
			}

			styles := summaryStyles{}
			if !opts.noColor {
				styles = newSummaryStyles()
			}

			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				PrintNewConfigError(err)
				return err
			}

			commits, err := loadCommitsFromArgs(args, opts, breakingConfig)
			if err != nil {
				return err
			}
			if len(commits) == 0 && len(args) == 2 {
				firstArgInfo, statErr := os.Stat(args[0])
				if statErr == nil && firstArgInfo.IsDir() {
					printNoPriorVersionText()
					return nil
				}
			}

			output, hasBreaking, hasChanges, renderErr := renderNewSummary(
				commits, breakingConfig, opts.markdown, opts.noColor, styles,
			)
			if output != "" {
				fmt.Print(output)
			}
			if renderErr != nil {
				return renderErr
			}
			if hasBreaking {
				return errors.New("breaking changes discovered")
			}
			if hasChanges && opts.errorOnDiff {
				return errors.New("differences discovered")
			}
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	cmd.Flags().BoolP("markdown", "m", false, "Render output in markdown, using emojis")
	cmd.Flags().BoolP("error-on-diff", "", false, "Treat any differences as errors")
	return cmd
}

func printNewSummaryUsage(noColor bool) {
	printNewCommandUsage("new-summary",
		"The new-summary command prints out a simplified, reduced summary of a change report\nusing the doctor changerator engine with tree visualization.",
		noColor)
}
