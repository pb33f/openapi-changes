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

    tree, stats := BuildTree(changes)

    nodes, edges := BuildGraph(changes)
    graph := &GraphResult{nodes, edges}

    // inject some commit data to stats

    message := "Added a few descriptions to operations and swapped out some tags on customer API and then updated" +
        " some of the examples on the customer API that help explain more about the return objects. Also included" +
        " a new title and bumped the version up"

    commit := &CommitStatistics{
        CommitDate:        "01/09/23 1:23 PM",
        CommitMessage:     message,
        CommitAuthor:      "daveshanley",
        CommitAuthorEmail: "dave@quobix.com",
        CommitHash:        "62b8sn",
    }

    stats.Commit = commit

    // build a report DTO
    reportDTO := &HTMLReport{
        OriginalSpec:    string(oldBits),
        ModifiedSpec:    string(newBits),
        DocumentChanges: changes,
        Statistics:      stats,
        TreeNodes:       tree,
        Graph:           graph,
    }

    dto, _ := json.Marshal(reportDTO)

    _ = os.WriteFile("../html-report/ui/data.json", dto, 0664)

}
