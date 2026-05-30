import ProgramDetailCard from "../../components/cards/ProgramDetailCard";
import Poster from "../../assets/poster.png";
import LogoShopee from "../../assets/logo-shopee.png";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { kegiatanService } from "../../services/kegiatanService";
import { mapKegiatanToProgramDetail } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const StupenDetail = () => {
  const { id } = useParams();

  const fallbackProgramDetail = {

    title:
      "",

    company:
      "",

    logo: LogoShopee,
    poster: Poster,

    deadline:
      "",

    timeline:
      "",

    link:
      "",

    description:
      "",
    status: "Registrasi Dibuka",
  };

  const [programDetail, setProgramDetail] =
    useState(fallbackProgramDetail);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await kegiatanService.detail(id);
        setProgramDetail(
          mapKegiatanToProgramDetail(data, LogoShopee, Poster)
        );
      } catch (error) {
        showAlert(error.message);
      }
    };

    loadDetail();
  }, [id]);

  const handleExternalRegistration = () => {
    if (!programDetail.link) {
      showAlert("Link pendaftaran belum tersedia.");
      return;
    }

    window.open(programDetail.link, "_blank", "noopener,noreferrer");
  };

  return (
    <ProgramDetailCard
      programDetail={programDetail}
      backTo="/stupen-list"
      actionButton={
        <Button
          label="Daftar"
          onClick={handleExternalRegistration}
          className="w-[180px]"
        />
      }
    />
  );
};

export default StupenDetail;
