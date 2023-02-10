// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {DataNode} from "antd/es/tree";
import {Change} from "./change";

export interface BeefyTreeNode extends DataNode {
    totalChanges?: number,
    breakingChanges?: number,
    titleString?: string,
    change?: Change
}