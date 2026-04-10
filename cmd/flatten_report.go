// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"strconv"
	"strings"
	"time"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

func FlattenReport(report *model.Report) *model.FlatReport {
	return flattenReport(report, nil)
}

// FlattenReportWithParameterNames flattens a report and normalizes parameter paths
// using the name map from the changerator (keyed by full parameter JSONPath,
// e.g., "$.paths['/pets'].get.parameters[0]" → "petId").
func FlattenReportWithParameterNames(report *model.Report, parameterNames map[string]string) *model.FlatReport {
	return flattenReport(report, parameterNames)
}

func flattenReport(report *model.Report, parameterNames map[string]string) *model.FlatReport {
	flatReport := &model.FlatReport{}
	flatReport.Summary = report.Summary
	flatReport.DateGenerated = time.Now().Format(time.RFC3339)
	var changes []*model.HashedChange
	rpt := report.Commit.Changes
	for _, change := range rpt.GetAllChanges() {
		rawPath := change.Path
		flattenedChange := cloneChange(change)
		if len(parameterNames) > 0 {
			flattenedChange.Path, rawPath = normalizeParameterPath(flattenedChange, parameterNames)
		}
		hashedChange := model.HashedChange{
			Change:  flattenedChange,
			RawPath: rawPathIfChanged(rawPath, flattenedChange.Path),
		}

		hashedChange.HashChange()

		changes = append(changes, &hashedChange)
	}
	flatReport.Changes = changes

	// Copy the Commit information from the report to the flatReport and then delete the changes
	flatReport.Commit = &model.Commit{}
	*flatReport.Commit = *report.Commit
	flatReport.Commit.Changes = nil

	return flatReport
}

// normalizeParameterPath replaces numeric parameter indices in a change's path
// with semantic names using the changerator's pre-resolved ParameterNames map.
// Returns (normalizedPath, rawPath).
func normalizeParameterPath(change *wcModel.Change, parameterNames map[string]string) (string, string) {
	if change == nil || change.Path == "" {
		return "", ""
	}

	prefix, idx, suffix, ok := splitParameterPath(change.Path)
	if !ok {
		return change.Path, change.Path
	}

	// Build the full parameter JSONPath that the changerator would have stored
	paramPath := prefix + "[" + strconv.Itoa(idx) + "]"
	name := parameterNames[paramPath]
	if name == "" {
		return change.Path, change.Path
	}

	normalizedPath := prefix + "['" + escapeJSONPathSingleQuote(name) + "']" + suffix
	return normalizedPath, change.Path
}

func splitParameterPath(path string) (string, int, string, bool) {
	if path == "" {
		return "", 0, "", false
	}
	idx := strings.LastIndex(path, "parameters[")
	if idx < 0 {
		return "", 0, "", false
	}
	indexEnd := strings.Index(path[idx:], "]")
	if indexEnd < 0 {
		return "", 0, "", false
	}
	indexEnd += idx
	index, err := strconv.Atoi(path[idx+len("parameters[") : indexEnd])
	if err != nil {
		return "", 0, "", false
	}
	return path[:idx] + "parameters", index, path[indexEnd+1:], true
}

func escapeJSONPathSingleQuote(value string) string {
	return strings.ReplaceAll(value, "'", "\\'")
}

func cloneChange(change *wcModel.Change) *wcModel.Change {
	if change == nil {
		return nil
	}
	cloned := *change
	if change.Context != nil {
		ctx := *change.Context
		cloned.Context = &ctx
	}
	return &cloned
}

func rawPathIfChanged(rawPath, semanticPath string) string {
	if rawPath == "" || rawPath == semanticPath {
		return ""
	}
	return rawPath
}
