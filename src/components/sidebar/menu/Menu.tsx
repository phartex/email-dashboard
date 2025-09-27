// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { ChevronsUpDown } from "lucide-react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// import Image from "next/image";


// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { usePathname } from "next/navigation";
// import { useUIStore } from "@/store/ui";

// export function Menu() {
//   const { setSelectedMenuItem, menus } = useUIStore();

//   const pathname = usePathname();
//   const [openMenu, setOpenMenu] = React.useState<string | null>(null);

//   const toggleMenu = (menuLabel: string) => {
//     setOpenMenu((prev) => (prev === menuLabel ? null : menuLabel));
//   };

//   const handleMenuClick = (menuLabel: string) => {
//     setSelectedMenuItem(menuLabel);
//   };

//   return (
//     <div className="space-y-2 p-4">
//       {menus.map((menu) => {
//         const Icon = menu.icon;
//         const isActive = pathname.startsWith(menu.route);

//         return menu.collapsible ? (
//           <Collapsible
//             key={menu.label}
//             open={openMenu === menu.label}
//             onOpenChange={() => toggleMenu(menu.label)}
//             className="space-y-2"
//           >
//             <CollapsibleTrigger
//               className={`w-full ${isActive ? "bg-gray-100 text-blue-400" : "text-gray-400"}`}
//               onClick={() => handleMenuClick(menu.label)}
//             >
//               <div className="flex w-full items-center justify-between p-2">
//                 <div className="flex items-center gap-2">
//                   <Icon className="h-4 w-4" />
//                   <span>{menu.label}</span>
//                 </div>
//                 <ChevronsUpDown className="h-4 w-4" />
//               </div>
//             </CollapsibleTrigger>
//             <CollapsibleContent className="space-y-2 pl-6">
//               {menu.items?.map((item) => (
//                 <Link
//                   key={item.label}
//                   href={item.route}
//                   onClick={() => {
//                     handleMenuClick(item.label);
//                   }}
//                   className={`block rounded-md px-4 py-2 text-sm ${pathname === item.route
//                     ? "border border-blue-400 bg-blue-100 text-blue-400"
//                     : "text-gray-400 hover:bg-gray-100"
//                     }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </CollapsibleContent>
//           </Collapsible>
//         ) : (

//           <Link
//             key={menu.label}
//             href={menu.route}
//             onClick={() => {
//               handleMenuClick(menu.label);
//             }}
//             className={`flex items-center rounded-md px-4 py-6 text-xl ${isActive
//               ? "bg-blue-400 font-semibold text-primary-text"
//               : "text-white hover:bg-gray-100 hover:text-primary-text hover:font-semibold"
//               }`}
//           >
//             <Image
//               src={menu.icon}
//               alt="Menu Icon"
//               className="mr-2"
//               width={25}
//               height={25}
//             />
//             <span>{menu.label}</span>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
"use client";

import * as React from "react";
import Link from "next/link";
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

  const handleMenuClick = (menuLabel: string) => {
    setSelectedMenuItem(menuLabel);
  };

  const transactionRoutes: Record<string, string> = {
    "Payments": "/transactions/payments",
    "Settlements": "/transactions/settlements",
  };

  const handleTransactionSelection = (option: string) => {
    setSelectedTransactionOption(option);
    const route = transactionRoutes[option];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="space-y-10 p-4"> {/* Parent spacing between main menu items */}
      {menus.map((menu) => {
        const isActive = pathname.startsWith(menu.route);

        if (menu.label === "Transactions") {
          return (
            <div key={menu.label}>
              <div
                onClick={() => {
                  toggleMenu(menu.label);
                  handleMenuClick(menu.label);
                  router.push("/transactions/payments");
                }}
                className={`flex items-center justify-between rounded-md px-4 py-3 text-xl cursor-pointer ${isActive
                  ? "bg-blue-400 font-semibold text-primary-text"
                  : "text-white hover:bg-gray-100 hover:text-primary-text hover:font-semibold"
                }`}
              >
                <div className="flex items-center">
                  <Image
                    src={isActive ? menu.icon.active : menu.icon.inactive}
                    alt="Menu Icon"
                    className="mr-2"
                    width={25}
                    height={25}
                  />
                  <span>{menu.label}</span>
                </div>

                {openMenu === menu.label ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </div>

              {openMenu === menu.label && (
                <div className="pl-10 space-y-3 mt-2"> {/* Spacing between sub-links */}
                  {["Payments", "Settlements"].map((option) => (
                    <label key={option} className="flex items-center space-x-2 py-2 cursor-pointer">
                      <input
                        type="radio"
                        name="transactionOption"
                        value={option}
                        checked={selectedTransactionOption === option}
                        onChange={() => handleTransactionSelection(option)}
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Other main menu items
        return (
          <Link
            key={menu.label}
            href={menu.route}
            onClick={() => handleMenuClick(menu.label)}
            className={`flex items-center rounded-md px-4 py-3 text-xl ${isActive
              ? "bg-blue-400 font-semibold text-primary-text"
              : "text-white hover:bg-gray-100 hover:text-primary-text hover:font-semibold"
            }`}
          >
            <Image
              src={isActive ? menu.icon.active : menu.icon.inactive}
              alt="Menu Icon"
              className="mr-2"
              width={25}
              height={25}
            />
            <span>{menu.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
