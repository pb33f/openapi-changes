// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package model

import (
    "github.com/pb33f/libopenapi/what-changed/reports"
    "time"
)

type Report struct {
    ID        uint                        `gorm:"primaryKey" json:"-"`
    Summary   map[string]*reports.Changed `gorm:"-" json:"reportSummary"`
    CreatedAt time.Time
    UpdatedAt time.Time
    Commit    *Commit `gorm:"foreignKey:ID" json:"commitDetails"`
}

type HistoricalReport struct {
    ID            uint      `gorm:"primaryKey" json:"-"`
    GitRepoPath   string    `gorm:"index" json:"gitRepoPath"`
    GitFilePath   string    `json:"gitFilePath"`
    Filename      string    `json:"filename"`
    DateGenerated string    `json:"dateGenerated"`
    Reports       []*Report `gorm:"foreignKey:ID" json:"reports" `
}
