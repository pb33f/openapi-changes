// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/libopenapi/index"
	"go.yaml.in/yaml/v4"
)

var revisionFSReadFileAtRevision = ReadFileAtRevision

type GitRevisionFS struct {
	repoRoot    string
	baseDir     string
	revision    string
	indexConfig *index.SpecIndexConfig
	logger      *slog.Logger
	rolodex     *index.Rolodex

	files      sync.Map
	processing sync.Map
}

type gitRevisionFile struct {
	name         string
	fullPath     string
	extension    index.FileExtension
	data         []byte
	lastModified time.Time
	errors       []error
	index        atomic.Value
	indexErr     atomic.Value
	parsed       *yaml.Node
	offset       int64
	readMu       sync.Mutex
	parseMu      sync.Mutex
	indexOnce    sync.Once
}

type gitRevisionWaiter struct {
	file *gitRevisionFile
	err  error
	done bool
	mu   sync.Mutex
	cond *sync.Cond
}

func NewGitRevisionFS(repoRoot, baseDir, revision string, docConfig *datamodel.DocumentConfiguration) (*GitRevisionFS, error) {
	absRepoRoot, err := filepath.Abs(repoRoot)
	if err != nil {
		return nil, fmt.Errorf("cannot resolve repository root '%s': %w", repoRoot, err)
	}
	absBaseDir, err := filepath.Abs(baseDir)
	if err != nil {
		return nil, fmt.Errorf("cannot resolve base directory '%s': %w", baseDir, err)
	}
	relBaseDir, err := filepath.Rel(absRepoRoot, absBaseDir)
	if err != nil {
		return nil, fmt.Errorf("cannot relate base directory '%s' to repository root '%s': %w", absBaseDir, absRepoRoot, err)
	}
	if relBaseDir == ".." || strings.HasPrefix(relBaseDir, ".."+string(filepath.Separator)) {
		return nil, fmt.Errorf("base directory '%s' resolves outside repository root '%s'", absBaseDir, absRepoRoot)
	}
	var logger *slog.Logger
	var indexConfig *index.SpecIndexConfig
	if docConfig != nil {
		logger = docConfig.Logger
		indexConfig = &index.SpecIndexConfig{
			BaseURL:                             docConfig.BaseURL,
			BasePath:                            absBaseDir,
			SpecFilePath:                        docConfig.SpecFilePath,
			AllowRemoteLookup:                   docConfig.AllowRemoteReferences,
			AllowFileLookup:                     true,
			IgnorePolymorphicCircularReferences: docConfig.IgnorePolymorphicCircularReferences,
			IgnoreArrayCircularReferences:       docConfig.IgnoreArrayCircularReferences,
			AvoidCircularReferenceCheck:         docConfig.SkipCircularReferenceCheck,
			UseSchemaQuickHash:                  true,
			SkipDocumentCheck:                   true,
			Logger:                              docConfig.Logger,
		}
	}
	return &GitRevisionFS{
		repoRoot:    filepath.Clean(absRepoRoot),
		baseDir:     filepath.Clean(absBaseDir),
		revision:    revision,
		logger:      logger,
		indexConfig: indexConfig,
	}, nil
}

func (g *GitRevisionFS) SetRolodex(rolodex *index.Rolodex) {
	g.rolodex = rolodex
}

func (g *GitRevisionFS) SetLogger(logger *slog.Logger) {
	g.logger = logger
}

func (g *GitRevisionFS) GetFiles() map[string]index.RolodexFile {
	files := make(map[string]index.RolodexFile)
	g.files.Range(func(key, value any) bool {
		files[key.(string)] = value.(*gitRevisionFile)
		return true
	})
	return files
}

func (g *GitRevisionFS) Open(name string) (fs.File, error) {
	virtualPath, relPath, err := g.resolveName(name)
	if err != nil {
		return nil, err
	}

	if file, ok := g.files.Load(virtualPath); ok {
		existing := file.(*gitRevisionFile)
		existing.ResetRead()
		return existing, nil
	}

	waiter := &gitRevisionWaiter{}
	waiter.cond = sync.NewCond(&waiter.mu)
	actual, loaded := g.processing.LoadOrStore(virtualPath, waiter)
	if loaded {
		wait := actual.(*gitRevisionWaiter)
		wait.mu.Lock()
		for !wait.done {
			wait.cond.Wait()
		}
		file := wait.file
		err := wait.err
		wait.mu.Unlock()
		if file != nil {
			file.ResetRead()
		}
		return file, err
	}
	wait := actual.(*gitRevisionWaiter)
	defer func() {
		wait.mu.Lock()
		wait.done = true
		wait.cond.Broadcast()
		wait.mu.Unlock()
		g.processing.Delete(virtualPath)
	}()

	if file, ok := g.files.Load(virtualPath); ok {
		existing := file.(*gitRevisionFile)
		existing.ResetRead()
		wait.file = existing
		return existing, nil
	}

	extension := index.ExtractFileType(virtualPath)
	if extension == index.UNSUPPORTED {
		wait.err = &fs.PathError{Op: "open", Path: name, Err: fs.ErrInvalid}
		return nil, wait.err
	}

	data, err := revisionFSReadFileAtRevision(g.repoRoot, g.revision, relPath)
	if err != nil {
		wait.err = err
		return nil, err
	}

	file := &gitRevisionFile{
		name:         filepath.Base(virtualPath),
		fullPath:     virtualPath,
		extension:    extension,
		data:         data,
		lastModified: time.Now(),
	}
	g.files.Store(virtualPath, file)

	if err := g.indexFile(file); err != nil {
		file.errors = append(file.errors, err)
	}

	wait.file = file
	file.ResetRead()
	return file, nil
}

func (g *GitRevisionFS) resolveName(name string) (string, string, error) {
	path := filepath.FromSlash(name)
	if !filepath.IsAbs(path) {
		path = filepath.Join(g.baseDir, path)
	}
	fullPath, err := filepath.Abs(filepath.Clean(path))
	if err != nil {
		return "", "", fmt.Errorf("cannot resolve git revision path '%s': %w", name, err)
	}
	baseRelPath, err := filepath.Rel(g.baseDir, fullPath)
	if err != nil {
		return "", "", fmt.Errorf("cannot normalize git revision path '%s': %w", name, err)
	}
	if baseRelPath == "." || baseRelPath == "" {
		return "", "", fmt.Errorf("git revision path '%s' must point to a file", name)
	}
	if baseRelPath == ".." || strings.HasPrefix(baseRelPath, ".."+string(filepath.Separator)) {
		return "", "", fmt.Errorf("git revision path '%s' resolves outside repository root", name)
	}
	repoRelPath, err := filepath.Rel(g.repoRoot, fullPath)
	if err != nil {
		return "", "", fmt.Errorf("cannot normalize git revision path '%s': %w", name, err)
	}
	if repoRelPath == ".." || strings.HasPrefix(repoRelPath, ".."+string(filepath.Separator)) {
		return "", "", fmt.Errorf("git revision path '%s' resolves outside repository root", name)
	}
	return fullPath, filepath.ToSlash(repoRelPath), nil
}

func (g *GitRevisionFS) indexFile(file *gitRevisionFile) error {
	if g.indexConfig == nil {
		return nil
	}
	copiedConfig := *g.indexConfig
	copiedConfig.SpecAbsolutePath = file.fullPath
	copiedConfig.AvoidBuildIndex = true
	copiedConfig.SpecInfo = nil
	copiedConfig.Rolodex = g.rolodex

	idx, err := file.Index(&copiedConfig)
	if err != nil {
		return err
	}
	if idx == nil {
		return nil
	}
	if g.rolodex != nil {
		idx.SetRolodex(g.rolodex)
	}
	resolver := index.NewResolver(idx)
	if copiedConfig.IgnoreArrayCircularReferences {
		resolver.IgnoreArrayCircularReferences()
	}
	if copiedConfig.IgnorePolymorphicCircularReferences {
		resolver.IgnorePolymorphicCircularReferences()
	}
	idx.BuildIndex()
	if g.rolodex != nil {
		g.rolodex.AddIndex(idx)
	}
	return nil
}

func (f *gitRevisionFile) GetContent() string {
	return string(f.data)
}

func (f *gitRevisionFile) GetFileExtension() index.FileExtension {
	return f.extension
}

func (f *gitRevisionFile) GetFullPath() string {
	return f.fullPath
}

func (f *gitRevisionFile) GetErrors() []error {
	return f.errors
}

func (f *gitRevisionFile) GetContentAsYAMLNode() (*yaml.Node, error) {
	if idx := f.GetIndex(); idx != nil && idx.GetRootNode() != nil {
		return idx.GetRootNode(), nil
	}

	f.parseMu.Lock()
	defer f.parseMu.Unlock()
	if f.parsed != nil {
		return f.parsed, nil
	}
	if f.data == nil {
		return nil, fmt.Errorf("no data to parse for file: %s", f.fullPath)
	}

	var root yaml.Node
	err := yaml.Unmarshal(f.data, &root)
	if err != nil {
		root = yaml.Node{
			Kind: yaml.DocumentNode,
			Content: []*yaml.Node{{
				Kind:  yaml.ScalarNode,
				Tag:   "!!str",
				Value: string(f.data),
			}},
		}
	}
	if idx := f.GetIndex(); idx != nil && idx.GetRootNode() == nil {
		idx.SetRootNode(&root)
	}
	f.parsed = &root
	return &root, err
}

func (f *gitRevisionFile) GetIndex() *index.SpecIndex {
	if value := f.index.Load(); value != nil {
		return value.(*index.SpecIndex)
	}
	return nil
}

func (f *gitRevisionFile) WaitForIndexing() {}

func (f *gitRevisionFile) Name() string {
	return f.name
}

func (f *gitRevisionFile) ModTime() time.Time {
	return f.lastModified
}

func (f *gitRevisionFile) IsDir() bool {
	return false
}

func (f *gitRevisionFile) Sys() any {
	return nil
}

func (f *gitRevisionFile) Size() int64 {
	return int64(len(f.data))
}

func (f *gitRevisionFile) Mode() os.FileMode {
	return 0
}

func (f *gitRevisionFile) Close() error {
	return nil
}

func (f *gitRevisionFile) Stat() (fs.FileInfo, error) {
	return f, nil
}

func (f *gitRevisionFile) Read(p []byte) (int, error) {
	f.readMu.Lock()
	defer f.readMu.Unlock()
	if f.offset >= int64(len(f.data)) {
		return 0, io.EOF
	}
	n := copy(p, f.data[f.offset:])
	f.offset += int64(n)
	return n, nil
}

func (f *gitRevisionFile) ResetRead() {
	f.readMu.Lock()
	f.offset = 0
	f.readMu.Unlock()
}

func (f *gitRevisionFile) Index(config *index.SpecIndexConfig) (*index.SpecIndex, error) {
	f.indexOnce.Do(func() {
		info, err := datamodel.ExtractSpecInfoWithDocumentCheck(f.data, true)
		if err != nil {
			f.indexErr.Store(err)
			return
		}
		if info == nil || info.RootNode == nil {
			f.indexErr.Store(fmt.Errorf("failed to extract spec info from file: %s", f.fullPath))
			return
		}
		if config.SpecInfo == nil {
			config.SpecInfo = info
		}
		idx := index.NewSpecIndexWithConfigAndContext(context.Background(), info.RootNode, config)
		idx.SetAbsolutePath(f.fullPath)
		f.index.Store(idx)
	})

	var idx *index.SpecIndex
	if value := f.index.Load(); value != nil {
		idx = value.(*index.SpecIndex)
	}
	var err error
	if value := f.indexErr.Load(); value != nil {
		err = value.(error)
	}
	return idx, err
}
