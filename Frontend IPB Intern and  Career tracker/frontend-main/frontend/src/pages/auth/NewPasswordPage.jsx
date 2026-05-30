import { useLocation } from "react-router-dom";
import bgImage from "../../assets/bg-ahn.png";
import Logo from "../../components/common/Logo";
import BackButton from "../../components/ui/BackButton";
import NewPasswordForm from "../../components/forms/NewPasswordForm";

const NewPasswordPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token") || location.state?.token || "";
  const loginPath = location.state?.loginPath || "/login-mahasiswa";

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bold-blue via-bold-blue/80 to-bold-blue/40"></div>

      <BackButton to={loginPath} />

      <div className="relative z-10 text-center text-white px-6 items-center">
        <div className="flex flex-col items-center gap-8">
          <Logo
            logoSize="w-100"
            textSize="text-2xl"
          />

          <NewPasswordForm
            token={token}
            loginPath={loginPath}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
