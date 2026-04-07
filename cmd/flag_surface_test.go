// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"

	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	"github.com/stretchr/testify/assert"
)

func flagNames(cmd *cobra.Command) map[string]bool {
	names := make(map[string]bool)
	cmd.LocalFlags().VisitAll(func(flag *pflag.Flag) {
		names[flag.Name] = true
	})
	return names
}

func TestCanonicalCommandLocalFlags(t *testing.T) {
	assert.Equal(t, map[string]bool{
		"no-color":      true,
		"tektronix":     true,
		"markdown":      true,
		"with-lines":    true,
		"error-on-diff": true,
	}, flagNames(GetSummaryCommand()))

	assert.Equal(t, map[string]bool{
		"no-color":  true,
		"tektronix": true,
	}, flagNames(GetReportCommand()))

	assert.Equal(t, map[string]bool{
		"no-color":     true,
		"tektronix":    true,
		"report-file":  true,
		"include-diff": true,
	}, flagNames(GetMarkdownReportCommand()))

	assert.Equal(t, map[string]bool{
		"no-color":    true,
		"tektronix":   true,
		"report-file": true,
		"no-explorer": true,
	}, flagNames(GetHTMLReportCommand()))

	assert.Equal(t, map[string]bool{
		"no-color":  true,
		"tektronix": true,
	}, flagNames(GetConsoleCommand()))
}

func TestRootPersistentFlagsRemainAvailable(t *testing.T) {
	root := testRootCmd(GetSummaryCommand())
	names := make(map[string]bool)
	root.PersistentFlags().VisitAll(func(flag *pflag.Flag) {
		names[flag.Name] = true
	})

	assert.Equal(t, map[string]bool{
		"no-logo":          true,
		"top":              true,
		"limit":            true,
		"limit-time":       true,
		"base":             true,
		"base-commit":      true,
		"remote":           true,
		"ext-refs":         true,
		"config":           true,
		"global-revisions": true,
	}, names)
}
