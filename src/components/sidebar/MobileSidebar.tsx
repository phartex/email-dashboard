"use client";


import { useUIStore } from "@/store/ui";
import { CircleX, PowerIcon } from "lucide-react";
import Image from "next/image";
import React, {  useRef } from "react";
import { Menu } from "./menu/Menu";
import { useOnClickOutside } from "../hooks/useOutsideClick";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const MobileSidebar: React.FC = () => {
  const { toggleSidebar } = useUIStore();

    const { clearAuthUser } = useAuthStore((state) => state); 
    const router = useRouter();

  const handleToggleClick = () => {
    toggleSidebar();
  };
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => handleToggleClick());
    const handleLogout = () => {
    // Clear Zustand state
    clearAuthUser();

    // Remove auth cookie
    Cookies.remove("authUser");

    // Redirect to login
    router.push("/login"); // <-- Better to send them to /login, not just "/"
  };

  return (
    <div
     
      ref={ref}
      className="fixed z-30 flex bg-white h-screen w-64 flex-col pt-16 shadow-lg md:hidden "
    >
      <CircleX
        onClick={handleToggleClick}
        className="absolute right-4 top-4 h-5 w-5 text-gray-400"
      />
      <div className=" flex items-center pl-4">
        <Image src="/rutal-logo.png" alt="logo" width={147} height={36} />
        
      </div>

      <Menu />

      <div className="flex h-full flex-col">
        <div
          className={`mx-auto mb-12 mt-auto flex h-[2.5rem] w-[223px] py-5 justify-center items-center gap-3 rounded-md border border-green-700 px-3 text-sm font-semibold hover:bg-red-50 hover:font-bold transition`}
          onClick={handleLogout}
        >
        <PowerIcon className="h-6 w-6 -rotate-90 text-green-700" strokeWidth={2.5} />
          <span className="text-green-700">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
