// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path"
	"strings"
	"time"

	"github.com/pb33f/doctor/changerator"
	drModel "github.com/pb33f/doctor/model"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

// changeratorResult holds the output of runChangerator.
// Caller must call Release() when done.
type changeratorResult struct {
	Changerator *changerator.Changerator
	DocChanges  *whatChangedModel.DocumentChanges
	RightDrDoc  *drModel.DrDocument
	LeftDrDoc   *drModel.DrDocument
}

func (r *changeratorResult) Release() {
	if r.RightDrDoc != nil {
		r.RightDrDoc.Release()
	}
	if r.LeftDrDoc != nil {
		r.LeftDrDoc.Release()
	}
}

// runChangerator builds DrDocuments, runs the changerator, and returns the results.
// Returns (nil, nil) if Documents are nil or no changes found.
// Returns (nil, err) if model building fails.
// Returns (result, nil) on success — caller must call result.Release().
// Not safe for concurrent use due to global ApplyBreakingRulesConfig/ResetBreakingRulesConfig state.
func runChangerator(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (*changeratorResult, error) {
	if commit.Document == nil || commit.OldDocument == nil {
		return nil, nil
	}

	rightModel, err := commit.Document.BuildV3Model()
	if err != nil {
		return nil, fmt.Errorf("building right model: %w", err)
	}
	leftModel, err := commit.OldDocument.BuildV3Model()
	if err != nil {
		return nil, fmt.Errorf("building left model: %w", err)
	}

	rightDrDoc := drModel.NewDrDocumentAndGraph(rightModel)
	leftDrDoc := drModel.NewDrDocumentAndGraph(leftModel)

	if rightDrDoc == nil || leftDrDoc == nil {
		if rightDrDoc != nil {
			rightDrDoc.Release()
		}
		if leftDrDoc != nil {
			leftDrDoc.Release()
		}
		return nil, fmt.Errorf("failed to create DrDocument models")
	}

	if breakingConfig != nil {
		ApplyBreakingRulesConfig(breakingConfig)
	}

	ctr := changerator.NewChangerator(&changerator.ChangeratorConfig{
		LeftDrDoc:       leftDrDoc.V3Document,
		RightDrDoc:      rightDrDoc.V3Document,
		Doctor:          rightDrDoc,
		RightDocContent: commit.Data,
	})

	docChanges := ctr.Changerate()

	if breakingConfig != nil {
		ResetBreakingRulesConfig()
	}

	if docChanges == nil {
		rightDrDoc.Release()
		leftDrDoc.Release()
		return nil, nil
	}

	return &changeratorResult{
		Changerator: ctr,
		DocChanges:  docChanges,
		RightDrDoc:  rightDrDoc,
		LeftDrDoc:   leftDrDoc,
	}, nil
}

// changerateCommit runs the doctor changerator on a single commit to populate
// commit.Changes. Returns true if changes were found.
func changerateCommit(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (bool, error) {
	result, err := runChangerator(commit, breakingConfig)
	if err != nil {
		return false, fmt.Errorf("commit %s: %w", commit.Hash, err)
	}
	if result == nil {
		return false, nil
	}
	defer result.Release()
	commit.Changes = result.DocChanges
	return true, nil
}

func changerateAndFlatten(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.FlatReport, error) {
	reports := make([]*model.FlatReport, 0, len(commits))
	var errs []error
	for _, commit := range commits {
		hasChanges, err := changerateCommit(commit, breakingConfig)
		if err != nil {
			errs = append(errs, err)
			continue
		}
		if hasChanges {
			reports = append(reports, FlattenReport(createReport(commit)))
		}
	}
	if len(errs) > 0 {
		return nil, errors.Join(errs...)
	}
	return reports, nil
}

func runNewLeftRightReport(left, right string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatReport, error) {
	commits, err := loadLeftRightCommits(left, right, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	if len(commits) == 0 {
		return nil, nil
	}
	hasChanges, err := changerateCommit(commits[0], breakingConfig)
	if err != nil {
		return nil, err
	}
	if !hasChanges {
		return nil, nil
	}
	return FlattenReport(createReport(commits[0])), nil
}

func runNewGitHistoryReport(gitPath, filePath string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatHistoricalReport, error) {
	commits, err := loadGitHistoryCommits(gitPath, filePath, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	if commits == nil {
		return nil, nil
	}
	reports, err := changerateAndFlatten(commits, breakingConfig)
	if err != nil {
		return nil, err
	}

	return &model.FlatHistoricalReport{
		GitRepoPath:   gitPath,
		GitFilePath:   filePath,
		Filename:      path.Base(filePath),
		DateGenerated: time.Now().Format(time.RFC3339),
		Reports:       reports,
	}, nil
}

func runNewGithubHistoryReport(rawURL string, opts newSummaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatHistoricalReport, error) {
	specURL, err := url.Parse(rawURL)
	if err != nil {
		return nil, fmt.Errorf("invalid URL: %w", err)
	}
	user, repo, filePath, err := ExtractGithubDetailsFromURL(specURL)
	if err != nil {
		return nil, fmt.Errorf("error extracting github details: %w", err)
	}

	commits, err := loadGitHubCommits(rawURL, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	reports, err := changerateAndFlatten(commits, breakingConfig)
	if err != nil {
		return nil, err
	}

	return &model.FlatHistoricalReport{
		GitRepoPath:   fmt.Sprintf("%s/%s", user, repo),
		GitFilePath:   filePath,
		Filename:      path.Base(filePath),
		DateGenerated: time.Now().Format(time.RFC3339),
		Reports:       reports,
	}, nil
}

func printReportJSON(v any) error {
	jsonBytes, err := json.MarshalIndent(v, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal report: %w", err)
	}
	fmt.Println(string(jsonBytes))
	return nil
}

func GetNewReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "new-report",
		Short:        "Generate a machine readable report (new engine)",
		Long:         "Generate a JSON report for what has changed using the doctor changerator engine.",
		Example:      "openapi-changes new-report /path/to/git/repo path/to/file/in/repo/openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, configFlag := readCommonFlags(cmd)

			if len(args) == 0 {
				noBanner, _ := cmd.Flags().GetBool("no-logo")
				if !noBanner {
					PrintNewBanner(false)
				}
				printNewCommandUsage("new-report",
					"The new-report command generates a machine-readable JSON report of all API changes\nusing the doctor changerator engine.",
					false)
				return nil
			}

			if len(args) > 2 {
				return fmt.Errorf("too many arguments provided, expecting at most two (2)")
			}

			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				PrintNewConfigError(err)
				return err
			}

			if len(args) == 1 {
				if !validateGitHubURL(args[0]) {
					return nil
				}

				flat, reportErr := runNewGithubHistoryReport(args[0], opts, breakingConfig)
				if reportErr != nil {
					return reportErr
				}
				return printReportJSON(flat)
			}

			firstURL, _ := url.Parse(args[0])
			if firstURL == nil || !strings.HasPrefix(firstURL.Scheme, "http") {
				f, statErr := os.Stat(args[0])
				if statErr == nil && f.IsDir() {
					flat, reportErr := runNewGitHistoryReport(args[0], args[1], opts, breakingConfig)
					if reportErr != nil {
						return reportErr
					}
					if flat == nil {
						fmt.Println(`{"message": "No changes found between specifications"}`)
						return nil
					}
					return printReportJSON(flat)
				}
			}

			flat, reportErr := runNewLeftRightReport(args[0], args[1], opts, breakingConfig)
			if reportErr != nil {
				return reportErr
			}
			if flat == nil {
				fmt.Println(`{"message": "No changes found between specifications"}`)
				return nil
			}
			return printReportJSON(flat)
		},
	}
	return cmd
}
