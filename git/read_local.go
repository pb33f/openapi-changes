// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
    "os/exec"
    "what-changed/model"
)

const (
    GIT       = "git"
    LOG       = "log"
    LOGFORMAT = "--pretty=%cD||%h||%s"
)

func CheckLocalRepoAvailable(dir string) bool {
    cmd := exec.Command(GIT, LOG)
    cmd.Dir = dir
    err := cmd.Run()
    if err != nil {
        return false
    }
    return true
}

func ExtractHistoryFromFile(dir, file string) []*model.Commit {
    return nil
}
