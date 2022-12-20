import React, {useState} from "react";
import {Col, Drawer, Row} from "antd";
import PieChart from "../charts/Pie";
import {ReportSummary} from "../report_statistics/ReportSummary";
import {Data} from "../report_statistics";
import {DrawerState, useChangeStore} from "../../App";


export interface DrawerProps {
    open?: boolean;
}

export const DrawerComponent = (props: DrawerProps) => {

    const drawerOpen = useChangeStore((state: DrawerState) => state.drawerOpen)
    const toggleDrawer = useChangeStore((state: DrawerState) => state.toggleDrawer)

    return(
        <>
            <Drawer
                title="Change Details"
                placement="bottom"
                closable={true}
                onClose={toggleDrawer}
                open={drawerOpen}
                bodyStyle={{background: 'var(--background-color)'}}
                headerStyle={{background: 'var(--background-color-alpha)', border: '1px dashed var(--secondary-color)'}}
                mask={false}
            >
                <p>Data in here.</p>
            </Drawer>
        </>
    );
}