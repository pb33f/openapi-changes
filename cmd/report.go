// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "encoding/json"
    "errors"
    "fmt"
    "github.com/pb33f/libopenapi/what-changed/reports"
    "github.com/pb33f/openapi-changes/git"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "github.com/twinj/uuid"
    "os"
    "path"
    "time"
)

func GetReportCommand() *cobra.Command {

    cmd := &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: false,
        Use:           "report",
        Short:         "Generate a machine readable report for what has changed",
        Long:          "Generate a report for what has changed between two OpenAPI specs, or a single spec, over time.",
        Example:       "openapi-changes report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
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

                    report, er := runGitHistoryReport(args[0], args[1], latestFlag)

                    if er != nil {
                        pterm.Error.Println(er.Error())
                        return er
                    }

                    jsonBytes, _ := json.MarshalIndent(report, "", "  ")
                    fmt.Println(string(jsonBytes))
                    return nil

                } else {

                    report, errs := runLeftRightReport(args[0], args[1])
                    if len(errs) > 0 {
                        for e := range errs {
                            pterm.Error.Println(errs[e].Error())
                        }
                        return errors.New("unable to process specifications")
                    }

                    jsonBytes, _ := json.MarshalIndent(report, "", "  ")
                    fmt.Println(string(jsonBytes))
                    return nil
                }
            }
            pterm.Error.Println("too many arguments, expecting two (2)")
            return nil
        },
    }
    return cmd
}

type Report struct {
    Summary map[string]*reports.Changed `json:"reportSummary"`
    Commit  *model.Commit               `json:"commitDetails"`
}

type HistoricalReport struct {
    GitRepoPath   string    `json:"gitRepoPath"`
    GitFilePath   string    `json:"gitFilePath"`
    Filename      string    `json:"filename"`
    DateGenerated string    `json:"dateGenerated"`
    Reports       []*Report `json:"reports"`
}

func runGitHistoryReport(gitPath, filePath string, latest bool) (*HistoricalReport, error) {
    if gitPath == "" || filePath == "" {
        err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
        pterm.Error.Println(err.Error())
        return nil, err
    }

    // build commit history.
    commitHistory, err := git.ExtractHistoryUsingLib(gitPath, filePath)
    if err != nil {
        return nil, err
    }

    // populate history with changes and data
    git.PopulateHistoryWithChanges(commitHistory, nil)

    if latest {
        commitHistory = commitHistory[:1]
    }

    var reports []*Report
    for r := range commitHistory {
        if commitHistory[r].Changes != nil {
            reports = append(reports, createReport(commitHistory[r]))
        }
    }

    return &HistoricalReport{
        GitRepoPath:   gitPath,
        GitFilePath:   filePath,
        Filename:      path.Base(filePath),
        DateGenerated: time.Now().String(),
        Reports:       reports,
    }, nil

}

func runLeftRightReport(left, right string) (*Report, []error) {

    var leftBytes, rightBytes []byte
    var errs []error
    var err error

    leftBytes, err = os.ReadFile(left)
    if err != nil {
        return nil, []error{err}
    }
    rightBytes, err = os.ReadFile(right)
    if err != nil {
        return nil, []error{err}
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

    commits, errs = git.BuildCommitChangelog(commits)
    if len(errs) > 0 {
        return nil, errs
    }
    return createReport(commits[0]), nil
}

func createReport(commit *model.Commit) *Report {
    // wipe the bytes out from the specInfo instance in the vacuum report.
    if commit.QualityReport != nil {
        commit.QualityReport.SpecInfo.SpecBytes = nil
    }
    report := reports.CreateOverallReport(commit.Changes)
    return &Report{report.ChangeReport, commit}
}
