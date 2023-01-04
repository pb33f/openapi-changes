import Tree from "antd/es/tree";
import data from '../../../data.json'
import * as React from "react";
import {useEffect, useState} from "react";
import {Badge} from "antd";
import {DownOutlined, EditOutlined, MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {EditorComponent} from "./Editor";
import {Allotment} from "allotment";
import {BeefyTreeNode} from "@/model/beefy-tree-node";
import {ChangeState, DrawerState, useChangeStore, useDrawerStore} from "@/model/store";

const treeData: BeefyTreeNode[] = [data.tree]

const visitNode = (node: BeefyTreeNode) => {
    node.title = <TreeTitleNode
        breaking={node.change?.breaking}
        title={node.titleString}
        totalChanges={node.totalChanges}
        breakingChanges={node.breakingChanges} />
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
                    node.icon = <EditOutlined className={className} />
                    break;
                case 2:
                    node.icon = <PlusSquareOutlined  className={className}/>
                    break;
                case 3:
                    node.icon = <PlusSquareOutlined  className={className}/>
                    break;
                case 4:
                    node.icon = <MinusSquareOutlined  className={className}/>
                    break;
                case 5:
                    node.icon = <MinusSquareOutlined  className={className}/>
                    break;
            }
        }
    }
}

export interface TreeTitleNodeProps {
    totalChanges: number | undefined;
    breakingChanges: number | undefined;
    title: string | undefined;
    breaking: boolean | undefined;
}
const TreeTitleNode = (props: TreeTitleNodeProps) => {
    return (
        <Badge count={props.totalChanges} size="small" offset={[10, 0]}
               style={{ borderColor: 'transparent', background: 'none', color: 'var(--secondary-color)'}}>
            <span className={props.breaking ? 'breaking-change tree-title' : 'tree-title'}>{props.title}</span>
        </Badge>
    )
}

export const TreeViewComponent = () => {
    visitNode(treeData[0])

    const currentChange = useChangeStore((state: ChangeState) => state.currentChange)
    const setCurrentChange = useChangeStore((state: ChangeState) => state.setCurrentChange)
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['root']);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const onExpand = (expandedKeysValue: React.Key[], info: any) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        setSelectedKeys(selectedKeysValue);
        setCurrentChange(info.node.change);
    };

    return (
        <div className='tree-holder'>
                <Allotment minSize={100}>
                    <Allotment.Pane preferredSize={450}>
                        <div className='tree-scroller'>
                            <Tree
                                showIcon
                                rootClassName="tree"
                                showLine
                                switcherIcon={<DownOutlined />}
                                defaultExpandAll
                                onExpand={onExpand}
                                onSelect={onSelect}
                                selectedKeys={selectedKeys}
                                treeData={treeData}
                            />
                        </div>

                    </Allotment.Pane>
                    <Allotment.Pane>
                        <div className='diff-view'>
                            <EditorComponent currentChange={currentChange} />
                        </div>
                    </Allotment.Pane>
                </Allotment>
        </div>
    )
}