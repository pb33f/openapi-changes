// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {Node, NodeChildProps, NodeProps} from "reaflow";
import React from "react";
import {Change} from "@/model";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {CheckPropIsVerb, GetVerbColor} from "@/components/verb/Verb";
import {Tag} from "antd";
import * as Styled from "@/components/graph/styled";

export const ChangeNode = (nodeProps: NodeProps) => {
    const ref = React.useRef(null);
    return (
        <Node {...nodeProps} label={<React.Fragment/>}
              style={{stroke: '#0d1117', fill: 'transparent'}}
        >
            {(props: NodeChildProps) => {
                if (props.node.data) {
                    const change: Change = props.node.data;
                    let changeType = "Modified"
                    let changeIcon = <VscEdit/>
                    switch (props.node.data.change) {
                        case 2:
                            changeType = "Property Added";
                            changeIcon = <VscDiffAdded/>
                            break;
                        case 3:
                            changeType = "Object Added";
                            changeIcon = <VscDiffAdded/>
                            break;
                        case 4:
                            changeType = "Object Removed";
                            changeIcon = <VscDiffRemoved/>
                            break;
                        case 5:
                            changeType = "Property Removed "
                            changeIcon = <VscDiffRemoved/>
                            break;
                    }

                    let originalVal;
                    let newVal;
                    let height = props.height;
                    let width = props.width;
                    if (change.new) {
                        newVal = (<div className='changed'>{change.new}</div>);
                    }
                    if (change.original) {
                        originalVal = (<div className='original'>{change.original}</div>);
                    }
                    if (change.new) {
                        originalVal = null;
                    }

                    let changeProperty: JSX.Element = (<>{change.property}</>);
                    if (CheckPropIsVerb(change.property)) {
                        changeProperty = (<Tag color={GetVerbColor(change.property)}
                                               className='graph-verb'>{change.property.toUpperCase()}</Tag>)
                    }

                    return (
                        <Styled.StyledForeignObject
                            width={width}
                            height={height}
                            ref={ref}
                            isObject
                            isBreaking={change.breaking}
                            isClickable={true}>
                            <div className='node'>
                                {changeIcon} {changeProperty}<br/>
                                {originalVal}
                                {newVal}
                            </div>
                        </Styled.StyledForeignObject>
                    );
                } else {

                    // not a leaf node,
                    let changeProperty: JSX.Element = (<>{props.node.text}</>);
                    if (CheckPropIsVerb(props.node.text)) {
                        changeProperty = (<Tag color={GetVerbColor(props.node.text)}
                                               className='graph-verb'>{props.node.text.toUpperCase()}</Tag>)
                    }

                    return (
                        <Styled.StyledForeignObject
                            width={props.width}
                            height={props.height}
                            ref={ref}>
                            <div className='node'>{changeProperty}</div>
                        </Styled.StyledForeignObject>
                    )
                }
            }}
        </Node>
    )
}