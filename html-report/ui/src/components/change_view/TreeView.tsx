

import type {DataNode, TreeProps } from 'antd/es/tree';
import treeNodes from './tree.json';
import Tree from "antd/es/tree";
import {useState, useRef, useEffect} from "react";
import {Badge, Col, Row} from "antd";
import * as React from "react";
import {DownOutlined, EditOutlined, MinusSquareOutlined, PlusSquareOutlined, SmileOutlined} from "@ant-design/icons";
import {Change} from "../../Flow";
import * as monaco from 'monaco-editor';


// @ts-ignore
window.self.MonacoEnvironment = {
    getWorkerUrl: function (_moduleId: any, label: string) {
        if (label === 'json') {
            return './json.worker.bundle.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './css.worker.bundle.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
};



interface BeefyTreeNode extends DataNode {totalChanges?: number, breakingChanges?: number, titleString?: string, change?:Change}
const treeData: BeefyTreeNode[] = [treeNodes]

const visitNode = (node: BeefyTreeNode) => {
    node.title = <TitleNode breaking={node.change?.breaking} title={node.titleString} totalChanges={node.totalChanges} breakingChanges={node.breakingChanges} />
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


const TitleNode = (props: any) => {
    return (
        <Badge count={props.totalChanges} size="small" offset={[10, 0]} style={{ borderColor: 'transparent',
            background: 'none', color: 'var(--secondary-color)'}}>
            <span className={props.breaking ? 'breaking-change tree-title' : 'tree-title'}>{props.title}</span>
        </Badge>
    )
}

const { DirectoryTree } = Tree;

export const TreeViewComponent = () => {


    visitNode(treeData[0])

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['root']);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const onExpand = (expandedKeysValue: React.Key[], info: any) => {
       // console.log('onExpand', info.node);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };


    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
       //console.log('onSelect', info.node.change);
        setSelectedKeys(selectedKeysValue);
    };

    return (
        <Row>
            <Col span={10}>
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
            </Col>
            <Col span={14}>
               <Editor />
            </Col>
        </Row>
    );
}

export const Editor: React.FC = () => {
    const divEl = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;
    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
                language: 'typescript'
            });
        }
        return () => {
            editor.dispose();
        };
    }, []);
    return <div className="Editor" ref={divEl}></div>;
};