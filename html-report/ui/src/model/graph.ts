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