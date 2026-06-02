import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { lamaranService } from "../../services/lamaranService";
import { formatPeriod } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const LogbookList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const loadLogbookEntries = async () => {
      try {
        const lamarans =
          await lamaranService.listMineWithDetails();
        const acceptedLamarans = lamarans.filter(
          (lamaran) =>
            lamaran.status_pendaftaran === "diterima"
        );

        setData(
          acceptedLamarans.map((lamaran, index) => {
            const kegiatan = lamaran.kegiatan || {};

            return {
              id: lamaran.lamaran_id,
              no: index + 1,
              program:
                kegiatan.nama_kegiatan ||
                `Lamaran #${lamaran.lamaran_id}`,
              company:
                kegiatan.nama_perusahaan ||
                kegiatan.nama_instansi ||
                "Mitra",
              periode: formatPeriod(
                kegiatan.tanggal_mulai,
                kegiatan.tanggal_selesai
              ),
            };
          })
        );
      } catch (error) {
        showAlert(error.message);
      }
    };

    loadLogbookEntries();
  }, []);

  // COLUMNS
  const columns = [
    {
      header: "No",
      accessor: "no",
    },

    {
      header: "Nama Program",
      accessor: "program",
    },

    {
      header: "Penyelenggara",
      accessor: "company",
    },

    {
      header: "Periode",
      accessor: "periode",
    },

    {
    header: "Aksi",
    accessor: "aksi",

    render: (row) => (

        <div className="flex gap-2 flex-wrap">

        {/* LIHAT LOGBOOK */}
        <Button
        label=""
        icon={<Eye size={18} />}
        to={`/logbook-detail/${row.id}`}
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

    <div className="space-y-8 px-3">

      {/* HEADER */}
    <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
            <h1 className="text-2xl font-bold text-bold-blue mb-2">
            Logbook Anda
            </h1>

            <p className="text-lg">
            Berikut adalah daftar seluruh logbook aktivitas Anda.
            </p>
        </div>

    </div>


      {/* TABLE */}
      <Table
        columns={columns}
        data={data}
        emptyMessage = "Belum ada logbook. Ikuti program magang untuk mulai membuat logbook aktivitas Anda."
      />



    </div>
  );
};

export default LogbookList;
