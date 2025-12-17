// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"bytes"
	"errors"
	"fmt"
	"log/slog"
	"net/url"
	"os"
	"os/exec"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/araddon/dateparse"
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/datamodel"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pterm/pterm"
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
	outStr, _ := stdout.String(), stderr.String()
	return outStr, nil
}

func ExtractHistoryFromFile(repoDirectory, filePath, baseCommit string,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, globalRevisions bool, limit int, limitTime int,
) ([]*model.Commit, []error) {
	args := []string{NOPAGER, LOG, LOGFORMAT, FOLLOW}

	if baseCommit != "" {
		args = append(args, fmt.Sprintf("%s..HEAD", baseCommit))
	} else if limit > 0 && globalRevisions {
		args = append(args, fmt.Sprintf("HEAD~%d..HEAD", limit))
	} else if limit > 0 {
		args = append(args, NUMBER, strconv.Itoa(limit))
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

	if limitTime != -1 {
		temp := time.Now().Add(time.Duration(-limitTime) * time.Hour * 24)
		commitTimeCutoff = &temp
	}

	outStr, _ := stdout.String(), stderr.String()
	lines := strings.Split(outStr, "\n")
	for k := range lines {
		if k == limit && commitTimeCutoff == nil {
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
				fmt.Sprintf("extacted commit '%s'", c[1]), false, progressChan)

			if baseCommit != "" && (c[1] == baseCommit || strings.HasPrefix(c[1], baseCommit)) {
				break
			}
		}

		if commitTimeCutoff != nil {
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

func PopulateHistoryWithChanges(commitHistory []*model.Commit, limit int, limitTime int,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	for c := range commitHistory {
		var err error
		commitHistory[c].Data, err = readFile(commitHistory[c].RepoDirectory, commitHistory[c].Hash, commitHistory[c].FilePath)
		if err != nil {
			return nil, []error{err}
		}
		model.SendProgressUpdate("population",
			fmt.Sprintf("Extracting %d bytes extracted from commit '%s'",
				len(commitHistory[c].Data)/1024, commitHistory[c].Hash), false, progressChan)

	}

	if limitTime != -1 && limit > 0 && limit+1 < len(commitHistory) {
		commitHistory = commitHistory[0 : limit+1]
	}

	cleaned, errs := BuildCommitChangelog(commitHistory, progressChan, errorChan, base, remote, extRefs, breakingConfig)
	if len(errs) > 0 {
		model.SendProgressError("git",
			fmt.Sprintf("%d error(s) found building commit change log", len(errs)), errorChan)

		return cleaned, errs
	}
	model.SendProgressUpdate("populated",
		fmt.Sprintf("%d commits processed and populated", len(cleaned)), true, progressChan)
	return cleaned, nil
}

// TODO: we have reached peak argument count, we have to fix this.
func BuildCommitChangelog(commitHistory []*model.Commit,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool,
	breakingConfig *whatChangedModel.BreakingRulesConfig,
) ([]*model.Commit, []error) {
	var changeErrors []error
	var cleaned []*model.Commit

	// apply breaking rules configuration before comparisons
	if breakingConfig != nil {
		defaults := whatChangedModel.GenerateDefaultBreakingRules()
		defaults.Merge(breakingConfig)
		whatChangedModel.SetActiveBreakingRulesConfig(defaults)
		defer whatChangedModel.ResetActiveBreakingRulesConfig()
	}

	// create a new document config and set to default closed state,
	// enable it if the user has specified a base url or a path.
	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.AllowFileReferences = true
	docConfig.IgnoreArrayCircularReferences = true
	docConfig.IgnorePolymorphicCircularReferences = true

	if base != "" {
		// check if this is a URL or not
		u, e := url.Parse(base)
		if e == nil && u.Scheme != "" && u.Host != "" {
			docConfig.BaseURL = u
			docConfig.BasePath = ""
			docConfig.AllowRemoteReferences = true
		} else {
			docConfig.AllowFileReferences = true
			docConfig.BasePath = base
		}
	}

	// if this is set to true, we'll allow remote references
	// there will be a new rolodex created with both filesystems.
	if remote {
		docConfig.AllowRemoteReferences = true
		docConfig.AllowFileReferences = true
	}

	docConfig.ExcludeExtensionRefs = !extRefs

	// TODO: make this configurable for power users.
	docConfig.ExcludeExtensionRefs = true

	ptermLog := &pterm.Logger{
		Formatter:  pterm.LogFormatterColorful,
		Writer:     os.Stdout,
		Level:      pterm.LogLevelError,
		ShowTime:   true,
		TimeFormat: "2006-01-02 15:04:05",
		MaxWidth:   180,
		KeyStyles: map[string]pterm.Style{
			"error":  *pterm.NewStyle(pterm.FgRed, pterm.Bold),
			"err":    *pterm.NewStyle(pterm.FgRed, pterm.Bold),
			"caller": *pterm.NewStyle(pterm.FgGray, pterm.Bold),
		},
	}

	handler := pterm.NewSlogHandler(ptermLog)
	logger := slog.New(handler)

	docConfig.Logger = logger

	for c := len(commitHistory) - 1; c > -1; c-- {
		var oldBits, newBits []byte
		if len(commitHistory) == c+1 {
			newBits = commitHistory[c].Data

			// Obtain data from the previous commit and fail gracefully, if git
			// errors. This might happen when the file does not exist in the git
			// history.
			oldBits, _ = readFile(commitHistory[c].RepoDirectory, fmt.Sprintf("%s~1", commitHistory[c].Hash), commitHistory[c].FilePath)
		} else {
			oldBits = commitHistory[c+1].Data
			commitHistory[c].OldData = oldBits
			newBits = commitHistory[c].Data
		}

		var oldDoc, newDoc libopenapi.Document

		var err error
		if len(oldBits) > 0 && len(newBits) > 0 {
			oldDoc, err = libopenapi.NewDocumentWithConfiguration(oldBits, docConfig)

			if err != nil {
				model.SendFatalError("building models", fmt.Sprintf("unable to parse original document '%s': %s", commitHistory[c].FilePath, err.Error()), errorChan)
				changeErrors = append(changeErrors, err)
				return nil, changeErrors
			} else {
				model.SendProgressUpdate("building models",
					fmt.Sprintf("Building original model for commit %s", commitHistory[c].Hash[0:6]), false, progressChan)
			}
			newDoc, err = libopenapi.NewDocumentWithConfiguration(newBits, docConfig)
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
				changeErrors = append(changeErrors, err)
			}
		}
		if len(oldBits) == 0 && len(newBits) > 0 {
			newDoc, err = libopenapi.NewDocumentWithConfiguration(newBits, docConfig)
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
		if (c == len(commitHistory)-1) || commitHistory[c].Changes != nil {
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
