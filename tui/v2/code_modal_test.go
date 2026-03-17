// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

var testChange = &whatChangedModel.Change{
	ChangeType: whatChangedModel.Modified,
	Property:   "title",
	Original:   "Old",
	New:        "New",
	Context: &whatChangedModel.ChangeContext{
		OriginalLine: ptrInt(50),
		NewLine:      ptrInt(50),
	},
}

func TestNewCodeModal_BasicRendering(t *testing.T) {
	lines := make([]string, 100)
	for i := range lines {
		lines[i] = "  key: value"
	}

	styles := newConsoleStyles()
	modal := newCodeModal(lines, singleLineRange(50), testChange, 120, 40, styles)

	view := modal.View(styles)
	// Diff summary should appear at the top
	assert.Contains(t, view, "Modified: title")
	assert.Contains(t, view, "- title: Old")
	assert.Contains(t, view, "+ title: New")
}

func TestNewCodeModal_HighlightsChangeLine(t *testing.T) {
	lines := []string{
		"openapi: '3.0'",
		"info:",
		"  title: Test",
		"  version: '1.0'",
		"paths: {}",
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "title",
		Context:    &whatChangedModel.ChangeContext{NewLine: ptrInt(3)},
	}

	styles := newConsoleStyles()
	modal := newCodeModal(lines, singleLineRange(3), ch, 80, 20, styles)

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
	modal := newCodeModal(lines, singleLineRange(100), testChange, 80, 20, styles)

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

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "x",
		Context:    &whatChangedModel.ChangeContext{NewLine: ptrInt(2)},
	}

	// Very small terminal
	modal := newCodeModal(lines, singleLineRange(2), ch, 30, 10, styles)
	view := modal.View(styles)
	assert.NotEmpty(t, view)
}

func TestNewCodeModal_RangeHighlight(t *testing.T) {
	lines := []string{
		"openapi: '3.0'",
		"paths:",
		"  /pets:",
		"    get:",
		"      summary: List pets",
		"      responses:",
		"        200:",
		"          description: OK",
		"  /users:",
		"    get:",
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectAdded,
		Property:   "/pets",
		Context:    &whatChangedModel.ChangeContext{NewLine: ptrInt(3)},
	}

	styles := newConsoleStyles()
	hl := highlightRange{start: 3, end: 8}
	modal := newCodeModal(lines, hl, ch, 120, 40, styles)

	view := modal.View(styles)
	// Primary line should have > marker
	assert.Contains(t, view, ">")
	// Body lines should have │ gutter marker
	assert.Contains(t, view, "│")
	// All highlighted lines should appear (keys are ANSI-styled separately)
	assert.Contains(t, view, "/pets:")
	assert.Contains(t, view, "description:")
	assert.Contains(t, view, "OK")
}
