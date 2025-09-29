"use client";

import { useUIStore } from "@/store/ui";
import { Bell, LayoutGrid, Mail, Menu, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuthStore } from "@/store/auth";

const Header = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    selectedMenuItem,
    computeSelectedMenuItemFromRoute,
  } = useUIStore((state) => state);

  const { authenticatedUser } = useAuthStore((state) => state);

  const pathname = usePathname();

  const [unreadMessages] = useState(4);
  const [notifications] = useState(1);

  useEffect(() => {
    computeSelectedMenuItemFromRoute(pathname);
  }, [pathname, computeSelectedMenuItemFromRoute]);

  const avatarInitials = ``.toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex h-20 items-center bg-white border-b border-black md:left-[300px] px-4">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        {!isSidebarOpen && (
          <Menu
            className="w-7 text-gray-600 md:hidden cursor-pointer"
            onClick={toggleSidebar}
          />
        )}

        {/* Search (full on md+, icon on mobile) */}
        <div className="hidden md:flex items-center border rounded-md px-2 py-1 w-64 bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none text-sm"
          />
          <Search size={16} className="text-gray-500" />
        </div>

        <button className="md:hidden p-2">
          <Search size={20} />
        </button>
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* Settings */}
        <button className="relative w-9 h-9 flex items-center justify-center border border-black rounded-full hover:bg-gray-100">
          <Settings size={18} />
        </button>

        {/* Apps */}
        <button className="relative w-9 h-9 flex items-center justify-center border border-black rounded-full hover:bg-gray-100">
          <LayoutGrid size={18} />
        </button>

        {/* Messages */}
        <button className="relative w-9 h-9 flex items-center justify-center border border-black rounded-full hover:bg-gray-100">
          <Mail size={18} />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center border border-black rounded-full hover:bg-gray-100">
          <Bell size={18} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Avatar className="w-9 h-9">
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {avatarInitials || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
