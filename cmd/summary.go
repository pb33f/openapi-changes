// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/pb33f/openapi-changes/builder"

	"github.com/pb33f/libopenapi/what-changed/reports"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pterm/pterm"
	"github.com/spf13/cobra"
	"github.com/twinj/uuid"
)

func GetSummaryCommand() *cobra.Command {

	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "summary",
		Short:        "See a summary of changes",
		Long:         "print a summary of what changed, view a simple tree of changes and summary",
		Example:      "openapi-changes summary /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {

			updateChan := make(chan *model.ProgressUpdate)
			errorChan := make(chan model.ProgressError)
			doneChan := make(chan bool)
			failed := false
			baseFlag, _ := cmd.Flags().GetString("base")
			latestFlag, _ := cmd.Flags().GetBool("top")
			noColorFlag, _ := cmd.Flags().GetBool("no-color")
			limitFlag, _ := cmd.Flags().GetInt("limit")
			remoteFlag, _ := cmd.Flags().GetBool("remote")

			if noColorFlag {
				pterm.DisableStyling()
				pterm.DisableColor()
			}

			noBanner, _ := cmd.Flags().GetBool("no-logo")
			if !noBanner {
				PrintBanner()
			}

			if len(args) == 1 {
				// check if arg is an url (like a github url)
				specUrl, err := url.Parse(args[0])
				if err == nil {
					supportedHosts := []string{"github.com"}

					if specUrl.Host == "github.com" {
						go listenForUpdates(updateChan, errorChan, doneChan, failed)

						user, repo, filePath, e := ExtractGithubDetailsFromURL(specUrl)
						if e != nil {
							errorChan <- model.ProgressError{
								Job:     "github url",
								Message: fmt.Sprintf("error extracting github details from url: %s", e.Error()),
							}
							<-doneChan
							return err
						}

						er := runGithubHistorySummary(user, repo, filePath, latestFlag, limitFlag, updateChan,
							errorChan, baseFlag, remoteFlag)
						// wait for things to be completed.
						<-doneChan
						if er != nil {
							return er
						}
						return nil
					} else {
						return errors.New(fmt.Sprintf("Host %q is not supported.\nSupported hosts are: %v", specUrl.Host, supportedHosts))
					}

				} else {
					return errors.New(fmt.Sprintf("Error parsing url: %v", err))
				}
			} else if len(args) == 2 {

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
					pterm.Error.Printf("Cannot open file/repository: '%s'\n\n", left)
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

					go listenForUpdates(updateChan, errorChan, doneChan, failed)

					err = runGitHistorySummary(args[0], args[1], latestFlag, updateChan, errorChan, baseFlag, remoteFlag)

					<-doneChan

					if err != nil {
						pterm.Error.Println(err.Error())
						return err
					}
				} else {
					go listenForUpdates(updateChan, errorChan, doneChan, failed)

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

					errs := runLeftRightSummary(left, right, updateChan, errorChan, baseFlag, remoteFlag)
					<-doneChan
					if len(errs) > 0 {
						for e := range errs {
							pterm.Error.Println(errs[e].Error())
						}
						return errors.Join(errs...)
					}
				}
			} else {
				// if an invalid number of arguments are provided, print usage
				PrintHowToUse("summary")
				return errors.New("invalid number of arguments provided")
			}
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	return cmd
}

func listenForUpdates(updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, doneChan chan bool, failed bool) {
	spinner, _ := pterm.DefaultSpinner.Start("starting work.")

	spinner.InfoPrinter = &pterm.PrefixPrinter{
		MessageStyle: &pterm.Style{pterm.FgLightCyan},
		Prefix: pterm.Prefix{
			Style: &pterm.Style{pterm.FgBlack, pterm.BgLightMagenta},
			Text:  " SPEC ",
		},
	}
	spinner.SuccessPrinter = &pterm.PrefixPrinter{
		MessageStyle: &pterm.Style{pterm.FgLightCyan},
		Prefix: pterm.Prefix{
			Style: &pterm.Style{pterm.FgBlack, pterm.BgLightCyan},
			Text:  " DONE ",
		},
	}

	var warnings []string

	for {
		select {
		case update, ok := <-updateChan:
			if ok {
				if !update.Completed {
					spinner.UpdateText(update.Message)
				} else {
					spinner.Info(update.Message)
				}
				if update.Warning {
					warnings = append(warnings, update.Message)
				}
			} else {
				if !failed {
					spinner.Success("completed")
					spinner.Stop()
					pterm.Println()
					pterm.Println()
				} else {
					spinner.Fail("failed to complete. sorry!")
				}
				if len(warnings) > 0 {
					pterm.Warning.Print("warnings reported during processing")
					pterm.Println()
					dupes := make(map[string]bool)
					for w := range warnings {
						sum := md5.Sum([]byte(warnings[w]))
						md5 := hex.EncodeToString(sum[:])
						if !dupes[md5] {
							dupes[md5] = true
						} else {
							continue
						}
						pterm.Println(fmt.Sprintf("⚠️  %s", pterm.FgYellow.Sprint(warnings[w])))
					}
				}

				doneChan <- true

				return
			}
		case err := <-errorChan:
			if err.Fatal {
				spinner.Fail(fmt.Sprintf("Stopped: %s", err.Message))
				spinner.Stop()
			} else {
				warnings = append(warnings, err.Message)
			}
		}
	}
}

func checkURL(urlString string, errorChan chan model.ProgressError) (string, error) {
	u, urlErr := url.Parse(urlString)
	if urlErr == nil && strings.HasPrefix(u.Scheme, "http") {
		// download the file
		resp, httpErr := http.Get(urlString)
		if httpErr != nil {
			errorChan <- model.ProgressError{
				Job:     "download",
				Message: fmt.Sprintf("error downloading file '%s': %s", urlString, httpErr.Error()),
			}
			return urlString, httpErr
		}
		bits, _ := io.ReadAll(resp.Body)

		if len(bits) <= 0 {
			errorChan <- model.ProgressError{
				Job:     "download",
				Message: fmt.Sprintf("downloaded file '%s' is empty", urlString),
			}
			return urlString, fmt.Errorf("downloaded file '%s' is empty", urlString)
		}
		tmpFile, _ := os.CreateTemp("", "left.yaml")
		_, wErr := tmpFile.Write(bits)
		if wErr != nil {
			errorChan <- model.ProgressError{
				Job:     "download",
				Message: fmt.Sprintf("downloaded file '%s' cannot be written: %s", urlString, wErr.Error()),
			}
			return urlString, fmt.Errorf("downloaded file '%s' is empty", urlString)
		}
		return tmpFile.Name(), nil
	}
	return urlString, nil
}

func runLeftRightSummary(left, right string, updateChan chan *model.ProgressUpdate,
	errorChan chan model.ProgressError, base string, remote bool) []error {

	var leftBytes, rightBytes []byte
	// var errs []error
	var err error

	leftBytes, err = os.ReadFile(left)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot read original spec: %s", err.Error()), errorChan)
		close(updateChan)
		return []error{err}
	}
	rightBytes, err = os.ReadFile(right)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot read modified spec: %s", err.Error()), errorChan)
		close(updateChan)
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

	commits, _ = git.BuildCommitChangelog(commits, updateChan, errorChan, base, remote)

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history", len(commits)), true, updateChan)

	close(updateChan)
	e := printSummaryDetails(commits)
	if e != nil {
		return []error{e}
	}
	return nil
}

func runGithubHistorySummary(username, repo, filePath string, latest bool, limit int,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) error {
	commitHistory, _ := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan,
		false, limit, base, remote)

	if latest {
		commitHistory = commitHistory[:1]
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history", len(commitHistory)), true, progressChan)

	close(progressChan)

	return printSummaryDetails(commitHistory)
}

func runGitHistorySummary(gitPath, filePath string, latest bool,
	updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) error {
	if gitPath == "" || filePath == "" {
		err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
		model.SendProgressError("git", err.Error(), errorChan)
		return err
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("Extracting history for '%s' in repo '%s",
			filePath, gitPath), false, updateChan)

	// build commit history.
	commitHistory, errs := git.ExtractHistoryFromFile(gitPath, filePath, updateChan, errorChan)
	if errs != nil {
		model.SendProgressError("git", fmt.Sprintf("%d errors found extracting history", len(errs)), errorChan)
		close(updateChan)
		return errs[0]
	}

	// populate history with changes and data
	git.PopulateHistoryWithChanges(commitHistory, 0, updateChan, errorChan, base, remote)

	if latest {
		commitHistory = commitHistory[:1]
	}
	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history", len(commitHistory)), true, updateChan)

	close(updateChan)

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

			_, overallStatistics := builder.BuildTree(commitHistory[c].Changes)

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
			_ = pterm.DefaultTable.WithHasHeader().WithData(tableData).Render()
			if breaking == 0 {
				pterm.Info.Printf("Total Changes: %s\n", pterm.LightMagenta(total))
			} else {
				errorStyle.Printf("❌  %d Breaking changes out of %d\n", breaking, total)
			}
			if overallStatistics.Modified > 0 {
				pterm.Info.Printf("Modifications: %s\n", pterm.LightMagenta(overallStatistics.Modified))
			}
			if overallStatistics.Removed > 0 {
				pterm.Info.Printf("Removals: %s\n", pterm.LightMagenta(overallStatistics.Removed))
			}
			if overallStatistics.Added > 0 {
				pterm.Info.Printf("Additions: %s\n", pterm.LightMagenta(overallStatistics.Added))
			}
			if overallStatistics.BreakingRemoved > 0 {
				pterm.Info.Printf("Breaking Removals: %s\n", pterm.LightRed(overallStatistics.BreakingRemoved))
			}
			if overallStatistics.BreakingModified > 0 {
				pterm.Info.Printf("Breaking Modifications: %s\n", pterm.LightRed(overallStatistics.BreakingModified))
			}
			if overallStatistics.BreakingAdded > 0 {
				pterm.Info.Printf("Breaking Additions: %s\n", pterm.LightRed(overallStatistics.BreakingAdded))
			}

			if c < len(commitHistory) {
				pterm.Println()
			}
		} else {
			if tt <= 0 && tb <= 0 {
				pterm.Success.Println("No changes detected")
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
