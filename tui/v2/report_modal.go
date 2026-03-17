// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"

	"charm.land/bubbles/v2/viewport"
)

// reportModal renders an overlay showing a glamour-rendered markdown report
// for the active commit. Follows the same design pattern as codeModal.
type reportModal struct {
	vp     viewport.Model
	title  string // commit message
	width  int
	height int
}

func newReportModal(renderedContent, commitMsg string, modalW, modalH, contentW int, styles consoleStyles) reportModal {
	vpH := modalH - 4 // border(2) + title/separator(1) + nav(1)
	if vpH < 3 {
		vpH = 3
	}

	vp := viewport.New(
		viewport.WithWidth(contentW),
		viewport.WithHeight(vpH),
	)
	vp.SetContent(renderedContent)

	return reportModal{
		vp:     vp,
		title:  commitMsg,
		width:  modalW,
		height: modalH,
	}
}

// View renders the report modal content inside a bordered panel.
func (m reportModal) View(styles consoleStyles) string {
	border := styles.activePanel.Width(m.width).Height(m.height).
		Padding(0, 1, 0, 1)

	nav := styles.grey.Render(" \u2191\u2193/jk: scroll | pgup/pgdn: page | esc: close ")

	var sb strings.Builder

	if m.title != "" {
		sb.WriteString(styles.info.Render(" " + m.title))
		sb.WriteByte('\n')
		sb.WriteString(styles.grey.Render(strings.Repeat("\u2500", m.width-4)))
		sb.WriteByte('\n')
	}

	sb.WriteString(m.vp.View())
	sb.WriteByte('\n')
	sb.WriteString(nav)

	return border.Render(sb.String())
}
