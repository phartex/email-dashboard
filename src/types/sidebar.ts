import { LucideProps } from "lucide-react";



export type Menu = {
    label: string;
    icon: any;
    // icon: React.ForwardRefExoticComponent<
    //   Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    // >;
    route: string;
    items?: {
      label: string;
      route: string;
    }[];
    collapsible?: boolean;
  };
  