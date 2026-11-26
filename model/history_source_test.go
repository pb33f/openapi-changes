package model

import (
	"fmt"
	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/testify/require"
	"testing"
)

func TestHistoryWindowBoundsModelsAndReusesAdjacentSources(t *testing.T) {
	w := new(HistoryWindow)
	sources := make([]*HistorySource, 30)
	parses := 0
	for i := range sources {
		sources[i] = &HistorySource{Data: []byte(fmt.Sprintf("asyncapi: 3.0.0\ninfo: {title: Events, version: '%d'}\n", i)), Config: func() (*datamodel.DocumentConfiguration, error) {
			parses++
			return datamodel.NewDocumentConfiguration(), nil
		}}
	}
	for i := len(sources) - 1; i > 0; i-- {
		_, _, right, err := w.Acquire(sources[i])
		require.NoError(t, err)
		_, _, left, err := w.Acquire(sources[i-1])
		require.NoError(t, err)
		left()
		right()
		require.LessOrEqual(t, len(w.entries), 2)
	}
	require.Equal(t, len(sources), parses, "each adjacent source should parse once")
	w.Close()
	require.Empty(t, w.entries)
}

func TestHistoryWindowSchemaPinsAndNilConfig(t *testing.T) {
	w := new(HistoryWindow)
	source := &HistorySource{Schema: true, Data: []byte("true"), Config: func() (*datamodel.DocumentConfiguration, error) { return nil, nil }}
	_, _, legacyRelease, err := w.Acquire(source)
	require.ErrorContains(t, err, "AcquireInput")
	require.Nil(t, legacyRelease)
	a, release, err := w.AcquireInput(source)
	require.NoError(t, err)
	b, releaseAgain, err := w.AcquireInput(source)
	require.NoError(t, err)
	require.Same(t, a.Schema, b.Schema)
	w.Close()
	release()
	release()
	require.Len(t, w.entries, 1)
	require.NotNil(t, a.Schema.Root)
	releaseAgain()
	require.Empty(t, w.entries)
	require.Nil(t, a.Schema.Root)
}
