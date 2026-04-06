// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"

	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/terminal"
	"github.com/pterm/pterm"
)

func PrintBanner() {
	text := `
@@@@@@@   @@@@@@@   @@@@@@   @@@@@@   @@@@@@@@
@@@@@@@@  @@@@@@@@  @@@@@@@  @@@@@@@  @@@@@@@@
@@!  @@@  @@!  @@@      @@@      @@@  @@!
!@!  @!@  !@   @!@      @!@      @!@  !@!
@!@@!@!   @!@!@!@   @!@!!@   @!@!!@   @!!!:!
!!@!!!    !!!@!!!!  !!@!@!   !!@!@!   !!!!!:
!!:       !!:  !!!      !!:      !!:  !!:
:!:       :!:  !:!      :!:      :!:  :!:
 ::        :: ::::  :: ::::  :: ::::   ::
 :        :: : ::    : : :    : : :    :
`
	pterm.DefaultBasicText.Println(pterm.LightMagenta(text))
	pterm.Println(pterm.LightCyan("🔗 https://pb33f.io/openapi-changes/"))
	pterm.Println("------------------------------------")
	pterm.Print(pterm.LightCyan(fmt.Sprintf("openapi-changes version: %s", Version)))
	pterm.Println(pterm.LightMagenta(fmt.Sprintf(" | compiled: %s", Date)))
	pterm.Println()

}

// PrintNewBanner prints the pb33f banner using lipgloss (no pterm).
// When noColor is true, all styling is disabled.
func PrintNewBanner(noColor bool) {
	art := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true)
	info := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true)

	if noColor {
		art = lipgloss.NewStyle()
		info = lipgloss.NewStyle()
	}

	text := `
@@@@@@@   @@@@@@@   @@@@@@   @@@@@@   @@@@@@@@
@@@@@@@@  @@@@@@@@  @@@@@@@  @@@@@@@  @@@@@@@@
@@!  @@@  @@!  @@@      @@@      @@@  @@!
!@!  @!@  !@   @!@      @!@      @!@  !@!
@!@@!@!   @!@!@!@   @!@!!@   @!@!!@   @!!!:!
!!@!!!    !!!@!!!!  !!@!@!   !!@!@!   !!!!!:
!!:       !!:  !!!      !!:      !!:  !!:
:!:       :!:  !:!      :!:      :!:  :!:
 ::        :: ::::  :: ::::  :: ::::   ::
 :        :: : ::    : : :    : : :    :
`
	fmt.Println(art.Render(text))
	fmt.Println(info.Render("https://pb33f.io/openapi-changes/"))
	fmt.Println("------------------------------------")
	fmt.Print(info.Render(fmt.Sprintf("openapi-changes version: %s", Version)))
	fmt.Println(art.Render(fmt.Sprintf(" | compiled: %s", Date)))
	fmt.Println()
}
