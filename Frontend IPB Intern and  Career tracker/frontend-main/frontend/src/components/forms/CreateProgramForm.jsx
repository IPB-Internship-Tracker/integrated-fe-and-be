import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/forms/FormField";
import Button from "../../components/ui/Button";
import PopUpNotif from "../ui/PopUpNotif";
import { kegiatanService } from "../../services/kegiatanService";
import { mapProgramFormToPayload } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

import {
  Upload,
  CircleCheck,
  CircleAlert,
} from "lucide-react";

const CreateProgramForm = ({
  title = "Buat Program",
  initialData = {},
  isEdit = false,
  hideSubmitButton = false,
  onDirtyChange,
  category = "lomba",
  storageKey = "pending_program_form",
}) => {
  const [openConfirmPopup, setOpenConfirmPopup] =
    useState(false);

  const [openSuccessPopup, setOpenSuccessPopup] =
    useState(false);  
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  
  const navigate = useNavigate();

  const [errors, setErrors] =
    useState({});

  const [formData, setFormData] =
    useState({
      logo:
        initialData.logo || null,
      poster:
        initialData.poster || null,
      title:
        initialData.title || "",
      description:
        initialData.description || "",
      link:
        initialData.link || "",
      deadline:
        initialData.deadline || "",
      startDate:
        initialData.startDate || "",
      endDate:
        initialData.endDate || "",
    });

   // ngecek apakah ada perubahan 
  useEffect(() => {
    const normalize = (value) => {
      if (value === null || value === undefined) {
        return "";
      }
      return String(value).trim();
    };

    const hasChanges = (
      normalize(formData.title) !==
        normalize(initialData.title)
      ||
      normalize(formData.description) !==
        normalize(initialData.description)
      ||
      normalize(formData.link) !==
        normalize(initialData.link)
      ||
      normalize(formData.deadline) !==
        normalize(initialData.deadline)
      ||
      normalize(formData.startDate) !==
        normalize(initialData.startDate)
      ||
      normalize(formData.endDate) !==
        normalize(initialData.endDate)
      ||
      normalize(formData.logo) !==
        normalize(initialData.logo)
      ||
      normalize(formData.poster) !==
        normalize(initialData.poster)
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


  // HANDLE IMAGE
  const handleImageChange = async (
    e,
    field
  ) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const uploaded =
        await kegiatanService.uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        [field]: uploaded.path || uploaded.url,
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

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // VALIDATE
  const validateForm = () => {

    let newErrors = {};

    Object.keys(formData).forEach(
      (key) => {

        if (!formData[key]) {

          newErrors[key] =
            "Kolom ini wajib diisi.";
        }
      }
    );

    const description =
      String(formData.description || "").trim();

    if (!description) {
      newErrors.description =
        "Deskripsi wajib diisi.";
    } else if (description.length < 10) {
      newErrors.description =
        "Deskripsi program minimal 10 karakter.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();
    if (validateForm()) {
      console.log("FORM VALID");

      if (isEdit) {
        console.log("UPDATE PROGRAM");
      }

      else {
        console.log("CREATE PROGRAM");
      }
    }
  };

  const handleSaveDraft = async () => {
    try {
      setIsSubmitting(true);
      await kegiatanService.saveDraft(
        category,
        mapProgramFormToPayload(formData)
      );
      sessionStorage.removeItem(storageKey);
      setOpenConfirmPopup(false);
      navigate("/draft-list");
    } catch (error) {
      showAlert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsSubmitting(true);
      if (category === "studi_independen") {
        await kegiatanService.createStudiIndependen(formData);
      } else {
        await kegiatanService.createLomba(formData);
      }
      sessionStorage.removeItem(storageKey);
      setOpenConfirmPopup(false);
      setOpenSuccessPopup(true);
    } catch (error) {
      showAlert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-4xl
        p-8
      "
    >

      {/* HEADER */}
      <div
        className="
          bg-gradient-to-r
          from-kuning-tua
          to-kuning-muda
          rounded-2xl
          p-6
          text-center
          mb-10
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-bold-blue
            mb-1
          "
        >

          {isEdit
            ? `Edit ${title}`
            : `Buat ${title}`
          }

        </h1>

        <p className="text-black font-light">

          {isEdit
            ? `Perbarui informasi ${title}.`
            : `Isi informasi untuk membuat ${title}.`
          }
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

      {/* LOGO */}
        <div>

          <label
            className="
              text-left
              block
              text-bold-blue
              text-md
              font-bold
              mb-2
            "
          >
            Logo Program
          </label>

          <label
            className="
              flex
              items-center
              gap-2
              border
              border-light-blue
              rounded-lg
              px-4
              py-3
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
              onChange={(e) =>
                handleImageChange(e, "logo")
              }
            />

          </label>
          {errors.logo && (

            <p className="text-red-500 text-sm italic mt-1">
              {errors.logo}
            </p>
          )}

        </div>

        {/* POSTER */}
        <div>

          <label
            className="
              text-left
              block
              text-bold-blue
              text-md
              font-bold
              mb-2
            "
          >
            Poster Program
          </label>

          <label
            className="
              flex
              items-center
              gap-2
              border
              border-light-blue
              rounded-lg
              px-4
              py-3
              text-bold-blue
              hover:bg-light-blue-2
              transition
              cursor-pointer
            "
          >

            <Upload size={18} />

            <span className="max-w-[180px] truncate">

              {getFileLabel(formData.poster, "Tambahkan Poster")}

            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageChange(e, "poster")
              }
            />

          </label>

          {errors.poster && (

            <p className="text-red-500 text-sm italic mt-1">
              {errors.poster}
            </p>
          )}

        </div>

        {/* NAMA KEGIATAN */}
        <FormField
          label="Nama Kegiatan"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan nama kegiatan"
          error={errors.title}
        />

        {/* DESKRIPSI */}
        <div>

          <label
            className="
              text-left
              block
              text-bold-blue
              text-md
              font-bold
              mb-2
            "
          >
            Deskripsi Program
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tuliskan deskripsi program"
            rows={5}

            className={`
              w-full
              rounded-lg
              border
              bg-light-blue-2
              px-4
              py-3
              text-md
              text-bold-blue
              placeholder:italic
              placeholder:text-light-blue
              focus:outline-none
              focus:ring-1

              ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-light-blue focus:ring-light-blue"
              }
            `}
          />

          {errors.description && (

            <p className="text-red-500 text-sm italic mt-1">
              {errors.description}
            </p>
          )}

        </div>

        {/* LINK */}
        <FormField
          label="Link Pendaftaran"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://..."
          error={errors.link}
        />

        {/* TANGGAL */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          "
        >

          <FormField
            label="Deadline Pendaftaran"
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            error={errors.deadline}
          />

          <FormField
            label="Tanggal Mulai"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
          />

          <FormField
            label="Tanggal Selesai"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            error={errors.endDate}
          />

        </div>

        {/* BUTTON */}
        <div className="flex justify-end pt-5">

          {!hideSubmitButton && (

            <Button
              label={
                isEdit
                  ? "Simpan"
                  : "Publikasikan"
              }
              type="button"

              onClick={() => {

                if (validateForm()) {

                  if (isEdit) {
                    console.log("UPDATE PROGRAM");
                    setOpenSuccessPopup(true);

                  } else {
                    setOpenConfirmPopup(true);
                  }
                }
              }}

              className="w-[180px]"
            />
          )}

          {/* POPUP KONFIRMASI */}
          <PopUpNotif
            isOpen={openConfirmPopup}

            onClose={() =>
              setOpenConfirmPopup(false)
            }

            icon={
              <CircleAlert
                size={90}
                className="text-yellow-500"
              />
            }

            title="Apakah kamu yakin?"

            description="
              Program akan langsung dipublikasikan
              dan dapat diakses secara publik.
            "
          >

            {/* DRAFT */}
            <Button
              label={
                isSubmitting
                  ? "Menyimpan..."
                  : "Simpan sebagai Draft"
              }
              onClick={handleSaveDraft}

              className="
                border
                border-bold-blue
                text-bold-blue
                bg-white
              "
            />

            {/* PUBLISH */}
            <Button
              label={
                isSubmitting
                  ? "Mempublikasikan..."
                  : "Publikasikan"
              }
              onClick={handlePublish}
            />

          </PopUpNotif>

          {/* POPUP SUKSES */}
          <PopUpNotif
            isOpen={openSuccessPopup}

            onClose={() =>
              setOpenSuccessPopup(false)
            }

            icon={
              <CircleCheck
                size={90}
                className="text-green-600"
              />
            }

            title="Program Berhasil Dipublikasikan"

            description="
              Program telah berhasil dipublikasikan
              dan dapat dilihat oleh mahasiswa.
            "
          >

            {/* CLOSE */}
            <Button
              label="Kembali"

              onClick={() =>
                setOpenSuccessPopup(false)
              }

              className="
                border
                border-bold-blue
                text-bold-blue
                bg-white
              "
            />

            {/* SEE */}
            <Button
              label="Lihat Program"

              onClick={() => {

                setOpenSuccessPopup(false);

                navigate("/program-list-mitra");
              }}
            />

          </PopUpNotif>

        </div>

      </form>

    </div>
  );
};

export default CreateProgramForm;
