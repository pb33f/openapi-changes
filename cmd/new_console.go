// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"net/url"
	"os"
	"strings"

	tea "charm.land/bubbletea/v2"
	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	v2tui "github.com/pb33f/openapi-changes/tui/v2"
	"github.com/spf13/cobra"
)

func printNewConsoleUsage(noColor bool) {
	printNewCommandUsage("new-console",
		"The new-console command renders an interactive terminal user interface.\nExplore OpenAPI contract changes right in your terminal with a modern TUI.",
		noColor)
}

// bridgeRunChangerator adapts cmd.runChangerator to the v2tui.RunChangeratorFn signature
// to avoid import cycles between cmd and tui/v2 packages.
func bridgeRunChangerator(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (*changerator.Changerator, *v3.Node, func(), error) {
	result, err := runChangerator(commit, breakingConfig)
	if err != nil {
		return nil, nil, nil, err
	}
	if result == nil {
		return nil, nil, nil, nil
	}
	root := result.RightDrDoc.V3Document.Node
	releaseFn := func() { result.Release() }
	return result.Changerator, root, releaseFn, nil
}

func GetNewConsoleCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "new-console",
		Short:        "Interactive terminal UI for exploring changes (new engine)",
		Long:         "Navigate through changes visually in an interactive terminal UI built with Bubbletea, using the doctor changerator engine.",
		Example:      "openapi-changes new-console /path/to/git/repo path/to/file/in/repo/openapi.yaml",
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

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintNewBanner(noColorFlag)
			}

			if len(args) == 0 {
				printNewConsoleUsage(noColorFlag)
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
				PrintNewConfigError(err)
				return err
			}

			// Load commits based on args
			var commits []*model.Commit
			switch {
			case len(args) == 1:
				commits, err = loadGitHubCommits(args[0], opts, breakingConfig)
			case len(args) == 2:
				firstURL, _ := url.Parse(args[0])
				if firstURL != nil && strings.HasPrefix(firstURL.Scheme, "http") {
					commits, err = loadLeftRightCommits(args[0], args[1], opts, breakingConfig)
				} else {
					f, statErr := os.Stat(args[0])
					if statErr != nil {
						return fmt.Errorf("cannot open file/repository: '%s'", args[0])
					}
					if f.IsDir() {
						commits, err = loadGitHistoryCommits(args[0], args[1], opts, breakingConfig)
					} else {
						commits, err = loadLeftRightCommits(args[0], args[1], opts, breakingConfig)
					}
				}
			}
			if err != nil {
				return err
			}

			if len(commits) == 0 {
				fmt.Println("No changes found between specifications")
				return nil
			}

			// Check if all commits lack Documents
			hasDocuments := false
			for _, c := range commits {
				if c.Document != nil && c.OldDocument != nil {
					hasDocuments = true
					break
				}
			}
			if !hasDocuments {
				fmt.Println("No changes found between specifications")
				return nil
			}

			// Inject the changerator bridge function
			v2tui.SetRunChangeratorFn(bridgeRunChangerator)

			// Build and run the TUI
			m := v2tui.NewConsoleModel(commits, breakingConfig, noColorFlag, Version)
			p := tea.NewProgram(m)
			if _, err := p.Run(); err != nil {
				return fmt.Errorf("console error: %w", err)
			}
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output")
	return cmd
}
