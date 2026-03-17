// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

// highlightRange represents a range of lines to highlight in the code view.
type highlightRange struct {
	start int // 1-based start line (inclusive) — the "primary" line for centering
	end   int // 1-based end line (inclusive)
}

const maxBlockSize = 500

// singleLineRange returns a highlightRange covering a single line.
func singleLineRange(line int) highlightRange {
	return highlightRange{start: line, end: line}
}

// computeBlockRange returns the 1-based start and end lines for the highlight range.
// It expands to cover the full YAML/JSON block rooted at changeLn.
// For single-line values (no children), the forward scan finds nothing and
// returns (changeLn, changeLn), so callers don't need to pre-filter by change type.
func computeBlockRange(lines []string, changeLn int) (startLine, endLine int) {
	if changeLn <= 0 || len(lines) == 0 || changeLn > len(lines) {
		return changeLn, changeLn
	}

	// Phase 1 — Backward scan to find the parent key line.
	// changeLn often points to the first child (e.g., "description: OK")
	// rather than the parent key ("200:"). Find the nearest line above
	// with strictly less indent.
	changeIdx := changeLn - 1 // 0-based
	changeIndent := measureIndent(lines[changeIdx])
	keyIdx := changeIdx

	for i := changeIdx - 1; i >= 0; i-- {
		line := lines[i]
		if isBlankOrComment(line) {
			continue
		}
		if measureIndent(line) < changeIndent {
			keyIdx = i
			break
		}
	}

	refIndent := measureIndent(lines[keyIdx])
	startLine = keyIdx + 1 // 1-based

	// Phase 2 — Forward scan from changeLn while indent > refIndent.
	endIdx := changeIdx
	for i := changeIdx + 1; i < len(lines) && (i-keyIdx) < maxBlockSize; i++ {
		line := lines[i]
		if isBlankOrComment(line) {
			// Blank/comment lines within a block don't end it;
			// trailing blanks are trimmed after the scan.
			endIdx = i
			continue
		}
		if measureIndent(line) > refIndent {
			endIdx = i
		} else {
			break
		}
	}

	// Trim trailing blank lines from the range.
	for endIdx > keyIdx && isBlankOrComment(lines[endIdx]) {
		endIdx--
	}

	// Phase 3 — JSON peek-ahead: include closing brace/bracket at refIndent.
	if endIdx+1 < len(lines) {
		next := lines[endIdx+1]
		trimmed := trimLeft(next)
		if len(trimmed) > 0 && measureIndent(next) == refIndent {
			first := trimmed[0]
			if first == '}' || first == ']' {
				endIdx = endIdx + 1
			}
		}
	}

	endLine = endIdx + 1 // 1-based
	if endLine < startLine {
		endLine = startLine
	}
	return startLine, endLine
}

// measureIndent returns the number of leading space/tab bytes.
func measureIndent(line string) int {
	for i := 0; i < len(line); i++ {
		if line[i] != ' ' && line[i] != '\t' {
			return i
		}
	}
	return len(line)
}

// isBlankOrComment returns true if the line is empty, whitespace-only, or a YAML comment.
func isBlankOrComment(line string) bool {
	trimmed := trimLeft(line)
	return len(trimmed) == 0 || trimmed[0] == '#'
}

// trimLeft trims leading spaces and tabs (byte-level, no allocation for ASCII).
func trimLeft(s string) string {
	i := 0
	for i < len(s) && (s[i] == ' ' || s[i] == '\t') {
		i++
	}
	return s[i:]
}
