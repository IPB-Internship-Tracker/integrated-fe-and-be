import BackButton from "../../components/ui/BackButton";
import CreateMagangForm from "../../components/forms/CreateMagangForm";
import DocRequirementForm from "../../components/forms/DocRequirementForm";
import PopUpNotif from "../../components/ui/PopUpNotif";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircleAlert,
  CircleCheck,
} from "lucide-react";
import Button from "../../components/ui/Button";  
import { kegiatanService } from "../../services/kegiatanService";
import {
  mapKegiatanToMagangForm,
  mapMagangFormToPayload,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const EditMagang = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [openBackPopup, setOpenBackPopup] =
    useState(false);

    const [openSavePopup, setOpenSavePopup] =
    useState(false);

    const [isDirty, setIsDirty] =
    useState(false);
    const [isDraft, setIsDraft] =
    useState(false);
    const [isSubmitting, setIsSubmitting] =
    useState(false);
    const [publishedProgramId, setPublishedProgramId] =
    useState(null);

    const goBack = () => {
      if (window.history.length > 1) {
        navigate(-1);
        return;
      }

      navigate(
        isDraft
          ? "/draft-list"
          : `/magang-detail-mitra/${id}`
      );
    };

  const [initialData, setInitialData] =
    useState({
      namaPerusahaan: "",
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
    });

  // initial dokumen
  const [initialDocs, setInitialDocs] =
    useState([]);

  useEffect(() => {
    const loadProgram = async () => {
      try {
        try {
          const draft = await kegiatanService.detailDraft(id);
          if (draft.kategori_mbkm === "magang") {
            setIsDraft(true);
            setInitialData(
              mapKegiatanToMagangForm(draft.data)
            );
            setInitialDocs(
              draft.data?.dokumen_dibutuhkan || []
            );
            return;
          }
        } catch {
          setIsDraft(false);
        }

        const data = await kegiatanService.detail(id);
        setInitialData(mapKegiatanToMagangForm(data));
        setInitialDocs(data.dokumen_dibutuhkan || []);
      } catch (error) {
        showAlert(error.message);
      }
    };

    loadProgram();
  }, [id]);

  return (

    <div className="flex flex-col items-center py-5">

      {/* BACK */}
      <div className="w-full max-w-4xl mb-5">
        <BackButton
            color="text-bold-blue"
            position="relative"
            onClick={() => {
              if (isDirty) {
                setOpenBackPopup(true);

              } else {
                goBack();
              }
            }}
        />
      </div>

     {/* POPUP BACK */}
        <PopUpNotif
            isOpen={openBackPopup}
            onClose={() => setOpenBackPopup(false)}
            icon={
                <CircleAlert
                size={90}
                className="text-yellow-500"
                />
            }
            title="Yakin ingin kembali?"
            description="Perubahan yang belum disimpan dapat hilang."
            >

            {/* DISCARD */}
            <Button
                label="Batalkan Perubahan"
                onClick={() => {
                  goBack();
                }}
                className="
                border
                border-bold-blue
                text-bold-blue
                bg-white
                "
            />

            {/* CANCEL */}
            <Button
                label="Lanjut Edit"
                onClick={() => setOpenBackPopup(false)}
           />

        </PopUpNotif>   

      {/* FORM EDIT */}
      <CreateMagangForm
        key={`magang-${id}-${JSON.stringify(initialData)}`}
        initialData={initialData}
        isEdit={true}
        hideSubmitButton={true}
        onDirtyChange={setIsDirty}
        storageKey={`edit_magang_form_${id}`}
      />

      {/* DOC REQUIREMENT */}
      <div className="mt-8 w-full max-w-4xl">

        <DocRequirementForm
          key={`magang-docs-${id}-${initialDocs.join("|")}`}
          isEdit={true}
          initialSelectedDocs={initialDocs}
          hideSubmitButton={true}
          storageKey={`edit_magang_docs_${id}`}
        />

      </div>

      {/* FINAL SAVE BUTTON */}
      <div
        className="
          w-full
          max-w-4xl
          flex
          justify-center
          mt-8
        "
      >

        <Button
          label={
            isSubmitting
              ? "Memproses..."
              : isDraft
                ? "Publikasikan"
                : "Simpan"
          }
          className="w-[220px]"
            onClick={async () => {
            if (isSubmitting) return;

            try {
              setIsSubmitting(true);
              const raw =
                sessionStorage.getItem(`edit_magang_form_${id}`);
              const rawDocs =
                sessionStorage.getItem(`edit_magang_docs_${id}`);
              const formData = raw
                ? JSON.parse(raw)
                : initialData;
              const selectedDocs = rawDocs
                ? JSON.parse(rawDocs)
                : initialDocs;
              if (isDraft) {
                await kegiatanService.updateDraft(
                  id,
                  "magang",
                  mapMagangFormToPayload(
                    formData,
                    selectedDocs
                  )
                );
                const published =
                  await kegiatanService.publishDraft(id);
                setPublishedProgramId(published.mbkm_id);
                sessionStorage.removeItem(
                  `edit_magang_form_${id}`
                );
                sessionStorage.removeItem(
                  `edit_magang_docs_${id}`
                );
              } else {
                await kegiatanService.updateMagang(
                  id,
                  formData,
                  selectedDocs
                );
              }
              setOpenSavePopup(true);
            } catch (error) {
              showAlert(error.message);
            } finally {
              setIsSubmitting(false);
            }
            }}
        />
      </div>

 

        {/* POPUP SAVE */}
        <PopUpNotif
        isOpen={openSavePopup}
        onClose={() => setOpenSavePopup(false)}

        icon={
            <CircleCheck
            size={90}
            className="text-green-600"
            />
        }

        title={
            isDraft
            ? "Program Berhasil Dipublikasikan"
            : "Perubahan Berhasil Disimpan"
        }

        description={
            isDraft
            ? "Program magang berhasil dipublikasikan."
            : "Program magang berhasil diperbarui."
        }
        >

        {/* CLOSE */}
        <Button
            label="Kembali"
            onClick={() => setOpenSavePopup(false)}
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
            setOpenSavePopup(false);
            navigate(
              `/magang-detail-mitra/${publishedProgramId || id}`
            );
            }}
        />

        </PopUpNotif>

    </div>
  );
};

export default EditMagang;
