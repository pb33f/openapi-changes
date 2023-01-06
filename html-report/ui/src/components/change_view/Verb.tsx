import React from "react";
import {Tag} from "antd";


export interface VerbProps {
    method: string | undefined;
    className?: string;

    disabled?: boolean
}

export const Verb = (props: VerbProps) => {
    if (props.method === undefined) {
        return <Tag>No method</Tag>
    }
    let className = 'drawer-verb';
    if (props.className) {
        className = props.className;
    }
    if (!props.disabled) {
        return (
            <Tag className={className}>{props.method.toUpperCase()}</Tag>
        )
    } else {
        return (
            <Tag color={GetVerbColor(props.method)} className={className}>{props.method.toUpperCase()}</Tag>
        )
    }

}

export const CheckPropIsVerb = (prop: string | undefined): boolean => {
    switch (prop?.toLowerCase()) {
        case 'post':
        case 'put':
        case 'patch':
        case 'get':
        case 'delete':
        case 'options':
        case 'head':
        case 'trace':
            return true;
        default:
            return false;
    }
}

export const GetVerbColor = (verb: string): string => {
    const base = 'var(--secondary-color)';
    switch (verb.toLowerCase()) {
        case 'post':
            return 'green';
        case 'put':
            return 'green';
        case 'patch':
            return 'orange'
        case 'get':
            return 'blue';
        case 'delete':
            return 'red';
        default:
            return 'base';
    }
}