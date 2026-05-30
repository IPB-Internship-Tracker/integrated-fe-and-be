import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showAlert } from "../../services/alertService";

import Table from "../../components/ui/Table";
import BackButton from "../../components/ui/BackButton";
import LamaranStatus from "../../components/ui/LamaranStatus";
import Button from "../../components/ui/Button";
import FilterButton from "../../components/ui/FilterButton";
import LogoShopee from "../../assets/logo-shopee.png";
import Pagination from "../../components/ui/Pagination";
import PopUpNotif from "../../components/ui/PopUpNotif";

import {
  Eye,
} from "lucide-react";
import { kegiatanService } from "../../services/kegiatanService";
import { lamaranService } from "../../services/lamaranService";
import {
  mapApplicant,
  mapKegiatanToCard,
} from "../../services/adapters";

const PelamarList = () => {
    const { id } = useParams();
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // DROPDOWN STATUS
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // POPUP STATUS
    const [openStatusPopup, setOpenStatusPopup] = useState(false);

    // TEMP DATA
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedStatusFilter, setSelectedStatusFilter] =
      useState("Semua");

  const [applicants, setApplicants] = useState([]);

  const statusFilters = [
    "Semua",
    "Telah Mendaftar",
    "Diterima",
    "Ditolak",
    "Wawancara",
  ];

  const filteredApplicants =
    selectedStatusFilter === "Semua"
      ? applicants
      : applicants.filter(
          (applicant) =>
            applicant.status === selectedStatusFilter
        );

  const totalPages = Math.ceil(
    filteredApplicants.length / itemsPerPage
    );

    const paginatedApplicants = filteredApplicants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // HANDLE STATUS CHANGE
    const handleChangeStatus = (
        applicant,
        newStatus
        ) => {

        setSelectedApplicant(applicant);
        setSelectedStatus(newStatus);
        setOpenStatusPopup(true);
        setOpenDropdownId(null);
    };

  // PROGRAM DETAIL
  const [programDetail, setProgramDetail] = useState({
    title: "",
    company: "",
    logo: LogoShopee,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [kegiatan, lamarans] = await Promise.all([
          kegiatanService.detail(id),
          lamaranService.listByKegiatan(id),
        ]);
        const card = mapKegiatanToCard(kegiatan, LogoShopee);
        setProgramDetail({
          title: card.title,
          company: card.company,
          logo: card.logo,
        });
        setApplicants(lamarans.map(mapApplicant));
      } catch (error) {
        showAlert(error.message);
      }
    };

    loadData();
  }, [id]);
  const getAvailableStatusOptions = (
  currentStatus
) => {

  // TELAH MENDAFTAR
  if (currentStatus === "Telah Mendaftar") {
    return [
      "Wawancara",
      "Diterima",
      "Ditolak",
    ];
  }

  // WAWANCARA
  if (currentStatus === "Wawancara") {
    return [
      "Diterima",
      "Ditolak",
    ];
  }

  // FINAL STATE
  return [];
};

  // TABLE COLUMNS
  const columns = [

    {
      header: "No",
      accessor: "id",
    },

    {
      header: "Nama Pelamar",
      accessor: "applicantName",
    },

    {
      header: "Email Pelamar",
      accessor: "email",
    },

    {
      header: "Tanggal Melamar",
      accessor: "applyDate",
    },

    {
      header: "Status",

    render: (row) => (

        <div className="relative">

            {/* STATUS BUTTON */}
            <LamaranStatus
              status={row.status}
              isDropdown={
                row.status !== "Diterima" &&
                row.status !== "Ditolak"
              }
              onClick={() => {

                // jangan buka dropdown
                if (
                  row.status === "Diterima" ||
                  row.status === "Ditolak"
                ) {
                  return;
                }

                setOpenDropdownId(
                  openDropdownId === row.id
                    ? null
                    : row.id
                );
              }}
            />

            {/* DROPDOWN */}
            {openDropdownId === row.id && (

            <div
                className="
                absolute
                top-12
                left-0
                z-20
                bg-white
                border
                border-light-blue
                rounded-xl
                shadow-lg
                w-44
                overflow-hidden
                "
            >

            {getAvailableStatusOptions(row.status).map(
                (status) => (

                <button
                    key={status}
                    onClick={() =>
                    handleChangeStatus(
                        row,
                        status
                    )
                    }
                    className="
                    block
                    w-full
                    px-4
                    py-3
                    text-left
                    hover:bg-light-blue-2
                    transition
                    cursor-pointer
                    "
                >
                    {status}
                </button>

                ))}

            </div>
            )}

        </div>
        ),
    },

    {
      header: "Aksi",

      render: (row) => (

        <div className="flex items-center gap-2">

          {/* DETAIL */}
          <Button
            icon={<Eye size={18} />}
            to={`/pelamar-detail/${row.id}`}
            iconOnly
            className="
              bg-blue-600
              text-white
              hover:bg-blue-700
            "
          />

        </div>
      ),
    },
  ];

  return (
    <div className="px-3 space-y-4">

    {/* BACK BUTTON */}
      <BackButton
        label="Kembali"
        color="text-bold-blue"
        position="relative"
        to={`/magang-detail-mitra/${id}`}
      />

      <div className="gap-2">
          <h1 className="text-xl font-bold text-black mb-2">
            Daftar Pelamar
          </h1>

        <h2 className="text-2xl font-bold text-bold-blue">
            {programDetail.title}
        </h2>

        <p className="text-md text-bold-blue">
            {programDetail.company}
        </p>
      </div>

        {/* FILTER STATUS */}
        <div className="mt-6">
          <h2
            className="
              text-lg
              font-semibold
              text-bold-blue
              mb-4
            "
          >
            Filter status lamaran
          </h2>

          <div
            className="
              flex
              gap-3
              flex-wrap
            "
          >
            {statusFilters.map((status) => (
              <FilterButton
                key={status}
                label={status}
                active={
                  selectedStatusFilter === status
                }
                onClick={() => {
                  setSelectedStatusFilter(status);
                  setCurrentPage(1);
                  setOpenDropdownId(null);
                }}
              />
            ))}
          </div>
        </div>

        {/* TABLE CARD */}
        <div
            className="
                py-3
            "
            >

            {/* TABLE */}
            <Table
                columns={columns}
                data={paginatedApplicants}
        />

        {filteredApplicants.length === 0 ? (
          <div
            className="
              bg-white
              border
              border-light-blue/40
              px-6
              py-8
              text-center
              text-gray-500
              shadow-sm
            "
          >
            Tidak ada pelamar untuk status ini.
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* POPUP NOTIF */}
        <PopUpNotif
            isOpen={openStatusPopup}
            onClose={() =>
                setOpenStatusPopup(false)
            }

            icon={
                <div className="text-red-500 text-7xl">
                ⚠
                </div>
            }

            title="Apakah Anda yakin mengubah status lamaran?"

            description="
                Notifikasi perubahan status lamaran
                akan terkirim ke pelamar
            "
            >

            {/* CANCEL */}
            <Button
                label="Kembali"
                onClick={() =>
                setOpenStatusPopup(false)
                }
                className="
                bg-white
                border
                border-bold-blue
                text-bold-blue
                hover:bg-bold-blue
                "
            />

            {/* CONFIRM */}
            <Button
                label="Kirim"

                onClick={async () => {
                  try {
                    await lamaranService.updateStatus(
                      selectedApplicant.id,
                      selectedStatus
                    );
                    const updatedApplicants =
                        applicants.map((applicant) => {

                        if (
                            applicant.id === selectedApplicant.id
                        ) {
                            return {
                            ...applicant,
                            status: selectedStatus,
                            };
                        }

                        return applicant;
                        });
                    setApplicants(updatedApplicants);
                    setCurrentPage(1);
                    setOpenStatusPopup(false);
                  } catch (error) {
                    showAlert(error.message);
                  }
                }}
            />

        </PopUpNotif>

    </div>
    </div>
    );
};

export default PelamarList;
