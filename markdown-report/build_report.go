// Copyright 2025 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package markdown_report

import (
	"bytes"
	"fmt"
	"sort"
	"strings"
	"time"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/builder"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pmezard/go-difflib/difflib"
)

type MarkdownReportGenerator interface {
	GetMarkdownReport() *model.MarkdownReport
	GenerateReport() []byte
}

type markdownReport struct {
	disableTimestamp bool
	generated        time.Time
	model            *model.MarkdownReport
}

func NewMarkdownReport(
	disableTimestamp bool,
	generated time.Time,
	history []*model.Commit) MarkdownReportGenerator {

	var reportItems []*model.MarkdownReportItem

	for x := range history {
		historyItem := history[x]

		if historyItem.Changes != nil {
			_, stats := builder.BuildTree(historyItem.Changes)
			commit := &model.CommitStatistics{
				Date:        historyItem.CommitDate.Format("02 Jan 2006 15:04:05 MST"),
				Message:     historyItem.Message,
				Author:      historyItem.Author,
				AuthorEmail: historyItem.AuthorEmail,
				Hash:        historyItem.Hash,
			}

			stats.Commit = commit

			// Convert changes to markdown format
			var markdownChanges []*model.MarkdownChange
			allChanges := historyItem.Changes.GetAllChanges()
			for _, change := range allChanges {
				markdownChange := &model.MarkdownChange{
					Type:        getChangeTypeString(change.ChangeType),
					Property:    change.Property,
					Original:    change.Original,
					New:         change.New,
					Breaking:    change.Breaking,
					Description: generateChangeDescription(change),
				}
				markdownChanges = append(markdownChanges, markdownChange)
			}

			diff, _ := generateDiff(string(historyItem.OldData), string(historyItem.Data))

			reportItem := &model.MarkdownReportItem{
				CommitInfo:    commit,
				Statistics:    stats,
				Changes:       markdownChanges,
				BreakingCount: stats.TotalBreaking,
				TotalCount:    stats.Total,
				Summary:       generateSummary(stats),
				Diff:          diff,
			}
			reportItems = append(reportItems, reportItem)
		} else {
			// first item (no changes)
			commit := &model.CommitStatistics{
				Date:        historyItem.CommitDate.Format("02 Jan 2006 15:04:05 MST"),
				Message:     historyItem.Message,
				Author:      historyItem.Author,
				AuthorEmail: historyItem.AuthorEmail,
				Hash:        historyItem.Hash,
			}

			stats := &model.ChangeStatistics{}
			stats.Commit = commit
			diff, _ := generateDiff(string(historyItem.OldData), string(historyItem.Data))

			reportItem := &model.MarkdownReportItem{
				CommitInfo:    commit,
				Statistics:    stats,
				BreakingCount: 0,
				TotalCount:    0,
				Summary:       "No changes detected",
				Diff:          diff,
			}
			reportItems = append(reportItems, reportItem)
		}
	}

	// Calculate general statistics
	var totalStats model.ChangeStatistics
	for _, item := range reportItems {
		if item.Statistics != nil {
			totalStats.Total += item.Statistics.Total
			totalStats.TotalBreaking += item.Statistics.TotalBreaking
			totalStats.Added += item.Statistics.Added
			totalStats.Modified += item.Statistics.Modified
			totalStats.Removed += item.Statistics.Removed
			totalStats.BreakingAdded += item.Statistics.BreakingAdded
			totalStats.BreakingModified += item.Statistics.BreakingModified
			totalStats.BreakingRemoved += item.Statistics.BreakingRemoved
		}
	}

	report := &model.MarkdownReport{
		Title:         "OpenAPI Changes Report",
		DateGenerated: time.Now().Format("Mon, 2 Jan 2006 15:04:05 EST"),
		ReportItems:   reportItems,
		Summary:       &totalStats,
	}

	return &markdownReport{
		disableTimestamp: disableTimestamp,
		generated:        generated,
		model:            report,
	}
}

func (md *markdownReport) GetMarkdownReport() *model.MarkdownReport {
	return md.model
}

func (md *markdownReport) GenerateReport() []byte {
	var buffer bytes.Buffer

	// Report header
	buffer.WriteString(fmt.Sprintf("# %s\n\n", md.model.Title))
	if !md.disableTimestamp {
		buffer.WriteString(fmt.Sprintf("**Generated at:** %s\n\n", md.model.DateGenerated))
	}

	// General summary
	if md.model.Summary != nil {
		buffer.WriteString("## General Summary\n\n")
		buffer.WriteString(fmt.Sprintf("- **Total changes:** %d\n", md.model.Summary.Total))
		buffer.WriteString(fmt.Sprintf("- **Breaking changes:** %d\n", md.model.Summary.TotalBreaking))
		buffer.WriteString(fmt.Sprintf("- **Additions:** %d\n", md.model.Summary.Added))
		buffer.WriteString(fmt.Sprintf("- **Modifications:** %d\n", md.model.Summary.Modified))
		buffer.WriteString(fmt.Sprintf("- **Removals:** %d\n\n", md.model.Summary.Removed))
	}

	// Details by commit
	buffer.WriteString("## Details by Commit\n\n")

	for i, item := range md.model.ReportItems {
		buffer.WriteString(fmt.Sprintf("### Commit %d: %s\n\n", i+1, item.CommitInfo.Message))

		// Commit information
		buffer.WriteString("**Commit Information:**\n")
		buffer.WriteString(fmt.Sprintf("- **Hash:** `%s`\n", item.CommitInfo.Hash))
		buffer.WriteString(fmt.Sprintf("- **Author:** %s (%s)\n", item.CommitInfo.Author, item.CommitInfo.AuthorEmail))
		buffer.WriteString(fmt.Sprintf("- **Date:** %s\n\n", item.CommitInfo.Date))

		// Statistics
		if item.Statistics != nil {
			buffer.WriteString("**Statistics:**\n")
			buffer.WriteString(fmt.Sprintf("- **Total:** %d\n", item.Statistics.Total))
			buffer.WriteString(fmt.Sprintf("- **Breaking:** %d\n", item.Statistics.TotalBreaking))
			buffer.WriteString(fmt.Sprintf("- **Additions:** %d\n", item.Statistics.Added))
			buffer.WriteString(fmt.Sprintf("- **Modifications:** %d\n", item.Statistics.Modified))
			buffer.WriteString(fmt.Sprintf("- **Removals:** %d\n\n", item.Statistics.Removed))
		}

		if item.Diff != "" {
			buffer.WriteString("**Visual Diff:**\n\n")
			buffer.WriteString("<details>\n")
			buffer.WriteString("<summary>Click to expand diff</summary>\n\n")
			buffer.WriteString("```diff\n")
			//buffer.WriteString(item.Diff)
			buffer.WriteString(strings.ReplaceAll(item.Diff, "```", "` ` `"))
			buffer.WriteString("\n```\n")
			buffer.WriteString("</details>\n\n")
		}

		// List of changes
		if len(item.Changes) > 0 {
			buffer.WriteString("**Detailed Changes:**\n\n")

			// Group by type and property to consolidate similar changes
			changesByTypeAndProperty := make(map[string]map[string][]*model.MarkdownChange)
			for _, change := range item.Changes {
				if changesByTypeAndProperty[change.Type] == nil {
					changesByTypeAndProperty[change.Type] = make(map[string][]*model.MarkdownChange)
				}
				changesByTypeAndProperty[change.Type][change.Property] = append(changesByTypeAndProperty[change.Type][change.Property], change)
			}

			// Define order for change types to ensure consistent ordering
			changeTypeOrder := []string{"Property Added", "Object Added", "Modified", "Object Removed", "Property Removed"}

			for _, changeType := range changeTypeOrder {
				if changesByProperty, exists := changesByTypeAndProperty[changeType]; exists {
					buffer.WriteString(fmt.Sprintf("#### %s\n\n", changeType))

					// Sort properties for consistent ordering
					var properties []string
					for property := range changesByProperty {
						properties = append(properties, property)
					}
					sort.Strings(properties)

					for _, property := range properties {
						changes := changesByProperty[property]

						// Group by description to consolidate similar changes
						changesByDescription := make(map[string][]*model.MarkdownChange)
						for _, change := range changes {
							changesByDescription[change.Description] = append(changesByDescription[change.Description], change)
						}

						for description, descChanges := range changesByDescription {
							if len(descChanges) == 1 {
								// Single change - show as before
								change := descChanges[0]
								buffer.WriteString(fmt.Sprintf("- **%s** %s\n", change.Property, change.Description))

								if change.Original != "" && change.New != "" {
									buffer.WriteString(fmt.Sprintf("  - **Before:** `%s`\n", change.Original))
									buffer.WriteString(fmt.Sprintf("  - **After:** `%s`\n", change.New))
								} else if change.Original != "" {
									buffer.WriteString(fmt.Sprintf("  - **Removed value:** `%s`\n", change.Original))
								} else if change.New != "" {
									buffer.WriteString(fmt.Sprintf("  - **Added value:** `%s`\n", change.New))
								}
								buffer.WriteString("\n")
							} else {
								// Multiple changes - group them
								buffer.WriteString(fmt.Sprintf("- **%s** %s (%d items)\n", property, description, len(descChanges)))

								// Collect all values
								var addedValues, removedValues, modifiedValues []string
								for _, change := range descChanges {
									if change.Original != "" && change.New != "" {
										modifiedValues = append(modifiedValues, fmt.Sprintf("`%s` → `%s`", change.Original, change.New))
									} else if change.Original != "" {
										removedValues = append(removedValues, fmt.Sprintf("`%s`", change.Original))
									} else if change.New != "" {
										addedValues = append(addedValues, fmt.Sprintf("`%s`", change.New))
									}
								}

								// Display grouped values with better formatting
								if len(addedValues) > 0 {
									buffer.WriteString("  - **Added values:**\n")
									for _, value := range addedValues {
										buffer.WriteString(fmt.Sprintf("    - %s\n", value))
									}
								}
								if len(removedValues) > 0 {
									buffer.WriteString("  - **Removed values:**\n")
									for _, value := range removedValues {
										buffer.WriteString(fmt.Sprintf("    - %s\n", value))
									}
								}
								if len(modifiedValues) > 0 {
									buffer.WriteString("  - **Modified values:**\n")
									for _, value := range modifiedValues {
										buffer.WriteString(fmt.Sprintf("    - %s\n", value))
									}
								}
								buffer.WriteString("\n")
							}
						}
					}
				}
			}
		} else {
			buffer.WriteString("**No changes detected in this commit.**\n\n")
		}

		buffer.WriteString("---\n\n")
	}

	return buffer.Bytes()
}

func generateDiff(original, modified string) (string, error) {
	diff := difflib.UnifiedDiff{
		A:        difflib.SplitLines(original),
		B:        difflib.SplitLines(modified),
		FromFile: "Original",
		ToFile:   "Modified",
		Context:  3,
	}
	text, err := difflib.GetUnifiedDiffString(diff)
	if err != nil {
		return "", err
	}
	return text, nil
}

// Helper functions
func getChangeTypeString(changeType int) string {
	switch changeType {
	case 1:
		return "Modified"
	case 2:
		return "Property Added"
	case 3:
		return "Object Added"
	case 4:
		return "Object Removed"
	case 5:
		return "Property Removed"
	default:
		return "Unknown"
	}
}

func generateChangeDescription(change *wcModel.Change) string {
	switch change.ChangeType {
	case 1: // Modified
		return "was modified"
	case 2: // Property Added
		return "was added"
	case 3: // Object Added
		return "was added"
	case 4: // Object Removed
		return "was removed"
	case 5: // Property Removed
		return "was removed"
	default:
		return "was changed"
	}
}

func generateSummary(stats *model.ChangeStatistics) string {
	if stats.Total == 0 {
		return "No changes detected"
	}

	if stats.TotalBreaking > 0 {
		return fmt.Sprintf("%d total changes (%d breaking)", stats.Total, stats.TotalBreaking)
	}

	return fmt.Sprintf("%d total changes", stats.Total)
}
