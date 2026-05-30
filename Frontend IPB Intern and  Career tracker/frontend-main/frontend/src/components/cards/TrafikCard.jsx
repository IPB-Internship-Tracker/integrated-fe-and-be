import {UserRoundPlus} from "lucide-react";

const TrafikCard = ({
    title,
    icon,
    programCount,
    participantCount,
    showParticipant = true,
}) => {

    return (

        <div className="
            bg-kuning-muda
            border
            border-kuning-tua
            rounded-2xl
            px-4
            py-3
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
        ">

            {/* TRAFIC SECTION or TITLE */}
            <h2 className="
                text-xl
                font-bold
                text-bold-blue
                text-center
                mb-3
            ">
                {title}
            </h2>

            {/* CONTENT */}
            <div
            className={`
                flex
                gap-3
                ${!showParticipant ? "justify-center" : ""}
            `}
            >

                {/* TOTAL PROGRAM */}
                <div
                className={`
                    bg-kuning-muda
                    rounded-xl
                    border
                    border-kuning-tua
                    px-3
                    py-2
                    flex
                    items-center
                    gap-3

                    ${showParticipant ? "flex-1" : "w-[40%]"}
                `}
                >
                    {/* ICON */}
                    <div className="text-kuning-tua">
                        {icon}
                    </div>
                    {/* TEXT */}
                    <div>
                        {/* PROGRAM COUNT */}
                        <h3 className="
                            text-3xl
                            font-bold
                            text-gray-900
                            leading-none
                        ">
                            {programCount}
                        </h3>

                        <p className="
                            text-[10px]
                            text-gr-500
                        ">
                            Program
                        </p>

                        
                    </div>

                </div>

                {/* TOTAL PARTICIPANT */}
                {showParticipant && (
                <div className="
                    flex-1
                    bg-kuning-muda
                    rounded-xl
                    border
                    border-kuning-tua
                    px-3
                    py-2
                    flex
                    items-center
                    gap-3
                ">
                    {/* ICON */}
                    <div className="text-kuning-tua font-bold">
                        <UserRoundPlus size={45}/>
                    </div>
                    {/* TEXT */}
                    <div>
                        {/* PROGRAM COUNT */}
                        <h3 className="
                            text-3xl
                            font-bold
                            text-gray-900
                            leading-none
                        ">
                            {participantCount}
                        </h3>

                        <p className="
                            text-[10px]
                            text-gray-500
                        ">
                            Total Pendaftar
                        </p>

                        
                    </div>
                </div>
                )}



            </div>

        </div>
    )
}

export default TrafikCard;
