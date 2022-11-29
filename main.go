// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package main

import (
    "what-changed/git"
    "what-changed/tui"
)

func main() {

    // temp location for testing
    gitPath := "../../GolandProjects/vacuum"
    filePath := "model/test_files/burgershop.openapi.yaml"

    // build commit history.
    commitHistory := git.ExtractHistoryFromFile(gitPath, filePath)

    // populate history with changes and data
    git.PopulateHistoryWithChanges(commitHistory)

    // build terminal UI.
    app := tui.BuildApplication(commitHistory)
    if err := app.Run(); err != nil {
        panic(err)
    }
}
