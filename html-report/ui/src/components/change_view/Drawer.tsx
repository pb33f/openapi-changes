import React from "react";
import {Drawer} from "antd";
import {ChangeState, DrawerState, useChangeStore, useDrawerStore} from "@/model/store";


export interface DrawerProps {
    open?: boolean;
}

export const DrawerComponent = (props: DrawerProps) => {
    const drawerOpen = useDrawerStore((state: DrawerState) => state.drawerOpen)
    const toggleDrawer = useDrawerStore((state: DrawerState) => state.toggleDrawer)
    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)

    return(
        <>
            <Drawer
                title={currentChange?.property}
                placement="bottom"
                closable={true}
                onClose={toggleDrawer}
                open={drawerOpen}
                bodyStyle={{background: 'var(--background-color)'}}
                headerStyle={{background: 'var(--background-color-alpha)', border: '1px dashed var(--secondary-color)'}}
                mask={false}
            >
                <p>{currentChange?.new}</p>
            </Drawer>
        </>
    );
}