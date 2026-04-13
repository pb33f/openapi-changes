// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
)

var processGithubRepo = git.ProcessGithubRepo
var extractHistoryFromFile = git.ExtractHistoryFromFile
var populateHistory = git.PopulateHistory
var httpGet = http.Get

// progressDrainer drains git progress channels that use synchronous sends.
// Call close() before reading collected warnings or errors.
type progressDrainer struct {
	ProgressChan chan *model.ProgressUpdate
	ErrorChan    chan model.ProgressError
	errors       []model.ProgressError
	warnings     []string
	wg           sync.WaitGroup
	closeOnce    sync.Once
}

func makeProgressDrainer() *progressDrainer {
	d := &progressDrainer{
		ProgressChan: make(chan *model.ProgressUpdate),
		ErrorChan:    make(chan model.ProgressError),
	}
	d.wg.Add(2)
	go func() {
		defer d.wg.Done()
		for update := range d.ProgressChan {
			if update.Warning {
				d.warnings = append(d.warnings, update.Message)
			}
		}
	}()
	go func() {
		defer d.wg.Done()
		for e := range d.ErrorChan {
			d.errors = append(d.errors, e)
		}
	}()
	return d
}

func (d *progressDrainer) close() []model.ProgressError {
	d.closeOnce.Do(func() {
		close(d.ProgressChan)
		close(d.ErrorChan)
		d.wg.Wait()
	})
	return d.errors
}

func (d *progressDrainer) fatalError() error {
	d.close()

	var errs []error
	for _, e := range d.errors {
		if e.Fatal {
			errs = append(errs, errors.New(e.Message))
		}
	}
	if len(errs) == 0 {
		return nil
	}
	return errors.Join(errs...)
}

func (d *progressDrainer) printWarnings() {
	d.close()
	seen := make(map[string]struct{})
	for _, w := range d.warnings {
		if _, ok := seen[w]; ok {
			continue
		}
		seen[w] = struct{}{}
		fmt.Fprintf(os.Stderr, "warning: %s\n", w)
	}
	for _, e := range d.errors {
		if e.Fatal {
			continue
		}
		if _, ok := seen[e.Message]; ok {
			continue
		}
		seen[e.Message] = struct{}{}
		fmt.Fprintf(os.Stderr, "warning: %s\n", e.Message)
	}
}

// collectErrors drains channels, prints warnings, and joins all errors
// (including fatal drainer errors) into a single error. Returns nil if clean.
func (d *progressDrainer) collectErrors(errs []error) error {
	fatalErr := d.fatalError()
	d.printWarnings()
	var all []error
	all = append(all, errs...)
	if fatalErr != nil {
		all = append(all, fatalErr)
	}
	return errors.Join(all...)
}

func loadGitHubCommits(rawURL string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	specURL, err := url.Parse(rawURL)
	if err != nil {
		return nil, fmt.Errorf("invalid URL: %w", err)
	}
	user, repo, filePath, err := ExtractGithubDetailsFromURL(specURL)
	if err != nil {
		return nil, fmt.Errorf("error extracting github details: %w", err)
	}

	d := makeProgressDrainer()
	commits, errs := processGithubRepo(user, repo, filePath,
		d.ProgressChan, d.ErrorChan, git.HistoryOptions{
			BaseCommit:     opts.baseCommit,
			Limit:          opts.limit,
			LimitTime:      opts.limitTime,
			Base:           opts.base,
			Remote:         opts.remote,
			ExtRefs:        opts.extRefs,
			KeepComparable: true,
		}, breakingConfig)
	if err := d.collectErrors(errs); err != nil {
		return nil, err
	}

	if opts.latest && len(commits) > 1 {
		commits = commits[:1]
	}
	return commits, nil
}

func loadGitHistoryCommits(gitPath, filePath string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	if gitPath == "" || filePath == "" {
		return nil, errors.New("please supply a path to a git repo and a path to a file")
	}

	repo, err := absoluteRepoPath(gitPath)
	if err != nil {
		return nil, err
	}
	_, err = os.Stat(filepath.Join(repo, filePath))
	if err != nil {
		return nil, fmt.Errorf("cannot open file: '%s'", filePath)
	}

	extractDrainer := makeProgressDrainer()
	extractOpts := git.HistoryOptions{
		BaseCommit:      opts.baseCommit,
		GlobalRevisions: opts.globalRevisions,
		Limit:           opts.limit,
		LimitTime:       opts.limitTime,
	}
	commits, errs := extractHistoryFromFile(gitPath, filePath,
		extractDrainer.ProgressChan, extractDrainer.ErrorChan, extractOpts)
	if errs != nil {
		return nil, extractDrainer.collectErrors(errs)
	}
	if err := extractDrainer.collectErrors(nil); err != nil {
		return nil, err
	}

	populateDrainer := makeProgressDrainer()
	commits, errs = populateHistory(commits,
		populateDrainer.ProgressChan, populateDrainer.ErrorChan, git.HistoryOptions{
			LimitTime:      opts.limitTime,
			Base:           opts.base,
			Remote:         opts.remote,
			ExtRefs:        opts.extRefs,
			KeepComparable: true,
		}, breakingConfig)
	if err := populateDrainer.collectErrors(errs); err != nil {
		return nil, err
	}

	if len(commits) == 0 {
		return nil, nil
	}
	if opts.latest {
		commits = commits[:1]
	}
	return commits, nil
}

func loadLeftRightCommits(left, right string, opts summaryOpts) ([]*model.Commit, error) {
	commit, err := buildLeftRightCommitAndSources(left, right, opts)
	if err != nil {
		return nil, err
	}
	return []*model.Commit{commit}, nil
}

func parseGitRef(raw string) (revision, filePath string, ok bool) {
	if isHTTPURL(raw) {
		return "", "", false
	}
	if shouldPreferLocalPath(raw) {
		return "", "", false
	}
	colonIdx := strings.IndexByte(raw, ':')
	if colonIdx < 0 {
		return "", "", false
	}
	if colonIdx == 1 && len(raw) > 1 && ((raw[0] >= 'A' && raw[0] <= 'Z') || (raw[0] >= 'a' && raw[0] <= 'z')) {
		return "", "", false
	}
	revision = raw[:colonIdx]
	filePath = raw[colonIdx+1:]
	if revision == "" || filePath == "" {
		return "", "", false
	}
	return revision, filePath, true
}

func shouldPreferLocalPath(raw string) bool {
	if raw == "" {
		return false
	}
	if filepath.IsAbs(raw) || strings.HasPrefix(raw, "."+string(filepath.Separator)) || strings.HasPrefix(raw, ".."+string(filepath.Separator)) {
		return true
	}
	_, err := os.Lstat(raw)
	return err == nil
}

func isHTTPURL(raw string) bool {
	u, err := url.Parse(raw)
	if err != nil || u == nil {
		return false
	}
	return (u.Scheme == "http" || u.Scheme == "https") && u.Host != ""
}

func normalizeGitRefPath(repoRoot, filePath string) (string, error) {
	canonicalRepoRoot, err := git.CanonicalizePath(repoRoot)
	if err != nil {
		return "", fmt.Errorf("cannot canonicalize repository root '%s': %w", repoRoot, err)
	}

	var absPath string
	if filepath.IsAbs(filePath) {
		absPath, err = git.CanonicalizePath(filePath)
		if err != nil {
			return "", fmt.Errorf("cannot canonicalize git ref path '%s': %w", filePath, err)
		}
	} else {
		absPath = filepath.Join(canonicalRepoRoot, filepath.Clean(filePath))
	}

	relPath, err := filepath.Rel(canonicalRepoRoot, absPath)
	if err != nil {
		return "", fmt.Errorf("cannot normalize git ref path '%s': %w", filePath, err)
	}
	if relPath == "." || relPath == "" {
		return "", fmt.Errorf("git ref path '%s' must point to a file", filePath)
	}
	if relPath == ".." || strings.HasPrefix(relPath, ".."+string(filepath.Separator)) {
		return "", fmt.Errorf("git ref path '%s' resolves outside the current repository", filePath)
	}
	return filepath.ToSlash(relPath), nil
}

func displayLabelForHTML(raw string) string {
	if _, _, ok := parseGitRef(raw); ok {
		return raw
	}
	if isHTTPURL(raw) {
		return sanitizeURLLabel(raw)
	}
	return filepath.Base(raw)
}

func sourceLabelForReport(raw string) string {
	if isHTTPURL(raw) {
		return sanitizeURLLabel(raw)
	}
	return raw
}
