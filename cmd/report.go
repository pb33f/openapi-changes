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
	"path/filepath"
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
		SilenceUsage: true,
		Use:          "report",
		Short:        "Generate a machine readable report for what has changed",
		Long:         "Generate a report for what has changed between two OpenAPI specs, or a single spec, over time.",
		Example:      "openapi-changes report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {

			updateChan := make(chan *model.ProgressUpdate)
			errorChan := make(chan model.ProgressError)
			doneChan := make(chan bool)
			failed := false
			latestFlag, _ := cmd.Flags().GetBool("top")
			limitFlag, _ := cmd.Flags().GetInt("limit")
			baseFlag, _ := cmd.Flags().GetString("base")
			noColorFlag, _ := cmd.Flags().GetBool("no-color")
			remoteFlag, _ := cmd.Flags().GetBool("remote")

			if noColorFlag {
				pterm.DisableStyling()
				pterm.DisableColor()
			}

			// if there are no args, print out how to use the console.
			if len(args) == 0 {
				noBanner, _ := cmd.Flags().GetBool("no-logo")
				if !noBanner {
					PrintBanner()
				}
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
						// do nothing.
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
						report, er := runGithubHistoryReport(user, repo, filePath, latestFlag, limitFlag, updateChan,
							errorChan, baseFlag, remoteFlag)

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
						flat := FlattenHistoricalReport(report)
						jsonBytes, _ := json.MarshalIndent(flat, "", "  ")
						fmt.Println(string(jsonBytes))
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
					pterm.Error.Printf("Cannot open file/repository: '%s': %s\n", args[0], err.Error())
					return err
				}

				if f.IsDir() {

					repo := p
					p = args[1]
					f, err = os.Stat(filepath.Join(repo, p))
					if err != nil {
						pterm.Error.Printf("Cannot open file/repository: '%s'\n", args[1])
						return err
					}

					go listenForUpdates(updateChan, errorChan)

					report, er := runGitHistoryReport(args[0], args[1], latestFlag, updateChan, errorChan, baseFlag,
						remoteFlag, limitFlag)

					<-doneChan

					if failed {
						pterm.Error.Println("report failed to generate.")
						pterm.Println()
						pterm.Println()
						return errors.New("report failed to generate")
					}

					if er != nil {
						pterm.Error.Println("errors occurred while processing the git history")
						for x := range er {
							pterm.Error.Println(er[x].Error())
						}
						return er[0]
					}
					flat := FlattenHistoricalReport(report)
					jsonBytes, _ := json.MarshalIndent(flat, "", "  ")
					fmt.Println(string(jsonBytes))
					return nil

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

					report, errs := runLeftRightReport(left, right, updateChan, errorChan, baseFlag, remoteFlag)
					<-doneChan
					if len(errs) > 0 {
						for e := range errs {
							if errs[e] != nil {
								pterm.Error.Println(errs[e].Error())
							}
						}
						return errors.New("unable to process specifications")
					}
					if report == nil {
						fmt.Println(`{"message": "No changes found between specifications"}`)
						return nil
					}

					// flatten report
					flat := FlattenReport(report)
					jsonBytes, _ := json.MarshalIndent(flat, "", "  ")
					fmt.Println(string(jsonBytes))
					return nil
				}
			}
			pterm.Error.Println("wrong number of arguments, expecting two (2)")
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	return cmd
}

func runGitHistoryReport(gitPath, filePath string, latest bool,
	updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool, limit int) (*model.HistoricalReport, []error) {

	if gitPath == "" || filePath == "" {
		err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
		model.SendProgressError("git", err.Error(), errorChan)
		close(updateChan)
		return nil, []error{err}
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("Extracting history for '%s' in repo '%s",
			filePath, gitPath), false, updateChan)

	// build commit history.
	commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath, updateChan, errorChan, limit)
	if err != nil {
		model.SendProgressError("git", fmt.Sprintf("%d errors found building history", len(err)), errorChan)
		close(updateChan)
		return nil, err
	}

	// populate history with changes and data
	commitHistory, err = git.PopulateHistoryWithChanges(commitHistory, 0, updateChan, errorChan, base, remote)
	if err != nil {
		model.SendProgressError("git", fmt.Sprintf("%d errors found extracting history", len(err)), errorChan)
		close(updateChan)
		return nil, err
	}

	if latest {
		commitHistory = commitHistory[:1]
	}

	var changeReports []*model.Report
	for r := range commitHistory {
		if commitHistory[r].Changes != nil {
			changeReports = append(changeReports, createReport(commitHistory[r]))
		}
	}
	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d reports from history", len(changeReports)), true, updateChan)

	close(updateChan)

	return &model.HistoricalReport{
		GitRepoPath:   gitPath,
		GitFilePath:   filePath,
		Filename:      path.Base(filePath),
		DateGenerated: time.Now().Format(time.RFC3339),
		Reports:       changeReports,
	}, nil

}

func runGithubHistoryReport(username, repo, filePath string, latest bool, limit int,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) (*model.HistoricalReport, []error) {

	commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan,
		false, limit, base, remote)
	if errs != nil {
		model.SendProgressError("git", errors.Join(errs...).Error(), errorChan)
		close(progressChan)
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
		DateGenerated: time.Now().Format(time.RFC3339),
		Reports:       ghReports,
	}, nil

}

func runLeftRightReport(left, right string,
	updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) (*model.Report, []error) {

	var leftBytes, rightBytes []byte
	var errs []error
	var err error

	leftBytes, err = os.ReadFile(left)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot read original spec: %s", err.Error()), errorChan)
		close(updateChan)
		return nil, []error{err}
	}
	rightBytes, err = os.ReadFile(right)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot read modified spec: %s", err.Error()), errorChan)
		close(updateChan)
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

	commits, errs = git.BuildCommitChangelog(commits, updateChan, errorChan, base, remote)
	close(updateChan)

	if len(errs) > 0 {
		return nil, errs
	}
	if commits[0].Changes == nil {
		return nil, nil
	}
	return createReport(commits[0]), nil
}

func createReport(commit *model.Commit) *model.Report {
	report := reports.CreateOverallReport(commit.Changes)
	return &model.Report{Summary: report.ChangeReport, Commit: commit}
}
