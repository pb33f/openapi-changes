// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	tea "charm.land/bubbletea/v2"
	"github.com/charmbracelet/x/ansi"
	v3 "github.com/pb33f/doctor/model/high/v3"
	wc "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	tui "github.com/pb33f/openapi-changes/tui/v2"
	"github.com/pb33f/testify/require"
)

const collectionFixture = "../sample-specs/json-schema/collections/"

func TestSchemaCollectionAcrossCommands(t *testing.T) {
	before, after := collectionFixture+"before", collectionFixture+"after"
	const money = "https://schemas.example.test/money"
	report := testRootCmd(GetReportCommand(), "--schema", "--reproducible", before, after)
	data := captureStdout(t, func() { require.NoError(t, report.Execute()) })
	var flat model.FlatReport
	require.NoError(t, json.Unmarshal([]byte(data), &flat))
	require.Nil(t, flat.Commit)
	require.Len(t, flat.Changes, 1)
	change := flat.Changes[0]
	require.Equal(t, money, change.SchemaResource)
	require.Equal(t, "$.properties.currency.minLength", change.Path)
	require.Equal(t, "2", change.Original)
	require.Equal(t, "3", change.New)
	require.Equal(t, 1, flat.Summary[money].Breaking)
	require.Equal(t, "money.json", change.Context.ModifiedDocument)
	require.Equal(t, 9, *change.Context.NewLine)
	summary := testRootCmd(GetSummaryCommand(), "--schema", "--no-logo", "--no-color", "--with-lines", before, after)
	rendered := captureStdout(t, func() { require.ErrorContains(t, summary.Execute(), "breaking changes discovered") })
	require.Contains(t, rendered, "Money")
	require.Contains(t, rendered, "minLength")
	reverse := testRootCmd(GetSummaryCommand(), "--schema", "--no-logo", "--error-on-diff", after, before)
	captureStdout(t, func() { require.ErrorContains(t, reverse.Execute(), "differences discovered") })

	dir := t.TempDir()
	md, outcome := filepath.Join(dir, "report.md"), filepath.Join(dir, "result.json")
	compact := testRootCmd(GetMarkdownReportCommand(), "--schema", "--compact", "--report-file", md, "--result-file", outcome, before, after)
	captureStdout(t, func() { require.NoError(t, compact.Execute()) })
	counts, err := os.ReadFile(outcome)
	require.NoError(t, err)
	require.JSONEq(t, `{"total":1,"breaking":1}`, string(counts))
	commits, err := loadCommitsFromArgs([]string{before, after}, summaryOpts{schema: true}, nil)
	require.NoError(t, err)
	require.Len(t, commits, 1)
	t.Cleanup(func() { releaseDirectInputs(commits[0]) })
	markdown, err := generateMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.Contains(t, string(markdown), "Money")
	require.Contains(t, string(markdown), "--- money.json\n+++ money.json")
	require.NotContains(t, string(markdown), "--- invoice.json")
	items, err := buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	require.Len(t, items, 1)
	item := items[0]
	require.Equal(t, 1, item.Summary.TotalChanges)
	require.Equal(t, 1, item.Summary.BreakingChanges)
	require.Len(t, item.ModifiedSources, 3)
	require.Contains(t, item.ModifiedSources["money.json"], `"minLength": 3`)
	for _, raw := range []json.RawMessage{item.Graph.Edges, item.ExplorerGraph.Edges} {
		var edges []v3.Edge
		require.NoError(t, json.Unmarshal(raw, &edges))
		var references []v3.Edge
		for _, e := range edges {
			if e.Ref == money {
				references = append(references, e)
			}
		}
		require.Len(t, references, 2)
		require.Equal(t, references[0].Targets, references[1].Targets)
		require.NotEqual(t, references[0].Sources, references[1].Sources)
	}
	view := openSchemaConsoleChange(t, commits, false)
	require.Contains(t, view, "RECENTER")
	require.Regexp(t, `9[│ ┃]*"minLength": 3`, view)
}

func openSchemaConsoleChange(t *testing.T, commits []*model.Commit, last bool) string {
	t.Helper()
	var console tea.Model = tui.NewConsoleModel(commits, nil, false, "", bridgeRunChangerator)
	console, _ = console.Update(tea.WindowSizeMsg{Width: 140, Height: 44})
	key := tea.KeyHome
	if last {
		key = tea.KeyEnd
	}
	console, _ = console.Update(tea.KeyPressMsg{Code: key})
	console, _ = console.Update(tea.KeyPressMsg{Code: tea.KeyEnter})
	view := ansi.Strip(console.View().Content)
	console, _ = console.Update(tea.KeyPressMsg{Code: tea.KeyEscape})
	_, quit := console.Update(tea.KeyPressMsg{Code: 'q', Text: "q"})
	require.NotNil(t, quit)
	require.IsType(t, tea.QuitMsg{}, quit())
	return view
}

func TestSchemaCollectionCandidatesAndIdentity(t *testing.T) {
	before, after := t.TempDir(), t.TempDir()
	for i, dir := range []string{after, before} {
		for _, file := range []string{"deeper/second.YML", "first.YAML"} {
			writeSchemaFile(t, dir, file, fmt.Sprintf("title: %s\nminLength: %d\n", filepath.Base(file), 3-i))
		}
		writeSchemaFile(t, dir, ".git/ignored.json", "[")
		writeSchemaFile(t, dir, "readme.txt", "[")
		require.NoError(t, os.Symlink(filepath.Join(dir, "deeper"), filepath.Join(dir, "linked")))
		require.NoError(t, os.Symlink(filepath.Join(dir, ".git/ignored.json"), filepath.Join(dir, "linked.json")))
	}
	opts := summaryOpts{schema: true}
	flat, err := runLeftRightReport(before, after, opts, nil)
	require.NoError(t, err)
	require.Len(t, flat.Changes, 2)
	a, b := flat.Changes[0], flat.Changes[1]
	require.Equal(t, a.Path, b.Path)
	require.Equal(t, *a.Context.NewLine, *b.Context.NewLine)
	require.Equal(t, *a.Context.NewColumn, *b.Context.NewColumn)
	require.NotEqual(t, a.ChangeHash, b.ChangeHash)
	require.Equal(t, "deeper/second.YML", a.SchemaResource)
	require.Equal(t, "first.YAML", b.SchemaResource)
	changes := []*wc.Change{a.Change, b.Change}
	grouped := buildElementSummaries(changes, map[string]string{a.SchemaResource: "Price", b.SchemaResource: "Price"})
	require.Equal(t, "Price (deeper/second.YML)", grouped[0].name)
	require.Equal(t, "Price (first.YAML)", grouped[1].name)
	commits, err := loadLeftRightCommits(before, after, opts)
	require.NoError(t, err)
	t.Cleanup(func() { releaseDirectInputs(commits[0]) })
	body, err := generateMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.Equal(t, 2, strings.Count(string(body), "\n+++ "))
	require.Contains(t, string(body), "+++ deeper/second.YML")
	require.Contains(t, string(body), "+++ first.YAML")
	first, last := openSchemaConsoleChange(t, commits, false), openSchemaConsoleChange(t, commits, true)
	require.Contains(t, first, "second.YML")
	require.Contains(t, last, "first.YAML")
	require.NotEqual(t, first, last)
}

func TestSchemaCollectionEmptyAndInvalidMembers(t *testing.T) {
	empty, other, members := t.TempDir(), t.TempDir(), t.TempDir()
	opts := summaryOpts{schema: true}
	flat, err := runLeftRightReport(empty, other, opts, nil)
	require.NoError(t, err)
	require.Nil(t, flat)
	cmd := testRootCmd(GetSummaryCommand(), "--schema", "--no-logo", empty, other)
	none := captureStdout(t, func() { require.NoError(t, cmd.Execute()) })
	require.Contains(t, strings.ToLower(none), "no changes found")
	require.NotContains(t, none, "prior comparable")
	mdPath, resultPath := filepath.Join(t.TempDir(), "compact.md"), filepath.Join(t.TempDir(), "result.json")
	cmd = testRootCmd(GetMarkdownReportCommand(), "--schema", "--compact", "--no-logo", "--report-file", mdPath, "--result-file", resultPath, empty, other)
	captureStdout(t, func() { require.NoError(t, cmd.Execute()) })
	counts, err := os.ReadFile(resultPath)
	require.NoError(t, err)
	require.JSONEq(t, `{"total":0,"breaking":0}`, string(counts))
	writeSchemaFile(t, members, "resource.json", `{"title":"ArchivedSchema","type":"integer"}`)
	flat, err = runLeftRightReport(empty, members, opts, nil)
	require.NoError(t, err)
	require.Len(t, flat.Changes, 1)
	require.False(t, flat.Changes[0].Breaking)
	commits, err := loadLeftRightCommits(members, empty, opts)
	require.NoError(t, err)
	t.Cleanup(func() { releaseDirectInputs(commits[0]) })
	require.Contains(t, openSchemaConsoleChange(t, commits, false), "ArchivedSchema")
	body, err := generateMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.Contains(t, string(body), "--- resource.json\n+++ /dev/null")
	writeSchemaFile(t, members, "bad.yaml", "type: [")
	_, err = runLeftRightReport(empty, members, opts, nil)
	require.ErrorContains(t, err, "modified")
	require.ErrorContains(t, err, "bad.yaml")
	writeSchemaFile(t, members, "bad.yaml", "$id: urn:duplicate")
	writeSchemaFile(t, members, "resource.json", `{"$id":"urn:duplicate"}`)
	_, err = runLeftRightReport(empty, members, opts, nil)
	require.ErrorContains(t, err, "urn:duplicate")
}

func TestSchemaCollectionModePreservesNamedFileHistory(t *testing.T) {
	left, right := t.TempDir(), t.TempDir()
	require.Equal(t, schemaDirectories, comparisonMode([]string{left, right}, true))
	require.Equal(t, localHistory, comparisonMode([]string{left, right}, false))
	require.Equal(t, localHistory, comparisonMode([]string{left, "schemas/customer.json"}, true))
	require.Equal(t, githubHistory, comparisonMode([]string{"https://github.com/owner/repo/blob/main/schema.json"}, true))
	require.Equal(t, directInputs, comparisonMode([]string{"HEAD~1:schema.json", "HEAD:schema.json"}, true))
}
