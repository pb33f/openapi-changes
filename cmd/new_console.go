// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"os"

	tea "charm.land/bubbletea/v2"
	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	v2tui "github.com/pb33f/openapi-changes/tui/v2"
	"github.com/spf13/cobra"
)

func printNewConsoleUsage(noColor bool) {
	printNewCommandUsage("console",
		"The console command renders an interactive terminal user interface.\nExplore OpenAPI contract changes right in your terminal with a modern TUI.",
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

func hasRenderableDocuments(commits []*model.Commit) bool {
	for _, commit := range commits {
		if commit.Document != nil && commit.OldDocument != nil {
			return true
		}
	}
	return false
}

func wrapConsoleStartError(err error) error {
	if err == nil {
		return nil
	}
	return fmt.Errorf("console is unable to start; it requires an interactive terminal and cannot run headless: %w", err)
}

func GetConsoleCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "console",
		Short:        "Interactive terminal UI for exploring changes",
		Long:         "Navigate through changes visually in an interactive terminal UI built with Bubbletea, using the doctor changerator engine.",
		Example:      "openapi-changes console /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, configFlag := readCommonFlags(cmd)

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintNewBanner(opts.noColor)
			}

			if len(args) == 0 {
				printNewConsoleUsage(opts.noColor)
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
				PrintNewConfigError(err)
				return err
			}

			commits, err := loadCommitsFromArgs(args, opts, breakingConfig)
			if err != nil {
				return err
			}

			if len(commits) == 0 {
				firstArgInfo, statErr := os.Stat(args[0])
				if len(args) == 2 && statErr == nil && firstArgInfo.IsDir() {
					printNoPriorVersionText()
					return nil
				}
				printNoChangesText()
				return nil
			}

			if !hasRenderableDocuments(commits) {
				printNoChangesText()
				return nil
			}

			// Build and run the TUI
			m := v2tui.NewConsoleModel(commits, breakingConfig, opts.noColor, Version, bridgeRunChangerator)
			p := tea.NewProgram(m)
			if _, err := p.Run(); err != nil {
				return wrapConsoleStartError(err)
			}
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output")
	return cmd
}
