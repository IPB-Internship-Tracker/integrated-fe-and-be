import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    return (
        <div className="
            flex
            items-center
            justify-center
            gap-3
            mt-12
        ">
            {/* PREVIOUS BUTTON or CHEVRONL LEFT */}
            <button
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                disabled={currentPage === 1}

                className="
                    w-10
                    h-7
                    px-3
                    py-1
                    rounded-full
                    bg-kuning-tua
                    text-bold-blue
                    hover:bg-yellow-200
                    transition
                    
                    
                "
            >
                <ChevronLeft size={18}/>
                
            </button>

            {/* PAGE NUMBER */}
            {Array.from(
                {length: totalPages},
                (_, index) => {
                    const page = index + 1;

                    return(
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                w-10
                                h-10
                                rounded-full
                                text-sm
                                font-medium
                                transition

                                ${
                                    currentPage === page
                                
                                ? "bg-bold-blue text-white"
                                : "bg-light-blue-2 text-light-blue border-indigo-200 hover:bg-indigo-50"
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                }
            )}

            {/* NEXT BUTTON or CHEVRON RIGHT */}
            <button
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}

                className="
                    w-10
                    h-7
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-400
                    text-indigo-700
                    hover:bg-yellow-200
                    transition
                    
                    
                "
            >
                <ChevronRight size={18}/>
                
            </button>

        </div>
    );
};

export default Pagination;