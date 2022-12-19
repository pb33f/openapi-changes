import React, {useState} from "react";
import {Col, Row} from "antd";
import {Header} from "../header";
import PieChart from "../charts/Pie";
import {ChartColors} from "../charts/ChartColors";
import {ReportSummary} from "./ReportSummary";


export const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];


export const ReportContainer: React.FC = () => {

    // const [chartData, setChartData] = useState();
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                data: Data.map((data) => data.userGain),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    });


    return(
        <Row >
            <Col span={6}>
                <PieChart chartData={chartData} />
            </Col>
            <Col span={6}>
                <PieChart chartData={chartData} />
            </Col>
            <Col span={12}>
                <ReportSummary />
            </Col>
        </Row>
    )
}
