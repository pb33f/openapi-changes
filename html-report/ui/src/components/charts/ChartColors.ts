// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

export const ChartColors: string[] = [
    "#f83aff",
    "rgba(98, 196, 255, 1)",
    "rgba(248,58,255,0.47)",
    "rgba(98, 196, 255, 0.8)",
    "rgba(248,58,255,0.2)",
    "rgba(98, 196, 255, 0.5)"
]

export const BinaryChartColors: string[] = [
    "rgba(98, 196, 255, 1)",
    "#ff246b",
]

const cache = new Map();
let width: any = null;
let height: any = null;

export function CreateRadialGradient(context: any, c1: any, c2: any, c3: any, c4: any) {
    const chartArea = context.chart.chartArea;
    if (!chartArea) {
        return;
    }

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (width !== chartWidth || height !== chartHeight) {
        cache.clear();
    }
    let gradient = cache.get(c1 + c2 + c3 + c4);
    if (!gradient) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const r = Math.min(
            (chartArea.right - chartArea.left) / 2,
            (chartArea.bottom - chartArea.top) / 2
        );
        const ctx = context.chart.ctx;
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
        gradient.addColorStop(0.45, c1);
        gradient.addColorStop(0.7, c2);
        gradient.addColorStop(0.93, c3);
        gradient.addColorStop(1, c4);
        cache.set(c1 + c2 + c3 + c4, gradient);
    }
    return gradient;
}