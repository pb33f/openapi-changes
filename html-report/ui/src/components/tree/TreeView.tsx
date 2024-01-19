// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import Tree from "antd/es/tree";
import React from "react";
import {useCallback, useRef, useState} from "react";
import {DownOutlined, EditOutlined, MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {EditorComponent} from "@/components/editor/Editor";
import {Allotment} from "allotment";
import {BeefyTreeNode} from "@/model/beefy-tree-node";
import {ChangeState, EditorState, ReportState, useChangeStore, useEditorStore, useReportStore} from "@/model/store";
import {GoDiff} from "react-icons/go";
import {CheckPropIsVerb, Verb} from "@/components/verb/Verb";
import {TreeTitleNode} from "@/components/tree/TreeTitle";
import {OriginalModifiedCols} from "@/components/drawer/OriginalModifiedCols";
import {ChangeTitleComponent} from "@/components/drawer/ChangeTitle";

const {DirectoryTree} = Tree;

const visitNode = (node: BeefyTreeNode) => {

    let title = node.titleString;
    if (title == undefined) {
        title = ''
    }
    if (node.change) {
        if (node?.change?.new != undefined) {
            title = title + ": " + node?.change?.new;
        }
        if (title?.length > 40) {
            title = node.titleString;
        }
    }

    node.title = <TreeTitleNode
        breaking={node.change?.breaking}
        title={title}
        totalChanges={node.totalChanges}
        breakingChanges={node.breakingChanges}
        change={node.change}
    />
    if (node.children) {
        for (let x = 0; x < node.children.length; x++) {
            visitNode(node.children[x])
        }
    } else {
        if (node.change) {
            let className = ''
            if (node.change.breaking) {
                className = 'breaking-change'
            }
            switch (node.change.change) {
                case 1:
                    node.icon = <EditOutlined className={className}/>
                    break;
                case 2:
                    node.icon = <PlusSquareOutlined className={className}/>
                    break;
                case 3:
                    node.icon = <PlusSquareOutlined className={className}/>
                    break;
                case 4:
                    node.icon = <MinusSquareOutlined className={className}/>
                    break;
                case 5:
                    node.icon = <MinusSquareOutlined className={className}/>
                    break;
            }
        }
    }
    if (CheckPropIsVerb(node.titleString)) {
        if (node.children) {
            node.title = <Verb method={node.titleString} className={'tree-verb'}/>
        } else {
            node.title = <Verb method={node.titleString} className={'tree-verb'} disabled={true}/>
        }
    }
}


export function TreeViewComponent() {
    const selectedReport = useReportStore((report: ReportState) => report.selectedReportItem);
    const treeData: BeefyTreeNode[] | undefined = selectedReport?.tree;
    const sbs = useEditorStore((editor: EditorState) => editor.sideBySide);
    const setSbs = useEditorStore((editor: EditorState) => editor.setSideBySide);
    const treeRef = useRef<any>();
    const currentChange = useChangeStore((state: ChangeState) => state.currentChange);
    const setCurrentChange = useChangeStore((state: ChangeState) => state.setCurrentChange);
    const selectedKeysInState = useChangeStore((state: ChangeState) => state.selectedChangeKeys);
    const setSelectedKeysInState = useChangeStore((state: ChangeState) => state.setSelectedChangeKeys);
    const setExpandedKeys = useChangeStore((state: ChangeState) => state.setExpandedChangeKeys);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const lookupMap = useChangeStore((state: ChangeState) => state.treeMapLookup)
    const [height, setHeight] = useState(0);

    if (treeData) {
        visitNode(treeData[0])
    }

    const onExpand = (expandedKeysValue: React.Key[], info: any) => {
        setExpandedKeys(expandedKeysValue);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        if (info.node.change) {
            setSelectedKeys(selectedKeysValue);
            setSelectedKeysInState(selectedKeysValue)
            setCurrentChange(info.node.change);
        }
    };

    const treeContainer = useCallback((node: any) => {
        if (window.innerWidth < 1000 && sbs) {
            setSbs(false)
        }
        let lookupKey: String | undefined;
        if (selectedKeys.toString() !== selectedKeysInState.toString()) {
            if (typeof selectedKeysInState[0] === 'string') {
                lookupKey = lookupMap.get(selectedKeysInState[0])
                if (lookupKey) {
                    // @ts-ignore
                    setSelectedKeys([lookupKey]);
                }
            }
        }
        if (node !== null) {
            if (height != node.getBoundingClientRect().height) {
                setHeight(node.getBoundingClientRect().height)
            }
        }
        if (lookupKey && treeRef) {
            treeRef.current.scrollTo({key: lookupKey, align: 'top'})
        }
    }, []);

    let change: JSX.Element | undefined;
    if (currentChange) {
        change = <OriginalModifiedCols className='treeview-origmod-cols' change={currentChange}/>
    }

    let unselectedView = (<section className='tree-nothing-selected'>
        <div className='nothing-selected-icon'>
            <span className='icon'><GoDiff/></span><br/>
            Select a change from the tree.
        </div>
    </section>);

    let selectedView = (<section className='tree-selected-change'>
            <div className={currentChange?.breaking ? 'change-details change-details-breaking' : 'change-details'}>
                <ChangeTitleComponent/>
            </div>
            {change}
            <div className='diff-view'>
                <EditorComponent sideBySideEditor={sbs} currentChange={currentChange}/>
            </div>
        </section>
    )

    let view = unselectedView
    if (currentChange) {
        view = selectedView;
    }

    if (!treeData) {
        return <span>no tree data, there were no changes detected in this commit.</span>
    }
    let mobile = (window.innerWidth < 1000);
    if (!mobile) {
        return (
            <div className='tree-holder'>
                <Allotment minSize={200}>
                    <Allotment.Pane preferredSize={450}>
                        <div className='tree-scroller' ref={treeContainer}>
                            <DirectoryTree
                                showIcon
                                ref={treeRef}
                                rootClassName="tree"
                                showLine
                                icon={null}
                                virtual={false}
                                switcherIcon={<DownOutlined/>}
                                defaultExpandAll
                                onExpand={onExpand}
                                onSelect={onSelect}
                                selectedKeys={selectedKeys}
                                treeData={treeData}
                            />
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        {view}
                    </Allotment.Pane>
                </Allotment>
            </div>
        )
    } else {
        return (
            <section className='mobile-tree'>
                <div className='tree-holder'>
                    <div className='tree-scroller' ref={treeContainer}>
                        <Tree
                            showIcon
                            ref={treeRef}
                            rootClassName="tree"
                            showLine
                            switcherIcon={<DownOutlined/>}
                            defaultExpandAll
                            onExpand={onExpand}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                            treeData={treeData}
                        />
                    </div>
                </div>
                {view}
            </section>
        )
    }
}
