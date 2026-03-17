// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"

	"charm.land/bubbles/v2/viewport"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
)

const (
	modalWidthReduction = 40 // reduce terminal width by this for modal
	modalHeightMargin   = 5  // reduce terminal height by this for modal
	modalRightPadding   = 6  // padding from right edge
)

// codeModal renders an overlay showing the complete spec scrolled to a
// specific line number. A diff summary is fixed at the top and the spec
// code scrolls underneath via a viewport.
type codeModal struct {
	vp          viewport.Model
	diffSummary string         // pre-rendered diff header + value diff, fixed above viewport
	highlight   highlightRange // range of lines to highlight
	width       int            // modal content width (inside border)
	height      int            // modal total height (including border)
	summaryH    int            // number of lines the fixed summary occupies
}

func newCodeModal(lines []string, hl highlightRange, ch *whatChangedModel.Change, termWidth, termHeight int, styles consoleStyles) codeModal {
	modalW := termWidth - modalWidthReduction
	modalH := termHeight - modalHeightMargin
	if modalW < 30 {
		modalW = 30
	}
	if modalH < 10 {
		modalH = 10
	}

	// Build the fixed diff summary
	summary := renderDiffSummary(ch, modalW, styles)
	summaryH := strings.Count(summary, "\n")
	// +1 for the separator line below the summary
	if summaryH > 0 {
		summaryH++
	}

	// Content width inside the border panel (lipgloss Width includes borders + padding)
	contentW := modalW - 4 // border(2) + padding(2)

	vpH := modalH - summaryH - 4 // -4 for border(2) + separator(1) + nav(1)
	if vpH < 3 {
		vpH = 3
	}

	// Pick styles and gutter chars based on change type.
	primaryStyle, rangeStyle, bodyGutter := contextHighlightStyles(ch.ChangeType, styles)

	numWidth := digitCount(len(lines))
	rendered := make([]string, len(lines))
	for i, line := range lines {
		lineNo := i + 1
		numStr := fmt.Sprintf("%*d", numWidth, lineNo)
		if lineNo == hl.start {
			// Primary line — bold with > arrow
			content := fmt.Sprintf("> %s│ %s", numStr, line)
			if pad := contentW - visualLen(content); pad > 0 {
				content += strings.Repeat(" ", pad)
			}
			rendered[i] = primaryStyle.Render(content)
		} else if lineNo > hl.start && lineNo <= hl.end {
			// Body line — gutter marker (+/-/│) before line number
			content := fmt.Sprintf("%s %s│ %s", bodyGutter, numStr, line)
			if pad := contentW - visualLen(content); pad > 0 {
				content += strings.Repeat(" ", pad)
			}
			rendered[i] = rangeStyle.Render(content)
		} else {
			rendered[i] = fmt.Sprintf("  %s%s %s",
				styles.grey.Render(numStr),
				styles.grey.Render("│"),
				highlightLine(line, styles))
		}
	}

	vp := viewport.New(
		viewport.WithWidth(contentW),
		viewport.WithHeight(vpH),
	)
	vp.SetContent(strings.Join(rendered, "\n"))

	// Scroll to primary highlight line (centered in viewport)
	if hl.start > 0 {
		targetOffset := hl.start - vpH/2
		if targetOffset < 0 {
			targetOffset = 0
		}
		vp.SetYOffset(targetOffset)
	}

	return codeModal{
		vp:          vp,
		diffSummary: summary,
		highlight:   hl,
		width:       modalW,
		height:      modalH,
		summaryH:    summaryH,
	}
}

// View renders the code modal content inside a bordered panel.
func (m codeModal) View(styles consoleStyles) string {
	border := styles.activePanel.Width(m.width).Height(m.height).
		Padding(0, 1, 0, 1)

	nav := styles.grey.Render(" ↑↓/jk: scroll | pgup/pgdn: page | space: recenter | enter/esc: close ")

	var sb strings.Builder

	// Fixed diff summary at top
	if m.diffSummary != "" {
		sb.WriteString(m.diffSummary)
		sb.WriteString(styles.grey.Render(strings.Repeat("─", m.width-4)))
		sb.WriteByte('\n')
	}

	// Scrolling spec code
	sb.WriteString(m.vp.View())
	sb.WriteByte('\n')
	sb.WriteString(nav)

	return border.Render(sb.String())
}

func (m codeModal) viewportHeight() int {
	h := m.height - m.summaryH - 4
	if h < 3 {
		h = 3
	}
	return h
}

// recenter scrolls the viewport to center the primary highlight line.
func (m *codeModal) recenter() {
	if m.highlight.start > 0 {
		target := m.highlight.start - m.viewportHeight()/2
		if target < 0 {
			target = 0
		}
		m.vp.SetYOffset(target)
	}
}
