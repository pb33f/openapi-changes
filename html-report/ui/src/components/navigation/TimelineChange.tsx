// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {ClockCircleOutlined, WarningFilled} from "@ant-design/icons";
import {Timeline} from "antd";
import React from "react";
import {ReportItem} from "@/model/report";
import {TimelineChangeItem} from "@/components/navigation/TimelineChangeItem";

export interface TimelineChangeProps {
    reportItem: ReportItem
    reverseIndex: number;
    index: number;
    totalChanges: number;
}

export function TimelineChange(props: TimelineChangeProps) {
    const reportItem = props.reportItem;
    let icon = (<ClockCircleOutlined/>)
    let color = 'var(--primary-color)'
    if (reportItem.statistics.totalBreaking > 0) {
        icon = (<WarningFilled/>)
        color = 'var(--error-color)'
    }
    return (<Timeline.Item dot={icon} color={color} className='timeline-change-item'>
        <TimelineChangeItem
            time={reportItem.statistics.commit.date}
            totalChanges={reportItem.statistics.total}
            breakingChanges={reportItem.statistics.totalBreaking}
            addedChanges={reportItem.statistics.added}
            removedChanges={reportItem.statistics.removed}
            modifiedChanges={reportItem.statistics.modified}
            reverseIndex={props.reverseIndex}
            index={props.index}
        />
    </Timeline.Item>)
}