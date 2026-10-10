// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"testing"

	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestRootCommand_ZeroArgsHonorsNoLogo(t *testing.T) {
	rootCmd.SetArgs([]string{"--no-logo"})
	t.Cleanup(func() {
		rootCmd.SetArgs(nil)
	})

	output := captureStdout(t, func() {
		require.NoError(t, rootCmd.Execute())
	})

	assert.Contains(t, output, "Current commands")
	assert.Contains(t, output, "completion")
	assert.Contains(t, output, "version")
	assert.NotContains(t, output, "https://pb33f.io/openapi-changes/")
	assert.NotContains(t, output, "@@@@@@@")
}
