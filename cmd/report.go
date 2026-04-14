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
		return nil, wrapCommitError(commit, err)
	}
	if result == nil {
		return nil, nil
	}
	commit.Changes = result.DocChanges
	return result, nil
}

type historicalFlattenResult struct {
	Reports        []*model.FlatReport
	SkippedCommits []string
}

func changerateAndFlattenHistory(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (*historicalFlattenResult, error) {
	reports := make([]*model.FlatReport, 0, len(commits))
	var renderErrors []error
	var skippedCommits []string
	skippedSeen := make(map[string]struct{})
	processedComparables := 0

	for _, commit := range commits {
		if commit == nil {
			continue
		}
		comparable := commit.Document != nil && commit.OldDocument != nil
		result, err := runChangerator(commit, breakingConfig)
		if err != nil {
			emitCommitWarning(commit, err)
			renderErrors = append(renderErrors, wrapCommitError(commit, err))
			addSkippedCommitHash(&skippedCommits, skippedSeen, commit.Hash)
			continue
		}
		if comparable {
			processedComparables++
		}
		if result == nil {
			continue
		}
		commit.Changes = result.DocChanges
		reports = append(reports, FlattenReportWithParameterNames(createReport(commit), result.Changerator.ParameterNames))
		result.Release()
	}
	if len(renderErrors) > 0 {
		if len(reports) == 0 && processedComparables == 0 {
			return nil, fmt.Errorf("all %d commits failed to render report data: %w", len(renderErrors), errors.Join(renderErrors...))
		}
		fmt.Fprintf(os.Stderr, "warning: %d commits failed to render report data\n", len(renderErrors))
	}
	return &historicalFlattenResult{
		Reports:        reports,
		SkippedCommits: skippedCommits,
	}, nil
}

func runLeftRightReport(left, right string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatReport, error) {
	commit, err := buildLeftRightCommitAndSources(left, right, opts)
	if err != nil {
		return nil, err
	}
	result, err := changerateCommit(commit, breakingConfig)
	if err != nil {
		return nil, err
	}
	if result == nil {
		return nil, nil
	}
	defer result.Release()
	flat := FlattenReportWithParameterNames(createReport(commit), result.Changerator.ParameterNames)
	flat.Commit = nil
	flat.OriginalPath = sourceLabelForReport(left)
	flat.ModifiedPath = sourceLabelForReport(right)
	return flat, nil
}

func runGitHistoryReport(gitPath, filePath string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) (*model.FlatHistoricalReport, error) {
	loaded, err := loadGitHistoryCommitsDetailed(gitPath, filePath, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	if loaded == nil {
		return nil, nil
	}
	if len(loaded.Commits) == 0 && len(loaded.SkippedCommits) == 0 {
		return nil, nil
	}
	history, err := changerateAndFlattenHistory(loaded.Commits, breakingConfig)
	if err != nil {
		return nil, err
	}
	skippedCommits := mergeSkippedCommitHashes(loaded.SkippedCommits, history.SkippedCommits)
	if len(history.Reports) == 0 && len(skippedCommits) > 0 {
		return nil, fmt.Errorf("all %d candidate commits were skipped or failed to render", len(skippedCommits))
	}

	report := &model.FlatHistoricalReport{
		GitRepoPath:   gitPath,
		GitFilePath:   filePath,
		Filename:      path.Base(filePath),
		DateGenerated: time.Now().Format(time.RFC3339),
		Reports:       history.Reports,
	}
	if len(skippedCommits) > 0 {
		report.MetaData = &model.HistoricalReportMetaData{
			Partial:        true,
			SkippedCommits: skippedCommits,
		}
	}
	return report, nil
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

	loaded, err := loadGitHubCommitsDetailed(rawURL, opts, breakingConfig)
	if err != nil {
		return nil, err
	}
	if loaded == nil {
		return nil, nil
	}
	if len(loaded.Commits) == 0 && len(loaded.SkippedCommits) == 0 {
		return nil, nil
	}
	history, err := changerateAndFlattenHistory(loaded.Commits, breakingConfig)
	if err != nil {
		return nil, err
	}
	skippedCommits := mergeSkippedCommitHashes(loaded.SkippedCommits, history.SkippedCommits)
	if len(history.Reports) == 0 && len(skippedCommits) > 0 {
		return nil, fmt.Errorf("all %d candidate commits were skipped or failed to render", len(skippedCommits))
	}

	report := &model.FlatHistoricalReport{
		GitRepoPath:   fmt.Sprintf("%s/%s", user, repo),
		GitFilePath:   filePath,
		Filename:      path.Base(filePath),
		DateGenerated: time.Now().Format(time.RFC3339),
		Reports:       history.Reports,
	}
	if len(skippedCommits) > 0 {
		report.MetaData = &model.HistoricalReportMetaData{
			Partial:        true,
			SkippedCommits: skippedCommits,
		}
	}
	return report, nil
}

func addSkippedCommitHash(skippedCommits *[]string, seen map[string]struct{}, hash string) {
	if hash == "" {
		return
	}
	if _, ok := seen[hash]; ok {
		return
	}
	seen[hash] = struct{}{}
	*skippedCommits = append(*skippedCommits, hash)
}

func mergeSkippedCommitHashes(groups ...[]string) []string {
	var merged []string
	seen := make(map[string]struct{})
	for _, group := range groups {
		for _, hash := range group {
			addSkippedCommitHash(&merged, seen, hash)
		}
	}
	return merged
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
			reproducible, err := cmd.Flags().GetBool("reproducible")
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
				if reproducible {
					makeReportOutputReproducible(flat)
				}
				return printReportJSON(flat)
			}

			if !isHTTPURL(args[0]) {
				if _, _, ok := parseGitRef(args[0]); ok {
					return printReportJSONOrNoChanges(args, opts, breakingConfig, reproducible)
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
					if reproducible {
						makeReportOutputReproducible(flat)
					}
					return printReportJSON(flat)
				}
				if _, _, ok := parseGitRef(args[1]); ok {
					return printReportJSONOrNoChanges(args, opts, breakingConfig, reproducible)
				}
			}

			return printReportJSONOrNoChanges(args, opts, breakingConfig, reproducible)
		},
	}
	addTerminalThemeFlags(cmd)
	cmd.Flags().Bool("reproducible", false, "Omit generated timestamps from report JSON")
	return cmd
}

func printReportJSONOrNoChanges(args []string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig, reproducible bool) error {
	flat, reportErr := runLeftRightReport(args[0], args[1], opts, breakingConfig)
	if reportErr != nil {
		return reportErr
	}
	if flat == nil {
		printNoChangesJSON()
		return nil
	}
	if reproducible {
		makeReportOutputReproducible(flat)
	}
	return printReportJSON(flat)
}

func makeReportOutputReproducible(report any) {
	switch typed := report.(type) {
	case *model.FlatReport:
		if typed != nil {
			makeFlatReportReproducible(typed)
		}
	case *model.FlatHistoricalReport:
		if typed == nil {
			return
		}
		typed.DateGenerated = ""
		for _, item := range typed.Reports {
			makeFlatReportReproducible(item)
		}
	}
}

func makeFlatReportReproducible(report *model.FlatReport) {
	if report == nil {
		return
	}
	report.DateGenerated = ""
}
