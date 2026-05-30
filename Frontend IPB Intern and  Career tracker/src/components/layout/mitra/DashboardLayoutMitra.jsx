import SidebarMitra from "./SidebarMitra";
import TopbarMitra from "./TopbarMitra";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayoutMitra = () => {

    const [isCollapsed, setIsCollapsed] =
    useState(false);

    return (
        <div className="min-h-screen">

            {/* SIDEBAR */}
             <SidebarMitra
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
