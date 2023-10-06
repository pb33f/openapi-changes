// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
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
			limitFlag, _ := cmd.Flags().GetInt("limit")
			baseFlag, _ := cmd.Flags().GetString("base")

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintBanner()
			}

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
				specUrl, err := url.Parse(args[0])
				if err == nil {

					if specUrl.Host == "github.com" {
						go listenForUpdates(updateChan, errorChan)

						user, repo, filePath, err := ExtractGithubDetailsFromURL(specUrl)
						if err != nil {
							errorChan <- model.ProgressError{
								Job:     "github url",
								Message: fmt.Sprintf("error extracting github details from url: %s", err.Error()),
							}
							<-doneChan
							return err
						}
						commits, er := runGithubHistoryConsole(user, repo, filePath, latestFlag, limitFlag, updateChan, errorChan)

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

				var left, right string
				var urlErr error

				// check if first arg is a URL
				left, urlErr = checkURL(args[0], errorChan)
				if urlErr != nil {
					pterm.Error.Println(urlErr.Error())
					return urlErr
				}

				// check if the first arg is a directory, if so - process as a git history operation.
				p := left
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

					commits, errs := runGitHistoryConsole(args[0], args[1], latestFlag, limitFlag, updateChan, errorChan, baseFlag)

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
					go listenForUpdates(updateChan, errorChan)

					// check if the first arg is a URL, if so download it, if not - assume it's a file.
					left, urlErr = checkURL(args[0], errorChan)
					if urlErr != nil {
						pterm.Error.Println(urlErr.Error())
						return urlErr
					}

					// check if the second arg is a URL, if so download it, if not - assume it's a file.
					right, urlErr = checkURL(args[1], errorChan)
					if urlErr != nil {
						pterm.Error.Println(urlErr.Error())
						return urlErr
					}

					errs := runLeftRightCompare(left, right, updateChan, errorChan, baseFlag)
					// wait.
					<-doneChan
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

func runGithubHistoryConsole(username, repo, filePath string, latest bool, limit int,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) ([]*model.Commit, []error) {

	commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan, false, limit)

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

func runGitHistoryConsole(gitPath, filePath string, latest bool, limit int,
	updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string) ([]*model.Commit, []error) {

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
		close(updateChan)
		model.SendProgressError("git", fmt.Sprintf("%d errors found extracting history", len(err)), errorChan)
		return nil, err
	}

	// populate history with changes and data
	git.PopulateHistoryWithChanges(commitHistory, limit, updateChan, errorChan, base)

	if latest {
		commitHistory = commitHistory[:1]
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history", len(commitHistory)), true, updateChan)

	close(updateChan)

	return commitHistory, nil
}

func runLeftRightCompare(left, right string, updateChan chan *model.ProgressUpdate,
	errorChan chan model.ProgressError, base string) []error {

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

	commits, errs = git.BuildCommitChangelog(commits, updateChan, errorChan, base)
	if len(errs) > 0 {
		return errs
	}
	close(updateChan)
	close(errorChan)
	app := tui.BuildApplication(commits, Version)
	if err := app.Run(); err != nil {
		return []error{err}
	}
	return nil
}
