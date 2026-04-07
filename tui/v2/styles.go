// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"image/color"
	"strings"

	"charm.land/lipgloss/v2"
	"github.com/charmbracelet/colorprofile"
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
	helpKey        lipgloss.Style
	yamlKey        lipgloss.Style
}

func consoleStyleFg(c color.Color) lipgloss.Style {
	if c == nil {
		return lipgloss.NewStyle()
	}
	return lipgloss.NewStyle().Foreground(c)
}

func consoleStyleBgFg(bg, fg color.Color) lipgloss.Style {
	style := lipgloss.NewStyle()
	if bg != nil {
		style = style.Background(bg)
	}
	if fg != nil {
		style = style.Foreground(fg)
	}
	return style
}

func newConsoleStylesForPalette(palette terminal.Palette) consoleStyles {
	if !palette.SupportsColor {
		return newNoColorStyles()
	}
	return consoleStyles{
		title:          consoleStyleFg(palette.Primary).Bold(true),
		activePanel:    lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(palette.Primary),
		inactivePanel:  lipgloss.NewStyle().Border(lipgloss.NormalBorder()).BorderForeground(palette.Secondary),
		cursor:         consoleStyleFg(palette.Secondary).Bold(true),
		selectedRow:    consoleStyleBgFg(palette.SelectedBG, palette.Secondary).Bold(true),
		rangeHighlight: consoleStyleBgFg(palette.RangeBG, palette.Secondary),
		addedRow:       consoleStyleBgFg(palette.AddedBG, palette.Addition).Bold(true),
		addedRange:     consoleStyleBgFg(palette.AddedRangeBG, palette.Addition),
		removedRow:     consoleStyleBgFg(palette.RemovedBG, palette.Removal).Bold(true),
		removedRange:   consoleStyleBgFg(palette.RemovedRangeBG, palette.Removal),
		added:          consoleStyleFg(palette.Addition),
		modified:       consoleStyleFg(palette.Modification),
		removed:        consoleStyleFg(palette.Removal),
		breaking:       consoleStyleFg(palette.Breaking).Bold(true),
		grey:           consoleStyleFg(palette.Muted),
		info:           consoleStyleFg(palette.Primary),
		nav:            consoleStyleFg(palette.Nav),
		helpKey:        consoleStyleFg(palette.HelpKey),
		yamlKey:        consoleStyleFg(palette.Primary),
	}
}

func newConsoleStyles() consoleStyles {
	return newConsoleStylesForPalette(terminal.PaletteForProfile(terminal.ThemeDark, colorprofile.TrueColor, true))
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
		helpKey:        lipgloss.NewStyle().Bold(true),
		yamlKey:        lipgloss.NewStyle(),
	}
}

// renderHotkey renders a keyboard shortcut key in the [KEY] format.
func (s consoleStyles) renderHotkey(key string) string {
	return s.helpKey.Render("[" + strings.ToUpper(key) + "]")
}

// renderLabel renders a nav bar label in uppercase grey.
func (s consoleStyles) renderLabel(label string) string {
	return s.nav.Render(" " + strings.ToUpper(label))
}

// renderSeparator renders a horizontal rule of the given width.
func (s consoleStyles) renderSeparator(width int) string {
	return s.grey.Render(strings.Repeat("─", width))
}
