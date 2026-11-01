// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"strings"
	"testing"

	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestMergeAPILabel(t *testing.T) {
	assert.Equal(t, "OpenAPI", mergeAPILabel("", "OpenAPI"))
	assert.Equal(t, "AsyncAPI", mergeAPILabel("AsyncAPI", "AsyncAPI"))
	assert.Equal(t, "API", mergeAPILabel("OpenAPI", "AsyncAPI"))
	assert.Equal(t, "API", mergeAPILabel("API", "OpenAPI"))
}

func TestMarkdownReportTitleForMixedFormats(t *testing.T) {
	openapi, err := loadLeftRightCommits("../sample-specs/petstorev3-original.json", "../sample-specs/petstorev3.json", summaryOpts{noColor: true})
	require.NoError(t, err)
	asyncapi, err := loadLeftRightCommits("../sample-specs/asyncapi-original.yaml", "../sample-specs/asyncapi.yaml", summaryOpts{noColor: true})
	require.NoError(t, err)

	report, err := generateMarkdownReport(append(openapi, asyncapi...), nil, false)
	require.NoError(t, err)
	assert.True(t, strings.HasPrefix(string(report), "# API Changes Report\n"), "got: %.40s", report)
}
