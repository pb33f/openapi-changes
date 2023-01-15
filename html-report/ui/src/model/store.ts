import create from "zustand";
import {Change} from "./change";
import React from "react";
import {CanvasDirection} from "reaflow/dist/layout/elkLayout";
import {ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import {Report, ReportItem} from "@/model/report";

let win: any = window;
let report: Report = win.report

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
    report: Report
    selectedReportItem: ReportItem;
    selectedReportIndex: number;
    setSelectedReport: (reportItem: ReportItem) => void;
    setSelectedReportIndex: (idx: number) => void;
}


export interface ChangeState {
    currentChange: Change | null;
    selectedChangeKeys: React.Key[];

    treeMapLookup: Map<String, String>;
    setCurrentChange: (change: Change | null) => void;
    setSelectedChangeKeys: (key: React.Key[]) => void;
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
    treeMapLookup: new Map<String, String>(),
    setCurrentChange: (currentChange) => set({currentChange}),
    setSelectedChangeKeys: (selectedChangeKeys) => set({selectedChangeKeys})
}));


export const useGraphStore = create<GraphState>((set) => ({
    view: 'DOWN',
    zoomPanPinch: undefined as ReactZoomPanPinchRef | undefined,
    setDirection: (direction: CanvasDirection) => set({view: direction}),
    setZoomPanPinch: zoomPanPinch => set({ zoomPanPinch }),
}));

// export const useReportStore = create<ReportState>((set) => ({
//     report: report,
//     selectedReportIndex: report.reportItems.length - 1,
//     selectedReportItem: report.reportItems[0],
//     setSelectedReportIndex: (selectedReportIndex: number) => set({selectedReportIndex}),
//     setSelectedReport: (selectedReportItem: ReportItem) => set({selectedReportItem})
// }));

export const useEditorStore = create<EditorState>((set) => ({
    sideBySide: true,
    toggleView: () => set((state) => ({sideBySide: !state.sideBySide})),
    setSideBySide: (sideBySide: boolean) => set({sideBySide})
}));
