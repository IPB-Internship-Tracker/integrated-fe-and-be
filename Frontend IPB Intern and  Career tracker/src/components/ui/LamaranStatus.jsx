import {
  CheckCheck,
  CircleX,
  Contact,
  FileClock,
  ChevronDown,
} from "lucide-react";

const LamaranStatus = ({
  status,
  onClick,
  isDropdown = false,
}) => {

  let statusIcon;
  let statusStyle = "";

  // DITERIMA
  if (status === "Diterima") {

    statusStyle =
      "bg-hijau-muda-status text-hijau-tua-status border-hijau-tua-status";

    statusIcon = <CheckCheck size={14} />;
  }

  // DITOLAK
  else if (status === "Ditolak") {

    statusStyle =
      "bg-merah-muda-status text-merah-tua-status border-merah-tua-status";

    statusIcon = <CircleX size={14} />;
  }

  // WAWANCARA
  else if (status === "Wawancara") {

    statusStyle =
      "bg-biru-muda-status text-biru-tua-status border-biru-tua-status";

    statusIcon = <Contact size={14} />;
  }

  // DEFAULT
  else {

    statusStyle =
      "bg-kuning-muda-status text-kuning-tua-secondary border-kuning-tua-secondary";

    statusIcon = <FileClock size={14} />;
  }

  return (

    <button
      onClick={onClick}
      className={`
        px-3
        py-1.5
        border
        rounded-full
        text-xs
        font-medium
        flex
        items-center
        gap-1
        w-fit
        transition

        ${
          isDropdown
            ? "hover:opacity-80 cursor-pointer"
            : "cursor-default"
        }

        ${statusStyle}
      `}
    >

      {/* ICON */}
      {statusIcon}

      {/* TEXT */}
      <span>
        {status}
      </span>

      {/* DROPDOWN ICON */}
      {isDropdown && (
        <ChevronDown size={14} />
      )}

    </button>
  );
};

export default LamaranStatus;