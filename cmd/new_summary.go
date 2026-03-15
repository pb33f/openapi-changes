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
	"github.com/pb33f/doctor/changerator"
	"github.com/pb33f/doctor/changerator/renderer"
	drModel "github.com/pb33f/doctor/model"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

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
	configPath      string
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
		title:        lipgloss.NewStyle().Foreground(lipgloss.Color("#96E1FF")).Bold(true),
		breaking:     lipgloss.NewStyle().Foreground(lipgloss.Color("#FF6B6B")).Bold(true),
		addition:     lipgloss.NewStyle().Foreground(lipgloss.Color("#69FF94")),
		modification: lipgloss.NewStyle().Foreground(lipgloss.Color("#FFDD57")),
		removal:      lipgloss.NewStyle().Foreground(lipgloss.Color("#FF6B6B")),
		stat:         lipgloss.NewStyle().Faint(true),
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
type progressDrainer struct {
	ProgressChan chan *model.ProgressUpdate
	ErrorChan    chan model.ProgressError
	errors       []model.ProgressError
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
		for range d.ProgressChan {
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
	commits, _ := git.ProcessGithubRepo(user, repo, filePath, opts.baseCommit,
		d.ProgressChan, d.ErrorChan, false, opts.limit, opts.limitTime,
		opts.base, opts.remote, opts.extRefs, breakingConfig)
	drainErrors := d.close()

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
	commits, errs := git.ExtractHistoryFromFile(gitPath, filePath, opts.baseCommit,
		d.ProgressChan, d.ErrorChan, opts.globalRevisions, opts.limit, opts.limitTime)
	if errs != nil {
		d.close()
		return nil, errs[0]
	}

	commits, _ = git.PopulateHistoryWithChanges(commits, 0, opts.limitTime,
		d.ProgressChan, d.ErrorChan, opts.base, opts.remote, opts.extRefs, breakingConfig)
	d.close()

	if len(commits) == 0 {
		return nil, nil
	}
	if opts.latest && len(commits) > 0 {
		commits = commits[:1]
	}
	return commits, nil
}

func loadLeftRightCommits(left, right string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	d := newProgressDrainer()
	defer d.close()

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

	for c, commit := range commits {
		if commit.Changes == nil {
			if totalChanges == 0 && totalBreaking == 0 && c+1 < len(commits) {
				sb.WriteString(fmt.Sprintf("No changes detected between %s and %s\n",
					commit.Hash, commits[c+1].Hash))
			}
			continue
		}

		if commit.Document == nil || commit.OldDocument == nil {
			continue
		}

		// Build DrDocuments from existing libopenapi Documents
		rightModel, err := commit.Document.BuildV3Model()
		if err != nil {
			sb.WriteString(fmt.Sprintf("Error building right model: %s\n", err))
			continue
		}
		leftModel, err := commit.OldDocument.BuildV3Model()
		if err != nil {
			sb.WriteString(fmt.Sprintf("Error building left model: %s\n", err))
			continue
		}

		rightDrDoc := drModel.NewDrDocumentAndGraph(rightModel)
		leftDrDoc := drModel.NewDrDocumentAndGraph(leftModel)

		if rightDrDoc == nil || leftDrDoc == nil {
			if rightDrDoc != nil {
				rightDrDoc.Release()
			}
			if leftDrDoc != nil {
				leftDrDoc.Release()
			}
			continue
		}

		// Apply breaking rules config
		if breakingConfig != nil {
			ApplyBreakingRulesConfig(breakingConfig)
		}

		// Create Changerator and run
		ctr := changerator.NewChangerator(&changerator.ChangeratorConfig{
			LeftDrDoc:       leftDrDoc.V3Document,
			RightDrDoc:      rightDrDoc.V3Document,
			Doctor:          rightDrDoc,
			RightDocContent: commit.Data,
		})

		docChanges := ctr.Changerate()

		// Reset breaking rules after changerate
		if breakingConfig != nil {
			ResetBreakingRulesConfig()
		}

		if docChanges == nil {
			rightDrDoc.Release()
			leftDrDoc.Release()
			if totalChanges == 0 && c+1 < len(commits) {
				sb.WriteString(fmt.Sprintf("No changes detected between %s and %s\n",
					commit.Hash, commits[c+1].Hash))
			}
			continue
		}

		// Build node change tree and render tree for first commit only
		if c == 0 {
			ctr.BuildNodeChangeTree(rightDrDoc.V3Document.Node)

			var colorScheme terminal.ColorScheme
			if noColor || markdown {
				colorScheme = terminal.NoColorScheme{}
			} else {
				colorScheme = lipglossColorScheme{styles: styles}
			}

			treeRenderer := renderer.NewTreeRenderer(rightDrDoc.V3Document.Node, &renderer.TreeConfig{
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

		// Get statistics
		stats := ctr.Calculatoratron()

		// Count breaking changes from docChanges
		var breakingAdded, breakingModified, breakingRemoved int
		for _, ch := range docChanges.GetAllChanges() {
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

		// Cleanup
		rightDrDoc.Release()
		leftDrDoc.Release()
	}

	hasBreaking := totalBreaking > 0
	hasChanges := totalChanges > 0
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
			noColorFlag, _ := cmd.Flags().GetBool("no-color")
			markdownFlag, _ := cmd.Flags().GetBool("markdown")
			errOnDiff, _ := cmd.Flags().GetBool("error-on-diff")
			latestFlag, _ := cmd.Flags().GetBool("top")
			limitFlag, _ := cmd.Flags().GetInt("limit")
			limitTimeFlag, _ := cmd.Flags().GetInt("limit-time")
			baseFlag, _ := cmd.Flags().GetString("base")
			baseCommitFlag, _ := cmd.Flags().GetString("base-commit")
			remoteFlag, _ := cmd.Flags().GetBool("remote")
			extRefs, _ := cmd.Flags().GetBool("ext-refs")
			configFlag, _ := cmd.Flags().GetString("config")
			globalRevisionsFlag, _ := cmd.Flags().GetBool("global-revisions")

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintBanner()
			}

			if len(args) == 0 {
				printNewSummaryUsage(noColorFlag)
				return nil
			}

			// Validate single arg is a github URL
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
				markdown:        markdownFlag,
				errorOnDiff:     errOnDiff,
				latest:          latestFlag,
				limit:           limitFlag,
				limitTime:       limitTimeFlag,
				base:            baseFlag,
				baseCommit:      baseCommitFlag,
				remote:          remoteFlag,
				extRefs:         extRefs,
				configPath:      configFlag,
				globalRevisions: globalRevisionsFlag,
			}

			styles := summaryStyles{}
			if !noColorFlag {
				styles = newSummaryStyles()
			}

			// Load breaking rules config
			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				PrintConfigError(err)
				return err
			}

			// Load commits based on args
			var commits []*model.Commit
			switch {
			case len(args) == 1:
				commits, err = loadGitHubCommits(args[0], opts, breakingConfig)
			case len(args) == 2:
				p := args[0]
				f, statErr := os.Stat(p)
				if statErr != nil {
					return fmt.Errorf("cannot open file/repository: '%s'", p)
				}
				if f.IsDir() {
					commits, err = loadGitHistoryCommits(args[0], args[1], opts, breakingConfig)
				} else {
					commits, err = loadLeftRightCommits(args[0], args[1], opts, breakingConfig)
				}
			}
			if err != nil {
				return err
			}

			// Render and print
			output, hasBreaking, hasChanges, renderErr := renderNewSummary(
				commits, breakingConfig, markdownFlag, noColorFlag, styles,
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
			if hasChanges && errOnDiff {
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
	title := lipgloss.NewStyle().Foreground(lipgloss.Color("#96E1FF")).Bold(true)
	desc := lipgloss.NewStyle().Faint(true)
	cmdStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#FF77FF")).Bold(true)

	if noColor {
		title = lipgloss.NewStyle()
		desc = lipgloss.NewStyle()
		cmdStyle = lipgloss.NewStyle()
	}

	fmt.Print(title.Render("How to use the "))
	fmt.Print(cmdStyle.Render("new-summary"))
	fmt.Println(title.Render(" command:"))
	fmt.Println("-------------------------------")
	fmt.Println()
	fmt.Println("The new-summary command prints out a simplified, reduced summary of a change report")
	fmt.Println("using the doctor changerator engine with tree visualization.")
	fmt.Println()
	fmt.Println(title.Render(">> diff local git history"))
	fmt.Println(desc.Render("supply a path to the git repository root and the path to the OpenAPI spec from the root."))
	fmt.Println()
	fmt.Print("openapi-changes ")
	fmt.Print(cmdStyle.Render("new-summary"))
	fmt.Println(title.Render(" . sample-specs/petstorev3.json"))
	fmt.Println()
	fmt.Println(title.Render(">> diff old / modified files"))
	fmt.Println(desc.Render("supply paths to the left (original) and right (modified) OpenAPI specs"))
	fmt.Println()
	fmt.Print("openapi-changes ")
	fmt.Print(cmdStyle.Render("new-summary"))
	fmt.Println(title.Render(" sample-specs/petstorev3-original.json sample-specs/petstorev3.json"))
	fmt.Println()
	fmt.Println(title.Render(">> diff an OpenAPI spec on github"))
	fmt.Println(desc.Render("supply the URL to the file on github"))
	fmt.Println()
	fmt.Print("openapi-changes ")
	fmt.Print(cmdStyle.Render("new-summary"))
	fmt.Println(title.Render(" https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml"))
	fmt.Println()
	fmt.Printf("For more help, use the %s flag (openapi-changes new-summary --help)\n", cmdStyle.Render("--help"))
	fmt.Println()
}
