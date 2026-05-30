const PopUpNotif = ({
  isOpen = false,
  onClose,

  icon,
  title = "Judul Utama",
  description = "Deskripsi tambahan",

  children,
}) => {

  if (!isOpen) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        px-4
      "
    >

      {/* MODAL */}
      <div
        className="
          relative
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-2xl
          px-8
          py-10
          text-center
          animate-fadeInUp
        "
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            text-gray-500
            hover:text-black
            transition
            text-xl
            cursor-pointer
          "
        >
          ✕
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-6">
          {icon}
        </div>

        {/* TITLE */}
        <h1 className="text-xl font-bold text-black mb-1">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-md mb-10">
          {description}
        </p>

        {/* BUTTON AREA */}
        <div className="flex justify-center gap-4 flex-wrap">

          {children}

        </div>

      </div>
    </div>
  );
};

export default PopUpNotif;