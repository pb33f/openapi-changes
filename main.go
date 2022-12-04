// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package main

import (
    "time"
    "github.com/pb33f/openapi-changes/cmd"
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
        date = time.Now().Format("2006-01-02 15:04:05 MST")
    }

    cmd.Execute(version, commit, date)
}
