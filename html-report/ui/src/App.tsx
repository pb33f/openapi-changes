import React from 'react';
import './variables.css';
import './App.css';
import {Col, ConfigProvider, Row, Tabs, theme} from 'antd';
import {Header} from "./components/header";
import {ReportContainer} from "./components/report_statistics";
import {GraphViewComponent} from "./components/change_view/GraphView";

import create from 'zustand'

export interface DrawerState {
    drawerOpen: boolean;
    toggleDrawer: () => void
}

export const useChangeStore = create<DrawerState>((set) => ({
    drawerOpen: false,
    toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
}))

function App() {
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
                  <Header />
              </Col>
          </Row>
          <hr/>
          <Row>
              <Col span={24}>
                  <ReportContainer />
              </Col>
          </Row>
          <hr/>

                  <div style={{position: 'relative'}}>
              <Tabs
                  defaultActiveKey="2"
                  type="card"
                  centered={true}
                  items={[
                      {
                          label: `Explore Tree`,
                          key: '1',
                          children: "hi",
                      },
                      {
                          label: `Explore Graph`,
                          key: '2',
                          children: <GraphViewComponent drawerProps={{open: true}} />,
                      }
                  ]}
              />
                  </div>


      </div>
      </ConfigProvider>
  );
}

export default App;
