"use client";

import MainLogo from "@/assets/images/main-logo.png";

import { useUIStore } from "@/store/ui";
import { CircleX } from "lucide-react";
import Image from "next/image";
import React, {  useRef } from "react";
import { Menu } from "./menu/Menu";
import { useOnClickOutside } from "../hooks/useOutsideClick";

const MobileSidebar: React.FC = () => {
  const { toggleSidebar } = useUIStore();

  const handleToggleClick = () => {
    toggleSidebar();
  };
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => handleToggleClick());

  return (
    <div
     
      ref={ref}
      className="fixed z-30 flex h-screen w-64 flex-col pt-16 shadow-lg md:hidden bg-primary"
    >
      <CircleX
        onClick={handleToggleClick}
        className="absolute right-4 top-4 h-5 w-5 text-gray-400"
      />
      <div className="mb-12 flex items-center justify-center">
        <Image src={MainLogo} alt="logo" className="h-[1.375rem] w-[5rem]" />
      </div>

      <Menu />

      <div className="flex h-full flex-col">
        {/* <div
          className={`mt-auto flex h-[2.5rem] mx-auto cursor-pointer items-center gap-[0.875rem] pl-[0.875rem] text-xs font-normal hover:font-bold hover:text-primary-default`}
          onClick={() => router.push("/")}
        >
          Log Out
        </div> */}
      </div>
    </div>
  );
};

export default MobileSidebar;
