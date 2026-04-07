// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/require"
)

func makeSwagger2Commit(t *testing.T) *model.Commit {
	t.Helper()

	spec := `swagger: "2.0"
info:
  title: test
  version: "1.0"
paths: {}`

	doc, err := libopenapi.NewDocument([]byte(spec))
	require.NoError(t, err)

	return &model.Commit{
		Hash:        "abc123",
		Message:     "swagger commit",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        []byte(spec),
		OldData:     []byte(spec),
		Document:    doc,
		OldDocument: doc,
		Changes:     &whatChangedModel.DocumentChanges{},
	}
}
