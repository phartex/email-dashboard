import { Menu } from "@/types/sidebar";

export const sideNavMenus: Menu[] = [
  {
    label: "Marketing",
    icon: {
      active: "/icons/marketing-active.svg",
      inactive: "/icons/marketing.svg",
    },
    collapsible: false,
    route: "/marketing",
  },
  {
    label: "Analytics",
    icon: {
      active: "/icons/analytics-active.svg",
      inactive: "/icons/analytics.svg",
    },
    collapsible: false,
    route: "/analytics",
  },
  {
    label: "Business",
    icon: {
      active: "/icons/business-active.svg",
      inactive: "/icons/business.svg",
    },
    collapsible: false,
    route: "/business",
  },
  {
    label: "Project",
    icon: {
      active: "/icons/project-active.svg",
      inactive: "/icons/project.svg",
    },
    collapsible: false,
    route: "/project",
  },
  {
    label: "HRM",
    icon: {
      active: "/icons/hrm-active.svg",
      inactive: "/icons/hrm.svg",
    },
    collapsible: false,
    route: "/hrm",
  },
  {
    label: "MobileApp",
    icon: {
      active: "/icons/mobile-app-active.svg",
      inactive: "/icons/mobile-app.svg",
    },
    collapsible: false,
    route: "/mobileapp",
  },
  {
    label: "Landingpage",
    icon: {
      active: "/icons/landingpage-active.svg",
      inactive: "/icons/landingpage.svg",
    },
    collapsible: false,
    route: "/landingpage",
  },
  {
    label: "Components",
    icon: {
      active: "/icons/components-active.svg",
      inactive: "/icons/components.svg",
    },
    collapsible: true,
    route: "/components",
  },
  {
    label: "Pages",
    icon: {
      active: "/icons/pages-active.svg",
      inactive: "/icons/pages.svg",
    },
    collapsible: true,
    route: "/pages",
  },
  {
    label: "Apps",
    icon: {
      active: "/icons/apps-active.svg",
      inactive: "/icons/apps.svg",
    },
    collapsible: true,
    route: "/apps",
  },
  {
    label: "Content",
    icon: {
      active: "/icons/content-active.svg",
      inactive: "/icons/content.svg",
    },
    collapsible: true,
    route: "/content",
  },
  {
    label: "Users",
    icon: {
      active: "/icons/users-active.svg",
      inactive: "/icons/users.svg",
    },
    collapsible: false,
    route: "/users",
  },
  {
    label: "Documentation",
    icon: {
      active: "/icons/docs-active.svg",
      inactive: "/icons/docs.svg",
    },
    collapsible: false,
    route: "/documentation",
  },
];
