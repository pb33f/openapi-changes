// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "errors"
    "fmt"
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

            // check for two args (left and right)
            if len(args) < 2 {

                // check if arg is an url (like a github url)
                url, err := url.Parse(args[0])
                if err == nil {

                    if url.Host == "github.com" {

                        //report, er := runGitHistoryHTMLReport(args[0], args[1], latestFlag)
                        fmt.Sprint(url)
                        path := url.Path
                        dir, file := filepath.Split(path)
                        dirSegments := strings.Split(dir, "/")
                        user := dirSegments[1]
                        repo := dirSegments[2]
                        filePath := fmt.Sprintf("%s%s", strings.Join(dirSegments[5:], "/"), file)

                        report, er := runGithubHistoryHTMLReport(user, repo, filePath, false)
                        if err != nil {
                            return er[0]
                        }
                        err = os.WriteFile("github-report.html", report, 0664)
                        if err != nil {
                            pterm.Error.Println(err.Error())
                            return err
                        }
                        return nil

                    } else {

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

                    report, er := runGitHistoryHTMLReport(args[0], args[1], latestFlag)

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
                    return nil

                } else {

                    report, errs := runLeftRightHTMLReport(args[0], args[1])
                    if len(errs) > 0 {
                        for e := range errs {
                            pterm.Error.Println(errs[e].Error())
                        }
                        return errors.New("unable to process specifications")
                    }

                    err = os.WriteFile("report.html", report, 0664)
                    return nil
                }
            }
            pterm.Error.Println("too many arguments, expecting two (2)")
            return nil
        },
    }
    return cmd
}

func runGitHistoryHTMLReport(gitPath, filePath string, latest bool) ([]byte, []error) {
    if gitPath == "" || filePath == "" {
        err := errors.New("please supply a path to a git repo via -r, and a path to a file via -f")
        pterm.Error.Println(err.Error())
        return nil, []error{err}
    }

    // build commit history.
    commitHistory, err := git.ExtractHistoryFromFile(gitPath, filePath)
    if err != nil {
        return nil, err
    }

    // populate history with changes and data
    errs := git.PopulateHistoryWithChanges(commitHistory, nil)
    if errs != nil {
        return nil, errs
    }

    if latest {
        commitHistory = commitHistory[:1]
    }

    var reports []*Report
    for r := range commitHistory {
        if commitHistory[r].Changes != nil {
            reports = append(reports, createReport(commitHistory[r]))
        }
    }

    generator := html_report.NewHTMLReport(false, time.Now(), commitHistory)
    return generator.GenerateReport(false), nil
}

func runGithubHistoryHTMLReport(username, repo, filePath string, latest bool) ([]byte, []error) {
    if username == "" || repo == "" || filePath == "" {
        err := errors.New("please supply valid github username/repo and filepath")
        pterm.Error.Println(err.Error())
        return nil, []error{err}
    }

    githubCommits, err := git.GetCommitsForGithubFile(username, repo, filePath)

    if err != nil {
        return nil, []error{err}
    }

    commitHistory, errs := git.ConvertGithubCommitsIntoModel(githubCommits)
    if errs != nil {
        return nil, errs
    }

    if latest {
        commitHistory = commitHistory[:1]
    }

    var reports []*Report
    for r := range commitHistory {
        if commitHistory[r].Changes != nil {
            reports = append(reports, createReport(commitHistory[r]))
        }
    }

    generator := html_report.NewHTMLReport(false, time.Now(), commitHistory)
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

    errs = git.BuildCommitChangelog(commits)
    if len(errs) > 0 {
        return nil, errs
    }
    generator := html_report.NewHTMLReport(false, time.Now(), commits)
    return generator.GenerateReport(false), nil
}
