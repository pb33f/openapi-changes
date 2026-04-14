// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import "github.com/pb33f/openapi-changes/model"

// HistoryOptions controls how git history is fetched, traversed, and compared.
// BreakingConfig is intentionally kept as a separate parameter in function
// signatures — it controls comparison semantics, not history traversal.
type HistoryOptions struct {
	Base            string
	Remote          bool
	ExtRefs         bool
	KeepComparable  bool // true = preserve Documents on commits even when legacy diff is empty
	Limit           int
	LimitTime       int
	ForceCutoff     bool // GitHub only
	GlobalRevisions bool // ExtractHistoryFromFile only
	BaseCommit      string
}

// HistoryBuildResult contains the comparable commit history produced by the
// git/GitHub normalization layer plus any skipped revisions.
type HistoryBuildResult struct {
	Commits        []*model.Commit
	SkippedCommits []string
}
