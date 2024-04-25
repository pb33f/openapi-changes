// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"bytes"
	"errors"
	"fmt"
	"github.com/araddon/dateparse"
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pterm/pterm"
	"log/slog"
	"net/url"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"
)

const (
	GIT       = "git"
	LOG       = "log"
	SHOW      = "show"
	REVPARSE  = "rev-parse"
	TOPLEVEL  = "--show-toplevel"
	NOPAGER   = "--no-pager"
	LOGFORMAT = "--pretty=%cD||%h||%s||%an||%ae"
	DIV       = "--"
)

func CheckLocalRepoAvailable(dir string) bool {
	cmd := exec.Command(GIT, LOG)
	cmd.Dir = dir
	err := cmd.Run()
	if err != nil {
		return false
	}
	return true
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
	outStr, _ := string(stdout.Bytes()), string(stderr.Bytes())
	return outStr, nil
}

func ExtractHistoryFromFile(repoDirectory, filePath string,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, limit int) ([]*model.Commit, []error) {

	cmd := exec.Command(GIT, NOPAGER, LOG, LOGFORMAT, DIV, filePath)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	cmd.Dir = repoDirectory
	err := cmd.Run()
	var commitHistory []*model.Commit
	if err != nil {
		errString := fmt.Sprintf("unable to read git repository '%s' (are you sure it's a git repo?): %s", repoDirectory, err.Error())
		model.SendProgressError("git", errString, errorChan)
		return nil, []error{errors.New(errString)}
	}

	outStr, _ := string(stdout.Bytes()), string(stderr.Bytes())
	lines := strings.Split(outStr, "\n")
	for k := range lines {
		if k == limit {
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
		}
	}
	model.SendProgressUpdate("extraction",
		fmt.Sprintf("%d commits extracted", len(commitHistory)), true, progressChan)
	return commitHistory, nil
}

func PopulateHistoryWithChanges(commitHistory []*model.Commit, limit int,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) ([]*model.Commit, []error) {

	for c := range commitHistory {
		cmd := exec.Command(GIT, NOPAGER, SHOW, fmt.Sprintf("%s:%s", commitHistory[c].Hash, filepath.Join(commitHistory[c].RepoDirectory, commitHistory[c].FilePath)))
		var ou, er bytes.Buffer
		cmd.Stdout = &ou
		cmd.Stderr = &er
		cmd.Dir = commitHistory[c].RepoDirectory
		err := cmd.Run()
		if err != nil {
			return nil, []error{err}
		}
		commitHistory[c].Data = ou.Bytes()
		model.SendProgressUpdate("population",
			fmt.Sprintf("Extracting %d bytes extracted from commit '%s'",
				len(commitHistory[c].Data)/1024, commitHistory[c].Hash), false, progressChan)

	}

	if limit > 0 && limit+1 < len(commitHistory) {
		commitHistory = commitHistory[0 : limit+1]
	}

	cleaned, errors := BuildCommitChangelog(commitHistory, progressChan, errorChan, base, remote)
	if len(errors) > 0 {
		model.SendProgressError("git",
			fmt.Sprintf("%d error(s) found building commit change log", len(errors)), errorChan)

		return cleaned, errors
	}
	model.SendProgressUpdate("populated",
		fmt.Sprintf("%d commits processed and populated", len(cleaned)), true, progressChan)
	return cleaned, nil
}

func BuildCommitChangelog(commitHistory []*model.Commit,
	progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote bool) ([]*model.Commit, []error) {

	var changeErrors []error
	var cleaned []*model.Commit

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
				model.SendFatalError("building models", fmt.Sprintf("unable to parse original document: %s", err.Error()), errorChan)
				changeErrors = append(changeErrors, err)
				return nil, changeErrors
			} else {

				model.SendProgressUpdate("building models",
					fmt.Sprintf("Building original model for commit %s", commitHistory[c].Hash[0:6]), false, progressChan)

			}
			newDoc, err = libopenapi.NewDocumentWithConfiguration(newBits, docConfig)
			if err != nil {
				model.SendProgressError("building models", fmt.Sprintf("unable to parse modified document: %s", err.Error()), errorChan)
				changeErrors = append(changeErrors, err)
			}

			if oldDoc != nil && newDoc != nil {
				changes, errs := libopenapi.CompareDocuments(oldDoc, newDoc)

				if errs != nil {
					model.SendProgressError("building models", fmt.Sprintf("Error thrown when comparing: %s", errs[0].Error()), errorChan)
					changeErrors = append(changeErrors, errs...)
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
