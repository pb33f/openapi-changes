// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
)

var processGithubRepo = git.ProcessGithubRepo
var extractHistoryFromFile = git.ExtractHistoryFromFile
var populateHistory = git.PopulateHistory
var buildChangelog = git.BuildChangelog
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

func loadLeftRightCommits(left, right string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	d := makeProgressDrainer()
	defer d.close()

	var err error
	left, leftCleanup, err := resolveLeftRightInput(left)
	if err != nil {
		return nil, err
	}
	defer leftCleanup()

	right, rightCleanup, err := resolveLeftRightInput(right)
	if err != nil {
		return nil, err
	}
	defer rightCleanup()

	leftBytes, err := os.ReadFile(left)
	if err != nil {
		return nil, fmt.Errorf("cannot read original spec: %w", err)
	}
	rightBytes, err := os.ReadFile(right)
	if err != nil {
		return nil, fmt.Errorf("cannot read modified spec: %w", err)
	}

	commits := []*model.Commit{
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Original: %s, Modified: %s", left, right),
			CommitDate: time.Now(),
			Data:       rightBytes,
			Synthetic:  true,
		},
		{
			Hash:       uuid.New().String()[:6],
			Message:    fmt.Sprintf("Original file: %s", left),
			CommitDate: time.Now(),
			Data:       leftBytes,
			Synthetic:  true,
		},
	}

	commits, errs := buildChangelog(commits, d.ProgressChan, d.ErrorChan,
		git.HistoryOptions{
			Base:           opts.base,
			Remote:         opts.remote,
			ExtRefs:        opts.extRefs,
			KeepComparable: true,
		}, breakingConfig)
	if err := d.collectErrors(errs); err != nil {
		return nil, err
	}
	return commits, nil
}

func resolveLeftRightInput(raw string) (string, func(), error) {
	specURL, err := url.Parse(raw)
	if err != nil || specURL == nil || !strings.HasPrefix(specURL.Scheme, "http") {
		return raw, func() {}, nil
	}

	resp, err := httpGet(raw)
	if err != nil {
		return "", func() {}, fmt.Errorf("error downloading file '%s': %w", raw, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		return "", func() {}, fmt.Errorf("error downloading file '%s': unexpected status %s", raw, resp.Status)
	}

	const maxDownloadSize = 100 << 20 // 100 MB
	bits, err := io.ReadAll(io.LimitReader(resp.Body, maxDownloadSize))
	if err != nil {
		return "", func() {}, fmt.Errorf("error reading downloaded file '%s': %w", raw, err)
	}
	if len(bits) == 0 {
		return "", func() {}, fmt.Errorf("downloaded file '%s' is empty", raw)
	}

	tmpFile, err := os.CreateTemp("", "openapi-changes-*")
	if err != nil {
		return "", func() {}, fmt.Errorf("cannot create temp file for '%s': %w", raw, err)
	}
	if _, err = tmpFile.Write(bits); err != nil {
		tmpName := tmpFile.Name()
		_ = tmpFile.Close()
		_ = os.Remove(tmpName)
		return "", func() {}, fmt.Errorf("downloaded file '%s' cannot be written: %w", raw, err)
	}
	if err = tmpFile.Close(); err != nil {
		tmpName := tmpFile.Name()
		_ = os.Remove(tmpName)
		return "", func() {}, fmt.Errorf("downloaded file '%s' cannot be closed: %w", raw, err)
	}

	tmpName := tmpFile.Name()
	return tmpName, func() { _ = os.Remove(tmpName) }, nil
}
