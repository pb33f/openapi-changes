// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"
	"os"

	"github.com/pb33f/doctor/changerator"
	drModel "github.com/pb33f/doctor/model"
	v3 "github.com/pb33f/doctor/model/high/v3"
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
	rewriteOutputLocations(ctr, docChanges, commit.DocumentRewriters)

	return &changeratorResult{
		Changerator: ctr,
		DocChanges:  docChanges,
		RightDrDoc:  rightDrDoc,
		LeftDrDoc:   leftDrDoc,
	}, nil
}

func rewriteOutputLocations(ctr *changerator.Changerator, docChanges *whatChangedModel.DocumentChanges, rewriters []model.DocumentPathRewriter) {
	if len(rewriters) == 0 {
		return
	}
	rewriteDocumentChangeLocations(docChanges, rewriters)
	if ctr != nil {
		rewriteChangedNodeLocations(ctr.ChangedNodes, rewriters)
	}
}

func rewriteDocumentChangeLocations(docChanges *whatChangedModel.DocumentChanges, rewriters []model.DocumentPathRewriter) {
	if docChanges == nil {
		return
	}
	for _, change := range docChanges.GetAllChanges() {
		if change == nil || change.Context == nil || change.Context.DocumentLocation == "" {
			continue
		}
		change.Context.DocumentLocation = rewriteDocumentLocation(change.Context.DocumentLocation, rewriters)
	}
}

func rewriteChangedNodeLocations(nodes []*v3.Node, rewriters []model.DocumentPathRewriter) {
	if len(nodes) == 0 {
		return
	}
	seen := make(map[*v3.Node]struct{}, len(nodes))
	var walk func(*v3.Node)
	walk = func(node *v3.Node) {
		if node == nil {
			return
		}
		if _, ok := seen[node]; ok {
			return
		}
		seen[node] = struct{}{}

		if node.Origin != nil {
			node.Origin.AbsoluteLocation = rewriteDocumentLocation(node.Origin.AbsoluteLocation, rewriters)
			node.Origin.AbsoluteLocationValue = rewriteDocumentLocation(node.Origin.AbsoluteLocationValue, rewriters)
		}
		node.OriginLocation = rewriteDocumentLocation(node.OriginLocation, rewriters)
		for _, changed := range node.GetChanges() {
			for _, change := range changed.GetAllChanges() {
				if change == nil || change.Context == nil {
					continue
				}
				change.Context.DocumentLocation = rewriteDocumentLocation(change.Context.DocumentLocation, rewriters)
			}
		}
		for _, change := range node.RenderedChanges {
			if change == nil || change.Context == nil {
				continue
			}
			change.Context.DocumentLocation = rewriteDocumentLocation(change.Context.DocumentLocation, rewriters)
		}
		for _, change := range node.CleanedChanged {
			if change == nil || change.Context == nil {
				continue
			}
			change.Context.DocumentLocation = rewriteDocumentLocation(change.Context.DocumentLocation, rewriters)
		}

		for _, child := range node.Children {
			walk(child)
		}
	}
	for _, node := range nodes {
		walk(node)
	}
}

func rewriteDocumentLocation(raw string, rewriters []model.DocumentPathRewriter) string {
	if raw == "" {
		return raw
	}
	for _, rewrite := range rewriters {
		if rewrite == nil {
			continue
		}
		rewritten := rewrite(raw)
		if rewritten != raw {
			return rewritten
		}
	}
	return raw
}

func emitCommitWarning(commitHash string, err error) {
	fmt.Fprintf(os.Stderr, "warning: commit %s: %s\n", commitHash, err)
}
