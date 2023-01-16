import React from "react";
import {Col, Drawer, Row} from "antd";
import {ChangeState, DrawerState, EditorState, useChangeStore, useDrawerStore, useEditorStore} from "@/model/store";
import {EditorComponent} from "@/components/editor/Editor";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {WarningFilled} from "@ant-design/icons";
import {CheckPropIsVerb, Verb} from "@/components/verb/Verb";
import './Drawer.css';
import {Change} from "@/model";

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
        <>
            <Drawer
                title={<ChangeTitleComponent/>}
                placement="bottom"
                height="400px"
                closable={true}
                onClose={toggleDrawer}
                open={drawerOpen}
                bodyStyle={{background: 'var(--background-color)', padding: '0 5px 0 5px'}}
                headerStyle={{
                    background: headerBackground,
                    borderTop: headerBorder,
                    height: '30px'
                }}
                mask={false}
            >
                {change}
                <EditorComponent currentChange={currentChange} height="320px" sideBySideEditor={sbs}/>
            </Drawer>
        </>
    );
}


export interface OriginalModifiedColsProps {
    change: Change
    className?: string;
}

export const OriginalModifiedCols: React.FC<OriginalModifiedColsProps> = (props: OriginalModifiedColsProps) => {

    let origLine: JSX.Element;
    if (props.change.context.originalLine) {
        origLine = (
            <span className="orig-col">
                <strong>Original</strong> Specification
                (line: <span
                className='linenumber-highlight'>{props.change.context.originalLine}</span>, col: {props.change.context.originalColumn})
            </span>)
    } else {
        origLine = (<span className="orig-col">(Not available in original specification)</span>)
    }

    let modLine: JSX.Element;
    if (props.change.context.newLine) {
        modLine = (
            <span className="mod-col">
                <strong>Modified</strong> Specification (line: <span
                className='linenumber-highlight'>{props.change.context.newLine}</span>, col: {props.change.context.newColumn}))
            </span>)
    } else {
        modLine = (<span className="mod-col" >(Not available in modified specification)</span>)
    }

    return (
        <Row className={props.className ? props.className : 'original-modified-container'}>
            <Col span={12}>{origLine}</Col>
            <Col span={12}>{modLine}</Col>
        </Row>
    )
}

export const ChangeTitleComponent = () => {

    const truncate = (str: string): string => {
        if (str?.length > 50) {
            return str.substring(0, 40) + '...';
        }
        return str
    }

    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)
    let changeIcon = <VscEdit className='drawer-title-icon'/>
    let changeType = "modified"
    let changeProperty: JSX.Element | null
    let originalVal: any = ""
    let newVal: any = ""
    originalVal = currentChange?.original;
    newVal = currentChange?.new;

    changeProperty = (
        <span>
            <span className='property-word'>{currentChange?.property}</span>&nbsp;
            <span className='fill-word'>changed from</span>&nbsp;'<span
            className='original-change-value'>{truncate(originalVal)}</span>'&nbsp;
            <span className='fill-word'>to</span> '<span className='new-change-value'>{truncate(newVal)}</span>'
        </span>
    );

    switch (currentChange?.change) {
        case 2:
            changeType = "property added";
            changeIcon = <VscDiffAdded className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.new ? currentChange?.new : ''}</span>&nbsp;
                    <span className='fill-word'>to</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 3:
            changeType = "object added";
            changeIcon = <VscDiffAdded className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.new ? currentChange?.new : ''}</span>&nbsp;
                    <span className='fill-word'>to</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 4:
            changeType = "object removed";
            changeIcon = <VscDiffRemoved className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.original}</span>&nbsp;
                    <span className='fill-word'>from</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
        case 5:
            changeType = "property removed"
            changeIcon = <VscDiffRemoved className='drawer-title-icon'/>
            changeProperty = (
                <span>
                    <span className='original-change-value'>{currentChange?.original}</span>&nbsp;
                    <span className='fill-word'>from</span> <span
                    className='new-change-value'>{currentChange?.property}</span>
                </span>);
            break;
    }

    let breaking: JSX.Element | null = null;
    if (currentChange?.breaking) {
        breaking = (
            <div className="drawer-breaking-icon-container">
                <span className='drawer-breaking-icon-title'>breaking</span>
                <WarningFilled className="drawer-breaking-icon"/>
            </div>
        )
    }

    if (CheckPropIsVerb(currentChange?.property)) {
        changeProperty = <Verb method={currentChange?.property}/>
    }

    if (currentChange) {
        return (
            <section className='drawer-title'>
                {changeIcon} <span
                className={CheckPropIsVerb(currentChange?.property) ? 'drawer-title-property-verb' : 'drawer-title-property'}>{changeType}:&nbsp;
                <span className="drawer-title-changed">{changeProperty}</span>
            </span>
                {breaking}
            </section>
        )
    } else {
        return null;
    }
}