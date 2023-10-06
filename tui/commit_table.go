// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
	"fmt"
	"github.com/gdamore/tcell/v2"
	"github.com/pb33f/openapi-changes/model"
	"github.com/rivo/tview"
)

func BuildCommitTable(commitHistory []*model.Commit) *tview.Table {
	table := tview.NewTable().SetBorders(false)
	table.SetCell(0, 0, tview.NewTableCell("Date").SetTextColor(CYAN_CELL_COLOR))
	table.SetCell(0, 1, tview.NewTableCell("Message").SetTextColor(CYAN_CELL_COLOR))
	table.SetCell(0, 2, tview.NewTableCell("Changes").SetTextColor(CYAN_CELL_COLOR))
	table.SetCell(0, 3, tview.NewTableCell("Breaking").SetTextColor(CYAN_CELL_COLOR))
	n := 1
	for k := range commitHistory {
		if commitHistory[k].Changes != nil {
			table.SetCell(n, 0, tview.NewTableCell(commitHistory[k].CommitDate.Format("01/02/06")))
			table.SetCell(n, 1, tview.NewTableCell(commitHistory[k].Message))
			if commitHistory[k].Changes != nil {
				table.SetCell(n, 2, tview.NewTableCell(fmt.Sprint(commitHistory[k].Changes.TotalChanges())).SetAlign(tview.AlignCenter))
				table.SetCell(n, 3, tview.NewTableCell(fmt.Sprint(commitHistory[k].Changes.TotalBreakingChanges())).SetAlign(tview.AlignCenter))
			} else {
				table.SetCell(n, 2, tview.NewTableCell("X").SetAlign(tview.AlignCenter))
				table.SetCell(n, 3, tview.NewTableCell("X").SetAlign(tview.AlignCenter))
			}
			n++
		}
	}
	return table
}

func ResetTableColors(table *tview.Table, row int, highlight tcell.Color) {
	for r := 0; r < table.GetRowCount(); r++ {
		for c := 0; c < table.GetColumnCount(); c++ {
			table.GetCell(r, c).SetTextColor(tcell.ColorWhite)
		}
	}
	for c := 0; c < table.GetColumnCount(); c++ {
		table.GetCell(row, c).SetTextColor(highlight)
	}
}

func RegisterModelsWithCommitTable(table *tview.Table,
	commitHistory []*model.Commit, treeView *tview.TreeView, app *tview.Application) {

	table.Select(0, 0).SetFixed(1, 1).SetDoneFunc(func(key tcell.Key) {
		if key == tcell.KeyEscape {
			app.Stop()
		}
	}).SetSelectedFunc(func(row int, column int) {
		ResetTableColors(table, row, MAGENTA_CELL_COLOR)

		rn := row - 1
		if rn < 0 {
			rn = 0
		}

		c := commitHistory[rn]
		activeCommit = c
		selectedRow = row

		r := BuildTreeModel(c.Document, c.Changes)
		treeView.SetRoot(r)
		treeView.SetCurrentNode(r)
		app.SetFocus(treeView)
		treeView.SetTopLevel(0)
	})

	table.SetSelectionChangedFunc(func(row int, column int) {
		rn := row - 1
		if rn < 0 {
			rn = 0
		}
		ResetTableColors(table, row, CYAN_CELL_COLOR)
		c := commitHistory[rn]
		activeCommit = c
		r := BuildTreeModel(c.Document, c.Changes)
		treeView.SetRoot(r)

		if len(commitHistory) < 3 {
			app.SetFocus(treeView)
		}

		treeView.SetCurrentNode(r)
		treeView.SetTopLevel(0)
	})

}
