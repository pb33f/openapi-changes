// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package model

import (
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/what-changed/model"
	"time"
)

type DocumentPathRewriter func(string) string

type Commit struct {
	CreatedAt         time.Time              `json:"-"`
	UpdatedAt         time.Time              `json:"-"`
	ID                uint                   `gorm:"primaryKey" json:"-"`
	Hash              string                 `json:"commitHash"`
	Message           string                 `json:"message"`
	Author            string                 `json:"author"`
	AuthorEmail       string                 `gorm:"index" json:"authorEmail"`
	CommitDate        time.Time              `json:"committed"`
	Changes           *model.DocumentChanges `gorm:"-" json:"changeReport,omitempty"`
	SerializedChanges []byte                 `gorm:"-" json:"-"`
	Data              []byte                 `gorm:"-" json:"-"`
	OldData           []byte                 `gorm:"-" json:"-"`
	Document          libopenapi.Document    `gorm:"-" json:"-"`
	OldDocument       libopenapi.Document    `gorm:"-" json:"-"`
	RepoDirectory     string                 `gorm:"-" json:"-"`
	FilePath          string                 `gorm:"-" json:"-"`
	OriginalSource    string                 `gorm:"-" json:"-"`
	ModifiedSource    string                 `gorm:"-" json:"-"`
	Synthetic         bool                   `gorm:"-" json:"-"`
	DocumentRewriters []DocumentPathRewriter `gorm:"-" json:"-"`
}
