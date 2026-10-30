// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package model

import (
	"github.com/pb33f/libasyncapi"
	"github.com/pb33f/libopenapi"
	whatChanged "github.com/pb33f/libopenapi/what-changed"
	wc "github.com/pb33f/libopenapi/what-changed/model"
	"time"
)

type DocumentPathRewriter func(string) string

type Commit struct {
	Specification     *ComparisonSpecification `json:"-"`
	OriginalRevision  string                   `json:"-"`
	ChangeReport      whatChanged.Changed      `json:"-"`
	Source            *HistorySource           `json:"-"`
	Window            *HistoryWindow           `json:"-"`
	Rules             *ComparisonRules         `json:"-"`
	CreatedAt         time.Time                `json:"-"`
	UpdatedAt         time.Time                `json:"-"`
	ID                uint                     `gorm:"primaryKey" json:"-"`
	Hash              string                   `json:"commitHash"`
	Message           string                   `json:"message"`
	Author            string                   `json:"author"`
	AuthorEmail       string                   `gorm:"index" json:"authorEmail"`
	CommitDate        time.Time                `json:"committed"`
	Changes           *wc.DocumentChanges      `gorm:"-" json:"changeReport,omitempty"`
	AsyncDocument     libasyncapi.Document     `json:"-"`
	OldAsyncDocument  libasyncapi.Document     `json:"-"`
	SerializedChanges []byte                   `gorm:"-" json:"-"`
	Data              []byte                   `gorm:"-" json:"-"`
	OldData           []byte                   `gorm:"-" json:"-"`
	Document          libopenapi.Document      `gorm:"-" json:"-"`
	OldDocument       libopenapi.Document      `gorm:"-" json:"-"`
	RepoDirectory     string                   `gorm:"-" json:"-"`
	FilePath          string                   `gorm:"-" json:"-"`
	OriginalSource    string                   `gorm:"-" json:"-"`
	ModifiedSource    string                   `gorm:"-" json:"-"`
	Synthetic         bool                     `gorm:"-" json:"-"`
	DocumentRewriters []DocumentPathRewriter   `gorm:"-" json:"-"`
}

// AllChanges returns the active engine report while preserving Changes for
// callers that consume the existing concrete OpenAPI history API.
func (c *Commit) AllChanges() whatChanged.Changed {
	if c.ChangeReport != nil {
		return c.ChangeReport
	}
	if c.Changes != nil {
		return c.Changes
	}
	return nil
}
