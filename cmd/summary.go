// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/pb33f/openapi-changes/builder"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

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
			markdownFlag, _ := cmd.Flags().GetBool("markdown")

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
				PrintHowToUse("summary")
				return nil
			}

			listenForUpdates := func(updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) {
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
								fmt.Println()
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
							errorChan, baseFlag, remoteFlag, markdownFlag)
						// wait for things to be completed.
						<-doneChan
						if er != nil {
							return er
						}
						return nil
					} else {
						pterm.Error.Println("When using a single argument (URL), only github.com is supported at this time. Please provide a github url")
						return nil
					}

				} else {
					// if an invalid number of arguments are provided, print usage
					pterm.Error.Println("Invalid URL")
					PrintHowToUse("summary")
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

					go listenForUpdates(updateChan, errorChan)

					err = runGitHistorySummary(args[0], args[1], latestFlag, updateChan, errorChan,
						baseFlag, remoteFlag, markdownFlag, limitFlag)

					<-doneChan

					if err != nil {
						pterm.Error.Println(err.Error())
						return err
					}

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

					errs := runLeftRightSummary(left, right, updateChan, errorChan, baseFlag, remoteFlag, markdownFlag)
					<-doneChan
					if len(errs) > 0 {
						for e := range errs {
							pterm.Error.Println(errs[e].Error())
						}
						return errors.Join(errs...)
					}
					return nil
				}
			}
			pterm.Error.Println("Invalid arguments")
			pterm.Println()
			PrintHowToUse("summary")
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	cmd.Flags().BoolP("markdown", "m", false, "Render output in markdown, using emojis")
	return cmd
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
	errorChan chan model.ProgressError, base string, remote, markdown bool) []error {

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

	var errs []error
	commits, errs = git.BuildCommitChangelog(commits, updateChan, errorChan, base, remote)
	if len(errs) > 0 {
		close(updateChan)
		return errs
	}

	if len(commits) <= 0 {
		close(updateChan)
		return []error{errors.New("cannot compare files, nothing was extracted")}
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history", len(commits)), true, updateChan)

	e := printSummaryDetails(commits, markdown)
	if e != nil {
		model.SendProgressError("git", e.Error(), errorChan)
		close(updateChan)
		return []error{e}
	}
	close(updateChan)
	return nil
}

func runGithubHistorySummary(username, repo, filePath string, latest bool, limit int,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, markdown bool) error {
	commitHistory, _ := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan,
		false, limit, base, remote)

	if latest {
		commitHistory = commitHistory[:1]
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history", len(commitHistory)), true, progressChan)

	close(progressChan)

	return printSummaryDetails(commitHistory, markdown)
}

func runGitHistorySummary(gitPath, filePath string, latest bool,
	updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, markdown bool, limit int) error {
	if gitPath == "" || filePath == "" {
		err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
		model.SendProgressError("git", err.Error(), errorChan)
		return err
	}

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("Extracting history for '%s' in repo '%s",
			filePath, gitPath), false, updateChan)

	// build commit history.
	commitHistory, errs := git.ExtractHistoryFromFile(gitPath, filePath, updateChan, errorChan, limit)
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

	err := printSummaryDetails(commitHistory, markdown)

	model.SendProgressUpdate("extraction",
		fmt.Sprintf("extracted %d commits from history\n", len(commitHistory)), true, updateChan)
	close(updateChan)
	return err
}

func printSummaryDetails(commitHistory []*model.Commit, markdown bool) error {
	tt := 0
	tb := 0
	pterm.Println()
	errorStyle := pterm.NewStyle(pterm.FgLightRed, pterm.Italic)

	for c := range commitHistory {
		tableData := [][]string{{"Document Element", "Total Changes", "Breaking Changes"}}

		if commitHistory[c].Changes != nil {
			if c == 0 {
				buildConsoleTree(commitHistory[c].Changes, markdown)
			}

			_, overallStatistics := builder.BuildTree(commitHistory[c].Changes)

			report := reports.CreateOverallReport(commitHistory[c].Changes)
			total := 0
			breaking := 0

			if markdown {

				fmt.Println("| Document Element | Total Changes | Breaking Changes |")
				fmt.Println("|------------------|---------------|------------------|")
			}

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
				if markdown {
					elementSpace := 16 - len(l)
					totalChangesSpace := 13 - len(fmt.Sprint(report.ChangeReport[l].Total))
					breakingChangesSpace := 16 - len(fmt.Sprint(report.ChangeReport[l].Breaking))

					fmt.Printf("| %s%s | %d%s | %d%s |\n", l, strings.Repeat(" ", elementSpace),
						report.ChangeReport[l].Total, strings.Repeat(" ", totalChangesSpace), report.ChangeReport[l].Breaking, strings.Repeat(" ", breakingChangesSpace))
				}
			}
			pterm.Println()
			pterm.Printf("Date: %s | Commit: %s\n",
				commitHistory[c].CommitDate.Format("01/02/06"),
				commitHistory[c].Message)

			if !markdown {
				_ = pterm.DefaultTable.WithHasHeader().WithData(tableData).Render()
			} else {
				fmt.Println()
			}

			if breaking == 0 {
				if markdown {
					pterm.Printf("**Total Changes**: _%d_\n", total)
				} else {
					pterm.Info.Printf("Total Changes: %s\n", pterm.LightMagenta(total))
				}
			} else {
				if markdown {
					pterm.Printf("- ❌ **BREAKING Changes**: _%d_\n", total)
				} else {
					errorStyle.Printf("❌  %d Breaking changes out of %d\n", breaking, total)
				}
			}
			if overallStatistics.Modified > 0 {
				if markdown {
					pterm.Printf("- **Modifications**: _%d_\n", overallStatistics.Modified)
				} else {
					pterm.Info.Printf("Modifications: %s\n", pterm.LightMagenta())
				}
			}
			if overallStatistics.Removed > 0 {
				if markdown {
					pterm.Printf("- **Removals**: _%d_\n", overallStatistics.Removed)
				} else {
					pterm.Info.Printf("Removals: %s\n", pterm.LightMagenta(overallStatistics.Removed))
				}
			}
			if overallStatistics.Added > 0 {
				if markdown {
					pterm.Printf("- **Additions**: _%d_\n", overallStatistics.Added)
				} else {
					pterm.Info.Printf("Additions: %s\n", pterm.LightMagenta(overallStatistics.Added))
				}
			}
			if overallStatistics.BreakingRemoved > 0 {
				if markdown {
					pterm.Printf("- **Breaking Removals**: _%d_\n", overallStatistics.BreakingRemoved)
				} else {
					pterm.Info.Printf("Breaking Removals: %s\n", pterm.LightRed(overallStatistics.BreakingRemoved))
				}
			}
			if overallStatistics.BreakingModified > 0 {
				if markdown {
					pterm.Printf("- **Breaking Modifications**: _%d_\n", overallStatistics.BreakingModified)
				} else {
					pterm.Info.Printf("Breaking Modifications: %s\n", pterm.LightRed(overallStatistics.BreakingModified))
				}
			}
			if overallStatistics.BreakingAdded > 0 {
				if markdown {
					pterm.Printf("- **Breaking Additions**: _%d_\n", overallStatistics.BreakingAdded)
				} else {
					pterm.Info.Printf("Breaking Additions: %s\n", pterm.LightRed(overallStatistics.BreakingAdded))
				}
			}

			pterm.Println()

			if c < len(commitHistory) {
				//pterm.Println()
			}
		} else {
			if tt <= 0 && tb <= 0 {
				if c+1 < len(commitHistory) {
					pterm.Print(pterm.Green(fmt.Sprintf("No changes detected between %s and %s\n",
						commitHistory[c].Hash, commitHistory[c+1].Hash)))
				}
			}
		}
	}

	if tb > 0 {
		return errors.New("breaking changes discovered")
	} else {
		return nil
	}
}
