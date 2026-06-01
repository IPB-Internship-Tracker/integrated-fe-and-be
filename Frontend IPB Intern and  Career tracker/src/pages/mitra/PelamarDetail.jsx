import BackButton from "../../components/ui/BackButton";
import Button from "../../components/ui/Button";
import FilePreviewCard from "../../components/cards/FilePreviewCard";
import PersonalInfoItem from "../../components/ui/PersonalInfoItem";
import { BookOpen } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { lamaranService } from "../../services/lamaranService";
import { mapLamaranDetailToUi } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const PelamarDetail = () => {

  const { id } = useParams();

  const [applicantDetail, setApplicantDetail] = useState({
    name: "",
    email: "",
    nim: "",
    faculty: "",
    semester: "",
    major: "",
    documents: [],
    mbkmId: id,
    status: "",
  });

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await lamaranService.detail(id);
        const mapped = mapLamaranDetailToUi(data);
        setApplicantDetail({
          name: mapped.personalData.name,
          email: mapped.personalData.email,
          nim: mapped.personalData.nim,
          faculty: mapped.personalData.faculty,
          semester: mapped.personalData.semester,
          major: mapped.personalData.major,
          documents: mapped.documents,
          mbkmId: mapped.mbkmId,
          status: mapped.status,
        });
      } catch (error) {
        showAlert(error.message);
      }
    };

    loadDetail();
  }, [id]);

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      {/* BACK BUTTON */}
      <BackButton
        label="Kembali"
        color="text-bold-blue"
        position="relative"
      />

      {/* TITLE */}
      <div className="flex items-center justify-between gap-4">

        <h1 className="text-xl font-bold text-black">
          Detail Pelamar
        </h1>

        {applicantDetail.status === "Diterima" && (
          <Button
            label="Lihat Logbook"
            icon={<BookOpen size={18} />}
            to={`/logbook-detail-mitra/${id}`}
          />
        )}

      </div>

      {/* MAIN CARD */}
      <div
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
            Data Pelamar
          </h1>

          <p className="text-sm text-bold-blue/80 max-w-xl mx-auto">
            Informasi detail pelamar beserta
            dokumen pendaftaran yang telah diunggah.
          </p>

        </div>

        {/* LINE */}
        <div className="border-b border-light-blue/40 mb-12"></div>

        {/* DATA PRIBADI */}
        <div className="mb-12">

          <h2 className="text-xl font-semibold text-center mb-10">
            Data Pribadi
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-y-8
              gap-x-16
            "
          >

            {/* LEFT */}
            <div className="space-y-6">

              <PersonalInfoItem
                label="Nama Panjang"
                value={applicantDetail.name}
              />

              <PersonalInfoItem
                label="Email"
                value={applicantDetail.email}
              />

              <PersonalInfoItem
                label="NIM"
                value={applicantDetail.nim}
              />

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              <PersonalInfoItem
                label="Semester"
                value={applicantDetail.semester}
              />

              <PersonalInfoItem
                label="Program Studi"
                value={applicantDetail.major}
              />

              <PersonalInfoItem
                label="Fakultas"
                value={applicantDetail.faculty}
              />

            </div>

          </div>

        </div>

        {/* LINE */}
        <div className="border-b border-light-blue/40 mb-12"></div>

        {/* LAMPIRAN */}
        <div>

          <h2 className="text-xl font-semibold text-center mb-10">
            Lampiran
          </h2>

          <div className="space-y-10">

            {applicantDetail.documents.map(
              (doc, index) => (

                <FilePreviewCard
                  key={index}
                  title={doc.title}
                  fileUrl={doc.fileUrl}
                />

              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default PelamarDetail;
