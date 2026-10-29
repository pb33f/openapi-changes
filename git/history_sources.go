package git

import (
	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/openapi-changes/model"
	"os"
	"path/filepath"
)

// buildHistorySources defers model construction to the consumer's two-document
// window. Source bytes and revision-scoped configurations remain available for
// interactive navigation without retaining every document graph.
func buildHistorySources(commits []*model.Commit, opts HistoryOptions) (*HistoryBuildResult, []error) {
	if len(commits) == 0 {
		return &HistoryBuildResult{}, nil
	}
	basePath, baseURL, err := ResolveBaseOverride(opts.Base)
	if err != nil {
		return nil, []error{err}
	}
	var context *RevisionDocumentContext
	if commits[0].RepoDirectory != "" {
		context, err = BuildRevisionDocumentContext(commits[0].RepoDirectory, commits[0].FilePath, basePath, baseURL)
		if err != nil {
			return nil, []error{err}
		}
	}
	base := datamodel.NewDocumentConfiguration()
	base.AllowRemoteReferences = opts.Remote || baseURL != nil
	base.BaseURL = baseURL
	base.ExcludeExtensionRefs = !opts.ExtRefs
	base.IgnoreArrayCircularReferences = true
	base.IgnorePolymorphicCircularReferences = true
	window := new(model.HistoryWindow)
	makeSource := func(data []byte, revision string) *model.HistorySource {
		return &model.HistorySource{Data: data, Revision: revision, Config: func() (*datamodel.DocumentConfiguration, error) {
			if context != nil {
				return BuildRevisionDocumentConfiguration(context, revision, base)
			}
			config := cloneDocumentConfiguration(base)
			config.SpecFilePath = commits[0].FilePath
			if opts.ReadRevision != nil {
				root := filepath.Join(os.TempDir(), "openapi-changes-history")
				config.BasePath = root
				config.SpecFilePath = filepath.Join(root, commits[0].FilePath)
				config.AllowFileReferences = true
				fs, err := NewGitRevisionFS(root, root, revision, config)
				if err != nil {
					return nil, err
				}
				fs.readRevision = opts.ReadRevision
				config.LocalFS = fs
			}
			return config, nil
		}}
	}
	var previous *model.HistorySource
	// Fetch the preceding file version once; older malformed baselines are handled
	// by the ordinary history chain when they are part of the requested history.
	oldest := commits[len(commits)-1]
	if context != nil {
		for revision := oldest.Hash + "~1"; ; revision += "~1" {
			bits, err := readFile(oldest.RepoDirectory, revision, oldest.FilePath)
			if err != nil {
				break
			}
			candidate := makeSource(bits, revision)
			_, _, release, err := window.Acquire(candidate)
			if err != nil {
				continue
			}
			release()
			previous = candidate
			break
		}
	}
	for i := len(commits) - 1; i >= 0; i-- {
		commit := commits[i]
		source := makeSource(commit.Data, commit.Hash)
		source.Previous = previous
		commit.Source = source
		commit.Window = window
		if previous != nil {
			commit.OldData = previous.Data
		}
		if context != nil {
			commit.DocumentRewriters = []model.DocumentPathRewriter{context.DocumentRewriter}
		}
		if context == nil && opts.ReadRevision != nil {
			root := filepath.Join(os.TempDir(), "openapi-changes-history")
			commit.DocumentRewriters = []model.DocumentPathRewriter{NewRepoRelativeDocumentPathRewriter(root, root)}
		}
		previous = source
	}
	return &HistoryBuildResult{Commits: commits}, nil
}
