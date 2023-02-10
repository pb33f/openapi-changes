// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {EdgeData, NodeData} from "reaflow";
import {BeefyTreeNode} from "@/model/beefy-tree-node";

export interface GraphData {
    nodes: NodeData[];
    edges: EdgeData[];
}

export interface TreeGraphMap {
    treeNode: BeefyTreeNode;
    graphNode: NodeData | null;
}