// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/pb33f/libopenapi/index"
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
		SilenceUsage: false,
		Use:          "html-report",
		Short:        "Generate the sexiest, most interactive diffing experience you have ever seen.",
		Long: "Generate a ready to go, super sexy, and highly interactive HTML report that " +
			"you can explore and review in your browser",
		Example: "openapi-changes html-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {

			updateChan := make(chan *model.ProgressUpdate)
			errorChan := make(chan model.ProgressError)
			doneChan := make(chan bool)
			failed := false
			baseFlag, _ := cmd.Flags().GetString("base")
			noColorFlag, _ := cmd.Flags().GetBool("no-color")
			cdnFlag, _ := cmd.Flags().GetBool("use-cdn")
			latestFlag, _ := cmd.Flags().GetBool("top")
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

			// if there are no args, print out how to use the console.
			if len(args) == 0 {
				PrintHowToUse("html-report")
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
						report, _, er := RunGithubHistoryHTMLReport(user, repo, filePath, latestFlag, cdnFlag,
							false, updateChan, errorChan, limitFlag, baseFlag, remoteFlag)

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
							pterm.Success.Printf("%s report written to file 'report.html' (%s)", specUrl.String(),
								index.HumanFileSize(float64(len(report))))
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
					repo := p
					p = args[1]
					f, err = os.Stat(filepath.Join(repo, p))
					if err != nil {
						pterm.Error.Printf("Cannot open file/repository: '%s'\n\n", args[1])
						return err
					}
					go listenForUpdates(updateChan, errorChan)

					report, _, er := RunGitHistoryHTMLReport(args[0], args[1], latestFlag, cdnFlag,
						updateChan, errorChan, baseFlag, remoteFlag, limitFlag)
					<-doneChan
					if er != nil {
						for x := range er {
							pterm.Error.Println(er[x].Error())
						}
						return er[0]
					}

					err = os.WriteFile("report.html", report, 0744)
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

					report, errs := RunLeftRightHTMLReport(left, right, cdnFlag, updateChan, errorChan, baseFlag, remoteFlag)
					<-doneChan
					if len(errs) > 0 {
						for e := range errs {
							pterm.Error.Println(errs[e].Error())
						}
						return errors.New("unable to process specifications")
					}

					err = os.WriteFile("report.html", report, 0744)
					pterm.Success.Printf("report written to file 'report.html' (%dkb)", len(report)/1024)
					pterm.Println()
					pterm.Println()
					return nil
				}
			}
			pterm.Error.Println("wrong number of arguments, expecting two (2)")
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
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool, limit int) ([]byte, []*model.Report, []error) {
	if gitPath == "" || filePath == "" {
		err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
		model.SendProgressError("reading paths",
			err.Error(), errorChan)
		close(progressChan)
		return nil, nil, []error{err}
	}

	// build commit history.
	commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath, progressChan, errorChan, limit)
	if err != nil {
		model.SendFatalError("extraction",
			fmt.Sprintf("cannot extract history %s", errors.Join(err...)), errorChan)
		close(progressChan)
		return nil, nil, err
	}

	// populate history with changes and data
	commitHistory, err = git.PopulateHistoryWithChanges(commitHistory, 0, progressChan, errorChan, base, remote)
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

	generator := htmlReport.NewHTMLReport(false, time.Now(), commitHistory)
	return generator.GenerateReport(false, useCDN, false), reports, nil
}

func RunGithubHistoryHTMLReport(username, repo, filePath string, latest, useCDN, embeddedMode bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, limit int, base string, remote bool) ([]byte, []*model.Report, []error) {

	commitHistory, errs := git.ProcessGithubRepo(username, repo, filePath, progressChan, errorChan, true, limit, base, remote)
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

	generator := htmlReport.NewHTMLReport(false, time.Now(), commitHistory)

	close(progressChan)
	return generator.GenerateReport(false, useCDN, embeddedMode), reports, errs
}

func RunLeftRightHTMLReport(left, right string, useCDN bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) ([]byte, []error) {

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

	commits, errs = git.BuildCommitChangelog(commits, progressChan, errorChan, base, remote)
	if len(errs) > 0 {
		close(progressChan)
		return nil, errs
	}
	generator := htmlReport.NewHTMLReport(false, time.Now(), commits)

	close(progressChan)
	return generator.GenerateReport(false, useCDN, false), nil
	//return generator.GenerateReport(true, false, false), nil
}

func RunLeftRightHTMLReportViaString(left, right string, useCDN, embedded bool,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) ([]byte, []error) {

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

	commits, errs = git.BuildCommitChangelog(commits, progressChan, errorChan, base, remote)
	if len(errs) > 0 {
		close(progressChan)
		return nil, errs
	}
	generator := htmlReport.NewHTMLReport(false, time.Now(), commits)

	close(progressChan)
	return generator.GenerateReport(false, useCDN, embedded), nil
}
