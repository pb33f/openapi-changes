import React from 'react';
import {Statistic} from 'antd';
import {EditOutlined, MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {ChangeStatistics} from "@/model";
import './ReportContainer.css'

export interface ReportSummaryProps {
    changeStats: ChangeStatistics
}

export const ReportSummary = (props: ReportSummaryProps) => (
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
            <Statistic title="Breaking" className="width-100 m-bottom-20"
                       value={props.changeStats.totalBreaking}
                       valueStyle={{fontWeight: 'bolder', color: 'var(--error-font-color)'}}/>
        </section>
        <section className='commit'>
            <span className='commit-changed'>
                Commit: {props.changeStats.commit.hash} | {props.changeStats.commit.date} by&nbsp;
                <span className='commit-author'>
                    <a href={`mailto:${props.changeStats.commit.authorEmail}`}>{props.changeStats.commit.author}</a>
               </span>
            </span>

                 {props.changeStats.commit.message}

        </section>
    </section>
);