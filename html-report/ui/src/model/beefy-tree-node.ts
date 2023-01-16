import {DataNode} from "antd/es/tree";
import {Change} from "./change";

export interface BeefyTreeNode extends DataNode {
    totalChanges?: number,
    breakingChanges?: number,
    titleString?: string,
    change?: Change
}