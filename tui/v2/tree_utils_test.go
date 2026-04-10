// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package v2

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestVisualLen_PlainASCII(t *testing.T) {
	assert.Equal(t, 5, visualLen("hello"))
}

func TestVisualLen_Empty(t *testing.T) {
	assert.Equal(t, 0, visualLen(""))
}

func TestVisualLen_WithANSI(t *testing.T) {
	// \033[31m = red, \033[0m = reset
	s := "\033[31mhello\033[0m"
	assert.Equal(t, 5, visualLen(s))
}

func TestVisualLen_MultipleEscapes(t *testing.T) {
	s := "\033[1m\033[31mhi\033[0m"
	assert.Equal(t, 2, visualLen(s))
}

func TestVisualLen_MultiByte(t *testing.T) {
	assert.Equal(t, 6, visualLen("日本語"))
}

func TestVisualLen_MixedASCIIAndMultiByte(t *testing.T) {
	assert.Equal(t, 10, visualLen("abc日本語d"))
}

func TestTruncateToWidth_NoTruncation(t *testing.T) {
	assert.Equal(t, "hello", truncateToWidth("hello", 10))
}

func TestTruncateToWidth_ExactWidth(t *testing.T) {
	assert.Equal(t, "hello", truncateToWidth("hello", 5))
}

func TestTruncateToWidth_Truncated(t *testing.T) {
	assert.Equal(t, "hel", truncateToWidth("hello", 3))
}

func TestTruncateToWidth_Empty(t *testing.T) {
	assert.Equal(t, "", truncateToWidth("", 5))
}

func TestTruncateToWidth_WithANSI(t *testing.T) {
	s := "\033[31mhello world\033[0m"
	result := truncateToWidth(s, 5)
	// Should contain 5 visible chars + ANSI reset
	assert.Equal(t, 5, visualLen(result))
	assert.Contains(t, result, "\033[0m")
}

func TestTruncateToWidth_MultiByteUTF8(t *testing.T) {
	s := "日本語テスト"
	result := truncateToWidth(s, 3)
	assert.Equal(t, "日本", result)
	// Verify no truncated/invalid bytes
	assert.Equal(t, 4, visualLen(result))
}

func TestTruncateToWidth_MixedASCIIMultiByte(t *testing.T) {
	s := "ab日本cd"
	result := truncateToWidth(s, 4)
	assert.Equal(t, "ab日", result)
}

func TestTruncateToWidth_MultiByteWithANSI(t *testing.T) {
	s := "\033[32m日本語\033[0m"
	result := truncateToWidth(s, 2)
	assert.Equal(t, 2, visualLen(result))
	assert.Contains(t, result, "\033[0m")
}

func TestTruncateToWidth_ZeroWidth(t *testing.T) {
	// Width 0 triggers truncation on the first visible character
	result := truncateToWidth("hello", 0)
	assert.Equal(t, "h", result)
}
