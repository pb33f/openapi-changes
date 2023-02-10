// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import {ReportState, useReportStore} from "@/model/store";
import {ReportItem} from "@/model/report";
import React, {useEffect, useRef} from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import '../navigation/Navigation.css';

export interface ChangeChartProps {
    selectedIndex: number;
}

export function ChangeChart(props: ChangeChartProps) {

    const report = useReportStore((report: ReportState) => report.report);
    const labels: string[] = [];
    const dataset: any[] = [];
    const totalData: number[] = [];
    const breakingData: number[] = [];
    const chartRef = useRef(null);
    const mobile = (window.innerWidth < 1000)

    if (!report) {
        return null
    }

    report.reportItems.forEach((item: ReportItem) => {
        const time = new Date(item.statistics.commit.date)
        if (!mobile) {
            labels.push(time.toLocaleDateString())
        } else {
            labels.push(item.statistics.commit.hash.substring(0,6))
        }
        totalData.push(item.statistics.total)
        breakingData.push(item.statistics.totalBreaking)
    });

    dataset.push({
        id: 1,
        label: 'Total Changes',
        data: totalData.reverse(),
        borderColor: 'rgba(98, 196, 255, 1.0)',
        backgroundColor: 'rgba(98, 196, 255, 0.4)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 13

    });

    dataset.push({
        id: 2,
        label: 'Breaking Changes',
        data: breakingData.reverse(),
        borderColor: '#ff3c74',
        backgroundColor: 'rgba(255,60,116,0.37)',
        borderDash: [5, 5],
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 13
    });

    const chartData = {
        labels: labels.reverse(),
        datasets: dataset
    }

    useEffect(() => {
        const chart: any = chartRef.current;
        if (chart) {
            chart.setActiveElements([
                {
                    datasetIndex: 0,
                    index: props.selectedIndex,
                }, {
                    datasetIndex: 1,
                    index: props.selectedIndex,
                }
            ]);
        }
    }, [props.selectedIndex]);

    return (
        <Line
            ref={chartRef}
            className='navigation-changes-chart'
            datasetIdKey='id'
            data={chartData}
            options={{
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Changes'
                        },
                        grid: {
                            color: 'rgba(76, 81, 91, 0.5)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        },
                        grid: {
                            color: 'rgba(76, 81, 91, 0.5)'
                        }
                    }
                }
            }}
        />
    )
}