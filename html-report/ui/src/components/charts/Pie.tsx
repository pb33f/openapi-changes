// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import React from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement,  Tooltip, Legend, Title, LinearScale, CategoryScale, PointElement, LineElement} from 'chart.js'
import {color, getHoverColor} from 'chart.js/helpers'
import {BinaryChartColors, ChartColors, CreateRadialGradient} from "./ChartColors";

Chart.register(ArcElement,  Tooltip, Legend, Title, LinearScale, CategoryScale, PointElement, LineElement);

export interface PieChartProps {
    chartData: any
    title: string

    isBinary?: boolean
}


export function PieChart(props: PieChartProps) {
    let colors = ChartColors;
    if (props.isBinary) {
        colors = BinaryChartColors
    }

    let showLegend: boolean = true;
    if (window.innerWidth < 1000) {
        showLegend = false
    }

    return (
        <div className="chart-container">
            <Doughnut
                data={props.chartData}
                options={{
                    layout: {
                      autoPadding: true,
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: props.title,
                        },
                        legend: {
                            align: 'center',
                            display: showLegend,
                            position: 'right',
                            maxHeight: 40,
                            labels: {
                                usePointStyle: true,
                                color: 'rgb(255, 255, 255)',
                                font: {
                                    size: 10,
                                    family: "Menlo, Monaco, Roboto Mono, Lucida Console, Liberation Mono"
                                }
                            }
                        },
                    },
                    elements: {
                        arc: {
                            backgroundColor: function (context) {
                                let c = colors[context.dataIndex];
                                if (!c) {
                                    return;
                                }
                                if (context.active) {
                                    c = getHoverColor(c);
                                }
                                const mid = color(c).desaturate(0.1).darken(0.2).rgbString();
                                const start = color(c).lighten(0.3).rgbString();
                                const end = color(c).darken(0.65).rgbString();
                                const rim = color(c).darken(0.5).rgbString();
                                return CreateRadialGradient(context, start, mid, end, rim);
                            },
                        }
                    }
                }}
            />
        </div>
    );
}