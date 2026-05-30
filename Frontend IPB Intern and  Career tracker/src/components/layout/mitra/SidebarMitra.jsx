import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  House,
  ChartLine,
  Settings,
} from "lucide-react";

const SidebarMitra = () => {

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
      className="
        fixed
        top-0
        left-0
        w-64
        min-h-screen
        bg-indigo-900
        text-white
        flex
        flex-col
      "
    >

      {/* LOGO */}
      <div
        className="
          p-6
          border-b
          border-indigo-500
        "
      >

        <h1 className="text-2xl font-bold">
          ICON
        </h1>

        <p className="text-sm text-yellow-300">
          IPB Career Opportunity Network
        </p>

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
                gap-3
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

              <span>
                {item.label}
              </span>

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
          className="
            text-md
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-indigo-700
            transition
            w-full
            cursor-pointer
          "
        >

          <Settings size={18} />

          <span>
            Pengaturan
          </span>

        </button>

      </div>

    </aside>
  );
};

export default SidebarMitra;