import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg-ahn.png";
import Logo from "../../components/common/Logo";
import BackButton from "../../components/ui/BackButton";
import {
  GraduationCap,
  Building2,
  ArrowLeft,
} from "lucide-react";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bold-blue via-bold-blue/80 to-bold-blue/40"></div>
      
        <BackButton to="/" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 items-center max-w-3xl">
      
        <p className="max-w-auto text-2xl font-medium md:text-2xl text-kuning-tua leading-relaxed mb-4 ">
            Masuk sebagai
        </p>

        {/* ROLE OPTIONS */}
        <div className="mt-10 flex flex-col md:flex-row gap-8 items-center justify-center">

            {/* MAHASISWA */}
            <button
                onClick={() => navigate("/login-mahasiswa")}
                className="relative overflow-hidden bg-white rounded-[16px] w-auto md:w-[1000px] h-[160px] shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
            >

                <div className="absolute right-[-30px] bottom-[-40px] text-light-blue-2">
                    <GraduationCap size={220} strokeWidth={1} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center px-10 gap-6">

                    {/* Icon */}
                    <div className="text-bold-blue">
                        <GraduationCap size={60} strokeWidth={2.2} />
                    </div>

                    {/* Text */}
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-bold-blue leading-tight">
                        Mahasiswa
                        </h2>

                        <p className="text-2xl font-bold text-bold-blue leading-tight">
                        IPB University
                        </p>
                    </div>

                </div>
            </button>

        {/* MITRA */}
        <button
            onClick={() => navigate("/login-mitra")}
            className="relative overflow-hidden bg-white rounded-[16px] w-auto md:w-[1000px] h-[160px] shadow-2xl transition duration-300 hover:scale-[1.02] cursor-pointer"
        >

            <div className="absolute right-[-20px] bottom-[-30px]  text-light-blue-2">
            <Building2 size={220} strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-10 gap-6">

            {/* Icon */}
            <div className="text-bold-blue">
                <Building2 size={60} strokeWidth={2.2} />
            </div>

            {/* Text */}
            <div className="text-left">
                <h2 className="text-2xl font-bold text-bold-blue">
                Mitra
                </h2>
            </div>

            </div>
        </button>

        </div>
        
      </div>
      
    </div>
  );
};

export default SelectRole;