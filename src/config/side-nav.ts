import { Menu } from "@/types/sidebar";

export const sideNavMenus: Menu[] = [
  {
    label: "Dashboard",
    icon: {
      active: "/images/dashboard-active.svg",
      inactive: "/images/dashboard.svg",
    },
    collapsible: false,
    route: "/dashboard",
  },
  {
    label: "Devices",
    icon: {
      active: "/images/devices-active.svg",
      inactive: "/images/devices.svg",
    },
    collapsible: false,
    route: "/devices",
  },
  {
    label: "Schemes",
    icon: {
      active: "/images/schemes-active.svg",
      inactive: "/images/schemes.svg",
    },
    collapsible: false,
    route: "/schemes",
  },
  {
    label: "Transactions",
    icon: {
      active: "/images/transactions-active.svg",
      inactive: "/images/transactions.svg",
    },
    collapsible: false,
    route: "/transactions",
  },
  {
    label: "Team Management",
    icon: {
      active: "/images/team-management-active.svg",
      inactive: "/images/team-management.svg",
    },
    collapsible: false,
    route: "/team-management",
  },
  // {
  //   label: "Reports",
  //   icon: {
  //     active: "/images/reports-active.svg",
  //     inactive: "/images/reports.svg",
  //   },
  //   collapsible: false,
  //   route: "/reports",
  // },
];
