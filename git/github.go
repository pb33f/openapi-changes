// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
    "encoding/json"
    "errors"
    "fmt"
    "github.com/pb33f/openapi-changes/model"
    "io/ioutil"
    "net"
    "net/http"
    "net/url"
    "os"
    "path/filepath"
    "strings"
    "time"
)

const GithubCommitAPI = "https://api.github.com/repos/"
const GithubAuthHeader = "Authorization"

type APICommitAuthor struct {
    Name  string `json:"name"`
    Email string `json:"email"`
    Date  string `json:"date"`
}

type APICommitDetails struct {
    Author  *APICommitAuthor `json:"author"`
    Message string           `json:"message"`
    URL     string           `json:"url"`
}

type APICommit struct {
    Hash          string            `json:"sha"`
    CommitDetails *APICommitDetails `json:"commit"`
    URL           string            `json:"url"`
    Files         []*APIFile        `json:"files"`
}

type APIFile struct {
    RawURL  string `json:"raw_url"`
    BlobURL string `json:"blob_url"`
    Hash    string `json:"sha"`
    Bytes   []byte `json:"-"`
}

func GetCommitsForGithubFile(user, repo, path string,
    progressChan chan *model.ProgressUpdate, progressErrorChan chan model.ProgressError,
    forceCutoff bool) ([]*APICommit, error) {

    t := &http.Transport{
        Dial: (&net.Dialer{
            Timeout:   60 * time.Second,
            KeepAlive: 30 * time.Second,
        }).Dial,
        TLSHandshakeTimeout: 60 * time.Second,
    }

    u := fmt.Sprintf(GithubCommitAPI+"%s/%s/commits?path=%s", user, repo, path)
    client := &http.Client{
        Transport: t,
    }
    req, _ := http.NewRequest("GET", u, nil)
    ghAuth := os.Getenv("GH_TOKEN")
    if ghAuth != "" {
        req.Header.Set("authorization", fmt.Sprintf("Bearer %s", ghAuth))
    }
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    if resp.StatusCode != 200 {
        body, _ := ioutil.ReadAll(resp.Body)
        errMsg := fmt.Sprintf("HTTP error %d, cannot proceed: %s", resp.StatusCode, string(body))
        model.SendProgressError("read commit history", errMsg, progressErrorChan)
        return nil, errors.New(errMsg)
    }

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        model.SendProgressError("read commit API response", err.Error(), progressErrorChan)
        return nil, err
    }
    var commits []*APICommit
    err = json.Unmarshal(body, &commits)
    if err != nil {
        model.SendProgressError("unmarshal commit history API response", err.Error(), progressErrorChan)
        return nil, err
    }

    kbSize := 0
    threshold := 50000
    cutoffIndex := 0
    count := 0
    var extractFilesFromCommit = func(user, repo, path string, commit *APICommit, d chan bool, e chan error) {
        u = fmt.Sprintf(GithubCommitAPI+"%s/%s/commits/%s", user, repo, commit.Hash)
        cl := &http.Client{
            Transport: t,
        }
        r, _ := http.NewRequest(http.MethodGet, u, nil)
        if ghAuth != "" {
            r.Header.Set(GithubAuthHeader, fmt.Sprintf("Bearer %s", ghAuth))
        }
        res, er := cl.Do(r)

        if er != nil {
            model.SendProgressError(fmt.Sprintf("fetching commit %s via API", commit.Hash),
                err.Error(), progressErrorChan)
            e <- er
            return
        }
        if res.StatusCode != 200 {
            b, _ := ioutil.ReadAll(res.Body)
            errString := fmt.Sprintf("HTTP error %d, cannot proceed: %s", res.StatusCode, string(b))
            model.SendProgressError(fmt.Sprintf("fetching commit %s via API", commit.Hash),
                err.Error(), progressErrorChan)
            e <- fmt.Errorf(errString)
            return
        }
        b, er := ioutil.ReadAll(res.Body)
        if er != nil {
            model.SendProgressError(fmt.Sprintf("reading commit body %s via API", commit.Hash),
                err.Error(), progressErrorChan)
            e <- er
            return
        }
        var f *APICommit
        err = json.Unmarshal(b, &f)
        if err != nil {
            model.SendProgressError(fmt.Sprintf("unmarshalling commit %s via API", commit.Hash),
                err.Error(), progressErrorChan)
            e <- err
            return
        }
        commit.Files = f.Files

        for x := range commit.Files {

            // make sure we extract the one we want.
            rawURL, _ := url.Parse(commit.Files[x].RawURL)
            dir, file := filepath.Split(rawURL.Path)
            lookyDir, lookyLoo := filepath.Split(path)
            dir = strings.ReplaceAll(dir, fmt.Sprintf("/%s/%s/raw/%s/", user, repo, commit.Hash), "")

            if file == lookyLoo && dir == lookyDir {
                r, _ = http.NewRequest(http.MethodGet, commit.Files[x].RawURL, nil)
                if ghAuth != "" {
                    r.Header.Set(GithubAuthHeader, fmt.Sprintf("Bearer %s", ghAuth))
                }
                res, er = cl.Do(r)
                if er != nil {
                    model.SendProgressError(fmt.Sprintf("reading commit %s file at %s via API",
                        commit.Hash, commit.Files[x].RawURL), er.Error(), progressErrorChan)
                    e <- er
                    return
                }
                if res.StatusCode != 200 {
                    k, _ := ioutil.ReadAll(res.Body)
                    errMsg := fmt.Sprintf("HTTP error %d, cannot proceed: %s", res.StatusCode, string(k))
                    model.SendProgressError(fmt.Sprintf("reading commit %s file at %s via API",
                        commit.Hash, commit.Files[x].RawURL), errMsg, progressErrorChan)
                    e <- fmt.Errorf(errMsg)
                    return
                }
                b, er = ioutil.ReadAll(res.Body)
                kbSize += (len(b) / 1024) * 2
                if kbSize > threshold {
                    cutoffIndex = count
                } else {
                    count++
                }
                if er != nil {
                    model.SendProgressError(fmt.Sprintf("reading commit body %s file at %s via API",
                        commit.Hash, commit.Files[x].RawURL), er.Error(), progressErrorChan)
                    e <- er
                    return
                }
                model.SendProgressUpdate(commit.Hash,
                    fmt.Sprintf("%d bytes read for file %s", len(b), file), false, progressChan)
                commit.Files[x].Bytes = b
            }
        }
        model.SendProgressUpdate(commit.Hash,
            fmt.Sprintf("commit %s parsed", commit.Hash), true, progressChan)
        d <- true
    }

    sigChan := make(chan bool)
    errChan := make(chan error)

    totalCommits := len(commits)
    //totalCommits := 5
    completedCommits := 0

    for x := range commits {
        model.SendProgressUpdate(fmt.Sprintf("commit: %s", commits[x].Hash),
            fmt.Sprintf("commit %s being fetched", commits[x].Hash), false, progressChan)
        go extractFilesFromCommit(user, repo, path, commits[x], sigChan, errChan)
    }

    for completedCommits < totalCommits {
        select {
        case <-sigChan:
            completedCommits++
        case e := <-errChan:
            return nil, e
        }
    }
    if forceCutoff && cutoffIndex > 0 {
        msg := fmt.Sprintf("Report exceeds %dMB in size (%dMB), results limited to %d changes in the timeline",
            threshold/1024, kbSize/1024, cutoffIndex-1)
        model.SendProgressWarning("large report", msg, progressChan)
        commits = commits[:cutoffIndex]
    }
    return commits, nil
}

func ConvertGithubCommitsIntoModel(ghCommits []*APICommit,
    progressChan chan *model.ProgressUpdate, progressErrorChan chan model.ProgressError) ([]*model.Commit, []error) {
    var normalized []*model.Commit

    model.SendProgressUpdate("converting commits", "converting github commits into a model", false, progressChan)

    for x := range ghCommits {
        for y := range ghCommits[x].Files {
            if len(ghCommits[x].Files[y].Bytes) > 0 {
                t, _ := time.Parse("2006-01-02T15:04:05Z", ghCommits[x].CommitDetails.Author.Date)
                nc := &model.Commit{
                    Hash:        ghCommits[x].Hash,
                    Message:     ghCommits[x].CommitDetails.Message,
                    Author:      ghCommits[x].CommitDetails.Author.Name,
                    AuthorEmail: ghCommits[x].CommitDetails.Author.Email,
                    CommitDate:  t,
                    Data:        ghCommits[x].Files[y].Bytes,
                }
                model.SendProgressUpdate("converting commits",
                    fmt.Sprintf("converted commit %s", nc.Hash), false, progressChan)
                normalized = append(normalized, nc)
            }
        }
    }
    var errs []error
    model.SendProgressUpdate("converting commits", "building models", false, progressChan)
    //TODO: feed in the channels to the changelog.
    normalized, errs = BuildCommitChangelog(normalized)

    if len(errs) > 0 {
        model.SendProgressError("converting commits",
            fmt.Sprintf("%d errors detected when normalizing", len(normalized)), progressErrorChan)
    } else {

        if len(normalized) > 0 {
            model.SendProgressUpdate("converting commits",
                fmt.Sprintf("%d commits normalized", len(normalized)), true, progressChan)
        } else {
            model.SendProgressError("converting commits", "no commits were normalized! Check URL", progressErrorChan)
        }
    }
    return normalized, errs
}
