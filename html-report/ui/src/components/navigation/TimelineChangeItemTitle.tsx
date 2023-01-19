import React from "react";

export interface TimelineChangeItemTitleProps {
    title: string;
    breaking?: boolean
}

export function TimelineChangeItemTitle(props: TimelineChangeItemTitleProps) {
    return (
        <span
            className={props.breaking ?
                'timeline-change-stat-title-breaking' : 'timeline-change-stat-title'}>{props.title}</span>
    )
}