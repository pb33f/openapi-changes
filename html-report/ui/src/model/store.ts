// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import { create}  from "zustand";
import {Change} from "./change";
import React from "react";
import {CanvasDirection} from "reaflow/dist/layout/elkLayout";
import {ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import {Report, ReportItem} from "@/model/report";

// data is supplied externally at boot time off the window object
// which is set before the react application is booted.
let data: any = (window as any).data
//import data from '../../data.json'

export interface DrawerState {
    drawerOpen: boolean;
    toggleDrawer: () => void
    closeDrawer: () => void
    openDrawer: () => void
}

export interface NavState {
    navOpen: boolean;
    closeNav: () => void
    openNav: () => void
}

export interface GraphState {
    view: CanvasDirection;
    setDirection: (direction: CanvasDirection) => void;

    zoomPanPinch: ReactZoomPanPinchRef | undefined;

    setZoomPanPinch: (ref: ReactZoomPanPinchRef) => void;
}

export interface ReportState {
    report: Report | undefined
    selectedReportItem: ReportItem | undefined;
    selectedReportIndex: number;
    highlightedReportIndex: number;

    setSelectedReport: (reportItem: ReportItem) => void;
    setReport: (report: Report) => void;
    setSelectedReportIndex: (idx: number) => void;
    setHighlightedReportIndex: (idx: number) => void;
}


export interface ChangeState {
    currentChange: Change | null;
    selectedChangeKeys: React.Key[];
    expandedChangeKeys: React.Key[];

    treeMapLookup: Map<String, String>;
    setCurrentChange: (change: Change | null) => void;
    setSelectedChangeKeys: (key: React.Key[]) => void;
    setExpandedChangeKeys: (key: React.Key[]) => void;
}

export interface EditorState {
    sideBySide: boolean
    toggleView: () => void;
    setSideBySide: (sbs: boolean) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
    drawerOpen: false,
    toggleDrawer: () => set((state) => ({drawerOpen: !state.drawerOpen})),
    openDrawer: () => set((state) => ({drawerOpen: true})),
    closeDrawer: () => set((state) => ({drawerOpen: false})),
}));

export const useNavStore = create<NavState>((set) => ({
    navOpen: false,
    openNav: () => set((state) => ({navOpen: true})),
    closeNav: () => set((state) => ({navOpen: false})),
}));

export const useChangeStore = create<ChangeState>((set) => ({
    currentChange: null,
    selectedChangeKeys: [],
    expandedChangeKeys: [],
    treeMapLookup: new Map<String, String>(),
    setCurrentChange: (currentChange) => set({currentChange}),
    setSelectedChangeKeys: (selectedChangeKeys) => set({selectedChangeKeys}),
    setExpandedChangeKeys: (expandedChangeKeys) => set({expandedChangeKeys})
}));


export const useGraphStore = create<GraphState>((set) => ({
    view: 'DOWN',
    zoomPanPinch: undefined as ReactZoomPanPinchRef | undefined,
    setDirection: (direction: CanvasDirection) => set({view: direction}),
    setZoomPanPinch: zoomPanPinch => set({ zoomPanPinch }),
}));


export const useReportStore = create<ReportState>((set) => ({
    report: data,
    selectedReportIndex: data.reportItems.length - 1,
    selectedReportItem: data.reportItems[0],
    highlightedReportIndex: data.reportItems.length - 1,
    setHighlightedReportIndex: (highlightedReportIndex: number) => set({highlightedReportIndex}),
    setSelectedReportIndex: (selectedReportIndex: number) => set({selectedReportIndex}),
    setSelectedReport: (selectedReportItem: ReportItem) => set({selectedReportItem}),
    setReport: (report: Report) => set({report})
}));

export const useEditorStore = create<EditorState>((set) => ({
    sideBySide: true,
    toggleView: () => set((state) => ({sideBySide: !state.sideBySide})),
    setSideBySide: (sideBySide: boolean) => set({sideBySide})
}));
