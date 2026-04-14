// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	doctorgithub "github.com/pb33f/doctor/github"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

const GithubToken = "GH_TOKEN"

type githubHistoryService interface {
	CreateSessionWithOptionalToken(token string, config *doctorgithub.SessionConfig) *doctorgithub.GitHubSession
	GetFileHistory(ctx context.Context, session *doctorgithub.GitHubSession, owner, repo, path string, options *doctorgithub.FileHistoryOptions) ([]*doctorgithub.FileRevision, error)
}

var newGitHubService = func() githubHistoryService {
	return doctorgithub.NewGitHubService()
}

func convertGitHubRevisionsIntoModel(revisions []*doctorgithub.FileRevision, filePath string,
	progressChan chan *model.ProgressUpdate, progressErrorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	result, errs := convertGitHubRevisionsIntoModelDetailed(revisions, filePath, progressChan, progressErrorChan, opts, breakingConfig)
	if result == nil {
		return nil, errs
	}
	return result.Commits, errs
}

func convertGitHubRevisionsIntoModelDetailed(revisions []*doctorgithub.FileRevision, filePath string,
	progressChan chan *model.ProgressUpdate, progressErrorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) (*HistoryBuildResult, []error) {
	normalized := make([]*model.Commit, 0, len(revisions))
	var skippedCommits []string
	skippedSeen := make(map[string]struct{})

	if len(revisions) > 0 {
		model.SendProgressUpdate("converting commits",
			fmt.Sprintf("converting %d github commits into data model", len(revisions)), false, progressChan)
	}

	for _, revision := range revisions {
		if len(revision.FileBytes) == 0 {
			model.SendProgressWarning("converting commits",
				fmt.Sprintf("Skipping commit %s because GitHub returned empty file contents", revision.Commit.SHA), progressChan)
			if _, ok := skippedSeen[revision.Commit.SHA]; !ok {
				skippedSeen[revision.Commit.SHA] = struct{}{}
				skippedCommits = append(skippedCommits, revision.Commit.SHA)
			}
			continue
		}
		commit := &model.Commit{
			Hash:        revision.Commit.SHA,
			Message:     revision.Commit.Message,
			Author:      revision.Commit.Author.Name,
			AuthorEmail: revision.Commit.Author.Email,
			CommitDate:  revision.Commit.Author.Date,
			Data:        revision.FileBytes,
			FilePath:    filePath,
		}
		model.SendProgressUpdate("converting commits",
			fmt.Sprintf("Converted commit %s into data model", commit.Hash), false, progressChan)
		normalized = append(normalized, commit)
	}

	var errs []error
	if len(normalized) > 0 {
		model.SendProgressUpdate("converting commits", "building data models...", false, progressChan)
	}

	result, errs := buildCommitChangelogDetailed(normalized, progressChan, progressErrorChan, opts, breakingConfig)
	if result == nil {
		return nil, errs
	}
	for _, hash := range result.SkippedCommits {
		if _, ok := skippedSeen[hash]; ok {
			continue
		}
		skippedSeen[hash] = struct{}{}
		skippedCommits = append(skippedCommits, hash)
	}

	if len(errs) > 0 {
		model.SendProgressError("converting commits",
			fmt.Sprintf("%d errors detected when normalizing", len(errs)), progressErrorChan)
	} else {
		if len(result.Commits) > 0 {
			model.SendProgressUpdate("converting commits",
				fmt.Sprintf("Success: %d commits normalized", len(result.Commits)), true, progressChan)
		} else {
			model.SendFatalError("converting commits", "no commits were normalized, please check the URL/Path", progressErrorChan)
		}
	}
	return &HistoryBuildResult{
		Commits:        result.Commits,
		SkippedCommits: skippedCommits,
	}, errs
}

// ProcessGithubRepo fetches file history from GitHub and builds the commit
// changelog. Set opts.KeepComparable to preserve revisions even when the
// legacy libopenapi diff is empty.
func ProcessGithubRepoDetailed(username, repo, filePath string,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) (*HistoryBuildResult, []error) {
	if username == "" || repo == "" || filePath == "" {
		err := errors.New("please supply valid github username/repo and filepath")
		model.SendProgressError("git", err.Error(), errorChan)
		return nil, []error{err}
	}

	svc := newGitHubService()
	config := doctorgithub.DefaultSessionConfig()
	config.Timeout = 60 * time.Second

	session := svc.CreateSessionWithOptionalToken(os.Getenv(GithubToken), config)
	if session == nil {
		err := errors.New("failed to create GitHub session")
		model.SendProgressError("git", err.Error(), errorChan)
		return nil, []error{err}
	}
	defer session.Close()

	var limitDays *int
	if opts.LimitTime != -1 {
		limitDays = &opts.LimitTime
	}

	model.SendProgressUpdate("git",
		fmt.Sprintf("fetching history for %s/%s:%s", username, repo, filePath), false, progressChan)

	revisions, err := svc.GetFileHistory(context.Background(), session, username, repo, filePath, &doctorgithub.FileHistoryOptions{
		BaseCommit:  opts.BaseCommit,
		Limit:       opts.Limit,
		LimitDays:   limitDays,
		ForceCutoff: opts.ForceCutoff,
	})
	if err != nil {
		model.SendProgressError("git", err.Error(), errorChan)
		return nil, []error{err}
	}

	model.SendProgressUpdate("git",
		fmt.Sprintf("fetched %d github revisions", len(revisions)), true, progressChan)

	commitHistory, errs := convertGitHubRevisionsIntoModelDetailed(revisions, filePath, progressChan, errorChan, opts, breakingConfig)
	if errs != nil {
		for _, err := range errs {
			model.SendProgressError("git", err.Error(), errorChan)
		}
		return commitHistory, errs
	}
	return commitHistory, nil
}

func ProcessGithubRepo(username, repo, filePath string,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	result, errs := ProcessGithubRepoDetailed(username, repo, filePath, progressChan, errorChan, opts, breakingConfig)
	if result == nil {
		return nil, errs
	}
	return result.Commits, errs
}
