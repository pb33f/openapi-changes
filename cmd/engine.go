// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"os"

	"github.com/pb33f/doctor/changerator"
	drModel "github.com/pb33f/doctor/model"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/breakingrules"
	"github.com/pb33f/openapi-changes/model"
)


// changeratorResult owns the doctor-side resources created for a single comparison.
//
// Callers must call Release() exactly once when they are done reading Changerator,
// DocChanges, and the doctor document tree.
type changeratorResult struct {
	Changerator *changerator.Changerator
	DocChanges  *whatChangedModel.DocumentChanges
	RightDrDoc  *drModel.DrDocument
	LeftDrDoc   *drModel.DrDocument
}

func (r *changeratorResult) Release() {
	if r.RightDrDoc != nil {
		r.RightDrDoc.Release()
	}
	if r.LeftDrDoc != nil {
		r.LeftDrDoc.Release()
	}
}

// runChangerator builds doctor models, runs the changerator, and returns the
// resulting comparison bundle. It returns nil, nil when the commit has no
// comparable documents or the comparison produces no changes.
func runChangerator(commit *model.Commit, breakingConfig *whatChangedModel.BreakingRulesConfig) (*changeratorResult, error) {
	if commit.Document == nil || commit.OldDocument == nil {
		return nil, nil
	}

	rightModel, err := commit.Document.BuildV3Model()
	if err != nil {
		return nil, fmt.Errorf("building right model: %w", err)
	}
	leftModel, err := commit.OldDocument.BuildV3Model()
	if err != nil {
		return nil, fmt.Errorf("building left model: %w", err)
	}

	rightDrDoc := drModel.NewDrDocumentAndGraph(rightModel)
	leftDrDoc := drModel.NewDrDocumentAndGraph(leftModel)
	if rightDrDoc == nil || leftDrDoc == nil {
		if rightDrDoc != nil {
			rightDrDoc.Release()
		}
		if leftDrDoc != nil {
			leftDrDoc.Release()
		}
		return nil, fmt.Errorf("failed to create DrDocument models")
	}

	if breakingConfig != nil {
		breakingrules.Apply(breakingConfig)
		defer breakingrules.Reset()
	}

	ctr := changerator.NewChangerator(&changerator.ChangeratorConfig{
		LeftDrDoc:       leftDrDoc.V3Document,
		RightDrDoc:      rightDrDoc.V3Document,
		Doctor:          rightDrDoc,
		RightDocContent: commit.Data,
	})
	docChanges := ctr.Changerate()

	if docChanges == nil {
		rightDrDoc.Release()
		leftDrDoc.Release()
		return nil, nil
	}

	return &changeratorResult{
		Changerator: ctr,
		DocChanges:  docChanges,
		RightDrDoc:  rightDrDoc,
		LeftDrDoc:   leftDrDoc,
	}, nil
}

func emitCommitWarning(commitHash string, err error) {
	fmt.Fprintf(os.Stderr, "warning: commit %s: %s\n", commitHash, err)
}
