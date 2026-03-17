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
	"github.com/pb33f/doctor/changerator/renderer"
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
	FocusReportModal
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

	// Report modal — glamour-rendered markdown report overlay
	reportModal     reportModal
	showReportModal bool

	// Data
	commits     []*model.Commit
	cache       *commitCache
	breakingCfg *whatChangedModel.BreakingRulesConfig

	// UI state
	focus          PanelFocus
	prevFocus      PanelFocus // saved before opening code modal
	width          int
	height         int
	showDiff       bool
	pendingDiff    bool // diff content needs rendering once layout is ready
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
	}
	m.focus = FocusTree

	// Build commit table (default width, resized on first WindowSizeMsg)
	m.commitTable = buildCommitTable(commits, 120, styles)

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
		if m.showReportModal {
			return m.handleReportModalKeys(msg)
		}
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

	baseView := m.renderBaseView()

	if m.showReportModal {
		x, y := m.overlayPosition(m.reportModal.width, m.reportModal.height)
		v.Content = renderOverlay(baseView, m.reportModal.View(m.styles), x, y)
	} else if m.showCodeModal {
		x, y := m.overlayPosition(m.codeModal.width, m.codeModal.height)
		v.Content = renderOverlay(baseView, m.codeModal.View(m.styles), x, y)
	} else {
		v.Content = baseView
	}

	return v
}

// renderBaseView renders the main UI (commit table + tree + diff + nav bar).
func (m ConsoleModel) renderBaseView() string {
	var sb strings.Builder
	sb.Grow(m.width * m.height)

	// Commit table (unless single commit mode)
	if !m.singleCommit {
		tableH := m.tableHeight()
		panelStyle := m.panelBorder(FocusCommitTable)
		tableView := m.commitTable.View()
		sb.WriteString(panelStyle.Width(m.width).Height(tableH).Render(tableView))
		sb.WriteByte('\n')
	}

	// Tree + Diff side by side
	treeW, diffW := m.splitWidths()
	bottomH := m.bottomHeight()

	treePanelStyle := m.panelBorder(FocusTree)
	treeShowCursor := m.focus == FocusTree || m.focus == FocusDiff || m.showDiff
	treeContent := m.tree.View(treeW-2, treeShowCursor, m.styles)
	if m.emptyState != "" {
		treeContent = m.styles.grey.Render("  " + m.emptyState)
	}
	leftPanel := treePanelStyle.Width(treeW).Height(bottomH).Render(treeContent)

	diffPanelStyle := m.panelBorder(FocusDiff)
	var diffContent string
	if m.showDiff {
		diffContent = m.diffViewport.View()
	} else {
		diffContent = m.styles.grey.Render("  Select a change to view diff")
	}
	rightPanel := diffPanelStyle.Width(diffW).Height(bottomH).Render(diffContent)

	sb.WriteString(lipgloss.JoinHorizontal(lipgloss.Top, leftPanel, rightPanel))
	sb.WriteByte('\n')

	// Navigation bar
	sb.WriteString(m.renderNavBar())

	return sb.String()
}

// overlayPosition returns the X, Y position for a modal overlay,
// positioned on the right side with padding (matching vacuum's layout).
func (m ConsoleModel) overlayPosition(modalW, modalH int) (int, int) {
	x := m.width - modalW - modalRightPadding
	y := (m.height - modalH) / 2

	if x < 0 {
		x = 0
	}
	if y < 0 {
		y = 0
	}
	return x, y
}

func renderOverlay(baseView, modalView string, x, y int) string {
	base := lipgloss.NewLayer(baseView)
	overlay := lipgloss.NewLayer(modalView).X(x).Y(y).Z(1)
	return lipgloss.NewCompositor(base, overlay).Render()
}

// modalDimensions computes shared modal dimensions from terminal size.
func modalDimensions(termWidth, termHeight int) (modalW, modalH, contentW int) {
	modalW = termWidth - modalWidthReduction
	modalH = termHeight - modalHeightMargin
	if modalW < 30 {
		modalW = 30
	}
	if modalH < 10 {
		modalH = 10
	}
	contentW = modalW - 4 // border(2) + padding(2)
	return
}

// recalculateLayout updates all component dimensions based on terminal size.
// Height functions return the total height (for lipgloss Height()).
// Internal components need the content height = total - 2 (border top + bottom).
func (m *ConsoleModel) recalculateLayout() {
	if !m.singleCommit {
		tableContent := m.tableHeight() - 2
		m.commitTable.SetHeight(tableContent - 1) // -1 more for header row
		resizeCommitTable(&m.commitTable, m.width)
	}

	bottomH := m.bottomHeight()
	m.tree.setHeight(bottomH - 2)

	_, diffW := m.splitWidths()
	m.diffViewport.SetHeight(bottomH - 2)
	m.diffViewport.SetWidth(diffW - 2)

	// Render diff content that was deferred before layout was ready.
	if m.pendingDiff {
		m.pendingDiff = false
		m.updateDiffContent()
	}
}

// Layout: all height functions return the value passed to lipgloss Height(),
// which is the TOTAL height including top+bottom border (2 lines).
// Content area inside is Height() - 2.
const navBarHeight = 1

func (m ConsoleModel) tableHeight() int {
	if m.singleCommit {
		return 0
	}
	// Fixed: content = header + rows + padding, plus 2 for border.
	h := len(m.commits) + 4 + 2
	if h < 10 {
		h = 10
	}
	if h > 18 {
		h = 18
	}
	return h
}

func (m ConsoleModel) bottomHeight() int {
	h := m.height - navBarHeight - m.tableHeight()
	if h < 10 {
		h = 10
	}
	return h
}

func (m ConsoleModel) splitWidths() (treeW, diffW int) {
	treeW = m.width / 2
	diffW = m.width - treeW // handles odd widths
	return
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

	parts = append(parts, "↑↓: navigate", "enter: view", "r: report", "esc: back", "tab: switch", "q: quit")

	return m.styles.nav.Render(" " + strings.Join(parts, " | ") + " ")
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
	// Auto-select first leaf change and render its diff.
	// syncDiffToTreeCursor is a no-op if tree has no leaves.
	m.syncDiffToTreeCursor()
}

// selectHighlightedCommit syncs activeIdx to the table cursor and loads the commit.
func (m *ConsoleModel) selectHighlightedCommit() {
	row := m.commitTable.Cursor()
	if row < 0 || row >= len(m.commits) {
		return
	}
	m.highlightedIdx = row
	if row == m.activeIdx {
		return // already loaded
	}
	m.activeIdx = row
	m.activeHash = m.commits[row].Hash
	m.loadActiveCommit()
}

// syncDiffToTreeCursor updates the diff to show whichever change the tree cursor is on.
// If layout isn't ready yet (width == 0), it sets pendingDiff so recalculateLayout
// renders the content once dimensions are known.
func (m *ConsoleModel) syncDiffToTreeCursor() {
	entry := m.tree.selectedEntry()
	if entry == nil || entry.change == nil {
		return
	}
	m.activeChange = entry.change
	m.showDiff = true
	if m.width > 0 {
		m.updateDiffContent()
	} else {
		m.pendingDiff = true
	}
}

// updateDiffContent renders the diff for the active change into the diff viewport.
func (m *ConsoleModel) updateDiffContent() {
	if m.activeChange == nil {
		m.diffViewport.SetContent("")
		return
	}

	newLines, oldLines := m.cache.getLines(m.activeHash)
	_, diffW := m.splitWidths()
	content := renderDiff(m.activeChange, newLines, oldLines, diffW-2, m.styles)
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

	rangeStart, rangeEnd := computeBlockRange(lines, changeLn)
	hl := highlightRange{start: rangeStart, end: rangeEnd}
	m.codeModal = newCodeModal(lines, hl, ch, m.width, m.height, m.styles)
	m.showCodeModal = true
	m.prevFocus = m.focus
	m.focus = FocusCodeModal
}

// openReportModal opens the markdown report modal for the active commit.
func (m *ConsoleModel) openReportModal() {
	if m.showCodeModal {
		return
	}

	entry := m.cache.get(m.activeHash)
	if entry == nil {
		return
	}

	// Get or generate raw markdown
	if entry.markdown == "" {
		if entry.result == nil || entry.result.Changerator == nil {
			return
		}
		mdRenderer := renderer.NewMarkdownRenderer()
		md, err := entry.result.Changerator.GenerateReport(mdRenderer, renderer.OutputFormatMarkdown)
		if err != nil || md == "" {
			return
		}
		entry.markdown = md
	}

	modalW, modalH, contentW := modalDimensions(m.width, m.height)

	// Use cached rendered output if width hasn't changed
	rendered := entry.renderedMarkdown
	if rendered == "" || entry.renderedWidth != contentW {
		rendered = renderMarkdown(entry.markdown, contentW)
		entry.renderedMarkdown = rendered
		entry.renderedWidth = contentW
	}

	commitMsg := ""
	if m.activeIdx >= 0 && m.activeIdx < len(m.commits) {
		commitMsg = m.commits[m.activeIdx].Message
	}

	m.reportModal = newReportModal(rendered, commitMsg, modalW, modalH, contentW, m.styles)
	m.showReportModal = true
	m.prevFocus = m.focus
	m.focus = FocusReportModal
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
			Background(lipgloss.Color("#4a1a4e")).
			Width(iw),
	}
}
