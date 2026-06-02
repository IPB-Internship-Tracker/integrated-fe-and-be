import {
  MapPin,
  CalendarDays,
  CircleUserRound,
  BriefcaseBusiness,
  Banknote,
  Building2,
  Phone,
  Info,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import BackButton from "../../components/ui/BackButton";
import ProgramStatus from "../../components/ui/ProgramStatus"
import LogoShopee from "../../assets/logo-shopee.png";
import MagangSection from "../../components/cards/MagangSection";
import { kegiatanService } from "../../services/kegiatanService";
import { attachMitraCompany } from "../../services/kegiatanCompanyService";
import {
  mapKegiatanToCard,
  mapKegiatanToMagangDetail,
} from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const InfoCard = ({
  title,
  icon,
  children,
}) => {

  return (

    <div
      className="
        bg-light-blue-2
        rounded-xl
        p-5
        flex
        flex-col
        items-center
        justify-baseline
        text-center
      "
    >

      <h2 className="text-xl font-semibold text-bold-blue mb-3">
        {title}
      </h2>

      <div className="border-t border-light-blue/40 w-full mb-4" />

      <div className="flex items-center gap-3">
        {icon}

        <div>
          {children}
        </div>
      </div>

    </div>
  );
};

const MagangDetailMhs = () => {

const { id } = useParams();

  // PROGRAM DETAIL
  const fallbackProgramDetail = {
    title: "",
    company: "",
    logo: LogoShopee,
    role: "",
    city: "",
    deadline: "",
    timeline: "",
    quota: 0,
    salary: 0,
    placement: "",
    address: "",
    phone: "",
    instagram: "",
    description: "",
    documents: [],
    status: "Registrasi Dibuka",
  };

  const [programDetail, setProgramDetail] =
    useState(fallbackProgramDetail);
  const [recommendedPrograms, setRecommendedPrograms] =
    useState([]);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const [data, recommendations] =
          await Promise.all([
            kegiatanService.detail(id),
            kegiatanService.list({ kategori: "magang" }),
          ]);
        const detailWithCompany = await attachMitraCompany(data);
        setProgramDetail(
          mapKegiatanToMagangDetail(detailWithCompany, LogoShopee)
        );
        setRecommendedPrograms(
          recommendations
            .filter((item) => item.mbkm_id !== Number(id))
            .slice(0, 4)
            .map((item) => ({
              ...mapKegiatanToCard(item),
              to: `/magang-detail/${item.mbkm_id}`,
            }))
        );
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
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-black">
                Detail Program
            </h1>

            {/* BUTTON */}
            <Button
                label="Daftar"
                className="w-[180px]"
                to={`/formpendaftaran/${id}`}
            />
        </div>
      

      {/* MAIN CARD */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-5
          md:p-8
          flex
          flex-col
          lg:flex-row
          justify-between
          gap-8
        "
      >

        {/* LEFT */}
      <div
        className="
          flex
          flex-col
          items-center
          text-center

          md:flex-row
          md:items-start
          md:text-left

          gap-5
        "
      >

          {/* LOGO */}
          <div
            className="
              w-18
              h-18
              rounded-xl
              flex
              items-center
              justify-center
              text-orange-500
              font-bold ">

            <img
                src={programDetail.logo}
                alt={programDetail.company}
                className="w-full h-full object-contain"
                />    
          </div>

          {/* DETAIL */}
          <div
            className="
              flex
              flex-col
              items-center

              md:items-start
            "
          >

            <h1 className="text-xl font-bold text-bold-blue">
              {programDetail.title}
            </h1>

            <p className="text-xl text-bold-blue mb-5">
              {programDetail.company}
            </p>

            {/* ROLE */}
            <div className="flex items-center gap-2 mb-3">

              <CircleUserRound
                className="text-bold-blue"
                size={22}
              />

              <span className="text-lg">
                {programDetail.role}
              </span>

            </div>

            {/* CITY */}
            <div className="flex items-center gap-2 mb-5">

              <MapPin
                className="text-bold-blue"
                size={22}
              />

              <span className="text-lg">
                {programDetail.city}
              </span>

            </div>

            <p className="text-gray-500 text-md">
              Deadline Pendaftaran:
              <span className="font-bold text-black ml-2">
                {programDetail.deadline}
              </span>
            </p>

          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between items-center md:items-end">

        <ProgramStatus status={programDetail.status} />

          {/* TIMELINE */}
          <div className="flex items-center gap-4 mt-10">

            <div className="text-right">

              <p className="text-gray-500">
                Timeline Kegiatan:
              </p>

              <p className="font-bold text-lg">
                {programDetail.timeline}
              </p>

            </div>

            <CalendarDays
              size={42}
              className="text-bold-blue"
            />

          </div>

        </div>
      </div>


      {/* INFORMASI TAMBAHAN */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
        "
      >

        <h1 className="text-2xl font-semibold text-center mb-8">
          Informasi Tambahan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* KUOTA */}
          <InfoCard
            title="Kuota"
            icon={
              <BriefcaseBusiness
                size={42}
                className="text-bold-blue"
              />
            }
          >

            <p className="text-5xl font-bold text-bold-blue">
              {programDetail.quota}
            </p>

            <p className="text-sm text-bold-blue">
              Tersedia
            </p>

          </InfoCard>

          {/* GAJI */}
          <InfoCard
            title="Gaji"
            icon={
              <Banknote
                size={42}
                className="text-bold-blue"
              />
            }
          >

            <div className="text-2xl font-bold text-bold-blue">
              {`Rp${programDetail.salary}`}

              <span className="text-base font-medium ml-1">
                /bulan
              </span>
            </div>

          </InfoCard>

          {/* PENEMPATAN */}
          <InfoCard
            title="Penempatan"
            icon={
              <Building2
                size={36}
                className="text-bold-blue"
              />
            }
          >

            <div
              className="
                bg-bold-blue
                text-white
                px-4
                py-2
                rounded-lg
                font-semibold
              "
            >
              {programDetail.placement}
            </div>

          </InfoCard>

          {/* ALAMAT */}
          <InfoCard
            title="Alamat Lengkap"
            icon={
              <MapPin
                size={36}
                className="text-bold-blue"
              />
            }
          >

            <p className="text-left text-sm max-w-xs">
              {programDetail.address}
            </p>

          </InfoCard>

        </div>

        {/* CONTACT */}
        <div
          className="
            mt-5
            bg-light-blue-2
            rounded-xl
            p-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-center
            gap-10
          "
        >

          <div className="flex items-center gap-3">

            <Phone
              className="text-bold-blue"
              size={22}
            />

            <span className="text-lg text-bold-blue">
              {programDetail.phone}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Info
              className="text-bold-blue"
              size={22}
            />

            <span className="text-lg text-bold-blue">
              {programDetail.instagram}
            </span>

          </div>

        </div>
      </div>

      {/* DESKRIPSI */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
        "
      >

        <h1 className="text-2xl font-semibold text-center mb-8">
          Deskripsi Kegiatan
        </h1>

        <p className="text-md leading-relaxed whitespace-pre-line">
          {programDetail.description}
        </p>

      </div>

      {/* DOKUMEN */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
        "
      >

        <h1 className="text-2xl font-semibold text-center mb-8">
          Dokumen yang dibutuhkan
        </h1>

        <div className="flex flex-wrap justify-center gap-4">

          {programDetail.documents.map((doc, index) => (

            <div
              key={index}
              className="
                w-full
                md:w-auto
                border
                border-kuning-tua
                rounded-lg
                px-6
                py-3
                text-center
                text-bold-blue
                font-medium
                hover:bg-kuning-muda
              "
            >
              {doc}
            </div>
          ))}

        </div>

      </div>

      <div className="border-b border-light-blue/40 my-12"></div>

      {/* REKOMENDASI */}
      <MagangSection
        sectionTitle="Program lain yang mungkin Anda suka"
        buttonTo="/magang-list"
        programs={recommendedPrograms}
      />

    </div>
  );
};

export default MagangDetailMhs;
