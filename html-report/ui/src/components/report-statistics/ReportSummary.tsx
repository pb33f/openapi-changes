// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import React from 'react';
import {Statistic} from 'antd';
import {EditOutlined, MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {ChangeStatistics} from "@/model";
import './ReportContainer.css'

export interface ReportSummaryProps {
    changeStats: ChangeStatistics
}

export function ReportSummary(props: ReportSummaryProps) {
    let breakingStat: JSX.Element | undefined;
    if (props.changeStats.totalBreaking > 0) {
        breakingStat =  <Statistic title="Breaking" className="width-100 m-bottom-20"
                                   value={props.changeStats.totalBreaking}
                                   valueStyle={{fontWeight: 'bolder', color: 'var(--error-font-color)'}}/>
    }
    return (
        <section className='report-summary'>
            <section className="report-summary-stats">
                <Statistic title="Added" className="width-100 m-bottom-20"
                           value={props.changeStats.added} prefix={<PlusSquareOutlined/>}
                />
                <Statistic title="Removed" className="width-100 m-bottom-20"
                           value={props.changeStats.removed} prefix={<MinusSquareOutlined/>}
                />
                <Statistic title="Modified" className="width-100 m-bottom-20"
                           value={props.changeStats.modified} prefix={<EditOutlined/>}
                />

                <Statistic title="Total" className="width-100 m-bottom-20"
                           value={props.changeStats.total}
                />
                {breakingStat}
            </section>
            <section className='commit'>
            <span className='commit-changed'>
                Commit: {props.changeStats.commit.hash.substring(0, 6)} |&nbsp;
                <span className='commit-date'>{props.changeStats.commit.date}</span> by&nbsp;
                <span className='commit-author'>
                    <a href={`mailto:${props.changeStats.commit.authorEmail}`}>{props.changeStats.commit.author}</a>
               </span>
            </span>
                {props.changeStats.commit.message}
            </section>
        </section>
    )
}