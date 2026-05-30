import { useEffect, useState } from "react";
import {
    CircleCheckBig,
} from "lucide-react";
import { showAlert } from "../../services/alertService";

import ProfileHeader from "./ProfileHeader";

import FormField from "../forms/FormField";

import Button from "../ui/Button";
import PopUpNotif from "../ui/PopUpNotif";

const ProfileCard = ({
    title,
    fields,
    initialData,
    initialImage,
    onSave,
}) => {

    // IMAGE
    const [profileImage, setProfileImage] =
        useState(initialImage);
    // IMAGE CHANGED
    const [isImageChanged, setIsImageChanged] =
    useState(false);
    const [profileImageFile, setProfileImageFile] =
    useState(null);
    const [profileImageDataUrl, setProfileImageDataUrl] =
    useState("");

    // FORM DATA
    const [formData, setFormData] =
        useState(initialData || {});

    // POPUP
    const [showPopup, setShowPopup] =
        useState(false);
    const [popupContent, setPopupContent] =
        useState({
            title: "Profile berhasil diperbarui",
            description: `
                Perubahan data profile
                berhasil disimpan.
            `,
        });

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);

    useEffect(() => {
        setProfileImage(initialImage);
    }, [initialImage]);

    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    // HANDLE IMAGE
const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result;

            setProfileImage(imageUrl);
            setProfileImageDataUrl(imageUrl);
            setProfileImageFile(file);

            // DETECT IMAGE CHANGE
            setIsImageChanged(true);
        };

        reader.onerror = () => {
            showAlert("Gagal membaca file gambar.");
        };

        reader.readAsDataURL(file);

    }

};

    // HANDLE SAVE
    const handleSave = async () => {
        const isFormChanged =
            JSON.stringify(formData)
            !== JSON.stringify(initialData);

        // FORM ATAU FOTO BERUBAH
        const isChanged =
            isFormChanged ||
            isImageChanged;

        if (!isChanged) {
            return;
        }

        try {
            let saveFeedback;
            if (onSave) {
                saveFeedback = await onSave(formData, {
                    file: profileImageFile,
                    dataUrl: profileImageDataUrl,
                    isChanged: isImageChanged,
                });
            }

            setPopupContent({
                title:
                    saveFeedback?.title ||
                    "Profile berhasil diperbarui",
                description:
                    saveFeedback?.description ||
                    `
                        Perubahan data profile
                        berhasil disimpan.
                    `,
            });
        } catch (error) {
            showAlert(error.message);
            return;
        }

        setShowPopup(true);

        setIsImageChanged(false);
        setProfileImageFile(null);
        setProfileImageDataUrl("");
    };


    return (
        <>
            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                max-w-4xl
                mx-auto
                px-10
                py-8
            ">

                {/* HEADER */}
                <ProfileHeader
                    image={profileImage}
                    name={
                        formData.nama ||
                        formData.namaInstansi
                    }
                    onImageChange={
                        handleImageChange
                    }
                />

                {/* LINE */}
                <div className="
                    border-b
                    border-light-blue
                    mb-8
                "></div>

                {/* TITLE */}
                <h2 className="
                    text-2xl
                    font-bold
                    text-center
                    text-gray-700
                    mb-8
                ">
                    {title}
                </h2>

                {/* FORM */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">

                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className={
                                field.fullWidth
                                ? "md:col-span-2"
                                : ""
                            }
                        >
                            <FormField
                                label={field.label}
                                name={field.name}
                                value={
                                    formData[field.name]
                                }
                                onChange={handleChange}                            />

                        </div>
                    ))}

                </div>

                {/* BUTTON */}
                <div className="
                    flex
                    justify-center
                    mt-8
                ">
                    <Button
                        label="Simpan"
                        onClick={handleSave}
                    />
                </div>

            </div>

            {/* POPUP */}
            <PopUpNotif
                isOpen={showPopup}
                onClose={() =>
                    setShowPopup(false)
                }
                icon={
                    <CircleCheckBig
                        size={70}
                        className="
                            text-green-500
                        "
                    />
                }

                title={popupContent.title}
                description={popupContent.description}
            >
                <Button
                    label="Tutup"
                    onClick={() =>
                        setShowPopup(false)
                    }
                />

            </PopUpNotif>
        </>
    );
};
export default ProfileCard;
