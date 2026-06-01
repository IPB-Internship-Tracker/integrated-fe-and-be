import BackButton from "../../components/ui/BackButton";
import CreateProgramForm from "../../components/forms/CreateProgramForm";
import PopUpNotif from "../../components/ui/PopUpNotif";
import logoShopee from "../../assets/logo-shopee.png";
import Poster from "../../assets/poster.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "../../services/alertService";

import {
  CircleAlert,
  CircleCheck,
} from "lucide-react";

import Button from "../../components/ui/Button";
import { kegiatanService } from "../../services/kegiatanService";
import {
  mapKegiatanToProgramForm,
  mapProgramFormToPayload,
} from "../../services/adapters";

const EditStupen = () => {

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
        : `/stupen-detail-mitra/${id}`
    );
  };

  const [initialData, setInitialData] =
    useState({
      logo: logoShopee,
      poster: Poster,
      title: "",
      description: "",
      link: "",
      deadline: "",
      startDate: "",
      endDate: "",
    });

  useEffect(() => {
    const loadProgram = async () => {
      try {
        try {
          const draft = await kegiatanService.detailDraft(id);
          if (draft.kategori_mbkm === "studi_independen") {
            setIsDraft(true);
            setInitialData(
              mapKegiatanToProgramForm(draft.data)
            );
            return;
          }
        } catch {
          setIsDraft(false);
        }

        const data = await kegiatanService.detail(id);
        setInitialData(mapKegiatanToProgramForm(data));
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

        description="
          Perubahan yang belum disimpan dapat hilang.
        "
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
      <CreateProgramForm
        key={`stupen-${id}-${JSON.stringify(initialData)}`}
        title="Studi Independen"
        initialData={initialData}
        isEdit={true}
        hideSubmitButton={true}
        onDirtyChange={setIsDirty}
        category="studi_independen"
        programId={id}
        storageKey={`edit_stupen_form_${id}`}
      />

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

          onClick={() => {
            const save = async () => {
              if (isSubmitting) return;

              try {
                setIsSubmitting(true);
                const raw = sessionStorage.getItem(
                  `edit_stupen_form_${id}`
                );
                const formData = raw
                  ? JSON.parse(raw)
                  : initialData;
                if (isDraft) {
                  await kegiatanService.updateDraft(
                    id,
                    "studi_independen",
                    mapProgramFormToPayload(formData)
                  );
                  const published =
                    await kegiatanService.publishDraft(id);
                  setPublishedProgramId(published.mbkm_id);
                  sessionStorage.removeItem(
                    `edit_stupen_form_${id}`
                  );
                } else {
                  await kegiatanService.updateStudiIndependen(
                    id,
                    formData
                  );
                }
                setOpenSavePopup(true);
              } catch (error) {
                showAlert(error.message);
              } finally {
                setIsSubmitting(false);
              }
            };
            save();
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
            ? "Program studi independen berhasil dipublikasikan."
            : "Program studi independen berhasil diperbarui."
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
              `/stupen-detail-mitra/${publishedProgramId || id}`
            );
          }}
        />

      </PopUpNotif>

    </div>
  );
};

export default EditStupen;
