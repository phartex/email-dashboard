import { useUIStore } from "@/store/ui";
import { BellIcon, ChevronRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
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
  console.log("Authenticated User:", authenticatedUser);
  

  const pathname = usePathname();

  useEffect(() => {
    computeSelectedMenuItemFromRoute(pathname);
  }, [pathname, computeSelectedMenuItemFromRoute]);

  // const avatarInitials =`${authenticatedUser?.user.firstName?.[0] ?? ""}${authenticatedUser?.user.lastName?.[0] ?? ""}`.toUpperCase();
  const avatarInitials =`test`.toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex h-20 items-center bg-white border-b border-b-gray-300  opacity-100 md:left-[300px]">
      <div className="flex w-full items-center px-6 font-bold by">
        {!isSidebarOpen && (
          <Menu
            className="w-7 text-gray-400 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        <span className="ml-4 hidden font-averta text-[28px] font-bold text-primary-text lg:block">
          {selectedMenuItem}
        </span>

        <div className="ml-auto flex items-center gap-4">
       

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {avatarInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              {/* <h6 className="text-primary-text">
                Hi, {authenticatedUser?.user.firstName}
              </h6>
              <p className="hidden md:block text-[#5F738C]">
                {authenticatedUser?.user.email}
              </p> */}
            </div>
            <ChevronRight className="ml-10 h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
