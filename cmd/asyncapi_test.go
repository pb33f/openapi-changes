package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pb33f/testify/require"
)

func asyncPair(t *testing.T) (string, string) {
	t.Helper()
	old := `asyncapi: 3.0.0
info:
  title: Synthetic events
  version: 1.0.0
channels:
  orders:
    address: orders.v1
    messages:
      created:
        payload:
          type: string
  users:
    address: users.v1
`
	dir := t.TempDir()
	left, right := filepath.Join(dir, "left.yaml"), filepath.Join(dir, "right.yaml")
	require.NoError(t, os.WriteFile(left, []byte(old), 0600))
	require.NoError(t, os.WriteFile(right, []byte(strings.ReplaceAll(old, ".v1", ".v2")), 0600))
	return left, right
}

func TestAsyncAPIHistoryUsesRevisionSchemaAndSkipsMalformed(t *testing.T) {
	dir := t.TempDir()
	runGitInDir(t, dir, "init")
	runGitInDir(t, dir, "config", "user.name", "Fixture")
	runGitInDir(t, dir, "config", "user.email", "fixture@example.test")
	spec := "asyncapi: 3.0.0\ninfo: {title: Events, version: 1.0.0}\nchannels:\n  events:\n    address: events\n    messages:\n      event:\n        payload:\n          $ref: payload.yaml\n"
	for i, kind := range []string{"string", "integer", "boolean"} {
		require.NoError(t, os.WriteFile(filepath.Join(dir, "asyncapi.yaml"), []byte(spec+fmt.Sprintf("# revision %d\n", i)), 0600))
		require.NoError(t, os.WriteFile(filepath.Join(dir, "payload.yaml"), []byte("type: "+kind+"\n"), 0600))
		runGitInDir(t, dir, "add", ".")
		runGitInDir(t, dir, "commit", "-m", fmt.Sprint(i))
		if i == 0 {
			require.NoError(t, os.WriteFile(filepath.Join(dir, "asyncapi.yaml"), []byte("asyncapi: ["), 0600))
			runGitInDir(t, dir, "add", ".")
			runGitInDir(t, dir, "commit", "-m", "malformed")
		}
	}
	// A dirty sibling must not influence either historical side.
	require.NoError(t, os.WriteFile(filepath.Join(dir, "payload.yaml"), []byte("type: object\n"), 0600))
	flat, err := runGitHistoryReport(dir, "asyncapi.yaml", summaryOpts{limit: 0, limitTime: -1, globalRevisions: true}, nil)
	require.NoError(t, err)
	require.NotNil(t, flat)
	encoded, err := json.Marshal(flat)
	require.NoError(t, err)
	require.Contains(t, string(encoded), `"partial":true`)
	require.Contains(t, string(encoded), `"new":"boolean"`)
	require.Contains(t, string(encoded), `"original":"string"`)
	require.NotContains(t, string(encoded), `"new":"object"`)
}

func TestAsyncAPIRulesAreScoped(t *testing.T) {
	left, right := asyncPair(t)
	path := filepath.Join(t.TempDir(), "rules.yaml")
	require.NoError(t, os.WriteFile(path, []byte("asyncapiRules:\n  channel:\n    address:\n      modified: false\n"), 0600))
	rules, err := loadComparisonRules(path)
	require.NoError(t, err)
	custom, err := runLeftRightReport(left, right, summaryOpts{rules: rules}, nil)
	require.NoError(t, err)
	for _, change := range custom.Changes {
		require.False(t, change.Breaking)
	}
	defaults, err := runLeftRightReport(left, right, summaryOpts{}, nil)
	require.NoError(t, err)
	for _, change := range defaults.Changes {
		require.True(t, change.Breaking)
	}
}

func TestAsyncAPIInputBoundaries(t *testing.T) {
	left, _ := asyncPair(t)
	for _, spec := range []string{"openapi: 3.0.0\ninfo: {title: API, version: 1.0.0}\npaths: {}\n", "asyncapi: 2.6.0\ninfo: {title: API, version: 1.0.0}\n", "asyncapi: 3.0.0\nopenapi: 3.0.0\ninfo: {title: API, version: 1.0.0}\n"} {
		file := filepath.Join(t.TempDir(), "right.yaml")
		require.NoError(t, os.WriteFile(file, []byte(spec), 0600))
		_, err := runLeftRightReport(left, file, summaryOpts{}, nil)
		require.Error(t, err)
	}
}

func TestAsyncAPIAllReports(t *testing.T) {
	left, right := asyncPair(t)
	commits, err := loadLeftRightCommits(left, right, summaryOpts{})
	require.NoError(t, err)
	require.Len(t, commits, 1)
	require.True(t, commits[0].Comparable())
	flat, err := runLeftRightReport(left, right, summaryOpts{}, nil)
	require.NoError(t, err)
	require.Len(t, flat.Changes, 2)
	require.NotEqual(t, flat.Changes[0].Path, flat.Changes[1].Path)
	require.Nil(t, flat.Commit)
	require.Equal(t, "asyncapi", flat.Specification.Kind)
	require.Equal(t, "3.0.0", flat.Specification.OriginalVersion)
	markdown, err := generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	require.Contains(t, string(markdown), "**2** changes")
	output, err := generateHTMLReport(commits, nil, false, left, right)
	require.NoError(t, err)
	require.Contains(t, string(output), "orders")
	ctr, root, release, err := bridgeRunChangerator(commits[0], nil)
	require.NoError(t, err)
	require.NotNil(t, root)
	defer release()
	require.Len(t, ctr.DeduplicateChanges(), 2)
}

func TestAsyncAPIUnchangedHistoryWithMalformedRevision(t *testing.T) {
	spec := []byte("asyncapi: 3.0.0\ninfo: {title: Events, version: 1.0.0}\nchannels: {}\n")
	config := func() (*datamodel.DocumentConfiguration, error) { return datamodel.NewDocumentConfiguration(), nil }
	old := &model.HistorySource{Revision: "good-old", Data: spec, Config: config}
	bad := &model.HistorySource{Revision: "bad", Data: []byte("asyncapi: ["), Previous: old, Config: config}
	latest := &model.HistorySource{Revision: "good-new", Data: spec, Previous: bad, Config: config}
	commits := []*model.Commit{{Hash: "good-new", Data: spec, OldData: bad.Data, Source: latest}, {Hash: "bad", Data: bad.Data, OldData: spec, Source: bad}, {Hash: "good-old", Data: spec, Source: old}}
	for _, commit := range commits {
		commit.Window = new(model.HistoryWindow)
	}
	text, _, changed, err := renderSummary(commits, nil, false, true, false, summaryStyles{})
	require.NoError(t, err)
	require.False(t, changed)
	require.NotContains(t, text, "between good-new and bad")
	require.Equal(t, "good-old", commits[0].OriginalRevision)
	_, err = generateMarkdownReport(commits, nil, false)
	require.NoError(t, err)
	_, err = buildHTMLReportItems(commits, nil)
	require.NoError(t, err)
	history, err := changerateAndFlattenHistory(commits, nil)
	require.NoError(t, err)
	require.Equal(t, 1, history.SuccessfulComparisons)
	require.Equal(t, []string{"bad"}, history.SkippedCommits)
}
