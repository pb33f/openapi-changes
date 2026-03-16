// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"

	"charm.land/bubbles/v2/viewport"
)

// codeModal renders a full-screen overlay showing the complete spec
// scrolled to a specific line number. Uses a viewport for scrolling.
type codeModal struct {
	vp       viewport.Model
	changeLn int // 1-based line number of the change (for highlighting)
	width    int
	height   int
}

func newCodeModal(lines []string, changeLn int, width, height int, styles consoleStyles) codeModal {
	modalW := width - 4
	modalH := height - 4
	if modalW < 20 {
		modalW = 20
	}
	if modalH < 5 {
		modalH = 5
	}

	// Render lines with line numbers and highlighting
	numWidth := digitCount(len(lines))
	rendered := make([]string, len(lines))
	for i, line := range lines {
		lineNo := i + 1
		numStr := fmt.Sprintf("%*d", numWidth, lineNo)
		if lineNo == changeLn {
			rendered[i] = styles.codeHighlight.Render(fmt.Sprintf("> %s| %s", numStr, line))
		} else {
			rendered[i] = fmt.Sprintf("  %s%s %s",
				styles.grey.Render(numStr),
				styles.grey.Render("|"),
				highlightLine(line, styles))
		}
	}

	vp := viewport.New(
		viewport.WithWidth(modalW),
		viewport.WithHeight(modalH),
	)
	vp.SetContent(strings.Join(rendered, "\n"))

	// Scroll to change line (centered)
	if changeLn > 0 {
		targetOffset := changeLn - modalH/2
		if targetOffset < 0 {
			targetOffset = 0
		}
		vp.SetYOffset(targetOffset)
	}

	return codeModal{
		vp:       vp,
		changeLn: changeLn,
		width:    modalW,
		height:   modalH,
	}
}

// View renders the code modal as a bordered overlay.
func (m codeModal) View(styles consoleStyles) string {
	border := styles.activePanel.Width(m.width).Height(m.height)

	title := styles.title.Render(fmt.Sprintf(" Full Spec (line %d) ", m.changeLn))
	nav := styles.grey.Render(" ↑↓/jk: scroll | pgup/pgdn: page | home/end: jump | esc/q/x: close ")

	content := m.vp.View()

	var sb strings.Builder
	sb.WriteString(title)
	sb.WriteByte('\n')
	sb.WriteString(content)
	sb.WriteByte('\n')
	sb.WriteString(nav)

	return border.Render(sb.String())
}

// recenter scrolls the viewport to center the change line.
func (m *codeModal) recenter() {
	if m.changeLn > 0 {
		target := m.changeLn - m.height/2
		if target < 0 {
			target = 0
		}
		m.vp.SetYOffset(target)
	}
}
