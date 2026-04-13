// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"bytes"
	"errors"
	"fmt"
	"log/slog"
	"os/exec"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/araddon/dateparse"
	"github.com/pb33f/doctor/terminal"
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/datamodel"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/breakingrules"
	"github.com/pb33f/openapi-changes/model"
)

const (
	GIT       = "git"
	LOG       = "log"
	SHOW      = "show"
	REVPARSE  = "rev-parse"
	TOPLEVEL  = "--show-toplevel"
	NOPAGER   = "--no-pager"
	FOLLOW    = "--follow"
	LOGFORMAT = "--pretty=%cD||%h||%s||%an||%ae"
	NUMBER    = "-n"
	DIV       = "--"
)

func CheckLocalRepoAvailable(dir string) bool {
	cmd := exec.Command(GIT, LOG)
	cmd.Dir = dir
	err := cmd.Run()
	return err == nil
}

func GetTopLevel(dir string) (string, error) {
	cmd := exec.Command(GIT, REVPARSE, TOPLEVEL)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	cmd.Dir = dir
	err := cmd.Run()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(stdout.String()), nil
}

func ExtractHistoryFromFile(repoDirectory, filePath string,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts HistoryOptions,
) ([]*model.Commit, []error) {
	args := []string{NOPAGER, LOG, LOGFORMAT, FOLLOW}

	if opts.BaseCommit != "" {
		args = append(args, fmt.Sprintf("%s..HEAD", opts.BaseCommit))
	} else if opts.Limit > 0 && opts.GlobalRevisions {
		args = append(args, fmt.Sprintf("HEAD~%d..HEAD", opts.Limit))
	} else if opts.Limit > 0 {
		args = append(args, NUMBER, strconv.Itoa(opts.Limit))
	}

	args = append(args, DIV, filePath)

	cmd := exec.Command(GIT, args...)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	cmd.Dir = repoDirectory
	err := cmd.Run()
	var commitHistory []*model.Commit
	if err != nil {
		errString := fmt.Sprintf(
			"received non-zero exit code from git for '%s' when running %q (are you sure it's a git repo?): %s -- stderr: %s",
			repoDirectory,
			cmd.String(),
			err.Error(),
			stderr.String(),
		)
		model.SendProgressError("git", errString, errorChan)
		return nil, []error{errors.New(errString)}
	}

	var commitTimeCutoff *time.Time

	if opts.LimitTime != -1 {
		temp := time.Now().Add(time.Duration(-opts.LimitTime) * time.Hour * 24)
		commitTimeCutoff = &temp
	}

	outStr, _ := stdout.String(), stderr.String()
	lines := strings.Split(outStr, "\n")
	for k := range lines {
		if opts.Limit > 0 && k == opts.Limit && commitTimeCutoff == nil {
			break
		}
		c := strings.Split(lines[k], "||")
		if len(c) == 5 {
			date, _ := dateparse.ParseAny(c[0])
			commitHistory = append(commitHistory,
				&model.Commit{
					CommitDate:    date,
					Hash:          c[1],
					Message:       c[2],
					Author:        c[3],
					AuthorEmail:   c[4],
					RepoDirectory: repoDirectory,
					FilePath:      filePath,
				})
			model.SendProgressUpdate(c[1],
				fmt.Sprintf("extracted commit '%s'", c[1]), false, progressChan)

			if opts.BaseCommit != "" && (c[1] == opts.BaseCommit || strings.HasPrefix(c[1], opts.BaseCommit)) {
				break
			}
		}

		if commitTimeCutoff != nil && len(commitHistory) > 0 {
			if commitTimeCutoff.After(commitHistory[len(commitHistory)-1].CommitDate) {
				// Remove the last element because it doesn't count for history
				commitHistory = commitHistory[0 : len(commitHistory)-1]
				break
			}
		}
	}
	model.SendProgressUpdate("extraction",
		fmt.Sprintf("%d commits extracted", len(commitHistory)), true, progressChan)
	return commitHistory, nil
}

// PopulateHistory reads file data from git for each commit, then builds the
// changelog. Set opts.KeepComparable to preserve revisions even when the legacy
// libopenapi diff is empty (used by the doctor/changerator-based commands).
func PopulateHistory(commitHistory []*model.Commit,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	for c := range commitHistory {
		var err error
		commitHistory[c].Data, err = readFile(commitHistory[c].RepoDirectory, commitHistory[c].Hash, commitHistory[c].FilePath)
		if err != nil {
			return nil, []error{err}
		}
		model.SendProgressUpdate("population",
			fmt.Sprintf("Extracted %d KB from commit '%s'",
				len(commitHistory[c].Data)/1024, commitHistory[c].Hash), false, progressChan)

	}

	if opts.LimitTime != -1 && opts.Limit > 0 && opts.Limit+1 < len(commitHistory) {
		commitHistory = commitHistory[0 : opts.Limit+1]
	}

	cleaned, errs := buildCommitChangelog(commitHistory, progressChan, errorChan, opts, breakingConfig)
	if len(errs) > 0 {
		model.SendProgressError("git",
			fmt.Sprintf("%d error(s) found building commit change log", len(errs)), errorChan)

		return cleaned, errs
	}
	model.SendProgressUpdate("populated",
		fmt.Sprintf("%d commits processed and populated", len(cleaned)), true, progressChan)
	return cleaned, nil
}

// BuildChangelog compares consecutive commits and populates each with parsed
// documents and change data. Set opts.KeepComparable to preserve revisions
// even when the legacy libopenapi diff is empty.
func BuildChangelog(commitHistory []*model.Commit,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	return buildCommitChangelog(commitHistory, progressChan, errorChan, opts, breakingConfig)
}

func buildCommitChangelog(commitHistory []*model.Commit,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
	opts HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	var changeErrors []error
	var cleaned []*model.Commit

	// apply breaking rules configuration before comparisons
	if breakingConfig != nil {
		breakingrules.Apply(breakingConfig)
		defer breakingrules.Reset()
	}

	// create a new document config and set to default closed state,
	// enable it if the user has specified a base url or a path.
	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.AllowFileReferences = true
	docConfig.IgnoreArrayCircularReferences = true
	docConfig.IgnorePolymorphicCircularReferences = true

	basePathOverride, baseURLOverride, err := ResolveBaseOverride(opts.Base)
	if err != nil {
		return nil, []error{err}
	}
	if baseURLOverride != nil {
		docConfig.BaseURL = baseURLOverride
		docConfig.AllowRemoteReferences = true
	}

	// if this is set to true, we'll allow remote references
	// there will be a new rolodex created with both filesystems.
	if opts.Remote {
		docConfig.AllowRemoteReferences = true
		docConfig.AllowFileReferences = true
	}

	docConfig.ExcludeExtensionRefs = !opts.ExtRefs

	logger := terminal.NewPrettyLogger(&terminal.PrettyHandlerOptions{
		Level:      slog.LevelError,
		TimeFormat: terminal.TimeFormatDateTime,
	})

	docConfig.Logger = logger
	var revisionContext *RevisionDocumentContext
	if len(commitHistory) > 0 {
		revisionContext, err = BuildRevisionDocumentContext(
			commitHistory[0].RepoDirectory,
			commitHistory[0].FilePath,
			basePathOverride,
			baseURLOverride,
		)
		if err != nil {
			return nil, []error{err}
		}
	}

	for c := len(commitHistory) - 1; c > -1; c-- {
		var oldBits, newBits []byte
		var oldRevision, newRevision string
		if len(commitHistory) == c+1 {
			newBits = commitHistory[c].Data
			newRevision = commitHistory[c].Hash

			// Obtain data from the previous commit and fail gracefully, if git
			// errors. This might happen when the file does not exist in the git
			// history.
			oldRevision = fmt.Sprintf("%s~1", commitHistory[c].Hash)
			oldBits, _ = readFile(commitHistory[c].RepoDirectory, oldRevision, commitHistory[c].FilePath)
		} else {
			oldBits = commitHistory[c+1].Data
			oldRevision = commitHistory[c+1].Hash
			commitHistory[c].OldData = oldBits
			newBits = commitHistory[c].Data
			newRevision = commitHistory[c].Hash
		}

		var oldDoc, newDoc libopenapi.Document

		if len(oldBits) > 0 && len(newBits) > 0 {
			oldDocConfig, configErr := BuildRevisionDocumentConfiguration(revisionContext, oldRevision, docConfig)
			if configErr != nil {
				model.SendFatalError("building models", fmt.Sprintf("unable to configure original document '%s': %s", commitHistory[c].FilePath, configErr.Error()), errorChan)
				changeErrors = append(changeErrors, configErr)
				return nil, changeErrors
			}
			oldDoc, err = libopenapi.NewDocumentWithConfiguration(oldBits, oldDocConfig)

			if err != nil {
				model.SendFatalError("building models", fmt.Sprintf("unable to parse original document '%s': %s", commitHistory[c].FilePath, err.Error()), errorChan)
				changeErrors = append(changeErrors, err)
				return nil, changeErrors
			} else {
				model.SendProgressUpdate("building models",
					fmt.Sprintf("Building original model for commit %s", commitHistory[c].Hash[0:6]), false, progressChan)
			}
			newDocConfig, configErr := BuildRevisionDocumentConfiguration(revisionContext, newRevision, docConfig)
			if configErr != nil {
				model.SendFatalError("building models", fmt.Sprintf("unable to configure modified document '%s': %s", commitHistory[c].FilePath, configErr.Error()), errorChan)
				changeErrors = append(changeErrors, configErr)
				return nil, changeErrors
			}
			newDoc, err = libopenapi.NewDocumentWithConfiguration(newBits, newDocConfig)
			if err != nil {
				model.SendProgressError("building models", fmt.Sprintf("unable to parse modified document '%s': %s", commitHistory[c].FilePath, err.Error()), errorChan)
				changeErrors = append(changeErrors, err)
			}

			if oldDoc != nil && newDoc != nil {
				changes, errs := libopenapi.CompareDocuments(oldDoc, newDoc)

				if errs != nil {
					model.SendProgressError("building models", fmt.Sprintf("Error thrown when comparing: %s", errs.Error()), errorChan)
					changeErrors = append(changeErrors, errs)
				}
				commitHistory[c].Changes = changes
			} else {
				model.SendProgressError("building models", "No OpenAPI documents can be compared!", errorChan)
				changeErrors = append(changeErrors, errors.New("no OpenAPI documents can be compared"))
			}
		}
		if len(oldBits) == 0 && len(newBits) > 0 {
			if commitHistory[c].RepoDirectory != "" {
				model.SendProgressWarning("building models",
					fmt.Sprintf("Commit %s is the first version of '%s' — no prior version to compare against, skipping",
						commitHistory[c].Hash, commitHistory[c].FilePath), progressChan)
			}
			newDocConfig, configErr := BuildRevisionDocumentConfiguration(revisionContext, newRevision, docConfig)
			if configErr != nil {
				model.SendFatalError("building models", fmt.Sprintf("unable to configure modified document '%s': %s", commitHistory[c].FilePath, configErr.Error()), errorChan)
				changeErrors = append(changeErrors, configErr)
				return nil, changeErrors
			}
			newDoc, err = libopenapi.NewDocumentWithConfiguration(newBits, newDocConfig)
			if err != nil {
				model.SendFatalError("building models", fmt.Sprintf("unable to create OpenAPI modified document: %s", err.Error()), errorChan)
				changeErrors = append(changeErrors, err)
				return nil, changeErrors
			}
		}
		if newDoc != nil {
			commitHistory[c].Document = newDoc
		}
		if oldDoc != nil {
			commitHistory[c].OldDocument = oldDoc
		}
		if revisionContext != nil && revisionContext.DocumentRewriter != nil {
			commitHistory[c].DocumentRewriters = []model.DocumentPathRewriter{revisionContext.DocumentRewriter}
		}
		// Preserve the oldest entry as a sentinel when there is no prior version.
		// The legacy commands keep only revisions with libopenapi changes, while
		// the new doctor-based commands keep every revision with comparable docs.
		if c == len(commitHistory)-1 || commitHistory[c].Changes != nil || (opts.KeepComparable && oldDoc != nil && newDoc != nil) {
			cleaned = append(cleaned, commitHistory[c])
		}
	}
	for i, j := 0, len(cleaned)-1; i < j; i, j = i+1, j-1 {
		cleaned[i], cleaned[j] = cleaned[j], cleaned[i]
	}
	return cleaned, changeErrors
}

func ExtractPathAndFile(location string) (string, string) {
	dir := path.Dir(location)
	file := path.Base(location)
	return dir, file
}

// readFile reads the specified file at the specified commit hash from the
// specified git repository.
func readFile(repoDir, hash, filePath string) ([]byte, error) {
	cmd := exec.Command(GIT, NOPAGER, SHOW, fmt.Sprintf("%s:%s", hash, filePath))
	var ou, er bytes.Buffer
	cmd.Stdout = &ou
	cmd.Stderr = &er
	cmd.Dir = repoDir
	err := cmd.Run()
	if err != nil {
		return nil, fmt.Errorf("read file from git: %v", err)
	}

	return ou.Bytes(), nil
}

// ReadFileAtRevision reads a file from a git repository at the given revision.
func ReadFileAtRevision(repoDir, revision, filePath string) ([]byte, error) {
	data, err := readFile(repoDir, revision, filePath)
	if err != nil {
		return nil, fmt.Errorf("cannot read '%s' at revision '%s': %w", filePath, revision, err)
	}
	return data, nil
}
