import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";
import LogoShopee from "../../assets/logo-shopee.png";
import PersonalInfoItem from "../../components/ui/PersonalInfoItem";
import { lamaranService } from "../../services/lamaranService";
import { mapLamaranDetailToUi } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const LamaranDetail = () => {
  const { id } = useParams();

  const [programDetail, setProgramDetail] = useState({
    title: "",
    company: "",
    logo: LogoShopee,
  });

  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    nim: "",
    faculty: "",
    phone: "",
    semester: "",
    major: "",
  });

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await lamaranService.detail(id);
        const mapped = mapLamaranDetailToUi(data);
        setProgramDetail({
          title: mapped.programDetail.title,
          company: mapped.programDetail.company,
          logo: mapped.programDetail.logo,
        });
        setPersonalData(mapped.personalData);
        setDocuments(mapped.documents);
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
        to="/lamaran-list"
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
            Detail Lamaran
          </h1>

          <p className="text-sm text-bold-blue/80 max-w-xl mx-auto">
            Berikut adalah detail lamaran yang telah kamu kirim. Data yang dikirim tidak dapat diubah.
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

              <PersonalInfoItem
                label="Fakultas"
                value={personalData.faculty}
              />

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              <PersonalInfoItem
                label="Nomor HP"
                value={personalData.phone}
              />

              <PersonalInfoItem
                label="Semester"
                value={personalData.semester}
              />

              <PersonalInfoItem
                label="Program Studi"
                value={personalData.major}
              />

            </div>

          </div>

        </div>

        {/* LINE */}
        <div className="border-b border-light-blue/40 mb-12"></div>

        <div className="space-y-8">

          {documents.map((doc, index) => (

            <div key={index}>

              {/* LABEL */}
              <h3 className="text-md font-semibold mb-3">
                {doc.label}
              </h3>

              {/* FILE DISPLAY */}
              <div
                className="
                  border
                  border-light-blue
                  bg-light-blue-2
                  rounded-xl
                  px-5
                  py-4
                  flex
                  items-center
                  gap-3
                "
              >

                <FileText
                  size={22}
                  className="text-bold-blue"
                />

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-bold-blue
                    underline
                    hover:text-indigo-700
                    transition
                  "
                >
                  {doc.fileName}
                </a>

              </div>

            </div>

          ))}

        </div>
      </form>
    </div>
  );
};

export default LamaranDetail;
