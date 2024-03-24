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
	pterm.Println(pterm.LightCyan("🔗 https://pb33f.io/openapi-changes/"))
	pterm.Println("------------------------------------")
	pterm.Print(pterm.LightCyan(fmt.Sprintf("openapi-changes version: %s", Version)))
	pterm.Println(pterm.LightMagenta(fmt.Sprintf(" | compiled: %s", Date)))
	pterm.Println()

}

func PrintHowToUse(command string) {

	title := pterm.NewStyle(pterm.FgLightCyan, pterm.Bold)
	desc := pterm.NewStyle(pterm.FgGray)
	cmd := pterm.NewStyle(pterm.FgLightMagenta, pterm.Bold)

	title.Print("How to use the ")
	cmd.Print(command)
	title.Print(" command:\n")
	fmt.Println("-------------------------------")
	fmt.Println()
	switch command {
	case "console":
		fmt.Println("The console command renders an interactive terminal user interface, explore " +
			"OpenAPI contract changes right in your terminal, no desktop app, no browser required.")
	case "summary":
		fmt.Println("The summary command prints out a simplified, reduced summary of a change report. " +
			"a tree containing the changes and a simple table is rendered. Perfect for CI/CD!")
	case "report":
		fmt.Println("The report command prints out a ready to render/consume JSON report of all the data " +
			"used to render the html-report and console views. If you need a machine-readable data report, this " +
			"is for you. ")
	case "html-report":
		fmt.Println("The html-report command generates a beautiful, highly interactive and sharable browser " +
			" based report. It's perhaps the sexiest diff report you have ever seen or used, no seriously!")
	}
	fmt.Println()
	title.Println(">> diff local git history")
	desc.Println("supply a path to the git repository root and the path to the OpenAPI spec from the root.")
	fmt.Println()
	fmt.Print("openapi-changes ")
	cmd.Print(command)
	title.Println(" . sample-specs/petstorev3.json")
	fmt.Println()
	title.Println(">> diff old / new files")
	desc.Println("supply paths to the left (original) and right (modified) OpenAPI specs")
	fmt.Println()
	fmt.Print("openapi-changes ")
	cmd.Print(command)
	title.Println(" sample-specs/petstorev3.json sample-specs/petstorev3.json")
	fmt.Println()
	title.Println(">> diff an OpenAPI spec on github")
	desc.Println("supply the URL to the file on github")
	fmt.Println()
	fmt.Print("openapi-changes ")
	cmd.Print(command)
	title.Println(" https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml")
	fmt.Println()
	pterm.Printf("For more help, use the %s flag (openapi-changes %s --help)", pterm.LightMagenta("--help"), command)
	fmt.Println()
	fmt.Println()

}
