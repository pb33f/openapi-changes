// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"testing"

	"github.com/pb33f/libopenapi"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestConsoleCommand_ZeroArgs(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "--no-color")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestConsoleCommand_TooManyArgs(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "a", "b", "c")
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "too many arguments")
}

func TestConsoleCommand_SingleArgNonGithub(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "--no-color", "not-a-url")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestConsoleCommand_BadFirstArg(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(),
		"--no-logo", "--no-color",
		"/nonexistent/path",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "cannot open file/repository")
}

func TestConsoleCommand_TwoArgsDirectoryFirst(t *testing.T) {
	// Using ".." as the directory should dispatch to git history.
	// This may fail because there's no tracked spec file, but it exercises the path.
	cmd := testRootCmd(GetConsoleCommand(),
		"--no-logo", "--no-color",
		"..",
		"sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	// This might succeed or fail depending on git history, but shouldn't panic
	_ = err
}

func TestConsoleCommand_TwoArgsURLFirst(t *testing.T) {
	// HTTP URL as first arg dispatches to left/right comparison.
	// We can't actually fetch, so it will error, but exercises the path.
	cmd := testRootCmd(GetConsoleCommand(),
		"--no-logo", "--no-color",
		"http://example.com/spec.yaml",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	// Should error on download, but not panic
	assert.Error(t, err)
}

func TestHasRenderableDocuments(t *testing.T) {
	doc, err := libopenapi.NewDocument([]byte("openapi: 3.0.0\ninfo:\n  title: test\n  version: 1.0.0\npaths: {}\n"))
	require.NoError(t, err)

	commits := []*model.Commit{
		{Hash: "a"},
		{Hash: "b", Document: doc, OldDocument: doc},
	}
	assert.True(t, hasRenderableDocuments(commits))
	assert.False(t, hasRenderableDocuments([]*model.Commit{{Hash: "c"}}))
}

func TestWrapConsoleStartError(t *testing.T) {
	err := wrapConsoleStartError(errors.New("open /dev/tty: device not configured"))
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "requires an interactive terminal")
	assert.Contains(t, err.Error(), "device not configured")
}

func TestConsoleCommand_NoPriorVersionText(t *testing.T) {
	originalExtract := extractHistoryFromFile
	originalPopulate := populateHistoryWithDocuments
	t.Cleanup(func() {
		extractHistoryFromFile = originalExtract
		populateHistoryWithDocuments = originalPopulate
	})

	extractHistoryFromFile = func(repoDirectory, filePath, baseCommit string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, globalRevisions bool, limit int, limitTime int,
	) ([]*model.Commit, []error) {
		return []*model.Commit{{Hash: "abc123"}}, nil
	}
	populateHistoryWithDocuments = func(commitHistory []*model.Commit, limit int, limitTime int,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return []*model.Commit{}, nil
	}

	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "--no-color", "..", "sample-specs/petstorev3.json")
	output := captureStdout(t, func() {
		require.NoError(t, cmd.Execute())
	})

	assert.Contains(t, output, "The file has no prior version to compare against")
}
