import {NavState, ReportState, useNavStore, useReportStore} from "@/model/store";
import {Drawer, Timeline} from "antd";
import React, {useEffect} from "react";
import {FileAddOutlined} from "@ant-design/icons";
import {ReportItem} from "@/model/report";
import {ChangeChart} from "@/components/charts/ChangeChart";
import {TimelineChange} from "@/components/navigation/TimelineChange";
import './Navigation.css';

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
                <Timeline pending={<span className='nav-doc-created'>Earliest Original: {creationDate.toLocaleString()}</span>}
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