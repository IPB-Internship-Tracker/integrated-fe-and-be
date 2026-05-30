import BackButton from "../../components/ui/BackButton";
import CreateMagangForm from "../../components/forms/CreateMagangForm";
import DocRequirementForm from "../../components/forms/DocRequirementForm";
import PopUpNotif from "../../components/ui/PopUpNotif";
import logoShopee from "../../assets/logo-shopee.png";
import Poster from "../../assets/poster.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgramStatus from "../../components/ui/ProgramStatus";
import ProgramDetailCard from "../../components/cards/ProgramDetailCard";
import {
  CircleAlert,
  CircleCheck,
  CalendarDays,
  Pencil,
} from "lucide-react";
import Button from "../../components/ui/Button";  
import { kegiatanService } from "../../services/kegiatanService";
import { mapKegiatanToProgramDetail } from "../../services/adapters";
import { showAlert } from "../../services/alertService";

const StupenDetailMitra = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [openBackPopup, setOpenBackPopup] =
    useState(false);

    const [openSavePopup, setOpenSavePopup] =
    useState(false);

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
      backTo="/program-list-mitra"
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
