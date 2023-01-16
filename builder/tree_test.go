// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
    "github.com/pb33f/openapi-changes/git"
    "github.com/stretchr/testify/assert"
    "os"
    "path/filepath"
    "testing"
)

func TestBuildTree(t *testing.T) {

    cwd, _ := os.Getwd()
    dir, _ := filepath.Split(cwd)

    history := git.ExtractHistoryUsingLib(dir, "sample-specs/petstorev3.json")
    assert.NotNil(t, history)
    assert.Equal(t, "And now it's generally wrecked. But what a fun journey.\n", history[0].Message)

    // build out the commit change log and ensure everything is in the right place.
    errors := git.PopulateHistoryWithChanges(history, nil)
    assert.Len(t, errors, 0)
    for x := range history {
        if x != len(history)-1 { // last item is first commit, it can't be diffed.
            assert.NotNil(t, history[x].Changes)
            assert.NotNil(t, history[x].OldData)
        }
    }
}
