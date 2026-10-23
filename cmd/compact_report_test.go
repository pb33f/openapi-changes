// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/openapi-changes/model"
	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestCompactReportPetstore(t *testing.T) {
	commits, err := loadLeftRightCommits("../sample-specs/petstorev3-original.json", "../sample-specs/petstorev3.json", summaryOpts{noColor: true})
	require.NoError(t, err)
	report, outcome, err := generateCompactMarkdown(commits, nil)
	require.NoError(t, err)
	assert.Equal(t, compactOutcome{Total: 42, Breaking: 18}, outcome)
	assert.Contains(t, string(report), "**42 changes. 18 breaking changes found.**")
	assert.Contains(t, string(report), "### Breaking highlights")
	assert.Contains(t, string(report), "https://pb33f.io/doctor/")
	assert.NotContains(t, string(report), "Commit")
	assert.LessOrEqual(t, strings.Count(string(report), "\n- "), 8)
}

func TestCompactReportCommandUnchanged(t *testing.T) {
	dir := t.TempDir()
	report, result := filepath.Join(dir, "report.md"), filepath.Join(dir, "result.json")
	command := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "--no-color", "--compact", "--report-file", report, "--result-file", result, "../sample-specs/petstorev3.json", "../sample-specs/petstorev3.json")
	require.NoError(t, command.Execute())
	data, err := os.ReadFile(report)
	require.NoError(t, err)
	assert.Contains(t, string(data), "No changes found.")
	data, err = os.ReadFile(result)
	require.NoError(t, err)
	var outcome compactOutcome
	require.NoError(t, json.Unmarshal(data, &outcome))
	assert.Equal(t, compactOutcome{}, outcome)
}

func TestCompactReportCommandInvalidHasNoOutcome(t *testing.T) {
	left, right := createBrokenReferenceSpecPair(t)
	dir := t.TempDir()
	report, result := filepath.Join(dir, "report.md"), filepath.Join(dir, "result.json")
	command := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "--no-color", "--compact", "--report-file", report, "--result-file", result, left, right)
	require.Error(t, command.Execute())
	_, err := os.Stat(result)
	assert.True(t, os.IsNotExist(err))
	_, err = os.Stat(report)
	assert.True(t, os.IsNotExist(err))
}

func TestCompactReportRejectsIncompleteAndHistory(t *testing.T) {
	for _, commits := range [][]*model.Commit{nil, {nil}, {{Synthetic: true}}, {{Synthetic: false}}} {
		report, _, err := generateCompactMarkdown(commits, nil)
		require.Error(t, err)
		assert.Nil(t, report)
	}
	for _, args := range [][]string{
		{"--compact"},
		{"--compact", "https://github.com/org/repo/blob/main/spec.yaml"},
		{"--compact", ".", "spec.yaml"},
		{"--compact", "--include-diff", "a", "b"},
		{"--result-file", "out.json", "a", "b"},
		{"--compact", "--report-file", "out", "--result-file", "./out", "a", "b"},
	} {
		command := testRootCmd(GetMarkdownReportCommand(), args...)
		require.Error(t, command.Execute())
	}
}

func TestCompactMarkdownEscapesUntrustedHighlights(t *testing.T) {
	report := string(renderCompactMarkdown(compactOutcome{Total: 1, Breaking: 1}, []string{"<script>alert(1)</script>\n![x](https://evil.test) @team `code` &amp;"}))
	assert.NotContains(t, report, "<script>")
	assert.NotContains(t, report, "![x]")
	assert.NotContains(t, report, "@team")
	assert.NotContains(t, report, "`code`")
	assert.Contains(t, report, "&#60;script&#62;")
	assert.Equal(t, strings.Repeat("x", 300)+"...", compactMarkdownText(strings.Repeat("x", 301)))
}

func TestCompactReportWriteFailureHasNoOutcome(t *testing.T) {
	dir := t.TempDir()
	result := filepath.Join(dir, "result.json")
	command := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "--no-color", "--compact", "--report-file", filepath.Join(dir, "missing", "report.md"), "--result-file", result, "../sample-specs/petstorev3.json", "../sample-specs/petstorev3.json")
	require.Error(t, command.Execute())
	_, err := os.Stat(result)
	assert.True(t, os.IsNotExist(err))
}

func TestCompactReportCommandBreakingHasCompletedOutcome(t *testing.T) {
	dir := t.TempDir()
	result := filepath.Join(dir, "result.json")
	command := testRootCmd(GetMarkdownReportCommand(), "--no-logo", "--no-color", "--compact", "--report-file", filepath.Join(dir, "report.md"), "--result-file", result, "../sample-specs/petstorev3-original.json", "../sample-specs/petstorev3.json")
	require.NoError(t, command.Execute())
	data, err := os.ReadFile(result)
	require.NoError(t, err)
	assert.JSONEq(t, `{"total":42,"breaking":18}`, string(data))
}

func TestCompactReportRejectsAliasedOutputs(t *testing.T) {
	dir := t.TempDir()
	report, result := filepath.Join(dir, "report"), filepath.Join(dir, "result")
	require.NoError(t, os.WriteFile(report, []byte("existing"), 0600))
	require.NoError(t, os.Link(report, result))
	require.Error(t, validateCompactOptions([]string{"a", "b"}, true, false, report, result))
}
