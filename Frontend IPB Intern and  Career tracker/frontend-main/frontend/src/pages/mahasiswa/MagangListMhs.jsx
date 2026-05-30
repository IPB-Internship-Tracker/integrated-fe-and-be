import KategoriCard from "../../components/cards/KategoriCard";
import SearchBar from "../../components/ui/SearchBar";
import MagangCard from "../../components/cards/MagangCard";
import {useEffect, useState} from "react";
import Pagination from "../../components/ui/Pagination";
import { useParams, useNavigate } from "react-router-dom";
import { kegiatanService } from "../../services/kegiatanService";
import {
    mapKegiatanToCard,
    matchesSearch,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";

import {
    MonitorCog,
    ChartColumnBig,
    HandCoins,
    MessageCircleHeart,
    BadgeDollarSign,
    UserStar,
    Truck,
    ScrollText,
    Palette,
    Wrench,
    Microscope,
    Handshake,
    Scale,
    HeartPulse,
} from "lucide-react";

const categories = [

  {
    title: "Information Technology",
    slug: "information-technology",
    icon: <MonitorCog size={40} />,
  },

  {
    title: "Data & Analytics",
    slug: "data-analytics",
    icon: <ChartColumnBig size={40} />,
  },

  {
    title: "Business & Management",
    slug: "business-management",
    icon: <HandCoins size={40} />,
  },

  {
    title: "Marketing & Communication",
    slug: "marketing-communication",
    icon: <MessageCircleHeart size={35} />,
  },

  {
    title: "Finance & Accounting",
    slug: "finance-accounting",
    icon: <BadgeDollarSign size={40} />,
  },

  {
    title: "Human Resources (HR)",
    slug: "human-resources-hr",
    icon: <UserStar size={40} />,
  },

  {
    title: "Operations & Logistics",
    slug: "operations-logistics",
    icon: <Truck size={40} />,
  },

  {
    title: "Administration",
    slug: "administration",
    icon: <ScrollText size={40} />,
  },

  {
    title: "Design & Creative",
    slug: "design-creative",
    icon: <Palette size={40} />,
  },

  {
    title: "Engineering",
    slug: "engineering",
    icon: <Wrench size={40} />,
  },

  {
    title: "Research & Development",
    slug: "research-development",
    icon: <Microscope size={40} />,
  },

  {
    title: "Sales & Business Development",
    slug: "sales-business-development",
    icon: <Handshake size={40} />,
  },

  {
    title: "Legal",
    slug: "legal",
    icon: <Scale size={40} />,
  },

  {
    title: "Healthcare / Life Sciences",
    slug: "healthcare-life-sciences",
    icon: <HeartPulse size={40} />,
  },

];

const MagangListMhs = () => {
    const navigate = useNavigate();
    const [programList, setProgramList] =
    useState([]);

    useEffect(() => {
        const loadPrograms = async () => {
            try {
                const data = await kegiatanService.list({
                    kategori: "magang",
                });
                setProgramList(
                    data.map((item) => ({
                        ...mapKegiatanToCard(item),
                        category: item.bidang || "Magang",
                    }))
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadPrograms();
    }, []);

    const [activeCategory, setActiveCategory] =
    useState(null);
    const [search, setSearch] =
    useState("");

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
    const currentPrograms =
    filteredPrograms.slice(firstIndex, lastIndex);
    const totalPages =
    Math.ceil(filteredPrograms.length / programsPerPage);

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

            {/* CATEGORY SECTION */}
            <div className="mt-8 space-y-4">
                <h1 className="text-2xl font-semibold text-bold-blue mb-2">
                    Magang
                    
                </h1>
                <h2 className="text-lg text-bold-blue mb-3">
                    Jelajahi program magang sesuai bidang yang kamu minati!
                    
                </h2>
                {/* CATEGORY LIST */}
                <div
                    className="
                        flex
                        gap-4
                        overflow-x-auto
                        scrollbar-hide
                    "
                >


                    {categories.map((category, index) => (

                        <KategoriCard
                        key={index}
                        icon={category.icon}
                        title={category.title}
                        isActive={
                            activeCategory === category.slug
                        }
                        onClick={() => {
                            setActiveCategory(category.slug);
                            navigate(`/magang-filtered/${category.slug}`);
                        }}
                        />
                    ))}

                </div>

            </div>

            <div className=
                "border-b border-indigo-200 mt-10">
            </div>

            {/* PROGRAM SECTION */}
            <div className="mt-10">
                {currentPrograms.length > 0 ? (

                    <div className="grid grid-cols-3 gap-6">

                        {currentPrograms.map((program, index) => (

                        <MagangCard
                            key={index}
                            logo={program.logo}
                            title={program.title}
                            company={program.company}
                            category={program.category}
                            location={program.location}
                            deadline={program.deadline}
                            to={`/magang-detail/${program.id}`}
                        />

                        ))}

                    </div>

                    ) : (

                    <div
                        className="
                        flex
                        justify-center
                        items-center
                        py-20
                        "
                    >

                        <p className="text-lg text-gray-500">
                        Belum ada program tersedia.
                        </p>

                    </div>

                    )}

            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />      
            
        </div>
    );
};
export default MagangListMhs;
