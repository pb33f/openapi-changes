// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"errors"
	"fmt"
	"strings"
	"unicode"

	"github.com/pb33f/doctor/changerator/renderer"
	v3 "github.com/pb33f/doctor/model/high/v3"
	"github.com/pb33f/doctor/terminal"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/changecounts"
	"github.com/pb33f/openapi-changes/model"
)

// compactOutcome is written only after a complete direct comparison.
// Counts use the same semantic identity as the human summary.
type compactOutcome struct {
	Total    int `json:"total"`
	Breaking int `json:"breaking"`
}

func generateCompactMarkdown(commits []*model.Commit, config *whatChangedModel.BreakingRulesConfig) ([]byte, compactOutcome, error) {
	var outcome compactOutcome
	if len(commits) != 1 || commits[0] == nil || !commits[0].Synthetic || commits[0].Document == nil || commits[0].OldDocument == nil {
		return nil, outcome, errors.New("compact report requires one complete direct comparison")
	}
	result, err := runChangerator(commits[0], config)
	if err != nil {
		return nil, outcome, err
	}
	var highlights []string
	if result != nil {
		defer result.Release()
		changes := changecounts.Deduplicate(result.DocChanges.GetAllChanges())
		counts := changecounts.FromChanges(changes)
		outcome.Total, outcome.Breaking = counts.Total, counts.Breaking
		if outcome.Breaking > 0 {
			var root *v3.Node
			for _, node := range result.Changerator.ChangedNodes {
				if node != nil && node.Id == "root" {
					root = node
					break
				}
			}
			if root == nil {
				root = result.RightDrDoc.V3Document.Node
			}
			result.Changerator.BuildNodeChangeTree(root)
			highlights = renderer.NewSemanticTreeRenderer(root, changes, &renderer.TreeConfig{
				ColorScheme: terminal.NoColorScheme{},
			}).Highlights(8)
			// Whole-object removals can have no surviving tree node to highlight.
			if len(highlights) == 0 {
				for _, change := range changes {
					if change != nil && change.Breaking {
						highlights = append(highlights, "Breaking change: "+strings.TrimSpace(change.Path+" "+change.Property))
						if len(highlights) == 8 {
							break
						}
					}
				}
			}
		}
	}
	return renderCompactMarkdown(outcome, highlights), outcome, nil
}

func renderCompactMarkdown(outcome compactOutcome, highlights []string) []byte {
	var sb strings.Builder
	sb.WriteString("## OpenAPI changes\n\n")
	switch {
	case outcome.Total == 0:
		sb.WriteString("No changes found.\n\n")
	case outcome.Breaking == 0:
		fmt.Fprintf(&sb, "**Total changes: %d. No breaking changes found.**\n\n", outcome.Total)
	default:
		fmt.Fprintf(&sb, "**Total changes: %d. Breaking changes: %d.**\n\n", outcome.Total, outcome.Breaking)
	}
	sb.WriteString("Counts are deduplicated by JSONPath + property.\n\n")
	if len(highlights) > 0 {
		sb.WriteString("### Breaking highlights\n\n")
		for _, item := range highlights {
			sb.WriteString("- ")
			sb.WriteString(compactMarkdownText(item))
			sb.WriteByte('\n')
		}
		sb.WriteString("\nUp to 8 highlights are shown. See the full report for all changes.\n\n")
	}
	sb.WriteString("Use [OpenAPI Doctor](https://pb33f.io/doctor/) for workspace history, diagnostics, and pipeline controls.\n")
	return []byte(sb.String())
}

// Encode punctuation before Markdown parsing so spec text cannot create HTML,
// links, mentions, or formatting. Bound each highlight for job summaries.
func compactMarkdownText(text string) string {
	var sb strings.Builder
	count := 0
	for _, r := range text {
		if count == 300 {
			sb.WriteString("...")
			break
		}
		count++
		switch {
		case unicode.IsSpace(r):
			sb.WriteByte(' ')
		case unicode.IsControl(r):
		case r < 128 && !unicode.IsLetter(r) && !unicode.IsDigit(r):
			fmt.Fprintf(&sb, "&#%d;", r)
		default:
			sb.WriteRune(r)
		}
	}
	return sb.String()
}
