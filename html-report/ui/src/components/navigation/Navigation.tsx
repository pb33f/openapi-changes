import {NavState, ReportState, useNavStore, useReportStore} from "@/model/store";
import {Button, Drawer, Statistic, Timeline} from "antd";
import React from "react";
import {
    ArrowUpOutlined, ClockCircleOutlined,
    EditOutlined, FileAddOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    WarningFilled,
    WarningOutlined
} from "@ant-design/icons";

import './Navigation.css';
import {ReportItem} from "@/model/report";
import {ChangeChart} from "@/components/navigation/ChangeChart";


export function Navigation() {
    const navOpen = useNavStore((state: NavState) => state.navOpen)
    const closeNav = useNavStore((state: NavState) => state.closeNav)
    const report = useReportStore((report: ReportState) => report.report);
    const selectedIndex =  useReportStore((report: ReportState) => report.selectedReportIndex);

    let border = '1px dashed var(--secondary-color)'
    let background = 'var(--background-color)'
    let borderDim = '1px dashed var(--secondary-color-very-lowalpha)'
    let index = 0;

    const creationDate = new Date(report.reportItems[report.reportItems.length - 1].statistics.commit.date)

    return (
        <Drawer
            title="Select change"
            placement="left"
            //width="400px"
            closable={true}
            onClose={closeNav}
            open={navOpen}
            size='large'
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
                <ChangeChart selectedIndex={selectedIndex}/>
                <hr/>
                <Timeline pending={<span className='nav-doc-created'>Created: {creationDate.toLocaleString()}</span>}
                          pendingDot={<FileAddOutlined/>}
                          className='navigation-timeline'>
                    {report.reportItems.map((item: ReportItem) => {
                    const n = (
                        <TimelineChange reportItem={item} index={index} key={index}
                                               totalChanges={report.reportItems.length}/>
                    )
                    index++
                    return n
                })}
                </Timeline>
            </div>

        </Drawer>
    )


}


export function TimelineChange(props: TimelineChangeProps) {
    const reportItem = props.reportItem;

    let icon = (<ClockCircleOutlined/>)
    let color = 'var(--primary-color)'
    if (reportItem.statistics.totalBreaking > 0) {
        icon = (<WarningFilled/>)
        color = 'var(--error-color)'
    }
    if (props.index == props.totalChanges - 1) {
        return null;
    }
    return (<Timeline.Item dot={icon} color={color} className='timeline-change-item'><TimelineChangeItem
        time={reportItem.statistics.commit.date}
        totalChanges={reportItem.statistics.total}
        breakingChanges={reportItem.statistics.totalBreaking}
        addedChanges={reportItem.statistics.added}
        removedChanges={reportItem.statistics.removed}
        modifiedChanges={reportItem.statistics.modified}
        index={props.index}/></Timeline.Item>)
}


export interface TimelineChangeProps {
    reportItem: ReportItem
    index: number;
    totalChanges: number;
}

export interface TimelineChangeItemProps {
    time: string;
    totalChanges: number;
    breakingChanges: number;
    addedChanges: number;
    removedChanges: number;
    modifiedChanges: number;
    index: number;
}

export interface TimelineChangeItemTitleProps {
    title: string;
    breaking?: boolean
}

export function TimelineChangeItem(props: TimelineChangeItemProps) {
    const setSelectedReportIndex = useReportStore((report: ReportState) => report.setSelectedReportIndex);
    return (
        <div className='nav-change-container' onClick={() => { setSelectedReportIndex(props.index)}}>
            <span className='nav-change-date'>{new Date(props.time).toLocaleString()}</span>
            <div className='nav-change-statistics'>
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
                    title={<TimelineChangeItemTitle title='Breaking' breaking/>}
                    value={props.breakingChanges}
                    prefix={<WarningOutlined/>}
                    valueStyle={{color: 'var(--error-font-color)'}}
                />
                <Statistic
                    title={<TimelineChangeItemTitle title='Total'/>}
                    value={props.totalChanges}
                />
            </div>
        </div>
    )
}

export function TimelineChangeItemTitle(props: TimelineChangeItemTitleProps) {
    return (
        <span
            className={props.breaking ?
                'timeline-change-stat-title-breaking' : 'timeline-change-stat-title'}>{props.title}</span>
    )
}