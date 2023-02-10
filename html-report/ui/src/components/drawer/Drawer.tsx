// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import React from "react";
import {Drawer} from "antd";
import {ChangeState, DrawerState, EditorState, useChangeStore, useDrawerStore, useEditorStore} from "@/model/store";
import {EditorComponent} from "@/components/editor/Editor";
import {OriginalModifiedCols} from "@/components/drawer/OriginalModifiedCols";
import {ChangeTitleComponent} from "@/components/drawer/ChangeTitle";
import './Drawer.css';

export interface DrawerProps {
    open?: boolean;
}

export const DrawerComponent = (props: DrawerProps) => {
    const drawerOpen = useDrawerStore((state: DrawerState) => state.drawerOpen)
    const toggleDrawer = useDrawerStore((state: DrawerState) => state.toggleDrawer)
    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)
    let sbs = useEditorStore((editor: EditorState) => editor.sideBySide);
    let headerBorder = '1px dashed var(--secondary-color)'
    let headerBackground = 'var(--background-color)'
    if (currentChange?.breaking) {
        headerBorder = '1px dashed var(--error-color)'
        headerBackground = 'var(--error-color-verylowalpha)'
    }

    let change: JSX.Element | undefined;
    if (currentChange) {
        change = <OriginalModifiedCols change={currentChange}/>
    }

    const mobile = (window.innerWidth < 1000)
    if (mobile) {
        sbs = false;
    }

    return (
        <Drawer
            title={<ChangeTitleComponent/>}
            placement="bottom"
            height="385px"
            closable={true}
            onClose={toggleDrawer}
            open={drawerOpen}
            bodyStyle={{background: 'var(--background-color)', padding: '0 5px 0 5px'}}
            headerStyle={{
                background: headerBackground,
                borderTop: headerBorder,
                height: '30px'
            }}
            mask={false}>
            {change}
            <EditorComponent currentChange={currentChange} height="320px" sideBySideEditor={sbs}/>
        </Drawer>
    );
}