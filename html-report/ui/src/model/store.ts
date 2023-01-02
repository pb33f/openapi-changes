import create from "zustand";
import {Change} from "./change";

export interface DrawerState {
    drawerOpen: boolean;
    toggleDrawer: () => void
    closeDrawer: () => void
    openDrawer: () => void
}

export interface ChangeState {
    currentChange: Change | null;
    setCurrentChange: (change: Change) => void;
}



export const useDrawerStore = create<DrawerState>((set) => ({
    drawerOpen: false,
    toggleDrawer: () => set((state) => ({drawerOpen: !state.drawerOpen})),
    openDrawer: () => set((state) => ({drawerOpen: true})),
    closeDrawer: () => set((state) => ({drawerOpen: false})),
}));

export const useChangeStore = create<ChangeState>((set) => ({
    currentChange: null,
    setCurrentChange: (currentChange) => set({currentChange})
}));