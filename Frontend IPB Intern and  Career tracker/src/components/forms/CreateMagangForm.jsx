import { useState, useEffect } from "react";
import FormField from "../../components/forms/FormField";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  House,
  Building2,
  Globe,
} from "lucide-react";
import { kegiatanService } from "../../services/kegiatanService";
import { showAlert } from "../../services/alertService";

  const CreateMagangForm = ({
    initialData = null,
    isEdit = false,
    hideSubmitButton = false,
    onDirtyChange,
    storageKey = "pending_magang_form",
    onSubmit,
  }) => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(
    initialData || {
      namaPerusahaan: "",
      logo: null,
      judulLamaran: "",
      posisi: "",
      deskripsi: "",
      bidang: "",
      kuota: "",
      salary: "",
      penempatan: "",
      tenggat: "",
      mulai: "",
      berakhir: "",
      kota: "",
      alamat: "",
      narahubung: "",
      informasi: "",
    }
  );

useEffect(() => {

  const normalize = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }
    return String(value).trim();
  };

  // kalau create page
  if (!initialData) {
    const hasChanges = Object.entries(formData)
      .some(([key, value]) => {
        // skip logo
        if (key === "logo") {
          return value !== null;
        }
        return normalize(value) !== "";
      });
    onDirtyChange?.(hasChanges);
    return;
  }

  // kalau edit page
  const hasChanges = (
    normalize(formData.namaPerusahaan) !==
      normalize(initialData.namaPerusahaan)
    ||
    normalize(formData.judulLamaran) !==
      normalize(initialData.judulLamaran)
    ||
    normalize(formData.posisi) !==
      normalize(initialData.posisi)
    ||
    normalize(formData.deskripsi) !==
      normalize(initialData.deskripsi)
    ||
    normalize(formData.bidang) !==
      normalize(initialData.bidang)
    ||
    normalize(formData.kuota) !==
      normalize(initialData.kuota)
    ||
    normalize(formData.salary) !==
      normalize(initialData.salary)
    ||
    normalize(formData.penempatan) !==
      normalize(initialData.penempatan)
    ||
    normalize(formData.tenggat) !==
      normalize(initialData.tenggat)
    ||
    normalize(formData.mulai) !==
      normalize(initialData.mulai)
    ||
    normalize(formData.berakhir) !==
      normalize(initialData.berakhir)
    ||
    normalize(formData.kota) !==
      normalize(initialData.kota)
    ||
    normalize(formData.alamat) !==
      normalize(initialData.alamat)
    ||
    normalize(formData.narahubung) !==
      normalize(initialData.narahubung)
    ||
    normalize(formData.informasi) !==
      normalize(initialData.informasi)
    ||
    normalize(formData.logo) !==
      normalize(initialData.logo)
  );
  onDirtyChange?.(hasChanges);

}, [formData, initialData, onDirtyChange]);

useEffect(() => {
  const serializableData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [
      key,
      value instanceof File ? value.name : value,
    ])
  );
  sessionStorage.setItem(
    storageKey,
    JSON.stringify(serializableData)
  );
}, [formData, storageKey]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {
      const uploaded =
        await kegiatanService.uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        logo: uploaded.path || uploaded.url,
      }));
    } catch (error) {
      showAlert(error.message);
    }
  };

  const getFileLabel = (value, fallback) => {
    if (!value) return fallback;
    if (value instanceof File) return value.name;
    return String(value).split("/").pop() || fallback;
  };


  // HARI INI
  const today = new Date();

  // H+1
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // FORMAT YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // MIN TENGGAT
  const minTenggat = formatDate(tomorrow);

  // MIN PROGRAM DIMULAI
  const minMulai =
    formData.tenggat || minTenggat;

  // MIN PROGRAM BERAKHIR
  const minBerakhir = (() => {
    // kalau belum pilih tanggal mulai
    if (!formData.mulai) {
      return minTenggat;
    }

    // H+1 dari tanggal mulai
    const nextDay = new Date(formData.mulai);
    nextDay.setDate(nextDay.getDate() + 1);
    return formatDate(nextDay);
  })();


  // VALIDASI FORM
  const validateForm = () => {
    let newErrors = {};
    // REQUIRED FIELD
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Kolom ini wajib diisi.";
      }
    });

    // KUOTA
    if (formData.kuota && formData.kuota <= 0) {
      newErrors.kuota =
        "Kuota harus lebih dari 0.";
    }

    // GAJI
    if (formData.salary && formData.salary <= 0) {
      newErrors.salary =
        "Gaji harus lebih dari 0.";
    }

    // TANGGAL TENGGAT
    if (formData.tenggat < minTenggat) {
      newErrors.tenggat =
        "Tenggat minimal H+1 dari hari ini.";
    }

    // PROGRAM DIMULAI
    if (formData.mulai < formData.tenggat) {
      newErrors.mulai =
        "Program dimulai tidak boleh sebelum tenggat.";
    }

    // PROGRAM BERAKHIR
    if (formData.berakhir <= formData.mulai) {
      newErrors.berakhir =
        "Program berakhir harus setelah tanggal dimulai.";
    }
    const description =
      String(formData.deskripsi || "").trim();

    if (!description) {
      newErrors.deskripsi =
        "Deskripsi program wajib diisi.";
    } else if (description.length < 10) {
      newErrors.deskripsi =
        "Deskripsi program minimal 10 karakter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      if (isEdit) {
        navigate("/program-list-mitra");
      } else {
        navigate("../doc-requirement");
      }
    } catch (error) {
      showAlert(error.message);
    }
      }
};

const placementOptions = [
  {
    label: "WFH",
    value: "WFH",
    icon: <House size={18} />,
  },
  {
    label: "Hybrid",
    value: "Hybrid",
    icon: <Globe size={18} />,
  },
  {
    label: "WFO",
    value: "WFO",
    icon: <Building2 size={18} />,
  },
];

const handlePlacementChange = (
  value
) => {
  setFormData({
    ...formData,
    penempatan: value,
  });
};


  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-4xl
        p-8 ">

      {/* HEADER */}
      <div
        className="
          bg-gradient-to-r from-kuning-tua to-kuning-muda
          rounded-2xl
          p-6
          text-center
          mb-10 ">

        <h1 className="text-2xl font-bold text-bold-blue mb-1">
          {isEdit
            ? "Edit Program Magang"
            : "Buat Program Magang"}
        </h1>

        <p className="text-black font-light">
          {isEdit
            ? "Perbarui informasi program magang Anda."
            : "Isi informasi yang dibutuhkan untuk membuat program magang Anda."}
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAMA PERUSAHAAN + LOGO */}
        <div className="flex gap-5 items-end">

          <div className="flex-1">

            <FormField
              label="Nama Perusahaan"
              name="namaPerusahaan"
              value={formData.namaPerusahaan}
              onChange={handleChange}
              placeholder="Tuliskan nama perusahaan Anda"
              error={errors.namaPerusahaan}
            />

          </div>

        {/* UPLOAD LOGO */}
        <label
          className="
              flex
              items-center
              gap-2
              border
              border-light-blue
              rounded-lg
              px-4
              py-2
              text-bold-blue
              hover:bg-light-blue-2
              transition
              cursor-pointer
          "
          >

          <Upload size={18} />
          <span className="max-w-[180px] truncate">
            {getFileLabel(formData.logo, "Tambahkan Logo")}
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />

        </label>

        </div>

        {/* JUDUL */}
        <FormField
          label="Judul Lamaran"
          name="judulLamaran"
          value={formData.judulLamaran}
          onChange={handleChange}
          placeholder="Contoh: UI/UX Designer Internship"
          error={errors.judulLamaran}
        />

        {/* POSISI */}
        <FormField
          label="Posisi yang Dibuka"
          name="posisi"
          value={formData.posisi}
          onChange={handleChange}
          placeholder="Contoh: UI/UX Designer"
          error={errors.posisi}
        />

        {/* DESKRIPSI */}
          <div>

            <label className="text-left block text-bold-blue text-md font-bold mb-2">
              Deskripsi Program
            </label>

            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Tuliskan deskripsi program dengan lengkap. Anda bisa manfaatkan kolom ini untuk mencantumkan informasi yang belum tertera pada kolom lainnya."
              rows={5}
              className={`
                w-full rounded-lg border
                bg-light-blue-2
                px-4 py-3
                text-md text-bold-blue
                placeholder:font-light
                placeholder:text-light-blue
                placeholder:italic
                focus:outline-none
                focus:ring-1

                ${
                  errors.deskripsi
                    ? "border-red-500 focus:ring-red-500"
                    : "border-light-blue focus:ring-light-blue"
                }
              `}
            />

            {/* ERROR MESSAGE */}
            {errors.deskripsi && (

              <p className="text-left text-red-500 text-sm italic mt-1">
                {errors.deskripsi}
              </p>
            )}

          </div>

        {/* BIDANG */}
        <FormField
          label="Bidang"
          type="select"
          name="bidang"
          value={formData.bidang}
          onChange={handleChange}
          placeholder="Pilih salah satu bidang"
          error={errors.bidang}
          options={[
            "Information Technology",
            "Data & Analytics",
            "Business & Management",
            "Marketing & Communication",
            "Finance & Accounting",
            "Human Resources (HR)",
            "Operations & Logistics",
            "Administration",
            "Design & Creative",
            "Engineering (Non-IT)",
            "Research & Development",
            "Sales & Business Development",
            "Healthcare / Life Sciences",
            "Lainnya",
          ]}
        />

        {/* KUOTA */}
        <FormField
          label="Kuota"
          type="number"
          name="kuota"
          value={formData.kuota}
          onChange={handleChange}
          placeholder="Tuliskan dalam bentuk angka saja"
          error={errors.kuota}
        />

        {/* GAJI */}
        <FormField
          label="Gaji"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Tuliskan dalam bentuk angka tanpa titik dan koma"
          error={errors.salary}
        />


        {/* PENEMPATAN */}
        <div>
          <label className="text-left block text-bold-blue text-md font-bold mb-3">
            Penempatan
          </label>

          <div className="flex gap-3 flex-wrap">
            {placementOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  handlePlacementChange(
                    option.value
                  )
                }
                className={`
                  flex
                  items-center
                  gap-2
                  border
                  rounded-lg
                  px-5
                  py-3
                  transition
                  cursor-pointer

                  ${
                    formData.penempatan ===
                    option.value

                      ? `
                        bg-light-blue
                        border-bold-blue
                        text-white
                        shadow-md
                      `
                      : `
                        border-light-blue
                        text-bold-blue
                        hover:bg-light-blue-2
                      `
                  }
                `}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>

          {/* ERROR */}
          {errors.penempatan && (

            <p className="text-red-500 text-sm italic mt-2">
              {errors.penempatan}
            </p>

          )}

        </div>

        {/* TANGGAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <FormField
            label="Tenggat Pendaftaran"
            type="date"
            name="tenggat"
            value={formData.tenggat}
            onChange={handleChange}
            min={minTenggat}
            error={errors.tenggat}
          />

          <FormField
            label="Program Dimulai"
            type="date"
            name="mulai"
            value={formData.mulai}
            onChange={handleChange}
            min={minMulai}
            error={errors.mulai}
          />

          <FormField
            label="Program Berakhir"
            type="date"
            name="berakhir"
            value={formData.berakhir}
            onChange={handleChange}
            min={minBerakhir}
            error={errors.berakhir}
          />

        </div>

        {/* LOKASI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <FormField
            label="Kota Lokasi"
            name="kota"
            value={formData.kota}
            onChange={handleChange}
            placeholder="Contoh: Jakarta Selatan"
            error={errors.kota}
          />

          <FormField
            label="Alamat Lengkap"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Tuliskan alamat lengkap perusahaan"
            error={errors.alamat}
          />

        </div>

        {/* NARAHUBUNG */}
        <FormField
          label="Narahubung"
          name="narahubung"
          value={formData.narahubung}
          onChange={handleChange}
          placeholder="Contoh: +628123456789"
          error={errors.narahubung}
        />

        {/* INFORMASI */}
        <FormField
          label="Informasi Lebih Lanjut"
          name="informasi"
          value={formData.informasi}
          onChange={handleChange}
          placeholder="Contoh: instagram, youtube, atau link pendaftaran online"
          error={errors.informasi}
        />

        {/* BUTTON */}
        <div className="flex justify-end pt-5">
          {!hideSubmitButton && (
            <Button
              label={
                isEdit
                  ? "Simpan"
                  : "Selanjutnya"
              }
              type="submit"
              className="w-[180px]"
            />
          )}


        </div>

      </form>

    </div>
  );
};

export default CreateMagangForm;
