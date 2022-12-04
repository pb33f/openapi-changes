// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
    "github.com/gdamore/tcell/v2"
    whatChanged "github.com/pb33f/libopenapi/what-changed/model"
    "github.com/rivo/tview"
    "github.com/pb33f/openapi-changes/model"
)

var activeCommit *model.Commit
var selectedRow int

func BuildApplication(commitHistory []*model.Commit) *tview.Application {

    // first commit
    commit := commitHistory[0]

    // tree view
    tree := BuildTreeView(commit)

    // build table filled with commit / history
    table := BuildCommitTable(commitHistory)

    // build left and right text views
    textViewOrig := BuildTextView()
    textViewNew := BuildTextView()

    // build diff view from left and right text views.
    diffView := BuildDiffView(textViewOrig, textViewNew)

    // build a grid to hold all views.
    grid := tview.NewGrid().
        SetRows(0, 16).
        SetColumns(0, 60).
        SetBorders(true)
    grid.SetGap(2, 2)
    grid.AddItem(table, 0, 0, 1, 1, 0, 100, false).
        AddItem(tree, 0, 1, 1, 1, 0, 100, false).
        AddItem(diffView, 1, 0, 1, 2, 0, 100, false)

    // build an application.
    app := tview.NewApplication()

    // register models with commit table.
    RegisterModelsWithCommitTable(table, commitHistory, tree, app)

    // when user hits escape on the tree, jump focus back to the table and reset colors.
    tree.SetDoneFunc(func(key tcell.Key) {
        if key == tcell.KeyEscape {
            app.SetFocus(table)
            ResetTableColors(table, selectedRow, CYAN_CELL_COLOR)
        }
    })

    // when selecting a change from the tree
    tree.SetSelectedFunc(func(node *tview.TreeNode) {
        ref := node.GetReference()
        if ref != nil {
            if _, ok := ref.(*whatChanged.Change); ok {
                RenderDiff(textViewOrig, textViewNew, diffView, ref.(*whatChanged.Change))
            }
        }
    })

    // set everything up for the app.
    table.SetSelectable(true, false)
    app.SetRoot(grid, true).EnableMouse(true)
    app.SetFocus(table)
    table.Select(1, 1)
    return app
}
