import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg-ahn.png";
import Logo from "../../components/common/Logo";
import Button from "../../components/ui/Button";

const LandingPage = () => {
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
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 items-center max-w-xl">
      
        <p className="max-w-auto text-sm md:text-xl text-white leading-relaxed mb-4 ">
            Selamat Datang di
        </p>

        {/* Logo / Title */}
        <Logo />

        <hr class="border-t-[0.1px] border-[#b5bbe1] my-4"></hr>

        <p className="max-w-auto text-sm md:text-base text-white leading-relaxed mb-10 ">
          Layanan Persiapan Perencanaan dan Pengembangan Karir Mahasiswa IPB University
        </p>

        {/* Button */}
        <Button
        label="Mulai"
        to="/select-role"
        className="w-auto md:w-[200px] self-center mt-8"
        />

      </div>
      
    </div>
  );
};

export default LandingPage;