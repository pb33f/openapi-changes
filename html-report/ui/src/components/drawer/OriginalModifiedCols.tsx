// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {Change} from "@/model";
import React from "react";
import {Col, Row} from "antd";

export interface OriginalModifiedColsProps {
    change: Change
    className?: string;
}

export function OriginalModifiedCols(props: OriginalModifiedColsProps) {

    let origLine: JSX.Element;
    if (props.change.context.originalLine) {
        origLine = (
            <span className="orig-col">
                <strong>Original</strong> (l: <span
                className='linenumber-highlight'>{props.change.context.originalLine}</span>, c: {props.change.context.originalColumn})
            </span>)
    } else {
        origLine = (<span className="orig-col">(Not available in original specification)</span>)
    }

    let modLine: JSX.Element;
    if (props.change.context.newLine) {
        modLine = (
            <span className="mod-col">
                <strong>Modified</strong> (l: <span
                className='linenumber-highlight'>{props.change.context.newLine}</span>, c: {props.change.context.newColumn}))
            </span>)
    } else {
        modLine = (<span className="mod-col" >(Not available)</span>)
    }

    return (
        <Row className={props.className ? props.className : 'original-modified-container'}>
            <Col span={12}>{origLine}</Col>
            <Col span={12}>{modLine}</Col>
        </Row>
    )
}