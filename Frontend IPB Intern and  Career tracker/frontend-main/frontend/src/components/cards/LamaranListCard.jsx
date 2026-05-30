import { useNavigate } from "react-router-dom";
import LamaranStatus from "../ui/LamaranStatus";

const LamaranListCard = ({
    logo,
    title,
    company,
    category,
    appliedDate,
    updatedDate,
    status,
    to,
}) => {

    const navigate = useNavigate();
    return (
        <div
            onClick={() => to && navigate(to)}
            className="
                bg-white
                rounded-xl
                shadow-sm

                px-5
                py-2
                mt-5
                
                flex
                items-center
                justify-between
                
                hover:shadow-md
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
        
            "
        >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
                {/* LOGO */}
                <img
                    src={logo}
                    alt={company}
                    className="
                        w-14
                        h-14
                        object-contain
                    "
                />

                {/* TEXT */}
                <div>

                    {/* TITLE CATEGORY */}
                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-1
                    ">
                        {/* TITLE */}
                        <h2 className="
                            text-lg
                            font-semibold
                            text-gray-900
                        ">
                            {title}
                        </h2>

                        {/* CATEGORY */}
                        <div className="
                            px-3
                            py-1
                            rounded-full
                            border
                            border-bold-primary
                            bg-light-blue-2
                            text-xs
                            font-medium
                            text-bold-blue
                        ">
                            {category}
                        </div>
                    </div>

                    {/* COMPANY */}
                    <h3 className="
                        text-lg
                        text-gray-700
                    ">
                        {company}
                    </h3>

                    {/* APPLIED DATE */}
                    <p className="
                        text-md
                        text-bold-blue
                        mt-1
                    ">
                        Mendaftar pada:
                        {" "}
                        <span className="text-md font-semibold">
                        {appliedDate}
                        </span>
                    </p>

                </div>

            </div>
            {/* RIGHT SECTION */}
            <div className="
                flex
                flex-col
                items-end
                gap-3
            ">
                {/* STATUS */}
                <LamaranStatus status={status}/>

                {/* UPDATE DATE */}
                <div className="text-right">
                    <p className="
                        text-md
                        text-bold-blue
                    ">
                        Status diperbarui pada:
                        {" "}
                        <span className="text-md font-semibold">
                        {updatedDate}
                        </span>
                    </p>

                </div>

            </div>
            
        </div>
    )

}

export default LamaranListCard