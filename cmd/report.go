// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os"
	"path"
	"time"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

// changerateCommit runs the doctor changerator on a single commit to populate
// commit.Changes and returns the comparison bundle for downstream rendering.
func changerateCommit(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (*changeratorResult, error) {
	result, err := runChangerator(commit, breakingConfig)
	if err != nil {
		return nil, fmt.Errorf("commit %s: %w", commit.Hash, err)
	}
	if result == nil {
		return nil, nil
	}
	commit.Changes = result.DocChanges
	return result, nil
}

func changerateAndFlatten(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.FlatReport, error) {
	reports := make([]*model.FlatReport, 0, len(commits))
	var errs []error
	for _, commit := range commits {
		result, err := changerateCommit(commit, breakingConfig)
		if err != nil {
			errs = append(errs, err)
			continue
		}
		if result == nil {
			continue
		}
		reports = append(reports, FlattenReportWithParameterNames(createReport(commit), result.Changerator.ParameterNames))
		result.Release()
	}
	if len(errs) > 0 {
		return nil, errors.Join(errs...)
	}
	return reports, nil
}

func runLeftRightReport(left, right string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatReport, error) {
	commits, err := loadLeftRightCommits(left, right, opts)
	if err != nil {
		return nil, err
	}
	if len(commits) == 0 {
		return nil, nil
	}
	result, err := changerateCommit(commits[0], breakingConfig)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, nil
	}
	defer result.Release()
	flat := FlattenReportWithParameterNames(createReport(commits[0]), result.Changerator.ParameterNames)
	flat.Commit = nil
	return flat, nil
}

func runGitHistoryReport(gitPath, filePath string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatHistoricalReport, error) {
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

func runGithubHistoryReport(rawURL string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatHistoricalReport, error) {
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

func GetReportCommand() *cobra.Command {
	cmd := &cobra.Command{
		SilenceUsage: true,
		Use:          "report",
		Short:        "Generate a machine readable report",
		Long:         "Generate a JSON report for what has changed between commits/specs",
		Example:      "openapi-changes report HEAD~1:openapi.yaml ./openapi.yaml",
		RunE: func(cmd *cobra.Command, args []string) error {
			opts, configFlag, err := readCommonFlags(cmd)
			if err != nil {
				return err
			}

			if len(args) == 0 {
				maybePrintBanner(cmd, opts.palette)
				printCommandUsage("report",
					"The report command generates a machine-readable JSON report of all API changes\nusing the doctor changerator engine.",
					opts.palette)
				return nil
			}

			if len(args) > 2 {
				return fmt.Errorf("too many arguments provided, expecting at most two (2)")
			}

			breakingConfig, err := LoadBreakingRulesConfig(configFlag)
			if err != nil {
				PrintConfigError(err, opts.palette)
				return err
			}

			if len(args) == 1 {
				if err := validateGitHubURL(args[0]); err != nil {
					return err
				}

				flat, reportErr := runGithubHistoryReport(args[0], opts, breakingConfig)
				if reportErr != nil {
					return reportErr
				}
				return printReportJSON(flat)
			}

			if !isHTTPURL(args[0]) {
				if _, _, ok := parseGitRef(args[0]); ok {
					return printReportJSONOrNoChanges(args, opts, breakingConfig)
				}
				if _, _, ok := parseGitRef(args[1]); ok {
					return printReportJSONOrNoChanges(args, opts, breakingConfig)
				}
				f, statErr := os.Stat(args[0])
				if statErr == nil && f.IsDir() {
					flat, reportErr := runGitHistoryReport(args[0], args[1], opts, breakingConfig)
					if reportErr != nil {
						return reportErr
					}
					if flat == nil {
						printNoChangesJSON()
						return nil
					}
					return printReportJSON(flat)
				}
			}

			return printReportJSONOrNoChanges(args, opts, breakingConfig)
		},
	}
	addTerminalThemeFlags(cmd)
	return cmd
}

func printReportJSONOrNoChanges(args []string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) error {
	flat, reportErr := runLeftRightReport(args[0], args[1], opts, breakingConfig)
	if reportErr != nil {
		return reportErr
	}
	if flat == nil {
		printNoChangesJSON()
		return nil
	}
	return printReportJSON(flat)
}
