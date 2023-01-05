import React from "react";
import {Col, Drawer, Row} from "antd";
import {ChangeState, DrawerState, useChangeStore, useDrawerStore} from "@/model/store";
import {EditorComponent} from "@/components/change_view/Editor";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {WarningFilled} from "@ant-design/icons";
import {CheckPropIsVerb, Verb} from "@/components/change_view/Verb";
import './Drawer.css';



export interface DrawerProps {
    open?: boolean;
}


export const DrawerComponent = (props: DrawerProps) => {
    const drawerOpen = useDrawerStore((state: DrawerState) => state.drawerOpen)
    const toggleDrawer = useDrawerStore((state: DrawerState) => state.toggleDrawer)
    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)

    let headerBorder = '1px dashed var(--secondary-color)'
    let headerBackground = 'var(--background-color)'
    if (currentChange?.breaking) {
        headerBorder = '1px dashed var(--error-color)'
        headerBackground = 'var(--error-color-verylowalpha)'
    }

    return(
        <>
            <Drawer
                title={<DrawerTitleComponent/>}
                placement="bottom"
                height="400px"
                closable={true}
                onClose={toggleDrawer}
                open={drawerOpen}
                bodyStyle={{background: 'var(--background-color)'}}
                headerStyle={{
                    background: headerBackground,
                    border: headerBorder,
                    height: '30px'}}
                mask={false}
            >

                <Row className='original-modified-container'>
                    <Col span={12}>{currentChange?.context.originalLine ?
                        'Original Specification (' + currentChange.context.originalLine+':'
                        + currentChange.context.originalColumn + ')' : '(Not present in original specification)'}</Col>
                    <Col span={12}>{currentChange?.context.newLine ?
                        'Modified Specification(' + currentChange.context.newLine+':'
                        + currentChange.context.newColumn + ')' : '(Removed from modified specification)'}</Col>
                </Row>

                <EditorComponent currentChange={currentChange} height="320px"/>
            </Drawer>
        </>
    );
}




export const DrawerTitleComponent = () => {

    const truncate = (str: string): string => {
        if (str?.length > 50) {
            return str.substring(0, 50) + '...';
        }
        return str
    }

    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)
    let changeIcon = <VscEdit className='drawer-title-icon'/>
    let changeType = "modified"
    let changeProperty: JSX.Element | null
    let originalVal:any = ""
    let newVal:any = ""
    originalVal = currentChange?.original;
    newVal = currentChange?.new;


    changeProperty = (
        <span>
            <span className='property-word'>{currentChange?.property}</span> <span className='fill-word'>changed from</span>&nbsp;'<span className='original-change-value'>{truncate(originalVal)}</span>'&nbsp;
            <span className='fill-word'>to</span> '<span className='new-change-value'>{truncate(newVal)}</span>'
        </span>
    );



    switch (currentChange?.change) {
        case 2:
            changeType = "property added";
            changeIcon = <VscDiffAdded className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.new ? currentChange?.new : '' }</span>&nbsp;
                    <span className='fill-word'>to</span> <span className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 3:
            changeType = "object added";
            changeIcon = <VscDiffAdded className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.new ? currentChange?.new : '' }</span>&nbsp;
                    <span className='fill-word'>to</span> <span className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 4:
            changeType = "object removed";
            changeIcon = <VscDiffRemoved className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.original}</span>&nbsp;
                    <span className='fill-word'>from</span> <span className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 5:
            changeType = "property removed"
            changeIcon = <VscDiffRemoved className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.original}</span>&nbsp;
                    <span className='fill-word'>from</span> <span className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
    }

    let breaking: JSX.Element | null = null;
    if (currentChange?.breaking) {
        breaking = (
            <div className="drawer-breaking-icon-container">
                <span className='drawer-breaking-icon-title'>[ breaking change ]</span>
                <WarningFilled className="drawer-breaking-icon"/>
            </div>
        )
    }

    if (CheckPropIsVerb(currentChange?.property)) {
        changeProperty = <Verb method={currentChange?.property}/>
    }


    return (
        <section className='drawer-title'>
            {changeIcon} <span className='drawer-title-property'>{changeType}:&nbsp;
                <span className="drawer-title-changed">{changeProperty}</span>
            </span>
            {breaking}
        </section>
    )
}