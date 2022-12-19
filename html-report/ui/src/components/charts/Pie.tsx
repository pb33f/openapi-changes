import React from "react";
import {Doughnut, Pie} from "react-chartjs-2";
import {Chart, ArcElement,  Tooltip, Legend, Title} from 'chart.js'
import {color, getHoverColor} from 'chart.js/helpers'

import {ChartColors, CreateRadialGradient} from "./ChartColors";
Chart.register(ArcElement,  Tooltip, Legend, Title);

function PieChart(props: any) {
    return (
        <div className="chart-container height-300">
            <h2 style={{ textAlign: "center" }}></h2>
            <Doughnut
                data={props.chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Making shit look good.",
                            font: {
                                size: 12,
                                family: "Menlo, Monaco, Roboto Mono, Lucida Console, Liberation Mono"
                            }
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    size: 14,
                                    family: "Menlo, Monaco, Roboto Mono, Lucida Console, Liberation Mono"
                                }
                            }
                        },

                    },
                    elements: {
                        arc: {
                            backgroundColor: function (context) {
                                let c = ChartColors[context.dataIndex];
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
export default PieChart;