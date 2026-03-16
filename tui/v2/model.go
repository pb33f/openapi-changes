// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"

	"charm.land/lipgloss/v2"
	tea "charm.land/bubbletea/v2"
	"charm.land/bubbles/v2/table"
	"charm.land/bubbles/v2/viewport"
	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

// PanelFocus tracks which panel currently has focus.
type PanelFocus int

const (
	FocusCommitTable PanelFocus = iota
	FocusTree
	FocusDiff
	FocusCodeModal
)

// ConsoleModel is the top-level Bubbletea model for the new-console command.
type ConsoleModel struct {
	// Bubbles components
	commitTable  table.Model
	diffViewport viewport.Model

	// Custom tree
	tree treeModel

	// Code modal — key handlers and rendering both go through codeModal.vp
	// to avoid the value-copy divergence that would occur with a separate viewport field.
	codeModal codeModal

	// Data
	commits     []*model.Commit
	cache       *commitCache
	breakingCfg *whatChangedModel.BreakingRulesConfig

	// UI state
	focus          PanelFocus
	width          int
	height         int
	showDiff       bool
	showCodeModal  bool
	activeChange   *whatChangedModel.Change
	singleCommit   bool
	highlightedIdx int
	activeIdx      int
	emptyState     string

	// Active commit hash — lines accessed via cache
	activeHash string

	// Styles
	styles  consoleStyles
	version string
}

// RunChangeratorFn is the function signature for running the changerator.
// This is injected from the cmd package to avoid import cycles.
type RunChangeratorFn func(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (*changerator.Changerator, *v3.Node, func(), error)

// runChangeratorFn holds the injected changerator function.
var runChangeratorFn RunChangeratorFn

// SetRunChangeratorFn sets the changerator function. Must be called before NewConsoleModel.
func SetRunChangeratorFn(fn RunChangeratorFn) {
	runChangeratorFn = fn
}

// NewConsoleModel creates a new ConsoleModel and runs the changerator on the first commit.
func NewConsoleModel(commits []*model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig, noColor bool, version string) ConsoleModel {
	styles := newConsoleStyles()
	if noColor {
		styles = newNoColorStyles()
	}

	m := ConsoleModel{
		commits:     commits,
		cache:       newCommitCache(3),
		breakingCfg: breakingConfig,
		styles:      styles,
		version:     version,
	}

	// Single commit mode
	if len(commits) <= 1 {
		m.singleCommit = true
		m.focus = FocusTree
	} else {
		m.focus = FocusCommitTable
	}

	// Build commit table (default width, resized on first WindowSizeMsg)
	m.commitTable = buildCommitTable(commits, 120, styles)
	if !m.singleCommit {
		m.commitTable.Focus()
	}

	// Initialize tree with placeholder height (will be recalculated on WindowSizeMsg)
	m.tree = newTreeModel(nil, 20)

	// Initialize diff viewport
	m.diffViewport = viewport.New(viewport.WithWidth(80), viewport.WithHeight(10))

	// Load first commit synchronously
	if len(commits) > 0 {
		m.activeIdx = 0
		m.highlightedIdx = 0
		m.activeHash = commits[0].Hash
		m.loadActiveCommit()
	} else {
		m.emptyState = "No commits to display"
	}

	return m
}

// Init implements tea.Model.
func (m ConsoleModel) Init() tea.Cmd {
	return nil
}

// Update implements tea.Model.
func (m ConsoleModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
		m.recalculateLayout()
		return m, nil

	case tea.KeyPressMsg:
		if m.showCodeModal {
			return m.handleCodeModalKeys(msg)
		}
		switch m.focus {
		case FocusCommitTable:
			return m.handleCommitTableKeys(msg)
		case FocusTree:
			return m.handleTreeKeys(msg)
		case FocusDiff:
			return m.handleDiffKeys(msg)
		}
	}
	return m, nil
}

// View implements tea.Model.
func (m ConsoleModel) View() tea.View {
	v := tea.View{AltScreen: true}

	if m.width == 0 || m.height == 0 {
		v.Content = "Initializing..."
		return v
	}

	if m.showCodeModal {
		v.Content = m.renderCodeModal()
		return v
	}

	var sb strings.Builder
	sb.Grow(m.width * m.height)

	// In lipgloss v2, Width() is the TOTAL width including borders.
	// Panels get m.width (full terminal), content inside gets innerWidth.
	iw := innerWidth(m.width)

	// Commit table (unless single commit mode)
	if !m.singleCommit {
		tableH := m.tableHeight()
		panelStyle := m.panelBorder(FocusCommitTable)
		tableView := m.commitTable.View()
		sb.WriteString(panelStyle.Width(m.width).Height(tableH).Render(tableView))
		sb.WriteByte('\n')
	}

	// Tree panel
	treeH := m.treeHeight()
	treePanelStyle := m.panelBorder(FocusTree)
	treeContent := m.tree.View(iw, m.focus == FocusTree, m.styles)
	if m.emptyState != "" {
		treeContent = m.styles.grey.Render("  " + m.emptyState)
	}
	sb.WriteString(treePanelStyle.Width(m.width).Height(treeH).Render(treeContent))
	sb.WriteByte('\n')

	// Diff panel (if visible)
	if m.showDiff {
		diffH := m.diffHeight()
		diffPanelStyle := m.panelBorder(FocusDiff)
		diffContent := m.diffViewport.View()
		sb.WriteString(diffPanelStyle.Width(m.width).Height(diffH).Render(diffContent))
		sb.WriteByte('\n')
	}

	// Navigation bar
	sb.WriteString(m.renderNavBar())

	v.Content = sb.String()
	return v
}

// recalculateLayout updates all component dimensions based on terminal size.
func (m *ConsoleModel) recalculateLayout() {
	tableH := m.tableHeight()
	treeH := m.treeHeight()
	diffH := m.diffHeight()

	if !m.singleCommit {
		m.commitTable.SetHeight(tableH - 1) // -1 for header
		resizeCommitTable(&m.commitTable, m.width)
	}

	m.tree.setHeight(treeH)

	if m.showDiff {
		m.diffViewport.SetHeight(diffH)
		m.diffViewport.SetWidth(innerWidth(m.width))
	}
}

func (m ConsoleModel) tableHeight() int {
	if m.singleCommit {
		return 0
	}
	if m.showDiff {
		return max(4, m.height*25/100)
	}
	return max(4, m.height*30/100)
}

func (m ConsoleModel) treeHeight() int {
	if m.singleCommit {
		if m.showDiff {
			return max(5, m.height*50/100)
		}
		return m.height - 2 // nav bar
	}
	tableH := m.tableHeight()
	if m.showDiff {
		return max(5, m.height*35/100)
	}
	return m.height - tableH - 4 // borders + nav
}

func (m ConsoleModel) diffHeight() int {
	if !m.showDiff {
		return 0
	}
	tableH := m.tableHeight()
	treeH := m.treeHeight()
	h := m.height - tableH - treeH - 6 // borders + nav
	if h < 5 {
		h = 5
	}
	return h
}

func (m ConsoleModel) panelBorder(panel PanelFocus) lipgloss.Style {
	if panel == m.focus {
		return m.styles.activePanel
	}
	return m.styles.inactivePanel
}

func (m ConsoleModel) renderNavBar() string {
	var parts []string

	if len(m.commits) > 0 {
		parts = append(parts, fmt.Sprintf("%d/%d", m.activeIdx+1, len(m.commits)))
	}

	parts = append(parts, "↑↓: navigate", "enter: select", "esc: back")

	if m.focus == FocusDiff || m.focus == FocusTree {
		parts = append(parts, "x: code")
	}
	parts = append(parts, "tab: switch", "q: quit")

	return m.styles.nav.Render(" " + strings.Join(parts, " | ") + " ")
}

func (m ConsoleModel) renderCodeModal() string {
	modal := m.codeModal.View(m.styles)

	// Center the modal in the terminal
	modalLines := strings.Split(modal, "\n")
	topPad := (m.height - len(modalLines)) / 2
	if topPad < 0 {
		topPad = 0
	}
	leftPad := (m.width - m.codeModal.width) / 2
	if leftPad < 0 {
		leftPad = 0
	}
	padding := strings.Repeat(" ", leftPad)

	var sb strings.Builder
	for i := 0; i < topPad; i++ {
		sb.WriteByte('\n')
	}
	for _, line := range modalLines {
		sb.WriteString(padding)
		sb.WriteString(line)
		sb.WriteByte('\n')
	}
	return sb.String()
}

// loadActiveCommit runs the changerator for the active commit and updates the tree.
func (m *ConsoleModel) loadActiveCommit() {
	if m.activeIdx < 0 || m.activeIdx >= len(m.commits) {
		m.emptyState = "No commit selected"
		return
	}

	commit := m.commits[m.activeIdx]

	// Check cache
	if entry := m.cache.get(commit.Hash); entry != nil {
		m.applyCache(entry)
		return
	}

	if runChangeratorFn == nil {
		m.emptyState = "Changerator not configured"
		return
	}

	ctr, root, releaseFn, err := runChangeratorFn(commit, m.breakingCfg)
	if err != nil {
		m.emptyState = fmt.Sprintf("Error: %s", err)
		m.tree = newTreeModel(nil, m.tree.height)
		m.showDiff = false
		return
	}
	if ctr == nil {
		m.emptyState = "No changes detected in this commit"
		m.tree = newTreeModel(nil, m.tree.height)
		m.showDiff = false
		return
	}

	// Build node change tree
	ctr.BuildNodeChangeTree(root)
	stats := ctr.Calculatoratron()

	// Cache the result
	entry := &cacheEntry{
		result: &changeratorResultV2{
			Changerator: ctr,
			RightRoot:   root,
			releaseFn:   releaseFn,
		},
		treeRoot: root,
		stats:    stats,
		newLines: splitLines(commit.Data),
		oldLines: splitLines(commit.OldData),
	}
	m.cache.put(commit.Hash, entry)
	m.applyCache(entry)
}

func (m *ConsoleModel) applyCache(entry *cacheEntry) {
	m.emptyState = ""
	m.tree = newTreeModel(entry.treeRoot, m.tree.height)
	m.tree.statsCache = make(map[*v3.Node]nodeStats)
	if entry.treeRoot != nil {
		computeStats(entry.treeRoot, m.tree.statsCache)
	}
	m.showDiff = false
	m.activeChange = nil
}

// updateDiffContent renders the diff for the active change into the diff viewport.
func (m *ConsoleModel) updateDiffContent() {
	if m.activeChange == nil {
		m.diffViewport.SetContent("")
		return
	}

	newLines, oldLines := m.cache.getLines(m.activeHash)
	content := renderDiff(m.activeChange, newLines, oldLines, m.width-4, m.styles)
	m.diffViewport.SetContent(content)
	m.diffViewport.GotoTop()
}

// openCodeModal opens the full-spec code modal for a change.
// For removals the relevant content is in the old spec; for additions/modifications
// it is in the new spec. The line number is chosen to match.
func (m *ConsoleModel) openCodeModal(ch *whatChangedModel.Change) {
	newLines, oldLines := m.cache.getLines(m.activeHash)

	// Pick spec and line based on change type
	var lines []string
	changeLn := 0
	switch ch.ChangeType {
	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		lines = oldLines
		if ch.Context != nil && ch.Context.OriginalLine != nil {
			changeLn = *ch.Context.OriginalLine
		}
	default:
		lines = newLines
		if ch.Context != nil && ch.Context.NewLine != nil {
			changeLn = *ch.Context.NewLine
		} else if ch.Context != nil && ch.Context.OriginalLine != nil {
			changeLn = *ch.Context.OriginalLine
		}
	}

	if len(lines) == 0 {
		return
	}

	m.codeModal = newCodeModal(lines, changeLn, m.width, m.height, m.styles)
	m.showCodeModal = true
	m.focus = FocusCodeModal
}

const (
	dateColWidth     = 12
	hashColWidth     = 10
	changesColWidth  = 10
	breakingColWidth = 10
	colPadding       = 2 // cell padding per column (left + right)
	numColumns       = 5
)

// innerWidth returns the content width inside a border panel.
// In lipgloss v2, Width(n) is the total width including borders.
// A NormalBorder adds 1 char on each side, so the content area is n - 2.
// Use this for sizing content (table columns, tree lines) that goes inside a panel.
func innerWidth(termWidth int) int {
	return termWidth - 2
}

// buildCommitTable creates a bubbles table from the commit list.
// Message column fills all remaining width inside the border panel.
func buildCommitTable(commits []*model.Commit, termWidth int, styles consoleStyles) table.Model {
	iw := innerWidth(termWidth)
	cols := commitColumns(iw)
	rows := buildCommitRows(commits)

	t := table.New(
		table.WithColumns(cols),
		table.WithRows(rows),
		table.WithHeight(5),
		table.WithFocused(true),
		table.WithWidth(iw),
		table.WithStyles(commitTableStyles(iw)),
	)

	return t
}

// resizeCommitTable updates column widths and styles to fill the new terminal width.
func resizeCommitTable(t *table.Model, termWidth int) {
	iw := innerWidth(termWidth)
	t.SetColumns(commitColumns(iw))
	t.SetWidth(iw)
	t.SetStyles(commitTableStyles(iw))
}

func commitColumns(iw int) []table.Column {
	msgWidth := iw - dateColWidth - hashColWidth - changesColWidth - breakingColWidth - (numColumns * colPadding)
	if msgWidth < 30 {
		msgWidth = 30
	}
	return []table.Column{
		{Title: "Date", Width: dateColWidth},
		{Title: "Hash", Width: hashColWidth},
		{Title: "Message", Width: msgWidth},
		{Title: "Changes", Width: changesColWidth},
		{Title: "Breaking", Width: breakingColWidth},
	}
}

func buildCommitRows(commits []*model.Commit) []table.Row {
	rows := make([]table.Row, 0, len(commits))
	for _, c := range commits {
		date := c.CommitDate.Format("01/02/06")
		hash := c.Hash
		if len(hash) > 7 {
			hash = hash[:7]
		}
		changes := "-"
		breaking := "-"
		if c.Changes != nil {
			changes = fmt.Sprint(c.Changes.TotalChanges())
			breaking = fmt.Sprint(c.Changes.TotalBreakingChanges())
		}
		rows = append(rows, table.Row{date, hash, c.Message, changes, breaking})
	}
	return rows
}

func commitTableStyles(iw int) table.Styles {
	return table.Styles{
		Header: lipgloss.NewStyle().
			Bold(true).
			Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).
			Padding(0, 1),
		Cell: lipgloss.NewStyle().
			Padding(0, 1),
		Selected: lipgloss.NewStyle().
			Bold(true).
			Foreground(lipgloss.Color(terminal.LipglossSecondaryPink)).
			Background(lipgloss.Color("236")).
			Width(iw),
	}
}
