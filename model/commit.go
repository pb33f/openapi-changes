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
    Hash          string
    Message       string
    CommitDate    time.Time
    Data          []byte
    OldData       []byte
    Document      libopenapi.Document
    OldDocument   libopenapi.Document
    Changes       *model.DocumentChanges
    QualityReport *vacuum_report.VacuumReport
    RepoDirectory string
    FilePath      string
}
