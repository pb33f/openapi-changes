// Copyright 2022-2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"github.com/stretchr/testify/assert"
	"os"
	"path/filepath"
	"testing"
)

func TestCheckLocalRepoAvailable(t *testing.T) {
	assert.True(t, CheckLocalRepoAvailable("./"))
	assert.False(t, CheckLocalRepoAvailable("/tmp/made-up"))
}

func TestExtractHistoryFromFile(t *testing.T) {
	history := ExtractHistoryFromFile("./", "read_local.go")
	assert.NotNil(t, history)
	assert.Equal(t, "adding read_local.go to test repo code", history[len(history)-1].Message)
}

func TestExtractHistoryUsingLib(t *testing.T) {
	cwd, _ := os.Getwd()
	dir, _ := filepath.Split(cwd)
	history := ExtractHistoryUsingLib(dir, "sample-specs/petstorev3.json")
	assert.NotNil(t, history)
	assert.Equal(t, "And now it's generally wrecked. But what a fun journey.\n", history[0].Message)

	// build out the commit change log and ensure everything is in the right place.
	errors := PopulateHistoryWithChanges(history, nil, false)
	assert.Len(t, errors, 0)
	for x := range history {
		if x != len(history)-1 { // last item is first commit, it can't be diffed.
			assert.NotNil(t, history[x].Changes)
			assert.NotNil(t, history[x].OldData)
		}
	}
}

func TestExtractHistoryFromFile_Fail(t *testing.T) {
	history := ExtractHistoryFromFile("./", "no_file_nope")
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
