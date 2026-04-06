// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import "github.com/spf13/cobra"

// testRootCmd creates a root command with standard persistent flags and a subcommand for testing.
func testRootCmd(sub *cobra.Command, args ...string) *cobra.Command {
	root := &cobra.Command{Use: "openapi-changes"}
	root.PersistentFlags().BoolP("no-logo", "b", false, "")
	root.PersistentFlags().BoolP("top", "t", false, "")
	root.PersistentFlags().IntP("limit", "l", 5, "")
	root.PersistentFlags().IntP("limit-time", "d", -1, "")
	root.PersistentFlags().StringP("base", "p", "", "")
	root.PersistentFlags().StringP("base-commit", "", "", "")
	root.PersistentFlags().BoolP("remote", "r", true, "")
	root.PersistentFlags().BoolP("ext-refs", "", false, "")
	root.PersistentFlags().StringP("config", "c", "", "")
	root.PersistentFlags().BoolP("global-revisions", "R", false, "")
	root.AddCommand(sub)
	root.SetArgs(append([]string{sub.Use}, args...))
	return root
}
