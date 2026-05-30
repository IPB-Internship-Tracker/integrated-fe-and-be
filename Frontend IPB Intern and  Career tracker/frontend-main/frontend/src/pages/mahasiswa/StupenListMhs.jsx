import KategoriCard from "../../components/cards/KategoriCard";
import SearchBar from "../../components/ui/SearchBar";
import KompeStupenCard from "../../components/cards/KompeStupenCard";
import {useEffect, useState} from "react";
import Pagination from "../../components/ui/Pagination";
import { kegiatanService } from "../../services/kegiatanService";
import {
    mapKegiatanToCard,
    matchesSearch,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";


const StupenListMhs = () => {
    const [programList, setProgramList] =
        useState([]);
    const [search, setSearch] =
        useState("");

    useEffect(() => {
        const loadPrograms = async () => {
            try {
                const data = await kegiatanService.list({
                    kategori: "studi_independen",
                });
                setProgramList(
                    data.map((item) =>
                        mapKegiatanToCard(item)
                    )
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadPrograms();
    }, []);

    // STATE
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filteredPrograms =
        programList.filter((program) =>
            matchesSearch(program, search, [
                "title",
                "company",
                "category",
                "location",
                "deadline",
            ])
        );

    // PAGINATION LOGIC
    const programsPerPage = 12;
    const lastIndex = currentPage * programsPerPage;
    const firstIndex = lastIndex - programsPerPage;
    const currentPrograms = filteredPrograms.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

    return (

        <div>
            {/* SEARCHBAR SECTION */}
            <div className="mb-8">
                <SearchBar
                    placeholder = "Cari..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <div className="mt-8 space-y-4">
                <h1 className="text-2xl font-semibold text-bold-blue mb-2">
                    Studi Independen
                    
                </h1>
                <h2 className="text-lg text-bold-blue mb-3">
                    Jelajahi program Studi Independen yang cocok untukmu!
                    
                </h2>
            </div>

            <div className=
                "border-b border-indigo-200 mt-10">
            </div>

            {/* PROGRAM SECTION */}
            <div className="mt-10">
                <div className="grid grid-cols-3 gap-6">
                    {currentPrograms.map((program, index) => (
                        <KompeStupenCard
                            key={index}
                            logo={program.logo}
                            title={program.title}
                            company={program.company}
                            deadline={program.deadline}
                            to={`/studi-independen-detail/${program.id}`}
                        />
                    
                    ))}

                    

                </div>

            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />      
            
            
            
        </div>
    );
};
export default StupenListMhs;
