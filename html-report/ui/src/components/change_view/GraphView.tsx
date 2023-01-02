import {DrawerComponent, DrawerProps} from "./Drawer";
import HorizontalFlow from "./Flow";
import React from "react";
import {Change} from "@/model/change";
import {DrawerState, useDrawerStore} from "@/model/store";

export interface GraphViewProps {
    selectedChange?: Change
    drawerProps?: DrawerProps;
}

export const GraphViewComponent = (props: GraphViewProps) => {
    const drawerOpen = useDrawerStore((state: DrawerState) => state.drawerOpen)

    return (
        <>
         <HorizontalFlow />
         <DrawerComponent open={drawerOpen} />
        </>
    )
}