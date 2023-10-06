// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
	"fmt"
	"github.com/gdamore/tcell/v2"
	whatChanged "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/rivo/tview"
	"strings"
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

	if change.OriginalObject == nil {
		left.Clear()
	} else {
		left.Clear()

		if change.Context.OriginalLine != nil {

			table := tview.NewTable()
			table.SetBorders(false)
			table.SetBorderPadding(0, 0, 0, 0)

			table.SetCell(0, 0, tview.NewTableCell("Original Value").SetTextColor(CYAN_CELL_COLOR))
			table.SetCell(0, 1, tview.NewTableCell("Line").SetTextColor(tcell.ColorGrey))
			table.SetCell(0, 2, tview.NewTableCell("Column").SetTextColor(tcell.ColorGrey))

			if change.NewObject == nil {
				switch change.Breaking {
				case true:
					table.SetCell(0, 3, tview.NewTableCell("Breaking").SetTextColor(tcell.ColorRed))
				}
			}

			if change.Context.OriginalLine != nil && change.Context.OriginalColumn != nil {
				table.SetCell(1, 0, tview.NewTableCell(change.Original))
				table.SetCell(1, 1,
					tview.NewTableCell(fmt.Sprint(*change.Context.OriginalLine)).SetAlign(tview.AlignCenter))
				table.SetCell(1, 2,
					tview.NewTableCell(fmt.Sprint(*change.Context.OriginalColumn)).SetAlign(tview.AlignCenter))
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
			data := string(curr.OldData)
			parsed := strings.Split(data, "\n")

			var clipped []string

			var startLine, currentLine, endLine int

			if change.Context.OriginalLine != nil && *change.Context.OriginalLine > 5 {
				clipped = parsed[*change.Context.OriginalLine-5 : *change.Context.OriginalLine+8]

				startLine = *change.Context.OriginalLine - 4
				currentLine = startLine
				endLine = *change.Context.OriginalLine + 8

				for j := range clipped {
					if j != 4 {
						clipped[j] = fmt.Sprintf("[grey]%s[-:-]", clipped[j])
					}
				}

				color := getColorForChange(originalView, changeNumber, startLine, currentLine)

				if !change.Breaking {
					clipped[4] = fmt.Sprintf("[%s]%s[-:-]", color, clipped[4])
				} else {
					clipped[4] = fmt.Sprintf("[%s]%s[-:-]", "red", clipped[4])
				}

			} else {
				if change.Context.OriginalLine != nil {
					startLine = *change.Context.OriginalLine
					currentLine = startLine
					endLine = *change.Context.OriginalLine + 13

					for j := range clipped {
						if j != *change.Context.OriginalLine {
							clipped[j] = fmt.Sprintf("[%s]%s[-:-]", "grey", clipped[j])
						}
					}

					color := getColorForChange(originalView, changeNumber, startLine, currentLine)

					clipped = parsed[0 : *change.Context.OriginalLine+13]

					if !change.Breaking {
						clipped[*change.Context.OriginalLine] = fmt.Sprintf("[%s]%s[-:-]",
							color, clipped[*change.Context.OriginalLine])
					} else {
						clipped[*change.Context.OriginalLine] = fmt.Sprintf("[%s]%s[-:-]", "red",
							clipped[*change.Context.OriginalLine])
					}
				}
			}

			if change.Context.OriginalLine != nil {

				for x := range clipped {
					color := getColorForChange(originalView, lineNumber, currentLine, *change.Context.OriginalLine)
					if !change.Breaking {
						clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s",
							printSpacing(currentLine, endLine), color, currentLine, clipped[x])
					} else {
						if currentLine != *change.Context.OriginalLine {
							clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s",
								printSpacing(currentLine, endLine), color, currentLine, clipped[x])
						} else {
							clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s",
								printSpacing(currentLine, endLine), "red", currentLine, clipped[x])
						}
					}
					currentLine++
				}
			}

			fmt.Fprintf(left, strings.Join(clipped, "\n"))
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

		table.SetCell(1, 0, tview.NewTableCell(change.New))
		table.SetCell(1, 1, tview.NewTableCell(fmt.Sprint(*change.Context.NewLine)).
			SetAlign(tview.AlignCenter))
		table.SetCell(1, 2, tview.NewTableCell(fmt.Sprint(*change.Context.NewColumn)).
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

		data := string(curr.Data)
		parsed := strings.Split(data, "\n")

		var clipped []string

		var startLine, currentLine, endLine int

		if *change.Context.NewLine > 5 {
			clipped = parsed[*change.Context.NewLine-5 : *change.Context.NewLine+8]
			startLine = *change.Context.NewLine - 4
			currentLine = startLine
			endLine = *change.Context.NewLine + 8

			for j := range clipped {
				if j != 4 {
					clipped[j] = fmt.Sprintf("[grey]%s[-:-]", clipped[j])
				}
			}

			color := getColorForChange(newView, changeNumber, startLine, currentLine)
			clipped[4] = fmt.Sprintf("[%s]%s[-:-]", color, clipped[4])

		} else {
			startLine = *change.Context.NewLine
			currentLine = startLine
			endLine = *change.Context.NewLine + 13
			color := getColorForChange(newView, changeNumber, startLine, currentLine)

			for j := range clipped {
				if j != *change.Context.NewLine {
					clipped[j] = fmt.Sprintf("[%s]%s[-:-]", "grey", clipped[j])
				}
			}

			clipped = parsed[0 : *change.Context.NewLine+13]
			clipped[*change.Context.NewLine] = fmt.Sprintf("[%s]%s[-:-]", color, clipped[*change.Context.NewLine])

		}

		for x := range clipped {
			color := getColorForChange(newView, lineNumber, currentLine, *change.Context.NewLine)
			clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s",
				printSpacing(currentLine, endLine), color, currentLine, clipped[x])
			currentLine++
		}

		fmt.Fprintf(right, strings.Join(clipped, "\n"))
	}

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
