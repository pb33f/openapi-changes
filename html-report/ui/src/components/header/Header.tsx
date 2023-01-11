import React from "react";
import './header.css'
import {Button} from "antd";
import {DrawerState, NavState, useDrawerStore, useNavStore} from "@/model/store";
import {FieldTimeOutlined} from "@ant-design/icons";
import {Navigation} from "@/components/navigation/Navigation";


export const Header = () => {

    const toggleNav = useNavStore((state: NavState) => state.openNav)
    const closeDrawer = useDrawerStore((state: DrawerState) => state.closeDrawer)

    const navButtonClicked = () => {
        closeDrawer()
        toggleNav()
    }


    return (
        <header>
            <Button style={{
                fontSize: '16px',
                height: '40px',
            }}
                    size='large'
                    ghost={true}
                    type='primary'
                    icon={<FieldTimeOutlined style={{fontSize: '1em'}}/>}
                    onClick={navButtonClicked}>Timeline</Button>
            <a href="https://github.com/pb33f/openapi-changes">
                OpenAPI changes report
            </a>
            <Navigation/>
        </header>
    )
}
