// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "fmt"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "os"
    "what-changed/git"
    "what-changed/tui"
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

            // Create and start a fork of the default spinner.

            // temp location for testing
            gitPath := "../../GolandProjects/vacuum"
            filePath := "model/test_files/burgershop.openapi.yaml"

            spinner, _ := pterm.DefaultSpinner.Start(fmt.Sprintf("Extracting history for '%s' in repo '%s",
                filePath, gitPath))

            // build commit history.
            commitHistory := git.ExtractHistoryFromFile(gitPath, filePath)

            // populate history with changes and data
            git.PopulateHistoryWithChanges(commitHistory, spinner)

            spinner.Success() // Resolve spinner with success message.
            app := tui.BuildApplication(commitHistory)
            if err := app.Run(); err != nil {
                panic(err)
            }
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
}

func initConfig() {

}
