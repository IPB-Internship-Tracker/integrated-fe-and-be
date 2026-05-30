import SidebarMhs from "./SidebarMhs";
import TopbarMhs from "./TopbarMhs";
import { Outlet } from "react-router-dom";

const DashboardLayoutMhs = () => {
  return (
    <div className="min-h-screen">

      {/* SIDEBAR */}
      <SidebarMhs />

      {/* RIGHT SIDE */}
      <div className="ml-64 flex flex-col min-h-screen">

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