// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
    "github.com/gdamore/tcell/v2"
    whatChanged "github.com/pb33f/libopenapi/what-changed/model"
    "github.com/rivo/tview"
    "what-changed/model"
)

var activeCommit *model.Commit

func BuildApplication(commitHistory []*model.Commit) *tview.Application {

    commit := commitHistory[0]

    tree := BuildTreeView(commit)
    table := BuildCommitTable(commitHistory)
    textViewOrig := BuildTextView()
    textViewNew := BuildTextView()

    diffView := tview.NewFlex().
        AddItem(textViewOrig, 0, 1, false).
        AddItem(textViewNew, 0, 1, false)

    grid := tview.NewGrid().
        SetRows(0, 16).
        SetColumns(0, 60).
        SetBorders(true)
    //AddItem(newPrimitive("Header"), 0, 0, 1, 2, 0, 0, false).
    //AddItem(newPrimitive("Toast"), 2, 0, 1, 2, 0, 0, false).
    //AddItem(diffView, 3, 0, 1, 2, 0, 0, false)

    grid.SetGap(2, 2)

    // Layout for screens narrower than 100 cells (menu and side bar are hidden).
    //grid.AddItem(table, 0, 0, 0, 0, 0, 0, false).
    //    AddItem(tree, 1, 0, 1, 2, 0, 0, false)
    //      AddItem(sideBar, 0, 0, 0, 0, 0, 0, false)

    // Layout for screens wider than 100 cells.
    grid.AddItem(table, 0, 0, 1, 1, 0, 100, false).
        AddItem(tree, 0, 1, 1, 1, 0, 100, false).
        AddItem(diffView, 1, 0, 1, 2, 0, 100, false)

    //AddItem(sideBar, 1, 2, 1, 1, 0, 100, false)

    app := tview.NewApplication()

    RegisterModelsWithCommitTable(table, commitHistory, tree, app)

    tree.SetDoneFunc(func(key tcell.Key) {
        if key == tcell.KeyEscape {
            app.SetFocus(table)
        }
    })

    tree.SetSelectedFunc(func(node *tview.TreeNode) {
        ref := node.GetReference()
        if ref != nil {

            if _, ok := ref.(*whatChanged.Change); ok {
                //createForm(detailsTable, ref.(*whatChanged.Change))
                RenderDiff(textViewOrig, textViewNew, diffView, ref.(*whatChanged.Change))

            }

        }
    })

    table.SetSelectable(true, false)
    app.SetRoot(grid, true).EnableMouse(true)
    //table.SetF
    app.SetFocus(table)
    table.Select(1, 1)
    return app
}
