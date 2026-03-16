// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/terminal"
)

// consoleStyles holds all lipgloss styles for the console TUI.
type consoleStyles struct {
	title         lipgloss.Style
	activePanel   lipgloss.Style
	inactivePanel lipgloss.Style
	cursor        lipgloss.Style
	selectedRow   lipgloss.Style
	added         lipgloss.Style
	modified      lipgloss.Style
	removed       lipgloss.Style
	breaking      lipgloss.Style
	grey          lipgloss.Style
	info          lipgloss.Style
	nav           lipgloss.Style
	codeHighlight lipgloss.Style
	yamlKey       lipgloss.Style
}

func newConsoleStyles() consoleStyles {
	return consoleStyles{
		title:         lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true),
		activePanel:   lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(lipgloss.Color(terminal.LipglossPrimaryBlue)),
		inactivePanel: lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(lipgloss.Color(terminal.LipglossSecondaryPink)),
		cursor:        lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true),
		selectedRow:   lipgloss.NewStyle().Background(lipgloss.Color("236")).Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true),
		added:         lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGreen)),
		modified:      lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossYellow)),
		removed:       lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)),
		breaking:      lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossRed)).Bold(true),
		grey:          lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGrey)),
		info:          lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)),
		nav:           lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossGrey)),
		codeHighlight: lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true),
		yamlKey:       lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)),
	}
}

func newNoColorStyles() consoleStyles {
	return consoleStyles{
		title:         lipgloss.NewStyle(),
		activePanel:   lipgloss.NewStyle().Border(lipgloss.NormalBorder()),
		inactivePanel: lipgloss.NewStyle().Border(lipgloss.NormalBorder()),
		cursor:        lipgloss.NewStyle().Bold(true),
		selectedRow:   lipgloss.NewStyle().Bold(true).Reverse(true),
		added:         lipgloss.NewStyle(),
		modified:      lipgloss.NewStyle(),
		removed:       lipgloss.NewStyle(),
		breaking:      lipgloss.NewStyle().Bold(true),
		grey:          lipgloss.NewStyle(),
		info:          lipgloss.NewStyle(),
		nav:           lipgloss.NewStyle(),
		codeHighlight: lipgloss.NewStyle().Bold(true),
		yamlKey:       lipgloss.NewStyle(),
	}
}
