// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "errors"
    "fmt"
    "github.com/pb33f/openapi-changes/git"
    htmlReport "github.com/pb33f/openapi-changes/html-report"
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
            cdnFlag, _ := cmd.Flags().GetBool("use-cdn")
            latestFlag, _ := cmd.Flags().GetBool("top")
            limitFlag, _ := cmd.Flags().GetInt("limit")

            if noColorFlag {
                pterm.DisableStyling()
                pterm.DisableColor()
            }

            noBanner, _ := cmd.Flags().GetBool("no-logo")
            if !noBanner {
                PrintBanner()
            }

            // if there are no args, print out how to use the console.
            if len(args) == 0 {
                PrintHowToUse("html-report")
                return nil
            }

            listenForUpdates := func(updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) {
                var spinner *pterm.SpinnerPrinter
                if !noColorFlag {
                    spinner, _ = pterm.DefaultSpinner.Start("starting work.")
                }
                for {
                    select {
                    case update, ok := <-updateChan:
                        if ok {
                            if !noColorFlag {
                                spinner.UpdateText(update.Message)
                            }
                            if update.Warning {
                                pterm.Warning.Println(update.Message)
                            }
                        } else {
                            if !failed {
                                if !noColorFlag {
                                    spinner.Info("all done, html report is ready.")
                                }
                            } else {
                                if !noColorFlag {
                                    spinner.Fail("failed to complete. sorry!")
                                }
                            }
                            doneChan <- true
                            return
                        }
                    case err := <-errorChan:
                        //failed = true
                        if err.Fatal {
                            if !noColorFlag {
                                spinner.Fail(fmt.Sprintf("Stopped: %s", err.Message))
                            } else {
                                pterm.Error.Println(err)
                            }
                            doneChan <- true
                            return
                        } else {
                            pterm.Warning.Println(err.Message)
                        }
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
                        report, _, er := RunGithubHistoryHTMLReport(user, repo, filePath, latestFlag, cdnFlag, false, updateChan, errorChan, limitFlag)

                        // wait for things to be completed.
                        <-doneChan

                        if len(report) <= 0 && er != nil {
                            return er[0]
                        }
                        if len(report) > 0 {
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

                // check if the first arg is a directory, if so - process as a git history operation.
                p := args[0]
                f, err := os.Stat(p)
                if err != nil {
                    pterm.Error.Printf("Cannot open file/repository: '%s'", args[0])
                    return err
                }

                if f.IsDir() {
                    repo := p
                    p = args[1]
                    f, err = os.Stat(filepath.Join(repo, p))
                    if err != nil {
                        pterm.Error.Printf("Cannot open file/repository: '%s'", args[1])
                        return err
                    }
                    go listenForUpdates(updateChan, errorChan)

                    report, _, er := RunGitHistoryHTMLReport(args[0], args[1], latestFlag, cdnFlag, updateChan, errorChan)
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
                    go listenForUpdates(updateChan, errorChan)
                    report, errs := RunLeftRightHTMLReport(args[0], args[1], cdnFlag, updateChan, errorChan)
                    <-doneChan
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
    cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
    cmd.Flags().BoolP("use-cdn", "c", false, "Use CDN for CSS and JS delivery instead of bundling inline")

    return cmd
}

func ExtractGithubDetailsFromURL(url *url.URL) (string, string, string, error) {
    path := url.Path
    dir, file := filepath.Split(path)
    dirSegments := strings.Split(dir, "/")
    if len(dirSegments) >= 6 {
        user := dirSegments[1]
        repo := dirSegments[2]
        filePath := fmt.Sprintf("%s%s", strings.Join(dirSegments[5:], "/"), file)
        return user, repo, filePath, nil
    } else {
        return "", "", "", fmt.Errorf("url: '%s' not correctly formed", url.String())
    }
}

func RunGitHistoryHTMLReport(gitPath, filePath string, latest, useCDN bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]byte, []*model.Report, []error) {
    if gitPath == "" || filePath == "" {
        err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
        model.SendProgressError("reading paths",
            err.Error(), errorChan)
        return nil, nil, []error{err}
    }

    // build commit history.
    commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath, progressChan, errorChan)
    if err != nil {
        return nil, nil, err
    }

    // populate history with changes and data
    commitHistory, err = git.PopulateHistoryWithChanges(commitHistory, 0, progressChan, errorChan)
    if err != nil {
        return nil, nil, err
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

    if len(reports) > 0 {
        model.SendProgressUpdate("extraction",
            fmt.Sprintf("Extracted '%d' reports from file history", len(reports)), true, progressChan)
    }

    close(progressChan)

    generator := htmlReport.NewHTMLReport(false, time.Now(), commitHistory)
    return generator.GenerateReport(false, useCDN, false), reports, nil
}

func RunGithubHistoryHTMLReport(username, repo, filePath string, latest, useCDN, embeddedMode bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, limit int) ([]byte, []*model.Report, []error) {

    commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan, true, limit)

    if latest && len(commitHistory) > 1 {
        commitHistory = commitHistory[:1]
    }

    var reports []*model.Report
    for r := range commitHistory {
        if commitHistory[r].Changes != nil {
            reports = append(reports, createReport(commitHistory[r]))
        }
    }

    if len(reports) > 0 {
        model.SendProgressUpdate("extraction",
            fmt.Sprintf("Extracted '%d' reports from file history", len(reports)), true, progressChan)
    }

    // if there are no reports and no commits, return no bytes.
    if len(reports) == 0 {

        model.SendProgressError("extraction",
            fmt.Sprintf("history extraction failed %d reports generated for '%s'", len(reports), filePath), errorChan)

        close(progressChan)
        return nil, nil, append(errs, fmt.Errorf("no repors extracted, no history found for file '%s'", filePath))
    }

    generator := htmlReport.NewHTMLReport(false, time.Now(), commitHistory)

    close(progressChan)
    return generator.GenerateReport(false, useCDN, embeddedMode), reports, errs
}

func RunLeftRightHTMLReport(left, right string, useCDN bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]byte, []error) {

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

    commits, errs = git.BuildCommitChangelog(commits, progressChan, errorChan)
    if len(errs) > 0 {
        close(progressChan)
        return nil, errs
    }
    generator := htmlReport.NewHTMLReport(false, time.Now(), commits)

    close(progressChan)
    return generator.GenerateReport(false, useCDN, false), nil
}

func RunLeftRightHTMLReportViaString(left, right string, useCDN, embedded bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]byte, []error) {

    var errs []error

    commits := []*model.Commit{
        {
            Hash:       uuid.NewV4().String()[:6],
            Message:    fmt.Sprintf("Uploaded original (%d bytes)", len(left)),
            CommitDate: time.Now(),
            Data:       []byte(left),
        },
        {
            Hash:       uuid.NewV4().String()[:6],
            Message:    fmt.Sprintf("Uploaded modification (%d bytes)", len(right)),
            CommitDate: time.Now(),
            Data:       []byte(right),
        },
    }

    commits, errs = git.BuildCommitChangelog(commits, progressChan, errorChan)
    if len(errs) > 0 {
        close(progressChan)
        return nil, errs
    }
    generator := htmlReport.NewHTMLReport(false, time.Now(), commits)

    close(progressChan)
    return generator.GenerateReport(false, useCDN, embedded), nil
}
