// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"strings"

	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
)

// commitCache is an LRU cache for changerator results, keyed by commit hash.
// Default max size is 3. On eviction, Release() is called on the result.
type commitCache struct {
	entries map[string]*cacheEntry
	order   []string // LRU order, most recent at end
	maxSize int
}

type cacheEntry struct {
	result   *changeratorResultV2
	treeRoot *v3.Node
	stats    *changerator.ChangeStatistics
	newLines []string // pre-split commit.Data
	oldLines []string // pre-split commit.OldData
}

// changeratorResultV2 wraps the cmd.changeratorResult to avoid import cycles.
// It holds the same data but with its own Release() method.
type changeratorResultV2 struct {
	Changerator *changerator.Changerator
	RightRoot   *v3.Node
	releaseFn   func()
}

func (r *changeratorResultV2) Release() {
	if r.releaseFn != nil {
		r.releaseFn()
	}
}

func newCommitCache(maxSize int) *commitCache {
	return &commitCache{
		entries: make(map[string]*cacheEntry),
		order:   make([]string, 0, maxSize),
		maxSize: maxSize,
	}
}

func (c *commitCache) get(hash string) *cacheEntry {
	entry, ok := c.entries[hash]
	if !ok {
		return nil
	}
	// Move to end (most recently used)
	c.touch(hash)
	return entry
}

func (c *commitCache) put(hash string, entry *cacheEntry) {
	if _, exists := c.entries[hash]; exists {
		c.entries[hash] = entry
		c.touch(hash)
		return
	}
	// Evict if at capacity
	for len(c.order) >= c.maxSize {
		c.evict()
	}
	c.entries[hash] = entry
	c.order = append(c.order, hash)
}

func (c *commitCache) getLines(hash string) (newLines, oldLines []string) {
	entry := c.get(hash)
	if entry == nil {
		return nil, nil
	}
	return entry.newLines, entry.oldLines
}

func (c *commitCache) releaseAll() {
	for _, entry := range c.entries {
		if entry.result != nil {
			entry.result.Release()
		}
	}
	c.entries = make(map[string]*cacheEntry)
	c.order = c.order[:0]
}

func (c *commitCache) touch(hash string) {
	for i, h := range c.order {
		if h == hash {
			c.order = append(c.order[:i], c.order[i+1:]...)
			c.order = append(c.order, hash)
			return
		}
	}
}

func (c *commitCache) evict() {
	if len(c.order) == 0 {
		return
	}
	oldest := c.order[0]
	c.order = c.order[1:]
	if entry, ok := c.entries[oldest]; ok {
		if entry.result != nil {
			entry.result.Release()
		}
		delete(c.entries, oldest)
	}
}

// clampRange returns safe start/end indices for extracting a line range
// centered on lineNum with `before` lines above and `after` lines below.
func clampRange(lineNum, before, after, total int) (start, end int) {
	start = lineNum - before
	if start < 0 {
		start = 0
	}
	end = lineNum + after + 1
	if end > total {
		end = total
	}
	return start, end
}

// splitLines splits byte data into lines once, for caching.
func splitLines(data []byte) []string {
	if len(data) == 0 {
		return nil
	}
	return strings.Split(string(data), "\n")
}
