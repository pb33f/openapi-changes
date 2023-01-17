// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
    "encoding/json"
    "fmt"
    "github.com/pb33f/openapi-changes/model"
    "github.com/pterm/pterm"
    "io/ioutil"
    "net"
    "net/http"
    "net/url"
    "os"
    "path/filepath"
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

func GetCommitsForGithubFile(user, repo, path string) ([]*APICommit, error) {

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
        return nil, fmt.Errorf("HTTP error %d, cannot proceed: %s", resp.StatusCode, string(body))
    }

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    var commits []*APICommit
    err = json.Unmarshal(body, &commits)
    if err != nil {
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

        if err != nil {
            e <- err
            return
        }
        if res.StatusCode != 200 {
            b, _ := ioutil.ReadAll(res.Body)
            e <- fmt.Errorf("HTTP error %d, cannot proceed: %s", res.StatusCode, string(b))
            return
        }
        b, er := ioutil.ReadAll(res.Body)
        if er != nil {
            e <- er
            return
        }
        var f *APICommit
        err = json.Unmarshal(b, &f)
        if err != nil {
            e <- err
            return
        }
        commit.Files = f.Files

        for x := range commit.Files {

            // make sure we extract the one we want.
            rawURL, _ := url.Parse(commit.Files[x].RawURL)
            _, file := filepath.Split(rawURL.Path)
            _, lookyLoo := filepath.Split(path)
            if file == lookyLoo {
                r, _ = http.NewRequest(http.MethodGet, commit.Files[x].RawURL, nil)
                if ghAuth != "" {
                    r.Header.Set(GithubAuthHeader, fmt.Sprintf("Bearer %s", ghAuth))
                }
                res, er = cl.Do(r)
                if er != nil {
                    e <- er
                    return
                }
                if res.StatusCode != 200 {
                    k, _ := ioutil.ReadAll(res.Body)
                    e <- fmt.Errorf("HTTP error %d, cannot proceed: %s", res.StatusCode, string(k))
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
                    e <- er
                    return
                }
                commit.Files[x].Bytes = b
            }
        }
        d <- true
    }

    sigChan := make(chan bool)
    errChan := make(chan error)

    totalCommits := len(commits)
    //totalCommits := 5
    completedCommits := 0

    for x := range commits {
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
    if cutoffIndex > 0 {
        pterm.Warning.Printf("Report exceeds %dMB in size (%dMB), results limited to %d changes in the timeline",
            threshold/1024, kbSize/1024, cutoffIndex-1)
        commits = commits[:cutoffIndex]
    }
    return commits, nil
}

func ConvertGithubCommitsIntoModel(ghCommits []*APICommit) ([]*model.Commit, []error) {
    var normalized []*model.Commit
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

                normalized = append(normalized, nc)

            }
        }
    }
    var errs []error
    normalized, errs = BuildCommitChangelog(normalized)
    return normalized, errs
}
