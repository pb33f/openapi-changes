// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
    "encoding/json"
    "github.com/pb33f/libopenapi"
    "os"
    "testing"
)

func TestBuildTree(t *testing.T) {

    oldBits, _ := os.ReadFile("../sample-specs/petstorev3-original.json")
    newBits, _ := os.ReadFile("../sample-specs/petstorev3.json")
    oldDoc, _ := libopenapi.NewDocument(oldBits)
    newDoc, _ := libopenapi.NewDocument(newBits)
    changes, _ := libopenapi.CompareDocuments(oldDoc, newDoc)

    tree := BuildTree(changes)
    nodes, edges := BuildGraph(changes)
    graph := &GraphResult{nodes, edges}

    // build a report DTO
    reportDTO := &HTMLReport{
        OriginalSpec:    string(oldBits),
        ModifiedSpec:    string(newBits),
        DocumentChanges: changes,
        TreeNodes:       tree,
        Graph:           graph,
    }

    dto, _ := json.Marshal(reportDTO)

    _ = os.WriteFile("../html-report/ui/data.json", dto, 0664)

}
