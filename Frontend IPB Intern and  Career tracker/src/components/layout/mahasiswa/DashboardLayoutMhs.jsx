import SidebarMhs from "./SidebarMhs";
import TopbarMhs from "./TopbarMhs";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayoutMhs = () => {

  const [isCollapsed, setIsCollapsed] =
    useState(false);
  return (
    <div className="min-h-screen">

      {/* SIDEBAR */}
      <SidebarMhs
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* RIGHT SIDE */}
      <div
          className={`
            flex
            flex-col
            min-h-screen
            transition-all
            duration-300

            ${
              isCollapsed
                ? "ml-20"
                : "ml-64"
            }
          `}
        >

        {/* TOPBAR */}
        <TopbarMhs />

        {/* CONTENT */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayoutMhs;
