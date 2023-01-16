import {ChangeState, NavState, ReportState, useChangeStore, useNavStore, useReportStore} from "@/model/store";
import {Button, Drawer, Statistic, Timeline} from "antd";
import React, {useContext, useEffect, useRef} from "react";
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
import {ChangeChart} from "@/components/charts/ChangeChart";
import {ReportStoreContext} from "@/OpenAPIChanges";
import {useStore} from "zustand";


export function Navigation() {

    const selectedReportItem = useReportStore((report: ReportState) => report.selectedReportItem);
    const navOpen = useNavStore((state: NavState) => state.navOpen)
    const closeNav = useNavStore((state: NavState) => state.closeNav)
    const report = useReportStore((report: ReportState) => report.report);
    const selectedIndex = useReportStore((report: ReportState) => report.selectedReportIndex);
    const highlightedIndex = useReportStore((report: ReportState) => report.highlightedReportIndex);

    useEffect(() => {
        if (navOpen) {
            setTimeout(() => {
                closeNav();
            }, 100)
        }
    }, [selectedReportItem])

    if(!report) {
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

    return (
        <Drawer
            title="Select change"
            placement="left"
            //width="400px"
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
                <ChangeChart selectedIndex={selectedIndex}/>
                <hr/>
                <Timeline pending={<span className='nav-doc-created'>Created: {creationDate.toLocaleString()}</span>}
                          pendingDot={<FileAddOutlined/>}
                          className='navigation-timeline'>
                    {report.reportItems.map((item: ReportItem) => {
                        const n = (
                            <TimelineChange reportItem={item} index={index} reverseIndex={reverseIndex} key={index}
                                            totalChanges={report.reportItems.length}/>
                        )
                        index++
                        if (reverseIndex !== 0) {
                            reverseIndex--
                            return n;
                        } else {
                            return null;
                        }
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


export interface TimelineChangeProps {
    reportItem: ReportItem
    reverseIndex: number;
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
    reverseIndex: number;
    index: number;
}

export interface TimelineChangeItemTitleProps {
    title: string;
    breaking?: boolean
}


export function TimelineChangeItem(props: TimelineChangeItemProps) {

    const setSelectedReportIndex =  useReportStore((report: ReportState) => report.setSelectedReportIndex);
    const setHighlightedReportIndex = useReportStore((report: ReportState) => report.setHighlightedReportIndex);

    const selectedReportIndex =  useReportStore((report: ReportState) => report.selectedReportIndex);
    const highlightedReportIndex =  useReportStore((report: ReportState) => report.highlightedReportIndex);

    const setSelectedReport = useReportStore((report: ReportState) => report.setSelectedReport);
    const setCurrentChange = useChangeStore((state: ChangeState) => state.setCurrentChange)
    // const  = useReportStore((report: ReportState) => report.setSelectedReport);
    const report =  useReportStore((report: ReportState) => report.report);

    let changeStats: JSX.Element
    const mobile = (window.innerWidth < 1000)
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
                title={<TimelineChangeItemTitle title='Breaking' breaking/>}
                value={props.breakingChanges}
                prefix={<WarningOutlined/>}
                valueStyle={{color: 'var(--error-font-color)'}}
            />
            <Statistic
                title={<TimelineChangeItemTitle title='Total'/>}
                value={props.totalChanges}
            />
        </div>)
    } else {
        changeStats = (<div className='nav-change-statistics'>
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
        </div>)
    }
    if (!report) {
        return <div>no report</div>
    }

    return (
        <div
            className={(highlightedReportIndex == props.reverseIndex) ? 'nav-change-container-active' : 'nav-change-container'}
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

export function TimelineChangeItemTitle(props: TimelineChangeItemTitleProps) {
    return (
        <span
            className={props.breaking ?
                'timeline-change-stat-title-breaking' : 'timeline-change-stat-title'}>{props.title}</span>
    )
}