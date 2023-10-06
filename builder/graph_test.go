// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
	"encoding/json"
	"fmt"
	"github.com/pb33f/libopenapi"
	"os"
	"testing"
)

func TestBuildGraph(t *testing.T) {

	oldBits, _ := os.ReadFile("../sample-specs/petstorev3-original.json")
	newBits, _ := os.ReadFile("../sample-specs/petstorev3.json")
	oldDoc, _ := libopenapi.NewDocument(oldBits)
	newDoc, _ := libopenapi.NewDocument(newBits)
	changes, _ := libopenapi.CompareDocuments(oldDoc, newDoc)

	nodes, edges := BuildGraph(changes)

	fmt.Print(nodes, edges)

	nodesJson, _ := json.Marshal(nodes)
	edgesJson, _ := json.Marshal(edges)

	_ = os.WriteFile("../html-report/ui/src/nodes.json", nodesJson, 0664)
	_ = os.WriteFile("../html-report/ui/src/edges.json", edgesJson, 0664)

}
