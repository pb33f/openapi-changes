// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"
	"image/color"
	"net/url"
	"os"

	"charm.land/lipgloss/v2"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/spf13/cobra"
)

const (
	noChangesFoundMessage = "No changes found between specifications"
	noPriorVersionMessage = "The file has no prior version to compare against — nothing to report"
)

// summaryOpts holds the flags shared by the current doctor-based command family.
type summaryOpts struct {
	noColor         bool
	tektronix       bool
	markdown        bool
	withLines       bool
	errorOnDiff     bool
	latest          bool
	limit           int
	limitTime       int
	base            string
	baseCommit      string
	remote          bool
	extRefs         bool
	globalRevisions bool
	theme           terminal.ThemeName
	palette         terminal.Palette
}

// commandStyles holds the shared success/warning styles for the canonical command family.
type commandStyles struct {
	success lipgloss.Style
	warn    lipgloss.Style
}

func styleWithForeground(c color.Color) lipgloss.Style {
	if c == nil {
		return lipgloss.NewStyle()
	}
	return lipgloss.NewStyle().Foreground(c)
}

func resolveTheme(noColor, tektronix bool) (terminal.ThemeName, error) {
	if noColor && tektronix {
		return "", fmt.Errorf("--no-color/--roger-mode and --tektronix cannot be used together")
	}
	if tektronix {
		return terminal.ThemeTektronix, nil
	}
	if noColor {
		return terminal.ThemeLight, nil
	}
	return terminal.ThemeDark, nil
}

func commandStylesFor(palette terminal.Palette) commandStyles {
	return commandStyles{
		success: styleWithForeground(palette.Addition).Bold(true),
		warn:    styleWithForeground(palette.Breaking).Bold(true),
	}
}

func addTerminalThemeFlags(cmd *cobra.Command) {
	cmd.Flags().BoolP("no-color", "n", false, "Use the light Roger monochrome terminal theme")
	cmd.Flags().Bool("roger-mode", false, "Alias for --no-color")
	cmd.Flags().Bool("tektronix", false, "Use the Tektronix green monochrome terminal theme")
}

// readCommonFlags reads the flags shared by the current doctor-based commands.
func readCommonFlags(cmd *cobra.Command) (opts summaryOpts, configFlag string, err error) {
	opts.noColor, _ = cmd.Flags().GetBool("no-color")
	rogerMode, _ := cmd.Flags().GetBool("roger-mode")
	opts.noColor = opts.noColor || rogerMode
	if cmd.Flags().Lookup("tektronix") != nil {
		opts.tektronix, _ = cmd.Flags().GetBool("tektronix")
	}
	opts.withLines, _ = cmd.Flags().GetBool("with-lines")
	opts.latest, _ = cmd.Flags().GetBool("top")
	opts.limit, _ = cmd.Flags().GetInt("limit")
	opts.limitTime, _ = cmd.Flags().GetInt("limit-time")
	opts.base, _ = cmd.Flags().GetString("base")
	opts.baseCommit, _ = cmd.Flags().GetString("base-commit")
	opts.remote, _ = cmd.Flags().GetBool("remote")
	opts.extRefs, _ = cmd.Flags().GetBool("ext-refs")
	opts.globalRevisions, _ = cmd.Flags().GetBool("global-revisions")
	configFlag, _ = cmd.Flags().GetString("config")
	opts.theme, err = resolveTheme(opts.noColor, opts.tektronix)
	if err != nil {
		return opts, configFlag, err
	}
	opts.palette = terminal.PaletteForTheme(opts.theme)
	return
}

// validateGitHubURL checks that a single argument is a github.com URL.
// Returns an error if validation fails (causing a non-zero exit code in CI).
func validateGitHubURL(arg string) error {
	specURL, err := url.Parse(arg)
	if err != nil || specURL.Host != "github.com" {
		return fmt.Errorf("a single argument requires a github.com URL; for local comparison, provide two arguments")
	}
	return nil
}

func printNoChangesText() {
	fmt.Println(noChangesFoundMessage)
}

func printNoChangesJSON() {
	fmt.Printf("{\"message\": %q}\n", noChangesFoundMessage)
}

func printNoPriorVersionText() {
	fmt.Println(noPriorVersionMessage)
}

func maybePrintBanner(cmd *cobra.Command, palette terminal.Palette) {
	if cmd != nil && cmd.Flags().Lookup("no-logo") != nil {
		noBanner, _ := cmd.Flags().GetBool("no-logo")
		if noBanner {
			return
		}
	}
	terminal.PrintBanner(terminal.BannerOptions{
		Palette:     palette,
		ProductName: "openapi-changes",
		ProductURL:  "https://pb33f.io/openapi-changes/",
		Version:     Version,
		Date:        Date,
	})
}

// commandInput holds the resolved state from the shared command preamble.
type commandInput struct {
	Opts           summaryOpts
	BreakingConfig *whatChangedModel.BreakingRulesConfig
	Commits        []*model.Commit
}

// prepareCommandRun is the shared preamble for commands that use loadCommitsFromArgs
// (console, summary, html-report, markdown-report). It reads common flags, prints
// the banner, validates arguments, loads the breaking config, and dispatches to the
// appropriate commit loader.
//
// Returns (nil, nil) when args are empty and the usage message has already been
// printed. Callers should return nil in that case.
func prepareCommandRun(
	cmd *cobra.Command,
	args []string,
	printUsage func(terminal.Palette),
) (*commandInput, error) {
	opts, configFlag, err := readCommonFlags(cmd)
	if err != nil {
		return nil, err
	}

	maybePrintBanner(cmd, opts.palette)

	if len(args) == 0 {
		printUsage(opts.palette)
		return nil, nil
	}

	if len(args) == 1 {
		if err := validateGitHubURL(args[0]); err != nil {
			return nil, err
		}
	}

	if len(args) > 2 {
		return nil, fmt.Errorf("too many arguments provided, expecting at most two (2)")
	}

	breakingConfig, err := LoadBreakingRulesConfig(configFlag)
	if err != nil {
		PrintConfigError(err, opts.palette)
		return nil, err
	}

	commits, err := loadCommitsFromArgs(args, opts, breakingConfig)
	if err != nil {
		return nil, err
	}

	return &commandInput{
		Opts:           opts,
		BreakingConfig: breakingConfig,
		Commits:        commits,
	}, nil
}

// loadCommitsFromArgs dispatches to the appropriate commit loader based on argument types.
// Expects len(args) to be 1 or 2 (caller must validate arg count).
func loadCommitsFromArgs(args []string, opts summaryOpts, breakingConfig *whatChangedModel.BreakingRulesConfig) ([]*model.Commit, error) {
	if len(args) == 1 {
		return loadGitHubCommits(args[0], opts, breakingConfig)
	}
	if isHTTPURL(args[0]) {
		return loadLeftRightCommits(args[0], args[1], opts)
	}
	if _, _, ok := parseGitRef(args[0]); ok {
		return loadLeftRightCommits(args[0], args[1], opts)
	}
	if _, _, ok := parseGitRef(args[1]); ok {
		return loadLeftRightCommits(args[0], args[1], opts)
	}
	f, statErr := os.Stat(args[0])
	if statErr != nil {
		return nil, fmt.Errorf("cannot open file/repository: '%s'", args[0])
	}
	if f.IsDir() {
		return loadGitHistoryCommits(args[0], args[1], opts, breakingConfig)
	}
	return loadLeftRightCommits(args[0], args[1], opts)
}

// printCommandUsage prints lipgloss-styled usage for any doctor-based command.
func printCommandUsage(commandName, description string, palette terminal.Palette) {
	title := styleWithForeground(palette.Primary).Bold(true)
	desc := styleWithForeground(palette.Muted)
	cmdStyle := styleWithForeground(palette.Secondary).Bold(true)

	fmt.Print(title.Render("How to use the "))
	fmt.Print(cmdStyle.Render(commandName))
	fmt.Println(title.Render(" command:"))
	fmt.Println()
	fmt.Println(desc.Render(description))
	fmt.Println()
	fmt.Println("  openapi-changes " + commandName + " [options] <arg1> [arg2]")
	fmt.Println()
	fmt.Println("Examples:")
	fmt.Printf("  %s\n", cmdStyle.Render("openapi-changes "+commandName+" ./specs/old.yaml ./specs/new.yaml"))
	fmt.Printf("  %s\n", cmdStyle.Render("openapi-changes "+commandName+" HEAD~1:openapi.yaml ./openapi.yaml"))
	fmt.Printf("  %s\n", cmdStyle.Render("openapi-changes "+commandName+" https://github.com/user/repo/blob/main/openapi.yaml"))
	fmt.Printf("  %s\n", cmdStyle.Render("openapi-changes "+commandName+" /path/to/git/repo path/to/openapi.yaml"))
	fmt.Println()
	fmt.Println("Use --help for full flag details.")
}
