// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
    "encoding/json"
    "github.com/pb33f/openapi-changes/git"
    "github.com/pb33f/openapi-changes/model"
    "github.com/stretchr/testify/assert"
    "os"
    "path/filepath"
    "testing"
    "time"
)

func TestBuildTree(t *testing.T) {

    cwd, _ := os.Getwd()
    dir, _ := filepath.Split(cwd)

    history := git.ExtractHistoryUsingLib(dir, "sample-specs/petstorev3.json")
    assert.NotNil(t, history)
    assert.Equal(t, "And now it's generally wrecked. But what a fun journey.\n", history[0].Message)

    // build out the commit change log and ensure everything is in the right place.
    errors := git.PopulateHistoryWithChanges(history, nil, false)
    assert.Len(t, errors, 0)
    for x := range history {
        if x != len(history)-1 { // last item is first commit, it can't be diffed.
            assert.NotNil(t, history[x].Changes)
            assert.NotNil(t, history[x].OldData)
        }
    }

    var reportItems []*model.HTMLReportItem

    // build out report items
    for x := range history {

        historyItem := history[x]

        if historyItem.Changes != nil {

            tree, stats := BuildTree(historyItem.Changes)
            nodes, edges := BuildGraph(historyItem.Changes)
            graph := &model.GraphResult{nodes, edges}

            commit := &model.CommitStatistics{ // JS format: 01 Jan 1970 00:00:00 GMT
                Date:        historyItem.CommitDate.Format("02 Jan 2006 15:04:05 MST"),
                Message:     historyItem.Message,
                Author:      historyItem.Author,
                AuthorEmail: historyItem.AuthorEmail,
                Hash:        historyItem.Hash,
            }

            stats.Commit = commit

            // build a report DTO
            reportDTO := &model.HTMLReportItem{
                OriginalSpec: string(historyItem.OldData),
                ModifiedSpec: string(historyItem.Data),
                Statistics:   stats,
                TreeNodes:    []*model.TreeNode{tree},
                Graph:        graph,
            }
            reportItems = append(reportItems, reportDTO)
        } else {
            // first item
            commit := &model.CommitStatistics{ // JS format: 01 Jan 1970 00:00:00 GMT
                Date:        historyItem.CommitDate.Format("02 Jan 2006 15:04:05 MST"),
                Message:     historyItem.Message,
                Author:      historyItem.Author,
                AuthorEmail: historyItem.AuthorEmail,
                Hash:        historyItem.Hash,
            }

            stats := &model.ChangeStatistics{}
            stats.Commit = commit

            // build a report DTO
            reportDTO := &model.HTMLReportItem{
                OriginalSpec: string(historyItem.OldData),
                ModifiedSpec: string(historyItem.Data),
                Statistics:   stats,
            }
            reportItems = append(reportItems, reportDTO)
        }
    }

    report := &model.HTMLReport{
        DateGenerated: time.Now().Format("Mon, 2 Jan 2006 15:04:05 -0400"),
        ReportItems:   reportItems,
    }

    dto, _ := json.MarshalIndent(report, "", "  ")

    err := os.WriteFile("../html-report/ui/data.json", dto, 0664)
    assert.NoError(t, err)

}
