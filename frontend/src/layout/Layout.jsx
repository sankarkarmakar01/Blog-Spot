import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Section */}
        <div className="flex flex-col flex-1 min-h-screen">
          {/* Fixed Topbar */}
          <div className="sticky top-0 z-50">
            <Topbar />
          </div>

          {/* Main Content */}
          <main className="flex-1 px-4 md:px-8 pt-20 pb-10 overflow-auto bg-gray-50 relative top-16 md:ml-46 ">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
