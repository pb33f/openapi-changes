// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "encoding/json"
    "errors"
    "fmt"
    "net/url"
    "os"
    "path"
    "time"

    "github.com/pb33f/libopenapi/what-changed/reports"
    "github.com/pb33f/openapi-changes/git"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "github.com/twinj/uuid"
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

            updateChan := make(chan *model.ProgressUpdate)
            errorChan := make(chan model.ProgressError)
            doneChan := make(chan bool)
            failed := false
            latestFlag, _ := cmd.Flags().GetBool("top")

            // if there are no args, print out how to use the console.
            if len(args) == 0 {
                PrintBanner()
                PrintHowToUse("report")
                return nil
            }

            listenForUpdates := func(updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) {
                for {
                    select {
                    case _, ok := <-updateChan:
                        if !ok {
                            doneChan <- true
                            return
                        }
                    case <-errorChan:
                        failed = true
                        doneChan <- true
                        return
                    }
                }
            }

            // check for two args (left and right)
            if len(args) < 2 {

                // check if arg is an url (like a github url)
                url, err := url.Parse(args[0])
                if err == nil {

                    if url.Host == "github.com" {
                        go listenForUpdates(updateChan, errorChan)

                        user, repo, filePath, err := ExtractGithubDetailsFromURL(url)
                        if err != nil {
                            errorChan <- model.ProgressError{
                                Job:     "github url",
                                Message: fmt.Sprintf("error extracting github details from url: %s", err.Error()),
                            }
                            <-doneChan
                            return err
                        }
                        report, er := runGithubHistoryReport(user, repo, filePath, latestFlag, updateChan, errorChan)

                        // wait for things to be completed.
                        <-doneChan

                        if failed {
                            pterm.Error.Println("report failed to generate.")
                            pterm.Println()
                            pterm.Println()
                            return errors.New("report failed to generate")
                        }

                        if er != nil {
                            for x := range er {
                                pterm.Error.Println(er[x].Error())
                            }
                            return er[0]
                        }

                        jsonBytes, _ := json.MarshalIndent(report, "", "  ")
                        fmt.Println(string(jsonBytes))
                        return nil
                    }

                } else {
                    pterm.Error.Println("Two arguments are required to compare left and right OpenAPI Specifications.")
                    return nil
                }
            }
            if len(args) == 2 {

                // check if the first arg is a directory, if so - process as a git history operation.
                p := args[0]
                f, err := os.Stat(p)
                if err != nil {
                    pterm.Error.Printf("Cannot open file/repository: '%s': %s", args[0])
                    return err
                }

                if f.IsDir() {

                    p = args[1]
                    f, err = os.Stat(p)
                    if err != nil {
                        pterm.Error.Printf("Cannot open file/repository: '%s'", args[1])
                        return err
                    }

                    go listenForUpdates(updateChan, errorChan)

                    report, er := runGitHistoryReport(args[0], args[1], latestFlag, updateChan, errorChan)

                    <-doneChan

                    if failed {
                        pterm.Error.Println("report failed to generate.")
                        pterm.Println()
                        pterm.Println()
                        return errors.New("report failed to generate")
                    }

                    if er != nil {
                        for x := range er {
                            pterm.Error.Println(er[x].Error())
                        }
                        return er[0]
                    }

                    jsonBytes, _ := json.MarshalIndent(report, "", "  ")
                    fmt.Println(string(jsonBytes))
                    return nil

                } else {

                    report, errs := runLeftRightReport(args[0], args[1], updateChan, errorChan)
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

func runGitHistoryReport(gitPath, filePath string, latest bool,
    updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) (*model.HistoricalReport, []error) {

    if gitPath == "" || filePath == "" {
        err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
        model.SendProgressError("git", err.Error(), errorChan)
        return nil, []error{err}
    }

    model.SendProgressUpdate("extraction",
        fmt.Sprintf("Extracting history for '%s' in repo '%s",
            filePath, gitPath), false, updateChan)

    // build commit history.
    commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath, updateChan, errorChan)
    if err != nil {
        return nil, err
    }

    // populate history with changes and data
    commitHistory, err = git.PopulateHistoryWithChanges(commitHistory, 0, updateChan, errorChan)
    if err != nil {
        model.SendProgressError("git", fmt.Sprintf("%d errors found extracting history", len(err)), errorChan)
        return nil, err
    }

    if latest {
        commitHistory = commitHistory[:1]
    }

    var reports []*model.Report
    for r := range commitHistory {
        if commitHistory[r].Changes != nil {
            reports = append(reports, createReport(commitHistory[r]))
        }
    }
    model.SendProgressUpdate("extraction",
        fmt.Sprintf("extracted %d reports from history", len(reports)), true, updateChan)

    close(updateChan)

    return &model.HistoricalReport{
        GitRepoPath:   gitPath,
        GitFilePath:   filePath,
        Filename:      path.Base(filePath),
        DateGenerated: time.Now().String(),
        Reports:       reports,
    }, nil

}

func runGithubHistoryReport(username, repo, filePath string, latest bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) (*model.HistoricalReport, []error) {

    commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan, false, 3)
    if errs != nil {
        return nil, errs
    }

    if latest {
        commitHistory = commitHistory[:1]
    }

    var ghReports []*model.Report
    for r := range commitHistory {
        if commitHistory[r].Changes != nil {
            ghReports = append(ghReports, createReport(commitHistory[r]))
        }
    }
    model.SendProgressUpdate("extraction",
        fmt.Sprintf("extracted %d reports from history", len(ghReports)), true, progressChan)

    close(progressChan)

    return &model.HistoricalReport{
        GitRepoPath:   fmt.Sprintf("%s/%s", username, repo),
        GitFilePath:   filePath,
        Filename:      path.Base(filePath),
        DateGenerated: time.Now().String(),
        Reports:       ghReports,
    }, nil

}

func runLeftRightReport(left, right string,
    updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) (*model.Report, []error) {

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

    commits, errs = git.BuildCommitChangelog(commits, updateChan, errorChan)
    if len(errs) > 0 {
        return nil, errs
    }
    return createReport(commits[0]), nil
}

func createReport(commit *model.Commit) *model.Report {
    report := reports.CreateOverallReport(commit.Changes)
    return &model.Report{Summary: report.ChangeReport, Commit: commit}
}
