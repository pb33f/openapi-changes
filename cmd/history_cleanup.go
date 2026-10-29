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
