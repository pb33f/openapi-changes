// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func ptrInt(n int) *int { return &n }

var testStyles = newConsoleStyles()

func TestRenderDiff_Modified(t *testing.T) {
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

	result := renderDiff(ch, nil, nil, 140, testStyles)
	assert.Contains(t, result, "Modified")
	assert.Contains(t, result, "description")
	// Value-based: should show property with old/new values
	assert.Contains(t, result, "- description: old desc")
	assert.Contains(t, result, "+ description: new desc")
	// Single-line value diff should NOT have @@ headers
	assert.NotContains(t, result, "@@")
}

func TestRenderDiff_Added(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "newProp",
		New:        "value",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(3),
		},
	}

	result := renderDiff(ch, nil, nil, 140, testStyles)
	assert.Contains(t, result, "Added")
	assert.Contains(t, result, "newProp")
	// Value-based: should show + prefixed property
	assert.Contains(t, result, "+ newProp: value")
}

func TestRenderDiff_Removed(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyRemoved,
		Property:   "removedProp",
		Original:   "was here",
		Breaking:   true,
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(4),
		},
	}

	result := renderDiff(ch, nil, nil, 140, testStyles)
	assert.Contains(t, result, "Removed")
	assert.Contains(t, result, "BREAKING")
	assert.Contains(t, result, "removedProp")
	// Value-based: should show - prefixed property
	assert.Contains(t, result, "- removedProp: was here")
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

	result := renderDiff(ch, nil, nil, 140, testStyles)
	// Should prefer encoded values and show multi-line diff
	assert.Contains(t, result, "type:")
	assert.Contains(t, result, "object")
	assert.Contains(t, result, "-  name: string")
	assert.Contains(t, result, "+  name: integer")
	assert.Contains(t, result, "@@")
}

func TestRenderDiff_MultiLineEncoded(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType:      whatChangedModel.Modified,
		Property:        "schema",
		OriginalEncoded: "type: object\nproperties:\n  name: string",
		NewEncoded:      "type: object\nproperties:\n  name: integer\n  age: integer",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(10),
			NewLine:      ptrInt(10),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "@@")
	// Lines should be properly separated (not concatenated)
	assert.Contains(t, result, "-  name: string")
	assert.Contains(t, result, "+  name: integer")
	assert.Contains(t, result, "+  age: integer")
}

func TestRenderDiff_IdenticalValues(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "test",
		Original:   "same value",
		New:        "same value",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(3),
			NewLine:      ptrInt(3),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "(values are identical)")
}

func TestRenderDiff_YAMLDocMarker(t *testing.T) {
	// YAML --- document marker in encoded values should be preserved
	ch := &whatChangedModel.Change{
		ChangeType:      whatChangedModel.Modified,
		Property:        "schema",
		OriginalEncoded: "---\nopenapi: '3.0.0'\ninfo:\n  title: Old",
		NewEncoded:      "---\nopenapi: '3.0.0'\ninfo:\n  title: New",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(1),
			NewLine:      ptrInt(1),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	// The YAML --- should appear in the diff output
	assert.Contains(t, result, "---")
}

func TestRenderDiff_FallbackToFileRegion(t *testing.T) {
	// Modified with no values but valid line numbers → tier 1 fallback
	oldLines := make([]string, 20)
	newLines := make([]string, 20)
	for i := 0; i < 20; i++ {
		oldLines[i] = fmt.Sprintf("line%d: value", i)
		newLines[i] = fmt.Sprintf("line%d: value", i)
	}
	oldLines[4] = "description: old"
	newLines[4] = "description: new"

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "test",
		// No Original/New/Encoded/Object fields → hasValueData returns false
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(5),
			NewLine:      ptrInt(5),
		},
	}

	result := renderDiff(ch, newLines, oldLines, 120, testStyles)
	// Should fall back to file-region diff with @@ headers
	assert.Contains(t, result, "@@")
	assert.Contains(t, result, "-description: old")
	assert.Contains(t, result, "+description: new")
	// Fallback shows values in header
	assert.NotContains(t, result, "no line information")
}

func TestRenderDiff_OneSidedLabel(t *testing.T) {
	// Added with value: shows value-based rendering, no "Lines N–M:" label
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "prop",
		New:        "val",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(5),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "+ prop: val")
	assert.NotContains(t, result, "Lines")
	assert.NotContains(t, result, "@@")
}

func TestRenderDiff_SingleLineModified(t *testing.T) {
	// Scalar Original/New, no Encoded → two-line diff, no @@
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "version",
		Original:   "1.0.0",
		New:        "2.0.0",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(2),
			NewLine:      ptrInt(2),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "- version: 1.0.0")
	assert.Contains(t, result, "+ version: 2.0.0")
	assert.NotContains(t, result, "@@")
}

func TestRenderDiff_AddedMultiLine(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "schema",
		NewEncoded: "type: object\nproperties:\n  name: string",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(10),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "+ type: object")
	assert.Contains(t, result, "+ properties:")
	assert.Contains(t, result, "+   name: string")
	assert.NotContains(t, result, "@@")
}

func TestRenderDiff_RemovedMultiLine(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType:      whatChangedModel.PropertyRemoved,
		Property:        "schema",
		OriginalEncoded: "type: array\nitems:\n  type: string",
		Breaking:        true,
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(5),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "BREAKING")
	assert.Contains(t, result, "- type: array")
	assert.Contains(t, result, "- items:")
	assert.Contains(t, result, "-   type: string")
	assert.NotContains(t, result, "@@")
}

func TestRenderDiff_EncodedPreferredOverPlain(t *testing.T) {
	ch := &whatChangedModel.Change{
		ChangeType:      whatChangedModel.Modified,
		Property:        "schema",
		Original:        "plain-old",
		New:             "plain-new",
		OriginalEncoded: "encoded: old-value",
		NewEncoded:      "encoded: new-value",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(1),
			NewLine:      ptrInt(1),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	// Should use Encoded content, not plain
	assert.Contains(t, result, "encoded: old-value")
	assert.Contains(t, result, "encoded: new-value")
	assert.NotContains(t, result, "plain-old")
	assert.NotContains(t, result, "plain-new")
}

func TestRenderDiff_EmptyStringValue(t *testing.T) {
	// Added with New: "" but NewObject: "" (non-nil interface) → renders via value path
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "emptyField",
		New:        "",
		NewObject:  "", // non-nil any value
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(5),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	// Should use value path (not fallback)
	assert.Contains(t, result, "+ emptyField:")
	assert.NotContains(t, result, "no line information")
}

func TestRenderDiff_HeaderNoValueDuplication(t *testing.T) {
	// Modified with values → header should NOT show "Original: X -> Y"
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "title",
		Original:   "Old Title",
		New:        "New Title",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(3),
			NewLine:      ptrInt(3),
		},
	}

	result := renderDiff(ch, nil, nil, 140, testStyles)
	assert.NotContains(t, result, "Original:")
	assert.NotContains(t, result, "->")
	// But should show the diff body
	assert.Contains(t, result, "- title: Old Title")
	assert.Contains(t, result, "+ title: New Title")
}

func TestRenderDiff_IdenticalValuesSingleLine(t *testing.T) {
	// Specifically tests the explicit oldVal == newVal check (not difflib empty output)
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "format",
		Original:   "int64",
		New:        "int64",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(10),
			NewLine:      ptrInt(10),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "(values are identical)")
	// Should NOT show diff lines
	assert.NotContains(t, result, "- format:")
	assert.NotContains(t, result, "+ format:")
}

func TestRenderDiff_NoValuesNoLines(t *testing.T) {
	// Modified with all fields empty/nil → tier 2 fallback
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "unknown",
		Context:    &whatChangedModel.ChangeContext{},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "no line information")
}

func TestRenderDiff_FallbackOneSideNil(t *testing.T) {
	// Modified fallback with only NewLine set → renders one-sided + view
	newLines := []string{"line1", "line2", "line3", "line4", "line5"}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "test",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(3),
		},
	}

	result := renderDiff(ch, newLines, nil, 120, testStyles)
	assert.Contains(t, result, "+")
	assert.NotContains(t, result, "no line information")
}

func TestHasValueData(t *testing.T) {
	tests := []struct {
		name   string
		change *whatChangedModel.Change
		want   bool
	}{
		{"original set", &whatChangedModel.Change{Original: "x"}, true},
		{"new set", &whatChangedModel.Change{New: "x"}, true},
		{"original encoded set", &whatChangedModel.Change{OriginalEncoded: "x"}, true},
		{"new encoded set", &whatChangedModel.Change{NewEncoded: "x"}, true},
		{"original object set", &whatChangedModel.Change{OriginalObject: "x"}, true},
		{"new object set", &whatChangedModel.Change{NewObject: ""}, true}, // empty string is non-nil
		{"all empty", &whatChangedModel.Change{}, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.want, hasValueData(tt.change))
		})
	}
}

func TestRenderValueDiff_MultiLineIdentical(t *testing.T) {
	// Multi-line values that are identical → difflib returns empty → "(values are identical)"
	val := "type: object\nproperties:\n  name: string"
	result := renderValueDiff("schema", val, val, testStyles)
	assert.Contains(t, result, "(values are identical)")
}

func TestRenderValueOneSided_SingleLine(t *testing.T) {
	result := renderValueOneSided("prop", "hello", "+", testStyles.added)
	assert.Contains(t, result, "+ prop: hello")
	// Should be single line output
	lines := strings.Split(strings.TrimRight(result, "\n"), "\n")
	assert.Equal(t, 1, len(lines))
}

func TestRenderValueOneSided_MultiLine(t *testing.T) {
	result := renderValueOneSided("prop", "line1\nline2\nline3", "-", testStyles.removed)
	assert.Contains(t, result, "- line1")
	assert.Contains(t, result, "- line2")
	assert.Contains(t, result, "- line3")
}

func TestRenderDiff_ModifiedWithContext(t *testing.T) {
	// When spec lines are provided, the value diff should be followed by spec context
	specLines := make([]string, 30)
	for i := range specLines {
		specLines[i] = fmt.Sprintf("spec-line-%d: content", i)
	}
	specLines[9] = "description: new desc"

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "description",
		Original:   "old desc",
		New:        "new desc",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(10),
			NewLine:      ptrInt(10),
		},
	}

	result := renderDiff(ch, specLines, specLines, 140, testStyles)
	// Value diff at top
	assert.Contains(t, result, "- description: old desc")
	assert.Contains(t, result, "+ description: new desc")
	// Spec context section below
	assert.Contains(t, result, "spec context")
	// Should show surrounding spec lines with line numbers
	assert.Contains(t, result, "spec-line-")
	// The change line should be highlighted with >
	assert.Contains(t, result, ">")
	assert.Contains(t, result, "10|")
}

func TestRenderDiff_AddedWithContext(t *testing.T) {
	specLines := make([]string, 20)
	for i := range specLines {
		specLines[i] = fmt.Sprintf("line-%d: yaml", i)
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "newProp",
		New:        "value",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(5),
		},
	}

	result := renderDiff(ch, specLines, nil, 120, testStyles)
	assert.Contains(t, result, "+ newProp: value")
	assert.Contains(t, result, "spec context")
	assert.Contains(t, result, "line-")
}

func TestRenderDiff_NoContextWhenNoLines(t *testing.T) {
	// When no spec lines provided, no context section should appear
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "description",
		Original:   "old",
		New:        "new",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(5),
			NewLine:      ptrInt(5),
		},
	}

	result := renderDiff(ch, nil, nil, 120, testStyles)
	assert.Contains(t, result, "- description: old")
	assert.Contains(t, result, "+ description: new")
	assert.NotContains(t, result, "spec context")
}

func TestRenderFileContext(t *testing.T) {
	lines := []string{"line0", "line1", "line2", "line3", "line4"}
	center := 3

	result := renderFileContext(lines, &center, 3, testStyles)
	assert.Contains(t, result, "spec context")
	// Line 3 should be highlighted with >
	assert.Contains(t, result, ">")
	assert.Contains(t, result, "3|")
	// Other lines should also appear
	assert.Contains(t, result, "line0")
	assert.Contains(t, result, "line4")
}

func TestRenderFileContext_NilCenter(t *testing.T) {
	lines := []string{"a", "b", "c"}
	result := renderFileContext(lines, nil, 1, testStyles)
	assert.Equal(t, "", result)
}

func TestRenderFileContext_EmptyLines(t *testing.T) {
	center := 1
	result := renderFileContext(nil, &center, 1, testStyles)
	assert.Equal(t, "", result)
}
