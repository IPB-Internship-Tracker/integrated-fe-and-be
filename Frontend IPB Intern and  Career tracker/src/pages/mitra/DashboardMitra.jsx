import Button from "../../components/ui/Button";
import TrafikCard from "../../components/cards/TrafikCard";
import ProgramStatus from "../../components/ui/ProgramStatus";
import ProgramListCard from "../../components/cards/ProgramListCard";
import ReminderCard from "../../components/cards/ReminderCard";
import PopUpNotif from "../../components/ui/PopUpNotif";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { kegiatanService } from "../../services/kegiatanService";
import { lamaranService } from "../../services/lamaranService";
import { mitraService } from "../../services/mitraService";
import {
    getDraftEditRoute,
    getKegiatanDetailRoute,
    mapDraftToCard,
    mapKegiatanToCard,
    mapMitraProfileToUi,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";

import{
    BriefcaseBusiness,
    Trophy,
    BookOpen,
    ArrowRight,
} from "lucide-react";

const DashboardMitra = () => {
    const StatusComponent = ProgramStatus; 
    const navigate = useNavigate();

    const [openCreatePopup, setOpenCreatePopup] =
        useState(false);
    const [userName, setUserName] =
        useState("");
    const [programs, setPrograms] =
        useState([]);
    const [drafts, setDrafts] =
        useState([]);
    const [trafficData, setTrafficData] =
        useState([
            {
                id: 1,
                title: "Magang",
                icon: <BriefcaseBusiness size={45} />,
                programCount: 0,
                participantCount: 0,
                showParticipant: true,
            },
            {
                id: 2,
                title: "Kompetisi",
                icon: <Trophy size={45} />,
                programCount: 0,
                participantCount: 0,
                showParticipant: false,
            },
            {
                id: 3,
                title: "Studi Independen",
                icon: <BookOpen size={45} />,
                programCount: 0,
                participantCount: 0,
                showParticipant: false,
            },
        ]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const mitra = await mitraService.getMe();
                const [programData, draftData] =
                    await Promise.all([
                        kegiatanService.list({
                            mitra_id: mitra.mitra_id,
                        }),
                        kegiatanService.listDrafts(),
                    ]);

                const applicantCounts = await Promise.all(
                    programData.map((program) =>
                        program.kategori_mbkm === "magang"
                            ? lamaranService
                                .listByKegiatan(program.mbkm_id)
                                .then((items) => items.length)
                                .catch(() => 0)
                            : Promise.resolve(0)
                    )
                );

                const mappedPrograms = programData.map(
                    (item, index) => {
                        const mapped = mapKegiatanToCard(item);

                        return {
                            ...mapped,
                            company: mitra.nama_instansi,
                            participantInfo:
                                mapped.category === "Magang"
                                    ? `Total: ${applicantCounts[index]} Pendaftar`
                                    : "",
                        };
                    }
                );

                setUserName(
                    mapMitraProfileToUi(mitra).namaInstansi
                );
                setPrograms(mappedPrograms);
                setDrafts(draftData.map(mapDraftToCard));
                setTrafficData((items) =>
                    items.map((item) => {
                        const categoryPrograms =
                            mappedPrograms.filter(
                                (program) =>
                                    program.category === item.title
                            );
                        return {
                            ...item,
                            programCount:
                                categoryPrograms.length,
                            participantCount:
                                categoryPrograms.reduce(
                                    (total, program) => {
                                        const number =
                                            Number(
                                                program.participantInfo
                                                    .match(/\d+/)?.[0] ||
                                                0
                                            );
                                        return total + number;
                                    },
                                    0
                                ),
                        };
                    })
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadDashboard();
    }, []);

    return (
        <div>

            {/* TOP SECTION */}
            <div className="
                flex
                items-center
                justify-between
                mb-5
            ">
                
                <h1 className="text-3xl font-bold text-light-blue">
                    Selamat Datang,
                    <span className="text-bold-blue">
                        {" "}{userName}
                    </span>!
                </h1>

                {/* BUTTON */}
                <Button
                    label = "+ Buat Program"
                    onClick={() =>
                    setOpenCreatePopup(true)
                }

                className="text-md px-4 py-2"
                />
            </div>
            
            {/* TRAFIK PROGRAM SECTION */}
            <div className="mt-6">
                <h2 className="
                    text-xl
                    font-bold
                    text-bold-blue
                    mb-6
                ">
                    Trafik Program
                </h2>

                {/* BIDANG PROGRAM MITRA */}
                <div className="grid grid-cols-3 gap-6">
                    {trafficData.map((item) => (
                        <TrafikCard
                            key={item.id}
                            title={item.title}
                            icon={item.icon}
                            programCount={
                                item.programCount
                            }
                            participantCount={
                                item.participantCount
                            }
                            showParticipant={
                                item.showParticipant
                            }
                        />
                    ))}
                </div>
            </div>

            {/* IMPORT LAMARAN CARD untuk ProgramCard Mitra*/}
            <div className="grid grid-cols-3 gap-6 mt-8">
                {/* PROGRAM ANDA */}
                <div className="col-span-2">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-4
                    ">

                        {/* TITLE */}
                        <h2 className="
                            text-xl
                            font-bold
                            text-bold-blue
                        ">
                            Program Anda
                        </h2>

                        {/* SELENGKAPNYA */}
                        <button
                            onClick={() =>
                                navigate("/program-list-mitra")
                            }
                            className="
                                flex
                                items-center
                                gap-1

                                text-sm
                                text-bold-blue

                                hover:underline
                                cursor-pointer
                            "
                        >
                            Selengkapnya

                            <ArrowRight size={16}/>
                        </button>

                    </div>


                    <div className="space-y-4">

                    {programs.map((program) => (

                        <ProgramListCard
                            key={program.id}
                            logo={program.logo}
                            title={program.title}
                            company={(program.company)}
                            category={program.category}
                            participantInfo={
                                program.participantInfo
                            }
                            period={program.period}
                            status={program.status}
                            showParticipant={
                                program.category === "Magang"
                            }
                            statusComponent={
                                StatusComponent
                            }
                            to={getKegiatanDetailRoute(program, true)}
                        />
                    ))}
                    </div>
                 </div>

                {/* DRAFT MITRA */}
                <div className="mb-3">
                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-3
                    ">

                        {/* TITLE */}
                        <h2 className="
                            text-xl
                            font-bold
                            text-bold-blue
                        ">
                            Selesaikan Publikasi Anda
                        </h2>

                        {/* SELENGKAPNYA */}
                        <button
                            onClick={() =>
                                navigate("/draft-list")
                            }
                            className="
                                flex
                                items-center
                                gap-1

                                text-sm
                                text-bold-blue

                                hover:underline
                                cursor-pointer
                            "
                        >
                            Selengkapnya

                            <ArrowRight size={16}/>
                        </button>

                    </div>
                    


                    {/* REMINDER LIST */}
                    <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
                        {drafts.map((draft) => (

                            <ReminderCard
                                key={draft.id}
                                title={draft.title}
                                program={draft.program}
                                status={draft.status}
                                to={getDraftEditRoute(draft)}
                            />

                        ))}

                    </div>
                   

                </div>

            </div>

            {/* POPUP CREATE PROGRAM */}
            <PopUpNotif
                isOpen={openCreatePopup}
                onClose={() =>
                    setOpenCreatePopup(false)
                }
                title="Buat Kegiatan"
                description=""
            >
                <div className="w-full space-y-4">
                    {/* MAGANG */}
                    <button
                        onClick={() =>
                            navigate("/create-magang")
                        }
                        className="
                            w-full
                            border
                            border-light-blue
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            gap-5
                            hover:bg-light-blue-2
                            transition
                            cursor-pointer
                        "
                    >
                        <BriefcaseBusiness
                            size={25}
                            className="text-bold-blue"
                        />
                        <span className="text-lg font-medium">
                            Magang
                        </span>
                    </button>

                    {/* KOMPETISI */}
                    <button
                    onClick={() =>
                        navigate("/create-kompetisi")
                        }
                        className="
                            w-full
                            border
                            border-light-blue
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            gap-5
                            hover:bg-light-blue-2
                            transition
                            cursor-pointer
                        "
                    >
                        <Trophy
                            size={25}
                            className="text-bold-blue"
                        />
                        <span className="text-lg font-medium">
                            Kompetisi
                        </span>
                    </button>

                    {/* STUPEN */}
                    <button
                    onClick={() =>
                        navigate("/create-studi-independen")
                        }
                        className="
                            w-full
                            border
                            border-light-blue
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            gap-5
                            hover:bg-light-blue-2
                            transition
                            cursor-pointer
                        "
                    >
                        <BookOpen
                            size={25}
                            className="text-bold-blue"
                        />
                        <span className="text-lg font-medium">
                            Studi Independen
                        </span>
                    </button>
                </div>
            </PopUpNotif>
        
        </div>
    );
};

export default DashboardMitra;
