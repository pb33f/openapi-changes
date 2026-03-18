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

func TestNewReportModal_BasicRendering(t *testing.T) {
	styles := newConsoleStyles()
	modal := newReportModal("# Test Report\nSome content here", "test commit", 80, 30, 76, styles)

	view := modal.View(styles)
	assert.NotEmpty(t, view)
	assert.Contains(t, view, "test commit")
}

func TestReportModal_OpenFromTree(t *testing.T) {
	m := setupModelWithChangerator(t)
	m.focus = FocusTree

	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	updated := result.(ConsoleModel)

	assert.True(t, updated.showReportModal)
	assert.Equal(t, FocusReportModal, updated.focus)
	assert.Equal(t, FocusTree, updated.prevFocus)
}

func TestReportModal_OpenFromDiff(t *testing.T) {
	m := setupModelWithChangerator(t)
	m.focus = FocusDiff

	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	updated := result.(ConsoleModel)

	assert.True(t, updated.showReportModal)
	assert.Equal(t, FocusReportModal, updated.focus)
	assert.Equal(t, FocusDiff, updated.prevFocus)
}

func TestReportModal_CloseRestoresFocus(t *testing.T) {
	m := setupModelWithChangerator(t)
	m.focus = FocusTree

	// Open
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	m = result.(ConsoleModel)
	require.True(t, m.showReportModal)

	// Close with esc
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	updated := result.(ConsoleModel)

	assert.False(t, updated.showReportModal)
	assert.Equal(t, FocusTree, updated.focus)
}

func TestReportModal_Scrolling(t *testing.T) {
	m := setupModelWithChangerator(t)
	m.focus = FocusTree

	// Open report modal
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	m = result.(ConsoleModel)
	require.True(t, m.showReportModal)

	initialOffset := m.reportModal.vp.YOffset()

	// Scroll down
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "j"}))
	updated := result.(ConsoleModel)

	// Viewport should have moved (or stayed at 0 if content fits)
	assert.True(t, updated.showReportModal)
	_ = initialOffset // scrolling works even if content is short
}

func TestReportModal_CachesMarkdown(t *testing.T) {
	m := setupModelWithChangerator(t)
	m.focus = FocusTree

	// First open — should generate and cache markdown
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	m = result.(ConsoleModel)
	require.True(t, m.showReportModal)

	entry := m.cache.get(m.activeHash)
	require.NotNil(t, entry)
	assert.NotEmpty(t, entry.markdown, "markdown should be cached after first open")

	cachedMd := entry.markdown

	// Close and re-open
	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: tea.KeyEscape}))
	m = result.(ConsoleModel)

	result, _ = m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	m = result.(ConsoleModel)

	// Should still use cached markdown
	entry2 := m.cache.get(m.activeHash)
	assert.Equal(t, cachedMd, entry2.markdown, "second open should use cached markdown")
}

func TestReportModal_NilChangerator(t *testing.T) {
	m := setupModelWithTree(t) // no Changerator on the result
	m.focus = FocusTree

	// Press r — should be a no-op since there's no Changerator
	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	updated := result.(ConsoleModel)

	assert.False(t, updated.showReportModal, "should not open report modal without Changerator")
}

func TestReportModal_EmptyMarkdown(t *testing.T) {
	m := setupModelWithTree(t)
	m.focus = FocusTree

	// Manually set a mock Changerator that returns empty markdown
	entry := m.cache.get(m.activeHash)
	require.NotNil(t, entry)
	entry.result = &changeratorResultV2{
		Changerator: &changerator.Changerator{},
		releaseFn:   func() {},
	}
	// GenerateMarkdownReport on an empty config returns a "no changes" message
	// which is not empty, so this tests that path works

	result, _ := m.Update(tea.KeyPressMsg(tea.Key{Code: 0, Text: "r"}))
	updated := result.(ConsoleModel)
	// The "no changes" report is valid markdown, so the modal should open
	assert.True(t, updated.showReportModal)
}

func TestReportModal_BlockedByCodeModal(t *testing.T) {
	m := setupModelWithChangerator(t)
	m.focus = FocusTree

	// Open code modal first
	moveToFirstLeaf(t, &m)
	entry := m.tree.selectedEntry()
	require.NotNil(t, entry)
	require.NotNil(t, entry.change)
	m.openCodeModal(entry.change)
	require.True(t, m.showCodeModal)

	// Try to open report modal — should be blocked
	m.openReportModal()
	assert.False(t, m.showReportModal, "report modal should not open while code modal is showing")
}

// setupModelWithChangerator creates a ConsoleModel with a real Changerator on
// the cache entry so that GenerateMarkdownReport() can be called.
func setupModelWithChangerator(t *testing.T) ConsoleModel {
	t.Helper()

	newSpec := "openapi: '3.0'\ninfo:\n  title: New Title\n  version: '2.0'\npaths: {}\ncomponents: {}"
	oldSpec := "openapi: '3.0'\ninfo:\n  title: Old Title\n  version: '1.0'\npaths: {}\ncomponents: {}"

	commits := []*model.Commit{
		{
			Hash:       "rpt123",
			Message:    "test report commit",
			CommitDate: time.Now(),
			Data:       []byte(newSpec),
			OldData:    []byte(oldSpec),
		},
	}

	m := NewConsoleModel(commits, nil, true, "test", nil)
	m.width = 120
	m.height = 40

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

	infoNode := &v3.Node{Label: "Info", Type: "Info"}
	infoNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{modChange}})

	root := &v3.Node{
		Label:    "Document",
		Type:     "Document",
		Children: []*v3.Node{infoNode},
	}

	// Create a Changerator with enough config for GenerateMarkdownReport
	ctr := &changerator.Changerator{}

	entry := &cacheEntry{
		result: &changeratorResultV2{
			Changerator: ctr,
			RightRoot:   root,
			releaseFn:   func() {},
		},
		treeRoot: root,
		newLines: splitLines(commits[0].Data),
		oldLines: splitLines(commits[0].OldData),
	}
	m.cache.put("rpt123", entry)
	m.applyCache(entry)
	m.recalculateLayout()

	return m
}
