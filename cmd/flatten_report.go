// Copyright 2023-2024 Princess Beef Heavy Industries, LLC / Dave Shanley
// https://pb33f.io

package cmd

import (
	"sort"
	"strings"
	"time"

	v3 "github.com/pb33f/doctor/model/high/v3"
	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

func FlattenReport(report *model.Report) *model.FlatReport {
	return flattenReport(report, nil)
}

func FlattenReportWithRoots(report *model.Report, roots ...*v3.Node) *model.FlatReport {
	return flattenReport(report, newChangePathNormalizer(roots...))
}

func flattenReport(report *model.Report, normalizer *changePathNormalizer) *model.FlatReport {

	flatReport := &model.FlatReport{}
	flatReport.Summary = report.Summary
	flatReport.DateGenerated = time.Now().Format(time.RFC3339)
	var changes []*model.HashedChange
	rpt := report.Commit.Changes
	for _, change := range rpt.GetAllChanges() {
		rawPath := change.Path
		flattenedChange := cloneChange(change)
		if normalizer != nil {
			flattenedChange.Path = normalizer.Normalize(flattenedChange.Path)
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

func FlattenHistoricalReport(report *model.HistoricalReport) *model.FlatHistoricalReport {

	flatReport := &model.FlatHistoricalReport{}
	flatReport.GitRepoPath = report.GitRepoPath
	flatReport.GitFilePath = report.GitFilePath
	flatReport.DateGenerated = report.DateGenerated
	flatReport.Filename = report.Filename
	flatReport.Reports = make([]*model.FlatReport, 0)
	for _, r := range report.Reports {
		flatReport.Reports = append(flatReport.Reports, FlattenReport(r))
	}
	return flatReport
}

type changePathNormalizer struct {
	prefixes     []string
	replacements map[string]string
}

func newChangePathNormalizer(roots ...*v3.Node) *changePathNormalizer {
	replacements := make(map[string]string)
	for _, root := range roots {
		collectParameterPathRewrites(root, replacements)
	}
	if len(replacements) == 0 {
		return nil
	}

	prefixes := make([]string, 0, len(replacements))
	for prefix := range replacements {
		prefixes = append(prefixes, prefix)
	}
	sort.Slice(prefixes, func(i, j int) bool {
		return len(prefixes[i]) > len(prefixes[j])
	})

	return &changePathNormalizer{
		prefixes:     prefixes,
		replacements: replacements,
	}
}

func collectParameterPathRewrites(node *v3.Node, replacements map[string]string) {
	if node == nil {
		return
	}
	if node.Type == "parameter" && node.Label != "" {
		if semantic := semanticParameterPath(node.Id, node.Label); semantic != "" && semantic != node.Id {
			replacements[node.Id] = semantic
		}
	}
	for _, child := range node.Children {
		collectParameterPathRewrites(child, replacements)
	}
}

func semanticParameterPath(rawPath, label string) string {
	if rawPath == "" || label == "" {
		return rawPath
	}
	idx := strings.LastIndex(rawPath, "parameters[")
	if idx < 0 {
		return rawPath
	}
	closeIdx := strings.Index(rawPath[idx:], "]")
	if closeIdx < 0 {
		return rawPath
	}
	closeIdx += idx
	escapedLabel := strings.ReplaceAll(label, "'", "\\'")
	return rawPath[:idx] + "parameters['" + escapedLabel + "']" + rawPath[closeIdx+1:]
}

func (n *changePathNormalizer) Normalize(path string) string {
	if n == nil || path == "" {
		return path
	}
	for _, prefix := range n.prefixes {
		if path == prefix || strings.HasPrefix(path, prefix+".") || strings.HasPrefix(path, prefix+"[") {
			return n.replacements[prefix] + path[len(prefix):]
		}
	}
	return path
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
