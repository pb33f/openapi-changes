// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package model

import (
    "github.com/daveshanley/vacuum/vacuum-report"
    "github.com/pb33f/libopenapi"
    "github.com/pb33f/libopenapi/what-changed/model"
    "time"
)

type Commit struct {
    Hash          string                      `json:"commitHash"`
    Message       string                      `json:"message"`
    Author        string                      `json:"author"`
    AuthorEmail   string                      `json:"authorEmail"`
    CommitDate    time.Time                   `json:"committed"`
    QualityReport *vacuum_report.VacuumReport `json:"qualityReport,omitempty"`
    Changes       *model.DocumentChanges      `json:"changeReport"`
    Data          []byte                      `json:"-"`
    OldData       []byte                      `json:"-"`
    Document      libopenapi.Document         `json:"-"`
    OldDocument   libopenapi.Document         `json:"-"`
    RepoDirectory string                      `json:"-"`
    FilePath      string                      `json:"-"`
}
