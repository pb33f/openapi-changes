// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
    "bytes"
    "fmt"
    "github.com/go-git/go-git/v5"
    "github.com/go-git/go-git/v5/plumbing"
    "github.com/go-git/go-git/v5/plumbing/object"
    "github.com/pb33f/libopenapi"
    // "github.com/pb33f/openapi-changes/builder"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pterm/pterm"
    "io"
    "os/exec"
    "path"
    "strings"
    "time"
)

const (
    GIT       = "git"
    LOG       = "log"
    SHOW      = "show"
    REVPARSE  = "rev-parse"
    TOPLEVEL  = "--show-toplevel"
    NOPAGER   = "--no-pager"
    LOGFORMAT = "--pretty=%cD||%h||%s"
    DIV       = "--"
)

func CheckLocalRepoAvailable(dir string) bool {
    cmd := exec.Command(GIT, LOG)
    cmd.Dir = dir
    err := cmd.Run()
    if err != nil {
        return false
    }
    return true
}

func GetTopLevel(dir string) (string, error) {
    cmd := exec.Command(GIT, REVPARSE, TOPLEVEL)
    var stdout, stderr bytes.Buffer
    cmd.Stdout = &stdout
    cmd.Stderr = &stderr
    cmd.Dir = dir
    err := cmd.Run()
    if err != nil {
        return "", err
    }
    outStr, _ := string(stdout.Bytes()), string(stderr.Bytes())
    return outStr, nil
}

func ExtractHistoryFromFile(repoDirectory, filePath string) []*model.Commit {

    cmd := exec.Command(GIT, NOPAGER, LOG, LOGFORMAT, DIV, filePath)
    var stdout, stderr bytes.Buffer
    cmd.Stdout = &stdout
    cmd.Stderr = &stderr
    cmd.Dir = repoDirectory
    err := cmd.Run()
    var commitHistory []*model.Commit
    if err != nil {
        return commitHistory
    }

    outStr, _ := string(stdout.Bytes()), string(stderr.Bytes())
    lines := strings.Split(outStr, "\n")
    for k := range lines {
        c := strings.Split(lines[k], "||")
        if len(c) == 3 {
            date, _ := time.Parse("Mon, 2 Jan 2006 15:04:05 -0400", c[0])
            commitHistory = append(commitHistory,
                &model.Commit{
                    CommitDate:    date,
                    Hash:          c[1],
                    Message:       c[2],
                    RepoDirectory: repoDirectory,
                    FilePath:      filePath,
                })
        }
    }
    return commitHistory
}

func ExtractHistoryUsingLib(repoDirectory, filePath string) ([]*model.Commit, error) {
    var commitHistory []*model.Commit
    var err error

    r, e := git.PlainOpen(repoDirectory)
    if e != nil {
        return nil, err
    }

    var ref *plumbing.Reference
    ref, err = r.Head()
    if err != nil {
        return nil, err
    }

    var commitIterator object.CommitIter
    commitIterator, err = r.Log(&git.LogOptions{
        From:     ref.Hash(),
        FileName: &filePath,
    })
    if err != nil {
        return commitHistory, err
    }

    // Iterate over all commits and save file for each
    var commit *object.Commit
    for {
        commit, err = commitIterator.Next()
        if err == io.EOF {
            break
        }
        if err != nil {
            return nil, err
        }
        var srcFile *object.File
        srcFile, err = commit.File(filePath)

        buf := new(bytes.Buffer)

        var reader io.ReadCloser
        reader, err = srcFile.Blob.Reader()
        if err != nil {
            return nil, err
        }
        _, err = buf.ReadFrom(reader)
        if err != nil {
            return nil, err
        }

        commitHistory = append(commitHistory,
            &model.Commit{
                CommitDate:    commit.Author.When,
                Hash:          commit.Hash.String(),
                Message:       commit.Message,
                Author:        commit.Author.Name,
                AuthorEmail:   commit.Author.Email,
                RepoDirectory: repoDirectory,
                FilePath:      filePath,
                Data:          buf.Bytes(),
            })
    }
    commitIterator.Close()
    return commitHistory, nil
}

func PopulateHistoryWithChanges(commitHistory []*model.Commit, printer *pterm.SpinnerPrinter) []error {
    for c := range commitHistory {
        cmd := exec.Command(GIT, NOPAGER, SHOW, fmt.Sprintf("%s:%s", commitHistory[c].Hash, commitHistory[c].FilePath))
        var ou, er bytes.Buffer
        cmd.Stdout = &ou
        cmd.Stderr = &er
        cmd.Dir = commitHistory[c].RepoDirectory
        err := cmd.Run()
        if err != nil {
            return []error{err}
        }
        commitHistory[c].Data = ou.Bytes()
    }
    errors := BuildCommitChangelog(commitHistory)
    if len(errors) > 0 {
        return errors
    }
    if printer != nil {
        printer.UpdateText(fmt.Sprintf("Parsed %d commits", len(commitHistory)))
    }
    return nil
}

func BuildCommitChangelog(commitHistory []*model.Commit) []error {
    var errors []error
    for c := len(commitHistory) - 1; c > -1; c-- {
        var oldBits, newBits []byte
        if len(commitHistory) == c+1 {
            newBits = commitHistory[c].Data
        } else {
            oldBits = commitHistory[c+1].Data
            commitHistory[c].OldData = oldBits
            newBits = commitHistory[c].Data
        }

        var oldDoc, newDoc libopenapi.Document

        var err error
        if len(oldBits) > 0 && len(newBits) > 0 {
            oldDoc, err = libopenapi.NewDocument(oldBits)
            if err != nil {
                errors = append(errors, err)
            }
            newDoc, err = libopenapi.NewDocument(newBits)
            if err != nil {
                errors = append(errors, err)
            }
            if len(errors) > 0 {
                return errors
            }
            changes, errs := libopenapi.CompareDocuments(oldDoc, newDoc)
            if errs != nil {
                errors = append(errors, errs...)
            }
            if len(errors) > 0 {
                return errors
            }
            commitHistory[c].Changes = changes
        }
        if len(oldBits) == 0 && len(newBits) > 0 {
            newDoc, _ = libopenapi.NewDocument(newBits)
        }
        if newDoc != nil {
            commitHistory[c].Document = newDoc
        }
        if oldDoc != nil {
            commitHistory[c].OldDocument = oldDoc
        }
    }
    return nil
}

func ExtractPathAndFile(location string) (string, string) {
    dir := path.Dir(location)
    file := path.Base(location)
    return dir, file
}
