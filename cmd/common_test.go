// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

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
	assert.Contains(t, err.Error(), "--no-color/--roger-mode and --tektronix cannot be used together")
}

// --- prepareCommandRun ---

func TestPrepareCommandRun_ZeroArgs_PrintsUsageAndReturnsNil(t *testing.T) {
	var usageCalled bool
	sub := &cobra.Command{
		Use: "test",
		RunE: func(cmd *cobra.Command, args []string) error {
			input, err := prepareCommandRun(cmd, args, func(_ terminal.Palette) { usageCalled = true })
			assert.NoError(t, err)
			assert.Nil(t, input)
			assert.True(t, usageCalled)
			return nil
		},
	}
	addTerminalThemeFlags(sub)
	root := testRootCmd(sub)
	require.NoError(t, root.Execute())
}

func TestPrepareCommandRun_NonGitHubURL_ReturnsError(t *testing.T) {
	sub := &cobra.Command{
		Use: "test",
		RunE: func(cmd *cobra.Command, args []string) error {
			_, err := prepareCommandRun(cmd, args, func(_ terminal.Palette) {})
			return err
		},
	}
	addTerminalThemeFlags(sub)
	root := testRootCmd(sub, "https://example.com/foo")
	err := root.Execute()
	require.Error(t, err)
	assert.Contains(t, err.Error(), "github.com URL")
}

func TestPrepareCommandRun_TooManyArgs_ReturnsError(t *testing.T) {
	sub := &cobra.Command{
		Use: "test",
		RunE: func(cmd *cobra.Command, args []string) error {
			_, err := prepareCommandRun(cmd, args, func(_ terminal.Palette) {})
			return err
		},
	}
	addTerminalThemeFlags(sub)
	root := testRootCmd(sub, "a", "b", "c")
	err := root.Execute()
	require.Error(t, err)
	assert.Contains(t, err.Error(), "too many arguments")
}

func TestPrepareCommandRun_BadConfig_ReturnsError(t *testing.T) {
	sub := &cobra.Command{
		Use: "test",
		RunE: func(cmd *cobra.Command, args []string) error {
			_, err := prepareCommandRun(cmd, args, func(_ terminal.Palette) {})
			return err
		},
	}
	addTerminalThemeFlags(sub)
	root := testRootCmd(sub, "--config", "/nonexistent/config.yaml", "file1", "file2")
	err := root.Execute()
	require.Error(t, err)
}

func TestConsoleCommand_RejectsConflictingThemeFlags(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "--no-color", "--tektronix")
	err := cmd.Execute()
	require.Error(t, err)
	assert.Contains(t, err.Error(), "--no-color/--roger-mode and --tektronix cannot be used together")
}

func TestConsoleCommand_RejectsConflictingRogerModeFlag(t *testing.T) {
	cmd := testRootCmd(GetConsoleCommand(), "--no-logo", "--roger-mode", "--tektronix")
	err := cmd.Execute()
	require.Error(t, err)
	assert.Contains(t, err.Error(), "--no-color/--roger-mode and --tektronix cannot be used together")
}
