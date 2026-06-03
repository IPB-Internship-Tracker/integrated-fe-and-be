import { useLocation } from "react-router-dom";
import bgDesktop from "../../assets/bg-illust.png";
import bgMobile from "../../assets/bg-illust-mob.png";
import Logo from "../../components/common/Logo";
import BackButton from "../../components/ui/BackButton";
import NewPasswordForm from "../../components/forms/NewPasswordForm";

const NewPasswordPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token") || location.state?.token || "";
  const loginPath = location.state?.loginPath || "/login-mahasiswa";

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

      <div className="relative z-10 text-center text-white px-6 items-center">
        <div className="flex flex-col items-center gap-8">
                <Logo 
                    logoSize="w-20 md:w-25"
                    textSize="text-xl md:text-2xl"
                />>

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
