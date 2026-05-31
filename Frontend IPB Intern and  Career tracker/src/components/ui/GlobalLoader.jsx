import { LoaderCircle } from "lucide-react";

const GlobalLoader = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[80]
        flex
        items-center
        justify-center
        bg-black/20
        backdrop-blur-xs
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-3
          rounded-2xl
          bg-white
          px-8
          py-6
          shadow-2xl
          border
          border-light-blue
        "
      >
        <LoaderCircle
          size={40}
          className="animate-spin text-bold-blue"
        />

        <p className="text-sm font-semibold text-bold-blue">
          Memuat data...
        </p>
      </div>
    </div>
  );
};

export default GlobalLoader;
