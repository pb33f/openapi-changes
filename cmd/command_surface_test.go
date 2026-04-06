// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCommandSurface_UsesCanonicalNames(t *testing.T) {
	assert.Equal(t, "summary", GetNewSummaryCommand().Use)
	assert.Equal(t, "report", GetNewReportCommand().Use)
	assert.Equal(t, "markdown-report", GetNewMarkdownReportCommand().Use)
	assert.Equal(t, "html-report", GetNewHTMLReportCommand().Use)
	assert.Equal(t, "console", GetNewConsoleCommand().Use)
}
