import { useEffect, useState } from "react";
import { showAlert } from "../../services/alertService";

import FilterButton from "../../components/ui/FilterButton";
import SearchBar from "../../components/ui/SearchBar";
import Pagination from "../../components/ui/Pagination";
import LamaranListCard from "../../components/cards/LamaranListCard";
import { lamaranService } from "../../services/lamaranService";
import { mapLamaranToListItem } from "../../services/adapters";


const LamaranList = () => {

    // FILTER STATUS
    const [selectedStatus, setSelectedStatus] =
        useState("Semua");

    // SEARCH
    const [search, setSearch] =
        useState("");

    // PAGINATION
    const [currentPage, setCurrentPage] =
        useState(1);

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const loadApplications = async () => {
            try {
                const data =
                    await lamaranService.listMineWithDetails();
                setApplications(
                    data.map(mapLamaranToListItem)
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadApplications();
    }, []);

    // FILTER LOGIC
    const filteredApplications =
        applications.filter((item) => {

            // FILTER STATUS
            const matchStatus =

                selectedStatus === "Semua"

                ||

                item.status === selectedStatus;

            // SEARCH
            const matchSearch =

                item.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return (
                matchStatus
                &&
                matchSearch
            );
        });

    // PAGINATION
    const itemsPerPage = 6;

    const totalPages = Math.ceil(
        filteredApplications.length
        / itemsPerPage
    );

    const startIndex =
        (currentPage - 1)
        * itemsPerPage;

    const currentApplications =
        filteredApplications.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    return (

        <div>

            {/* TITLE */}
            <h1 className="
                text-3xl
                font-bold
                text-bold-blue
            ">
                Lamaran Saya
            </h1>

            {/* SUBTITLE */}
            <p className="
                text-lg
                text-gray-700
                mt-2
            ">
                Lihat status program yang telah Anda lamar di sini
            </p>

            {/* FILTER STATUS SEARCH */}
            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-end
                    md:justify-between
                    gap-4
                    mt-8
                "
            >

                {/* FILTER STATUS */}
                <div>

                    {/* TITLE */}
                    <h2 className="
                        text-lg
                        font-semibold
                        text-bold-blue
                        mb-4
                    ">
                        Filter status lamaran
                    </h2>

                    {/* BUTTON LIST */}
                    <div className="
                        flex
                        gap-2
                        md:gap-3
                        flex-wrap
                    ">

                        <FilterButton
                            label="Semua"
                            active={
                                selectedStatus ===
                                "Semua"
                            }
                            onClick={() =>
                                setSelectedStatus(
                                    "Semua"
                                )
                            }
                        />

                        <FilterButton
                            label="Telah Mendaftar"
                            active={
                                selectedStatus ===
                                "Telah Mendaftar"
                            }
                            onClick={() =>
                                setSelectedStatus(
                                    "Telah Mendaftar"
                                )
                            }
                        />

                        <FilterButton
                            label="Diterima"
                            active={
                                selectedStatus ===
                                "Diterima"
                            }
                            onClick={() =>
                                setSelectedStatus(
                                    "Diterima"
                                )
                            }
                        />

                        <FilterButton
                            label="Ditolak"
                            active={
                                selectedStatus ===
                                "Ditolak"
                            }
                            onClick={() =>
                                setSelectedStatus(
                                    "Ditolak"
                                )
                            }
                        />

                        <FilterButton
                            label="Wawancara"
                            active={
                                selectedStatus ===
                                "Wawancara"
                            }
                            onClick={() =>
                                setSelectedStatus(
                                    "Wawancara"
                                )
                            }
                        />

                    </div>

                </div>

                {/* SEARCH BAR */}
                <div className="w-auto">

                    <SearchBar
                        placeholder="Cari..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* LIST PROGRAM LAMARAN */}
            <div className="
                mt-8
                space-y-4
            ">

                {currentApplications.map(
                    (application, index) => (

                        <LamaranListCard
                            key={index}

                            logo={application.logo}

                            title={application.title}

                            company={application.company}

                            category={application.category}

                            appliedDate={
                                application.appliedDate
                            }

                            updatedDate={
                                application.updatedDate
                            }

                            status={application.status}

                            to={`/lamaran-detail/${application.id}`}
                        />
                    )
                )}

            </div>

            {/* PAGINATION */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    );
};

export default LamaranList;
