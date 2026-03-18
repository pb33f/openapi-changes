// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"charm.land/lipgloss/v2"
	"github.com/pmezard/go-difflib/difflib"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
)

const (
	regionRadius  = 5   // lines above/below change to extract for file-region fallback diffing
	contextBefore = 5   // lines above change for spec context view
	contextAfter  = 120 // lines below change for spec context view
	diffContext   = 3   // context lines in unified diff output
)

var hunkHeaderRe = regexp.MustCompile(`@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@`)

// hasValueData returns true if the Change carries authoritative value data
// (Original/New/OriginalEncoded/NewEncoded or their object counterparts).
func hasValueData(ch *whatChangedModel.Change) bool {
	return ch.OriginalObject != nil || ch.NewObject != nil ||
		ch.Original != "" || ch.New != "" ||
		ch.OriginalEncoded != "" || ch.NewEncoded != ""
}

// resolveOldValue returns the best available old value, preferring Encoded.
func resolveOldValue(ch *whatChangedModel.Change) string {
	if ch.OriginalEncoded != "" {
		return ch.OriginalEncoded
	}
	return ch.Original
}

// resolveNewValue returns the best available new value, preferring Encoded.
func resolveNewValue(ch *whatChangedModel.Change) string {
	if ch.NewEncoded != "" {
		return ch.NewEncoded
	}
	return ch.New
}

// renderDiff renders a diff card for a single change.
// newLines/oldLines are pre-split spec lines from the cache.
// The value diff is shown first, then the surrounding spec context.
func renderDiff(ch *whatChangedModel.Change, newLines, oldLines []string, width int, styles consoleStyles) string {
	if ch == nil {
		return ""
	}

	var sb strings.Builder
	sb.Grow(width * 40)

	switch ch.ChangeType {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		if hasValueData(ch) {
			sb.WriteString(renderDiffHeader(ch, width, styles, false))
			val := resolveNewValue(ch)
			sb.WriteString(renderValueOneSided(ch.Property, val, "+", styles.added))
			if ch.Context != nil && ch.Context.NewLine != nil {
				s, e := computeBlockRangeForChange(newLines, *ch.Context.NewLine, ch)
				hl := highlightRange{start: s, end: e}
				sb.WriteString(renderFileContext(newLines, ch.Context.NewLine, hl, ch.ChangeType, width, styles))
			}
		} else if ch.Context != nil && ch.Context.NewLine != nil {
			sb.WriteString(renderDiffHeader(ch, width, styles, true))
			region, start := extractRegion(newLines, ch.Context.NewLine, regionRadius)
			if region == nil {
				sb.WriteString(styles.grey.Render("  Added: no line information"))
			} else {
				sb.WriteString(renderOneSided(region, start, "+", styles.added, styles))
			}
		} else {
			sb.WriteString(renderDiffHeader(ch, width, styles, true))
			sb.WriteString(styles.grey.Render("  Added: no line information"))
		}

	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		if hasValueData(ch) {
			sb.WriteString(renderDiffHeader(ch, width, styles, false))
			val := resolveOldValue(ch)
			sb.WriteString(renderValueOneSided(ch.Property, val, "-", styles.removed))
			if ch.Context != nil && ch.Context.OriginalLine != nil {
				s, e := computeBlockRangeForChange(oldLines, *ch.Context.OriginalLine, ch)
				hl := highlightRange{start: s, end: e}
				sb.WriteString(renderFileContext(oldLines, ch.Context.OriginalLine, hl, ch.ChangeType, width, styles))
			}
		} else if ch.Context != nil && ch.Context.OriginalLine != nil {
			sb.WriteString(renderDiffHeader(ch, width, styles, true))
			region, start := extractRegion(oldLines, ch.Context.OriginalLine, regionRadius)
			if region == nil {
				sb.WriteString(styles.grey.Render("  Removed: no line information"))
			} else {
				sb.WriteString(renderOneSided(region, start, "-", styles.removed, styles))
			}
		} else {
			sb.WriteString(renderDiffHeader(ch, width, styles, true))
			sb.WriteString(styles.grey.Render("  Removed: no line information"))
		}

	case whatChangedModel.Modified:
		if hasValueData(ch) {
			sb.WriteString(renderDiffHeader(ch, width, styles, false))
			oldVal := resolveOldValue(ch)
			newVal := resolveNewValue(ch)
			sb.WriteString(renderValueDiff(ch.Property, oldVal, newVal, styles))
			if ch.Context != nil && ch.Context.NewLine != nil {
				hl := singleLineRange(*ch.Context.NewLine)
				sb.WriteString(renderFileContext(newLines, ch.Context.NewLine, hl, ch.ChangeType, width, styles))
			}
		} else if ch.Context != nil &&
			(ch.Context.OriginalLine != nil || ch.Context.NewLine != nil) {
			// Tier 1 fallback: file-region diffing
			sb.WriteString(renderDiffHeader(ch, width, styles, true))
			oldRegion, oldStart := extractRegion(oldLines, ch.Context.OriginalLine, regionRadius)
			newRegion, newStart := extractRegion(newLines, ch.Context.NewLine, regionRadius)
			if oldRegion == nil && newRegion == nil {
				sb.WriteString(styles.grey.Render("  no line information"))
			} else if oldRegion == nil {
				sb.WriteString(renderOneSided(newRegion, newStart, "+", styles.added, styles))
			} else if newRegion == nil {
				sb.WriteString(renderOneSided(oldRegion, oldStart, "-", styles.removed, styles))
			} else {
				sb.WriteString(renderUnifiedDiff(oldRegion, newRegion, oldStart, newStart, styles))
			}
		} else {
			// Tier 2 fallback: nothing available
			sb.WriteString(renderDiffHeader(ch, width, styles, true))
			sb.WriteString(styles.grey.Render("  no line information"))
		}

	default:
		sb.WriteString(renderDiffHeader(ch, width, styles, true))
		sb.WriteByte('\n')
		sb.WriteString(styles.grey.Render("  Unknown change type"))
	}

	return sb.String()
}

// renderFileContext renders a region of the spec file around the change line,
// with YAML highlighting. Lines in hl.start..hl.end are highlighted using
// change-type-specific styles: green for added, red for removed, pink for modified.
func renderFileContext(lines []string, centerLine *int, hl highlightRange, changeType, width int, styles consoleStyles) string {
	if centerLine == nil || len(lines) == 0 {
		return ""
	}

	idx := *centerLine - 1
	if idx < 0 {
		idx = 0
	}

	// Extend the region to include the full highlight range with a little context.
	beforeStart := contextBefore
	if hl.start > 0 {
		desiredStart := hl.start - 3
		if desiredStart < 1 {
			desiredStart = 1
		}
		neededBefore := idx - (desiredStart - 1)
		if neededBefore > beforeStart {
			beforeStart = neededBefore
		}
	}

	afterEnd := contextAfter
	if hl.end > 0 {
		neededAfter := hl.end + 3 - (idx + 1)
		if neededAfter > afterEnd {
			afterEnd = neededAfter
		}
	}
	start, end := clampRange(idx, beforeStart, afterEnd, len(lines))
	if start >= end {
		return ""
	}
	region := lines[start:end]
	startOffset := start

	// Pick styles and gutter chars based on change type.
	primaryStyle, rangeStyle, bodyGutter := contextHighlightStyles(changeType, styles)

	var sb strings.Builder
	sb.WriteByte('\n')
	sb.WriteString(styles.grey.Render("  ── spec context ──"))
	sb.WriteByte('\n')

	lastLine := startOffset + len(region)
	numWidth := digitCount(lastLine)

	for i, line := range region {
		lineNo := startOffset + i + 1
		numStr := fmt.Sprintf("%*d", numWidth, lineNo)

		if lineNo == hl.start {
			// Primary line — bold with > arrow.
			content := fmt.Sprintf("  > %s │ %s", numStr, line)
			if pad := width - visualLen(content); pad > 0 {
				content += strings.Repeat(" ", pad)
			}
			sb.WriteString(primaryStyle.Render(content))
		} else if lineNo > hl.start && lineNo <= hl.end {
			// Body line — gutter marker (+/-/│) before line number.
			content := fmt.Sprintf("  %s %s │ %s", bodyGutter, numStr, line)
			if pad := width - visualLen(content); pad > 0 {
				content += strings.Repeat(" ", pad)
			}
			sb.WriteString(rangeStyle.Render(content))
		} else {
			// Normal context line
			sb.WriteString(fmt.Sprintf("  %s %s %s %s",
				styles.grey.Render(" "),
				styles.grey.Render(numStr),
				styles.grey.Render("│"),
				highlightLine(line, styles)))
		}
		sb.WriteByte('\n')
	}
	return sb.String()
}

// contextHighlightStyles returns the primary/range styles and body gutter char
// for a given change type.
func contextHighlightStyles(changeType int, styles consoleStyles) (primary, rangeS lipgloss.Style, gutter string) {
	switch changeType {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		return styles.addedRow, styles.addedRange, "+"
	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		return styles.removedRow, styles.removedRange, "-"
	default:
		return styles.selectedRow, styles.rangeHighlight, "│"
	}
}

// renderDiffSummary renders the diff header and value diff for a change,
// without spec context. Used as a fixed header in the code modal.
func renderDiffSummary(ch *whatChangedModel.Change, width int, styles consoleStyles) string {
	if ch == nil {
		return ""
	}
	var sb strings.Builder
	sb.WriteString(renderDiffHeader(ch, width, styles, false))

	switch ch.ChangeType {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		if hasValueData(ch) {
			val := resolveNewValue(ch)
			sb.WriteString(renderValueOneSided(ch.Property, val, "+", styles.added))
		}
	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		if hasValueData(ch) {
			val := resolveOldValue(ch)
			sb.WriteString(renderValueOneSided(ch.Property, val, "-", styles.removed))
		}
	case whatChangedModel.Modified:
		if hasValueData(ch) {
			oldVal := resolveOldValue(ch)
			newVal := resolveNewValue(ch)
			sb.WriteString(renderValueDiff(ch.Property, oldVal, newVal, styles))
		}
	}
	return sb.String()
}

// renderValueDiff renders a diff of the change's own values (primary path for Modified).
func renderValueDiff(property, oldVal, newVal string, styles consoleStyles) string {
	var sb strings.Builder

	isMultiOld := strings.Contains(oldVal, "\n")
	isMultiNew := strings.Contains(newVal, "\n")

	if !isMultiOld && !isMultiNew {
		// Single-line path
		if oldVal == newVal {
			sb.WriteString(styles.grey.Render("  (values are identical)"))
			sb.WriteByte('\n')
			return sb.String()
		}
		sb.WriteString(styles.removed.Render(fmt.Sprintf("  - %s: %s", property, oldVal)))
		sb.WriteByte('\n')
		sb.WriteString(styles.added.Render(fmt.Sprintf("  + %s: %s", property, newVal)))
		sb.WriteByte('\n')
		return sb.String()
	}

	// Multi-line path: use difflib
	diff, err := difflib.GetUnifiedDiffString(difflib.UnifiedDiff{
		A:       appendNewlines(strings.Split(oldVal, "\n")),
		B:       appendNewlines(strings.Split(newVal, "\n")),
		Context: diffContext,
	})
	if err != nil || diff == "" {
		sb.WriteString(styles.grey.Render("  (values are identical)"))
		sb.WriteByte('\n')
		return sb.String()
	}

	for _, line := range strings.Split(strings.TrimRight(diff, "\n"), "\n") {
		if hunkHeaderRe.MatchString(line) {
			// Line numbers are already 1-based relative to the value — no rewriting needed
			sb.WriteString(styles.grey.Render("  " + line))
		} else if strings.HasPrefix(line, "-") {
			sb.WriteString(styles.removed.Render("  " + line))
		} else if strings.HasPrefix(line, "+") {
			sb.WriteString(styles.added.Render("  " + line))
		} else {
			sb.WriteString("  " + highlightLine(strings.TrimPrefix(line, " "), styles))
		}
		sb.WriteByte('\n')
	}
	return sb.String()
}

// renderValueOneSided renders a one-sided view of a change's value (primary path for Added/Removed).
func renderValueOneSided(property, val, prefix string, style lipgloss.Style) string {
	var sb strings.Builder

	if !strings.Contains(val, "\n") {
		// Single-line
		sb.WriteString(style.Render(fmt.Sprintf("  %s %s: %s", prefix, property, val)))
		sb.WriteByte('\n')
		return sb.String()
	}

	// Multi-line
	for _, line := range strings.Split(val, "\n") {
		sb.WriteString(style.Render(fmt.Sprintf("  %s %s", prefix, line)))
		sb.WriteByte('\n')
	}
	return sb.String()
}

// extractRegion extracts a region of lines centered on lineNum with the given radius.
// Returns nil if lineNum is nil or lines is empty.
// The returned int is the 0-based start offset of the region within lines.
func extractRegion(lines []string, lineNum *int, radius int) ([]string, int) {
	if lineNum == nil || len(lines) == 0 {
		return nil, 0
	}
	idx := *lineNum - 1
	if idx < 0 {
		idx = 0
	}
	start, end := clampRange(idx, radius, radius, len(lines))
	return lines[start:end], start
}

// renderOneSided renders a one-sided view for Added or Removed changes (file-region fallback).
func renderOneSided(region []string, startOffset int, prefix string, style lipgloss.Style, styles consoleStyles) string {
	var sb strings.Builder

	firstLine := startOffset + 1
	lastLine := startOffset + len(region)
	sb.WriteString(styles.grey.Render(fmt.Sprintf("  Lines %d\u2013%d:", firstLine, lastLine)))
	sb.WriteByte('\n')

	numWidth := digitCount(lastLine)
	for i, line := range region {
		lineNo := startOffset + i + 1
		numStr := fmt.Sprintf("%*d", numWidth, lineNo)
		sb.WriteString(style.Render(fmt.Sprintf("  %s %s│ %s", prefix, numStr, line)))
		sb.WriteByte('\n')
	}
	return sb.String()
}

// renderUnifiedDiff computes and renders a real unified diff between two regions (file-region fallback).
func renderUnifiedDiff(oldRegion, newRegion []string, oldStart, newStart int, styles consoleStyles) string {
	diff, err := difflib.GetUnifiedDiffString(difflib.UnifiedDiff{
		A:       appendNewlines(oldRegion),
		B:       appendNewlines(newRegion),
		Context: diffContext,
	})
	if err != nil || diff == "" {
		return styles.grey.Render("  (no differences in this region)") + "\n"
	}

	var sb strings.Builder
	for _, line := range strings.Split(strings.TrimRight(diff, "\n"), "\n") {
		if hunkHeaderRe.MatchString(line) {
			sb.WriteString(styles.grey.Render("  " + rewriteHunkHeader(line, oldStart, newStart)))
		} else if strings.HasPrefix(line, "-") {
			sb.WriteString(styles.removed.Render("  " + line))
		} else if strings.HasPrefix(line, "+") {
			sb.WriteString(styles.added.Render("  " + line))
		} else {
			// Context line (starts with space)
			sb.WriteString("  " + highlightLine(strings.TrimPrefix(line, " "), styles))
		}
		sb.WriteByte('\n')
	}
	return sb.String()
}

// rewriteHunkHeader adjusts the line numbers in a @@ hunk header by adding region offsets.
func rewriteHunkHeader(header string, oldStart, newStart int) string {
	m := hunkHeaderRe.FindStringSubmatch(header)
	if m == nil {
		return header
	}

	oldLine, _ := strconv.Atoi(m[1])
	oldLine += oldStart
	newLine, _ := strconv.Atoi(m[3])
	newLine += newStart

	oldPart := fmt.Sprintf("%d", oldLine)
	if m[2] != "" {
		oldPart += "," + m[2]
	}
	newPart := fmt.Sprintf("%d", newLine)
	if m[4] != "" {
		newPart += "," + m[4]
	}

	return fmt.Sprintf("@@ -%s +%s @@", oldPart, newPart)
}

// renderDiffHeader renders the metadata card at the top of the diff.
// When showValues is false, the Original/New/Value rows are suppressed
// (because the diff body already shows the values).
func renderDiffHeader(ch *whatChangedModel.Change, width int, styles consoleStyles, showValues bool) string {
	var sb strings.Builder

	// Action label
	action := changeAction(ch.ChangeType)
	actionStyle := changeStyle(ch.ChangeType, styles)

	sb.WriteString(actionStyle.Render(fmt.Sprintf("  %s: %s", action, ch.Property)))
	sb.WriteByte('\n')

	// Breaking indicator
	if ch.Breaking {
		sb.WriteString(styles.breaking.Render("  BREAKING CHANGE"))
		sb.WriteByte('\n')
	}

	// Values (only when diff body doesn't show them)
	if showValues {
		origVal := ch.Original
		if ch.OriginalEncoded != "" {
			origVal = ch.OriginalEncoded
		}
		newVal := ch.New
		if ch.NewEncoded != "" {
			newVal = ch.NewEncoded
		}

		// Truncate long values
		maxVal := width/2 - 20
		if maxVal < 20 {
			maxVal = 40
		}

		switch ch.ChangeType {
		case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
			if newVal != "" {
				sb.WriteString(styles.added.Render(fmt.Sprintf("  Value: %s", truncateStr(newVal, maxVal))))
				sb.WriteByte('\n')
			}
		case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
			if origVal != "" {
				sb.WriteString(styles.removed.Render(fmt.Sprintf("  Value: %s", truncateStr(origVal, maxVal))))
				sb.WriteByte('\n')
			}
		case whatChangedModel.Modified:
			if origVal != "" || newVal != "" {
				sb.WriteString(fmt.Sprintf("  %s %s  %s  %s",
					styles.grey.Render("Original:"),
					truncateStr(origVal, maxVal),
					styles.grey.Render("->"),
					truncateStr(newVal, maxVal)))
				sb.WriteByte('\n')
			}
		}
	}

	// Blank line separating header from diff content
	sb.WriteByte('\n')

	return sb.String()
}

func changeAction(ct int) string {
	switch ct {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		return "Added"
	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		return "Removed"
	case whatChangedModel.Modified:
		return "Modified"
	default:
		return "Changed"
	}
}

func changeStyle(ct int, styles consoleStyles) lipgloss.Style {
	switch ct {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		return styles.added
	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		return styles.removed
	case whatChangedModel.Modified:
		return styles.modified
	default:
		return styles.grey
	}
}

// appendNewlines converts lines to the newline-terminated format difflib expects.
func appendNewlines(lines []string) []string {
	out := make([]string, len(lines))
	for i, l := range lines {
		out[i] = l + "\n"
	}
	return out
}

func truncateStr(s string, max int) string {
	runes := []rune(s)
	if len(runes) <= max {
		return s
	}
	return string(runes[:max-3]) + "..."
}

func digitCount(n int) int {
	if n <= 0 {
		return 1
	}
	d := 0
	for n > 0 {
		n /= 10
		d++
	}
	return d
}
