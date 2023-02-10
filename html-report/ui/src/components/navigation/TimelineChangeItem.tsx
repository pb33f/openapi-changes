// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {ChangeState, ReportState, useChangeStore, useReportStore} from "@/model/store";
import {Statistic} from "antd";
import {EditOutlined, MinusSquareOutlined, PlusSquareOutlined, WarningOutlined} from "@ant-design/icons";
import React from "react";
import {TimelineChangeItemTitle} from "@/components/navigation/TimelineChangeItemTitle";

export interface TimelineChangeItemProps {
    time: string;
    totalChanges: number;
    breakingChanges: number;
    addedChanges: number;
    removedChanges: number;
    modifiedChanges: number;
    reverseIndex: number;
    index: number;
}

export function TimelineChangeItem(props: TimelineChangeItemProps) {
    const setSelectedReportIndex = useReportStore((report: ReportState) => report.setSelectedReportIndex);
    const setHighlightedReportIndex = useReportStore((report: ReportState) => report.setHighlightedReportIndex);
    const selectedReportIndex = useReportStore((report: ReportState) => report.selectedReportIndex);
    const highlightedReportIndex = useReportStore((report: ReportState) => report.highlightedReportIndex);
    const setSelectedReport = useReportStore((report: ReportState) => report.setSelectedReport);
    const setCurrentChange = useChangeStore((state: ChangeState) => state.setCurrentChange)
    const report = useReportStore((report: ReportState) => report.report);
    let changeStats: JSX.Element
    const mobile = (window.innerWidth < 1000)

    let breakingChangesStat: JSX.Element | undefined;
    if (props.breakingChanges > 0) {
        breakingChangesStat = <Statistic
            title={<TimelineChangeItemTitle title='Breaking' breaking/>}
            value={props.breakingChanges}
            prefix={<WarningOutlined/>}
            valueStyle={{color: 'var(--error-font-color)'}}/>
    }

    if (!mobile) {
        changeStats = (<div className='nav-change-statistics'>
            <Statistic
                title={<TimelineChangeItemTitle title='Modifications'/>}
                value={props.modifiedChanges}
                prefix={<EditOutlined/>}
            />
            <Statistic
                title={<TimelineChangeItemTitle title='Additions'/>}
                value={props.addedChanges}
                prefix={<PlusSquareOutlined/>}
            />
            <Statistic
                title={<TimelineChangeItemTitle title='Removals'/>}
                value={props.removedChanges}
                prefix={<MinusSquareOutlined/>}
            />
            <Statistic
                title={<TimelineChangeItemTitle title='Total'/>}
                value={props.totalChanges}
            />
            {breakingChangesStat}
        </div>)
    } else {
        changeStats = (<div className='nav-change-statistics'>
            <Statistic
                title={<TimelineChangeItemTitle title='Total'/>}
                value={props.totalChanges}
            />
            {breakingChangesStat}
        </div>)
    }
    if (!report) {
        return <div>no report</div>
    }

    let className = 'nav-change-container'
    if (selectedReportIndex == props.reverseIndex) {
        className = 'nav-change-container-selected';
    }
    if (highlightedReportIndex == props.reverseIndex) {
        className += ' nav-change-container-active'
    }

    return (
        <div
            className={className}
            onMouseOver={() => {
                setHighlightedReportIndex(props.reverseIndex)
            }}
            onClick={() => {
                setSelectedReportIndex(props.reverseIndex)
                setHighlightedReportIndex(props.reverseIndex)
                setSelectedReport(report.reportItems[props.index])
                setCurrentChange(null);
            }}>
            <span className='nav-change-date'>{new Date(props.time).toLocaleString()}</span>
            {changeStats}
        </div>
    )
}