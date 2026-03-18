// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func TestComputeBlockRange_ObjectAdded(t *testing.T) {
	lines := []string{
		"openapi: '3.0'",            // 1
		"paths:",                    // 2
		"  /pets:",                  // 3
		"    get:",                  // 4
		"      summary: List",       // 5
		"      responses:",          // 6
		"        200:",              // 7
		"          description: OK", // 8
		"  /users:",                 // 9
		"    get:",                  // 10
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
		"paths:",                         // 1
		"  /pets:",                       // 2
		"    get:",                       // 3
		"      summary: List pets",       // 4
		"      responses:",               // 5
		"        200:",                   // 6
		"          description: OK",      // 7
		"    put:",                       // 8
		"      summary: Update pet",      // 9
		"      responses:",               // 10
		"        200:",                   // 11
		"          description: Updated", // 12
		"  /users:",                      // 13
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
		"paths:",           // 1
		"  /pets:",         // 2
		"    get:",         // 3
		"",                 // 4 blank
		"      summary: X", // 5
		"  /users:",        // 6
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
		"paths:",           // 1
		"  /pets:",         // 2
		"    get:",         // 3
		"      summary: X", // 4
		"  /users:",        // 5
		"    post:",        // 6
		"      summary: Y", // 7
	}

	// changeLn=6 points to "post:" (child of /users), backward scan should find "/users:" (line 5)
	start, end := computeBlockRange(lines, 6)
	assert.Equal(t, 5, start)
	assert.Equal(t, 7, end)
}

func TestComputeBlockRange_KeyLineInclusion(t *testing.T) {
	lines := []string{
		"responses:",          // 1
		"  200:",              // 2
		"    description: OK", // 3
		"  404:",              // 4
	}

	// changeLn=3 points to "description: OK", backward scan should find "200:" (line 2)
	start, end := computeBlockRange(lines, 3)
	assert.Equal(t, 2, start)
	assert.Equal(t, 3, end)
}

func TestComputeBlockRange_KeyLineSeparatedByBlank(t *testing.T) {
	lines := []string{
		"responses:",          // 1
		"  200:",              // 2
		"",                    // 3 blank
		"    description: OK", // 4
		"  404:",              // 5
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

// --- findChildKeyLine tests ---

func TestFindChildKeyLine_YAML(t *testing.T) {
	lines := []string{
		"paths:",           // 1
		"  /pet:",          // 2
		"    put:",         // 3
		"      summary: U", // 4
		"    post:",        // 5
		"      summary: C", // 6
		"    get:",         // 7
		"      summary: R", // 8
	}

	// parentLn=2 (/pet:), looking for "post"
	got := findChildKeyLine(lines, 2, "post")
	assert.Equal(t, 5, got)
}

func TestFindChildKeyLine_JSON(t *testing.T) {
	lines := []string{
		`{`,                 // 1
		`  "paths": {`,      // 2
		`    "/pet": {`,     // 3
		`      "put": {},`,  // 4
		`      "post": {},`, // 5
		`      "get": {}`,   // 6
		`    }`,             // 7
		`  }`,               // 8
		`}`,                 // 9
	}

	// parentLn=3 ("/pet"), looking for "post"
	got := findChildKeyLine(lines, 3, "post")
	assert.Equal(t, 5, got)
}

func TestFindChildKeyLine_NotFound(t *testing.T) {
	lines := []string{
		"paths:",   // 1
		"  /pet:",  // 2
		"    get:", // 3
		"    put:", // 4
	}

	got := findChildKeyLine(lines, 2, "delete")
	assert.Equal(t, 0, got)
}

func TestFindChildKeyLine_StopsAtParentScope(t *testing.T) {
	lines := []string{
		"paths:",    // 1
		"  /pet:",   // 2
		"    get:",  // 3
		"  /users:", // 4
		"    post:", // 5
	}

	// Looking for "post" under /pet — should NOT find it under /users
	got := findChildKeyLine(lines, 2, "post")
	assert.Equal(t, 0, got)
}

func TestFindChildKeyLine_CaseInsensitive(t *testing.T) {
	lines := []string{
		"responses:",          // 1
		"  200:",              // 2
		"    description: OK", // 3
		"  404:",              // 4
		"    description: NF", // 5
	}

	got := findChildKeyLine(lines, 1, "404")
	assert.Equal(t, 4, got)
}

func TestFindChildKeyLine_InvalidInputs(t *testing.T) {
	lines := []string{"a:", "  b: c"}
	assert.Equal(t, 0, findChildKeyLine(lines, 0, "b"))
	assert.Equal(t, 0, findChildKeyLine(lines, 1, ""))
	assert.Equal(t, 0, findChildKeyLine(nil, 1, "b"))
}

// --- computeChildBlockRange tests ---

func TestComputeChildBlockRange_SingleVerb(t *testing.T) {
	lines := []string{
		"paths:",               // 1
		"  /pet:",              // 2
		"    put:",             // 3
		"      summary: U",     // 4
		"    post:",            // 5
		"      summary: C",     // 6
		"      description: D", // 7
		"    get:",             // 8
		"      summary: R",     // 9
	}

	// childKeyLn=5 (post:)
	s, e := computeChildBlockRange(lines, 5)
	assert.Equal(t, 5, s)
	assert.Equal(t, 7, e)
}

func TestComputeChildBlockRange_WithChildren(t *testing.T) {
	lines := []string{
		"paths:",             // 1
		"  /pet:",            // 2
		"    post:",          // 3
		"      summary: C",   // 4
		"      responses:",   // 5
		"        200:",       // 6
		"          desc: OK", // 7
		"    get:",           // 8
	}

	s, e := computeChildBlockRange(lines, 3)
	assert.Equal(t, 3, s)
	assert.Equal(t, 7, e)
}

func TestComputeChildBlockRange_JSONBrace(t *testing.T) {
	lines := []string{
		`  "paths": {`,           // 1
		`    "/pet": {`,          // 2
		`      "post": {`,        // 3
		`        "summary": "C"`, // 4
		`      },`,               // 5
		`      "get": {}`,        // 6
		`    }`,                  // 7
		`  }`,                    // 8
	}

	s, e := computeChildBlockRange(lines, 3)
	assert.Equal(t, 3, s)
	assert.Equal(t, 5, e) // includes closing }
}

func TestComputeChildBlockRange_EndOfFile(t *testing.T) {
	lines := []string{
		"paths:",           // 1
		"  /pet:",          // 2
		"    delete:",      // 3
		"      summary: D", // 4
	}

	s, e := computeChildBlockRange(lines, 3)
	assert.Equal(t, 3, s)
	assert.Equal(t, 4, e)
}

func TestComputeChildBlockRange_SingleLine(t *testing.T) {
	lines := []string{
		"paths:",       // 1
		"  /pet:",      // 2
		"    get: {}",  // 3
		"    post: {}", // 4
	}

	s, e := computeChildBlockRange(lines, 3)
	assert.Equal(t, 3, s)
	assert.Equal(t, 3, e)
}

func TestComputeChildBlockRange_InvalidInputs(t *testing.T) {
	s, e := computeChildBlockRange(nil, 1)
	assert.Equal(t, 1, s)
	assert.Equal(t, 1, e)

	s, e = computeChildBlockRange([]string{"a"}, 0)
	assert.Equal(t, 0, s)
	assert.Equal(t, 0, e)
}

// --- computeBlockRangeForChange tests ---

func TestComputeBlockRangeForChange_ObjectRemoved(t *testing.T) {
	lines := []string{
		"paths:",               // 1
		"  /pet:",              // 2
		"    put:",             // 3
		"      summary: U",     // 4
		"    post:",            // 5
		"      summary: C",     // 6
		"      description: D", // 7
		"    get:",             // 8
		"      summary: R",     // 9
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectRemoved,
		Property:   "post",
	}

	// changeLn=2 points to /pet: (the parent), but we should scope to just "post:"
	s, e := computeBlockRangeForChange(lines, 2, ch)
	assert.Equal(t, 5, s)
	assert.Equal(t, 7, e)
}

func TestComputeBlockRangeForChange_ObjectAdded(t *testing.T) {
	lines := []string{
		"paths:",           // 1
		"  /pet:",          // 2
		"    get:",         // 3
		"      summary: R", // 4
		"    patch:",       // 5
		"      summary: P", // 6
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectAdded,
		Property:   "patch",
	}

	s, e := computeBlockRangeForChange(lines, 2, ch)
	assert.Equal(t, 5, s)
	assert.Equal(t, 6, e)
}

func TestComputeBlockRangeForChange_Modified(t *testing.T) {
	lines := []string{
		"info:",
		"  title: Test",
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "title",
	}

	// Modified changes should find the specific property line, not the parent block
	s, e := computeBlockRangeForChange(lines, 2, ch)
	assert.Equal(t, 2, s)
	assert.Equal(t, 2, e)
}

func TestComputeBlockRangeForChange_ChildNotFound_Fallback(t *testing.T) {
	lines := []string{
		"paths:",           // 1
		"  /pet:",          // 2
		"    get:",         // 3
		"      summary: R", // 4
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectRemoved,
		Property:   "delete", // doesn't exist in the lines
	}

	// Should fall back to computeBlockRange
	s, e := computeBlockRangeForChange(lines, 2, ch)
	sExpected, eExpected := computeBlockRange(lines, 2)
	assert.Equal(t, sExpected, s)
	assert.Equal(t, eExpected, e)
}

func TestComputeBlockRangeForChange_NilChange(t *testing.T) {
	lines := []string{
		"info:",
		"  title: Test",
	}

	s, e := computeBlockRangeForChange(lines, 2, nil)
	sExpected, eExpected := computeBlockRange(lines, 2)
	assert.Equal(t, sExpected, s)
	assert.Equal(t, eExpected, e)
}

func TestComputeBlockRangeForChange_ResponseCodes(t *testing.T) {
	lines := []string{
		"responses:",           // 1
		"  200:",               // 2
		"    description: OK",  // 3
		"  400:",               // 4
		"    description: Bad", // 5
		"  404:",               // 6
		"    description: NF",  // 7
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectRemoved,
		Property:   "404",
	}

	// changeLn=1 points to "responses:" (the parent)
	s, e := computeBlockRangeForChange(lines, 1, ch)
	assert.Equal(t, 6, s)
	assert.Equal(t, 7, e)
}

func TestComputeBlockRangeForChange_ResponseCodes_SemanticPropertyOnChildLine(t *testing.T) {
	lines := []string{
		`        "responses": {`,                       // 1
		`          "200": {`,                           // 2
		`            "description": "successful",`,     // 3
		`            "content": {`,                     // 4
		`              "application/json": {}`,         // 5
		`            }`,                                // 6
		`          },`,                                 // 7
		`          "400": {`,                           // 8
		`            "description": "Invalid ID"`,      // 9
		`          },`,                                 // 10
		`          "404": {`,                           // 11
		`            "description": "Order not found"`, // 12
		`          }`,                                  // 13
		`        }`,                                    // 14
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectRemoved,
		Property:   "codes",
		Original:   "404",
	}

	s, e := computeBlockRangeForChange(lines, 11, ch)
	assert.Equal(t, 11, s)
	assert.Equal(t, 13, e)
}

func TestComputeBlockRangeForChange_ResponseCodes_SemanticPropertyOnParentLine(t *testing.T) {
	lines := []string{
		`        "responses": {`,                       // 1
		`          "200": {`,                           // 2
		`            "description": "successful",`,     // 3
		`          },`,                                 // 4
		`          "400": {`,                           // 5
		`            "description": "Invalid ID"`,      // 6
		`          },`,                                 // 7
		`          "404": {`,                           // 8
		`            "description": "Order not found"`, // 9
		`          }`,                                  // 10
		`        }`,                                    // 11
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectRemoved,
		Property:   "codes",
		Original:   "404",
	}

	s, e := computeBlockRangeForChange(lines, 1, ch)
	assert.Equal(t, 8, s)
	assert.Equal(t, 10, e)
}

func TestComputeBlockRangeForChange_PropertyRemoved_UsesKeyLine(t *testing.T) {
	lines := []string{
		"paths:",               // 1
		"  /pet:",              // 2
		"    put:",             // 3
		"      summary: U",     // 4
		"    post:",            // 5
		"      summary: C",     // 6
		"      description: D", // 7
		"    get:",             // 8
		"      summary: R",     // 9
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyRemoved,
		Property:   "post",
	}

	s, e := computeBlockRangeForChange(lines, 5, ch)
	assert.Equal(t, 5, s)
	assert.Equal(t, 7, e)
}

func TestComputeBlockRangeForChange_SchemaProperties_SemanticProperty(t *testing.T) {
	lines := []string{
		`        "properties": {`,         // 1
		`          "id": {`,               // 2
		`            "type": "integer"`,   // 3
		`          },`,                    // 4
		`          "name": {`,             // 5
		`            "type": "string",`,   // 6
		`            "example": "doggie"`, // 7
		`          },`,                    // 8
		`          "photoUrls": {`,        // 9
		`            "type": "array"`,     // 10
		`          }`,                     // 11
		`        }`,                       // 12
	}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectRemoved,
		Property:   "properties",
		Original:   "name",
	}

	s, e := computeBlockRangeForChange(lines, 5, ch)
	assert.Equal(t, 5, s)
	assert.Equal(t, 8, e)
}
