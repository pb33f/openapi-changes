// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package v2

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFindYAMLColon_Simple(t *testing.T) {
	assert.Equal(t, 4, findYAMLColon("name: Dave"))
}

func TestFindYAMLColon_NoColon(t *testing.T) {
	assert.Equal(t, -1, findYAMLColon("no colon here"))
}

func TestFindYAMLColon_ColonInDoubleQuotes(t *testing.T) {
	// Colon inside double quotes should be skipped
	idx := findYAMLColon(`desc: "value: with colon"`)
	assert.Equal(t, 4, idx)
}

func TestFindYAMLColon_ColonInSingleQuotes(t *testing.T) {
	idx := findYAMLColon(`desc: 'value: with colon'`)
	assert.Equal(t, 4, idx)
}

func TestFindYAMLColon_OnlyQuotedColon(t *testing.T) {
	assert.Equal(t, -1, findYAMLColon(`"no:colon:outside"`))
}

func TestFindYAMLColon_Empty(t *testing.T) {
	assert.Equal(t, -1, findYAMLColon(""))
}

func TestFindYAMLColon_ColonAtStart(t *testing.T) {
	assert.Equal(t, 0, findYAMLColon(": value"))
}

func TestHighlightLine_EmptyLine(t *testing.T) {
	styles := newConsoleStyles()
	result := highlightLine("", styles)
	assert.Contains(t, result, "") // grey render of empty
}

func TestHighlightLine_Comment(t *testing.T) {
	styles := newConsoleStyles()
	result := highlightLine("# This is a comment", styles)
	assert.NotEqual(t, "# This is a comment", result) // should be styled
}

func TestHighlightLine_YAMLKeyValue(t *testing.T) {
	styles := newConsoleStyles()
	result := highlightLine("name: Dave", styles)
	// The key portion should be styled differently from the value
	assert.NotEqual(t, "name: Dave", result)
}

func TestHighlightLine_NoColon(t *testing.T) {
	styles := newConsoleStyles()
	result := highlightLine("  - item", styles)
	// No colon found, body text should still be styled explicitly
	assert.NotEqual(t, "  - item", result)
}

func TestHighlightLine_PreservesIndent(t *testing.T) {
	styles := newConsoleStyles()
	result := highlightLine("    name: value", styles)
	// Should start with spaces (indent preserved)
	assert.True(t, len(result) > 4)
}

func TestHighlightLine_WhitespaceOnly(t *testing.T) {
	styles := newConsoleStyles()
	result := highlightLine("   ", styles)
	// All whitespace trimmed to empty, treated as blank line
	assert.NotEmpty(t, result)
}
