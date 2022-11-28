// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package main

import (
    "bytes"
    "fmt"
    vacuum_model "github.com/daveshanley/vacuum/model"
    "github.com/daveshanley/vacuum/motor"
    "github.com/daveshanley/vacuum/rulesets"
    "github.com/daveshanley/vacuum/statistics"
    vacuum_report "github.com/daveshanley/vacuum/vacuum-report"
    "github.com/gdamore/tcell/v2"
    "github.com/pb33f/libopenapi"
    "github.com/pb33f/libopenapi/datamodel"
    model "github.com/pb33f/libopenapi/what-changed/model"
    "github.com/rivo/tview"
    "log"
    "os/exec"
    "strings"
    "time"
)

type colorType int
type viewType int

type rgb []int32

func (r rgb) r() int32 {
    return r[0]
}
func (r rgb) g() int32 {
    return r[1]
}
func (r rgb) b() int32 {
    return r[2]
}

const (
    CYAN                   = "#67eaf9::b"
    MAGENTA                = "#ea67f9::b"
    lineNumber   colorType = 0
    changeNumber colorType = 1
    originalView viewType  = 0
    newView      viewType  = 1
)

var CYAN_RGB = rgb{103, 234, 249}
var MAGENTA_RGB = rgb{234, 103, 249}
var CYAN_CELL_COLOR = tcell.NewRGBColor(CYAN_RGB.r(), CYAN_RGB.g(), CYAN_RGB.b())
var MAGENTA_CELL_COLOR = tcell.NewRGBColor(MAGENTA_RGB.r(), MAGENTA_RGB.g(), MAGENTA_RGB.b())

type commit struct {
    hash          string
    message       string
    commitDate    time.Time
    data          []byte
    oldData       []byte
    document      libopenapi.Document
    oldDocument   libopenapi.Document
    changes       *model.DocumentChanges
    qualityReport *vacuum_report.VacuumReport
}

func checkStats(info *datamodel.SpecInfo) *vacuum_report.VacuumReport {

    // read in an OpenAPI Spec to a byte array
    //specBytes, err := ioutil.ReadFile("your-openapi-spec.yaml")
    //if err != nil {
    //    panic(err.Error())
    //}

    // build and store built-in vacuum default RuleSets.
    defaultRS := rulesets.BuildDefaultRuleSets()

    // generate the 'recommended' RuleSet
    recommendedRS := defaultRS.GenerateOpenAPIRecommendedRuleSet()

    // apply the rules in the ruleset to the specification
    lintingResults := motor.ApplyRulesToRuleSet(
        &motor.RuleSetExecution{
            RuleSet: recommendedRS,
            //Spec:    specBytes,
            SpecInfo: info,
        })

    // create a new model.RuleResultSet from the results.
    // structure allows categorization, sorting and searching
    // in a simple and consistent way.
    resultSet := vacuum_model.NewRuleResultSet(lintingResults.Results)

    // sort results by line number (so they are not all jumbled)
    resultSet.SortResultsByLineNumber()

    stats := statistics.CreateReportStatistics(lintingResults.Index, info, resultSet)

    // create vacuum report
    return &vacuum_report.VacuumReport{
        Generated:  time.Now(),
        SpecInfo:   info,
        ResultSet:  resultSet,
        Statistics: stats,
    }

}

var currentCommit commit

func main() {

    cmd := exec.Command("git", "--no-pager", "log", "--pretty=%cD||%h||%s", "--", "burgershop.openapi.yaml")
    var stdout, stderr bytes.Buffer
    cmd.Stdout = &stdout
    cmd.Stderr = &stderr
    cmd.Dir = "../../GolandProjects/vacuum/model/test_files"
    err := cmd.Run()
    if err != nil {
        log.Fatalf("cmd.Run() failed with %s\n", err)
    }

    outStr, _ := string(stdout.Bytes()), string(stderr.Bytes())

    var commitHistory []commit
    lines := strings.Split(outStr, "\n")
    for k := range lines {

        c := strings.Split(lines[k], "||")

        if len(c) == 3 {
            date, _ := time.Parse("Mon, 2 Jan 2006 15:04:05 -0400", c[0])
            //if c[2] == "Fixed  more glitches with a few rules." || c[2] == "Fixing tests after upgrading examples rule output" {
            commitHistory = append(commitHistory, commit{commitDate: date, hash: c[1], message: c[2]})
            // }
        }
    }

    for c := range commitHistory {

        cmd = exec.Command("git", "--no-pager", "show", fmt.Sprintf("%s:%s", commitHistory[c].hash, "model/test_files/burgershop.openapi.yaml"))
        var ou, er bytes.Buffer
        cmd.Stdout = &ou
        cmd.Stderr = &er
        cmd.Dir = "../../GolandProjects/vacuum/model/test_files"
        err = cmd.Run()
        if err != nil {
            panic("cmd.Run() failed" + err.Error())

        }

        commitHistory[c].data = ou.Bytes()

        outStr, _ = string(stdout.Bytes()), string(stderr.Bytes())
        //fmt.Sprintf(outStr)

    }

    for c := len(commitHistory) - 1; c > -1; c-- {

        var oldBytes, newBits []byte

        if len(commitHistory) == c+1 {

            newBits = commitHistory[c].data

        } else {
            oldBytes = commitHistory[c+1].data
            commitHistory[c].oldData = oldBytes

            newBits = commitHistory[c].data

        }

        var oldDoc, newDoc libopenapi.Document

        if len(oldBytes) > 0 && len(newBits) > 0 {
            oldDoc, _ = libopenapi.NewDocument(oldBytes)
            newDoc, _ = libopenapi.NewDocument(newBits)

            changes, errors := libopenapi.CompareDocuments(oldDoc, newDoc)
            if errors != nil {
                panic(errors)
            }
            commitHistory[c].changes = changes
        }
        if len(oldBytes) == 0 && len(newBits) > 0 {
            newDoc, _ = libopenapi.NewDocument(newBits)
        }

        if newDoc != nil {
            commitHistory[c].document = newDoc
        }

        if oldDoc != nil {
            commitHistory[c].oldDocument = oldDoc
        }

        // run vacuum stats
        stats := checkStats(newDoc.GetSpecInfo())

        commitHistory[c].qualityReport = stats

    }

    //for c := range commitHistory {
    //    if c == len(commitHistory)-1 {
    //        break
    //    }

    //var changes, brChanges int
    //score, errors, warnings, info := 0, 0, 0, 0
    //if commitHistory[c+1].changes != nil {
    //    changes = commitHistory[c+1].changes.TotalChanges()
    //    brChanges = commitHistory[c+1].changes.TotalBreakingChanges()
    //}
    //if commitHistory[c+1].qualityReport != nil {
    //    score = commitHistory[c+1].qualityReport.Statistics.OverallScore
    //    errors = commitHistory[c+1].qualityReport.Statistics.TotalErrors
    //    warnings = commitHistory[c+1].qualityReport.Statistics.TotalWarnings
    //    info = commitHistory[c+1].qualityReport.Statistics.TotalInfo
    //}

    //fmt.Printf("Commit: %s -> %s / (%s) has %d changes, %d breaking - quality score: %d/100 (%d errors, %d warnings, %d info)\n",
    //    commitHistory[c+1].hash,
    //    commitHistory[c].hash,
    //    commitHistory[c].message,
    //    changes,
    //    brChanges,
    //    score,
    //    errors,
    //    warnings,
    //    info,
    //)

    //}

    comm := commitHistory[0]

    root := BuildTree(comm.document, comm.changes)

    tree := tview.NewTreeView().
        SetRoot(root).
        SetCurrentNode(root)

    tree.SetSelectedFunc(func(node *tview.TreeNode) {
        reference := node.GetReference()
        if reference == nil {
            return // Selecting the root node does nothing.
        }
        children := node.GetChildren()
        if len(children) > 0 {
            // Collapse if visible, expand if collapsed.
            // node.SetExpanded(!node.IsExpanded())

        }
    })

    // create a table of the data

    table := tview.NewTable().SetBorders(false)

    table.SetCell(0, 0, tview.NewTableCell("Date").SetTextColor(CYAN_CELL_COLOR))
    table.SetCell(0, 1, tview.NewTableCell("Message").SetTextColor(CYAN_CELL_COLOR))
    table.SetCell(0, 2, tview.NewTableCell("Changes").SetTextColor(CYAN_CELL_COLOR))
    table.SetCell(0, 3, tview.NewTableCell("Breaking").SetTextColor(CYAN_CELL_COLOR))

    n := 1
    for k := range commitHistory {

        if commitHistory[k].changes != nil {

            table.SetCell(n, 0, tview.NewTableCell(commitHistory[k].commitDate.Format("01/02/06")))
            table.SetCell(n, 1, tview.NewTableCell(commitHistory[k].message))
            if commitHistory[k].changes != nil {
                table.SetCell(n, 2, tview.NewTableCell(fmt.Sprint(commitHistory[k].changes.TotalChanges())).SetAlign(tview.AlignCenter))
                table.SetCell(n, 3, tview.NewTableCell(fmt.Sprint(commitHistory[k].changes.TotalBreakingChanges())).SetAlign(tview.AlignCenter))
            } else {
                table.SetCell(n, 2, tview.NewTableCell("X").SetAlign(tview.AlignCenter))
                table.SetCell(n, 3, tview.NewTableCell("X").SetAlign(tview.AlignCenter))

            }
            n++
        }
    }

    //detailsTable := tview.NewTable().SetBorders(false)
    //
    //detailsTable.SetCell(0, 0, tview.NewTableCell("State").SetTextColor(tcell.ColorDarkCyan))
    //detailsTable.SetCell(0, 1, tview.NewTableCell("Property").SetTextColor(tcell.ColorDarkCyan))
    //detailsTable.SetCell(0, 2, tview.NewTableCell("Change").SetTextColor(tcell.ColorDarkCyan))
    //detailsTable.SetCell(0, 3, tview.NewTableCell("Line").SetTextColor(tcell.ColorDarkCyan))
    //detailsTable.SetCell(0, 4, tview.NewTableCell("Column").SetTextColor(tcell.ColorDarkCyan))

    //if err := tview.NewApplication().SetRoot(tree, true).Run(); err != nil {
    //    panic(err)
    //}

    //form := tview.NewForm()

    //newPrimitive := func(text string) tview.Primitive {
    //    return tview.NewTextView().
    //        SetTextAlign(tview.AlignCenter).
    //        SetText(text)
    //}
    // menu := newPrimitive("Menu")
    //sideBar := newPrimitive("Side Bar")

    textViewOrig := tview.NewTextView().
        SetDynamicColors(true).
        SetRegions(true).
        SetWordWrap(false)

    textViewNew := tview.NewTextView().
        SetDynamicColors(true).
        SetRegions(true).
        SetWordWrap(false)

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

    table.Select(0, 0).SetFixed(1, 1).SetDoneFunc(func(key tcell.Key) {
        if key == tcell.KeyEscape {
            //app.Stop()
        }
        if key == tcell.KeyEnter {
            //     table.SetSelectable(true, false)
        }
    }).SetSelectedFunc(func(row int, column int) {

        for k := 1; k < len(commitHistory); k++ {
            table.GetCell(k, 0).SetTextColor(tcell.ColorWhite)
            table.GetCell(k, 1).SetTextColor(tcell.ColorWhite)
            table.GetCell(k, 2).SetTextColor(tcell.ColorWhite)
            table.GetCell(k, 3).SetTextColor(tcell.ColorWhite)

        }

        table.GetCell(row, 0).SetTextColor(MAGENTA_CELL_COLOR)
        table.GetCell(row, 1).SetTextColor(MAGENTA_CELL_COLOR)
        table.GetCell(row, 2).SetTextColor(MAGENTA_CELL_COLOR)
        table.GetCell(row, 3).SetTextColor(MAGENTA_CELL_COLOR)

        c := commitHistory[row-1]
        currentCommit = c

        r := BuildTree(c.document, c.changes)
        tree.SetRoot(r)
        tree.SetCurrentNode(r)
        app.SetFocus(tree)
        tree.SetTopLevel(0)

        //table.SetSelectable(false, false)
    })

    tree.SetDoneFunc(func(key tcell.Key) {
        if key == tcell.KeyEscape {
            app.SetFocus(table)
        }
    })

    tree.SetSelectedFunc(func(node *tview.TreeNode) {
        ref := node.GetReference()
        if ref != nil {

            if _, ok := ref.(*model.Change); ok {
                //createForm(detailsTable, ref.(*model.Change))
                renderDiff(textViewOrig, textViewNew, diffView, ref.(*model.Change))

            }

        }
    })

    table.SetSelectable(true, false)
    app.SetRoot(grid, true).EnableMouse(true)
    //table.SetF
    app.SetFocus(table)
    table.Select(1, 1)
    if err := app.Run(); err != nil {
        panic(err)
    }

}

var leftDiffActive, rightDiffActive bool

func renderDiff(left, right *tview.TextView, diffView *tview.Flex, change *model.Change) {

    curr := currentCommit
    diffView.Clear()

    if change.OriginalObject == nil {
        left.Clear()
    } else {
        left.Clear()

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

        table.SetCell(1, 0, tview.NewTableCell(change.Original))
        table.SetCell(1, 1, tview.NewTableCell(fmt.Sprint(*change.Context.OriginalLine)).SetAlign(tview.AlignCenter))
        table.SetCell(1, 2, tview.NewTableCell(fmt.Sprint(*change.Context.OriginalColumn)).SetAlign(tview.AlignCenter))

        if change.NewObject == nil {
            switch change.Breaking {
            case true:
                table.SetCell(1, 3, tview.NewTableCell("YES!").SetTextColor(tcell.ColorRed).SetAlign(tview.AlignCenter))
            }

        }
        y := tview.NewFlex()
        y.SetDirection(tview.FlexRow)
        y.AddItem(table, 3, 1, false).
            AddItem(left, 0, 1, false)
        diffView.AddItem(y, 0, 1, false)

        left.SetWrap(false)
        data := string(curr.oldData)
        parsed := strings.Split(data, "\n")

        var clipped []string

        var startLine, currentLine, endLine int

        if *change.Context.OriginalLine > 5 {
            clipped = parsed[*change.Context.OriginalLine-5 : *change.Context.OriginalLine+8]

            startLine = *change.Context.OriginalLine - 4
            currentLine = startLine
            endLine = *change.Context.OriginalLine + 8

            for j := range clipped {
                if j != 4 {
                    clipped[j] = fmt.Sprintf("[%s]%s[-:-]",
                        checkClippedWordColor(clipped[j], change.Original, change.Breaking, originalView), clipped[j])
                }
            }

            color := getColorForChange(originalView, changeNumber, startLine, currentLine)

            if !change.Breaking {
                clipped[4] = fmt.Sprintf("[%s]%s[-:-]", color, clipped[4])
            } else {
                clipped[4] = fmt.Sprintf("[%s]%s[-:-]", "red", clipped[4])
            }

        } else {
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
                clipped[*change.Context.OriginalLine] = fmt.Sprintf("[%s]%s[-:-]", color, clipped[*change.Context.OriginalLine])
            } else {
                clipped[*change.Context.OriginalLine] = fmt.Sprintf("[%s]%s[-:-]", "red", clipped[*change.Context.OriginalLine])
            }

        }

        for x := range clipped {
            color := getColorForChange(originalView, lineNumber, currentLine, *change.Context.OriginalLine)
            if !change.Breaking {
                clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s", printSpacing(currentLine, endLine), color, currentLine, clipped[x])
            } else {
                if currentLine != *change.Context.OriginalLine {
                    clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s", printSpacing(currentLine, endLine), color, currentLine, clipped[x])
                } else {
                    clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s", printSpacing(currentLine, endLine), "red", currentLine, clipped[x])
                }
            }
            currentLine++
        }

        //yamlData, _ := yaml.Marshal(change.OriginalObject)
        fmt.Fprintf(left, strings.Join(clipped, "\n"))

    }
    if change.NewObject == nil {
        right.Clear()
        fmt.Fprintf(right, "no data available.")
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
        table.SetCell(1, 1, tview.NewTableCell(fmt.Sprint(*change.Context.NewLine)).SetAlign(tview.AlignCenter))
        table.SetCell(1, 2, tview.NewTableCell(fmt.Sprint(*change.Context.NewColumn)).SetAlign(tview.AlignCenter))
        switch change.Breaking {
        case true:
            table.SetCell(1, 3, tview.NewTableCell("YES!").SetTextColor(tcell.ColorRed).SetAlign(tview.AlignCenter))
        case false:
            table.SetCell(1, 3, tview.NewTableCell("No").SetTextColor(tcell.ColorGrey).SetAlign(tview.AlignCenter))
        }

        y := tview.NewFlex()
        y.SetDirection(tview.FlexRow)
        y.AddItem(table, 3, 1, false).
            AddItem(right, 0, 1, false)
        diffView.AddItem(y, 0, 1, false)

        data := string(curr.data)
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
                    clipped[j] = fmt.Sprintf("[%s]%s[-:-]",
                        checkClippedWordColor(clipped[j], change.New, change.Breaking, newView), clipped[j])
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
            clipped[x] = fmt.Sprintf("%s[%s]%d|[-] %s", printSpacing(currentLine, endLine), color, currentLine, clipped[x])
            currentLine++
        }

        fmt.Fprintf(right, strings.Join(clipped, "\n"))
    }

}

func checkClippedWordColor(value, change string, breaking bool, view viewType) string {
    if change == "" {
        return "grey"
    }
    if !strings.Contains(value, change) {
        return "grey"
    }
    if breaking {
        return "red"
    }
    switch view {
    case originalView:
        return CYAN
    case newView:
        return MAGENTA
    }
    return CYAN
}

func getColorForChange(view viewType, changeType colorType, currentLine, changeLine int) string {

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

func createForm(detailsTable *tview.Table, change *model.Change) {

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
    case model.PropertyAdded, model.ObjectAdded:
        detailsTable.SetCell(1, 0, tview.NewTableCell("Added"))
        detailsTable.SetCell(1, 1, tview.NewTableCell(change.Property))
        detailsTable.SetCell(1, 2, tview.NewTableCell(change.New))
        detailsTable.SetCell(1, 3, tview.NewTableCell(fmt.Sprint(newLine)))
        detailsTable.SetCell(1, 4, tview.NewTableCell(fmt.Sprint(newCol)))
        detailsTable.RemoveRow(2)
        break
    case model.PropertyRemoved, model.ObjectRemoved:
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

    //
    //
    //detailsTable.SetCell(1, 0, tview.NewTableCell("Original"))
    //detailsTable.SetCell(1, 1, tview.NewTableCell(change.Property))
    //detailsTable.SetCell(1, 2, tview.NewTableCell(change.Original))
    //detailsTable.SetCell(1, 3, tview.NewTableCell(fmt.Sprint(origLine)))
    //detailsTable.SetCell(1, 4, tview.NewTableCell(fmt.Sprint(origCol)))
    //
    //detailsTable.SetCell(2, 0, tview.NewTableCell("New"))
    //detailsTable.SetCell(2, 1, tview.NewTableCell(change.Property))
    //detailsTable.SetCell(2, 2, tview.NewTableCell(change.New))
    //detailsTable.SetCell(2, 3, tview.NewTableCell(fmt.Sprint(newLine)))
    //detailsTable.SetCell(2, 4, tview.NewTableCell(fmt.Sprint(newCol)))

    //
    //for n := 0; n < form.GetFormItemCount(); n++ {
    //    form.RemoveFormItem(0)
    //}
    //
    //form.AddInputField("Property", change.Property, 40, nil, nil).
    //    AddTextArea("Original Value", change.Original, 60, 0, 0, nil).SetFieldBackgroundColor(tcell.ColorGreen).
    //    AddTextArea("New Value", change.New, 60, 0, 0, nil)
    //

    //form.AddInputField("Original Line", fmt.Sprint(origLine), 10, nil, nil).
    //    AddInputField("Original Column", fmt.Sprint(origCol), 10, nil, nil).
    //    AddInputField("New Line", fmt.Sprint(newLine), 10, nil, nil).
    //    AddInputField("New Column", fmt.Sprint(newCol), 10, nil, nil)
}
