import Image from "next/image";
import React from "react";
import MainLogo from "@/assets/images/main-logo.png";
import { Menu } from "./menu/Menu";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PowerIcon } from "lucide-react";

const Sidebar = () => {
    const { clearAuthUser } = useAuthStore((state) => state); // Access Zustand store to clear auth user
    const router = useRouter();

    // Function to handle logout
    const handleLogout = () => {
        // Clear authentication data in Zustand store
        clearAuthUser();

        // Clear auth cookies
        Cookies.remove("authUser");

        // Redirect user to the login page
        router.push("/");
    };

    return (
        <aside className="fixed top-0 hidden h-screen w-[300px] flex-col border-r border-r-gray-300 bg-primary md:flex">
            <div className="flex h-20 items-center justify-start border-b border-r border-b-gray-300 border-r-gray-300 px-6">
                <Image src={MainLogo} alt="logo" width={147} height={36} />
            </div>

            <Menu />

            <div className="flex flex-1 flex-col">
                <button
                    className={`hover:text-primary-default mx-auto mb-12 mt-auto flex h-[2.5rem] w-[223px] cursor-pointer items-center gap-[0.875rem] pl-3 text-sm font-semibold text-red-400 hover:font-bold`}
                    onClick={handleLogout}
                >
                    <PowerIcon className="h-6 w-6 -rotate-90" strokeWidth={3} />
                     {/* <Image src={MainLogo} alt="logo" width={147} height={36} /> */}
                    <span className="text-white font-light text-lg">Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
