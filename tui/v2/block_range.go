// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
)

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

// findChildKeyLine scans forward from parentLn to find a direct child entry matching property.
// parentLn is 1-based. Returns the 1-based line number of the child, or 0 if not found.
func findChildKeyLine(lines []string, parentLn int, property string) int {
	return findChildLine(lines, parentLn, []string{property})
}

// computeChildBlockRange returns the 1-based start and end lines for a child key block.
// childKeyLn is 1-based and must point to the key line itself (no backward scan).
func computeChildBlockRange(lines []string, childKeyLn int) (startLine, endLine int) {
	if childKeyLn <= 0 || len(lines) == 0 || childKeyLn > len(lines) {
		return childKeyLn, childKeyLn
	}

	childIdx := childKeyLn - 1
	childIndent := measureIndent(lines[childIdx])
	startLine = childKeyLn

	// Forward scan: include all lines with indent > childIndent
	endIdx := childIdx
	for i := childIdx + 1; i < len(lines) && (i-childIdx) < maxBlockSize; i++ {
		line := lines[i]
		if isBlankOrComment(line) {
			endIdx = i
			continue
		}
		if measureIndent(line) > childIndent {
			endIdx = i
		} else {
			break
		}
	}

	// Trim trailing blank lines
	for endIdx > childIdx && isBlankOrComment(lines[endIdx]) {
		endIdx--
	}

	// JSON peek-ahead: include closing brace/bracket at childIndent
	if endIdx+1 < len(lines) {
		next := lines[endIdx+1]
		trimmed := trimLeft(next)
		if len(trimmed) > 0 && measureIndent(next) == childIndent {
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

// computeBlockRangeForChange dispatches to the appropriate block range function
// based on change type. For ObjectAdded/ObjectRemoved, it tries to find the
// specific child key line to scope the highlight to just that child block.
func computeBlockRangeForChange(lines []string, changeLn int, ch *whatChangedModel.Change) (int, int) {
	if ch != nil {
		switch ch.ChangeType {
		case whatChangedModel.ObjectAdded, whatChangedModel.ObjectRemoved,
			whatChangedModel.PropertyAdded, whatChangedModel.PropertyRemoved:
			candidates := changeLookupCandidates(ch)
			for line := changeLn; line > 0; {
				if lineMatchesAnyCandidate(lines, line, candidates) {
					return computeChildBlockRange(lines, line)
				}
				if childLn := findChildLine(lines, line, candidates); childLn > 0 {
					return computeChildBlockRange(lines, childLn)
				}
				next := findAncestorLine(lines, line)
				if next <= 0 || next == line {
					break
				}
				line = next
			}
		}
	}
	return computeBlockRange(lines, changeLn)
}

func changeLookupCandidates(ch *whatChangedModel.Change) []string {
	if ch == nil {
		return nil
	}

	seen := make(map[string]struct{}, 3)
	var candidates []string
	add := func(value string) {
		token := normalizeLookupToken(value)
		if token == "" {
			return
		}
		if _, ok := seen[token]; ok {
			return
		}
		seen[token] = struct{}{}
		candidates = append(candidates, token)
	}

	add(ch.Property)
	add(ch.Original)
	add(ch.New)

	return candidates
}

func normalizeLookupToken(value string) string {
	value = strings.TrimSpace(value)
	value = strings.TrimSuffix(value, ",")
	value = strings.TrimSpace(value)
	value = strings.Trim(value, `"'`)
	return strings.ToLower(strings.TrimSpace(value))
}

func lineMatchesAnyCandidate(lines []string, line int, candidates []string) bool {
	if line <= 0 || line > len(lines) || len(candidates) == 0 {
		return false
	}
	token, ok := extractLineToken(lines[line-1])
	if !ok {
		return false
	}
	for _, candidate := range candidates {
		if token == candidate {
			return true
		}
	}
	return false
}

func findChildLine(lines []string, parentLn int, candidates []string) int {
	if parentLn <= 0 || parentLn > len(lines) || len(candidates) == 0 {
		return 0
	}

	parentIdx := parentLn - 1
	parentIndent := measureIndent(lines[parentIdx])
	childIndent := -1

	for i := parentIdx + 1; i < len(lines); i++ {
		line := lines[i]
		if isBlankOrComment(line) {
			continue
		}
		ind := measureIndent(line)
		if ind <= parentIndent {
			break
		}
		if childIndent == -1 {
			childIndent = ind
		}
		if ind != childIndent {
			continue
		}
		if lineMatchesAnyCandidate(lines, i+1, candidates) {
			return i + 1
		}
	}
	return 0
}

func findAncestorLine(lines []string, line int) int {
	if line <= 1 || line > len(lines) {
		return 0
	}

	idx := line - 1
	indent := measureIndent(lines[idx])
	for i := idx - 1; i >= 0; i-- {
		if isBlankOrComment(lines[i]) {
			continue
		}
		if measureIndent(lines[i]) < indent {
			return i + 1
		}
	}
	return 0
}

func extractLineToken(line string) (string, bool) {
	trimmed := trimLeft(line)
	if trimmed == "" {
		return "", false
	}

	if strings.HasPrefix(trimmed, "- ") {
		item := strings.TrimSpace(trimmed[2:])
		if item == "" {
			return "", false
		}
		if colonIdx := strings.IndexByte(item, ':'); colonIdx > 0 {
			return normalizeLookupToken(item[:colonIdx]), true
		}
		return normalizeLookupToken(item), true
	}

	if colonIdx := strings.IndexByte(trimmed, ':'); colonIdx > 0 {
		return normalizeLookupToken(trimmed[:colonIdx]), true
	}

	switch trimmed[0] {
	case '{', '}', '[', ']':
		return "", false
	}

	return normalizeLookupToken(trimmed), true
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
