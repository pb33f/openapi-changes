// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"
	"os"
	"sort"

	"github.com/spf13/cobra"
)

var (
	Version string
	Commit  string
	Date    string

	rootCmd = &cobra.Command{
		SilenceUsage: true,
		Use:          "openapi-changes",
		Short:        "Detect and explore changes between OpenAPI / Swagger specifications.",
		Long: `openapi-changes can detect every change found in an OpenAPI specification.
	it can compare between two files, or a single file, over time.

	The comparison and reporting commands use the current doctor-based engine.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, _, err := readCommonFlags(cmd)
			if err != nil {
				return err
			}
			maybePrintBanner(cmd, opts.palette)

			fmt.Println("Current commands")
			fmt.Println()
			for _, name := range visibleRootCommandNames(cmd) {
				fmt.Printf("  > %s\n", name)
			}
			fmt.Println()
			fmt.Println("For more help, use the --help flag with any command.")
			fmt.Println()
			return nil
		},
	}
)

func Execute(version, commit, date string) {
	Version = version
	Commit = commit
	Date = date

	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func visibleRootCommandNames(root *cobra.Command) []string {
	var names []string
	for _, command := range root.Commands() {
		if command == nil || command.Hidden || command.Name() == "help" {
			continue
		}
		names = append(names, command.Name())
	}
	sort.Strings(names)
	return names
}

func init() {
	cobra.OnInitialize(initConfig)
	rootCmd.AddCommand(GetConsoleCommand())
	rootCmd.AddCommand(GetHTMLReportCommand())
	rootCmd.AddCommand(GetMarkdownReportCommand())
	rootCmd.AddCommand(GetReportCommand())
	rootCmd.AddCommand(GetSummaryCommand())
	rootCmd.AddCommand(GetVersionCommand())
	rootCmd.PersistentFlags().BoolP("top", "t", false, "Only show latest changes (last git revision against HEAD)")
	rootCmd.PersistentFlags().IntP("limit", "l", 5, "Limit history to number of revisions (default is 5)")
	rootCmd.PersistentFlags().BoolP("global-revisions", "R", false, "Consider all revisions in limit, not just the ones for the file")
	rootCmd.PersistentFlags().IntP("limit-time", "d", -1, "Limit history to number of days. Supersedes limit argument if present.")
	rootCmd.PersistentFlags().BoolP("no-logo", "b", false, "Don't print the big purple pb33f banner")
	rootCmd.PersistentFlags().StringP("base", "p", "", "Base URL or path to use for resolving relative or remote references")
	rootCmd.PersistentFlags().StringP("base-commit", "", "", "Base commit to compare against (will check until commit is found or limit is reached -- make sure to not shallow clone)")
	rootCmd.PersistentFlags().BoolP("remote", "r", true, "Allow remote reference (URLs and files) to be auto resolved, without a base URL or path (default is on)")
	rootCmd.PersistentFlags().BoolP("ext-refs", "", false, "Turn on $ref lookups and resolving for extensions (x-) objects")
	rootCmd.PersistentFlags().StringP("config", "c", "", "Path to breaking rules config file (default: ./changes-rules.yaml or ~/.config/changes-rules.yaml)")
}

func initConfig() {

}
