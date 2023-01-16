import {BeefyTreeNode} from "@/model";
import {TreeGraphMap} from "@/model/graph";
import {NodeData} from "reaflow";

export function hash(str: string): string  {
    str = str.toLowerCase();
    let hash = 0, i, chr;
    if (str.length === 0) return hash.toString();
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
}

export function lookAtTree(node: BeefyTreeNode, nodeMap:  Map<String, TreeGraphMap>) {
    if (node.change) {
        let nodeId = node.change.property;
        if (node.change.original)
            nodeId += node.change.original;
        if (node.change.new)
            nodeId += node.change.new;
        if (node.change.context.newLine)
            nodeId += node.change.context.newLine;
        if (node.change.context.newColumn)
            nodeId += node.change.context.newColumn;
        if (node.change.context.originalLine)
            nodeId += node.change.context.originalLine;
        if (node.change.context.originalColumn)
            nodeId += node.change.context.originalColumn;
        nodeMap.set(hash(nodeId), {treeNode: node, graphNode: null})
    }
    if (node.children && node.children.length > 0) {
        node.children.forEach((child: BeefyTreeNode) => {
            lookAtTree(child, nodeMap);
        });
    }
}

export function lookAtGraph(node: NodeData, nodeMap:  Map<String, TreeGraphMap>) {
    if (node.data) {
        let nodeId = node.data.property;
        if (node.data.original)
            nodeId += node.data.original;
        if (node.data.new)
            nodeId += node.data.new;
        if (node.data.context.newLine)
            nodeId += node.data.context.newLine;
        if (node.data.context.newColumn)
            nodeId += node.data.context.newColumn;
        if (node.data.context.originalLine)
            nodeId += node.data.context.originalLine;
        if (node.data.context.originalColumn)
            nodeId += node.data.context.originalColumn;
        const hashedId = hash(nodeId);
        let tmn = nodeMap.get(hashedId)
        if (tmn) {
            tmn.graphNode = node;
        }
    }
}

export function getNextDirection(direction: "LEFT" | "RIGHT" | "DOWN" | "UP") {
    switch (direction) {
        case "RIGHT":
            return "UP";

        case "DOWN":
            return "RIGHT";

        case "UP":
            return "LEFT";

        case "LEFT":
            return "DOWN";

        default:
            return "DOWN";
    }
}