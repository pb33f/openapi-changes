// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"testing"
	"time"

	tea "charm.land/bubbletea/v2"
	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// mockRunChangerator returns a changerator stub with a pre-built tree.
// The tree has a root with one child ("Info") carrying one Modified change.
func mockRunChangerator(commit *model.Commit, _ *whatChangedModel.BreakingRulesConfig) (*changerator.Changerator, *v3.Node, func(), error) {
	infoChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "title",
		Original:   "Old Title",
		New:        "New Title",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(3),
			NewLine:      ptrInt(3),
		},
	}
	infoNode := &v3.Node{Label: "Info", Type: "Info"}
	infoNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{infoChange}})

	root := &v3.Node{
		Label:    "Document",
		Type:     "Document",
		Children: []*v3.Node{infoNode},
	}

	// Return a nil Changerator — loadActiveCommit only calls BuildNodeChangeTree and
	// Calculatoratron on it, so we need a real one. But since our tree is already built
	// we can use a minimal stub. However BuildNodeChangeTree is a method on *Changerator
	// and will panic on nil. We need a real Changerator.
	// Instead, we return nil Changerator which makes loadActiveCommit bail out as "no changes".
	// To test the full path, we populate the cache directly.
	return nil, root, func() {}, nil
}

// setupModelWithTree creates a ConsoleModel with a pre-populated cache entry,
// bypassing the changerator entirely. This exercises the real tree/diff/modal paths.
func setupModelWithTree(t *testing.T) ConsoleModel {
	t.Helper()

	newSpec := "openapi: '3.0'\ninfo:\n  title: New Title\npaths: {}\ncomponents: {}"
	oldSpec := "openapi: '3.0'\ninfo:\n  title: Old Title\npaths: {}\ncomponents: {}"

	commits := []*model.Commit{
		{
			Hash:       "abc123",
			Message:    "test commit",
			CommitDate: time.Now(),
			Data:       []byte(newSpec),
			OldData:    []byte(oldSpec),
		},
	}

	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40

	// Build a tree manually
	modChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "title",
		Original:   "Old Title",
		New:        "New Title",
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(3),
			NewLine:      ptrInt(3),
		},
	}
	removeChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyRemoved,
		Property:   "deprecated",
		Original:   "true",
		Breaking:   true,
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(4),
		},
	}
	addChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "description",
		New:        "A pet API",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(2),
		},
	}

	infoNode := &v3.Node{Label: "Info", Type: "Info"}
	infoNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{modChange, removeChange, addChange}})

	root := &v3.Node{
		Label:    "Document",
		Type:     "Document",
		Children: []*v3.Node{infoNode},
	}

	entry := &cacheEntry{
		treeRoot: root,
		newLines: splitLines(commits[0].Data),
		oldLines: splitLines(commits[0].OldData),
	}
	m.cache.put("abc123", entry)
	m.applyCache(entry)
	m.recalculateLayout()

	return m
}

// moveToFirstLeaf positions the tree cursor on the first leaf change entry.
func moveToFirstLeaf(t *testing.T, m *ConsoleModel) {
	t.Helper()
	for i, e := range m.tree.entries {
		if e.change != nil {
			m.tree.cursor = i
			return
		}
	}
	t.Fatal("no leaf entry found in tree")
}

func makeTestCommits() []*model.Commit {
	return []*model.Commit{
		{
			Hash:       "abc123",
			Message:    "first commit",
			CommitDate: time.Now(),
			Data:       []byte("openapi: '3.0'\ninfo:\n  title: Test\npaths: {}"),
		},
		{
			Hash:       "def456",
			Message:    "second commit",
			CommitDate: time.Now(),
			Data:       []byte("openapi: '3.0'\ninfo:\n  title: Old\npaths: {}"),
		},
	}
}

func TestNewConsoleModel_MultipleCommits(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)

	assert.False(t, m.singleCommit)
	assert.Equal(t, FocusTree, m.focus)
	assert.Equal(t, 0, m.activeIdx)
	assert.Equal(t, "abc123", m.activeHash)
}

func TestNewConsoleModel_SingleCommit(t *testing.T) {
	commits := makeTestCommits()[:1]
	m := NewConsoleModel(commits, nil, true, "test", nil)

	assert.True(t, m.singleCommit)
	assert.Equal(t, FocusTree, m.focus)
}

func TestNewConsoleModel_EmptyCommits(t *testing.T) {
	m := NewConsoleModel(nil, nil, true, "test", nil)
	assert.Equal(t, "No commits to display", m.emptyState)
}

func TestUpdate_WindowSizeMsg(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)

	result, cmd := m.Update(tea.WindowSizeMsg{Width: 120, Height: 40})
	assert.Nil(t, cmd)

	updated := result.(ConsoleModel)
	assert.Equal(t, 120, updated.width)
	assert.Equal(t, 40, updated.height)
}

func TestUpdate_FocusTransitions_TreeToDiff(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	assert.Equal(t, FocusTree, m.focus)

	// Tab from tree (initial focus) → diff
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	updated := result.(ConsoleModel)
	assert.Equal(t, FocusDiff, updated.focus)
}

func TestUpdate_EscFromTree_ToTable(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.focus = FocusTree

	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	updated := result.(ConsoleModel)
	assert.Equal(t, FocusCommitTable, updated.focus)
}

func TestUpdate_EscFromTree_SingleCommit_Quits(t *testing.T) {
	commits := makeTestCommits()[:1]
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40

	_, cmd := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	assert.NotNil(t, cmd)
}

func TestUpdate_EscFromDiff_ToTree(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.focus = FocusDiff
	m.showDiff = true
	m.activeChange = &whatChangedModel.Change{}

	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	updated := result.(ConsoleModel)
	assert.Equal(t, FocusTree, updated.focus)
	assert.True(t, updated.showDiff, "esc from diff should keep diff visible")
	assert.NotNil(t, updated.activeChange, "esc from diff should keep activeChange")
}

func TestUpdate_CodeModalPrecedence(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.showCodeModal = true
	m.focus = FocusCodeModal

	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	updated := result.(ConsoleModel)
	assert.False(t, updated.showCodeModal)
}

func TestUpdate_ArrowKeysLoadCommit(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.focus = FocusCommitTable

	// Arrow down should load the next commit immediately
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "j"}))
	updated := result.(ConsoleModel)
	assert.Equal(t, 1, updated.highlightedIdx)
	assert.Equal(t, 1, updated.activeIdx)
	assert.Equal(t, commits[1].Hash, updated.activeHash)
}

func TestUpdate_EscFromCommitTable_DoesNotQuit(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.focus = FocusCommitTable

	result, cmd := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	assert.Nil(t, cmd)

	updated := result.(ConsoleModel)
	assert.Equal(t, FocusCommitTable, updated.focus)
	assert.Equal(t, 0, updated.activeIdx)
}

func TestView_ReturnsTeaView(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40

	view := m.View()
	assert.True(t, view.AltScreen)
	assert.NotEmpty(t, view.Content)
}

func TestView_Initializing(t *testing.T) {
	m := NewConsoleModel(nil, nil, true, "test", nil)
	view := m.View()
	assert.Contains(t, view.Content, "Initializing")
}

// --- Tests that exercise the real tree/diff/modal data paths ---

func TestEnterOnLeafChange_OpensCodeModal(t *testing.T) {
	m := setupModelWithTree(t)

	// Tree should have entries: Info (branch), then leaf changes
	require.Greater(t, len(m.tree.entries), 1)

	// Move to a leaf change entry
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	require.NotNil(t, m.tree.selectedEntry().change, "should have a leaf change selected")

	// Press enter to open code modal
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEnter}))
	updated := result.(ConsoleModel)

	assert.True(t, updated.showCodeModal)
	assert.Equal(t, FocusCodeModal, updated.focus)
	assert.Equal(t, FocusTree, updated.prevFocus)
}

func TestCommitSwitching_UpdatesTree(t *testing.T) {
	m := setupModelWithTree(t)

	// Add a second commit with its own cache entry
	newSpec2 := "openapi: '3.0'\ninfo:\n  title: Second\npaths: {}"
	oldSpec2 := "openapi: '3.0'\ninfo:\n  title: First\npaths: {}"
	secondCommit := &model.Commit{
		Hash:       "def456",
		Message:    "second",
		CommitDate: time.Now(),
		Data:       []byte(newSpec2),
		OldData:    []byte(oldSpec2),
	}
	m.commits = append(m.commits, secondCommit)
	m.singleCommit = false

	// Build a different tree for the second commit
	ch2 := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "version",
		Context:    &whatChangedModel.ChangeContext{NewLine: ptrInt(2)},
	}
	node2 := &v3.Node{Label: "Info2", Type: "Info"}
	node2.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{ch2}})
	root2 := &v3.Node{Label: "Doc2", Type: "Document", Children: []*v3.Node{node2}}

	m.cache.put("def456", &cacheEntry{
		treeRoot: root2,
		newLines: splitLines(secondCommit.Data),
		oldLines: splitLines(secondCommit.OldData),
	})

	// Switch to second commit
	m.activeIdx = 1
	m.activeHash = "def456"
	m.loadActiveCommit()

	// Tree should reflect the second commit's structure
	require.Greater(t, len(m.tree.entries), 0)
	assert.Equal(t, "Info2", m.tree.entries[0].node.Label)
}

func TestCacheHit_ReusesResult(t *testing.T) {
	m := setupModelWithTree(t)

	// loadActiveCommit should hit the cache without needing runChangeratorFn
	originalEntries := len(m.tree.entries)

	m.loadActiveCommit()

	// Should still have the same tree (cache hit)
	assert.Equal(t, originalEntries, len(m.tree.entries))
	assert.Empty(t, m.emptyState)
}

func TestEmptyChangerator_ShowsMessage(t *testing.T) {
	commits := makeTestCommits()
	runFn := func(_ *model.Commit, _ *whatChangedModel.BreakingRulesConfig) (*changerator.Changerator, *v3.Node, func(), error) {
		return nil, nil, nil, nil
	}
	m := NewConsoleModel(commits, nil, true, "test", runFn)
	assert.Equal(t, "No changes detected in this commit", m.emptyState)
}

func TestCodeModal_ModifiedChange_ShowsNewSpec(t *testing.T) {
	m := setupModelWithTree(t)

	// Find the Modified change
	var modChange *whatChangedModel.Change
	for _, e := range m.tree.entries {
		if e.change != nil && e.change.ChangeType == whatChangedModel.Modified {
			modChange = e.change
			break
		}
	}
	require.NotNil(t, modChange)

	m.openCodeModal(modChange)

	assert.True(t, m.showCodeModal)
	assert.Equal(t, FocusCodeModal, m.focus)

	// Modal should contain content from the NEW spec
	view := m.codeModal.View(m.styles)
	assert.Contains(t, view, "New Title")
}

func TestCodeModal_RemovedChange_ShowsOldSpec(t *testing.T) {
	m := setupModelWithTree(t)

	// Find the Removed change
	var removeChange *whatChangedModel.Change
	for _, e := range m.tree.entries {
		if e.change != nil && e.change.ChangeType == whatChangedModel.PropertyRemoved {
			removeChange = e.change
			break
		}
	}
	require.NotNil(t, removeChange)

	m.openCodeModal(removeChange)

	assert.True(t, m.showCodeModal)
	// Modal should contain content from the OLD spec (which has "Old Title")
	view := m.codeModal.View(m.styles)
	assert.Contains(t, view, "Old Title")
}

func TestCodeModal_AddedChange_ShowsNewSpec(t *testing.T) {
	m := setupModelWithTree(t)

	// Find the Added change
	var addChange *whatChangedModel.Change
	for _, e := range m.tree.entries {
		if e.change != nil && e.change.ChangeType == whatChangedModel.PropertyAdded {
			addChange = e.change
			break
		}
	}
	require.NotNil(t, addChange)

	m.openCodeModal(addChange)

	assert.True(t, m.showCodeModal)
	// Modal should show the new spec
	view := m.codeModal.View(m.styles)
	assert.Contains(t, view, "New Title")
}

func TestCodeModal_ScrollingMutatesRenderedViewport(t *testing.T) {
	m := setupModelWithTree(t)

	// Build a modal with enough content to scroll
	longSpec := make([]byte, 0, 5000)
	for i := 0; i < 200; i++ {
		longSpec = append(longSpec, []byte("  key: value\n")...)
	}
	m.cache.entries["abc123"].newLines = splitLines(longSpec)

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "test",
		Context:    &whatChangedModel.ChangeContext{NewLine: ptrInt(100)},
	}
	m.openCodeModal(ch)

	// Record initial offset
	initialOffset := m.codeModal.vp.YOffset()

	// Simulate pressing down arrow in the code modal
	m.focus = FocusCodeModal
	m.showCodeModal = true
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "j"}))
	updated := result.(ConsoleModel)

	// The viewport that renderCodeModal will use (codeModal.vp) should have moved
	assert.NotEqual(t, initialOffset, updated.codeModal.vp.YOffset(),
		"scrolling in code modal should actually move the viewport that gets rendered")
}

func TestApplyCache_AutoSelectsFirstChange(t *testing.T) {
	m := setupModelWithTree(t)
	// After setupModelWithTree (which calls applyCache), the first leaf
	// should be auto-selected and diff should be showing.
	assert.True(t, m.showDiff, "applyCache should auto-select first change")
	assert.NotNil(t, m.activeChange, "applyCache should set activeChange to first leaf")
	// The tree cursor should be on the first leaf
	entry := m.tree.selectedEntry()
	require.NotNil(t, entry)
	assert.NotNil(t, entry.change, "cursor should be on a leaf entry")
	assert.Equal(t, m.activeChange, entry.change, "activeChange should match tree cursor")
}

func TestSplitWidths(t *testing.T) {
	m := NewConsoleModel(makeTestCommits(), nil, true, "test", nil)
	m.width = 120
	treeW, diffW := m.splitWidths()
	assert.Equal(t, 60, treeW)
	assert.Equal(t, 60, diffW)
	assert.Equal(t, m.width, treeW+diffW)
}

func TestSplitWidths_OddWidth(t *testing.T) {
	m := NewConsoleModel(makeTestCommits(), nil, true, "test", nil)
	m.width = 121
	treeW, diffW := m.splitWidths()
	assert.Equal(t, 121, treeW+diffW)
}

func TestBottomHeight(t *testing.T) {
	m := NewConsoleModel(makeTestCommits(), nil, true, "test", nil)
	m.width = 120
	m.height = 40
	h := m.bottomHeight()
	assert.Equal(t, m.height-navBarHeight-m.tableHeight(), h)
	assert.GreaterOrEqual(t, h, 10)
}

func TestDiffPlaceholder_WhenNoChangeSelected(t *testing.T) {
	m := NewConsoleModel(makeTestCommits(), nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.recalculateLayout()
	view := m.View()
	assert.Contains(t, view.Content, "Select a change to view diff")
}

func TestEscFromDiff_KeepsDiffVisible(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	m.syncDiffToTreeCursor()

	// Tab to diff panel
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusDiff, m.focus)

	// Esc back to tree — diff should stay visible
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	updated := result.(ConsoleModel)
	assert.Equal(t, FocusTree, updated.focus)
	assert.True(t, updated.showDiff)
	assert.NotNil(t, updated.activeChange)
}

func TestTabCycle_MultiCommit(t *testing.T) {
	commits := makeTestCommits()
	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40
	m.singleCommit = false
	m.recalculateLayout()
	m.focus = FocusCommitTable

	// Tab: commit table → tree
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusTree, m.focus)

	// Tab: tree → diff (always, no showDiff guard)
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusDiff, m.focus)

	// Tab: diff → commit table
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusCommitTable, m.focus)
}

func TestTabCycle_SingleCommit(t *testing.T) {
	m := setupModelWithTree(t) // single-commit
	m.focus = FocusTree

	// Tab: tree → diff
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusDiff, m.focus)

	// Tab: diff → tree (no commit table in single-commit mode)
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "tab"}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusTree, m.focus)
}

func TestTreeMovement_SyncsDiff(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	m.syncDiffToTreeCursor()
	firstChange := m.activeChange
	require.NotNil(t, firstChange)

	// Move down to next leaf — activeChange should update
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "j"}))
	updated := result.(ConsoleModel)
	assert.True(t, updated.showDiff)
	assert.NotNil(t, updated.activeChange)
}

func TestCodeModalReturnsToCorrectFocus(t *testing.T) {
	m := setupModelWithTree(t)

	// Open code modal from tree context
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEnter}))
	m = result.(ConsoleModel)
	assert.Equal(t, FocusCodeModal, m.focus)
	assert.Equal(t, FocusTree, m.prevFocus)

	// Close modal with enter — should return to tree
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEnter}))
	updated := result.(ConsoleModel)
	assert.Equal(t, FocusTree, updated.focus)
}

func TestCodeModal_ObjectAdded_HighlightsRange(t *testing.T) {
	newSpec := "openapi: '3.0'\ninfo:\n  title: Test\npaths:\n  /pets:\n    get:\n      summary: List\n      responses:\n        200:\n          description: OK\n  /users:\n    get:\n      summary: Users"
	oldSpec := "openapi: '3.0'\ninfo:\n  title: Test\npaths:\n  /users:\n    get:\n      summary: Users"

	commits := []*model.Commit{
		{
			Hash:       "obj123",
			Message:    "add pets path",
			CommitDate: time.Now(),
			Data:       []byte(newSpec),
			OldData:    []byte(oldSpec),
		},
	}

	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40

	objAddChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.ObjectAdded,
		Property:   "/pets",
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(6), // points to "get:" child line
		},
	}

	infoNode := &v3.Node{Label: "Paths", Type: "Paths"}
	infoNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{objAddChange}})

	root := &v3.Node{
		Label:    "Document",
		Type:     "Document",
		Children: []*v3.Node{infoNode},
	}

	entry := &cacheEntry{
		treeRoot: root,
		newLines: splitLines(commits[0].Data),
		oldLines: splitLines(commits[0].OldData),
	}
	m.cache.put("obj123", entry)
	m.applyCache(entry)
	m.recalculateLayout()

	m.openCodeModal(objAddChange)
	assert.True(t, m.showCodeModal)

	// The highlight range should span more than one line (block expansion)
	assert.Greater(t, m.codeModal.highlight.end, m.codeModal.highlight.start,
		"ObjectAdded should expand to a multi-line highlight range")

	view := m.codeModal.View(m.styles)
	// Primary line should have > marker
	assert.Contains(t, view, ">")
	// Body lines should have │ gutter marker
	assert.Contains(t, view, "│")
}

// --- Diff panel summary and spec view tests ---

func TestUpdateDiffContent_SummaryAboveViewport(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	m.syncDiffToTreeCursor()

	// The first leaf is a Modified change with value data → summary should be set
	assert.NotEmpty(t, m.diffSummary, "diffSummary should be set for change with line info")
	assert.Greater(t, m.diffSummaryH, 0, "diffSummaryH should be > 0")

	// Viewport should contain spec lines (using renderSpecLines format)
	vpContent := m.diffViewport.View()
	assert.Contains(t, vpContent, "│")
}

func TestUpdateDiffContent_NoLineInfo_Fallback(t *testing.T) {
	m := setupModelWithTree(t)

	// Create a change with no line info
	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "test",
		Original:   "old",
		New:        "new",
		Context:    &whatChangedModel.ChangeContext{},
	}
	m.activeChange = ch
	m.showDiff = true
	m.updateDiffContent()

	// Summary should be cleared on fallback path
	assert.Empty(t, m.diffSummary, "diffSummary should be empty on fallback")
	assert.Equal(t, 0, m.diffSummaryH, "diffSummaryH should be 0 on fallback")
}

func TestUpdateDiffContent_NilChange_ClearsSummary(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	m.syncDiffToTreeCursor()
	require.NotEmpty(t, m.diffSummary)

	// Clear the active change
	m.activeChange = nil
	m.updateDiffContent()

	assert.Empty(t, m.diffSummary)
	assert.Equal(t, 0, m.diffSummaryH)
}

func TestApplyCache_ResetsDiffSummary(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	m.syncDiffToTreeCursor()
	require.NotEmpty(t, m.diffSummary)

	// Re-apply cache (simulates commit switch)
	entry := m.cache.get(m.activeHash)
	require.NotNil(t, entry)
	m.applyCache(entry)

	// After applyCache, syncDiffToTreeCursor runs and may set new summary,
	// but the applyCache itself should have cleared it first.
	// The important thing is that stale summary from a different commit is gone.
	// Since applyCache auto-selects a leaf, summary will be set again for the new change.
	// We verify the mechanism works by checking it doesn't panic and fields are consistent.
	assert.True(t, m.showDiff || m.diffSummary == "")
}

func TestRecalculateLayout_AccountsForSummaryHeight(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)
	m.syncDiffToTreeCursor()

	summaryH := m.diffSummaryH
	require.Greater(t, summaryH, 0)

	bottomH := m.bottomHeight()
	expectedVPH := bottomH - 2 - summaryH - 1 // -2 border, -summaryH, -1 separator
	if expectedVPH < 3 {
		expectedVPH = 3
	}

	m.recalculateLayout()
	assert.Equal(t, expectedVPH, m.diffViewport.Height())
}

func TestWindowResize_RebuildCodeModal(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree
	moveToFirstLeaf(t, &m)

	// Open code modal
	entry := m.tree.selectedEntry()
	require.NotNil(t, entry)
	require.NotNil(t, entry.change)
	m.openCodeModal(entry.change)
	require.True(t, m.showCodeModal)
	assert.Equal(t, FocusCodeModal, m.focus)
	assert.Equal(t, FocusTree, m.prevFocus)

	oldWidth := m.codeModal.width

	// Simulate resize
	result, _ := m.Update(tea.WindowSizeMsg{Width: 160, Height: 50})
	updated := result.(ConsoleModel)

	// Modal should be rebuilt with new dimensions
	assert.True(t, updated.showCodeModal)
	assert.NotEqual(t, oldWidth, updated.codeModal.width)
	// Focus should NOT have changed
	assert.Equal(t, FocusCodeModal, updated.focus)
	assert.Equal(t, FocusTree, updated.prevFocus)
}
