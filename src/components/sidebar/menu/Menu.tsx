"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui";

export function Menu() {
  const { setSelectedMenuItem, menus } = useUIStore();
  const pathname = usePathname();
  const router = useRouter();

  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [selectedTransactionOption, setSelectedTransactionOption] = React.useState<string>("");

  const toggleMenu = (menuLabel: string) => {
    setOpenMenu((prev) => (prev === menuLabel ? null : menuLabel));
  };

  const handleMenuClick = (menuLabel: string, route: string) => {
    setSelectedMenuItem(menuLabel);
    router.push(route);
  };


  const appRoutes: Record<string, string> = {
  Calendar: "/apps/calendar",
  Email: "/apps/email",
  Invoice: "/apps/invoice",
  Charts: "/apps/charts",
  Widgets: "/apps/widgets",
};

  const handleAppSelection = (option: string) => {
  setSelectedTransactionOption(option); // optional if you want to track
  const route = appRoutes[option];
  if (route) {
    router.push(route);
  }
};

  return (
    <div className="space-y-2 md:space-y-8 p-4">
      {menus.map((menu) => {
        const isActive = pathname.startsWith(menu.route);

        if (menu.label === "Apps") {
          return (
            <div key={menu.label}>
              <div
                onClick={() => {
                  toggleMenu(menu.label);
                  handleMenuClick(menu.label, "/apps/calendar");
                }}
                className={`flex items-center justify-between rounded-md px-4 py-3 md:text-xl cursor-pointer font-semibold ${
                  isActive
                     ? "border border-2 border-black font-semibold text-primary-text py-3"
                : "text-black hover:bg-gray-100 "
                }`}
              >
                <div className="flex items-center">
                  {/* <Image
                    src={isActive ? menu.icon.active : menu.icon.inactive}
                    alt="Menu Icon"
                    className="mr-2"
                    width={25}
                    height={25}
                  /> */}
                  <span>{menu.label}</span>
                </div>

                {openMenu === menu.label ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </div>

              {openMenu === menu.label && (
  <div className="pl-10 space-y-3 mt-2">
    {["Calendar", "Email", "Invoice", "Charts", "Widgets"].map((option) => (
      <p
        key={option}
        onClick={() => handleAppSelection(option)}
        className="text-black md:text-xl font-semibold cursor-pointer"
      >
        {option}
      </p>
    ))}
  </div>
)}

            </div>
          );
        }

        // Other main menu items
        return (
          <div
            key={menu.label}
            onClick={() => handleMenuClick(menu.label, menu.route)}
            className={`flex items-center rounded-md px-4 md:text-xl font-semibold cursor-pointer ${
              isActive
                ? "border border-2 border-black font-semibold text-primary-text py-3"
                : "text-black hover:bg-gray-100 hover:text-primary-text hover:font-semibold"
            }`}
          >
            {/* <Image
              src={isActive ? menu.icon.active : menu.icon.inactive}
              alt="Menu Icon"
              className="mr-2"
              width={25}
              height={25}
            /> */}
            <span>{menu.label}</span>
          </div>
        );
      })}
    </div>
  );
}
