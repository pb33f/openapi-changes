// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"net/url"
	"os"
	"strings"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

// readCommonFlags reads the flags shared by all new-* commands.
func readCommonFlags(cmd *cobra.Command) (opts newSummaryOpts, configFlag string) {
	opts.noColor, _ = cmd.Flags().GetBool("no-color")
	opts.latest, _ = cmd.Flags().GetBool("top")
	opts.limit, _ = cmd.Flags().GetInt("limit")
	opts.limitTime, _ = cmd.Flags().GetInt("limit-time")
	opts.base, _ = cmd.Flags().GetString("base")
	opts.baseCommit, _ = cmd.Flags().GetString("base-commit")
	opts.remote, _ = cmd.Flags().GetBool("remote")
	opts.extRefs, _ = cmd.Flags().GetBool("ext-refs")
	opts.globalRevisions, _ = cmd.Flags().GetBool("global-revisions")
	configFlag, _ = cmd.Flags().GetString("config")
	return
}

// validateGitHubURL checks that a single argument is a github.com URL.
// Prints usage guidance and returns false if validation fails.
func validateGitHubURL(arg string) bool {
	specURL, err := url.Parse(arg)
	if err != nil || specURL.Host != "github.com" {
		fmt.Println("A single argument requires a github.com URL.")
		fmt.Println("For local comparison, provide two arguments: a git repository path and a file path within it.")
		return false
	}
	return true
}

// loadCommitsFromArgs dispatches to the appropriate commit loader based on argument types.
// Expects len(args) to be 1 or 2 (caller must validate arg count).
func loadCommitsFromArgs(args []string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	if len(args) == 1 {
		return loadGitHubCommits(args[0], opts, breakingConfig)
	}
	firstURL, _ := url.Parse(args[0])
	if firstURL != nil && strings.HasPrefix(firstURL.Scheme, "http") {
		return loadLeftRightCommits(args[0], args[1], opts, breakingConfig)
	}
	f, statErr := os.Stat(args[0])
	if statErr != nil {
		return nil, fmt.Errorf("cannot open file/repository: '%s'", args[0])
	}
	if f.IsDir() {
		return loadGitHistoryCommits(args[0], args[1], opts, breakingConfig)
	}
	return loadLeftRightCommits(args[0], args[1], opts, breakingConfig)
}
