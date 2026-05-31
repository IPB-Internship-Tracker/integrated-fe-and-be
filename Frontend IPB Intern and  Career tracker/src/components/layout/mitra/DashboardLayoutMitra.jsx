import SidebarMitra from "./SidebarMitra";
import TopbarMitra from "./TopbarMitra";
import DashboardFooter from "../DashboardFooter";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

const DashboardLayoutMitra = () => {

    const [isCollapsed, setIsCollapsed] =
    useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

    return (
        <div className="dashboard-shell min-h-screen">

            <button
                type="button"
                onClick={() =>
                    setIsMobileSidebarOpen(true)
                }
                className="
                    mobile-sidebar-button
                    fixed
                    top-4
                    left-4
                    z-50
                    hidden
                    rounded-xl
                    bg-indigo-900
                    p-2
                    text-white
                    shadow-lg
                    cursor-pointer
                "
                aria-label="Buka menu"
            >
                <Menu size={22} />
            </button>

            {isMobileSidebarOpen && (
                <button
                    type="button"
                    className="
                        mobile-sidebar-overlay
                        fixed
                        inset-0
                        z-40
                        hidden
                        bg-black/40
                        cursor-pointer
                    "
                    onClick={() =>
                        setIsMobileSidebarOpen(false)
                    }
                    aria-label="Tutup menu"
                />
            )}

            {/* SIDEBAR */}
             <SidebarMitra
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() =>
                    setIsMobileSidebarOpen(false)
                }
            />

             {/* RIGHT SIDE */}
            <div
                className={`
                    dashboard-content
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
                <main className="dashboard-main flex-1 p-8">
                    < Outlet />
                </main>

                <DashboardFooter role="Mitra" />

            </div>


        </div>
    );
};

export default DashboardLayoutMitra;
