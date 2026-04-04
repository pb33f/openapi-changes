// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"testing"

	"github.com/pb33f/libopenapi"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewConsoleCommand_ZeroArgs(t *testing.T) {
	cmd := newTestRootCmd(GetNewConsoleCommand(), "--no-logo", "--no-color")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestNewConsoleCommand_TooManyArgs(t *testing.T) {
	cmd := newTestRootCmd(GetNewConsoleCommand(), "--no-logo", "a", "b", "c")
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "too many arguments")
}

func TestNewConsoleCommand_SingleArgNonGithub(t *testing.T) {
	cmd := newTestRootCmd(GetNewConsoleCommand(), "--no-logo", "--no-color", "not-a-url")
	err := cmd.Execute()
	assert.NoError(t, err)
}

func TestNewConsoleCommand_BadFirstArg(t *testing.T) {
	cmd := newTestRootCmd(GetNewConsoleCommand(),
		"--no-logo", "--no-color",
		"/nonexistent/path",
		"../sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "cannot open file/repository")
}

func TestNewConsoleCommand_TwoArgsDirectoryFirst(t *testing.T) {
	// Using ".." as the directory should dispatch to git history.
	// This may fail because there's no tracked spec file, but it exercises the path.
	cmd := newTestRootCmd(GetNewConsoleCommand(),
		"--no-logo", "--no-color",
		"..",
		"sample-specs/petstorev3.json",
	)
	err := cmd.Execute()
	// This might succeed or fail depending on git history, but shouldn't panic
	_ = err
}

func TestNewConsoleCommand_TwoArgsURLFirst(t *testing.T) {
	// HTTP URL as first arg dispatches to left/right comparison.
	// We can't actually fetch, so it will error, but exercises the path.
	cmd := newTestRootCmd(GetNewConsoleCommand(),
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
