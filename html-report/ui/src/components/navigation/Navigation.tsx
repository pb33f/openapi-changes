// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {NavState, ReportState, useNavStore, useReportStore} from "@/model/store";
import {Drawer, Timeline, TimelineItemProps} from "antd";
import React, {useEffect} from "react";
import {ClockCircleOutlined, FileAddOutlined, WarningFilled} from "@ant-design/icons";
import {ReportItem} from "@/model/report";
import {ChangeChart} from "@/components/charts/ChangeChart";
import {TimelineChangeItem} from "./TimelineChangeItem";
import './Navigation.css';

export function Navigation() {
    const selectedReportItem = useReportStore((report: ReportState) => report.selectedReportItem);
    const navOpen = useNavStore((state: NavState) => state.navOpen)
    const closeNav = useNavStore((state: NavState) => state.closeNav)
    const report = useReportStore((report: ReportState) => report.report);
    const highlightedIndex = useReportStore((report: ReportState) => report.highlightedReportIndex);

    useEffect(() => {
        if (navOpen) {
            setTimeout(() => {
                closeNav();
            }, 100)
        }
    }, [selectedReportItem])

    if (!report) {
        return null;
    }

    let border = '1px dashed var(--secondary-color)'
    let background = 'var(--background-color)'
    let borderDim = '1px dashed var(--secondary-color-very-lowalpha)'
    let reverseIndex = report.reportItems.length - 1;
    let index = 0;
    const creationDate = new Date(report.reportItems[report.reportItems.length - 1].statistics.commit.date)

    const mobile = (window.innerWidth < 1000)
    let size: 'large' | 'default' | undefined = 'large';
    if (mobile) {
        size = 'default';
    }

    // 04/27/23: Had to re-write this slightly because ant design went and did some crazy stuff with their
    // timeline component and screwed me up. A warning to everyone who ever takes a dependency
    // on a tool that is not their own.
    let items: TimelineItemProps[] = []
    report.reportItems.map((item: ReportItem) => {
        const n = (
            <TimelineChangeItem
                time={item.statistics.commit.date}
                totalChanges={item.statistics.total}
                breakingChanges={item.statistics.totalBreaking}
                addedChanges={item.statistics.added}
                removedChanges={item.statistics.removed}
                modifiedChanges={item.statistics.modified}
                reverseIndex={reverseIndex}
                index={index}
            />
        )

        index++
        if (reverseIndex !== 0) {
            reverseIndex--
            let icon: JSX.Element
            let color: string
            icon = <ClockCircleOutlined/>
            color = 'var(--primary-color)'
            if (item.statistics.totalBreaking > 0) {
                icon = (<WarningFilled/>)
                color = 'var(--error-color)'
            }
            let timelineItemProps: TimelineItemProps = {
                dot: icon,
                color: color,
                className: 'timeline-change-item',
                children: n
            }
            items.push(timelineItemProps)
        } else {
            return null;
        }
    })

    return (
        <Drawer
            title="Select change"
            placement="left"
            className='potato-pete'
            closable={true}
            onClose={closeNav}
            open={navOpen}
            size={size}
            bodyStyle={{
                background: 'var(--background-color)',
                paddingLeft: '15px',
                borderRight: border,
            }}
            headerStyle={{
                background: background,
                borderRight: border,
                borderBottom: borderDim,
                height: '40px'
            }}
            mask={true}
        >
            <div className='timeline-container'>
                <ChangeChart selectedIndex={highlightedIndex}/>
                <hr/>
                <Timeline
                    pending={<span className='nav-doc-created'>Earliest Original: {creationDate.toLocaleString()}</span>}
                    pendingDot={<FileAddOutlined/>}
                    className='navigation-timeline'
                    items={items}>
                </Timeline>
            </div>
        </Drawer>
    );
}