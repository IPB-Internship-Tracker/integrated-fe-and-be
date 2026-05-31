import bgImage from "../../assets/bg-ahn.png";
import Logo from "../../components/common/Logo";
import LoginForm from "../../components/forms/LoginForm";
import BackButton from "../../components/ui/BackButton";

const role = "Mitra";
const emailPlaceholder = "Masukkan email perusahaan Anda";

const LoginMitra = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bold-blue via-bold-blue/80 to-bold-blue/40"></div>
        
        <BackButton to="/select-role" />

      {/* Content */}
        <div className="relative z-10 text-center text-white px-2 md:px-6 items-center sm:mt-10">
            <div className="flex flex-col items-center gap-10">
                <Logo 
                    logoSize="w-80 md:w-100"
                    textSize="text-xl md:text-2xl"
                />
                <LoginForm
                    role={role}
                    signUpPath="/sign-up-mitra"
                    dashboardPath="/dashboard-mitra"
                    emailPlaceholder={emailPlaceholder}
                    loginPath="/login-mitra"
                />
            </div>
        </div>
     
      </div>
      
  );
};

export default LoginMitra;
