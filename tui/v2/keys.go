// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	tea "charm.land/bubbletea/v2"
)

func (m ConsoleModel) handleQuit() (tea.Model, tea.Cmd) {
	m.cache.releaseAll()
	return m, tea.Quit
}

// handleCommitTableKeys handles key events when the commit table has focus.
// Arrow keys load the changerator for the highlighted commit immediately
// (matching the old console's selection-changed behavior).
// Enter jumps focus to the tree.
func (m ConsoleModel) handleCommitTableKeys(msg tea.KeyPressMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "q", "ctrl+c":
		return m.handleQuit()
	case "esc":
		return m.handleQuit()
	case "enter":
		m.focus = FocusTree
		m.commitTable.Blur()
		return m, nil
	case "up", "k":
		m.commitTable.MoveUp(1)
		m.selectHighlightedCommit()
		return m, nil
	case "down", "j":
		m.commitTable.MoveDown(1)
		m.selectHighlightedCommit()
		return m, nil
	case "tab":
		m.focus = FocusTree
		m.commitTable.Blur()
		return m, nil
	}
	return m, nil
}

// handleTreeKeys handles key events when the tree has focus.
func (m ConsoleModel) handleTreeKeys(msg tea.KeyPressMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "q", "ctrl+c":
		return m.handleQuit()
	case "esc":
		if m.singleCommit {
			return m.handleQuit()
		}
		m.focus = FocusCommitTable
		m.commitTable.Focus()
		return m, nil
	case "enter":
		entry := m.tree.selectedEntry()
		if entry != nil && entry.change != nil {
			m.openCodeModal(entry.change)
		}
		return m, nil
	case "up", "k":
		m.tree.moveUp(1)
		m.syncDiffToTreeCursor()
		return m, nil
	case "down", "j":
		m.tree.moveDown(1)
		m.syncDiffToTreeCursor()
		return m, nil
	case "pgup":
		m.tree.moveUp(m.tree.height)
		m.syncDiffToTreeCursor()
		return m, nil
	case "pgdown":
		m.tree.moveDown(m.tree.height)
		m.syncDiffToTreeCursor()
		return m, nil
	case "home":
		m.tree.cursor = 0
		m.tree.offset = 0
		m.tree.snapToNextLeaf()
		m.syncDiffToTreeCursor()
		return m, nil
	case "end":
		m.tree.moveDown(len(m.tree.entries))
		m.syncDiffToTreeCursor()
		return m, nil
	case "tab":
		m.focus = FocusDiff
		return m, nil
	}
	return m, nil
}

// handleDiffKeys handles key events when the diff view has focus.
// Up/down navigate between changes (moving the tree cursor), not scrolling the diff.
func (m ConsoleModel) handleDiffKeys(msg tea.KeyPressMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "q", "ctrl+c":
		return m.handleQuit()
	case "esc":
		m.focus = FocusTree
		return m, nil
	case "up", "k":
		m.tree.moveUp(1)
		m.syncDiffToTreeCursor()
		return m, nil
	case "down", "j":
		m.tree.moveDown(1)
		m.syncDiffToTreeCursor()
		return m, nil
	case "tab":
		if !m.singleCommit {
			m.focus = FocusCommitTable
			m.commitTable.Focus()
		} else {
			m.focus = FocusTree
		}
		return m, nil
	case "enter":
		if m.activeChange != nil {
			m.openCodeModal(m.activeChange)
		}
		return m, nil
	}
	return m, nil
}

// handleCodeModalKeys handles key events when the code modal is showing.
// All scrolling goes through m.codeModal.vp so rendering and input share the same state.
func (m ConsoleModel) handleCodeModalKeys(msg tea.KeyPressMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "esc", "q", "enter":
		m.showCodeModal = false
		m.focus = m.prevFocus
		return m, nil
	case "ctrl+c":
		return m.handleQuit()
	case "up", "k":
		m.codeModal.vp.ScrollUp(1)
		return m, nil
	case "down", "j":
		m.codeModal.vp.ScrollDown(1)
		return m, nil
	case "pgup":
		m.codeModal.vp.PageUp()
		return m, nil
	case "pgdown":
		m.codeModal.vp.PageDown()
		return m, nil
	case "home":
		m.codeModal.vp.GotoTop()
		return m, nil
	case "end":
		m.codeModal.vp.GotoBottom()
		return m, nil
	case "space":
		m.codeModal.recenter()
		return m, nil
	}
	return m, nil
}
