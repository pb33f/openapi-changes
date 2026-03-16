// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func ptrInt(n int) *int { return &n }

var testStyles = newConsoleStyles()

func TestRenderDiff_Modified(t *testing.T) {
	newLines := strings.Split("line0\nline1\nline2\nline3\nline4\nline5\nline6\nline7\nline8\nline9\nline10", "\n")
	oldLines := strings.Split("old0\nold1\nold2\nold3\nold4\nold5\nold6\nold7\nold8\nold9\nold10", "\n")

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "description",
		Original:   "old desc",
		New:        "new desc",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(5),
			NewLine:      ptrInt(5),
		},
	}

	result := renderDiff(ch, newLines, oldLines, 140, testStyles)
	assert.Contains(t, result, "Modified")
	assert.Contains(t, result, "description")
	assert.Contains(t, result, "Original")
	assert.Contains(t, result, "Modified")
}

func TestRenderDiff_Added(t *testing.T) {
	newLines := strings.Split("line0\nline1\nline2\nline3\nline4\nline5\nline6\nline7\nline8", "\n")

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "newProp",
		New:        "value",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(3),
		},
	}

	result := renderDiff(ch, newLines, nil, 140, testStyles)
	assert.Contains(t, result, "Added")
	assert.Contains(t, result, "newProp")
}

func TestRenderDiff_Removed(t *testing.T) {
	oldLines := strings.Split("old0\nold1\nold2\nold3\nold4\nold5\nold6\nold7\nold8", "\n")

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyRemoved,
		Property:   "removedProp",
		Original:   "was here",
		Breaking:   true,
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(4),
		},
	}

	result := renderDiff(ch, nil, oldLines, 140, testStyles)
	assert.Contains(t, result, "Removed")
	assert.Contains(t, result, "BREAKING")
	assert.Contains(t, result, "removedProp")
}

func TestRenderDiff_NilChange(t *testing.T) {
	assert.Equal(t, "", renderDiff(nil, nil, nil, 80, testStyles))
}

func TestRenderDiff_NilLineNum(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "test",
		Context:    &whatChangedModel.ChangeContext{},
	}

	result := renderDiff(ch, nil, nil, 80, testStyles)
	assert.Contains(t, result, "no line information")
}

func TestRenderDiff_SideBySideVsStacked(t *testing.T) {
	lines := strings.Split("a\nb\nc\nd\ne\nf\ng\nh\ni\nj", "\n")
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "x",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(5),
			NewLine:      ptrInt(5),
		},
	}

	// Wide terminal → side by side
	wide := renderDiff(ch, lines, lines, 140, testStyles)
	assert.Contains(t, wide, " | ")

	// Narrow terminal → stacked (no side-by-side separator)
	narrow := renderDiff(ch, lines, lines, 80, testStyles)
	// Both "Original" and "Modified" labels should appear
	assert.Contains(t, narrow, "Original")
	assert.Contains(t, narrow, "Modified")
}

func TestRenderDiff_EncodedValues(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType:      whatChangedModel.Modified,
		Property:        "schema",
		Original:        "simple",
		New:             "simple",
		OriginalEncoded: "type: object\nproperties:\n  name: string",
		NewEncoded:      "type: object\nproperties:\n  name: integer",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(1),
			NewLine:      ptrInt(1),
		},
	}

	result := renderDiff(ch, []string{"line"}, []string{"line"}, 140, testStyles)
	// Should prefer encoded values over simple ones
	assert.Contains(t, result, "type: object")
}
