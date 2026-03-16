package cmd

import (
	"testing"

	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRunLeftRightSummary_IdenticalSpecsReturnsNoError(t *testing.T) {
	updateChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	errs := runLeftRightSummary("../sample-specs/petstorev3.json", "../sample-specs/petstorev3.json",
		updateChan, errorChan, "", true, false, false, false, nil)

	require.Empty(t, errs)
}

func TestRunLeftRightReport_IdenticalSpecsReturnsNilReport(t *testing.T) {
	updateChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	report, errs := runLeftRightReport("../sample-specs/petstorev3.json", "../sample-specs/petstorev3.json",
		updateChan, errorChan, "", true, false, nil)

	require.Empty(t, errs)
	assert.Nil(t, report)
}
