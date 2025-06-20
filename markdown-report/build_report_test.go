// Copyright 2025 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package markdown_report

import (
	"strings"
	"testing"
	"time"

	"github.com/pb33f/openapi-changes/model"
)

func TestNewMarkdownReport(t *testing.T) {
	// Create test data
	history := []*model.Commit{
		{
			Hash:        "abc123",
			Message:     "Test commit",
			Author:      "Test Author",
			AuthorEmail: "test@example.com",
			CommitDate:  time.Now(),
		},
	}

	// Create generator
	generator := NewMarkdownReport(false, time.Now(), history)

	// Check if generator was created
	if generator == nil {
		t.Fatal("Generator should not be nil")
	}

	// Get report
	report := generator.GetMarkdownReport()
	if report == nil {
		t.Fatal("Report should not be nil")
	}

	// Check if title is correct
	if report.Title != "OpenAPI Changes Report" {
		t.Errorf("Expected title 'OpenAPI Changes Report', got '%s'", report.Title)
	}

	// Check if there are items in the report
	if len(report.ReportItems) != 1 {
		t.Errorf("Expected 1 item in report, got %d", len(report.ReportItems))
	}
}

func TestGenerateReport(t *testing.T) {
	// Create test data
	history := []*model.Commit{
		{
			Hash:        "abc123",
			Message:     "Test commit",
			Author:      "Test Author",
			AuthorEmail: "test@example.com",
			CommitDate:  time.Now(),
		},
	}

	// Create generator
	generator := NewMarkdownReport(false, time.Now(), history)

	// Generate report
	reportBytes := generator.GenerateReport()

	// Check if report was generated
	if len(reportBytes) == 0 {
		t.Fatal("Report should not be empty")
	}

	// Convert to string
	reportString := string(reportBytes)

	// Check if it contains expected elements
	expectedElements := []string{
		"# OpenAPI Changes Report",
		"## 📊 General Summary",
		"## 📝 Details by Commit",
		"### Commit 1:",
		"Test commit",
		"Test Author",
		"test@example.com",
		"abc123",
	}

	for _, element := range expectedElements {
		if !strings.Contains(reportString, element) {
			t.Errorf("Report should contain '%s'", element)
		}
	}
}

func TestGenerateReportWithMultipleCommits(t *testing.T) {
	// Create test data with multiple commits
	history := []*model.Commit{
		{
			Hash:        "abc123",
			Message:     "First commit",
			Author:      "Author 1",
			AuthorEmail: "author1@example.com",
			CommitDate:  time.Now(),
		},
		{
			Hash:        "def456",
			Message:     "Second commit",
			Author:      "Author 2",
			AuthorEmail: "author2@example.com",
			CommitDate:  time.Now().Add(-24 * time.Hour),
		},
	}

	// Create generator
	generator := NewMarkdownReport(false, time.Now(), history)

	// Generate report
	reportBytes := generator.GenerateReport()
	reportString := string(reportBytes)

	// Check if it contains both commits
	if !strings.Contains(reportString, "First commit") {
		t.Error("Report should contain the first commit")
	}

	if !strings.Contains(reportString, "Second commit") {
		t.Error("Report should contain the second commit")
	}

	if !strings.Contains(reportString, "Author 1") {
		t.Error("Report should contain the first author")
	}

	if !strings.Contains(reportString, "Author 2") {
		t.Error("Report should contain the second author")
	}
}

func TestGetChangeTypeString(t *testing.T) {
	tests := []struct {
		changeType int
		expected   string
	}{
		{1, "Modified"},
		{2, "Property Added"},
		{3, "Object Added"},
		{4, "Object Removed"},
		{5, "Property Removed"},
		{99, "Unknown"},
	}

	for _, test := range tests {
		result := getChangeTypeString(test.changeType)
		if result != test.expected {
			t.Errorf("For changeType %d, expected '%s', got '%s'", test.changeType, test.expected, result)
		}
	}
}

func TestGenerateSummary(t *testing.T) {
	tests := []struct {
		stats    *model.ChangeStatistics
		expected string
	}{
		{
			&model.ChangeStatistics{Total: 0},
			"No changes detected",
		},
		{
			&model.ChangeStatistics{Total: 5, TotalBreaking: 0},
			"5 total changes",
		},
		{
			&model.ChangeStatistics{Total: 10, TotalBreaking: 3},
			"10 total changes (3 breaking)",
		},
	}

	for _, test := range tests {
		result := generateSummary(test.stats)
		if result != test.expected {
			t.Errorf("For stats %+v, expected '%s', got '%s'", test.stats, test.expected, result)
		}
	}
}
