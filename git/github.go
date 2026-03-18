// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"sync/atomic"
	"time"

	goGithub "github.com/google/go-github/v72/github"
	"github.com/pb33f/doctor/github"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

const GithubToken = "GH_TOKEN"

const (
	maxConcurrentWorkers = 10
	// sizeThresholdKB is the cumulative file size limit (in KB) before truncating results.
	// The * 2 factor in the original code accounted for the fact that each commit's file
	// content is held in memory twice during diff processing (current + previous).
	sizeThresholdKB = 50000
	// maxDownloadSize caps the large-file download fallback to prevent unbounded memory usage.
	maxDownloadSize = 100 * 1024 * 1024 // 100MB
)

// githubAPI is the narrow interface we need from doctor's GitHubService.
// Defined locally for testability — avoids mocking the entire GitHubService.
type githubAPI interface {
	GetCommitList(ctx context.Context, session *github.GitHubSession, owner, repo, path string, options *github.CommitListOptions) ([]github.Commit, error)
	GetCommit(ctx context.Context, session *github.GitHubSession, owner, repo, sha string) (*github.Commit, error)
	GetFileContent(ctx context.Context, session *github.GitHubSession, owner, repo, path, ref string) (*github.FileContent, error)
}

// fetchedCommit pairs a doctor Commit with the raw file bytes for the target path.
type fetchedCommit struct {
	Commit    github.Commit
	FileBytes []byte
}

type commitResult struct {
	index  int
	commit *fetchedCommit
	err    error
}

func createGitHubSession() (*github.GitHubSession, githubAPI, error) {
	token := os.Getenv(GithubToken)
	github.SetGlobalLogger(github.NewProductionLogger(github.LogLevelError))
	svc := github.NewGitHubService()
	config := github.DefaultSessionConfig()
	config.Timeout = 60 * time.Second

	if token == "" {
		// Preserve public GitHub access when no token is configured by creating
		// an active doctor session and swapping in an anonymous go-github client.
		session := github.NewGitHubSession("anonymous-access-1234", config)
		if session == nil {
			return nil, nil, fmt.Errorf("failed to create anonymous GitHub session")
		}

		httpClient := config.CustomHTTPClient
		if httpClient == nil {
			httpClient = &http.Client{Timeout: config.Timeout}
		}
		session.Token = ""
		session.Client = goGithub.NewClient(httpClient)
		return session, svc, nil
	}

	session := svc.CreateSession(token, config)
	if session == nil {
		return nil, nil, fmt.Errorf("failed to create GitHub session — check that GH_TOKEN is a valid GitHub token (PAT or fine-grained)")
	}
	return session, svc, nil
}

// getFileBytes retrieves the raw content of a file at a specific commit SHA.
func getFileBytes(ctx context.Context, svc githubAPI, session *github.GitHubSession,
	owner, repo, path, sha string) ([]byte, error) {
	fc, err := svc.GetFileContent(ctx, session, owner, repo, path, sha)
	if err != nil {
		return nil, err
	}
	if fc.Content != "" {
		// GitHub base64 includes newlines — strip them before decoding
		clean := strings.ReplaceAll(fc.Content, "\n", "")
		return base64.StdEncoding.DecodeString(clean)
	}
	// Large files (>1MB): Content is empty, only DownloadURL available.
	// This fallback bypasses doctor's retry/rate-limit path — acceptable since
	// OpenAPI specs >1MB are extremely rare.
	if fc.DownloadURL != "" {
		req, err := http.NewRequestWithContext(ctx, http.MethodGet, fc.DownloadURL, nil)
		if err != nil {
			return nil, fmt.Errorf("creating download request for %s: %w", fc.DownloadURL, err)
		}
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			return nil, fmt.Errorf("downloading file from %s: %w", fc.DownloadURL, err)
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			return nil, fmt.Errorf("downloading file from %s: HTTP %d", fc.DownloadURL, resp.StatusCode)
		}
		return io.ReadAll(io.LimitReader(resp.Body, maxDownloadSize))
	}
	return nil, fmt.Errorf("no content available for %s at %s", path, sha)
}

// isNotFoundError uses string matching because doctor wraps go-github errors
// without exposing a typed error. This works reliably because go-github formats
// errors as "GET ...: 404 Not Found [...]". TODO: add IsNotFound(error) bool
// to the doctor module for proper typed error checking.
func isNotFoundError(err error) bool {
	if err == nil {
		return false
	}
	errStr := err.Error()
	return strings.Contains(errStr, "404") || strings.Contains(errStr, "Not Found")
}

func GetCommitsForGithubFile(user, repo, path string, baseCommit string,
	progressChan chan *model.ProgressUpdate, progressErrorChan chan model.ProgressError,
	forceCutoff bool, limit int, limitTime int,
	session *github.GitHubSession, svc githubAPI) ([]*fetchedCommit, error) {

	ctx := context.Background()

	// Default to a generous cap so baseCommit/limitTime filters (applied post-fetch)
	// have enough history to work with, while still protecting against unbounded
	// fetches on repos with very long commit histories.
	maxResults := 1000
	if limit > 0 {
		maxResults = limit + 1
	}

	opts := &github.CommitListOptions{
		MaxResults: maxResults,
	}

	commits, err := svc.GetCommitList(ctx, session, user, repo, path, opts)
	if err != nil {
		errMsg := fmt.Sprintf("failed to list commits: %s", err.Error())
		model.SendProgressError("read commit history", errMsg, progressErrorChan)
		return nil, errors.New(errMsg)
	}

	if len(commits) == 0 {
		return nil, nil
	}

	totalCommits := len(commits)

	if limitTime != -1 {
		newLimit := getCommitTimeLimit(limitTime, commits)
		if newLimit == 0 {
			return []*fetchedCommit{}, nil
		}
		limit = newLimit
	}

	// Process limit+1 commits: the extra commit provides the "before" state
	// for diffing the oldest commit in the requested range.
	if limit > 0 && totalCommits > limit {
		totalCommits = limit + 1
	}

	// Apply baseCommit cutoff — determine the actual set of commits to process.
	processCommits := commits[:totalCommits]
	if baseCommit != "" {
		for i, c := range processCommits {
			if c.SHA == baseCommit || strings.HasPrefix(c.SHA, baseCommit) {
				processCommits = processCommits[:i+1]
				break
			}
		}
	}
	totalCommits = len(processCommits)

	results := make([]*fetchedCommit, totalCommits)
	resultChan := make(chan commitResult, totalCommits)
	sem := make(chan struct{}, maxConcurrentWorkers)

	var kbSize atomic.Int64
	var cutoffIndex atomic.Int64

	for i, commit := range processCommits {
		model.SendProgressUpdate(fmt.Sprintf("commit: %s", commit.SHA),
			fmt.Sprintf("commit %s being fetched", commit.SHA[:min(6, len(commit.SHA))]), false, progressChan)

		sem <- struct{}{}
		go func(idx int, c github.Commit) {
			defer func() { <-sem }()

			// Get commit details (includes file list)
			detail, err := svc.GetCommit(ctx, session, user, repo, c.SHA)
			if err != nil {
				resultChan <- commitResult{index: idx, err: fmt.Errorf("fetching commit %s: %w", c.SHA, err)}
				return
			}

			model.SendProgressUpdate(c.SHA,
				fmt.Sprintf("Commit %s contains %d files, scanning for matching path",
					c.SHA, len(detail.Files)), false, progressChan)

			// Find the matching file by repo-relative path.
			var fileBytes []byte
			for _, file := range detail.Files {
				if file.Filename == path {
					fileBytes, err = getFileBytes(ctx, svc, session, user, repo, path, c.SHA)
					if err != nil {
						if isNotFoundError(err) {
							// File doesn't exist at this ref (deleted/renamed) — skip.
							model.SendProgressUpdate(c.SHA,
								fmt.Sprintf("file %s not found at commit %s, skipping", path, c.SHA), false, progressChan)
							resultChan <- commitResult{index: idx, commit: nil}
							return
						}
						resultChan <- commitResult{index: idx, err: fmt.Errorf("reading file at commit %s: %w", c.SHA, err)}
						return
					}

					// Track cumulative size for cutoff. The * 2 accounts for each
					// commit's data being held in memory alongside its predecessor
					// during diff processing in BuildCommitChangelog.
					fileSizeKB := int64(len(fileBytes) / 1024 * 2)
					newSize := kbSize.Add(fileSizeKB)
					if newSize > sizeThresholdKB {
						cutoffIndex.CompareAndSwap(0, int64(idx))
					}

					model.SendProgressUpdate(c.SHA,
						fmt.Sprintf("%dkb read for file %s", len(fileBytes)/1024, path), false, progressChan)
					break
				}
			}

			fc := &fetchedCommit{
				Commit:    *detail,
				FileBytes: fileBytes,
			}

			model.SendProgressUpdate(c.SHA,
				fmt.Sprintf("commit %s processed", c.SHA), true, progressChan)
			resultChan <- commitResult{index: idx, commit: fc}
		}(i, commit)
	}

	// Collect results preserving order.
	var firstErr error
	for i := 0; i < totalCommits; i++ {
		r := <-resultChan
		if r.err != nil {
			if firstErr == nil {
				firstErr = r.err
			}
			continue
		}
		results[r.index] = r.commit
	}

	if firstErr != nil {
		return nil, firstErr
	}

	if forceCutoff {
		ci := int(cutoffIndex.Load())
		if ci > 0 {
			totalKB := int(kbSize.Load())
			msg := fmt.Sprintf("report exceeds %dMB in size (%dMB), results limited to %d changes in the timeline",
				sizeThresholdKB/1024, totalKB/1024, ci-1)
			model.SendProgressWarning("large report", msg, progressChan)
			results = results[:ci]
		}
	}

	// Filter out nil results (skipped commits where file was deleted).
	var filtered []*fetchedCommit
	for _, r := range results {
		if r != nil {
			filtered = append(filtered, r)
		}
	}

	return filtered, nil
}

func ConvertGithubCommitsIntoModel(ghCommits []*fetchedCommit,
	progressChan chan *model.ProgressUpdate, progressErrorChan chan model.ProgressError, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	var normalized []*model.Commit

	if len(ghCommits) > 0 {
		model.SendProgressUpdate("converting commits",
			fmt.Sprintf("converting %d github commits into data model", len(ghCommits)), false, progressChan)
	}
	for _, fc := range ghCommits {
		if len(fc.FileBytes) > 0 {
			nc := &model.Commit{
				Hash:        fc.Commit.SHA,
				Message:     fc.Commit.Message,
				Author:      fc.Commit.Author.Name,
				AuthorEmail: fc.Commit.Author.Email,
				CommitDate:  fc.Commit.Author.Date,
				Data:        fc.FileBytes,
			}
			model.SendProgressUpdate("converting commits",
				fmt.Sprintf("Converted commit %s into data model", nc.Hash), false, progressChan)
			normalized = append(normalized, nc)
		}
	}
	var errs []error
	if len(normalized) > 0 {
		model.SendProgressUpdate("converting commits", "building data models...", false, progressChan)
	}

	normalized, errs = BuildCommitChangelog(normalized, progressChan, progressErrorChan, base, remote, extRefs, breakingConfig)

	if len(errs) > 0 {
		model.SendProgressError("converting commits",
			fmt.Sprintf("%d errors detected when normalizing", len(normalized)), progressErrorChan)
	} else {
		if len(normalized) > 0 {
			model.SendProgressUpdate("converting commits",
				fmt.Sprintf("Success: %d commits normalized", len(normalized)), true, progressChan)
		} else {
			model.SendFatalError("converting commits", "no commits were normalized, please check the URL/Path", progressErrorChan)
		}
	}
	return normalized, errs
}

func ProcessGithubRepo(username, repo, filePath, baseCommit string,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
	forceCutoff bool, limit int, limitTime int, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {

	if username == "" || repo == "" || filePath == "" {
		err := errors.New("please supply valid github username/repo and filepath")
		model.SendProgressError("git", err.Error(), errorChan)
		return nil, []error{err}
	}

	session, svc, err := createGitHubSession()
	if err != nil {
		model.SendProgressError("git", err.Error(), errorChan)
		return nil, []error{err}
	}
	defer session.Close()

	githubCommits, err := GetCommitsForGithubFile(username, repo, filePath, baseCommit,
		progressChan, errorChan, forceCutoff, limit, limitTime, session, svc)
	if err != nil {
		return nil, []error{err}
	}

	commitHistory, errs := ConvertGithubCommitsIntoModel(githubCommits, progressChan, errorChan, base, remote, extRefs, breakingConfig)
	if errs != nil {
		for x := range errs {
			model.SendProgressError("git", errs[x].Error(), errorChan)
		}
		return commitHistory, errs
	}
	return commitHistory, nil
}

func getCommitTimeLimit(limitTime int, commits []github.Commit) int {
	if limitTime <= 0 {
		return 0
	}

	commitTimeCutoff := time.Now().Add(time.Duration(-limitTime) * time.Hour * 24)
	newLimit := 0

	for _, c := range commits {
		if commitTimeCutoff.After(c.Author.Date) {
			break
		}
		newLimit++
	}
	return newLimit
}
