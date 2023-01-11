import {NavState, useNavStore} from "@/model/store";
import {Button, Drawer, Timeline} from "antd";
import React from "react";
import {ChangeTitleComponent} from "@/components/change_view/Drawer";
import {ClockCircleOutlined, WarningFilled} from "@ant-design/icons";

import './Navigation.css';
export function Navigation() {
    const navOpen = useNavStore((state: NavState) => state.navOpen)
    const closeNav = useNavStore((state: NavState) => state.closeNav)

    let border = '1px dashed var(--secondary-color)'
    let background = 'var(--background-color)'
    let borderDim = '1px dashed var(--secondary-color-very-lowalpha)'

    return (
        <Drawer
            title="Select change"
            placement="left"
            width="400px"
            closable={true}
            onClose={closeNav}
            open={navOpen}
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
            <Timeline>
                <Timeline.Item  dot={<WarningFilled />} color="red">
                    <TimelineChange time='tomorrow' totalChanges={2} breakingChanges={4} changeId='pizza' />
                </Timeline.Item>
            </Timeline>
        </div>


        </Drawer>
    )


}

export interface TimelineChangeProps {
    time: string;
    totalChanges: number;
    breakingChanges: number;
    changeId: string
}

export function TimelineChange(props: TimelineChangeProps) {

    return (
    <div>
            <span>{props.time}</span><br/>
            <span>changes: {props.totalChanges}</span>
    </div>
    )


}