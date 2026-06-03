import bgDesktop from "../../assets/bg-illust.png";
import bgMobile from "../../assets/bg-illust-mob.png";
import Logo from "../../components/common/Logo";
import LoginForm from "../../components/forms/LoginForm";
import BackButton from "../../components/ui/BackButton";

const role = "Mahasiswa IPB";
const emailPlaceholder = "Masukkan email IPB Anda";

const LoginMhs = () => {
  return (
<div className="min-h-screen bg-cover bg-center relative flex items-center justify-center">
      <img
        src={bgMobile}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          md:hidden
        "
      />

      <img
        src={bgDesktop}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          hidden
          md:block
        "
      />
        
        <BackButton />

      {/* Content */}
        <div className="relative z-10 text-center text-white px-2 md:px-6 items-center">
            <div className="flex flex-col items-center gap-4">
                <Logo 
                    logoSize="w-20 md:w-25"
                    textSize="text-xl md:text-2xl"
                />
                <LoginForm
                    role={role}
                    signUpPath="/sign-up-mahasiswa"
                    dashboardPath="/dashboard-mahasiswa"
                    emailPlaceholder={emailPlaceholder}
                    loginPath="/login-mahasiswa"
                />
            </div>
        </div>
     
      </div>
      
  );
};

export default LoginMhs;
