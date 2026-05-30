import { useEffect, useState } from "react";
import { showAlert } from "../../services/alertService";

import BackButton from "../../components/ui/BackButton";
import Button from "../../components/ui/Button";

import ProfileCard from "../../components/profile/ProfileCard";

import fotoMhs from "../../assets/profile-mahasiswa.jpg";
import { authService } from "../../services/authService";
import { mahasiswaService } from "../../services/mahasiswaService";
import {
    mapMahasiswaProfileToUi,
} from "../../services/adapters";

const readonlyProfileFields = ["email", "nim"];

const readonlyProfileLabels = {
    email: "Email",
    nim: "NIM",
};

const getChangedFields = (formData, sourceData) =>
    Object.keys(formData).filter(
        (key) =>
            String(formData[key] ?? "") !==
            String(sourceData[key] ?? "")
    );

const getReadonlyMessage = (fields) =>
    fields
        .map((field) => readonlyProfileLabels[field])
        .join(", ");

const ProfileMhs = () => {

    const [mahasiswaData, setMahasiswaData] =
        useState({
            id: "",
            userId: "",
            nama: "",
            email: "",
            nim: "",
            semester: "",
            fakultas: "",
            prodi: "",
            fotoProfile: "",
        });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await mahasiswaService.getMe();
                const mappedData =
                    mapMahasiswaProfileToUi(data);

                setMahasiswaData(mappedData);
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadProfile();
    }, []);

    const mahasiswaFields = [

        {
            label: "Nama Mahasiswa",
            name: "nama",
            fullWidth: true,
        },

        {
            label: "Email",
            name: "email",
        },

        {
            label: "NIM",
            name: "nim",
        },

        {
            label: "Semester",
            name: "semester",
        },

        {
            label: "Fakultas",
            name: "fakultas",
        },

        {
            label: "Program Studi",
            name: "prodi",
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
                    to="/dashboard-mahasiswa"
                />
            </div>

            {/* PROFILE CARD */}
            <ProfileCard
                title="Data Pribadi"
                fields={mahasiswaFields}
                initialData={mahasiswaData}
                initialImage={
                    mahasiswaData.fotoProfile ||
                    fotoMhs
                }
                onSave={async (formData, imageData) => {
                    const changedFields =
                        getChangedFields(formData, mahasiswaData);
                    const imageChanged =
                        imageData?.isChanged;
                    const immutableFields =
                        changedFields.filter((field) =>
                            readonlyProfileFields.includes(field)
                        );
                    const editableFields =
                        changedFields.filter((field) =>
                            [
                                "nama",
                                "semester",
                                "fakultas",
                                "prodi",
                            ].includes(field)
                        );

                    if (
                        immutableFields.length > 0 &&
                        editableFields.length === 0 &&
                        !imageChanged
                    ) {
                        setMahasiswaData({ ...mahasiswaData });

                        return {
                            title: "Data tidak dapat diubah",
                            description:
                                `${getReadonlyMessage(
                                    immutableFields
                                )} tidak dapat diperbarui dari halaman profil.`,
                        };
                    }

                    let nextData = { ...mahasiswaData };

                    if (editableFields.length > 0) {
                        const updated =
                            await mahasiswaService.updateMe({
                            ...formData,
                            email: mahasiswaData.email,
                            nim: mahasiswaData.nim,
                        });

                        nextData =
                            mapMahasiswaProfileToUi(updated);
                    }

                    if (imageChanged) {
                        if (!imageData?.file) {
                            throw new Error(
                                "File gambar profil belum tersedia."
                            );
                        }

                        const updated =
                            await mahasiswaService.uploadProfilePhoto(
                                imageData.file
                            );
                        nextData =
                            mapMahasiswaProfileToUi(updated);
                        window.dispatchEvent(
                            new Event("profileImageUpdated")
                        );
                    }

                    setMahasiswaData(nextData);

                    if (immutableFields.length > 0) {
                        return {
                            
                            title: "Sebagian data berhasil disimpan",
                            description:
                                `Perubahan profil yang didukung berhasil disimpan. ${getReadonlyMessage(
                                    immutableFields
                                )} tidak dapat diperbarui dari halaman profil.`,
                        };
                    }
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

export default ProfileMhs;
