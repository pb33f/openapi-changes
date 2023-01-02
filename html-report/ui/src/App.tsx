import React from 'react';
import './variables.css';
import "allotment/dist/style.css";
import './App.css';
import {Col, ConfigProvider, Row, Tabs, theme} from 'antd';
import {Header} from "./components/header";
import {ReportContainer} from "./components/report_statistics";
import {GraphViewComponent} from "./components/change_view/GraphView";
import {TreeViewComponent} from "./components/change_view/TreeView";
import {DrawerState, useDrawerStore} from "@/model/store";

function App() {
    const closeDrawer = useDrawerStore((state: DrawerState) => state.closeDrawer)

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

                <div>

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
                </div>

                <hr/>
            </div>

            foot.
        </ConfigProvider>
    );
}

export default App;
