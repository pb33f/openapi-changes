// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import wcModel "github.com/pb33f/libopenapi/what-changed/model"

type HTMLReport struct {
    OriginalSpec    string                   `json:"originalSpec"`
    ModifiedSpec    string                   `json:"modifiedSpec"`
    DocumentChanges *wcModel.DocumentChanges `json:"documentChanges"`
    TreeNodes       *TreeNode                `json:"tree"`
    Graph           *GraphResult             `json:"graph"`
    Statistics      *ChangeStatistics        `json:"statistics"`
}
