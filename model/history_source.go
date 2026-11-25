package model

import (
	"fmt"
	"github.com/pb33f/libasyncapi"
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/datamodel"
	"sync"
)

// HistorySource is an immutable revision input. It holds no parsed model.
type HistorySource struct {
	Schema         bool
	SchemaBasePath string
	Revision       string
	Data           []byte
	Previous       *HistorySource
	Config         func() (*datamodel.DocumentConfiguration, error)
}

type parsedHistorySource struct {
	input ParsedSpecification
	pins  int
	used  uint64
}

// HistoryWindow retains at most two idle parsed revisions. Active comparisons
// pin their inputs until Release; callers can safely render before releasing.
type HistoryWindow struct {
	DiscardIdle bool // console cache entries own their pairs; retain no second idle cache
	mu          sync.Mutex
	entries     map[*HistorySource]*parsedHistorySource
	clock       uint64
}

// Acquire pins an OpenAPI or AsyncAPI revision. Use AcquireInput for all supported formats.
func (w *HistoryWindow) Acquire(source *HistorySource) (libopenapi.Document, libasyncapi.Document, func(), error) {
	input, release, err := w.AcquireInput(source)
	if input.Schema != nil {
		release()
		return nil, nil, nil, fmt.Errorf("standalone JSON Schema requires AcquireInput")
	}
	return input.OpenAPI, input.AsyncAPI, release, err
}

// AcquireInput pins a revision of any supported format until the caller releases it.
func (w *HistoryWindow) AcquireInput(source *HistorySource) (ParsedSpecification, func(), error) {
	if source == nil || source.Config == nil {
		return ParsedSpecification{}, nil, fmt.Errorf("history source configuration is required")
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	if w.entries == nil {
		w.entries = make(map[*HistorySource]*parsedHistorySource)
	}
	entry := w.entries[source]
	if entry == nil {
		config, err := source.Config()
		if err != nil {
			return ParsedSpecification{}, nil, err
		}
		var name string
		if config != nil {
			name = config.SpecFilePath
		}
		input, err := ParseInput(source.Data, name, config, SchemaInputOptions{Explicit: source.Schema, BasePath: source.SchemaBasePath})
		if err != nil {
			return ParsedSpecification{}, nil, err
		}
		if native := input.OpenAPI; native != nil {
			if _, err = native.BuildV3Model(); err != nil {
				input.Release()
				return ParsedSpecification{}, nil, err
			}
		}
		entry = &parsedHistorySource{input: input}
		w.entries[source] = entry
	}
	w.clock++
	entry.used = w.clock
	entry.pins++
	w.trim()
	var once sync.Once
	return entry.input, func() { once.Do(func() { w.mu.Lock(); defer w.mu.Unlock(); entry.pins--; w.trim() }) }, nil
}

func (w *HistoryWindow) trim() {
	limit := 2
	if w.DiscardIdle {
		limit = 0
	}
	for len(w.entries) > limit {
		var oldest *HistorySource
		var age uint64
		for source, entry := range w.entries {
			if entry.pins == 0 && (oldest == nil || entry.used < age) {
				oldest, age = source, entry.used
			}
		}
		if oldest == nil {
			return
		}
		entry := w.entries[oldest]
		delete(w.entries, oldest)
		entry.input.Release()
	}
}

// Close releases idle models and releases pinned models when their owners finish.
func (w *HistoryWindow) Close() {
	if w == nil {
		return
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	w.DiscardIdle = true
	w.trim()
}

func releaseParsed(native libopenapi.Document, async libasyncapi.Document) {
	if native != nil {
		if r := native.GetRolodex(); r != nil {
			r.Release()
		}
		native.Release()
	}
	if async != nil {
		if r := async.Rolodex(); r != nil {
			r.Release()
		}
	}
}

// PrepareHistory returns a comparison copy. Malformed predecessor revisions are
// bypassed so a valid revision can still compare against the last valid source.
func (c *Commit) PrepareHistory() (*Commit, func(), error) {
	if c.Source == nil {
		return c, func() {}, nil
	}
	current, release, err := c.Window.AcquireInput(c.Source)
	if err != nil {
		return nil, nil, err
	}
	copy := *c
	copy.Source = nil
	copy.Document = current.OpenAPI
	copy.AsyncDocument = current.AsyncAPI
	copy.SchemaDocument = current.Schema
	copy.OldData = nil
	for prior := c.Source.Previous; prior != nil; prior = prior.Previous {
		old, releaseOld, err := c.Window.AcquireInput(prior)
		if err != nil {
			continue
		}
		if current.Kind() != old.Kind() {
			releaseOld()
			release()
			return nil, nil, fmt.Errorf("cannot compare %s and %s revisions", old.Kind(), current.Kind())
		}
		copy.OldDocument = old.OpenAPI
		copy.OldAsyncDocument = old.AsyncAPI
		copy.OldSchemaDocument = old.Schema
		copy.OldData = prior.Data
		copy.OriginalRevision = prior.Revision
		return &copy, func() { releaseOld(); release() }, nil
	}
	return &copy, release, nil
}
