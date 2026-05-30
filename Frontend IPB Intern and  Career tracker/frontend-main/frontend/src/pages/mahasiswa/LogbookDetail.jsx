import { useCallback, useEffect, useState } from "react";
import { showAlert } from "../../services/alertService";

import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import FormField from "../../components/forms/FormField";
import PopUpNotif from "../../components/ui/PopUpNotif";

import { CircleAlert, Pencil, Trash, X } from "lucide-react";
import BackButton from "../../components/ui/BackButton";
import { useParams } from "react-router-dom";
import { lamaranService } from "../../services/lamaranService";
import { logbookService } from "../../services/logbookService";
import {
  formatPeriod,
  mapLogbookToRow,
} from "../../services/adapters";

const LogbookDetail = ({ readOnly = false }) => {
  const { id } = useParams();

  // POPUP
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEdit, setIsEdit] = useState(false);


  const [formData, setFormData] = useState({
  tanggal: "",
  waktuMulai: "",
  waktuSelesai: "",
  aktivitas: "",
  media: "",
  lokasi: "",
});


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const initialFormData = {
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    aktivitas: "",
    media: "",
    lokasi: "",
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPhotoFile(null);
    setErrors({});
    setIsEdit(false);
    setSelectedRow(null);
  };

  const closeFormPopup = () => {
    setOpenPopup(false);
    resetForm();
  };

  const openAddPopup = () => {
    resetForm();
    setOpenPopup(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEdit(true);
    setPhotoFile(null);
    setErrors({});
    setFormData({
      tanggal: row.raw?.tanggal || "",
      waktuMulai: row.waktuMulai === "-" ? "" : row.waktuMulai,
      waktuSelesai: row.waktuSelesai === "-" ? "" : row.waktuSelesai,
      aktivitas: row.aktivitas === "-" ? "" : row.aktivitas,
      media: row.media === "-" ? "" : row.media,
      lokasi: row.lokasi === "-" ? "" : row.lokasi,
    });
    setOpenPopup(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setOpenDeletePopup(true);
  };


  const validateForm = () => {
    let newErrors = {};

    // REQUIRED
    Object.keys(formData).forEach((key) => {

      if (!formData[key]) {
        newErrors[key] = "Kolom ini wajib diisi.";
      }
    });

    // VALIDASI WAKTU
    if (
      formData.waktuMulai &&
      formData.waktuSelesai &&
      formData.waktuSelesai <= formData.waktuMulai
    ) {

      newErrors.waktuSelesai =
        "Waktu selesai tidak boleh lebih awal dari waktu mulai.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const loadLogbooks = useCallback(async () => {
    const logs = await logbookService.listByLamaran(id);
    setData(logs.map(mapLogbookToRow));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (isEdit && selectedRow) {
          await logbookService.updateFromForm(
            selectedRow.id,
            id,
            formData,
            photoFile,
            selectedRow.raw?.foto
          );
          showAlert("Logbook berhasil diperbarui.");
        } else {
          await logbookService.createFromForm(
            id,
            formData,
            photoFile
          );
          showAlert("Logbook berhasil ditambahkan.");
        }
        await loadLogbooks();
        closeFormPopup();
      } catch (error) {
        showAlert(error.message);
      }
    }
  };

  const confirmDelete = async () => {
    if (!selectedRow) return;

    try {
      await logbookService.remove(selectedRow.id);
      await loadLogbooks();
      setOpenDeletePopup(false);
      setSelectedRow(null);
      showAlert("Logbook berhasil dihapus.");
    } catch (error) {
      showAlert(error.message);
    }
  };


  const [programDetail, setProgramDetail] = useState({
    title: "",
    company: "",
    period: "",
    mbkmId: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const lamaran = await lamaranService.detail(id);
        setProgramDetail({
          title: lamaran.kegiatan?.nama_kegiatan || "-",
          company:
            lamaran.kegiatan?.nama_perusahaan || "Mitra",
          period: formatPeriod(
            lamaran.kegiatan?.tanggal_mulai,
            lamaran.kegiatan?.tanggal_selesai
          ),
          mbkmId: lamaran.mbkm_id || lamaran.kegiatan?.mbkm_id || "",
        });
        await loadLogbooks();
      } catch (error) {
        showAlert(error.message);
      }
    };

    loadData();
  }, [id, loadLogbooks]);


  const columns = [
    {
      header: "No",
      accessor: "no",
    },

    {
      header: "Tanggal & Waktu",

      render: (row) => (
        <div>
          <p>{row.tanggal}</p>
          <p className="text-sm text-gray-500">
            {row.waktuMulai} - {row.waktuSelesai}
          </p>
        </div>
      ),
    },

    {
      header: "Durasi",
      accessor: "durasi",
    },

    {
      header: "Aktivitas",
      accessor: "aktivitas",
    },

    {
      header: "Media",
      accessor: "media",
    },

    {
      header: "Lokasi",
      accessor: "lokasi",
    },
    {
      header: "Dokumentasi",
      accessor: "dokumentasi",

      render: (row) =>
        row.dokumentasi ? (
          <a
            href={row.dokumentasi}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Unduh
          </a>
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    ...(!readOnly
      ? [
          {
            header: "Aksi",

            render: (row) => (
              <div className="flex gap-2 justify-center">
                <Button
                  icon={<Pencil size={18} />}
                  iconOnly
                  onClick={() => handleEdit(row)}
                  className="
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                  "
                />

                <Button
                  icon={<Trash size={18} />}
                  iconOnly
                  onClick={() => handleDelete(row)}
                  className="
                    bg-red-500
                    text-white
                    hover:bg-red-700
                  "
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  const [errors, setErrors] = useState({});

  return (

    <div className="px-3 space-y-8">
      <BackButton
        label="Kembali"
        color="text-bold-blue"
        position="relative"
        to={
          readOnly && programDetail.mbkmId
            ? `/pelamar-list/${programDetail.mbkmId}`
            : "/logbook-list"
        }
      />

      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-2">
      
        <div>

          <h1 className="text-xl font-bold text-black mb-2">
            Log Aktivitas
          </h1>

          <h2 className="text-2xl font-bold text-bold-blue">
            {programDetail.title}
          </h2>

          <p className="text-md text-bold-blue">
            {programDetail.company}
          </p>

          <p className="mt-2 text-md">
            Periode:
            <span className="font-bold ml-1">
              {programDetail.period}
            </span>
          </p>

        </div>

        {!readOnly && (
          <Button
            label="+ Tambah Log"
            onClick={openAddPopup}
            className="w-[220px]"
          />
        )}

      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={data}
      />

      {/* POPUP */}
      {!readOnly && openPopup && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/30
            backdrop-blur-sm
            px-4
          "
        >

          {/* MODAL */}
          <div
            className="
              relative
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-2xl
              px-8
              py-10
              animate-fadeInUp
            "
          >

            {/* CLOSE */}
            <button
              onClick={closeFormPopup}
              className="
                absolute
                top-5
                right-5
                text-gray-500
                hover:text-black
              "
            >

              <X size={24} />

            </button>

            {/* TITLE */}
            <h1 className="text-xl text-center font-bold mb-2 text-black">
              {isEdit ? "Edit Aktivitas" : "Tambah Aktivitas"}
            </h1>

            <p className="text-md text-center text-bold-blue mb-8">
              Program:
              <span className="ml-2">
                {programDetail.title} - {programDetail.company}
              </span>
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* TANGGAL */}
                <FormField
                  label="Tanggal*"
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  error={errors.tanggal}
                />

                {/* AKTIVITAS */}
                <FormField
                  label="Aktivitas"
                  type="text"
                  name="aktivitas"
                  value={formData.aktivitas}
                  onChange={handleChange}
                  error={errors.aktivitas}
                  placeholder="Tuliskan deskripsi singkat aktivitas"
                />

                {/* WAKTU MULAI */}
                <FormField
                  label="Waktu Mulai*"
                  type="time"
                  name="waktuMulai"
                  value={formData.waktuMulai}
                  onChange={handleChange}
                  error={errors.waktuMulai}
                />

                {/* WAKTU SELESAI */}
                <FormField
                  label="Waktu Selesai*"
                  type="time"
                  name="waktuSelesai"
                  value={formData.waktuSelesai}
                  onChange={handleChange}
                  error={errors.waktuSelesai}
                />

                {/* MEDIA */}
                <FormField
                  label="Media"
                  type="select"
                  name="media"
                  value={formData.media}
                  onChange={handleChange}
                  error={errors.media}
                  placeholder=""
                  options={[
                    "Online",
                    "Offline",
                    "Hybrid",
                  ]}
                />

                {/* LOKASI */}
                <FormField
                  label="Lokasi"
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  error={errors.lokasi}
                  placeholder="Tuliskan lokasi aktivitas"
                />

                {/* DOKUMENTASI */}
                <div>

                  <label className="text-left block text-bold-blue text-md font-bold mb-2">
                    Dokumentasi
                  </label>

                  <input
                    type="file"
                    onChange={(e) =>
                      setPhotoFile(e.target.files[0])
                    }
                    className="
                      w-full
                      rounded-lg
                      border
                      border-light-blue
                      bg-light-blue-2
                      px-4
                      py-2
                      text-md
                      text-bold-blue
                      file:mr-4
                      file:px-4
                      file:rounded-md
                      file:bg-white
                      file:text-bold-blue
                      file:border-1
                      file:border-bold-blue
                      file:text-sm
                    "
                  />

                </div>

              </div>

              {/* BUTTON */}
              <div className="flex justify-center pt-4">

                <Button
                  label="Simpan"
                  type="submit"
                  className="w-[180px]"
                />

              </div>
            </form>
          </div>
        </div>
      )}

      <PopUpNotif
        isOpen={openDeletePopup}
        onClose={() => {
          setOpenDeletePopup(false);
          setSelectedRow(null);
        }}
        icon={
          <CircleAlert
            size={90}
            className="text-yellow-500"
          />
        }
        title="Apakah Anda yakin?"
        description="
          Log aktivitas ini akan dihapus secara permanen.
        "
      >
        <Button
          label="Batal"
          onClick={() => {
            setOpenDeletePopup(false);
            setSelectedRow(null);
          }}
          className="
            border
            border-bold-blue
            text-bold-blue
            bg-white
          "
        />

        <Button
          label="Hapus"
          onClick={confirmDelete}
          className="
            bg-red-500
            text-white
            hover:bg-red-700
          "
        />
      </PopUpNotif>
    </div>
  );
};

export default LogbookDetail;
