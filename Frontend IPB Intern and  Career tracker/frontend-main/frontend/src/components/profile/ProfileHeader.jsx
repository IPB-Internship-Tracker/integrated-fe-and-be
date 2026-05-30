import {
    Pencil,
} from "lucide-react";

const ProfileHeader = ({
    image,
    name,
    onImageChange,
}) => {

    return (

        <div className="
            flex
            items-center
            gap-6
            mb-8
        ">

            {/* IMAGE */}
            <div className="relative">

                <img
                    src={image}
                    alt={name}
                    className="
                        w-24
                        h-24
                        rounded-full
                        object-cover
                        border-4
                        border-kuning-tua
                    "
                />

                {/* INPUT FILE */}
                <input
                    type="file"
                    accept="image/*"
                    id="profile-upload"
                    className="hidden"
                    onChange={onImageChange}
                />

                {/* EDIT BUTTON */}
                <label
                    htmlFor="profile-upload"
                    className="
                        absolute
                        bottom-0
                        right-0

                        w-8
                        h-8

                        rounded-full

                        bg-bold-blue
                        text-white

                        flex
                        items-center
                        justify-center

                        cursor-pointer

                        hover:bg-indigo-700
                        transition
                    "
                >
                    <Pencil size={16}/>
                </label>

            </div>

            {/* NAME */}
            <h1 className="
                text-3xl
                font-bold
                text-bold-blue
            ">
                {name}
            </h1>

        </div>

    );

};

export default ProfileHeader;