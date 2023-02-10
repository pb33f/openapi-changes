// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "errors"
    "fmt"
    "net/url"
    "os"
    "time"

    "github.com/pb33f/openapi-changes/git"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pb33f/openapi-changes/tui"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "github.com/twinj/uuid"
)

func GetConsoleCommand() *cobra.Command {

    cmd := &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: false,
        Use:           "console",
        Short:         "Interact with OpenAPI changes in an interactive terminal UI",
        Long: "Navigate though a single change or many changes visually. Explore" +
            " Each change, and see a side by side rendering of each change.",
        Example: "openapi-changes console /path/to/git/repo path/to/file/in/repo/openapi.yaml",
        RunE: func(cmd *cobra.Command, args []string) error {

            updateChan := make(chan *model.ProgressUpdate)
            errorChan := make(chan model.ProgressError)
            doneChan := make(chan bool)
            failed := false
            latestFlag, _ := cmd.Flags().GetBool("top")

            PrintBanner()

            // if there are no args, print out how to use the console.
            if len(args) == 0 {
                PrintHowToUse("console")
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
                                spinner.Info("starting console...")
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

                        user, repo, filePath, err := ExtractGithubDetailsFromURL(url)
                        if err != nil {
                            errorChan <- model.ProgressError{
                                Job:     "github url",
                                Message: fmt.Sprintf("error extracting github details from url: %s", err.Error()),
                            }
                            <-doneChan
                            return err
                        }
                        commits, er := runGithubHistoryConsole(user, repo, filePath, latestFlag, updateChan, errorChan)

                        // wait for things to be completed.
                        <-doneChan

                        if err != nil {
                            return er[0]
                        }
                        if !failed {

                            // boot.
                            app := tui.BuildApplication(commits, Version)
                            if err := app.Run(); err != nil {
                                panic(err)
                            }

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

                    p = args[1]
                    f, err = os.Stat(p)
                    if err != nil {
                        pterm.Error.Printf("Cannot open file/repository: '%s'", args[1])
                        return err
                    }

                    go listenForUpdates(updateChan, errorChan)

                    commits, errs := runGitHistoryConsole(args[0], args[1], latestFlag, updateChan, errorChan)

                    // wait.
                    <-doneChan

                    if errs != nil {
                        return errs[0]
                    }

                    // boot.
                    app := tui.BuildApplication(commits, Version)
                    if err := app.Run(); err != nil {
                        pterm.Error.Println("console is unable to start, are you running this inside a container?")
                        pterm.Error.Println("the console requires a terminal to run, it cannot run on a headless system.")
                        fmt.Println()
                        fmt.Println()
                        return err
                    }

                } else {
                    errs := runLeftRightCompare(args[0], args[1], updateChan, errorChan)
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

func runGithubHistoryConsole(username, repo, filePath string, latest bool,
    progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]*model.Commit, []error) {

    commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan, false, 3)

    if errs != nil {
        return nil, errs
    }

    if latest {
        commitHistory = commitHistory[:1]
    }

    model.SendProgressUpdate("extraction",
        fmt.Sprintf("extracted %d commits from history", len(commitHistory)), true, progressChan)

    close(progressChan)
    return commitHistory, nil
}

func runGitHistoryConsole(gitPath, filePath string, latest bool,
    updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]*model.Commit, []error) {

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
        model.SendProgressError("git", fmt.Sprintf("%d errors found extracting history", len(err)), errorChan)
        return nil, err
    }

    // populate history with changes and data
    git.PopulateHistoryWithChanges(commitHistory, 0, updateChan, errorChan)

    if latest {
        commitHistory = commitHistory[:1]
    }

    model.SendProgressUpdate("extraction",
        fmt.Sprintf("extracted %d commits from history", len(commitHistory)), true, updateChan)

    close(updateChan)

    return commitHistory, nil
}

func runLeftRightCompare(left, right string, updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) []error {

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

    commits, errs = git.BuildCommitChangelog(commits, updateChan, errorChan)
    if len(errs) > 0 {
        return errs
    }
    app := tui.BuildApplication(commits, Version)
    if err := app.Run(); err != nil {
        return []error{err}
    }
    return nil
}
