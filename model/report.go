// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package model

import "github.com/pb33f/libopenapi/what-changed/reports"

type Report struct {
    Summary map[string]*reports.Changed `json:"reportSummary"`
    Commit  *Commit                     `json:"commitDetails"`
}

type HistoricalReport struct {
    GitRepoPath   string    `json:"gitRepoPath"`
    GitFilePath   string    `json:"gitFilePath"`
    Filename      string    `json:"filename"`
    DateGenerated string    `json:"dateGenerated"`
    Reports       []*Report `json:"reports"`
}
