// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"

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
func PrintBanner(palette terminal.Palette) {
	art := styleWithForeground(palette.Secondary).Bold(true)
	info := styleWithForeground(palette.Primary).Bold(true)

	fmt.Println(art.Render(bannerArt))
	fmt.Println(info.Render("https://pb33f.io/openapi-changes/"))
	fmt.Println("------------------------------------")
	fmt.Print(info.Render(fmt.Sprintf("openapi-changes version: %s", Version)))
	fmt.Println(art.Render(fmt.Sprintf(" | compiled: %s", Date)))
	fmt.Println()
}
