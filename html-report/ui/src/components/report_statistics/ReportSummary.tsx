import React from 'react';
import {Statistic} from 'antd';
import {EditOutlined, MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";

export const ReportSummary: React.FC = () => (
    <>
        <div className="flex flex-wrap flex-center m-top-20">
            <Statistic title="Added" className="width-100 m-bottom-20"
                       value={93} prefix={<PlusSquareOutlined/>}
            />
            <Statistic title="Removed" className="width-100 m-bottom-20"
                       value={93} prefix={<MinusSquareOutlined/>}
            />
            <Statistic title="Modified" className="width-100 m-bottom-20"
                       value={93} prefix={<EditOutlined/>}
            />
            <Statistic title="Breaking" className="width-100 m-bottom-20" value={93}
                       valueStyle={{fontWeight: 'bolder', color: 'var(--error-font-color)'}}/>
        </div>
        <div>
            {/*<h3 className="committed-date">Committed: 12th March 2023 15:22 UTC</h3>*/}
            {/*<Card bodyStyle={{background: "#141a23"}}>*/}

            {/*    hey, a thing goes here when its ready*/}
            {/*</Card>*/}
        </div>
    </>
);