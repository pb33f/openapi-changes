// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"

	"github.com/pb33f/doctor/terminal"
	"github.com/spf13/cobra"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// testRootCmd creates a root command with standard persistent flags and a subcommand for testing.
func testRootCmd(sub *cobra.Command, args ...string) *cobra.Command {
	root := &cobra.Command{Use: "openapi-changes"}
	root.PersistentFlags().BoolP("no-logo", "b", false, "")
	root.PersistentFlags().BoolP("top", "t", false, "")
	root.PersistentFlags().IntP("limit", "l", 5, "")
	root.PersistentFlags().IntP("limit-time", "d", -1, "")
	root.PersistentFlags().StringP("base", "p", "", "")
	root.PersistentFlags().StringP("base-commit", "", "", "")
	root.PersistentFlags().BoolP("remote", "r", true, "")
	root.PersistentFlags().BoolP("ext-refs", "", false, "")
	root.PersistentFlags().StringP("config", "c", "", "")
	root.PersistentFlags().BoolP("global-revisions", "R", false, "")
	root.AddCommand(sub)
	root.SetArgs(append([]string{sub.Use}, args...))
	return root
}

func TestResolveTheme(t *testing.T) {
	theme, err := resolveTheme(false, false)
	require.NoError(t, err)
	assert.Equal(t, terminal.ThemeDark, theme)

	theme, err = resolveTheme(true, false)
	require.NoError(t, err)
	assert.Equal(t, terminal.ThemeLight, theme)

	theme, err = resolveTheme(false, true)
	require.NoError(t, err)
	assert.Equal(t, terminal.ThemeTektronix, theme)
}

func TestResolveTheme_RejectsConflictingFlags(t *testing.T) {
	_, err := resolveTheme(true, true)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "--no-color and --tektronix cannot be used together")
}

func TestConsoleCommand_RejectsConflictingThemeFlags(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "--no-color", "--tektronix")
	err := cmd.Execute()
	require.Error(t, err)
	assert.Contains(t, err.Error(), "--no-color and --tektronix cannot be used together")
}
