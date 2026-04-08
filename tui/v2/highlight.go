// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"
)

// highlightLine applies syntax highlighting to a single line.
// YAML keys (text before the first colon) are styled with yamlKey.
// Must only be called from View() with pre-computed styles.
func highlightLine(line string, styles consoleStyles) string {
	trimmed := strings.TrimLeft(line, " ")
	if trimmed == "" || strings.HasPrefix(trimmed, "#") {
		return styles.grey.Render(line)
	}

	// Find the first colon that's not inside a quoted string
	colonIdx := findYAMLColon(trimmed)
	if colonIdx < 0 {
		return styles.detail.Render(line)
	}

	indent := line[:len(line)-len(trimmed)]
	key := trimmed[:colonIdx+1]
	rest := trimmed[colonIdx+1:]
	return styles.detail.Render(indent) + styles.yamlKey.Render(key) + styles.detail.Render(rest)
}

// findYAMLColon finds the index of the first colon that looks like a YAML key separator.
// Returns -1 if not found. Skips colons inside quoted strings.
func findYAMLColon(s string) int {
	inSingle := false
	inDouble := false
	for i, ch := range s {
		switch ch {
		case '\'':
			if !inDouble {
				inSingle = !inSingle
			}
		case '"':
			if !inSingle {
				inDouble = !inDouble
			}
		case ':':
			if !inSingle && !inDouble {
				return i
			}
		}
	}
	return -1
}
