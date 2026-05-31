import { useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  House,
  BriefcaseBusiness,
  Trophy,
  BookOpen,
  ChartNoAxesColumn,
  ChevronUp,
  ChevronDown,
  Settings,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

const SidebarMhs = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  onMobileClose,
}) => {

  const navigate = useNavigate();

  const location = useLocation();

  // MAIN MENU
  const menuItems = [

    {
      label: "Beranda",
      icon: House,
      path: "/dashboard-mahasiswa",

      matchPaths: [
        "/dashboard-mahasiswa",
      ],
    },

    {
      label: "Magang",
      icon: BriefcaseBusiness,
      path: "/magang-list",

      matchPaths: [
        "/magang-list",
        "/magang-detail",
        "/magang-filtered",
        "/formpendaftaran",
      ],
    },

    {
      label: "Kompetisi",
      icon: Trophy,
      path: "/kompetisi-list",

      matchPaths: [
        "/kompetisi-list",
        "/kompetisi-detail",
      ],
    },

    {
      label: "Studi Independen",
      icon: BookOpen,
      path: "/stupen-list",

      matchPaths: [
        "/stupen-list",
        "/studi-independen-detail",
      ],
    },

  ];

  // SUB MENU AKTIVITAS
  const aktivitasMenu = [

    {
      label: "Lamaran Saya",
      path: "/lamaran-list",

      matchPaths: [
        "/lamaran-list",
        "/lamaran-detail",
      ],
    },

    {
      label: "Logbook",
      path: "/logbook-list",

      matchPaths: [
        "/logbook-list",
        "/logbook-detail",
      ],
    },

  ];

  // DROPDOWN DEFAULT OPEN
  const [isOpen, setIsOpen] = useState(

    aktivitasMenu.some((item) =>

      item.matchPaths.some((path) =>
        location.pathname.startsWith(path)
      )
    )
  );

  const handleNavigate = (path) => {
    navigate(path);
    onMobileClose?.();
  };
  const showLabels = !isCollapsed || isMobileOpen;

  return (

    <aside
      className={`
        dashboard-sidebar
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

        ${
          isMobileOpen
            ? "mobile-open"
            : ""
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
        {showLabels && (

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
                handleNavigate(item.path)
              }
              className={`
                text-md
                flex
                items-center

                ${
                  !showLabels
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

              {showLabels && (

                <span>
                  {item.label}
                </span>

              )}

            </button>
          );
        })}

        {/* DROPDOWN */}
        <div>

        <button
          onClick={() => {

            if (!showLabels) {
              setIsCollapsed(false);
              return;
            }

            setIsOpen(!isOpen);
          }}

            className={`
              flex
              items-center

              ${
                !showLabels
                  ? "justify-center"
                  : "justify-between"
              }

              w-full
              px-4
              py-3
              rounded-lg
              hover:bg-indigo-700
              transition
              cursor-pointer
            `}
          >

            <div
              className="
                text-md
                flex
                items-center
                gap-3
              "
            >

              <ChartNoAxesColumn size={18} />

              {showLabels && (

                <span>
                  Aktivitas
                </span>

              )}

            </div>

            {showLabels && (

              isOpen
                ? <ChevronUp />
                : <ChevronDown />

            )}

          </button>

          {/* SUBMENU */}
          {isOpen && showLabels && (

            <div
              className="
                ml-8
                mt-2
                space-y-2
              "
            >

              {aktivitasMenu.map((item, index) => {

                // ACTIVE CHECK
                const isActive =

                  item.matchPaths.some((path) =>
                    location.pathname.startsWith(path)
                  );

                return (

                  <button
                    key={index}

                    onClick={() =>
                      handleNavigate(item.path)
                    }

                    className={`
                      block
                      w-full
                      text-left
                      px-4
                      py-2
                      rounded-lg
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
                            hover:text-kuning-tua
                          `
                      }
                    `}
                  >

                    {item.label}

                  </button>
                );
              })}

            </div>
          )}

        </div>

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
              !showLabels
                ? "justify-center"
                : "gap-3"
            }

            px-4
            py-3
            rounded-lg
            hover:bg-indigo-700
            w-full
            cursor-pointer
          `}
        >

          <Settings size={20} />

          {showLabels && (
            <span>
              Pengaturan
            </span>
          )}

        </button>

      </div>

    </aside>
  );
};

export default SidebarMhs;
