const KategoriCard = ({
  icon,
  title,
  onClick,
  isActive = false,
}) => {

    return (
        <button
            onClick={onClick}
            className={`
                min-w-[180px]
                border
                rounded-xl
                px-2
                py-2
                flex
                flex-col
                items-center
                justify-center
                gap-2
                cursor-pointer
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
                ${
                isActive
                    ? `
                    bg-bold-blue
                    border-bold-blue
                    text-white
                    `
                    : `
                    bg-kuning-muda
                    border-kuning-tua
                    hover:bg-kuning-muda
                    `
                }
            `}
        >
            {/* ICON */}
            <div
            className={
                isActive
                ? "text-white"
                : "text-kuning-tua"
            }
            >
                {icon}
            </div>

            {/* TITLE */}
            <p className={`
                text-sm
                text-center
                font-medium

                ${
                isActive
                    ? "text-white"
                    : "text-bold-blue"
                }
            `}>
                
                {title}
            </p>

        </button>
    );
};

export default KategoriCard;