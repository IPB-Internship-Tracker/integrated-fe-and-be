import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import ProgramStatus from "../ui/ProgramStatus";
import Button from "../ui/Button";

const ProgramListCard = ({
    logo,
    title,
    company,
    category,
    participantInfo,
    period,
    status,
    to,
    showParticipant = true,
    showPeriod = true,
    onDelete,
}) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => to && navigate(to)} className="
            bg-white
            rounded-xl
            shadow-sm
            px-5
            py-4
            flex
            items-center
            justify-between
            hover:shadow-md
            hover:translate-y-1
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

                {/* TEXT SECTION */}
                <div>
                    {/* TITLE CATEGORY */}
                    <div className ="
                        flex
                        items-center
                        gap-3
                        mb-1
                    ">
                        {/* TITLE */}
                        <h2 className="
                            text-lg
                            font-semibold
                        ">
                            {title}
                        </h2>

                        {/* CATEGORY */}
                        <div className="
                            px-3
                            py-1
                            rounded-full
                            border
                            border-bold-blue
                            bg-light-blue-2
                            text-xs
                            font-medium
                            text-bold-blue
                        ">
                            {category}

                        </div>

                    </div>

                    {/* COMPANY */}
                    <p className="
                        text-md
                        font-light
                    ">
                        {company}
                    </p>
                    
                    {/* PARTICIPANT */}
                    {showParticipant && (

                        <p className="
                            text-md
                            text-indigo-700
                            mt-1
                        ">
                            {participantInfo}
                        </p>

                    )}
                    

                    
                </div>

            </div>
            

            {/* RIGHT SECTION */}
            <div className="
                flex
                flex-col
                items-end
                gap-3
            ">
                {/* DELETE */}
                {onDelete && (

                    <Button
                        icon={<Trash2 size={18} />}
                        iconOnly={true}
                        className="
                            text-white
                            bg-red-500
                            hover:bg-red-700
                        "
                        onClick={(e) => {
                            e?.stopPropagation?.();
                            onDelete();
                        }}
                    />

                )}

                {/* STATUS */}
                <ProgramStatus status={status}/>
                
                {/* PERIODE */}
                {showPeriod && (

                    <div className="text-right">

                        <p className="
                            text-sm
                            font-base
                        ">
                            <span className="
                                text-sm
                                font-medium
                                text-gray-500
                            ">
                                Periode:
                            </span>{" "}

                            {period}

                        </p>

                    </div>

                )}

            </div>

        </div>
    )
}

export default ProgramListCard;
