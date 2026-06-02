import {
  Upload,
  FileText,
  TriangleAlert
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../../components/ui/BackButton";
import Button from "../../components/ui/Button";
import LogoShopee from "../../assets/logo-shopee.png";
import PopUpNotif from "../../components/ui/PopUpNotif";
import PersonalInfoItem from "../../components/ui/PersonalInfoItem";
import { kegiatanService } from "../../services/kegiatanService";
import { attachMitraCompany } from "../../services/kegiatanCompanyService";
import { lamaranService } from "../../services/lamaranService";
import { mahasiswaService } from "../../services/mahasiswaService";
import {
  mapKegiatanToCard,
  mapMahasiswaProfileToUi,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const FormPendaftaran = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState({});


    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setUploadedFiles({
            ...uploadedFiles,
            [field]: file,
        });

        // hapus error ketika upload ulang
        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    
    const validateForm = () => {

        let newErrors = {};

        documents.forEach((doc) => {
            if (!uploadedFiles[doc.key]) {
                newErrors[doc.key] =
                `${doc.label} wajib diupload.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // munculin popup warning
            setOpenPopup(true);
        }
    };




  // PROGRAM DETAIL
  const [programDetail, setProgramDetail] = useState({
    title: "",
    company: "",
    logo: LogoShopee,
  });

  // DATA PRIBADI
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    nim: "",
    faculty: "",
    semester: "",
    major: "",
  });

  // DOKUMEN
    const [documents, setDocuments] = useState([
    {
        key: "Curriculum Vitae (CV)",
        label: "Curriculum Vitae (CV)",
    },
    ]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [kegiatan, mahasiswa] =
                    await Promise.all([
                        kegiatanService.detail(id),
                        mahasiswaService.getMe(),
                    ]);
                const kegiatanWithCompany =
                    await attachMitraCompany(kegiatan);
                const card =
                    mapKegiatanToCard(kegiatanWithCompany, LogoShopee);
                setProgramDetail({
                    title: card.title,
                    company: card.company,
                    logo: card.logo,
                });
                sessionStorage.setItem(
                    "last_applied_program",
                    JSON.stringify({
                        title: card.title,
                        company: card.company,
                        logo: card.logo,
                    })
                );
                const profile =
                    mapMahasiswaProfileToUi(mahasiswa);
                setPersonalData({
                    name: profile.nama,
                    email: profile.email,
                    nim: profile.nim,
                    faculty: profile.fakultas,
                    semester: profile.semester,
                    major: profile.prodi,
                });

                const requiredDocs =
                    kegiatanWithCompany.dokumen_dibutuhkan?.length
                        ? kegiatanWithCompany.dokumen_dibutuhkan
                        : ["Curriculum Vitae (CV)"];
                setDocuments(
                    requiredDocs.map((doc) => ({
                        key: doc,
                        label: doc,
                    }))
                );
            } catch (error) {
                showAlert(error.message);
            }
        };

        if (id) {
            loadData();
        }
    }, [id]);

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      {/* BACK BUTTON */}
      <BackButton
        label="Kembali"
        color="text-bold-blue"
        position="relative"
      />

      {/* PROGRAM HEADER */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          px-8
          py-6
          flex
          items-center
          gap-5
        "
      >

        {/* LOGO */}
        <div className="w-16 h-16">

          <img
            src={programDetail.logo}
            alt={programDetail.company}
            className="w-full h-full object-contain"
          />

        </div>

        {/* INFO */}
        <div>

          <h1 className="text-xl font-bold text-bold-blue">
            {programDetail.title}
          </h1>

          <p className="text-lg text-bold-blue">
            {programDetail.company}
          </p>

        </div>

      </div>

      {/* MAIN FORM CARD */}
    <form
    onSubmit={handleSubmit}
    className="
        bg-white
        rounded-2xl
        shadow-md
        p-10
    "
    >

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-2xl font-bold text-bold-blue mb-2">
            Formulir Pendaftaran
          </h1>

          <p className="text-sm text-bold-blue/80 max-w-xl mx-auto">
            Untuk melakukan pendaftaran, kamu hanya perlu mengunggah dokumen-dokumen yang dibutuhkan, 
            data pribadi kamu sudah otomatis tersimpan.
          </p>

        </div>

        <div className="border-b border-light-blue/40 mb-12"></div>

        {/* DATA PRIBADI */}
        <div className="mb-12">

          <h2 className="text-xl font-semibold text-center mb-10">
            Data Pribadi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">

            {/* LEFT */}
            <div className="space-y-6">

            <PersonalInfoItem
                label="Nama Panjang"
                value={personalData.name}
            />

            <PersonalInfoItem
                label="Email"
                value={personalData.email}
            />

            <PersonalInfoItem
                label="NIM"
                value={personalData.nim}
            />

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

            <PersonalInfoItem
                label="Semester"
                value={personalData.semester}
            />

            <PersonalInfoItem
                label="Program Studi"
                value={personalData.major}
            />

            <PersonalInfoItem
                label="Fakultas"
                value={personalData.faculty}
            />

            </div>

          </div>

        </div>

        {/* LINE */}
        <div className="border-b border-light-blue/40 mb-12"></div>

        {/* BERKAS */}
        <div>

          <h2 className="text-xl font-semibold text-center mb-10">
            Berkas Pendaftaran
          </h2>

          <div className="space-y-8">

            {documents.map((doc, index) => (

              <div key={index}>

                {/* LABEL */}
                <div className="mb-2">

                  <h3 className="text-md font-semibold">
                    {doc.label}
                  </h3>

                  <p className="text-md italic text-light-blue">
                    Maximum file size is 10 MB (PDF)
                  </p>

                </div>

                {/* UPLOAD */}
                <label
                  className="
                    border-2
                    border-dashed
                    border-light-blue
                    bg-light-blue-2
                    rounded-xl
                    px-6
                    py-4
                    flex
                    flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-light-blue/20
                    transition
                  "
                >

                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) =>
                        handleFileChange(e, doc.key)
                    }

                  />

                  <Upload
                    size={30}
                    className="text-bold-blue mb-1"
                  />

                  <p className="text-bold-blue text-sm">
                    Drag your file
                  </p>

                  {errors[doc.key] && (
                    <p className="text-red-500 text-sm italic">
                        {errors[doc.key]}
                    </p>
                    )}

                  <div
                    className="
                      mt-2
                      border
                      bg-white
                      border-bold-blue
                      rounded-md
                      px-2
                      py-1
                      text-bold-blue
                      text-sm
                      hover:bg-kuning-muda
                    "
                  >
                    Or browse here..
                  </div>

                  {uploadedFiles[doc.key] && (
                    <div className="flex items-center gap-2 mt-3">

                        <FileText
                        size={16}
                        className="text-bold-blue"
                        />

                        <p className="text-sm text-bold-blue">
                        {uploadedFiles[doc.key].name}
                        </p>

                    </div>
                    )}

                </label>

              </div>
            ))}

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center gap-4 mt-12">

            <Button
            label="Kirim"
            type="submit"
            className="w-[150px]"
            />

        </div>

      </form>

      <PopUpNotif
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}

        icon={
            <TriangleAlert
            size={80}
            className="text-red-500"
            />
        }

        title="Yakin ingin mengirim pendaftaran?"
        description="
            Setelah dikirim, data pendaftaran
            tidak dapat diubah kembali.
        "
        >

        {/* BATAL */}
        <Button
            label="Batal"
            onClick={() => setOpenPopup(false)}

            className="
            bg-white
            border
            border-bold-blue
            text-bold-blue
            "
        />

        {/* KIRIM */}
        <Button
            label={isSubmitting ? "Mengirim..." : "Ya, Kirim"}

            onClick={async () => {
            try {
                setIsSubmitting(true);
                await lamaranService.applyWithFiles(
                    id,
                    uploadedFiles
                );
                setOpenPopup(false);
                navigate("/pendaftaran-berhasil");
            } catch (error) {
                showAlert(error.message);
            } finally {
                setIsSubmitting(false);
            }
            }}

            className="w-[150px]"
        />

        </PopUpNotif>

    </div>
  );
};

export default FormPendaftaran;
