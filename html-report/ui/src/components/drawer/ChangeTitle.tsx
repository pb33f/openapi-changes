// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {ChangeState, useChangeStore} from "@/model/store";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {WarningFilled} from "@ant-design/icons";
import {CheckPropIsVerb, Verb} from "@/components/verb/Verb";
import React from "react";

export function ChangeTitleComponent() {

    const truncate = (str: string): string => {
        if (str?.length > 50) {
            return str.substring(0, 40) + '...';
        }
        return str
    }

    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)
    let changeIcon = <VscEdit className='drawer-title-icon'/>
    let changeType = "modified"
    let changeProperty: JSX.Element | null
    let originalVal: any = ""
    let newVal: any = ""
    originalVal = currentChange?.original;
    newVal = currentChange?.new;

    changeProperty = (
        <span>
            <span className='property-word'>{currentChange?.property}</span>&nbsp;
            <span className='fill-word'>changed from</span>&nbsp;'<span
            className='original-change-value'>{truncate(originalVal)}</span>'&nbsp;
            <span className='fill-word'>to</span> '<span className='new-change-value'>{truncate(newVal)}</span>'
        </span>
    );

    switch (currentChange?.change) {
        case 2:
            changeType = "property added";
            changeIcon = <VscDiffAdded className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.new ? currentChange?.new : ''}</span>&nbsp;
                    <span className='fill-word'>to</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 3:
            changeType = "object added";
            changeIcon = <VscDiffAdded className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.new ? currentChange?.new : ''}</span>&nbsp;
                    <span className='fill-word'>to</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 4:
            changeType = "object removed";
            changeIcon = <VscDiffRemoved className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.original}</span>&nbsp;
                    <span className='fill-word'>from</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 5:
            changeType = "property removed"
            changeIcon = <VscDiffRemoved className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.original}</span>&nbsp;
                    <span className='fill-word'>from</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
    }

    let breaking: JSX.Element | null = null;
    if (currentChange?.breaking) {
        breaking = (
            <div className="drawer-breaking-icon-container">
                <span className='drawer-breaking-icon-title'>breaking</span>
                <WarningFilled className="drawer-breaking-icon"/>
            </div>
        )
    }

    if (CheckPropIsVerb(currentChange?.property)) {
        changeProperty = <Verb method={currentChange?.property}/>
    }

    if (currentChange) {
        return (
            <section className='drawer-title'>
                {changeIcon} <span
                className={CheckPropIsVerb(currentChange?.property) ? 'drawer-title-property-verb' : 'drawer-title-property'}>{changeType}:&nbsp;
                <span className="drawer-title-changed">{changeProperty}</span>
            </span>
                {breaking}
            </section>
        )
    } else {
        return null;
    }
}