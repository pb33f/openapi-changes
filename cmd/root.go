// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "fmt"
    "github.com/spf13/cobra"
    "os"
)

var (
    Version string
    Commit  string
    Date    string

    rootCmd = &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: true,
        Use:           "openapi-changes",
        Short:         "openapi-changes will tell you what has changed between one or more OpenAPI / Swagger specifications.",
        Long: `openapi-changes can detect every change found in an OpenAPI specification.
it can compare between two files, or a single file, over time.`,
        RunE: func(cmd *cobra.Command, args []string) error {
            fmt.Println("Try the console command!")
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

func init() {
    cobra.OnInitialize(initConfig)
    rootCmd.AddCommand(GetConsoleCommand())
    rootCmd.PersistentFlags().BoolP("top", "t", false, "Only show latest changes (last git revision against HEAD)")

}

func initConfig() {

}
