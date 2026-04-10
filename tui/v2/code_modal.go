// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package v2

import (
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
	modalW, modalH, contentW := modalDimensions(termWidth, termHeight)

	// Build the fixed diff summary
	summary := renderDiffSummary(ch, modalW, styles)
	summaryH := strings.Count(summary, "\n")
	// +1 for the separator line below the summary
	if summaryH > 0 {
		summaryH++
	}

	vpH := codeModalVPHeight(modalH, summaryH)

	specContent := renderSpecLines(lines, hl, ch.ChangeType, contentW, styles)

	vp := viewport.New(
		viewport.WithWidth(contentW),
		viewport.WithHeight(vpH),
	)
	vp.SetContent(specContent)

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

	nav := " " + styles.renderHotkey("↑↓") + styles.renderLabel("scroll") +
		"  " + styles.renderHotkey("pgup/pgdn") + styles.renderLabel("page") +
		"  " + styles.renderHotkey("space") + styles.renderLabel("recenter") +
		"  " + styles.renderHotkey("enter/esc") + styles.renderLabel("close")
	sep := styles.renderSeparator(m.width - 4)

	var sb strings.Builder

	// Fixed diff summary at top
	if m.diffSummary != "" {
		sb.WriteString(m.diffSummary)
		sb.WriteString(sep)
		sb.WriteByte('\n')
	}

	// Scrolling spec code
	sb.WriteString(m.vp.View())
	sb.WriteByte('\n')
	sb.WriteString(sep)
	sb.WriteByte('\n')
	sb.WriteString(nav)

	return border.Render(sb.String())
}

// codeModalVPHeight computes the viewport height for the code modal.
// Subtracts border(2) + top separator(1) + bottom separator(1) + nav(1) = 5.
func codeModalVPHeight(modalH, summaryH int) int {
	h := modalH - summaryH - 5
	if h < 3 {
		h = 3
	}
	return h
}

func (m codeModal) viewportHeight() int {
	return codeModalVPHeight(m.height, m.summaryH)
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
