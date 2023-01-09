import React, {useState} from "react";
import {Col, Row} from "antd";
import {Header} from "../header";
import PieChart from "../charts/Pie";
import {ChartColors} from "../charts/ChartColors";
import {ReportSummary} from "./ReportSummary";
import data from '../../../data.json'
import {BeefyTreeNode, ChangeStatistics} from "@/model";
import './ReportContainer.css'

const stats: ChangeStatistics = data.statistics

const overallChanges = [
    {
        type: "Modifications",
        value: stats.modified

    },
    {
        type: "Additions",
        value: stats.added
    },
    {
        type: "Removals",
        value: stats.removed
    },
];

const breakingChanges = [
    {
        type: "Modifications",
        value: stats.breakingModified

    },
    {
        type: "Additions",
        value: stats.breakingAdded
    },
    {
        type: "Removals",
        value: stats.breakingRemoved
    },
];

const totalChanges = [
    {
        type: "Total Changes",
        value: stats.total

    },
    {
        type: "Breaking",
        value: stats.totalBreaking
    },

];

export const ReportContainer: React.FC = () => {
    const [overallData] = useState({
        labels: overallChanges.map((data) => data.type),
        datasets: [
            {
                data: overallChanges.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    });

    const [breakingData] = useState({
        labels: breakingChanges.map((data) => data.type),
        datasets: [
            {
                data: breakingChanges.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    });

    const [totalData] = useState({
        labels: totalChanges.map((data) => data.type),
        datasets: [
            {
                data: totalChanges.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    });

    return (
        <div className="report-container">
            <PieChart chartData={overallData} title='Changes by type'/>
            <PieChart chartData={breakingData} title='Breaking change types'/>
            <PieChart chartData={totalData} title='Overall changes' isBinary/>
            <ReportSummary changeStats={stats}/>
        </div>
    )
}
