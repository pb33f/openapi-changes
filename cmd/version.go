// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// GetVersionCommand returns the cobra command for printing the raw build version.
func GetVersionCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "version",
		Short: "Print the openapi-changes version",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			version := Version
			if version == "" {
				version = "latest"
			}
			_, err := fmt.Fprintln(cmd.OutOrStdout(), version)
			return err
		},
	}
}
