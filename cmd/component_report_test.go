// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestComponentReports_PreserveEachComponent(t *testing.T) {
	const base = "openapi: 3.2.0\ninfo: {title: Component regression, version: '1'}\npaths: {}\ncomponents:\n  schemas:\n    Existing: {type: boolean}\n"
	const components = `
    First: {type: string}
    Second: {type: integer}
  responses:
    First: {description: first response}
    Second: {description: second response}
  parameters:
    First: {name: first, in: query, schema: {type: string}}
    Second: {name: second, in: query, schema: {type: string}}
  mediaTypes:
    First: {schema: {type: string}}
    Second: {schema: {type: integer}}
`
	for _, removing := range []bool{false, true} {
		name := "additions"
		left, right := base, base+components
		if removing {
			name, left, right = "removals", right, left
		}
		t.Run(name, func(t *testing.T) {
			dir := t.TempDir()
			leftPath, rightPath := filepath.Join(dir, "left.yaml"), filepath.Join(dir, "right.yaml")
			require.NoError(t, os.WriteFile(leftPath, []byte(left), 0600))
			require.NoError(t, os.WriteFile(rightPath, []byte(right), 0600))
			commits, err := loadLeftRightCommits(leftPath, rightPath, summaryOpts{noColor: true})
			require.NoError(t, err)
			items, err := buildHTMLReportItems(commits, nil)
			require.NoError(t, err)
			require.Len(t, items, 1)
			item := items[0]
			assert.Equal(t, 8, item.Summary.TotalChanges)
			if removing {
				assert.Equal(t, 8, item.Summary.Removals)
			} else {
				assert.Equal(t, 8, item.Summary.Additions)
			}
			var changes []*wcModel.Change
			require.NoError(t, json.Unmarshal(item.Graph.Changes, &changes))
			require.Len(t, changes, 8)
			paths := make([]string, 0, len(changes))
			for _, change := range changes {
				paths = append(paths, change.Path)
			}
			assert.ElementsMatch(t, []string{
				"$.components.schemas['First']", "$.components.schemas['Second']",
				"$.components.responses['First']", "$.components.responses['Second']",
				"$.components.parameters['First']", "$.components.parameters['Second']",
				"$.components.mediaTypes['First']", "$.components.mediaTypes['Second']",
			}, paths)
			assert.Contains(t, item.HtmlReport, "<td>8</td>")
			assert.Contains(t, item.HtmlReport, "<strong>8</strong> changes detected")
			assert.Contains(t, string(item.Graph.NodeChangeTree), "$.components")

			markdown, err := renderCommitMarkdown(commits[0], nil)
			require.NoError(t, err)
			assert.Contains(t, markdown, "**8** changes detected")
			assert.Contains(t, markdown, "| Component | 8 |")
			summary, _, _, err := renderSummary(commits, nil, false, true, false, summaryStyles{})
			require.NoError(t, err)
			assert.Contains(t, summary, "│ components       │             8 │")
		})
	}
}
