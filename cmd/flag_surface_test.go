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
		"markdown":      true,
		"with-lines":    true,
		"error-on-diff": true,
	}, flagNames(GetNewSummaryCommand()))

	assert.Equal(t, map[string]bool{
		"no-color": true,
	}, flagNames(GetNewReportCommand()))

	assert.Equal(t, map[string]bool{
		"no-color":     true,
		"report-file":  true,
		"include-diff": true,
	}, flagNames(GetNewMarkdownReportCommand()))

	assert.Equal(t, map[string]bool{
		"no-color":    true,
		"report-file": true,
		"no-explorer": true,
	}, flagNames(GetNewHTMLReportCommand()))

	assert.Equal(t, map[string]bool{
		"no-color": true,
	}, flagNames(GetNewConsoleCommand()))
}

func TestRootPersistentFlagsRemainAvailable(t *testing.T) {
	root := newTestRootCmd(GetNewSummaryCommand())
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
