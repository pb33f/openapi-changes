import {DrawerComponent, DrawerProps} from "./Drawer";
import HorizontalFlow, {Change} from "../../Flow";
import {DrawerState, useChangeStore} from "../../App";

export interface GraphViewProps {
    selectedChange?: Change
    drawerProps?: DrawerProps;
}

export const GraphViewComponent = (props: GraphViewProps) => {

    const drawerOpen = useChangeStore((state: DrawerState) => state.drawerOpen)

    return (
        <>
         <HorizontalFlow />
         <DrawerComponent open={drawerOpen} />

            </>
    )


}