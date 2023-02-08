import React, {useContext} from "react";
import './Header.css'
import {Button} from "antd";
import {DrawerState, NavState, ReportState, useDrawerStore, useNavStore, useReportStore} from "@/model/store";
import {FieldTimeOutlined} from "@ant-design/icons";
import {Navigation} from "@/components/navigation/Navigation";
import {ReportStoreContext} from "@/OpenAPIChanges";
import {useStore} from "zustand";


export const Header = () => {
    const toggleNav = useNavStore((state: NavState) => state.openNav)
    const closeDrawer = useDrawerStore((state: DrawerState) => state.closeDrawer)
    const report = useReportStore((state: ReportState) => state.report)

    const navButtonClicked = () => {
        closeDrawer()
        toggleNav()
    }

    const mobile = (window.innerWidth < 1000);
    let style = {};
    if (!mobile) {
        // style = {
        //     fontSize: '16px',
        //     height: '40px',
        // }
    }
    if (!report) {
        return (<header>no report</header>)
    }

    let button: JSX.Element;
    if (report.reportItems.length > 2) {
      button = <Button style={style}
                       size={mobile? 'small' : 'middle'}
                       ghost
                       type='primary'
                       icon={<FieldTimeOutlined style={{fontSize: '1em'}}/>}
                       onClick={navButtonClicked}>Timeline</Button>
    } else {
        button = (<span></span>);
    }

    return (
        <header>
            {button}
            <a href="https://github.com/pb33f/openapi-changes">
                OpenAPI changes report
            </a>
            <span className='report-generated'>Report Generated: {new Date(report.dateGenerated).toLocaleString()}</span>
            <Navigation/>
        </header>
    )
}
