// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestVersionCommand_PrintsVersionOnly(t *testing.T) {
	originalVersion := Version
	Version = "v1.2.3-test"
	t.Cleanup(func() {
		Version = originalVersion
	})

	cmd := testRootCmd(GetVersionCommand())
	output := captureStdout(t, func() {
		require.NoError(t, cmd.Execute())
	})

	assert.Equal(t, "v1.2.3-test\n", output)
}
