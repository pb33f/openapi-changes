// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0
package v2

import (
	"fmt"

	"github.com/pb33f/doctor/terminal/diffview"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
)

func (s consoleStyles) diffStyles() diffview.Styles {
	return diffview.Styles{
		SelectedRow:    s.selectedRow,
		RangeHighlight: s.rangeHighlight,
		AddedRow:       s.addedRow,
		AddedRange:     s.addedRange,
		RemovedRow:     s.removedRow,
		RemovedRange:   s.removedRange,
		Added:          s.added,
		Modified:       s.modified,
		Removed:        s.removed,
		Breaking:       s.breaking,
		Grey:           s.grey,
		Detail:         s.detail,
		YAMLKey:        s.yamlKey,
	}
}

type highlightRange struct{ start, end int }

func renderDiffSummary(ch *whatChangedModel.Change, width int, styles consoleStyles) string {
	summary := diffview.RenderSummary(ch, width, styles.diffStyles())
	if ch == nil || ch.SchemaResource == "" || ch.Context == nil {
		return summary
	}
	side, file, line := "Modified", ch.Context.ModifiedDocument, ch.Context.NewLine
	if ch.ChangeType == whatChangedModel.PropertyRemoved || ch.ChangeType == whatChangedModel.ObjectRemoved {
		side, file, line = "Original", ch.Context.OriginalDocument, ch.Context.OriginalLine
	}
	if file == "" || line == nil {
		return summary
	}
	location := fmt.Sprintf("%s %s:%d", side, file, *line)
	return styles.detail.Render(truncateToWidth(location, width)) + "\n" + summary
}
func renderDiff(ch *whatChangedModel.Change, newLines, oldLines []string, width int, styles consoleStyles) string {
	source := resolveChangeSource(ch, newLines, oldLines)
	return diffview.RenderChange(ch, source, width, styles.diffStyles())
}
func computeBlockRangeForChange(lines []string, line int, ch *whatChangedModel.Change) (int, int) {
	r := diffview.RangeForChange(lines, line, ch)
	return r.Start, r.End
}
func renderSpecLines(lines []string, hl highlightRange, changeType, width int, styles consoleStyles) string {
	return diffview.RenderSource(lines, diffview.Range{Start: hl.start, End: hl.end}, changeType, width, styles.diffStyles())
}

// Native schema coordinates refer to the supplied per-side buffers. Other
// formats supply root text, so external locations have no local excerpt.
func resolveChangeSource(ch *whatChangedModel.Change, newLines, oldLines []string) diffview.Source {
	if ch == nil || ch.Context == nil || ch.Context.DocumentLocation != "" && ch.SchemaResource == "" {
		return diffview.Source{}
	}
	source := diffview.Source{Lines: newLines, Side: diffview.Candidate}
	if ch.ChangeType == whatChangedModel.PropertyRemoved || ch.ChangeType == whatChangedModel.ObjectRemoved {
		source.Lines, source.Side = oldLines, diffview.Original
		if ch.Context.OriginalLine != nil {
			source.Line = *ch.Context.OriginalLine
		}
	} else if ch.Context.NewLine != nil {
		source.Line = *ch.Context.NewLine
	}
	if source.Line < 1 || source.Line > len(source.Lines) {
		return diffview.Source{}
	}
	return source
}
func resolveSpecAndLine(ch *whatChangedModel.Change, newLines, oldLines []string) ([]string, int) {
	source := resolveChangeSource(ch, newLines, oldLines)
	return source.Lines, source.Line
}
