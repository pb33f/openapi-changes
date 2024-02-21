// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
	"fmt"
	"github.com/gdamore/tcell/v2"
	whatChanged "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pterm/pterm"
	"github.com/rivo/tview"
)

var activeCommit *model.Commit
var selectedRow int

func BuildApplication(commitHistory []*model.Commit, version string) *tview.Application {

	// first commit
	commit := commitHistory[0]

	// tree view
	tree := BuildTreeView(commit)
	if tree == nil {
		pterm.Error.Println("Cannot render console, no results were extracted.")
		return nil
	}

	// build table filled with commit / history
	table := BuildCommitTable(commitHistory)

	// build left and right text views
	textViewOrig := BuildTextView()
	textViewNew := BuildTextView()

	// build diff view from left and right text views.
	diffView := BuildDiffView(textViewOrig, textViewNew)

	// title
	title := tview.NewTextView().
		SetDynamicColors(true).
		SetWordWrap(true)

	if len(commitHistory) < 3 {
		_, _ = fmt.Fprintf(title, "[%s]openapi-changes: %s[default] | controls: up/down/enter to select "+
			"change. Hit esc to back up.", MAGENTA, version)
	} else {
		_, _ = fmt.Fprintf(title, "[%s]openapi-changes: %s[default] | controls: up/down/enter to select commit, "+
			"then same for change. Hit esc to back up a level.", MAGENTA, version)
	}

	// build a grid to hold all views.
	grid := tview.NewGrid().
		SetRows(1, 8, 12, 0).
		SetColumns(0, 60).
		SetBorders(true)
	grid.SetGap(2, 2)

	grid.AddItem(title, 0, 0, 1, 2, 0, 0, false).
		AddItem(table, 1, 0, 1, 2, 0, 0, false).
		AddItem(tree, 2, 0, 1, 2, 0, 0, false).
		AddItem(diffView, 3, 0, 1, 2, 0, 0, false)

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
