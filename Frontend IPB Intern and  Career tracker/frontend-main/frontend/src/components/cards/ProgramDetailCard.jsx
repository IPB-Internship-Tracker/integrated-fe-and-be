import {
  CalendarDays,
} from "lucide-react";

import BackButton from "../../components/ui/BackButton";
import ProgramStatus from "../../components/ui/ProgramStatus";

const ProgramDetailCard = ({
  programDetail,
  backTo,
  actionButton,
}) => {
  return (

    <div className="max-w-4xl mx-auto space-y-6">

      {/* BACK */}
      <BackButton
        label="Kembali"
        color="text-bold-blue"
        position="relative"
        to={backTo}
      />

      {/* TITLE */}
      <div className="flex justify-between items-center">

        <h1 className="text-xl font-bold text-black">
          Detail Program
        </h1>

    {actionButton}

      </div>

      {/* MAIN CARD */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          flex
          flex-col
          lg:flex-row
          justify-between
          gap-8
        "
      >

        {/* LEFT */}
        <div className="flex gap-5">

          {/* LOGO */}
          <img
            src={programDetail.logo}
            alt={programDetail.company}
            className="w-18 h-18 object-contain"
          />

          {/* DETAIL */}
          <div>

            <h1 className="text-xl font-bold text-bold-blue">
              {programDetail.title}
            </h1>

            <p className="text-xl text-bold-blue mb-5">
              {programDetail.company}
            </p>

            {/* DEADLINE */}
            <p className="text-gray-500 text-md">
              Deadline Pendaftaran:
              <span className="font-bold text-black ml-2">
                {programDetail.deadline}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between items-end">
          <ProgramStatus status={programDetail.status || "Registrasi Dibuka"} />
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

      {/* POSTER */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
        "
      >

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-center mb-8">
          Poster Kegiatan
        </h1>

        {/* IMAGE */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-light-blue/30
          "
        >

          <img
            src={programDetail.poster}
            alt={programDetail.title}
            className="
              w-full
              h-auto
              object-cover
            "
          />

        </div>

      </div>

    </div>
  );
};

export default ProgramDetailCard;
