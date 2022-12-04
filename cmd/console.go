// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "errors"
    "fmt"
    "github.com/pb33f/openapi-changes/git"
    "github.com/pb33f/openapi-changes/tui"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
)

func GetConsoleCommand() *cobra.Command {

    cmd := &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: false,
        Use:           "console",
        Short:         "Interact with OpenAPI changes in an interactive terminal UI",
        Long: "Navigate though a single change or many changes visually. Explore" +
            " Each change, and see a side by side rendering of each change.",
        Example: "openapi-changes console -r /path/to/git/repo -f path/to/file/in/repo/openapi.yaml",
        RunE: func(cmd *cobra.Command, args []string) error {

            gitPath, _ := cmd.Flags().GetString("repo")
            filePath, _ := cmd.Flags().GetString("file")

            if gitPath == "" || filePath == "" {
                err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
                pterm.Error.Println(err.Error())
                return err
            }

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
    cmd.Flags().StringP("repo", "r", "", "Path to git repo root where spec is held")
    cmd.Flags().StringP("file", "f", "", "Path to file from within repo")
    return cmd
}
