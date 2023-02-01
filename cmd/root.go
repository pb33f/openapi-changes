// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "fmt"
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "os"
)

var (
    Version string
    Commit  string
    Date    string

    rootCmd = &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: true,
        Use:           "openapi-changes",
        Short:         "openapi-changes will tell you what has changed between one or more OpenAPI / Swagger specifications.",
        Long: `openapi-changes can detect every change found in an OpenAPI specification.
it can compare between two files, or a single file, over time.`,
        RunE: func(cmd *cobra.Command, args []string) error {

            PrintBanner()

            fmt.Println("You have a few options when it comes to commands...")
            fmt.Println()

            _ = pterm.DefaultBulletList.WithItems([]pterm.BulletListItem{
                {Level: 0, Text: "console", TextStyle: pterm.NewStyle(pterm.FgLightCyan), Bullet: ">", BulletStyle: pterm.NewStyle(pterm.FgLightMagenta)},
                {Level: 0, Text: "summary", TextStyle: pterm.NewStyle(pterm.FgLightCyan), Bullet: ">", BulletStyle: pterm.NewStyle(pterm.FgLightMagenta)},
                {Level: 0, Text: "report", TextStyle: pterm.NewStyle(pterm.FgLightCyan), Bullet: ">", BulletStyle: pterm.NewStyle(pterm.FgLightMagenta)},
                {Level: 0, Text: "html-report", TextStyle: pterm.NewStyle(pterm.FgLightCyan), Bullet: ">", BulletStyle: pterm.NewStyle(pterm.FgLightMagenta)},
            }).Render()
            return nil
        },
    }
)

func Execute(version, commit, date string) {
    Version = version
    Commit = commit
    Date = date

    if err := rootCmd.Execute(); err != nil {
        os.Exit(1)
    }
}

func init() {
    cobra.OnInitialize(initConfig)
    rootCmd.AddCommand(GetConsoleCommand())
    rootCmd.AddCommand(GetSummaryCommand())
    rootCmd.AddCommand(GetReportCommand())
    rootCmd.AddCommand(GetHTMLReportCommand())
    rootCmd.PersistentFlags().BoolP("top", "t", false, "Only show latest changes (last git revision against HEAD)")
}

func initConfig() {

}
