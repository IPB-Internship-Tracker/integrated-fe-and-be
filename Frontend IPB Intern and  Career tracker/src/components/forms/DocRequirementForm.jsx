import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import PopUpNotif  from "../../components/ui/PopUpNotif";
import {
  CircleCheck,
  CircleAlert,
} from "lucide-react";
import { showAlert } from "../../services/alertService";

const DEFAULT_SELECTED_DOCS = [];

const DocRequirementForm = ({
  isEdit = false,
  initialSelectedDocs = DEFAULT_SELECTED_DOCS,
  hideSubmitButton = false,
  storageKey = "pending_magang_docs",
  onPublish,
  onSaveDraft,
}) => {
  const [openConfirmPopup, setOpenConfirmPopup] =
    useState(false);

  const [openSuccessPopup, setOpenSuccessPopup] =
    useState(false);  
  const [isSubmitting, setIsSubmitting] =
    useState(false);
    
  const navigate = useNavigate();

  // LIST DOKUMEN
  const documents = [
    "Curriculum Vitae (CV)",
    "Motivation Letter",
    "Transkrip Nilai",
    "Surat Rekomendasi Kampus",
    "Surat Izin Dosen Pembimbing",
    "Portofolio",
  ];


  // STATE CHECKLIST
  const [selectedDocs, setSelectedDocs] =
    useState(initialSelectedDocs);

  useEffect(() => {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify(selectedDocs)
    );
  }, [selectedDocs, storageKey]);
  // ERROR
  const [error, setError] = useState("");
  // HANDLE CHECKBOX
  const handleCheckboxChange = (doc) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(
        selectedDocs.filter((item) => item !== doc)
      );
    } else {
      setSelectedDocs([
        ...selectedDocs,
        doc,
      ]);
    }
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    // MINIMAL 1
    if (selectedDocs.length === 0) {
      setError(
        "Pilih minimal satu dokumen."
      );
      return;
    }

    setError("");
    console.log("DOKUMEN:", selectedDocs);
    setOpenConfirmPopup(true);
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
          bg-gradient-to-r
          from-kuning-tua
          to-kuning-muda
          rounded-2xl
          p-6
          text-center
          mb-10">

        <h1 className="text-2xl font-bold text-bold-blue mb-1">
          Dokumen yang Dibutuhkan
        </h1>

        <p className="text-black font-light">
          {isEdit
            ? "Perbarui dokumen yang dibutuhkan."
            : "Isi informasi yang dibutuhkan untuk membuat program magang Anda."}
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5">

        {/* CHECKLIST */}
        <div
        className={`
            space-y-4
            rounded-xl
            p-2
            transition

            ${
            error
                ? "border-2 border-red-500"
                : "border-2 border-transparent"
            }
        `}
        >

        {documents.map((doc, index) => (

            <label
            key={index}
            className="
                flex
                items-center
                justify-between
                border
                border-light-blue
                rounded-lg
                bg-light-blue-2
                px-5
                py-4
                cursor-pointer
                hover:bg-light-blue/20
                transition ">

            <span className="text-lg text-black">
                {doc}
            </span>

            <input
                type="checkbox"
                checked={selectedDocs.includes(doc)}
                onChange={() => handleCheckboxChange(doc)}
                className="
                w-5
                h-5
                accent-bold-blue
                cursor-pointer"
            />
            </label>
        ))}

        </div>

        {/* ERROR */}
        {error && (
        <p className="text-red-500 italic text-sm">
            {error}
        </p>
        )}
        
        {/* BUTTON */}
        {!hideSubmitButton && (
          <div className="flex justify-between pt-8 flex-wrap gap-4">
          {!isEdit && (

            <Button
              to="../create-magang"
              label="Sebelumnya"
              type="button"
              className="
                border-bold-blue
                border-2
                text-bold-blue
                bg-transparent
                w-[180px]
              "
            />

          )}

              {/* BUTTON SIMPAN */}
                  <Button
                      label="Publikasikan"
                      type="submit"
                      className="w-[180px]"
                  />

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
                      onClick={async () => {
                        try {
                          setIsSubmitting(true);
                          await onSaveDraft?.(selectedDocs);
                          setOpenConfirmPopup(false);
                          navigate("/draft-list");
                        } catch (error) {
                          showAlert(error.message);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
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
                      onClick={async () => {
                        try {
                          setIsSubmitting(true);
                          await onPublish?.(selectedDocs);
                          setOpenConfirmPopup(false);
                          setOpenSuccessPopup(true);
                        } catch (error) {
                          showAlert(error.message);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
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
        )}
      </form>
    </div>
  );
};

export default DocRequirementForm;
