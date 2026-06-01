import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../services/alertService";

import {
  CircleAlert,
} from "lucide-react";

import CreateMagangForm from "../../components/forms/CreateMagangForm";
import BackButton from "../../components/ui/BackButton";
import PopUpNotif from "../../components/ui/PopUpNotif";
import Button from "../../components/ui/Button";
import { kegiatanService } from "../../services/kegiatanService";
import { mapMagangFormToPayload } from "../../services/adapters";

const CreateMagang = () => {

  const navigate = useNavigate();

  const [openConfirmPopup, setOpenConfirmPopup] =
    useState(false);

  const [isDirty, setIsDirty] =
    useState(false);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/dashboard-mitra");
  };

  return (

    <div className="flex flex-col items-center py-5">
      {/* BACK BUTTON */}
      <div className="w-full max-w-4xl mb-5">
        <BackButton
          color="text-bold-blue"
          position="relative"
          onClick={() => {
            // kalau ada perubahan
            if (isDirty) {
              setOpenConfirmPopup(true);
            }
            // kalau belum isi apa2
            else {
              goBack();
            }
          }}
        />
      </div>

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
        title="Batalkan membuat program?"
        description="
          Program yang telah dibuat tidak akan tersimpan.
        "
      >

        {/* DISCARD */}
        <Button
          label="Batalkan membuat program"
          onClick={() => {
            setOpenConfirmPopup(false);
            goBack();
          }}

          className="
            border
            border-bold-blue
            text-bold-blue
            bg-white
          "
        />

        {/* SAVE DRAFT */}
        <Button
          label="Simpan sebagai Draft"
          onClick={async () => {
            try {
              const raw =
                sessionStorage.getItem("pending_magang_form");
              const pendingForm = raw ? JSON.parse(raw) : {};
              await kegiatanService.saveDraft(
                "magang",
                mapMagangFormToPayload(pendingForm)
              );
              sessionStorage.removeItem("pending_magang_form");
              setOpenConfirmPopup(false);
              navigate("/draft-list");
            } catch (error) {
              showAlert(error.message);
            }
          }}
        />

      </PopUpNotif>

      {/* FORM */}
      <CreateMagangForm
        onDirtyChange={setIsDirty}
      />

    </div>
  );
};

export default CreateMagang;
