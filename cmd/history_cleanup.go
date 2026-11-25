package cmd

import "github.com/pb33f/openapi-changes/model"

func releaseHistoryWindows(commits []*model.Commit) {
	var previous *model.HistoryWindow
	for _, commit := range commits {
		if commit != nil && commit.Window != nil && commit.Window != previous {
			commit.Window.Close()
			previous = commit.Window
		}
	}
}

// Direct inputs have no history window. Their parsed models live until all command views finish.
func releaseDirectInputs(commit *model.Commit) {
	if commit == nil || !commit.Synthetic {
		return
	}
	model.ParsedSpecification{OpenAPI: commit.OldDocument, AsyncAPI: commit.OldAsyncDocument, Schema: commit.OldSchemaDocument}.Release()
	model.ParsedSpecification{OpenAPI: commit.Document, AsyncAPI: commit.AsyncDocument, Schema: commit.SchemaDocument}.Release()
	commit.OldDocument, commit.Document = nil, nil
	commit.OldAsyncDocument, commit.AsyncDocument = nil, nil
	commit.OldSchemaDocument, commit.SchemaDocument = nil, nil
}

func (input *commandInput) releaseDirectInputs() {
	for _, commit := range input.Commits {
		releaseDirectInputs(commit)
	}
}
