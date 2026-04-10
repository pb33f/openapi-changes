// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package html_report

import (
	"testing"
	"time"

	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestHighlightSpecLines_YAML(t *testing.T) {
	spec := "openapi: \"3.0.0\"\ninfo:\n  title: Petstore\n"
	result := highlightSpecLines(spec)

	require.NotNil(t, result)
	assert.True(t, len(result) >= 3, "should have at least 3 lines")
	// Line 1 should be present and non-empty (highlighted HTML)
	assert.NotEmpty(t, result[1])
}

func TestHighlightSpecLines_JSON(t *testing.T) {
	spec := `{"openapi": "3.0.0", "info": {"title": "Petstore"}}`
	result := highlightSpecLines(spec)

	require.NotNil(t, result)
	assert.NotEmpty(t, result[1])
}

func TestHighlightSpecLines_Empty(t *testing.T) {
	result := highlightSpecLines("")
	assert.Nil(t, result)
}

func TestHighlightSpecLines_LineNumbering(t *testing.T) {
	spec := "line1\nline2\nline3"
	result := highlightSpecLines(spec)

	require.NotNil(t, result)
	// Lines should be 1-based
	assert.NotEmpty(t, result[1])
	assert.NotEmpty(t, result[2])
	assert.NotEmpty(t, result[3])
	// Line 0 should not exist
	_, hasZero := result[0]
	assert.False(t, hasZero)
}

func TestEscapeLines(t *testing.T) {
	spec := "<script>alert('xss')</script>\nnormal line"
	result := escapeLines(spec)

	require.NotNil(t, result)
	assert.Contains(t, result[1], "&lt;script&gt;")
	assert.Equal(t, "normal line", result[2])
}

func TestEscapeLines_LineNumbering(t *testing.T) {
	spec := "a\nb\nc"
	result := escapeLines(spec)

	assert.Equal(t, "a", result[1])
	assert.Equal(t, "b", result[2])
	assert.Equal(t, "c", result[3])
}

func TestNewReportData_Full(t *testing.T) {
	rd := NewReportData(`{"test": true}`, false)

	assert.Equal(t, `{"test": true}`, rd.Report)
	assert.NotEmpty(t, rd.BundledJS)
	assert.NotEmpty(t, rd.BundledCSS)
	// Full bundle should include the full JS
	assert.Equal(t, bundledJS, rd.BundledJS)
}

func TestNewReportData_Lite(t *testing.T) {
	rd := NewReportData(`{"test": true}`, true)

	assert.Equal(t, bundledLiteJS, rd.BundledJS)
	assert.NotEqual(t, bundledJS, rd.BundledJS, "lite should use the lite bundle")
}

func TestBuildHistoryData(t *testing.T) {
	items := []*ReportItem{
		{
			ChangeId: "0",
			Commit:   &CommitInfo{Date: "2024-01-01T00:00:00Z"},
			Summary: &SummaryData{
				Additions:     5,
				Modifications: 3,
				Removals:      1,
			},
		},
		{
			ChangeId: "1",
			Commit:   &CommitInfo{Date: "2024-02-01T00:00:00Z"},
			Summary: &SummaryData{
				Additions:     2,
				Modifications: 0,
				Removals:      4,
			},
		},
	}

	history := BuildHistoryData(items)

	require.NotNil(t, history)
	require.NotNil(t, history.ChangeData)
	assert.Nil(t, history.QualityData)
	assert.Nil(t, history.ViolationData)

	// Items are newest-first, chart data is reversed to chronological (oldest-first)
	assert.Equal(t, []string{"2024-02-01T00:00:00Z", "2024-01-01T00:00:00Z"}, history.ChangeData.Labels)
	assert.Equal(t, []string{"1", "0"}, history.ChangeIds)

	require.Len(t, history.ChangeData.Datasets, 3)
	assert.Equal(t, "Additions", history.ChangeData.Datasets[0].Label)
	assert.Equal(t, []float64{2, 5}, history.ChangeData.Datasets[0].Data)
	assert.Equal(t, "Modifications", history.ChangeData.Datasets[1].Label)
	assert.Equal(t, []float64{0, 3}, history.ChangeData.Datasets[1].Data)
	assert.Equal(t, "Removals", history.ChangeData.Datasets[2].Label)
	assert.Equal(t, []float64{4, 1}, history.ChangeData.Datasets[2].Data)
}

func TestBuildHistoryData_Empty(t *testing.T) {
	history := BuildHistoryData([]*ReportItem{})

	require.NotNil(t, history)
	assert.Empty(t, history.ChangeIds)
	assert.Empty(t, history.ChangeData.Labels)
}

func TestBuildCommitInfo(t *testing.T) {
	now := time.Now()
	info := buildCommitInfo(&model.Commit{
		Hash:        "abc123",
		Message:     "fix things",
		Author:      "Dave",
		AuthorEmail: "dave@example.com",
		CommitDate:  now,
	})

	assert.Equal(t, "abc123", info.Hash)
	assert.Equal(t, "fix things", info.Message)
	assert.Equal(t, "Dave", info.Author)
	assert.Equal(t, "dave@example.com", info.AuthorEmail)
	assert.Equal(t, now.Format(time.RFC3339), info.Date)
}
