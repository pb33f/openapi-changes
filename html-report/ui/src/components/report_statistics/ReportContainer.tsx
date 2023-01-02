import React, {useState} from "react";
import {Col, Row} from "antd";
import {Header} from "../header";
import PieChart from "../charts/Pie";
import {ChartColors} from "../charts/ChartColors";
import {ReportSummary} from "./ReportSummary";


export const Data = [
    {
        id: 1,
        type: "Modifications",
        value: 12

    },
    {
        id: 2,
        type: "Additions",
        value: 24
    },
    {
        id: 3,
        type: "Errors",
        value: 12
    },
];


export const ReportContainer: React.FC = () => {
    const [chartData] = useState({
        labels: Data.map((data) => data.type),
        datasets: [
            {
                data: Data.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    });

    return (
        <div className="report-container">
            <Row>
                <Col span={4}>
                    <PieChart chartData={chartData}/>
                </Col>
                <Col span={4}>
                    <PieChart chartData={chartData}/>
                </Col>
                <Col span={16}>
                    <ReportSummary/>
                </Col>
            </Row>
        </div>
    )
}
