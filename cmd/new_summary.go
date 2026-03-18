// Copyright 2025 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"charm.land/lipgloss/v2"
	"github.com/google/uuid"
	"github.com/pb33f/doctor/changerator/renderer"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

var processGithubRepo = git.ProcessGithubRepo
var extractHistoryFromFile = git.ExtractHistoryFromFile
var populateHistoryWithChanges = git.PopulateHistoryWithChanges

// newSummaryOpts holds all flag values for the new-summary command.
type newSummaryOpts struct {
	noColor         bool
	markdown        bool
	errorOnDiff     bool
	latest          bool
	limit           int
	limitTime       int
	base            string
	baseCommit      string
	remote          bool
	extRefs         bool
	globalRevisions bool
}

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

// progressDrainer creates channels and goroutines to drain progress/error channels
// required by the git layer functions (which use unbuffered synchronous sends).
// Warnings from the progress channel are collected and can be printed via printWarnings().
type progressDrainer struct {
	ProgressChan chan *model.ProgressUpdate
	ErrorChan    chan model.ProgressError
	errors       []model.ProgressError
	warnings     []string
	wg           sync.WaitGroup
	closeOnce    sync.Once
}

func newProgressDrainer() *progressDrainer {
	d := &progressDrainer{
		ProgressChan: make(chan *model.ProgressUpdate),
		ErrorChan:    make(chan model.ProgressError),
	}
	d.wg.Add(2)
	go func() {
		defer d.wg.Done()
		for update := range d.ProgressChan {
			if update.Warning {
				d.warnings = append(d.warnings, update.Message)
			}
		}
	}()
	go func() {
		defer d.wg.Done()
		for e := range d.ErrorChan {
			d.errors = append(d.errors, e)
		}
	}()
	return d
}

func (d *progressDrainer) close() []model.ProgressError {
	d.closeOnce.Do(func() {
		close(d.ProgressChan)
		close(d.ErrorChan)
		d.wg.Wait()
	})
	return d.errors
}

// printWarnings writes any collected warnings to stderr.
// Must be called after close() to ensure all goroutines have finished writing.
func (d *progressDrainer) printWarnings() {
	d.close()
	for _, w := range d.warnings {
		fmt.Fprintf(os.Stderr, "warning: %s\n", w)
	}
}

func loadGitHubCommits(rawURL string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	specURL, err := url.Parse(rawURL)
	if err != nil {
		return nil, fmt.Errorf("invalid URL: %w", err)
	}
	user, repo, filePath, err := ExtractGithubDetailsFromURL(specURL)
	if err != nil {
		return nil, fmt.Errorf("error extracting github details: %w", err)
	}

	d := newProgressDrainer()
	commits, errs := processGithubRepo(user, repo, filePath, opts.baseCommit,
		d.ProgressChan, d.ErrorChan, false, opts.limit, opts.limitTime,
		opts.base, opts.remote, opts.extRefs, breakingConfig)
	drainErrors := d.close()
	d.printWarnings()

	if len(errs) > 0 {
		return nil, errors.Join(errs...)
	}
	if len(drainErrors) > 0 {
		for _, e := range drainErrors {
			if e.Fatal {
				return nil, errors.New(e.Message)
			}
		}
	}

	if opts.latest && len(commits) > 1 {
		commits = commits[:1]
	}
	return commits, nil
}

func loadGitHistoryCommits(gitPath, filePath string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	if gitPath == "" || filePath == "" {
		return nil, errors.New("please supply a path to a git repo and a path to a file")
	}

	repo, err := absoluteRepoPath(gitPath)
	if err != nil {
		return nil, err
	}
	_, err = os.Stat(filepath.Join(repo, filePath))
	if err != nil {
		return nil, fmt.Errorf("cannot open file: '%s'", filePath)
	}

	d := newProgressDrainer()
	commits, errs := extractHistoryFromFile(gitPath, filePath, opts.baseCommit,
		d.ProgressChan, d.ErrorChan, opts.globalRevisions, opts.limit, opts.limitTime)
	if errs != nil {
		d.close()
		d.printWarnings()
		return nil, errors.Join(errs...)
	}

	commits, errs = populateHistoryWithChanges(commits, 0, opts.limitTime,
		d.ProgressChan, d.ErrorChan, opts.base, opts.remote, opts.extRefs, breakingConfig)
	d.close()
	d.printWarnings()
	if len(errs) > 0 {
		return nil, errors.Join(errs...)
	}

	if len(commits) == 0 {
		return nil, nil
	}
	if opts.latest {
		commits = commits[:1]
	}
	return commits, nil
}

func loadLeftRightCommits(left, right string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	d := newProgressDrainer()
	defer func() {
		d.close()
		d.printWarnings()
	}()

	var err error
	left, err = checkURL(left, d.ErrorChan)
	if err != nil {
		return nil, err
	}
	right, err = checkURL(right, d.ErrorChan)
	if err != nil {
		return nil, err
	}

	leftBytes, err := os.ReadFile(left)
	if err != nil {
		return nil, fmt.Errorf("cannot read original spec: %w", err)
	}
	rightBytes, err := os.ReadFile(right)
	if err != nil {
		return nil, fmt.Errorf("cannot read modified spec: %w", err)
	}

	commits := []*model.Commit{
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Original: %s, Modified: %s", left, right),
			CommitDate: time.Now(),
			Data:       rightBytes,
		},
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Original file: %s", left),
			CommitDate: time.Now(),
			Data:       leftBytes,
		},
	}

	commits, errs := git.BuildCommitChangelog(commits, d.ProgressChan, d.ErrorChan,
		opts.base, opts.remote, opts.extRefs, breakingConfig)
	if len(errs) > 0 {
		return nil, errors.Join(errs...)
	}
	return commits, nil
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
		return "No changes found between specifications\n", false, false, nil
	}
	if len(commits) == 1 && commits[0].Changes == nil {
		return "No changes found between specifications\n", false, false, nil
	}

	var sb strings.Builder
	totalChanges := 0
	totalBreaking := 0
	renderedCommits := 0
	var renderErrors []error

	for c, commit := range commits {
		if commit.Changes == nil {
			if totalChanges == 0 && totalBreaking == 0 && c+1 < len(commits) {
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
			if totalChanges == 0 && c+1 < len(commits) {
				sb.WriteString(fmt.Sprintf("No changes detected between %s and %s\n",
					commit.Hash, commits[c+1].Hash))
			}
			continue
		}
		renderedCommits++

		// Build node change tree and render tree for first commit only
		if c == 0 {
			result.Changerator.BuildNodeChangeTree(result.RightDrDoc.V3Document.Node)

			var colorScheme terminal.ColorScheme
			if noColor || markdown {
				colorScheme = terminal.NoColorScheme{}
			} else {
				colorScheme = lipglossColorScheme{styles: styles}
			}

			treeRenderer := renderer.NewTreeRenderer(result.RightDrDoc.V3Document.Node, &renderer.TreeConfig{
				UseEmojis:       markdown,
				ShowLineNumbers: true,
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

		stats := result.Changerator.Calculatoratron()

		var breakingAdded, breakingModified, breakingRemoved int
		for _, ch := range result.DocChanges.GetAllChanges() {
			if ch.Breaking {
				switch ch.ChangeType {
				case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
					breakingAdded++
				case whatChangedModel.Modified:
					breakingModified++
				case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
					breakingRemoved++
				}
			}
		}
		breaking := breakingAdded + breakingModified + breakingRemoved
		total := stats.Additions + stats.Modifications + stats.Deletions
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
		if stats.Additions > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Additions**: _%d_\n", stats.Additions))
			} else {
				sb.WriteString(fmt.Sprintf("  Additions: %s\n", styles.addition.Render(fmt.Sprint(stats.Additions))))
			}
		}
		if stats.Modifications > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Modifications**: _%d_\n", stats.Modifications))
			} else {
				sb.WriteString(fmt.Sprintf("  Modifications: %s\n", styles.modification.Render(fmt.Sprint(stats.Modifications))))
			}
		}
		if stats.Deletions > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Removals**: _%d_\n", stats.Deletions))
			} else {
				sb.WriteString(fmt.Sprintf("  Removals: %s\n", styles.removal.Render(fmt.Sprint(stats.Deletions))))
			}
		}

		// Breaking breakdown
		if breakingAdded > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Breaking Additions**: _%d_\n", breakingAdded))
			} else {
				sb.WriteString(fmt.Sprintf("  Breaking Additions: %s\n", styles.breaking.Render(fmt.Sprint(breakingAdded))))
			}
		}
		if breakingModified > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Breaking Modifications**: _%d_\n", breakingModified))
			} else {
				sb.WriteString(fmt.Sprintf("  Breaking Modifications: %s\n", styles.breaking.Render(fmt.Sprint(breakingModified))))
			}
		}
		if breakingRemoved > 0 {
			if markdown {
				sb.WriteString(fmt.Sprintf("- **Breaking Removals**: _%d_\n", breakingRemoved))
			} else {
				sb.WriteString(fmt.Sprintf("  Breaking Removals: %s\n", styles.breaking.Render(fmt.Sprint(breakingRemoved))))
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

// printNewCommandUsage prints lipgloss-styled usage for any new-* command.
func printNewCommandUsage(commandName, description string, noColor bool) {
	title := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true)
	desc := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGrey))
	cmdStyle := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true)

	if noColor {
		title = lipgloss.NewStyle()
		desc = lipgloss.NewStyle()
		cmdStyle = lipgloss.NewStyle()
	}

	fmt.Print(title.Render("How to use the "))
	fmt.Print(cmdStyle.Render(commandName))
	fmt.Println(title.Render(" command:"))
	fmt.Println("-------------------------------")
	fmt.Println()
	fmt.Println(description)
	fmt.Println()
	fmt.Println(title.Render(">> diff local git history"))
	fmt.Println(desc.Render("supply a path to the git repository root and the path to the OpenAPI spec from the root."))
	fmt.Println()
	fmt.Print("openapi-changes ")
	fmt.Print(cmdStyle.Render(commandName))
	fmt.Println(title.Render(" . sample-specs/petstorev3.json"))
	fmt.Println()
	fmt.Println(title.Render(">> diff old / modified files"))
	fmt.Println(desc.Render("supply paths to the left (original) and right (modified) OpenAPI specs"))
	fmt.Println()
	fmt.Print("openapi-changes ")
	fmt.Print(cmdStyle.Render(commandName))
	fmt.Println(title.Render(" sample-specs/petstorev3-original.json sample-specs/petstorev3.json"))
	fmt.Println()
	fmt.Println(title.Render(">> diff an OpenAPI spec on github"))
	fmt.Println(desc.Render("supply the URL to the file on github"))
	fmt.Println()
	fmt.Print("openapi-changes ")
	fmt.Print(cmdStyle.Render(commandName))
	fmt.Println(title.Render(" https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml"))
	fmt.Println()
	fmt.Printf("For more help, use the %s flag (openapi-changes %s --help)\n", cmdStyle.Render("--help"), commandName)
	fmt.Println()
}

func printNewSummaryUsage(noColor bool) {
	printNewCommandUsage("new-summary",
		"The new-summary command prints out a simplified, reduced summary of a change report\nusing the doctor changerator engine with tree visualization.",
		noColor)
}
