// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewCodeModal_BasicRendering(t *testing.T) {
	lines := make([]string, 100)
	for i := range lines {
		lines[i] = "  key: value"
	}

	styles := newConsoleStyles()
	modal := newCodeModal(lines, 50, 120, 40, styles)

	view := modal.View(styles)
	assert.Contains(t, view, "Full Spec")
	assert.Contains(t, view, "line 50")
}

func TestNewCodeModal_HighlightsChangeLine(t *testing.T) {
	lines := []string{
		"openapi: '3.0'",
		"info:",
		"  title: Test",
		"  version: '1.0'",
		"paths: {}",
	}

	styles := newConsoleStyles()
	modal := newCodeModal(lines, 3, 80, 20, styles)

	view := modal.View(styles)
	// The change line should be highlighted with ">"
	assert.True(t, strings.Contains(view, ">"))
}

func TestNewCodeModal_Recenter(t *testing.T) {
	lines := make([]string, 200)
	for i := range lines {
		lines[i] = "content"
	}

	styles := newConsoleStyles()
	modal := newCodeModal(lines, 100, 80, 20, styles)

	// After creation, scroll somewhere else
	modal.vp.SetYOffset(0)

	// Recenter should bring back to change line area
	modal.recenter()
	offset := modal.vp.YOffset()
	// Should be approximately centered on line 100
	assert.Greater(t, offset, 80)
}

func TestNewCodeModal_SmallTerminal(t *testing.T) {
	lines := []string{"a", "b", "c"}
	styles := newConsoleStyles()

	// Very small terminal
	modal := newCodeModal(lines, 2, 30, 10, styles)
	view := modal.View(styles)
	assert.NotEmpty(t, view)
}
