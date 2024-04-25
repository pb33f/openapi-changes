// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import React from "react";
import {ReportSummary} from "./ReportSummary";
import {ChangeStatistics} from "@/model";
import {ReportState, useReportStore} from "@/model/store";
import {PieChart} from "@/components/charts/Pie";
import './ReportContainer.css'

export const ReportContainer: React.FC = () => {
    const stats: ChangeStatistics | undefined =
        useReportStore((report: ReportState) => report.selectedReportItem?.statistics);

    if (!stats) {
        return <div>no report.</div>
    }

    const overallChanges = [
        {
            type: "Modified",
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
            type: "Modified",
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
            type: "Non-breaking",
            value: stats.total - stats.totalBreaking
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
