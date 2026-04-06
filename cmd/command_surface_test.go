// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCommandSurface_UsesCanonicalAndLegacyNames(t *testing.T) {
	assert.Equal(t, "summary", GetNewSummaryCommand().Use)
	assert.Equal(t, "report", GetNewReportCommand().Use)
	assert.Equal(t, "markdown-report", GetNewMarkdownReportCommand().Use)
	assert.Equal(t, "html-report", GetNewHTMLReportCommand().Use)
	assert.Equal(t, "console", GetNewConsoleCommand().Use)

	assert.Equal(t, "old-summary", GetSummaryCommand().Use)
	assert.Equal(t, "old-report", GetReportCommand().Use)
	assert.Equal(t, "old-markdown-report", GetMarkdownReportCommand().Use)
	assert.Equal(t, "old-html-report", GetHTMLReportCommand().Use)
	assert.Equal(t, "old-console", GetConsoleCommand().Use)
}
