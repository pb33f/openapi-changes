import React from 'react';
import './variables.css';
import "allotment/dist/style.css";
import './App.css';
import {Col, ConfigProvider, Row, Tabs, theme} from 'antd';
import {Header} from "./components/header";
import {ReportContainer} from "./components/report_statistics";
import {GraphViewComponent} from "./components/change_view/GraphView";
import {TreeViewComponent} from "./components/change_view/TreeView";
import {ChangeState, DrawerState, useChangeStore, useDrawerStore} from "@/model/store";


import data from '../data.json'
import {BeefyTreeNode} from "@/model";

import {NodeData} from "reaflow";

const treeData: BeefyTreeNode[] = [data.tree]
const graphData: NodeData[]  = data.graph.nodes

interface TreeGraphMap {
    treeNode: BeefyTreeNode;
    graphNode: NodeData | null;
}


export function Rap() {
    console.log('smash  the system.');
    return (<div>This is a test</div>)
}

function App() {
    const closeDrawer = useDrawerStore((state: DrawerState) => state.closeDrawer)

    const nodeMap: Map<String, TreeGraphMap> = new Map<String, TreeGraphMap>();
    const lookupMap = useChangeStore((state: ChangeState) => state.treeMapLookup)

    const hash = (str: string): string => {
        str = str.toLowerCase();
        let hash = 0, i, chr;
        if (str.length === 0) return hash.toString();
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }

    const lookAtTree = (node: BeefyTreeNode) => {
        if (node.change) {

            let nodeId = node.change.property;
            if (node.change.original)
                nodeId += node.change.original;
            if (node.change.new)
                nodeId += node.change.new;
            if (node.change.context.newLine)
                nodeId += node.change.context.newLine;
            if (node.change.context.newColumn)
                nodeId += node.change.context.newColumn;
            if (node.change.context.originalLine)
                nodeId += node.change.context.originalLine;
            if (node.change.context.originalColumn)
                nodeId += node.change.context.originalColumn;

            nodeMap.set(hash(nodeId), {treeNode: node, graphNode: null})
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach((child: BeefyTreeNode) => {
                lookAtTree(child);
            });
        }
    }

    treeData.forEach((btn: BeefyTreeNode) => {
        lookAtTree(btn);
    })
    graphData.forEach((node: NodeData) => {
        if (node.data) {

            let nodeId = node.data.property;
            if (node.data.original)
                nodeId += node.data.original;
            if (node.data.new)
                nodeId += node.data.new;
            if (node.data.context.newLine)
                nodeId += node.data.context.newLine;
            if (node.data.context.newColumn)
                nodeId += node.data.context.newColumn;
            if (node.data.context.originalLine)
                nodeId += node.data.context.originalLine;
            if (node.data.context.originalColumn)
                nodeId += node.data.context.originalColumn;

            const hashedId = hash(nodeId);
            let tmn = nodeMap.get(hashedId)
            if (tmn) {
                tmn.graphNode = node;
            }
        }
    })


    nodeMap.forEach((item, key) => {
        if (item.graphNode && item.treeNode && item.treeNode.key) {
            if (typeof item.treeNode.key === 'string') {
                lookupMap.set(item.graphNode?.id, item.treeNode.key)
            }
        }
    })


    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    fontFamily: 'var(--font-stack)',
                    fontSize: 14,
                    colorPrimary: 'rgba(98, 196, 255, 1.0)',
                    colorPrimaryActive: 'orange',
                },
            }}
        >
            <div id="main_container">
                <section className="report-header">
                    <Row>
                        <Col span={24}>
                            <Header/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col span={24}>
                            <ReportContainer/>
                        </Col>
                    </Row>
                    <hr/>
                </section>
                <Row>
                    <Col span={24}>

                        <Tabs
                            destroyInactiveTabPane={true}
                            defaultActiveKey="1"
                            type="card"
                            onChange={closeDrawer}
                            centered={true}
                            items={[
                                {
                                    label: `Explore Tree`,
                                    key: '1',
                                    children: <TreeViewComponent/>,
                                },
                                {
                                    label: `Explore Graph`,
                                    key: '2',
                                    children: <GraphViewComponent drawerProps={{open: true}}/>,
                                }
                            ]}
                        />
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col span={24}>
                        foot.
                    </Col>
                </Row>
            </div>
        </ConfigProvider>
    );
}

export default App;
