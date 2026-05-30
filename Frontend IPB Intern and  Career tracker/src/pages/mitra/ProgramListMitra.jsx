import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import { showAlert } from "../../services/alertService";

import SearchBar from "../../components/ui/SearchBar";
import FilterButton from "../../components/ui/FilterButton";
import Pagination from "../../components/ui/Pagination";
import ProgramListCard from "../../components/cards/ProgramListCard";
import Button from "../../components/ui/Button";
import PopUpNotif from "../../components/ui/PopUpNotif";
import { kegiatanService } from "../../services/kegiatanService";
import { lamaranService } from "../../services/lamaranService";
import { mitraService } from "../../services/mitraService";
import { getKegiatanDetailRoute, mapKegiatanToCard } from "../../services/adapters";

const ProgramListMitra = () => {
    // FILTER CATEGORY
    const [selectedCategory, setSelectedCategory] =
        useState("Semua");

    // SEARCH
    const [search, setSearch] =
        useState("");

    // PAGINATION
    const [currentPage, setCurrentPage] =
        useState(1);

    const [programList, setProgramList] =
        useState([]);
    const [openDeletePopup, setOpenDeletePopup] =
        useState(false);
    const [selectedProgram, setSelectedProgram] =
        useState(null);

    useEffect(() => {
        const loadPrograms = async () => {
            try {
                const mitra = await mitraService.getMe();
                const data = await kegiatanService.list({
                    mitra_id: mitra.mitra_id,
                });
                const applicantCounts = await Promise.all(
                    data.map((program) =>
                        program.kategori_mbkm === "magang"
                            ? lamaranService
                                .listByKegiatan(program.mbkm_id)
                                .then((items) => items.length)
                                .catch(() => 0)
                            : Promise.resolve(0)
                    )
                );
                setProgramList(
                    data.map((item, index) => {
                        const mapped = mapKegiatanToCard(item);

                        return {
                            ...mapped,
                            company: mitra.nama_instansi,
                            participantInfo:
                                mapped.category === "Magang"
                                    ? `Total: ${applicantCounts[index]} Pendaftar`
                                    : "",
                        };
                    })
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadPrograms();
    }, []);

    const handleDeleteClick = (program) => {
        setSelectedProgram(program);
        setOpenDeletePopup(true);
    };

    const handleDeleteProgram = async () => {
        if (!selectedProgram) return;

        try {
            await kegiatanService.remove(selectedProgram.id);
            setProgramList((prev) =>
                prev.filter(
                    (program) =>
                        program.id !== selectedProgram.id
                )
            );
            setOpenDeletePopup(false);
            setSelectedProgram(null);
        } catch (error) {
            showAlert(error.message);
        }
    };

    // FILTER LOGIC
    const filteredPrograms = programList.filter(
        (program) => {
            // FILTER CATEGORY
            const matchCategory =
                selectedCategory === "Semua"
                ||
                program.category === selectedCategory;
            // SEARCH
            const matchSearch =
                program.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return matchCategory && matchSearch;
        }
    );

    // ROUTE DETAIL

    // PAGINATION
    const itemsPerPage = 4;

    const totalPages = Math.ceil(
        filteredPrograms.length / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentPrograms =
        filteredPrograms.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    return (
        <div>
            {/* HEADER */}
            <div className="
                flex
                items-center
                justify-between
            ">

                {/* TITLE */}
                <h1 className="
                    text-3xl
                    font-bold
                    text-indigo-700
                ">
                    Program yang Anda Buat
                </h1>

                {/* DRAFT BUTTON */}
                <Button
                    label="Draft"
                    to="/draft-list"
                    className="
                        text-md
                        px-5
                        py-2
                    "
                />

            </div>

            {/* SUBTITLE */}
            <p className="
                font-light
                mt-2
            ">
                Lihat program yang telah Anda buat di sini
            </p>

            {/* FILTER SEARCH */}
            <div className="
                flex
                items-center
                justify-between
                gap-6
                mt-8
            ">

                {/* FILTER */}
                <div className="flex gap-2">

                    <FilterButton
                        label="Semua"
                        active={
                            selectedCategory === "Semua"
                        }
                        onClick={() =>
                            setSelectedCategory("Semua")
                        }
                    />

                    <FilterButton
                        label="Magang"
                        active={
                            selectedCategory === "Magang"
                        }
                        onClick={() =>
                            setSelectedCategory("Magang")
                        }
                    />

                    <FilterButton
                        label="Kompetisi"
                        active={
                            selectedCategory === "Kompetisi"
                        }
                        onClick={() =>
                            setSelectedCategory("Kompetisi")
                        }
                    />

                    <FilterButton
                        label="Studi Independen"
                        active={
                            selectedCategory ===
                            "Studi Independen"
                        }
                        onClick={() =>
                            setSelectedCategory(
                                "Studi Independen"
                            )
                        }
                    />

                </div>

                {/* SEARCH */}
                <div className="w-[420px]">

                    <SearchBar
                        placeholder="Cari..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* PROGRAM LIST */}
            <div className="
                mt-8
                space-y-5
            ">

                {currentPrograms.map(
                    (program, index) => (

                        <ProgramListCard
                            key={index}
                            logo={program.logo}
                            title={program.title}
                            company={program.company}
                            category={program.category}
                            participantInfo={
                                program.participantInfo
                            }
                            period={program.period}
                            status={program.status}
                            showParticipant={
                                program.category === "Magang"
                            }
                            to={getKegiatanDetailRoute(program, true)}
                            onDelete={() =>
                                handleDeleteClick(program)
                            }
                        />
                    )
                )}

            </div>

            <PopUpNotif
                isOpen={openDeletePopup}
                onClose={() => setOpenDeletePopup(false)}
                icon={
                    <CircleAlert
                        size={90}
                        className="text-red-500"
                    />
                }
                title="Hapus Program?"
                description={`
                    Program "${selectedProgram?.title}"
                    akan dihapus permanen.
                `}
            >
                <Button
                    label="Batal"
                    onClick={() => setOpenDeletePopup(false)}
                    className="
                        border
                        border-bold-blue
                        text-bold-blue
                        bg-white
                    "
                />

                <Button
                    label="Hapus"
                    onClick={handleDeleteProgram}
                />
            </PopUpNotif>

            {/* PAGINATION */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    );
};

export default ProgramListMitra;
