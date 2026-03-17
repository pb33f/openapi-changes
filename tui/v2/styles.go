// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/terminal"
)

// consoleStyles holds all lipgloss styles for the console TUI.
type consoleStyles struct {
	title          lipgloss.Style
	activePanel    lipgloss.Style
	inactivePanel  lipgloss.Style
	cursor         lipgloss.Style
	selectedRow    lipgloss.Style // modified: primary line (pink)
	rangeHighlight lipgloss.Style // modified: body lines (pink)
	addedRow       lipgloss.Style // added: primary line (green, bold)
	addedRange     lipgloss.Style // added: body lines (green)
	removedRow     lipgloss.Style // removed: primary line (red, bold)
	removedRange   lipgloss.Style // removed: body lines (red)
	added          lipgloss.Style
	modified       lipgloss.Style
	removed        lipgloss.Style
	breaking       lipgloss.Style
	grey           lipgloss.Style
	info           lipgloss.Style
	nav            lipgloss.Style
	yamlKey        lipgloss.Style
}

func newConsoleStyles() consoleStyles {
	return consoleStyles{
		title:          lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true),
		activePanel:    lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(lipgloss.Color(terminal.LipglossPrimaryBlue)),
		inactivePanel:  lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(lipgloss.Color(terminal.LipglossSecondaryPink)),
		cursor:         lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true),
		selectedRow:    lipgloss.NewStyle().Background(lipgloss.Color("#4a1a4e")).Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true),
		rangeHighlight: lipgloss.NewStyle().Background(lipgloss.Color("#2a0e2e")).Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)),
		addedRow:       lipgloss.NewStyle().Background(lipgloss.Color("#1a3a1a")).Foreground(lipgloss.Color(terminal.LipglossGreen)).Bold(true),
		addedRange:     lipgloss.NewStyle().Background(lipgloss.Color("#0e2a0e")).Foreground(lipgloss.Color(terminal.LipglossGreen)),
		removedRow:     lipgloss.NewStyle().Background(lipgloss.Color("#3a1a1a")).Foreground(lipgloss.Color(terminal.LipglossRed)).Bold(true),
		removedRange:   lipgloss.NewStyle().Background(lipgloss.Color("#2a0e0e")).Foreground(lipgloss.Color(terminal.LipglossRed)),
		added:          lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGreen)),
		modified:       lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossYellow)),
		removed:        lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)),
		breaking:       lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)).Bold(true),
		grey:           lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGrey)),
		info:           lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)),
		nav:            lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGrey)),
		yamlKey:        lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)),
	}
}

func newNoColorStyles() consoleStyles {
	return consoleStyles{
		title:          lipgloss.NewStyle(),
		activePanel:    lipgloss.NewStyle().Border(lipgloss.NormalBorder()),
		inactivePanel:  lipgloss.NewStyle().Border(lipgloss.NormalBorder()),
		cursor:         lipgloss.NewStyle().Bold(true),
		selectedRow:    lipgloss.NewStyle().Bold(true).Reverse(true),
		rangeHighlight: lipgloss.NewStyle().Reverse(true),
		addedRow:       lipgloss.NewStyle().Bold(true).Reverse(true),
		addedRange:     lipgloss.NewStyle().Reverse(true),
		removedRow:     lipgloss.NewStyle().Bold(true).Reverse(true),
		removedRange:   lipgloss.NewStyle().Reverse(true),
		added:          lipgloss.NewStyle(),
		modified:       lipgloss.NewStyle(),
		removed:        lipgloss.NewStyle(),
		breaking:       lipgloss.NewStyle().Bold(true),
		grey:           lipgloss.NewStyle(),
		info:           lipgloss.NewStyle(),
		nav:            lipgloss.NewStyle(),
		yamlKey:        lipgloss.NewStyle(),
	}
}
