import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const KompeStupenCard = ({
    id,
    logo,
    title,
    company,
    category,
    location,
    deadline,
    to,
    className = "",
}) => {

    const navigate = useNavigate();

    return (

        <div
            onClick={() => navigate(to)}
            className={`
                bg-white
                rounded-xl
                shadow-sm
                px-4
                py-4

                hover:shadow-lg
                hover:-translate-y-1
                hover:bg-indigo-50

                transition-all
                duration-300
                cursor-pointer

                flex
                flex-col

                min-h-[150px]

                ${className}
            `}
            >
            {/* TOP */}
            <div className="flex items-start gap-4">

                <img
                    src={logo}
                    alt={company}
                    className="w-10 h-10 object-contain"
                />

                <div>
                    <h2 className="text-lg font-semibold">
                        {title}
                    </h2>
                    <p className="text-sm font-light">
                        {company}
                    </p>
                </div>
            </div>

            {/* PUSH CONTENT */}
            <div className="mt-auto">

            {/* LINE */}
            <div className="border-b border-indigo-200 my-3"></div>

            {/* BOTTOM */}
            <div className="flex items-end justify-end">

                <div className="text-right">

                <p className="text-xs text-bold-blue">
                    Batas Pendaftaran
                </p>

                <p className="text-sm font-semibold text-bold-blue">
                    {deadline}
                </p>

                </div>

            </div>

            </div>
        </div>
    );
};

export default KompeStupenCard;