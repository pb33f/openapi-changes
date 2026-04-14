// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package model

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/libopenapi/what-changed/reports"
	"time"
)

type HashedChange struct {
	*model.Change
	ChangeHash string `json:"changeHash,omitempty"`
	RawPath    string `json:"rawPath,omitempty"`
}

func (hc *HashedChange) MarshalJSON() ([]byte, error) {
	changeJson, err := hc.Change.MarshalJSON()

	if err != nil {
		return nil, err
	}

	var data map[string]interface{}

	err = json.Unmarshal(changeJson, &data)
	if err != nil {
		return nil, err
	}

	data["changeHash"] = hc.ChangeHash
	if hc.RawPath != "" {
		data["rawPath"] = hc.RawPath
	}

	return json.Marshal(data)
}

func getIntValue(pointer *int) int {
	if pointer == nil {
		return -1
	}

	return *pointer
}

func (hc *HashedChange) HashChange() {

	context := hc.Context
	contextString := fmt.Sprintf("%d-%d-%d-%d",
		getIntValue(context.OriginalLine),
		getIntValue(context.OriginalColumn),
		getIntValue(context.NewLine),
		getIntValue(context.NewColumn))

	changeString := fmt.Sprintf("%d-%s-%s-%s-%s", hc.ChangeType, hc.Property, hc.Original, hc.New, contextString)

	hasher := sha256.New()
	hasher.Write([]byte(changeString))

	hc.ChangeHash = base64.URLEncoding.EncodeToString(hasher.Sum(nil))
}

type Report struct {
	ID        uint                        `gorm:"primaryKey" json:"-"`
	Summary   map[string]*reports.Changed `gorm:"-" json:"reportSummary"`
	CreatedAt time.Time                   `json:"-"`
	UpdatedAt time.Time                   `json:"-"`
	Commit    *Commit                     `gorm:"foreignKey:ID" json:"commitDetails,omitempty"`
}

type FlatReport struct {
	Summary       map[string]*reports.Changed `json:"reportSummary"`
	Changes       []*HashedChange             `json:"changes"`
	OriginalPath  string                      `json:"originalPath,omitempty"`
	ModifiedPath  string                      `json:"modifiedPath,omitempty"`
	DateGenerated string                      `json:"dateGenerated,omitempty"`
	Commit        *Commit                     `gorm:"foreignKey:ID" json:"commitDetails,omitempty"`
}

type HistoricalReportMetaData struct {
	Partial        bool     `json:"partial,omitempty"`
	SkippedCommits []string `json:"skippedCommits,omitempty"`
}

type FlatHistoricalReport struct {
	GitRepoPath   string                    `json:"gitRepoPath"`
	GitFilePath   string                    `json:"gitFilePath"`
	Filename      string                    `json:"filename"`
	DateGenerated string                    `json:"dateGenerated,omitempty"`
	MetaData      *HistoricalReportMetaData `json:"metaData,omitempty"`
	Reports       []*FlatReport             `json:"reports" `
}
