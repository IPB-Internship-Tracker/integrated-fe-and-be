import logoShopee from "../../assets/logo-shopee.png";
import Poster from "../../assets/poster.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgramDetailCard from "../../components/cards/ProgramDetailCard";
import {
  Pencil,
} from "lucide-react";
import Button from "../../components/ui/Button";  
import { kegiatanService } from "../../services/kegiatanService";
import { mapKegiatanToProgramDetail } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const StupenDetailMitra = () => {
    const { id } = useParams();

const fallbackProgramDetail = {
  title: "",
  company: "",
  logo: logoShopee,
  poster: Poster,
  deadline: "",
  timeline: "",
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
        mapKegiatanToProgramDetail(data, logoShopee, Poster)
      );
    } catch (error) {
      showAlert(error.message);
    }
  };

  loadDetail();
}, [id]);

  return (

    <ProgramDetailCard
      programDetail={programDetail}
      actionButton={
        <Button
          label="Edit"
          to={`/edit-studi-independen/${id}`}
          icon={<Pencil size={18} />}
          className="px-6"
        />
      }
    />
  );
};

export default StupenDetailMitra;
