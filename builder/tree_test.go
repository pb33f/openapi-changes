// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
    "encoding/json"
    "github.com/pb33f/libopenapi"
    "os"
    "testing"
)

func TestBuildTree(t *testing.T) {

    oldBits, _ := os.ReadFile("../sample-specs/petstorev3-original.json")
    newBits, _ := os.ReadFile("../sample-specs/petstorev3.json")
    oldDoc, _ := libopenapi.NewDocument(oldBits)
    newDoc, _ := libopenapi.NewDocument(newBits)
    changes, _ := libopenapi.CompareDocuments(oldDoc, newDoc)

    tree := BuildTree(changes)

    treeJson, _ := json.Marshal(tree)

    _ = os.WriteFile("../html-report/ui/src/components/change_view/tree.json", treeJson, 0664)

}
