// Copyright 2022-2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"fmt"
	"os"
	"testing"
	"time"

	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCheckLocalRepoAvailable(t *testing.T) {
	assert.True(t, CheckLocalRepoAvailable("./"))
	assert.False(t, CheckLocalRepoAvailable("/tmp/made-up"))
}

func TestExtractHistoryFromFile(t *testing.T) {
	c := make(chan *model.ProgressUpdate, 32)
	e := make(chan model.ProgressError, 32)

	history, errs := ExtractHistoryFromFile("./", "read_local.go", "", c, e, false, 25, -1)
	require.Empty(t, errs)
	require.NotEmpty(t, history)

	oldest := history[len(history)-1]
	assert.Equal(t, "./", oldest.RepoDirectory)
	assert.Equal(t, "read_local.go", oldest.FilePath)
	assert.NotEmpty(t, oldest.Hash)
	assert.NotEmpty(t, oldest.Message)
	assert.False(t, oldest.CommitDate.IsZero())
}

func TestExtractHistoryFromFile_Fail(t *testing.T) {

	c := make(chan *model.ProgressUpdate)
	e := make(chan model.ProgressError)
	d := make(chan bool)
	go func() {
		select {
		case <-c:
			d <- true
		case <-e:
			d <- true
		}
	}()

	history, _ := ExtractHistoryFromFile("./", "no_file_nope", "", c, e, false, 5, -1)
	<-d
	assert.Len(t, history, 0)
}

func TestExtractPathAndFile(t *testing.T) {
	var dir, file string
	dir, file = ExtractPathAndFile("/some/place/thing.html")
	assert.Equal(t, "/some/place", dir)
	assert.Equal(t, "thing.html", file)
	dir, file = ExtractPathAndFile("../../thing.html")
	assert.Equal(t, "../..", dir)
	assert.Equal(t, "thing.html", file)
}

func TestGetTopLevel(t *testing.T) {
	str, err := GetTopLevel("./")
	assert.NoError(t, err)
	assert.NotEmpty(t, str)
}

func TestReadFile(t *testing.T) {
	contentRaw, err := readFile("../", "HEAD", "./git/read_local.go")
	assert.NoError(t, err)
	assert.NotEmpty(t, contentRaw)
}

func TestBuildCommitChangelog_IdenticalLeftRightPreservesSentinelCommit(t *testing.T) {
	specBytes := mustReadTestFile(t, "../sample-specs/petstorev3.json")
	progressChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	commits := []*model.Commit{
		{
			Hash:       "right1",
			Message:    "right",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
		{
			Hash:       "left01",
			Message:    "left",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
	}

	cleaned, errs := BuildCommitChangelog(commits, progressChan, errorChan, "", true, false, nil)
	require.Empty(t, errs)
	require.Len(t, cleaned, 1)
	assert.Nil(t, cleaned[0].Changes)
	assert.NotNil(t, cleaned[0].Document)
}

func TestBuildCommitTimeline_IdenticalLeftRightPreservesComparableRevision(t *testing.T) {
	specBytes := mustReadTestFile(t, "../sample-specs/petstorev3.json")
	progressChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	commits := []*model.Commit{
		{
			Hash:       "right1",
			Message:    "right",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
		{
			Hash:       "left01",
			Message:    "left",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
	}

	cleaned, errs := BuildCommitTimeline(commits, progressChan, errorChan, "", true, false, nil)
	require.Empty(t, errs)
	require.Len(t, cleaned, 2)
	assert.NotNil(t, cleaned[0].Document)
	assert.NotNil(t, cleaned[0].OldDocument)
	assert.Nil(t, cleaned[0].Changes)
}

func mustReadTestFile(t *testing.T, path string) []byte {
	t.Helper()

	bits, err := os.ReadFile(path)
	require.NoError(t, err, fmt.Sprintf("read test file %s", path))
	return bits
}
