import BidangCard from "../../components/cards/BidangCard";
import LamaranCard from "../../components/cards/LamaranCard";
import ReminderCard from "../../components/cards/ReminderCard";
import NextButton from "../../components/ui/NextButton";
import MagangSection from "../../components/cards/MagangSection";
import LamaranStatus from "../../components/ui/LamaranStatus";
import { useNavigate } from "react-router-dom";
import KompeStupenSection from "../../components/cards/KompeStupenSection";
import { useEffect, useState } from "react";
import { kegiatanService } from "../../services/kegiatanService";
import { attachMitraCompanies } from "../../services/kegiatanCompanyService";
import { lamaranService } from "../../services/lamaranService";
import { mahasiswaService } from "../../services/mahasiswaService";
import {
  mapKegiatanToCard,
  mapLamaranToListItem,
  mapMahasiswaProfileToUi,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";

import {
  BriefcaseBusiness,
  Trophy,
  BookOpen,
} from "lucide-react";

const DashboardMhs = () => {

    const StatusComponent = LamaranStatus;
    const navigate = useNavigate();
    const [userName, setUserName] =
        useState("");
    const [aktivitasData, setAktivitasData] =
        useState([]);
    const [reminderData, setReminderData] =
        useState([]);
    const [magangPrograms, setMagangPrograms] =
        useState([]);
    const [kompetisiPrograms, setKompetisiPrograms] =
        useState([]);
    const [stupenPrograms, setStupenPrograms] =
        useState([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    profile,
                    lamarans,
                    magang,
                    kompetisi,
                    stupen,
                ] = await Promise.all([
                    mahasiswaService.getMe(),
                    lamaranService.listMineWithDetails(),
                    kegiatanService.list({ kategori: "magang" }),
                    kegiatanService.list({ kategori: "lomba" }),
                    kegiatanService.list({
                        kategori: "studi_independen",
                    }),
                ]);

                setUserName(
                    mapMahasiswaProfileToUi(profile).nama
                );
                setAktivitasData(
                    lamarans.map(mapLamaranToListItem)
                );
                const [
                    magangWithCompanies,
                    kompetisiWithCompanies,
                    stupenWithCompanies,
                ] = await Promise.all([
                    attachMitraCompanies(magang.slice(0, 4)),
                    attachMitraCompanies(kompetisi.slice(0, 4)),
                    attachMitraCompanies(stupen.slice(0, 4)),
                ]);

                setMagangPrograms(
                    magangWithCompanies.map((item) => ({
                        ...mapKegiatanToCard(item),
                        to: `/magang-detail/${item.mbkm_id}`,
                    }))
                );
                setKompetisiPrograms(
                    kompetisiWithCompanies.map((item) => ({
                        ...mapKegiatanToCard(item),
                        to: `/kompetisi-detail/${item.mbkm_id}`,
                    }))
                );
                setStupenPrograms(
                    stupenWithCompanies.map((item) => ({
                        ...mapKegiatanToCard(item),
                        to: `/studi-independen-detail/${item.mbkm_id}`,
                    }))
                );
                setReminderData(
                    lamarans
                    .filter(
                        (item) =>
                            item.status_pendaftaran ===
                            "diterima"
                    )
                    .map((item) => ({
                        id: item.lamaran_id,
                        title: "Logbook Harian",
                        program:
                            item.kegiatan?.nama_kegiatan || "",
                        deadline: "",
                    }))
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        loadDashboard();
    }, []);
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-bold-blue">
                Selamat Datang, <span className="text-bold-blue">{userName}</span>!
            </h1>

            {/* BIDANG CARD SECTION */}
            <div className="grid grid-cols-3 gap-6 mt-8">

                <BidangCard
                    icon = {
                        <BriefcaseBusiness size={60} className="text-kuning-tua"/>
                    }
                    title = "Magang"
                    to="/magang-list"
                />
                <BidangCard
                    icon = {
                        <Trophy size={60} className="text-kuning-tua" />
                    }
                    title = "Kompetisi"
                    to = "/kompetisi-list"
                />
                <BidangCard
                    icon = {
                        <BookOpen size={60} className="text-kuning-tua" />
                    }
                    title = "Studi Independen"
                    to ="/stupen-list"
                />
            </div>

            <div className=
                "border-b border-indigo-200 mt-8">
            </div>
            
            {/* AKTIVITAS SECTION */}
            <div className="grid grid-cols-3 gap-4 mt-8">

                {/* LEFT SIDE - AKTIVITASMU */}
                <div className="col-span-2">

                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-3">

                        {/* TITLE */}
                        <h2 className="
                            text-xl
                            font-bold
                            text-bold-blue
                        ">
                            Aktivitasmu
                        </h2>

                        {/* NEXT BUTTON */}
                        <NextButton
                            to="/lamaran-list"
                            label="Selengkapnya"
                        />

                    </div>

                    {/* LAMARAN LIST */}
                    <div className="space-y-4">

                        {
                            aktivitasData
                            .slice(0, 3)
                            .map((item) => (

                                <div
                                    key={item.id}

                                    onClick={() =>
                                        navigate(
                                            `/lamaran-detail/${item.id}`
                                        )
                                    }

                                    className="
                                        cursor-pointer
                                    "
                                >

                                    <LamaranCard
                                        logo={item.logo}
                                        title={item.title}
                                        company={item.company}
                                        status={item.status}
                                        statusComponent={StatusComponent}
                                    />

                                </div>

                            ))
                        }

                    </div>

                </div>


                 {/* RIGHT SIDE - REMINDER */}
                <div>
                    {/* HEADER */}
                    <div className="
                        flex
                         items-center
                        justify-between
                        mb-3
                    ">

                        {/* TITLE */}
                        <h2 className="
                            text-xl
                            font-semibold
                            text-bold-blue
                        ">
                            Reminder
                        </h2>
                        <NextButton
                            to="/logbook-list"
                            label="Selengkapnya"
                        />

                    </div>

                    {/* REMINDER LIST */}
                    <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">

                        {
                            reminderData
                            .slice(0, 3)
                            .map((item) => (

                                <div
                                    key={item.id}

                                    onClick={() =>
                                        navigate(
                                            `/logbook-detail/${item.id}`
                                        )
                                    }

                                    className="
                                        cursor-pointer
                                    "
                                >

                                    <ReminderCard
                                        title={item.title}
                                        program={item.program}
                                        deadline={item.deadline}
                                    />

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>
            <div className=
                "border-b border-indigo-200 mt-8">
            </div>

            {/* EXPLORE SECTION */}
            <div className="mt-8">
                <h2 className="
                    text-xl
                    font-bold
                    text-bold-blue
                    mb-4
                ">
                    Eksplor program-program sesuai minat mu!
                </h2>

                <MagangSection
                    sectionTitle="Program Magang"
                    buttonTo="/magang-list"
                    programs={magangPrograms.map(
                        (item) => ({

                            ...item,

                            to: item.to,

                        })
                    )}
                />

                <KompeStupenSection
                    sectionTitle="Kompetisi"
                    buttonTo="/kompetisi-list"
                    programs={kompetisiPrograms.map(
                        (item) => ({

                            ...item,

                            to: item.to,

                        })
                    )}
                />

                <KompeStupenSection
                    sectionTitle="Studi Independen"
                    buttonTo="/stupen-list"
                    programs={stupenPrograms.map(
                        (item) => ({

                            ...item,

                            to: item.to,

                        })
                    )}
                />

            </div>

        </div>
        
    );
};

export default DashboardMhs;
