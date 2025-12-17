// Copyright 2025 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	markdownReport "github.com/pb33f/openapi-changes/markdown-report"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pterm/pterm"
	"github.com/spf13/cobra"
)

func GetMarkdownReportCommand() *cobra.Command {

	cmd := &cobra.Command{
		SilenceUsage: false,
		Use:          "markdown-report",
		Short: "Generate a ready to go, super sexy, and highly interactive Markdown report that " +
			"you can explore and review in your browser",
		Long: "Generate a ready to go, super sexy, and highly interactive Markdown report that " +
			"you can explore and review in your browser",
		Example: "openapi-changes markdown-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {

			updateChan := make(chan *model.ProgressUpdate)
			errorChan := make(chan model.ProgressError)
			doneChan := make(chan bool)
			failed := false
			baseFlag, _ := cmd.Flags().GetString("base")
			baseCommitFlag, _ := cmd.Flags().GetString("base-commit")
			noColorFlag, _ := cmd.Flags().GetBool("no-color")
			cdnFlag, _ := cmd.Flags().GetBool("use-cdn")
			latestFlag, _ := cmd.Flags().GetBool("top")
			globalRevisionsFlag, _ := cmd.Flags().GetBool("global-revisions")
			limitFlag, _ := cmd.Flags().GetInt("limit")
			limitTimeFlag, _ := cmd.Flags().GetInt("limit-time")
			remoteFlag, _ := cmd.Flags().GetBool("remote")
			reportFile, _ := cmd.Flags().GetString("report-file")
			extRefs, _ := cmd.Flags().GetBool("ext-refs")
			configFlag, _ := cmd.Flags().GetString("config")

			// load breaking rules configuration
			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				PrintConfigError(err)
				return err
			}

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
				PrintHowToUse("markdown-report")
				return nil
			}

			listenForUpdates := func(updateChan chan *model.ProgressUpdate, errorChan chan model.ProgressError) {
				var spinner *pterm.SpinnerPrinter
				if !noColorFlag {
					spinner, _ = pterm.DefaultSpinner.Start("starting work.")

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
				}

				var warnings []string

				for {
					select {
					case update, ok := <-updateChan:
						if ok {
							if !noColorFlag {
								if !update.Completed {
									spinner.UpdateText(update.Message)
								} else {
									spinner.Info(update.Message)
								}
							}
							if update.Warning {
								warnings = append(warnings, update.Message)
							}
						} else {
							if !failed {
								if !noColorFlag {
									spinner.Success("completed processing")
									spinner.Stop()
									pterm.Println()
									pterm.Println()
								}
							} else {
								if !noColorFlag {
									spinner.Fail("failed to complete. sorry!")
									pterm.Println()
									pterm.Println()
								}
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
							if !noColorFlag {
								spinner.Fail(fmt.Sprintf("Stopped: %s", err.Message))
								spinner.Stop()
							} else {
								pterm.Error.Println(err)
							}
							// doneChan <- true
							//return
						} else {
							warnings = append(warnings, err.Message)
						}
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
						report, _, er := RunGithubHistoryMarkdownReport(user, repo, filePath, baseCommitFlag, latestFlag, cdnFlag,
							false, updateChan, errorChan, limitFlag, limitTimeFlag, baseFlag, remoteFlag, extRefs, breakingConfig)

						// wait for things to be completed.
						<-doneChan

						if len(report) <= 0 && er != nil {
							return er[0]
						}
						return writeReportFile(reportFile, report)
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
					pterm.Error.Printf("Cannot open file/repository: '%s'\n\n", args[0])
					return err
				}

				if f.IsDir() {
					repo, err := absoluteRepoPath(p)
					if err != nil {
						pterm.Error.Println(err.Error())
						return err
					}
					p = args[1]
					f, err = os.Stat(filepath.Join(repo, p))
					if err != nil {
						pterm.Error.Printf("Cannot open file/repository: '%s'\n\n", args[1])
						return err
					}
					go listenForUpdates(updateChan, errorChan)

					report, _, er := RunGitHistoryMarkdownReport(args[0], args[1], baseCommitFlag, latestFlag, cdnFlag,
						updateChan, errorChan, baseFlag, remoteFlag, extRefs, globalRevisionsFlag, limitFlag, limitTimeFlag, breakingConfig)
					<-doneChan
					if er != nil {
						for x := range er {
							pterm.Error.Println(er[x].Error())
						}
						return er[0]
					}

					writeErr := writeReportFile(reportFile, report)

					return writeErr

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

					report, errs := RunLeftRightMarkDownReport(left, right, cdnFlag, updateChan, errorChan, baseFlag, remoteFlag, extRefs, breakingConfig)
					<-doneChan
					if len(errs) > 0 {
						for e := range errs {
							pterm.Error.Println(errs[e].Error())
						}
						return errors.New("unable to process specifications")
					}

					return writeReportFile(reportFile, report)
				}
			}
			pterm.Error.Println("wrong number of arguments, expecting two (2)")
			return nil
		},
	}
	cmd.Flags().BoolP("no-color", "n", false, "Disable color and style output (very useful for CI/CD)")
	cmd.Flags().BoolP("use-cdn", "c", false, "Use CDN for CSS and JS delivery instead of bundling inline")
	cmd.Flags().StringP("report-file", "", "report.md", "The name of the Markdown report file (defaults to 'report.md')")

	return cmd
}

func RunGitHistoryMarkdownReport(gitPath, filePath, baseCommit string, latest, useCDN bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool, globalRevisions bool, limit int, limitTime int,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]byte, []*model.Report, []error) {
	if gitPath == "" || filePath == "" {
		err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
		model.SendProgressError("reading paths",
			err.Error(), errorChan)
		close(progressChan)
		return nil, nil, []error{err}
	}

	// build commit history.
	commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath, baseCommit, progressChan, errorChan, globalRevisions, limit, limitTime)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot extract history %s", errors.Join(err...)), errorChan)
		close(progressChan)
		return nil, nil, err
	}

	// populate history with changes and data
	commitHistory, err = git.PopulateHistoryWithChanges(commitHistory, 0, limitTime, progressChan, errorChan, base, remote, extRefs, breakingConfig)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot extract history %s", errors.Join(err...)), errorChan)
		close(progressChan)
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

	generator := markdownReport.NewMarkdownReport(false, time.Now(), commitHistory)
	return generator.GenerateReport(), reports, nil
}

func RunGithubHistoryMarkdownReport(username, repo, filePath, baseCommit string, latest, useCDN, embeddedMode bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, limit int, limitTime int, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]byte, []*model.Report, []error) {

	commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, baseCommit, progressChan, errorChan, true, limit, limitTime, base, remote, extRefs, breakingConfig)
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
		return nil, nil, append(errs, fmt.Errorf("no reports extracted, no history found for file '%s'", filePath))
	}

	generator := markdownReport.NewMarkdownReport(false, time.Now(), commitHistory)

	close(progressChan)
	return generator.GenerateReport(), reports, errs
}

func RunLeftRightMarkDownReport(left, right string, useCDN bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]byte, []error) {

	var leftBytes, rightBytes []byte
	var errs []error
	var err error

	leftBytes, err = os.ReadFile(left)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot read original spec: %s", err.Error()), errorChan)
		close(progressChan)
		return nil, []error{err}
	}
	rightBytes, err = os.ReadFile(right)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot read modified spec: %s", err.Error()), errorChan)
		close(progressChan)
		return nil, []error{err}
	}

	commits := []*model.Commit{
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Original: %s. Modified: %s", left, right),
			CommitDate: time.Now(),
			Data:       rightBytes,
			FilePath:   right,
		}, {
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Original file: %s", left),
			CommitDate: time.Now(),
			Data:       leftBytes,
			FilePath:   left,
		},
	}

	commits, errs = git.BuildCommitChangelog(commits, progressChan, errorChan, base, remote, extRefs, breakingConfig)
	if len(errs) > 0 {
		close(progressChan)
		return nil, errs
	}
	generator := markdownReport.NewMarkdownReport(false, time.Now(), commits)

	close(progressChan)
	return generator.GenerateReport(), nil
}

func RunLeftRightMarkDownReportViaString(left, right string, useCDN, embedded bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]byte, []error) {

	var errs []error

	commits := []*model.Commit{
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Uploaded original (%d bytes)", len(left)),
			CommitDate: time.Now(),
			Data:       []byte(left),
		},
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Uploaded modification (%d bytes)", len(right)),
			CommitDate: time.Now(),
			Data:       []byte(right),
		},
	}

	commits, errs = git.BuildCommitChangelog(commits, progressChan, errorChan, base, remote, extRefs, breakingConfig)
	if len(errs) > 0 {
		close(progressChan)
		return nil, errs
	}
	generator := markdownReport.NewMarkdownReport(false, time.Now(), commits)

	close(progressChan)
	return generator.GenerateReport(), nil
}
