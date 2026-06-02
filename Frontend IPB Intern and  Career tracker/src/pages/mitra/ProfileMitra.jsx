import { useEffect, useState } from "react";
import { showAlert } from "../../services/alertService";

import Button from "../../components/ui/Button";
import BackButton from "../../components/ui/BackButton";

import ProfileCard from "../../components/profile/ProfileCard";

import { authService } from "../../services/authService";
import { mitraService } from "../../services/mitraService";
import { mapMitraProfileToUi } from "../../services/adapters";

const ProfileMitra = () => {

    const [mitraData, setMitraData] =
        useState({
            namaInstansi: "",
            jenisInstansi: "",
            emailInstansi: "",
            fotoProfile: "",
        });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await mitraService.getMe();
                setMitraData(mapMitraProfileToUi(data));
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadProfile();
    }, []);

    const mitraFields = [

        {
            label: "Nama Instansi",
            name: "namaInstansi",
            fullWidth: true,
        },

        {
            label: "Jenis Instansi",
            name: "jenisInstansi",
        },

        {
            label: "Email Instansi",
            name: "emailInstansi",
        },

    ];

    return (

        <div>

            {/* BACK */}
            <div className="px-3 space-y-8 mb-8">
                <BackButton
                    label="Kembali"
                    color="text-bold-blue"
                    position="relative"
                />
            </div>

            {/* PROFILE CARD */}
            <ProfileCard
                title="Data Instansi"
                fields={mitraFields}
                initialData={mitraData}
                initialImage={mitraData.fotoProfile || null}
                onSave={async (formData, imageData) => {
                    let nextData = mitraData;

                    const updated =
                        await mitraService.updateMe(formData);
                    nextData = mapMitraProfileToUi(updated);

                    if (imageData?.isChanged) {
                        if (!imageData.file) {
                            throw new Error(
                                "File gambar profil belum tersedia."
                            );
                        }

                        const updatedPhoto =
                            await mitraService.uploadProfilePhoto(
                                imageData.file
                            );
                        nextData =
                            mapMitraProfileToUi(updatedPhoto);
                        window.dispatchEvent(
                            new Event("mitraProfileUpdated")
                        );
                    }

                    setMitraData(nextData);

                    window.dispatchEvent(
                        new Event("mitraProfileUpdated")
                    );
                }}
            />

            {/* LOGOUT */}
            <div className="
                flex
                justify-center
                mt-8
            ">

                <Button
                    label="Logout"
                    to="/"
                    onClick={authService.logout}

                    className="
                        bg-red-700
                        text-white
                        hover:bg-red-800
                    "
                />

            </div>

        </div>

    );

};

export default ProfileMitra;
