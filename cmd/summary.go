// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "errors"
    "fmt"
    "github.com/pb33f/libopenapi/what-changed/reports"
    "github.com/pb33f/openapi-changes/git"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "github.com/twinj/uuid"
    "os"
    "time"
)

func GetSummaryCommand() *cobra.Command {

    cmd := &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: false,
        Use:           "summary",
        Short:         "See a summary of changes",
        Long:          "explore ",
        Example:       "openapi-changes summary /path/to/git/repo path/to/file/in/repo/openapi.yaml",
        RunE: func(cmd *cobra.Command, args []string) error {

            // check for two args (left and right)
            if len(args) < 2 {
                pterm.Error.Println("Two arguments are required to compare left and right OpenAPI Specifications.")
                return nil
            }
            if len(args) == 2 {

                latestFlag, _ := cmd.Flags().GetBool("top")

                // check if the first arg is a directory, if so - process as a git history operation.
                p := args[0]
                f, err := os.Stat(p)
                if err != nil {
                    pterm.Error.Printf("Cannot open file/repository: '%s'", args[0])
                    return err
                }

                if f.IsDir() {

                    p = args[1]
                    f, err = os.Stat(p)
                    if err != nil {
                        pterm.Error.Printf("Cannot open file/repository: '%s'", args[1])
                        return err
                    }

                    err = runGitHistorySummary(args[0], args[1], latestFlag)

                    if err != nil {
                        pterm.Error.Println(err.Error())
                        return err
                    }
                } else {

                    errs := runLeftRightSummary(args[0], args[1])
                    if len(errs) > 0 {
                        for e := range errs {
                            pterm.Error.Println(errs[e].Error())
                        }
                        return errors.New("unable to process specifications")
                    }
                    return nil
                }
            }
            pterm.Error.Println("too many arguments, expecting two (2)")
            return nil
        },
    }
    return cmd
}

func runLeftRightSummary(left, right string) []error {

    var leftBytes, rightBytes []byte
    var errs []error
    var err error

    leftBytes, err = os.ReadFile(left)
    if err != nil {
        return []error{err}
    }
    rightBytes, err = os.ReadFile(right)
    if err != nil {
        return []error{err}
    }

    commits := []*model.Commit{
        {
            Hash:       uuid.NewV4().String()[:6],
            Message:    fmt.Sprintf("New: %s, Original: %s", right, left),
            CommitDate: time.Now(),
            Data:       rightBytes,
        },
        {
            Hash:       uuid.NewV4().String()[:6],
            Message:    fmt.Sprintf("Original file: %s", left),
            CommitDate: time.Now(),
            Data:       leftBytes,
        },
    }

    errs = git.BuildCommitChangelog(commits)
    if len(errs) > 0 {
        return errs
    }
    e := printSummaryDetails(commits)
    if e != nil {
        return []error{e}
    }
    return nil
}

func runGitHistorySummary(gitPath, filePath string, latest bool) error {
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

    if latest {
        commitHistory = commitHistory[:1]
    }
    return printSummaryDetails(commitHistory)
}

func printSummaryDetails(commitHistory []*model.Commit) error {
    tt := 0
    tb := 0
    pterm.Println()
    errorStyle := pterm.NewStyle(pterm.FgLightRed, pterm.Italic)
    for c := range commitHistory {
        tableData := [][]string{{"Document Element", "Total Changes", "Breaking Changes"}}

        if commitHistory[c].Changes != nil {
            if c == 0 {
                buildConsoleTree(commitHistory[c].Changes)
            }

            report := reports.CreateOverallReport(commitHistory[c].Changes)
            total := 0
            breaking := 0
            for l := range report.ChangeReport {
                total += report.ChangeReport[l].Total
                tt += total
                breaking += report.ChangeReport[l].Breaking
                tb += breaking
                tableData = append(tableData, []string{
                    l,
                    fmt.Sprint(report.ChangeReport[l].Total),
                    fmt.Sprint(report.ChangeReport[l].Breaking),
                })
            }
            pterm.Printf("Date: %s | Commit: %s\n",
                commitHistory[c].CommitDate.Format("01/02/06"),
                commitHistory[c].Message)
            pterm.DefaultTable.WithHasHeader().WithData(tableData).Render()
            if breaking == 0 {
                pterm.Info.Printf("Total Changes: %d\n", total)
            } else {
                errorStyle.Printf("❌ %d Breaking changes out of %d\n", breaking, total)
            }
            if c < len(commitHistory) {
                pterm.Println()
            }
        }
    }

    if tb > 0 {
        return errors.New("breaking changes discovered")
    } else {
        return nil
    }
}
