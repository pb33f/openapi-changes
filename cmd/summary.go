// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
    "github.com/pterm/pterm"
    "github.com/spf13/cobra"
    "os"
)

func GetSummaryCommand() *cobra.Command {

    cmd := &cobra.Command{
        SilenceUsage:  true,
        SilenceErrors: false,
        Use:           "summary",
        Short:         "See a summary of changes",
        Long:          "explore ",
        Example:       "openapi-changes summary /path/to/git/repo path/to/file/in/repo/openapi.yaml",
        RunE: func(cmd *cobra.Command, args []string) error {

            // check for two args (left and right)
            if len(args) < 2 {
                pterm.Error.Println("Two arguments are required to compare left and right OpenAPI Specifications.")
                return nil
            }
            if len(args) == 2 {

                // check if the first arg is a directory, if so - process as a git history operation.
                p := args[0]
                f, err := os.Stat(p)
                if err != nil {
                    pterm.Error.Printf("Cannot open file/repository: '%s'", args[0])
                    return err
                }

                if f.IsDir() {

                    p = args[1]
                    f, err = os.Stat(p)
                    if err != nil {
                        pterm.Error.Printf("Cannot open file/repository: '%s'", args[1])
                        return err
                    }

                    // todo: do something

                } else {
                    // todo: do something.
                    return nil
                }
            }
            pterm.Error.Println("too many arguments, expecting two (2)")
            return nil
        },
    }
    return cmd
}
