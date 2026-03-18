// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"

	"github.com/stretchr/testify/assert"
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
