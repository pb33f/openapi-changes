// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"
	"unicode/utf8"

	"charm.land/lipgloss/v2"
	v3 "github.com/pb33f/doctor/model/high/v3"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
)

// treeModel is a custom tree widget backed by a flattened entry list.
// Only entries[offset:offset+height] are rendered (virtual scrolling).
// The tree is always fully expanded — branch nodes are structural context,
// the cursor only lands on leaf change entries.
type treeModel struct {
	entries    []treeEntry
	cursor     int
	offset     int
	height     int
	root       *v3.Node
	statsCache map[*v3.Node]nodeStats
}

// treeEntry is a single row in the flattened tree display.
// If change is nil, this is a branch entry (node label + stats).
// If change is non-nil, this is a leaf entry (individual change).
type treeEntry struct {
	node    *v3.Node
	change  *whatChangedModel.Change
	depth   int
	isLast  bool
	hasKids bool
	guides  []bool // guides[i] = true → show │ at depth i; false → show space
}

type nodeStats struct {
	additions      int
	modifications  int
	deletions      int
	directBreaking int // breaking in own leaves + immediate children's leaves
	totalBreaking  int // all descendant breaking (accumulated, not displayed)
	total          int
}

func newTreeModel(root *v3.Node, height int) treeModel {
	t := treeModel{
		root:       root,
		height:     height,
		statsCache: make(map[*v3.Node]nodeStats),
	}
	if root != nil {
		t.rebuild()
		// Place cursor on the first leaf change
		t.snapToNextLeaf()
	}
	return t
}

// rebuild flattens the tree from root. The tree is always fully expanded.
func (t *treeModel) rebuild() {
	if t.root == nil {
		t.entries = nil
		return
	}
	t.entries = make([]treeEntry, 0, 64)
	children := t.root.Children
	for i, child := range children {
		isLast := i == len(children)-1
		t.flattenNode(child, 0, isLast, nil)
	}
	// Clamp cursor
	if t.cursor >= len(t.entries) {
		t.cursor = max(0, len(t.entries)-1)
	}
	if t.offset > t.cursor {
		t.offset = t.cursor
	}
}

func (t *treeModel) flattenNode(node *v3.Node, depth int, isLast bool, parentGuides []bool) {
	changes := getNodeChanges(node)
	hasKids := len(node.Children) > 0 || len(changes) > 0

	guides := make([]bool, len(parentGuides))
	copy(guides, parentGuides)

	t.entries = append(t.entries, treeEntry{
		node:    node,
		depth:   depth,
		isLast:  isLast,
		hasKids: hasKids,
		guides:  guides,
	})

	childGuides := make([]bool, len(parentGuides)+1)
	copy(childGuides, parentGuides)
	childGuides[len(parentGuides)] = !isLast
	totalItems := len(node.Children) + len(changes)
	idx := 0

	for _, child := range node.Children {
		idx++
		t.flattenNode(child, depth+1, idx == totalItems, childGuides)
	}

	for _, ch := range changes {
		idx++
		leafGuides := make([]bool, len(childGuides))
		copy(leafGuides, childGuides)
		t.entries = append(t.entries, treeEntry{
			node:   node,
			change: ch,
			depth:  depth + 1,
			isLast: idx == totalItems,
			guides: leafGuides,
		})
	}
}

// selectedEntry returns the entry at the cursor, or nil.
func (t *treeModel) selectedEntry() *treeEntry {
	if t.cursor < 0 || t.cursor >= len(t.entries) {
		return nil
	}
	return &t.entries[t.cursor]
}

// moveUp moves cursor up to the previous leaf change.
func (t *treeModel) moveUp(n int) {
	for i := 0; i < n; i++ {
		prev := t.prevLeaf(t.cursor)
		if prev < 0 {
			break
		}
		t.cursor = prev
	}
	if t.cursor < t.offset {
		t.offset = t.cursor
	}
}

// moveDown moves cursor down to the next leaf change.
func (t *treeModel) moveDown(n int) {
	for i := 0; i < n; i++ {
		next := t.nextLeaf(t.cursor)
		if next < 0 {
			break
		}
		t.cursor = next
	}
	if t.cursor >= t.offset+t.height {
		t.offset = t.cursor - t.height + 1
	}
}

// snapToNextLeaf moves cursor to the first leaf at or after the current position.
func (t *treeModel) snapToNextLeaf() {
	if t.cursor < len(t.entries) && t.entries[t.cursor].change != nil {
		return // already on a leaf
	}
	next := t.nextLeaf(t.cursor - 1)
	if next >= 0 {
		t.cursor = next
	}
}

// nextLeaf returns the index of the next leaf entry after pos, or -1.
func (t *treeModel) nextLeaf(pos int) int {
	for i := pos + 1; i < len(t.entries); i++ {
		if t.entries[i].change != nil {
			return i
		}
	}
	return -1
}

// prevLeaf returns the index of the previous leaf entry before pos, or -1.
func (t *treeModel) prevLeaf(pos int) int {
	for i := pos - 1; i >= 0; i-- {
		if t.entries[i].change != nil {
			return i
		}
	}
	return -1
}

func (t *treeModel) setHeight(h int) {
	t.height = h
}

// View renders the visible portion of the tree.
func (t treeModel) View(width int, focused bool, styles consoleStyles) string {
	if len(t.entries) == 0 {
		return styles.grey.Render("  (no changes)")
	}

	visibleEnd := t.offset + t.height
	if visibleEnd > len(t.entries) {
		visibleEnd = len(t.entries)
	}

	var sb strings.Builder
	sb.Grow(t.height * 120)

	for i := t.offset; i < visibleEnd; i++ {
		entry := t.entries[i]
		line := t.renderEntry(entry, i == t.cursor && focused, width, styles)
		sb.WriteString(line)
		if i < visibleEnd-1 {
			sb.WriteByte('\n')
		}
	}

	// Pad remaining height with empty lines
	rendered := visibleEnd - t.offset
	for i := rendered; i < t.height; i++ {
		sb.WriteByte('\n')
	}

	return sb.String()
}

func (t treeModel) renderEntry(entry treeEntry, isCursor bool, width int, styles consoleStyles) string {
	selected := isCursor && entry.change != nil

	var sb strings.Builder

	sb.WriteString("  ") // left margin

	// Tree connectors — plain text when selected so no ANSI colors bleed
	// through and break the row highlight.
	for _, showGuide := range entry.guides {
		if showGuide {
			if selected {
				sb.WriteString("│  ")
			} else {
				sb.WriteString(styles.grey.Render("│  "))
			}
		} else {
			sb.WriteString("   ")
		}
	}

	if selected {
		if entry.isLast {
			sb.WriteString("└── ")
		} else {
			sb.WriteString("├── ")
		}
	} else {
		if entry.isLast {
			sb.WriteString(styles.grey.Render("└── "))
		} else {
			sb.WriteString(styles.grey.Render("├── "))
		}
	}

	if entry.change != nil {
		sb.WriteString(t.renderChange(entry.change, selected, styles))
	} else {
		sb.WriteString(t.renderNode(entry, styles))
	}

	result := sb.String()

	if selected {
		// Pad to full width so the highlight covers the entire row
		vis := visualLen(result)
		if vis < width {
			result += strings.Repeat(" ", width-vis)
		}
		result = styles.selectedRow.Render(result)
	}

	if width > 0 && visualLen(result) > width {
		result = truncateToWidth(result, width)
	}
	return result
}

func (t treeModel) renderChange(ch *whatChangedModel.Change, isCursor bool, styles consoleStyles) string {
	var prefix string
	var style lipgloss.Style

	switch ch.ChangeType {
	case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
		prefix = "[+]"
		style = styles.added
	case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
		prefix = "[-]"
		style = styles.removed
	case whatChangedModel.Modified:
		prefix = "[M]"
		style = styles.modified
	default:
		prefix = "[?]"
		style = styles.grey
	}

	if ch.Breaking {
		prefix = "{X} " + prefix
		style = styles.breaking
	}

	prop := ch.Property
	if prop == "" {
		prop = ch.Type
	}

	// When this row is highlighted, use plain text — the row background does the work
	if isCursor {
		return fmt.Sprintf("%s %s", prefix, prop)
	}
	return style.Render(fmt.Sprintf("%s %s", prefix, prop))
}

func (t treeModel) renderNode(entry treeEntry, styles consoleStyles) string {
	label := entry.node.Label
	if label == "" {
		label = entry.node.Type
	}
	return styles.info.Render(label)
}

// getNodeChanges extracts the direct property changes from a node's Changes field.
// Uses GetPropertyChanges() to avoid duplicating changes shown in child nodes.
func getNodeChanges(node *v3.Node) []*whatChangedModel.Change {
	var changes []*whatChangedModel.Change
	for _, ch := range node.GetChanges() {
		changes = append(changes, ch.GetPropertyChanges()...)
	}
	return changes
}

// computeStats recursively computes change statistics for a node and all descendants.
// directBreaking only counts breaking changes in the node's own leaf changes
// (from getNodeChanges), so only the node that directly owns a breaking leaf
// displays the breaking count — ancestors do not repeat it.
func computeStats(node *v3.Node, cache map[*v3.Node]nodeStats) nodeStats {
	s := nodeStats{}

	for _, ch := range getNodeChanges(node) {
		switch ch.ChangeType {
		case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
			s.additions++
		case whatChangedModel.Modified:
			s.modifications++
		case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
			s.deletions++
		}
		if ch.Breaking {
			s.directBreaking++
		}
	}
	s.total = s.additions + s.modifications + s.deletions
	s.totalBreaking = s.directBreaking

	for _, child := range node.Children {
		cs := computeStats(child, cache)
		s.additions += cs.additions
		s.modifications += cs.modifications
		s.deletions += cs.deletions
		s.totalBreaking += cs.totalBreaking
		s.total += cs.total
	}

	cache[node] = s
	return s
}

// visualLen returns the approximate visible length of a string, ignoring ANSI escapes.
func visualLen(s string) int {
	n := 0
	inEscape := false
	for _, r := range s {
		if r == '\033' {
			inEscape = true
			continue
		}
		if inEscape {
			if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') {
				inEscape = false
			}
			continue
		}
		n++
	}
	return n
}

// truncateToWidth truncates a string (possibly containing ANSI escapes) to a visible width.
// Appends an ANSI reset if any escape sequences were seen, to avoid corrupting terminal state.
func truncateToWidth(s string, width int) string {
	n := 0
	inEscape := false
	hasEscape := false
	for i, r := range s {
		if r == '\033' {
			inEscape = true
			hasEscape = true
			continue
		}
		if inEscape {
			if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') {
				inEscape = false
			}
			continue
		}
		n++
		if n >= width {
			end := i + utf8.RuneLen(r)
			if hasEscape {
				return s[:end] + "\033[0m"
			}
			return s[:end]
		}
	}
	return s
}
