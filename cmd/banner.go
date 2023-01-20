// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "fmt"
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
    pterm.Print(pterm.LightCyan(fmt.Sprintf("openapi-changes version: %s", Version)))
    pterm.Println(pterm.LightMagenta(fmt.Sprintf(" | compiled: %s", Date)))
    pterm.Println()

}
