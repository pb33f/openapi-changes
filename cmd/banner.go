// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
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
			"OpenAPI contract changes right in your terminal with the current doctor-based engine.")
	case "old-console":
		fmt.Println("The old-console command renders the legacy interactive terminal user interface.")
	case "summary":
		fmt.Println("The summary command prints out a semantic, deduplicated summary of a change report. " +
			"A tree containing the changes and a simple table is rendered. Perfect for CI/CD!")
	case "old-summary":
		fmt.Println("The old-summary command prints the legacy summary output and legacy change tree.")
	case "report":
		fmt.Println("The report command prints out a machine-readable JSON report of all API changes " +
			"using the current doctor-based engine.")
	case "old-report":
		fmt.Println("The old-report command prints the legacy machine-readable JSON report.")
	case "markdown-report":
		fmt.Println("The markdown-report command generates a detailed markdown report using the current doctor-based engine.")
	case "old-markdown-report":
		fmt.Println("The old-markdown-report command generates the legacy markdown report.")
	case "html-report":
		fmt.Println("The html-report command generates a rich, interactive and self-contained browser report using the current doctor-based engine.")
	case "old-html-report":
		fmt.Println("The old-html-report command generates the legacy HTML report.")
	}
	fmt.Println()
	title.Println(">> diff local git history")
	desc.Println("supply a path to the git repository root and the path to the OpenAPI spec from the root.")
	fmt.Println()
	fmt.Print("openapi-changes ")
	cmd.Print(command)
	title.Println(" . sample-specs/petstorev3.json")
	fmt.Println()
	title.Println(">> diff old / modified files")
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
