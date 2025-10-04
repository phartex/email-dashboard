"use client";

import Image from "next/image";
import React from "react";
import { Menu } from "./menu/Menu";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PowerIcon } from "lucide-react";

const Sidebar = () => {
  const { clearAuthUser } = useAuthStore((state) => state); 
  const router = useRouter();

  // ✅ Handle logout
  const handleLogout = () => {
    // Clear Zustand state
    clearAuthUser();

    // Remove auth cookie
    Cookies.remove("authUser");

    // Redirect to login
    router.push("/login"); // <-- Better to send them to /login, not just "/"
  };

  return (
    <aside className="fixed top-0 hidden h-screen w-[300px] flex-col border-r border-black bg-[#f5f5f5] md:flex">
      {/* Logo */}
      <div className="flex h-20 items-center justify-start border-b border-gray-300 px-6 py-5">
        <Image src="/rutal-logo.png" alt="logo" width={147} height={36} />
      </div>

      {/* Menu Items */}
      <Menu />

      {/* Logout Button */}
      <div className="flex flex-1 flex-col">
        <button
          onClick={handleLogout}
          className="mx-auto mb-12 mt-auto flex h-[2.5rem] w-[223px] items-center gap-3 rounded-md border border-red-300 px-3 text-sm font-semibold text-red-500 hover:bg-red-50 hover:font-bold transition"
        >
          <PowerIcon className="h-6 w-6 -rotate-90" strokeWidth={2.5} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
