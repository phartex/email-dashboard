"use client";
import { sideNavMenus } from "@/config/side-nav";
import { Menu } from "@/types/sidebar";
import { create } from "zustand";

type SuccessData = {
  status: boolean;
  message?: string;
  title?: string;
};

type UIState = {
  isSidebarOpen: boolean;
  selectedMenuItem: string | null;
  menus: Menu[];
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setSelectedMenuItem: (selectedMenuItem: string) => void;
  computeSelectedMenuItemFromRoute: (currentRoute: string) => void;
  successData: SuccessData;
  setShowSuccessModal: (successData: SuccessData) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  isSidebarOpen: true,
  selectedMenuItem: null,
  successData: {
    status: false,
    message: "",
    title: "",
  },
  menus: sideNavMenus,

  openSidebar: () => set({ isSidebarOpen: true }),

  closeSidebar: () => set({ isSidebarOpen: false }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSelectedMenuItem: (selectedMenuItem: string) => set({ selectedMenuItem }),

  computeSelectedMenuItemFromRoute: (currentRoute: string) => {
    const { menus, selectedMenuItem, setSelectedMenuItem } = get();
    if (!selectedMenuItem) {
      const matchedMenu = menus.find((menu) =>
        currentRoute.startsWith(menu.route),
      );
      setSelectedMenuItem(matchedMenu?.label ?? "");
    }
  },
  setShowSuccessModal: (successData: SuccessData) =>
    set({ successData: successData }),
}));
