import { useNavigate } from "react-router-dom";

const BidangCard = ({
  icon,
  title,
  to = "/",
}) => {

    const navigate = useNavigate();

    return (
        <button
        onClick={() => navigate(to)}
        className="
            flex
            items-center
            bg-white
            border
            border-kuning-tua
            rounded-xl
            overflow-hidden
            w-auto
            h-30
            hover:shadow-xl
            hover:-translate-y-1
            transition
            duration-300
            text-left
        "
        >

        {/* ICON SECTION */}
        <div className="h-full w-25 bg-kuning-muda flex items-center justify-center">
            {icon}
        </div>

        {/* TITLE */}
        <div className="flex-1 px-6">

            <h2 className="text-2xl font-semibold text-bold-blue">
            {title}
            </h2>

        </div>

        </button>
    );
};

export default BidangCard;