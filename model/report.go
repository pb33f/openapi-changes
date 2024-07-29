// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

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
	Commit    *Commit                     `gorm:"foreignKey:ID" json:"commitDetails"`
}

type FlatReport struct {
	Summary map[string]*reports.Changed `json:"reportSummary"`
	Changes []*HashedChange             `json:"changes"`
	Commit  *Commit                     `gorm:"foreignKey:ID" json:"commitDetails"`
}

type FlatHistoricalReport struct {
	GitRepoPath   string        `json:"gitRepoPath"`
	GitFilePath   string        `json:"gitFilePath"`
	Filename      string        `json:"filename"`
	DateGenerated string        `json:"dateGenerated"`
	Reports       []*FlatReport `json:"reports" `
}

type HistoricalReport struct {
	ID            uint      `gorm:"primaryKey" json:"-"`
	GitRepoPath   string    `gorm:"index" json:"gitRepoPath"`
	GitFilePath   string    `json:"gitFilePath"`
	Filename      string    `json:"filename"`
	DateGenerated string    `json:"dateGenerated"`
	Reports       []*Report `gorm:"foreignKey:ID" json:"reports" `
}
