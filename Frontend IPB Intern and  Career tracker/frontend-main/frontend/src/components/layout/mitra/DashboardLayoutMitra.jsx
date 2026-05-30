import SidebarMitra from "./SidebarMitra";
import TopbarMitra from "./TopbarMitra";
import { Outlet } from "react-router-dom";

const DashboardLayoutMitra = () => {
    return (
        <div className="min-h-screen">

            {/* SIDEBAR */}
             <SidebarMitra />

             {/* RIGHT SIDE */}
            <div className="ml-64 flex flex-col min-h-screen">

                {/* TOPBAR */}
                <TopbarMitra />

                 {/* CONTENT */}
                <main className="flex-1 p-8">
                    < Outlet />
                </main>

            </div>


        </div>
    );
};

export default DashboardLayoutMitra;