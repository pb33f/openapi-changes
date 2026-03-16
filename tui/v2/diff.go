// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"

	"charm.land/lipgloss/v2"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
)

const (
	contextLines    = 5  // lines of context above/below change
	sideBySideMinW  = 120
	panelNAText     = "  (not applicable)"
)

// renderDiff renders a diff card for a single change.
// newLines/oldLines are pre-split spec lines from the cache.
func renderDiff(ch *whatChangedModel.Change, newLines, oldLines []string, width int, styles consoleStyles) string {
	if ch == nil {
		return ""
	}

	var sb strings.Builder
	sb.Grow(width * 20)

	// Header: property metadata
	sb.WriteString(renderDiffHeader(ch, width, styles))
	sb.WriteByte('\n')

	// Context panels
	sideBySide := width >= sideBySideMinW

	switch ch.ChangeType {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		// Right panel only
		rightPanel := renderPanel(newLines, ch.Context.NewLine, "Added", styles)
		if sideBySide {
			leftPanel := styles.grey.Render(panelNAText)
			sb.WriteString(sideBySideLayout(leftPanel, rightPanel, width))
		} else {
			sb.WriteString(rightPanel)
		}

	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		// Left panel only
		leftPanel := renderPanel(oldLines, ch.Context.OriginalLine, "Removed", styles)
		if sideBySide {
			rightPanel := styles.grey.Render(panelNAText)
			sb.WriteString(sideBySideLayout(leftPanel, rightPanel, width))
		} else {
			sb.WriteString(leftPanel)
		}

	case whatChangedModel.Modified:
		// Both panels
		leftPanel := renderPanel(oldLines, ch.Context.OriginalLine, "Original", styles)
		rightPanel := renderPanel(newLines, ch.Context.NewLine, "Modified", styles)
		if sideBySide {
			sb.WriteString(sideBySideLayout(leftPanel, rightPanel, width))
		} else {
			sb.WriteString(leftPanel)
			sb.WriteByte('\n')
			sb.WriteString(rightPanel)
		}

	default:
		sb.WriteString(styles.grey.Render("  Unknown change type"))
	}

	return sb.String()
}

// renderDiffHeader renders the metadata card at the top of the diff.
func renderDiffHeader(ch *whatChangedModel.Change, width int, styles consoleStyles) string {
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

	// Values
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

	// Line numbers
	if ch.Context != nil {
		var lineInfo []string
		if ch.Context.OriginalLine != nil {
			lineInfo = append(lineInfo, fmt.Sprintf("original line %d", *ch.Context.OriginalLine))
		}
		if ch.Context.NewLine != nil {
			lineInfo = append(lineInfo, fmt.Sprintf("new line %d", *ch.Context.NewLine))
		}
		if len(lineInfo) > 0 {
			sb.WriteString(styles.grey.Render(fmt.Sprintf("  (%s)", strings.Join(lineInfo, ", "))))
		}
	}

	return sb.String()
}

// renderPanel renders a YAML context panel centered on a specific line.
func renderPanel(lines []string, lineNum *int, label string, styles consoleStyles) string {
	if lineNum == nil || len(lines) == 0 {
		return styles.grey.Render(fmt.Sprintf("  %s: no line information", label))
	}

	ln := *lineNum
	if ln < 1 {
		ln = 1
	}
	// Convert to 0-based index
	idx := ln - 1

	start, end := clampRange(idx, contextLines, contextLines, len(lines))

	var sb strings.Builder
	sb.WriteString(styles.info.Render(fmt.Sprintf("  %s (line %d):", label, ln)))
	sb.WriteByte('\n')

	maxLineNum := end
	numWidth := digitCount(maxLineNum)

	for i := start; i < end; i++ {
		lineNo := i + 1
		isChangeLine := i == idx

		numStr := fmt.Sprintf("%*d", numWidth, lineNo)

		if isChangeLine {
			sb.WriteString(styles.codeHighlight.Render(fmt.Sprintf("  > %s| %s", numStr, lines[i])))
		} else {
			sb.WriteString(fmt.Sprintf("    %s%s %s",
				styles.grey.Render(numStr),
				styles.grey.Render("|"),
				highlightLine(lines[i], styles)))
		}
		sb.WriteByte('\n')
	}

	return sb.String()
}

// sideBySideLayout places left and right panels side by side.
func sideBySideLayout(left, right string, width int) string {
	panelW := width/2 - 2
	leftLines := strings.Split(left, "\n")
	rightLines := strings.Split(right, "\n")

	maxLines := len(leftLines)
	if len(rightLines) > maxLines {
		maxLines = len(rightLines)
	}

	var sb strings.Builder
	for i := 0; i < maxLines; i++ {
		l := ""
		if i < len(leftLines) {
			l = leftLines[i]
		}
		r := ""
		if i < len(rightLines) {
			r = rightLines[i]
		}

		// Pad left panel
		lVis := visualLen(l)
		if lVis < panelW {
			l += strings.Repeat(" ", panelW-lVis)
		}

		sb.WriteString(l)
		sb.WriteString(" | ")
		sb.WriteString(r)
		sb.WriteByte('\n')
	}
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

func truncateStr(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max-3] + "..."
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
