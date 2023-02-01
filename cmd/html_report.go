// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "errors"
    "fmt"
    "github.com/pb33f/libopenapi/resolver"
    "github.com/pb33f/openapi-changes/git"
    html_report "github.com/pb33f/openapi-changes/html-report"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "github.com/twinj/uuid"
    "net/url"
    "os"
    "path/filepath"
    "strings"
    "time"
)

func GetHTMLReportCommand() *cobra.Command {

    cmd := &cobra.Command{
        SilenceUsage:  false,
        SilenceErrors: false,
        Use:           "html-report",
        Short:         "Generate the sexiest, most interactive diffing experience you have ever seen.",
        Long: "Generate a ready to go, super sexy, and highly interactive HTML report that " +
            "you can explore and review in your browser",
        Example: "openapi-changes html-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
        RunE: func(cmd *cobra.Command, args []string) error {

            updateChan := make(chan *model.ProgressUpdate)
            errorChan := make(chan model.ProgressError)
            doneChan := make(chan bool)
            failed := false

            noColorFlag, _ := cmd.Flags().GetBool("no-color")

            if noColorFlag {
                pterm.DisableStyling()
                pterm.DisableColor()
            }

            PrintBanner()

            // if there are no args, print out how to use the console.
            if len(args) == 0 {
                PrintHowToUse("html-report")
                return nil
            }

            listenForUpdates := func(updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) {
                spinner, _ := pterm.DefaultSpinner.Start("starting work.")
                for {
                    select {
                    case update, ok := <-updateChan:
                        if ok {
                            spinner.UpdateText(update.Message)
                            if update.Warning {
                                pterm.Warning.Println(update.Message)
                            }
                        } else {
                            if !failed {
                                spinner.Info("all done, html report is ready.")
                            } else {
                                spinner.Fail("failed to complete. sorry!")
                            }
                            doneChan <- true
                            return
                        }
                    case err := <-errorChan:
                        failed = true
                        spinner.Fail(fmt.Sprintf("Stopped: %s", err.Message))
                        pterm.Println()
                        pterm.Println()
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

                        user, repo, filePath, err := extractGithubDetailsFromURL(url)
                        if err != nil {
                            errorChan <- model.ProgressError{
                                Job:     "github url",
                                Message: fmt.Sprintf("error extracting github details from url: %s", err.Error()),
                            }
                            <-doneChan
                            return err
                        }
                        report, er := runGithubHistoryHTMLReport(user, repo, filePath, false, updateChan, errorChan)

                        // wait for things to be completed.
                        <-doneChan

                        if err != nil {
                            return er[0]
                        }
                        if !failed {
                            err = os.WriteFile("report.html", report, 0664)
                            if err != nil {
                                pterm.Error.Println(err.Error())
                                return err
                            }
                            pterm.Success.Printf("%s report written to file 'report.html' (%dkb)", url.String(), len(report)/1024)
                            pterm.Println()
                            pterm.Println()
                        }
                        return nil
                    }

                } else {
                    pterm.Error.Println("Two arguments are required to compare left and right OpenAPI Specifications.")
                    return nil
                }
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
                    go listenForUpdates(updateChan, errorChan)

                    report, er := runGitHistoryHTMLReport(args[0], args[1], latestFlag, updateChan, errorChan)
                    <-doneChan
                    if er != nil {
                        for x := range er {
                            pterm.Error.Println(er[x].Error())
                        }
                        return er[0]
                    }

                    err = os.WriteFile("report.html", report, 0664)
                    if err != nil {
                        pterm.Error.Println(err.Error())
                        return err
                    }
                    pterm.Success.Printf("report written to file 'report.html' (%dkb)", len(report)/1024)
                    pterm.Println()
                    pterm.Println()
                    return nil

                } else {

                    report, errs := runLeftRightHTMLReport(args[0], args[1])
                    if len(errs) > 0 {
                        for e := range errs {
                            pterm.Error.Println(errs[e].Error())
                        }
                        return errors.New("unable to process specifications")
                    }

                    err = os.WriteFile("report.html", report, 644)
                    pterm.Success.Printf("report written to file 'report.html' (%dkb)", len(report)/1024)
                    pterm.Println()
                    pterm.Println()
                    return nil
                }
            }
            pterm.Error.Println("too many arguments, expecting two (2)")
            return nil
        },
    }
    cmd.Flags().BoolP("no-style", "n", false, "Disable color and style output (very useful for CI/CD)")
    return cmd
}

func extractGithubDetailsFromURL(url *url.URL) (string, string, string, error) {
    path := url.Path
    dir, file := filepath.Split(path)
    dirSegments := strings.Split(dir, "/")
    if len(dirSegments) > 6 {
        user := dirSegments[1]
        repo := dirSegments[2]
        filePath := fmt.Sprintf("%s%s", strings.Join(dirSegments[5:], "/"), file)
        return user, repo, filePath, nil
    } else {
        return "", "", "", fmt.Errorf("url: '%s' not correctly formed", url.String())
    }
}

func runGitHistoryHTMLReport(gitPath, filePath string, latest bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]byte, []error) {
    if gitPath == "" || filePath == "" {
        err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
        model.SendProgressError("reading paths",
            err.Error(), errorChan)
        return nil, []error{err}
    }

    // build commit history.
    commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath, progressChan, errorChan)
    if err != nil {
        return nil, err
    }

    // populate history with changes and data
    commitHistory, err = git.PopulateHistoryWithChanges(commitHistory, progressChan, errorChan)
    if err != nil {
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
        fmt.Sprintf("extracted %d reports from history", len(reports)), true, progressChan)

    close(progressChan)

    generator := html_report.NewHTMLReport(false, time.Now(), commitHistory)
    return generator.GenerateReport(false), nil
}

func runGithubHistoryHTMLReport(username, repo, filePath string, latest bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]byte, []error) {

    commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan, true)

    if errs != nil {
        for x := range errs {
            if _, ok := errs[x].(*resolver.ResolvingError); !ok {
                model.SendProgressError("git", fmt.Sprintf("%d errors found extracting history", len(errs)), errorChan)
                return nil, errs
            }
        }
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
        fmt.Sprintf("extracted %d reports from history", len(reports)), true, progressChan)

    generator := html_report.NewHTMLReport(false, time.Now(), commitHistory)

    close(progressChan)
    return generator.GenerateReport(false), nil
}

func runLeftRightHTMLReport(left, right string) ([]byte, []error) {

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
    generator := html_report.NewHTMLReport(false, time.Now(), commits)
    return generator.GenerateReport(false), nil
}
