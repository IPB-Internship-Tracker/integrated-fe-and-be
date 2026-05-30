import { Search } from "lucide-react";

const SearchBar = ({
    placeholder = "Cari...",
    value,
    onChange,
}) => {

    return (
        <div className ="
            flex items-center
            bg-light-blue-2
            rounded-full
            px-4
            py-1
            w-full
            

            border
            border-transparent
            focus-within:border-indigo-400
            transition
        ">
            {/* ICON */}
            <Search
                size={18}
                className="text-bold-blue"
            />

            {/* INPUT */}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                    bg-transparent
                    outline-none
                    ml-4
                    w-full
                    text-lg

                    text-gray-700
                    placeholder:text-bold-blue
                "

            />

        </div>
    );
};

export default SearchBar;