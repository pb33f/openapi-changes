// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestEnumEditKeepsItsBreakingRemoval(t *testing.T) {
	for name, spec := range map[string]string{
		"asyncapi": `asyncapi: 3.0.0
info:
  title: enum
  version: 1.0.0
channels:
  orders:
    address: orders
    messages:
      created:
        payload:
          type: string
          enum: [a, b]
`,
		"openapi": `openapi: 3.1.0
info:
  title: enum
  version: 1.0.0
paths: {}
components:
  schemas:
    Status:
      type: string
      enum: [a, b]
`,
	} {
		t.Run(name, func(t *testing.T) {
			assertEnumEdit(t, spec)
		})
	}
}

func assertEnumEdit(t *testing.T, spec string) {
	t.Helper()
	dir := t.TempDir()
	left := filepath.Join(dir, "left.yaml")
	right := filepath.Join(dir, "right.yaml")
	require.NoError(t, os.WriteFile(left, []byte(spec), 0o644))
	require.NoError(t, os.WriteFile(right, []byte(strings.Replace(spec, "[a, b]", "[a, c]", 1)), 0o644))

	commits, err := loadLeftRightCommits(left, right, summaryOpts{noColor: true})
	require.NoError(t, err)
	_, outcome, err := generateCompactMarkdown(commits, nil)
	require.NoError(t, err)

	assert.Equal(t, 2, outcome.Total)
	assert.Equal(t, 1, outcome.Breaking)
}
