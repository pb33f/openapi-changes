import create from "zustand";
import {Change} from "./change";
import React from "react";

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


export interface ChangeState {
    currentChange: Change | null;
    selectedChangeKeys: React.Key[];

    treeMapLookup: Map<String, String>;
    setCurrentChange: (change: Change) => void;
    setSelectedChangeKeys: (key: React.Key[]) => void;
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