// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
	"fmt"
	"strings"

	"github.com/gdamore/tcell/v2"
	whatChanged "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/rivo/tview"
)

const (
	CYAN                   = "#67eaf9::b"
	MAGENTA                = "#ea67f9::b"
	lineNumber   ColorType = 0
	changeNumber ColorType = 1
	originalView ViewType  = 0
	newView      ViewType  = 1
)

func BuildTextView() *tview.TextView {
	return tview.NewTextView().
		SetDynamicColors(true).
		SetRegions(true).
		SetWordWrap(false)
}

func BuildDiffView(originalText, newText *tview.TextView) *tview.Flex {
	return tview.NewFlex().
		AddItem(originalText, 0, 1, false).
		AddItem(newText, 0, 1, false)
}

func RenderDiff(left, right *tview.TextView, diffView *tview.Flex, change *whatChanged.Change) {

	// todo: this needs a bunch of cleanup, it's pretty messy, all prototype code.

	curr := activeCommit
	diffView.Clear()
	if change == nil {
		left.Clear()
		right.Clear()
		return
	}

	var context *whatChanged.ChangeContext
	if change.Context != nil {
		context = change.Context
	}

	if change.OriginalObject == nil {
		left.Clear()
	} else {
		left.Clear()

		if context != nil && context.OriginalLine != nil {

			table := tview.NewTable()
			table.SetBorders(false)
			table.SetBorderPadding(0, 0, 0, 0)

			table.SetCell(0, 0, tview.NewTableCell("Original Value").SetTextColor(CYAN_CELL_COLOR))
			table.SetCell(0, 1, tview.NewTableCell("Line").SetTextColor(tcell.ColorGrey))
			table.SetCell(0, 2, tview.NewTableCell("Column").SetTextColor(tcell.ColorGrey))

			origLine := 0
			origCol := 0
			if context.OriginalLine != nil {
				origLine = *context.OriginalLine
			}
			if context.OriginalColumn != nil {
				origCol = *context.OriginalColumn
			}

			if change.NewObject == nil {
				switch change.Breaking {
				case true:
					table.SetCell(0, 3, tview.NewTableCell("Breaking").SetTextColor(tcell.ColorRed))
				}
			}

			if context.OriginalLine != nil {
				table.SetCell(1, 0, tview.NewTableCell(change.Original))
				table.SetCell(1, 1,
					tview.NewTableCell(fmt.Sprint(origLine)).SetAlign(tview.AlignCenter))
				table.SetCell(1, 2,
					tview.NewTableCell(fmt.Sprint(origCol)).SetAlign(tview.AlignCenter))
			}

			if change.NewObject == nil {
				switch change.Breaking {
				case true:
					table.SetCell(1, 3, tview.NewTableCell("YES!").
						SetTextColor(tcell.ColorRed).SetAlign(tview.AlignCenter))
				}

			}
			y := tview.NewFlex()
			y.SetDirection(tview.FlexRow)
			y.AddItem(table, 3, 1, false).
				AddItem(left, 0, 1, false)
			diffView.AddItem(y, 0, 1, false)

			left.SetWrap(false)
			clipped, startLine, highlightLine, endLine :=
				buildClippedLines(string(curr.OldData), origLine)
			clipped = styleClippedLines(clipped, originalView, startLine, highlightLine, endLine, change.Breaking)
			_, _ = fmt.Fprintf(left, "%s", strings.Join(clipped, "\n"))
		}
	}
	if change.NewObject == nil {
		right.Clear()
		fmt.Fprintf(right, "no Data available.")
	} else {

		right.Clear()
		right.SetWrap(false)
		table := tview.NewTable().SetBorders(false)

		table.SetCell(0, 0, tview.NewTableCell("New Value").SetTextColor(MAGENTA_CELL_COLOR))
		table.SetCell(0, 1, tview.NewTableCell("Line").SetTextColor(tcell.ColorGrey))
		table.SetCell(0, 2, tview.NewTableCell("Column").SetTextColor(tcell.ColorGrey))

		switch change.Breaking {
		case true:
			table.SetCell(0, 3, tview.NewTableCell("Breaking").SetTextColor(tcell.ColorRed))
		case false:
			table.SetCell(0, 3, tview.NewTableCell("Breaking").SetTextColor(tcell.ColorGrey))
		}

		newLine := 0
		newCol := 0
		if context != nil && context.NewLine != nil {
			newLine = *context.NewLine
		}
		if context != nil && context.NewColumn != nil {
			newCol = *context.NewColumn
		}

		table.SetCell(1, 0, tview.NewTableCell(change.New))
		table.SetCell(1, 1, tview.NewTableCell(fmt.Sprint(newLine)).
			SetAlign(tview.AlignCenter))
		table.SetCell(1, 2, tview.NewTableCell(fmt.Sprint(newCol)).
			SetAlign(tview.AlignCenter))
		switch change.Breaking {
		case true:
			table.SetCell(1, 3, tview.NewTableCell("YES!").SetTextColor(tcell.ColorRed).
				SetAlign(tview.AlignCenter))
		case false:
			table.SetCell(1, 3, tview.NewTableCell("No").SetTextColor(tcell.ColorGrey).
				SetAlign(tview.AlignCenter))
		}

		y := tview.NewFlex()
		y.SetDirection(tview.FlexRow)
		y.AddItem(table, 3, 1, false).
			AddItem(right, 0, 1, false)
		diffView.AddItem(y, 0, 1, false)

		clipped, startLine, highlightLine, endLine := buildClippedLines(string(curr.Data), newLine)
		clipped = styleClippedLines(clipped, newView, startLine, highlightLine, endLine, change.Breaking)
		_, _ = fmt.Fprintf(right, "%s", strings.Join(clipped, "\n"))
	}

}

func buildClippedLines(data string, line int) ([]string, int, int, int) {
	parsed := strings.Split(data, "\n")
	if len(parsed) == 0 {
		parsed = []string{""}
	}

	highlightLine := line
	if highlightLine < 1 {
		highlightLine = 1
	}
	if highlightLine > len(parsed) {
		highlightLine = len(parsed)
	}

	startLine := highlightLine - 4
	if startLine < 1 {
		startLine = 1
	}
	endLine := startLine + 12
	if endLine > len(parsed) {
		endLine = len(parsed)
	}
	if endLine-startLine < 12 {
		startLine = endLine - 12
		if startLine < 1 {
			startLine = 1
		}
	}

	clipped := append([]string(nil), parsed[startLine-1:endLine]...)
	return clipped, startLine, highlightLine, endLine
}

func styleClippedLines(clipped []string, view ViewType, startLine, highlightLine, endLine int, breaking bool) []string {
	currentLine := startLine
	for i := range clipped {
		if currentLine != highlightLine {
			clipped[i] = fmt.Sprintf("[grey]%s[-:-]", clipped[i])
		} else {
			color := getColorForChange(view, changeNumber, currentLine, highlightLine)
			if breaking {
				color = "red"
			}
			clipped[i] = fmt.Sprintf("[%s]%s[-:-]", color, clipped[i])
		}

		color := getColorForChange(view, lineNumber, currentLine, highlightLine)
		if breaking && currentLine == highlightLine {
			color = "red"
		}
		clipped[i] = fmt.Sprintf("%s[%s]%d|[-] %s",
			printSpacing(currentLine, endLine), color, currentLine, clipped[i])
		currentLine++
	}
	return clipped
}

func getColorForChange(view ViewType, changeType ColorType, currentLine, changeLine int) string {

	if changeType == changeNumber && currentLine != changeLine {
		return "grey"
	}

	if changeType == lineNumber && currentLine != changeLine {
		return "grey"
	}

	switch view {
	case originalView:
		switch changeType {
		case lineNumber:
			return CYAN
		case changeNumber:
			return CYAN
		}

	case newView:
		switch changeType {
		case lineNumber:
			return MAGENTA
		case changeNumber:
			return MAGENTA
		}

	}

	return ""
}

func printSpacing(currentLine, maxLine int) string {
	var buf strings.Builder
	spacing := calcSpacing(currentLine, maxLine)
	for i := 0; i < spacing; i++ {
		buf.WriteString(" ")
	}
	return buf.String()
}

func calcSpacing(currentLine, maxLine int) int {
	currDigits := 0
	maxDigits := 0

	h := currentLine
	for h > 0 {
		h = h / 10
		currDigits++
	}
	h = maxLine
	for h > 0 {
		h = h / 10
		maxDigits++
	}
	return maxDigits - currDigits
}

func createForm(detailsTable *tview.Table, change *whatChanged.Change) {

	var origLine, newLine, origCol, newCol int
	if change.Context.OriginalLine != nil {
		origLine = *change.Context.OriginalLine
	}
	if change.Context.NewLine != nil {
		newLine = *change.Context.NewLine
	}
	if change.Context.OriginalColumn != nil {
		origCol = *change.Context.OriginalColumn
	}
	if change.Context.NewColumn != nil {
		newCol = *change.Context.NewColumn
	}

	switch change.ChangeType {
	case whatChanged.PropertyAdded, whatChanged.ObjectAdded:
		detailsTable.SetCell(1, 0, tview.NewTableCell("Added"))
		detailsTable.SetCell(1, 1, tview.NewTableCell(change.Property))
		detailsTable.SetCell(1, 2, tview.NewTableCell(change.New))
		detailsTable.SetCell(1, 3, tview.NewTableCell(fmt.Sprint(newLine)))
		detailsTable.SetCell(1, 4, tview.NewTableCell(fmt.Sprint(newCol)))
		detailsTable.RemoveRow(2)
		break
	case whatChanged.PropertyRemoved, whatChanged.ObjectRemoved:
		detailsTable.SetCell(1, 0, tview.NewTableCell("Removed"))
		detailsTable.SetCell(1, 1, tview.NewTableCell(change.Property))
		detailsTable.SetCell(1, 2, tview.NewTableCell(change.Original))
		detailsTable.SetCell(1, 3, tview.NewTableCell(fmt.Sprint(origLine)))
		detailsTable.SetCell(1, 4, tview.NewTableCell(fmt.Sprint(origCol)))
		detailsTable.RemoveRow(2)
		break
	default:
		detailsTable.SetCell(1, 0, tview.NewTableCell("Original"))
		detailsTable.SetCell(1, 1, tview.NewTableCell(change.Property))
		detailsTable.SetCell(1, 2, tview.NewTableCell(change.Original))
		detailsTable.SetCell(1, 3, tview.NewTableCell(fmt.Sprint(origLine)))
		detailsTable.SetCell(1, 4, tview.NewTableCell(fmt.Sprint(origCol)))
		detailsTable.SetCell(2, 0, tview.NewTableCell("New"))
		detailsTable.SetCell(2, 1, tview.NewTableCell(change.Property))
		detailsTable.SetCell(2, 2, tview.NewTableCell(change.New))
		detailsTable.SetCell(2, 3, tview.NewTableCell(fmt.Sprint(newLine)))
		detailsTable.SetCell(2, 4, tview.NewTableCell(fmt.Sprint(newCol)))
	}
}
