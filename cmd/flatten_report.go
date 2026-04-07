// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"strconv"
	"strings"
	"time"

	drV3 "github.com/pb33f/doctor/model/high/v3"
	oaV3 "github.com/pb33f/libopenapi/datamodel/high/v3"
	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
)

func FlattenReport(report *model.Report) *model.FlatReport {
	return flattenReport(report, nil)
}

func FlattenReportWithDocuments(report *model.Report, docs ...*drV3.Document) *model.FlatReport {
	return flattenReport(report, changePathNormalizerForDocuments(docs...))
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
			flattenedChange.Path, rawPath = normalizer.NormalizeChange(flattenedChange)
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

type changePathNormalizer struct {
	parameterScopes map[string]*parameterScope
}

func changePathNormalizerForDocuments(docs ...*drV3.Document) *changePathNormalizer {
	scopes := make(map[string]*parameterScope)
	for docIndex, doc := range docs {
		collectDocumentParameterScopes(doc, scopes, docIndex == 0)
	}
	if len(scopes) == 0 {
		return nil
	}
	return &changePathNormalizer{
		parameterScopes: scopes,
	}
}

type parameterScope struct {
	byIndex        map[int]string
	originalRanges []parameterLineRange
	newRanges      []parameterLineRange
}

type parameterLineRange struct {
	name  string
	start int
	end   int
}

func collectDocumentParameterScopes(doc *drV3.Document, scopes map[string]*parameterScope, original bool) {
	if doc == nil || doc.Paths == nil || doc.Paths.PathItems == nil {
		return
	}

	for pathItem := doc.Paths.PathItems.Oldest(); pathItem != nil; pathItem = pathItem.Next() {
		basePath := "$.paths['" + escapeJSONPathSingleQuote(pathItem.Key) + "']"
		collectDoctorParameterScope(basePath+".parameters", pathItem.Value.Parameters, scopes, original)

		if pathItem.Value == nil || pathItem.Value.Value == nil {
			continue
		}
		for op := pathItem.Value.Value.GetOperations().Oldest(); op != nil; op = op.Next() {
			collectHighParameterScope(
				appendJSONPathProperty(basePath, op.Key)+".parameters",
				op.Value.Parameters,
				scopes,
				original,
			)
		}
	}
}

func collectDoctorParameterScope(prefix string, params []*drV3.Parameter, scopes map[string]*parameterScope, original bool) {
	highParams := make([]*oaV3.Parameter, len(params))
	for idx, param := range params {
		if param != nil {
			highParams[idx] = param.Value
		}
	}
	collectParameterScope(prefix, highParams, scopes, original)
}

func collectHighParameterScope(prefix string, params []*oaV3.Parameter, scopes map[string]*parameterScope, original bool) {
	collectParameterScope(prefix, params, scopes, original)
}

func collectParameterScope(prefix string, params []*oaV3.Parameter, scopes map[string]*parameterScope, original bool) {
	if prefix == "" || len(params) == 0 {
		return
	}

	scope := scopes[prefix]
	if scope == nil {
		scope = &parameterScope{byIndex: make(map[int]string)}
		scopes[prefix] = scope
	}

	for idx, param := range params {
		if param == nil || param.Name == "" {
			continue
		}
		if _, exists := scope.byIndex[idx]; !exists {
			scope.byIndex[idx] = param.Name
		}
	}

	ranges := buildParameterLineRanges(params)
	if len(ranges) == 0 {
		return
	}
	if original {
		scope.originalRanges = ranges
		return
	}
	scope.newRanges = ranges
}

func buildParameterLineRanges(params []*oaV3.Parameter) []parameterLineRange {
	ranges := make([]parameterLineRange, 0, len(params))
	for idx, param := range params {
		if param == nil || param.Name == "" {
			continue
		}
		start := parameterRootLine(param)
		if start == 0 {
			continue
		}
		end := 0
		for next := idx + 1; next < len(params); next++ {
			nextStart := parameterRootLine(params[next])
			if nextStart > 0 {
				end = nextStart - 1
				break
			}
		}
		ranges = append(ranges, parameterLineRange{name: param.Name, start: start, end: end})
	}
	return ranges
}

func parameterRootLine(param *oaV3.Parameter) int {
	if param == nil || param.GoLow() == nil || param.GoLow().GetRootNode() == nil {
		return 0
	}
	return param.GoLow().GetRootNode().Line
}

func appendJSONPathProperty(path, property string) string {
	if path == "" || property == "" {
		return path
	}
	if isSimpleJSONPathProperty(property) {
		return path + "." + property
	}
	return path + "['" + escapeJSONPathSingleQuote(property) + "']"
}

func isSimpleJSONPathProperty(property string) bool {
	for i, r := range property {
		switch {
		case r >= 'a' && r <= 'z':
		case r >= 'A' && r <= 'Z':
		case r == '_':
		case r >= '0' && r <= '9' && i > 0:
		default:
			return false
		}
	}
	return property != ""
}

func escapeJSONPathSingleQuote(value string) string {
	return strings.ReplaceAll(value, "'", "\\'")
}

func (n *changePathNormalizer) NormalizeChange(change *wcModel.Change) (string, string) {
	if n == nil || change == nil || change.Path == "" {
		return "", ""
	}

	prefix, idx, suffix, ok := splitParameterPath(change.Path)
	if !ok {
		return change.Path, change.Path
	}

	scope := n.parameterScopes[prefix]
	if scope == nil {
		return change.Path, change.Path
	}

	name := scope.resolveName(change, idx)
	if name == "" {
		return change.Path, change.Path
	}

	return prefix + "['" + escapeJSONPathSingleQuote(name) + "']" + suffix, scope.canonicalRawPath(prefix, name, suffix, idx)
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

func (s *parameterScope) resolveName(change *wcModel.Change, idx int) string {
	if s == nil {
		return ""
	}

	var originalName, newName string
	if change.Context != nil {
		originalName = findParameterNameForLine(s.originalRanges, change.Context.OriginalLine)
		newName = findParameterNameForLine(s.newRanges, change.Context.NewLine)
	}

	switch {
	case originalName != "" && newName != "" && originalName == newName:
		return originalName
	case newName != "" && (change.ChangeType == wcModel.Modified || change.ChangeType == wcModel.PropertyAdded || change.ChangeType == wcModel.ObjectAdded):
		return newName
	case originalName != "" && (change.ChangeType == wcModel.PropertyRemoved || change.ChangeType == wcModel.ObjectRemoved):
		return originalName
	case newName != "":
		return newName
	case originalName != "":
		return originalName
	case s.byIndex[idx] != "":
		return s.byIndex[idx]
	default:
		return ""
	}
}

func (s *parameterScope) canonicalRawPath(prefix, name, suffix string, fallbackIdx int) string {
	if s == nil {
		return prefix + "[" + strconv.Itoa(fallbackIdx) + "]" + suffix
	}
	for idx, candidate := range s.byIndex {
		if candidate == name {
			return prefix + "[" + strconv.Itoa(idx) + "]" + suffix
		}
	}
	return prefix + "[" + strconv.Itoa(fallbackIdx) + "]" + suffix
}

func findParameterNameForLine(ranges []parameterLineRange, line *int) string {
	if line == nil || *line == 0 {
		return ""
	}
	for _, r := range ranges {
		if *line < r.start {
			continue
		}
		if r.end == 0 || *line <= r.end {
			return r.name
		}
	}
	return ""
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
