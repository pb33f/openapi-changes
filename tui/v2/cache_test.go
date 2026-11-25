// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package v2

import (
	"testing"

	wc "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/pb33f/testify/assert"
)

func TestCommitCache_PutGet(t *testing.T) {
	c := newCommitCache(3)
	released := false
	entry := &cacheEntry{
		result: &changeratorResultV2{
			releaseFn: func() { released = true },
		},
		newLines: []string{"line1", "line2"},
		oldLines: []string{"old1"},
	}

	c.put("abc", entry)
	got := c.get("abc")
	assert.NotNil(t, got)
	assert.Equal(t, []string{"line1", "line2"}, got.newLines)
	assert.False(t, released)
}

func TestCommitCache_Miss(t *testing.T) {
	c := newCommitCache(3)
	assert.Nil(t, c.get("notexist"))
}

func TestCommitCache_LRUEviction(t *testing.T) {
	releaseCalls := make(map[string]int)

	c := newCommitCache(2)
	for _, hash := range []string{"a", "b", "c"} {
		h := hash
		c.put(h, &cacheEntry{
			result: &changeratorResultV2{
				releaseFn: func() { releaseCalls[h]++ },
			},
		})
	}

	// "a" should have been evicted
	assert.Nil(t, c.get("a"))
	assert.Equal(t, 1, releaseCalls["a"])
	// "b" and "c" should still be present
	assert.NotNil(t, c.get("b"))
	assert.NotNil(t, c.get("c"))
}

func TestCommitCache_TouchPreventsEviction(t *testing.T) {
	releaseCalls := make(map[string]int)

	c := newCommitCache(2)
	for _, hash := range []string{"a", "b"} {
		h := hash
		c.put(h, &cacheEntry{
			result: &changeratorResultV2{
				releaseFn: func() { releaseCalls[h]++ },
			},
		})
	}

	// Touch "a" to make it most recently used
	c.get("a")

	// Adding "c" should evict "b" (least recently used), not "a"
	c.put("c", &cacheEntry{
		result: &changeratorResultV2{releaseFn: func() { releaseCalls["c"]++ }},
	})
	assert.NotNil(t, c.get("a"))
	assert.Nil(t, c.get("b"))
	assert.Equal(t, 1, releaseCalls["b"])
}

func TestCommitCache_ReleaseAll(t *testing.T) {
	releaseCalls := 0
	c := newCommitCache(3)
	for _, hash := range []string{"a", "b"} {
		c.put(hash, &cacheEntry{
			result: &changeratorResultV2{
				releaseFn: func() { releaseCalls++ },
			},
		})
	}

	c.releaseAll()
	assert.Equal(t, 2, releaseCalls)
	assert.Nil(t, c.get("a"))
	assert.Nil(t, c.get("b"))
}

func TestCommitCache_GetLines(t *testing.T) {
	c := newCommitCache(3)
	c.put("x", &cacheEntry{
		newLines: []string{"new1", "new2"},
		oldLines: []string{"old1"},
	})

	newL, oldL := c.changeLines("x", nil)
	assert.Equal(t, []string{"new1", "new2"}, newL)
	assert.Equal(t, []string{"old1"}, oldL)
}

func TestCommitCache_GetLinesMiss(t *testing.T) {
	c := newCommitCache(3)
	newL, oldL := c.changeLines("missing", nil)
	assert.Nil(t, newL)
	assert.Nil(t, oldL)
}

func TestClampRange(t *testing.T) {
	tests := []struct {
		name            string
		ln, b, a, total int
		wantS, wantE    int
	}{
		{"middle", 10, 5, 5, 20, 5, 16},
		{"near start", 2, 5, 5, 20, 0, 8},
		{"near end", 18, 5, 5, 20, 13, 20},
		{"zero total", 0, 5, 5, 0, 0, 0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s, e := clampRange(tt.ln, tt.b, tt.a, tt.total)
			assert.Equal(t, tt.wantS, s)
			assert.Equal(t, tt.wantE, e)
		})
	}
}

func TestSplitLines(t *testing.T) {
	assert.Nil(t, splitLines(nil))
	assert.Nil(t, splitLines([]byte{}))
	assert.Equal(t, []string{"a", "b"}, splitLines([]byte("a\nb")))
}

func TestCommitCacheOpensDefiningSchemaOnEachSide(t *testing.T) {
	cache := newCommitCache(1)
	entry := &cacheEntry{
		newLines: []string{"modified root"}, oldLines: []string{"original root"},
		originalSources: &model.SchemaSources{Root: "before.yaml", Files: map[string][]byte{"old.yaml": []byte("original line\nold value")}},
		modifiedSources: &model.SchemaSources{Root: "after.yaml", Files: map[string][]byte{"new.yaml": []byte("modified line\nnew value")}},
	}
	cache.put("commit", entry)
	ch := &wc.Change{SchemaResource: "urn:money", ChangeType: wc.Modified, Context: &wc.ChangeContext{DocumentLocation: "new.yaml", OriginalDocument: "old.yaml", ModifiedDocument: "new.yaml", OriginalLine: new(2), NewLine: new(2)}}
	newer, old := cache.changeLines("commit", ch)
	source := resolveChangeSource(ch, newer, old)
	assert.Equal(t, "new value", source.Lines[source.Line-1])
	ch.ChangeType = wc.PropertyRemoved
	source = resolveChangeSource(ch, newer, old)
	assert.Equal(t, "old value", source.Lines[source.Line-1])
	ch.Context.OriginalDocument = "before.yaml"
	_, old = cache.changeLines("commit", ch)
	assert.Equal(t, []string{"original root"}, old)
	ch.Context.ModifiedDocument = "missing.yaml"
	newer, _ = cache.changeLines("commit", ch)
	assert.Empty(t, newer)
}
