// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package main

import (
	"github.com/pb33f/openapi-changes/cmd"
	"time"
)

var version string
var commit string
var date string

func main() {
	if version == "" {
		version = "latest"
	}
	if commit == "" {
		commit = "latest"
	}
	if date == "" {
		date = time.Now().Format("Mon, 02 Jan 2006 15:04:05 MST")
	} else {
		parsed, _ := time.Parse(time.RFC3339, date)
		date = parsed.Format("Mon, 02 Jan 2006 15:04:05 MST")
	}

	cmd.Execute(version, commit, date)
}
