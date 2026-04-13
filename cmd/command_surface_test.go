// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCommandSurface_UsesCanonicalNames(t *testing.T) {
	assert.Equal(t, "summary", GetSummaryCommand().Use)
	assert.Equal(t, "report", GetReportCommand().Use)
	assert.Equal(t, "markdown-report", GetMarkdownReportCommand().Use)
	assert.Equal(t, "html-report", GetHTMLReportCommand().Use)
	assert.Equal(t, "console", GetConsoleCommand().Use)
	assert.Equal(t, "version", GetVersionCommand().Use)
}
