// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"

	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/terminal"
)

const bannerArt = `
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

// PrintBanner prints the pb33f banner using lipgloss (no pterm).
// When noColor is true, all styling is disabled.
func PrintBanner(noColor bool) {
	art := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).Bold(true)
	info := lipgloss.NewStyle().Foreground(lipgloss.Color(terminal.LipglossPrimaryBlue)).Bold(true)

	if noColor {
		art = lipgloss.NewStyle()
		info = lipgloss.NewStyle()
	}

	fmt.Println(art.Render(bannerArt))
	fmt.Println(info.Render("https://pb33f.io/openapi-changes/"))
	fmt.Println("------------------------------------")
	fmt.Print(info.Render(fmt.Sprintf("openapi-changes version: %s", Version)))
	fmt.Println(art.Render(fmt.Sprintf(" | compiled: %s", Date)))
	fmt.Println()
}
