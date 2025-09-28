"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import Header from "@/components/header/Header";
import MobileSidebar from "@/components/sidebar/MobileSidebar";
import { useEffect } from "react";
import FullPageLoader from "@/components/loader";
import { useUIStore } from "@/store/ui";
import Sidebar from "@/components/sidebar/Sidebar";

type ProtectedLayoutProps = {
  readonly children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isSidebarOpen } = useUIStore((state) => state);
  const { authenticatedUser } = useAuthStore((state) => state); // Access authenticated user
  const router = useRouter();

  // Effect to redirect if not authenticated
  useEffect(() => {
    if (!authenticatedUser) {
      // If no authenticated user, redirect to the login page
      router.push("/");
    }
  }, [authenticatedUser, router]);

  if (!authenticatedUser) {
    // You can optionally show a loading spinner or placeholder while redirecting
    return <FullPageLoader />;
  }

  return (
    <div className="relative flex h-screen w-screen max-w-full overflow-x-hidden bg-gray-100">
      {/* Mobile Sidebar */}
      {isSidebarOpen && <MobileSidebar />}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="absolute top-20 w-full px-4 pb-8 md:left-[280px] md:w-[calc(100vw_-_16rem)] lg:px-8">
          {children}
        </main>
      </div>
  
    </div>
  );
}
