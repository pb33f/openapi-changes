import React, {useContext} from "react";
import './Header.css'
import {Button} from "antd";
import {DrawerState, NavState, ReportState, useDrawerStore, useNavStore} from "@/model/store";
import {FieldTimeOutlined} from "@ant-design/icons";
import {Navigation} from "@/components/navigation/Navigation";
import {ReportStoreContext} from "@/OpenAPIChanges";
import {useStore} from "zustand";


export const Header = () => {
    const toggleNav = useNavStore((state: NavState) => state.openNav)
    const closeDrawer = useDrawerStore((state: DrawerState) => state.closeDrawer)
    const store = useContext(ReportStoreContext)
    const report = useStore(store, (state: ReportState) => state.report)

    const navButtonClicked = () => {
        closeDrawer()
        toggleNav()
    }

    const mobile = (window.innerWidth < 1000);
    let fontSize = '16px';
    let style = {};
    if (!mobile) {
        style = {
            fontSize: '16px',
            height: '40px',
        }
    }
    return (
        <header>
            <Button style={style}
                    size={mobile? 'small' : 'large'}
                    ghost={true}
                    type='primary'
                    icon={<FieldTimeOutlined style={{fontSize: '1em'}}/>}
                    onClick={navButtonClicked}>Timeline</Button>
            <a href="https://github.com/pb33f/openapi-changes">
                OpenAPI changes report
            </a>
            <span className='report-generated'>Report Generated: {new Date(report.dateGenerated).toLocaleString()}</span>
            <Navigation/>
        </header>
    )
}
