import BackButton from "../../components/ui/BackButton";
import CreateProgramForm from "../../components/forms/CreateProgramForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpNotif from "../../components/ui/PopUpNotif";
import Button from "../../components/ui/Button";
import { kegiatanService } from "../../services/kegiatanService";
import { mapProgramFormToPayload } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

import {
  CircleAlert,
} from "lucide-react";


const CreateStupen = () => {

  const navigate = useNavigate();

  const [openConfirmPopup, setOpenConfirmPopup] =
    useState(false);

  const [isDirty, setIsDirty] =
    useState(false);

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
              navigate("/dashboard-mitra");
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
        title="Simpan sebagai draft?"
        description="
          Jika tidak disimpan sebagai draft,
          program yang telah dibuat tidak akan tersimpan.
        "
      >

        {/* DISCARD */}
        <Button
          label="Batalkan membuat program"
          onClick={() => {
            setOpenConfirmPopup(false);
            navigate("/dashboard-mitra");
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
                sessionStorage.getItem("pending_stupen_form");
              const pendingForm = raw ? JSON.parse(raw) : {};
              await kegiatanService.saveDraft(
                "studi_independen",
                mapProgramFormToPayload(pendingForm)
              );
              sessionStorage.removeItem(
                "pending_stupen_form"
              );
              setOpenConfirmPopup(false);
              navigate("/draft-list");
            } catch (error) {
              showAlert(error.message);
            }
          }}
        />

      </PopUpNotif>

      <CreateProgramForm
        title="Program Studi Independen"
        onDirtyChange={setIsDirty}
        category="studi_independen"
        storageKey="pending_stupen_form"
      />

    </div>
  );
};

export default CreateStupen;
