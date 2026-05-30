import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  House,
  ChartLine,
  Settings,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

const SidebarMitra = ({
  isCollapsed,
  setIsCollapsed,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  // MENU
  const menuItems = [

    {
      label: "Dashboard",
      icon: House,
      path: "/dashboard-mitra",

      matchPaths: [
        "/dashboard-mitra",
      ],
    },

    {
      label: "Program Saya",
      icon: ChartLine,
      path: "/program-list-mitra",

      matchPaths: [
        "/program-list-mitra",

        // MAGANG
        "/magang-detail-mitra",
        "/create-magang",
        "/edit-magang",

        // KOMPETISI
        "/kompetisi-detail-mitra",
        "/create-kompetisi",
        "/edit-kompetisi",

        // STUDI INDEPENDEN
        "/stupen-detail-mitra",
        "/create-studi-independen",
        "/edit-studi-independen",

        // DRAFT
        "/draft-list",

        // DOC
        "/doc-requirement",

        // PELAMAR
        "/pelamar-list",
        "/pelamar-detail",
      ],
    },

  ];

  return (

    <aside
      className={`
        fixed
        top-0
        left-0
        min-h-screen
        bg-indigo-900
        text-white
        flex
        flex-col
        transition-all
        duration-300

        ${
          isCollapsed
            ? "w-20"
            : "w-64"
        }
      `}
    >

      {/* HEADER */}
      <div
        className="
          border-b
          border-indigo-500
        "
      >

        {/* HAMBURGER */}
        <div className="flex justify-end p-4">

          <button
            onClick={() =>
              setIsCollapsed(!isCollapsed)
            }

            className="
              cursor-pointer
              hover:text-kuning-tua
            "
          >
            {
              isCollapsed
                ? <PanelLeftOpen size={22} />
                : <PanelLeftClose size={22} />
            }
          </button>

        </div>

        {/* LOGO */}
        {!isCollapsed && (

          <div className="px-6 pb-4">

            <h1 className="text-2xl font-bold">
              ICON
            </h1>

            <p className="text-sm text-yellow-300">
              IPB Career Opportunity Network
            </p>

          </div>

        )}

      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2">

        {/* MAIN MENU */}
        {menuItems.map((item, index) => {

          const Icon = item.icon;

          // ACTIVE CHECK
          const isActive =

            item.matchPaths.some((path) =>
              location.pathname.startsWith(path)
            );

          return (

            <button
              key={index}

              onClick={() =>
                navigate(item.path)
              }

              className={`
                text-md
                flex
                items-center

                ${
                  isCollapsed
                    ? "justify-center"
                    : "gap-3"
                }

                w-full
                px-4
                py-3
                rounded-xl
                transition
                cursor-pointer

                ${
                  isActive
                    ? `
                      bg-indigo-950
                      text-kuning-tua
                    `
                    : `
                      text-white
                      hover:bg-indigo-700
                    `
                }
              `}
            >

              <Icon
                size={18}

                className={
                  isActive
                    ? "text-kuning-tua"
                    : "text-white"
                }
              />

            {!isCollapsed && (

              <span>
                {item.label}
              </span>

            )}

            </button>
          );
        })}

      </nav>

      {/* SETTINGS */}
      <div
        className="
          p-4
          border-t
          border-indigo-500
        "
      >

        <button
          className={`
            text-md
            flex
            items-center

            ${
              isCollapsed
                ? "justify-center"
                : "gap-3"
            }

            px-4
            py-3
            rounded-xl
            hover:bg-indigo-700
            transition
            w-full
            cursor-pointer
          `}
        >

          <Settings size={18} />

          {!isCollapsed && (

            <span>
              Pengaturan
            </span>

          )}

        </button>

      </div>

    </aside>
  );
};

export default SidebarMitra;
