import React, {useContext} from "react";
import PieChart from "../charts/Pie";
import {ReportSummary} from "./ReportSummary";
import {ChangeStatistics} from "@/model";
import './ReportContainer.css'
import {ReportState, useReportStore} from "@/model/store";

export const ReportContainer: React.FC = () => {
    const stats: ChangeStatistics | undefined =
        useReportStore((report: ReportState) => report.selectedReportItem?.statistics);

    if (!stats) {
        return <div>no report.</div>
    }

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
            type: "Total",
            value: stats.total
        },
        {
            type: "Breaking",
            value: stats.totalBreaking
        },
    ];
    const overallData = {
        labels: overallChanges.map((data) => data.type),
        datasets: [
            {
                data: overallChanges.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    };
    const breakingData = {
        labels: breakingChanges.map((data) => data.type),
        datasets: [
            {
                data: breakingChanges.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },

        ]
    };
    const totalData = {
        labels: totalChanges.map((data) => data.type),
        datasets: [
            {
                data: totalChanges.map((data) => data.value),
                borderColor: "rgb(30,30,30)",
                borderWidth: 1
            },
        ]
    };

    return (
        <div className="report-container">
            <PieChart chartData={overallData} title='Changes by type'/>
            <PieChart chartData={breakingData} title='Breaking change types'/>
            <PieChart chartData={totalData} title='Overall changes' isBinary/>
            <ReportSummary changeStats={stats}/>
        </div>
    )
}
