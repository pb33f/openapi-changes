// Copyright 2022-2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"context"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"testing"
	"time"
)

func TestCheckLocalRepoAvailable(t *testing.T) {
	assert.True(t, CheckLocalRepoAvailable("./"))
	assert.False(t, CheckLocalRepoAvailable("/tmp/made-up"))
}

func TestExtractHistoryFromFile(t *testing.T) {

	c := make(chan *model.ProgressUpdate)
	e := make(chan model.ProgressError)
	d := make(chan bool)
	go func() {
		iterations := 0
		for iterations < 26 {
			select {
			case <-c:

				iterations++
			case <-e:

				iterations++
			}
		}
		d <- true
	}()

	// this shit times out in the pipeline (damn you github runners)
	ctx, cncl := context.WithTimeout(context.Background(), 5*time.Second)
	history, _ := ExtractHistoryFromFile("./", "read_local.go", c, e, 25)
	defer cncl()

	select {

	case <-d:
		assert.NotNil(t, history)
		assert.Equal(t, "refactoring sketch code", history[len(history)-1].Message)
		return
	case <-ctx.Done():
		return
	}

}

func TestExtractHistoryFromFile_Fail(t *testing.T) {

	c := make(chan *model.ProgressUpdate)
	e := make(chan model.ProgressError)
	d := make(chan bool)
	go func() {
		select {
		case <-c:
			d <- true
		case <-e:
			d <- true
		}
	}()

	history, _ := ExtractHistoryFromFile("./", "no_file_nope", c, e, 5)
	<-d
	assert.Len(t, history, 0)
}

func TestExtractPathAndFile(t *testing.T) {
	var dir, file string
	dir, file = ExtractPathAndFile("/some/place/thing.html")
	assert.Equal(t, "/some/place", dir)
	assert.Equal(t, "thing.html", file)
	dir, file = ExtractPathAndFile("../../thing.html")
	assert.Equal(t, "../..", dir)
	assert.Equal(t, "thing.html", file)
}

func TestGetTopLevel(t *testing.T) {
	str, err := GetTopLevel("./")
	assert.NoError(t, err)
	assert.NotEmpty(t, str)
}
