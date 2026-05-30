import { useNavigate } from "react-router-dom";

const LamaranCard = ({
    logo,
    title,
    company,
    bidang,
    participantInfo,
    status,
    statusComponent: StatusComponent,
    to,
}) => {

    const navigate = useNavigate();

    return (

        <div onClick={()=> to && navigate(to)} className="
            bg-white
            rounded-xl
            shadow-sm
            p-3
            flex items-center justify-between
            w-full

            hover:shadow-md
            hover:-translate-y-1
            transition-all

            cursor-pointer
        ">

            {/* LEFT SECTION */} 
            <div className="flex items-center gap-4">

                {/* LOGO */}
                <img
                    src={logo}
                    alt={company}
                    className="w-12 h-12 object-contain"
                />

                {/* TEXT */}
                <div>

                    {/* TITLE */}
                    <h2 className="
                        text-md
                        font-semibold
                        text-gray-900
                    ">
                        {title}
                    </h2>

                    {/* COMPANY */}
                    {company && (
                        <p className="
                            text-sm
                            text-gray-700
                        ">
                            {company}
                        </p>
                    )}

                    {/* BIDANG */}
                    {bidang && (
                        <p className="
                            text-sm
                            text-gray-700
                        ">
                            {bidang}
                        </p>
                    )}

                    {/* PARTICIPANT */}
                    {participantInfo && (
                        <p className="
                            text-sm
                            text-gray-700
                        ">
                            {participantInfo}
                        </p>
                    )}

                </div>

            </div>

            {/* STATUS */}
            <StatusComponent status={status} />

        </div>
    );
};

export default LamaranCard;