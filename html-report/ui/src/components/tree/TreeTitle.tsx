// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {Change} from "@/model";
import {Badge} from "antd";
import React from "react";

export interface TreeTitleNodeProps {
    totalChanges: number | undefined;
    breakingChanges: number | undefined;
    title: string | undefined;
    breaking: boolean | undefined;
    change?: Change
}

export function TreeTitleNode(props: TreeTitleNodeProps) {
    let title: JSX.Element | undefined;
    if (props.change) {
        title = <span className={props.breaking ? 'breaking-change tree-title' : 'tree-title'}>{props.title}</span>
    } else {
        title = <span className='tree-title-dull'>{props.title}</span>
    }
    return (
        <Badge count={props.totalChanges} size="small" offset={[10, 0]}
               style={{borderColor: 'transparent', background: 'none', color: 'var(--secondary-color)'}}>
            {title}
        </Badge>
    )
}
