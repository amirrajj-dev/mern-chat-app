import { create } from "zustand";

interface SidebarStore {
    isSidebarOpen: boolean;
    setIsSidebarOpen : (value : boolean)=>void
}

export const useSidebar = create<SidebarStore>((set) => ({
    isSidebarOpen : false,
    setIsSidebarOpen : (value : boolean) => set({isSidebarOpen : value})
}))