// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestComputeBlockRange_ObjectAdded(t *testing.T) {
	lines := []string{
		"openapi: '3.0'",    // 1
		"paths:",             // 2
		"  /pets:",           // 3
		"    get:",           // 4
		"      summary: List", // 5
		"      responses:",   // 6
		"        200:",       // 7
		"          description: OK", // 8
		"  /users:",          // 9
		"    get:",           // 10
	}

	// changeLn points to the first child line (line 4: "get:")
	start, end := computeBlockRange(lines, 4)
	// Should expand backward to the parent key "/pets:" (line 3) and forward through line 8
	assert.Equal(t, 3, start)
	assert.Equal(t, 8, end)
}

func TestComputeBlockRange_PropertyAdded_SingleLine(t *testing.T) {
	lines := []string{
		"info:",
		"  title: Test",
		"  description: Added",
	}

	// Single-line scalar property — backward scan finds parent "info:" (line 1),
	// forward scan covers all children at deeper indent.
	start, end := computeBlockRange(lines, 3)
	assert.Equal(t, 1, start)
	assert.Equal(t, 3, end)
}

func TestComputeBlockRange_PropertyAdded_MultiLine(t *testing.T) {
	// PropertyAdded for a multi-line block (e.g., adding a new operation)
	lines := []string{
		"paths:",            // 1
		"  /pets:",          // 2
		"    get:",          // 3
		"      summary: List pets", // 4
		"      responses:",  // 5
		"        200:",      // 6
		"          description: OK", // 7
		"    put:",          // 8
		"      summary: Update pet", // 9
		"      responses:",  // 10
		"        200:",      // 11
		"          description: Updated", // 12
		"  /users:",         // 13
	}

	// changeLn=9 points to "summary: Update pet" (child of "put:")
	// Should expand backward to "put:" (line 8) and forward through line 12
	start, end := computeBlockRange(lines, 9)
	assert.Equal(t, 8, start)
	assert.Equal(t, 12, end)
}

func TestComputeBlockRange_Modified(t *testing.T) {
	lines := []string{
		"info:",
		"  title: Test",
	}

	// Backward scan finds parent "info:" (line 1), forward scan covers child.
	start, end := computeBlockRange(lines, 2)
	assert.Equal(t, 1, start)
	assert.Equal(t, 2, end)
}

func TestComputeBlockRange_EmptyLines(t *testing.T) {
	// nil/empty input
	start, end := computeBlockRange(nil, 1)
	assert.Equal(t, 1, start)
	assert.Equal(t, 1, end)

	start, end = computeBlockRange([]string{}, 1)
	assert.Equal(t, 1, start)
	assert.Equal(t, 1, end)
}

func TestComputeBlockRange_BlankLinesInBlock(t *testing.T) {
	lines := []string{
		"paths:",          // 1
		"  /pets:",        // 2
		"    get:",        // 3
		"",                // 4 blank
		"      summary: X", // 5
		"  /users:",       // 6
	}

	start, end := computeBlockRange(lines, 3)
	assert.Equal(t, 2, start)
	assert.Equal(t, 5, end)
}

func TestComputeBlockRange_EndOfFile(t *testing.T) {
	lines := []string{
		"paths:",
		"  /pets:",
		"    get:",
		"      summary: List",
	}

	start, end := computeBlockRange(lines, 3)
	assert.Equal(t, 2, start)
	assert.Equal(t, 4, end)
}

func TestComputeBlockRange_JSONClosingBrace(t *testing.T) {
	lines := []string{
		`{`,               // 1
		`  "paths": {`,    // 2
		`    "/pets": {`,  // 3
		`      "get": {}`, // 4
		`    }`,           // 5
		`  }`,             // 6
		`}`,               // 7
	}

	start, end := computeBlockRange(lines, 4)
	// Should backward-scan to "/pets" (line 3), forward through "get" (line 4),
	// then peek-ahead to include closing "}" (line 5)
	assert.Equal(t, 3, start)
	assert.Equal(t, 5, end)
}

func TestComputeBlockRange_SingleLineObject(t *testing.T) {
	lines := []string{
		"paths:",
		"  /pets: {}",
		"  /users:",
	}

	// When changeLn IS the key line with no children, the backward scan
	// finds the parent "paths:" and the forward scan includes siblings.
	// This is slightly over-inclusive for single-line objects but acceptable
	// since multi-line ObjectAdded (the primary use case) works correctly.
	start, end := computeBlockRange(lines, 2)
	assert.Equal(t, 1, start) // includes parent "paths:"
	assert.Equal(t, 3, end)   // includes sibling "/users:"
}

func TestComputeBlockRange_SiblingAbove(t *testing.T) {
	// changeLn-1 is the last child of a PREVIOUS sibling, not the parent
	lines := []string{
		"paths:",            // 1
		"  /pets:",          // 2
		"    get:",          // 3
		"      summary: X",  // 4
		"  /users:",         // 5
		"    post:",         // 6
		"      summary: Y",  // 7
	}

	// changeLn=6 points to "post:" (child of /users), backward scan should find "/users:" (line 5)
	start, end := computeBlockRange(lines, 6)
	assert.Equal(t, 5, start)
	assert.Equal(t, 7, end)
}

func TestComputeBlockRange_KeyLineInclusion(t *testing.T) {
	lines := []string{
		"responses:",     // 1
		"  200:",         // 2
		"    description: OK", // 3
		"  404:",         // 4
	}

	// changeLn=3 points to "description: OK", backward scan should find "200:" (line 2)
	start, end := computeBlockRange(lines, 3)
	assert.Equal(t, 2, start)
	assert.Equal(t, 3, end)
}

func TestComputeBlockRange_KeyLineSeparatedByBlank(t *testing.T) {
	lines := []string{
		"responses:",     // 1
		"  200:",         // 2
		"",               // 3 blank
		"    description: OK", // 4
		"  404:",         // 5
	}

	// changeLn=4, backward scan should skip blank and find "200:" (line 2)
	start, end := computeBlockRange(lines, 4)
	assert.Equal(t, 2, start)
	assert.Equal(t, 4, end)
}

func TestComputeBlockRange_MaxBlockSize(t *testing.T) {
	lines := make([]string, 600)
	lines[0] = "root:"
	lines[1] = "  key:"
	for i := 2; i < 600; i++ {
		lines[i] = fmt.Sprintf("    line%d: value", i)
	}

	start, end := computeBlockRange(lines, 3)
	assert.Equal(t, 2, start)
	// Should cap at maxBlockSize (500) lines from key line
	assert.LessOrEqual(t, end-start+1, maxBlockSize+1)
}

func TestMeasureIndent(t *testing.T) {
	assert.Equal(t, 0, measureIndent("hello"))
	assert.Equal(t, 2, measureIndent("  hello"))
	assert.Equal(t, 4, measureIndent("    hello"))
	assert.Equal(t, 1, measureIndent("\thello"))
	assert.Equal(t, 0, measureIndent(""))
	assert.Equal(t, 3, measureIndent("   ")) // all whitespace
}

func TestComputeBlockRange_InvalidInputs(t *testing.T) {
	lines := []string{"a", "b", "c"}

	// changeLn = 0 (invalid)
	start, end := computeBlockRange(lines, 0)
	assert.Equal(t, 0, start)
	assert.Equal(t, 0, end)

	// changeLn beyond end
	start, end = computeBlockRange(lines, 10)
	assert.Equal(t, 10, start)
	assert.Equal(t, 10, end)
}
