// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package model

import (
	wcModel "github.com/pb33f/libopenapi/what-changed/model"
)

type HTMLReportItem struct {
	OriginalSpec    string                   `json:"originalSpec"`
	ModifiedSpec    string                   `json:"modifiedSpec"`
	DocumentChanges *wcModel.DocumentChanges `json:"documentChanges,omitempty"`
	TreeNodes       []*TreeNode              `json:"tree,omitempty"`
	Graph           *GraphResult             `json:"graph,omitempty"`
	Statistics      *ChangeStatistics        `json:"statistics"`
}

type HTMLReport struct {
	DateGenerated string            `json:"dateGenerated"`
	ReportItems   []*HTMLReportItem `json:"reportItems"`
	UseCDN        bool              `json:"useCDN"`
}

type TreeNode struct {
	TitleString     string          `json:"titleString"`
	Title           string          `json:"title,omitempty"`
	Key             string          `json:"key"`
	IsLeaf          bool            `json:"isLeaf,omitempty"`
	Selectable      bool            `json:"selectable,omitempty"`
	TotalChanges    int             `json:"totalChanges,omitempty"`
	BreakingChanges int             `json:"breakingChanges,omitempty"`
	Change          *wcModel.Change `json:"change,omitempty"`
	Disabled        bool            `json:"disabled,omitempty"`
	Children        []*TreeNode     `json:"children,omitempty"`
}

type ChangeStatistics struct {
	Total            int               `json:"total"`
	TotalBreaking    int               `json:"totalBreaking"`
	Added            int               `json:"added"`
	Modified         int               `json:"modified"`
	Removed          int               `json:"removed"`
	BreakingAdded    int               `json:"breakingAdded"`
	BreakingModified int               `json:"breakingModified"`
	BreakingRemoved  int               `json:"breakingRemoved"`
	Commit           *CommitStatistics `json:"commit,omitempty"`
}

type CommitStatistics struct {
	Date        string `json:"date,omitempty"`
	Message     string `json:"message,omitempty"`
	Author      string `json:"author,omitempty"`
	AuthorEmail string `json:"authorEmail,omitempty"`
	Hash        string `json:"hash,omitempty"`
}
