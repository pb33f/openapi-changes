// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"charm.land/bubbletea/v2"
	"encoding/json"
	"fmt"
	"github.com/charmbracelet/x/ansi"
	tui "github.com/pb33f/openapi-changes/tui/v2"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/pb33f/libopenapi/jsonschema"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pb33f/testify/require"
)

func writeSchemaFile(t *testing.T, dir, name, body string) string {
	t.Helper()
	file := filepath.Join(dir, name)
	require.NoError(t, os.MkdirAll(filepath.Dir(file), 0700))
	require.NoError(t, os.WriteFile(file, []byte(body), 0600))
	return file
}

func TestJSONSchemaSingleRootCommands(t *testing.T) {
	left := "../sample-specs/json-schema/before/customer.json"
	right := "../sample-specs/json-schema/after/customer.json"
	commits, err := loadLeftRightCommits(left, right, summaryOpts{})
	require.NoError(t, err)
	require.Len(t, commits, 1)
	t.Cleanup(func() { releaseDirectInputs(commits[0]) })
	flat, err := runLeftRightReport(left, right, summaryOpts{}, nil)
	require.NoError(t, err)
	require.Nil(t, flat.Commit)
	require.Equal(t, &model.ComparisonSpecification{Kind: "jsonschema", OriginalVersion: jsonschema.Dialect, ModifiedVersion: jsonschema.Dialect}, flat.Specification)
	require.Len(t, flat.Changes, 1)
	ch := flat.Changes[0]
	require.Equal(t, "$.required", ch.Path)
	require.Equal(t, "required", ch.Property)
	require.Equal(t, "id", ch.New)
	require.True(t, ch.Breaking)
	require.Equal(t, "https://schemas.example.test/customer", ch.SchemaResource)
	require.Equal(t, "customer.json", ch.Context.ModifiedDocument)
	require.Equal(t, 12, *ch.Context.NewLine)
	require.NotEmpty(t, ch.ChangeHash)
	require.Equal(t, 1, flat.Summary[ch.SchemaResource].Breaking)

	summary, breaking, changed, err := renderSummary(commits, nil, false, true, false, summaryStyles{})
	require.NoError(t, err)
	require.True(t, breaking)
	require.True(t, changed)
	require.Contains(t, summary, "Customer")
	text, err := generateMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.Contains(t, string(text), "# JSON Schema Changes Report")
	require.Contains(t, string(text), "Customer")
	require.Contains(t, string(text), "+++ customer.json")
	items, err := buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	require.Len(t, items, 1)
	require.Equal(t, "jsonschema", items[0].Specification.Kind)
	require.Equal(t, 1, items[0].Summary.TotalChanges)
	require.Empty(t, items[0].OriginalSources)
	require.Empty(t, items[0].ModifiedSources)
	ctr, root, release, err := bridgeRunChangerator(commits[0], nil)
	require.NoError(t, err)
	defer release()
	require.Equal(t, "root", root.Id)
	require.Equal(t, "Customer", root.Label)
	require.Len(t, ctr.DeduplicateChanges(), 1)
}

func TestJSONSchemaExplicitAndConfig(t *testing.T) {
	dir := t.TempDir()
	old := writeSchemaFile(t, dir, "before.json", "false")
	after := writeSchemaFile(t, dir, "after.json", "true")
	_, err := runLeftRightReport(old, after, summaryOpts{}, nil)
	require.Error(t, err)
	flat, err := runLeftRightReport(old, after, summaryOpts{schema: true}, nil)
	require.NoError(t, err)
	require.Equal(t, "$", flat.Changes[0].Path)
	require.False(t, flat.Changes[0].Breaking)
	writeSchemaFile(t, dir, "before.json", `{"minLength":3}`)
	writeSchemaFile(t, dir, "after.json", `{"minLength":2}`)
	cfg := writeSchemaFile(t, dir, "policy.yaml", "schemaRules:\n  schema:\n    minLength: {modified: true}\n")
	md, result := filepath.Join(dir, "out.md"), filepath.Join(dir, "result.json")
	cmd := testRootCmd(GetMarkdownReportCommand(), "--schema", "--compact", "--config", cfg, "--no-logo", "--report-file", md, "--result-file", result, old, after)
	require.NoError(t, cmd.Execute())
	data, err := os.ReadFile(result)
	require.NoError(t, err)
	require.JSONEq(t, `{"total":1,"breaking":1}`, string(data))
	data, err = os.ReadFile(md)
	require.NoError(t, err)
	require.Contains(t, string(data), "## JSON Schema changes")
	flat, err = runLeftRightReport(old, after, summaryOpts{schema: true}, nil)
	require.NoError(t, err)
	require.False(t, flat.Changes[0].Breaking)
}

func TestJSONSchemaGitSourcesAndPartialHistory(t *testing.T) {
	root := "type: object\nproperties:\n  price:\n    $ref: money.yaml\n"
	repo := t.TempDir()
	runGitInDir(t, repo, "init")
	runGitInDir(t, repo, "config", "user.name", "Fixture")
	runGitInDir(t, repo, "config", "user.email", "fixture@example.test")
	save := func(message string) { runGitInDir(t, repo, "add", "."); runGitInDir(t, repo, "commit", "-m", message) }
	writeSchemaFile(t, repo, "schemas/customer.yaml", root)
	writeSchemaFile(t, repo, "schemas/money.yaml", "type: string\nminLength: 2\n")
	save("original")
	writeSchemaFile(t, repo, "schemas/customer.yaml", "type: [\n")
	save("invalid")
	skipped := gitOutputInDir(t, repo, "rev-parse", "--short", "HEAD")
	writeSchemaFile(t, repo, "schemas/customer.yaml", root)
	writeSchemaFile(t, repo, "schemas/money.yaml", "type: string\nminLength: 3\n")
	save("tighten")
	writeSchemaFile(t, repo, "schemas/money.yaml", "type: string\nminLength: 99\n")
	t.Chdir(repo)
	opts := summaryOpts{schema: true, globalRevisions: true, limitTime: -1}
	before, after := "HEAD~2:schemas/customer.yaml", "HEAD:schemas/customer.yaml"
	check := func(flat *model.FlatReport) {
		t.Helper()
		require.NotNil(t, flat)
		require.Len(t, flat.Changes, 1)
		ch := flat.Changes[0]
		require.Equal(t, "money.yaml", ch.SchemaResource)
		require.Equal(t, "$.minLength", ch.Path)
		require.Equal(t, "2", ch.Original)
		require.Equal(t, "3", ch.New)
		require.Equal(t, "money.yaml", ch.Context.OriginalDocument)
		require.Equal(t, "money.yaml", ch.Context.ModifiedDocument)
		require.True(t, ch.Breaking)
	}
	flat, err := runLeftRightReport(before, after, opts, nil)
	require.NoError(t, err)
	check(flat)
	history, err := runGitHistoryReport(repo, "schemas/customer.yaml", opts, nil)
	require.NoError(t, err)
	require.NotNil(t, history)
	require.True(t, history.MetaData.Partial)
	require.Equal(t, []string{skipped}, history.MetaData.SkippedCommits)
	require.Len(t, history.Reports, 1)
	check(history.Reports[0])

	commits, err := loadGitHistoryCommits(repo, "schemas/customer.yaml", opts, nil)
	require.NoError(t, err)
	items, err := buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	require.Len(t, items, 1)
	require.Contains(t, items[0].ModifiedSources["money.yaml"], "minLength: 3")
	for _, c := range commits {
		require.Nil(t, c.OriginalSchemas)
		require.Nil(t, c.ModifiedSchemas)
	}
	markdown, err := generateMarkdownReport(commits, nil, true)
	require.NoError(t, err)
	require.Contains(t, string(markdown), "--- money.yaml")
	require.Contains(t, string(markdown), "+minLength: 3")
	require.NotContains(t, string(markdown), "minLength: 99")
}

func TestJSONSchemaInputBoundaries(t *testing.T) {
	left := "../sample-specs/json-schema/before/customer.json"
	dir := t.TempDir()
	for _, tc := range []struct{ name, source, message string }{
		{"unsupported", `{"$schema":"https://schemas.example.test/application"}`, "https://schemas.example.test/application"},
		{"conflict", `{"$schema":"https://json-schema.org/draft/2020-12/schema","asyncapi":"3.0.0"}`, "conflicting"},
		{"mixed", `{"openapi":"3.1.0","info":{"title":"API","version":"1"},"paths":{}}`, "cannot compare JSON Schema and OpenAPI"},
		{"malformed", `{"$schema":`, "unable to parse modified document"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			file := writeSchemaFile(t, dir, tc.name+".json", tc.source)
			_, err := runLeftRightReport(left, file, summaryOpts{}, nil)
			require.ErrorContains(t, err, tc.message)
		})
	}
}

func TestJSONSchemaReportStableOrderingAndHash(t *testing.T) {
	left := "../sample-specs/json-schema/before/customer.json"
	right := "../sample-specs/json-schema/after/customer.json"
	report := func() string {
		t.Helper()
		cmd := testRootCmd(GetReportCommand(), "--reproducible", left, right)
		return captureStdout(t, func() { require.NoError(t, cmd.Execute()) })
	}
	a, b := report(), report()
	require.Equal(t, a, b)
	require.True(t, json.Valid([]byte(a)))
}

func TestJSONSchemaConsoleOpensAuthoredLine(t *testing.T) {
	before := "../sample-specs/json-schema/before/customer.json"
	after := "../sample-specs/json-schema/after/customer.json"
	for _, tc := range []struct{ name, left, right string }{
		{"added", before, after}, {"removed", after, before},
	} {
		t.Run(tc.name, func(t *testing.T) {
			commits, err := loadLeftRightCommits(tc.left, tc.right, summaryOpts{})
			require.NoError(t, err)
			t.Cleanup(func() { releaseDirectInputs(commits[0]) })
			var console tea.Model = tui.NewConsoleModel(commits, nil, false, "", bridgeRunChangerator)
			console, _ = console.Update(tea.WindowSizeMsg{Width: 140, Height: 44})
			console, _ = console.Update(tea.KeyPressMsg{Code: tea.KeyHome})
			console, _ = console.Update(tea.KeyPressMsg{Code: tea.KeyEnter})
			view := ansi.Strip(console.View().Content)
			require.Contains(t, view, "RECENTER")
			require.Regexp(t, `12[│ ┃]*"id"`, view)
			console, _ = console.Update(tea.KeyPressMsg{Code: tea.KeyEscape})
			_, quit := console.Update(tea.KeyPressMsg{Code: 'q', Text: "q"})
			require.NotNil(t, quit)
			require.IsType(t, tea.QuitMsg{}, quit())
		})
	}
}

func TestJSONSchemaHTTPSources(t *testing.T) {
	dir := t.TempDir()
	root := "$ref: money.yaml\n"
	for i, side := range []string{"before", "after"} {
		writeSchemaFile(t, dir, side+"/root.yaml", root)
		writeSchemaFile(t, dir, side+"/money.yaml", fmt.Sprintf("minLength: %d\n", i+2))
	}
	server := httptest.NewServer(http.FileServer(http.Dir(dir)))
	t.Cleanup(server.Close)
	files := []struct{ name, base string }{{"file", dir}, {"url", server.URL}}
	for _, tc := range files {
		t.Run(tc.name, func(t *testing.T) {
			flat, err := runLeftRightReport(tc.base+"/before/root.yaml", tc.base+"/after/root.yaml", summaryOpts{schema: true}, nil)
			require.NoError(t, err)
			require.Len(t, flat.Changes, 1)
			ch := flat.Changes[0]
			require.Equal(t, "$.minLength", ch.Path)
			require.Equal(t, "2", ch.Original)
			require.Equal(t, "3", ch.New)
			require.Contains(t, ch.Context.OriginalDocument, "money.yaml")
			require.Contains(t, ch.Context.ModifiedDocument, "money.yaml")
		})
	}
}

func TestJSONSchemaExplicitLocalBase(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "shared")
	for _, side := range []string{"before", "after"} {
		writeSchemaFile(t, dir, side+"/root.yaml", "$schema: "+jsonschema.Dialect+"\n$ref: "+side+".yaml\n")
		writeSchemaFile(t, dir, side+"/"+side+".yaml", "$id: urn:money\nminLength: 99\n")
	}
	writeSchemaFile(t, base, "before.yaml", "$id: urn:money\nminLength: 2\n")
	writeSchemaFile(t, base, "after.yaml", "$id: urn:money\nminLength: 3\n")
	for _, explicit := range []bool{false, true} {
		flat, err := runLeftRightReport(filepath.Join(dir, "before/root.yaml"), filepath.Join(dir, "after/root.yaml"), summaryOpts{schema: explicit, base: base}, nil)
		require.NoError(t, err)
		for _, ch := range flat.Changes {
			if ch.Property == "minLength" {
				require.Equal(t, "2", ch.Original)
				require.Equal(t, "3", ch.New)
				goto found
			}
		}
		t.Fatal("missing change to minLength in the explicit base directory")
	found:
	}
}
