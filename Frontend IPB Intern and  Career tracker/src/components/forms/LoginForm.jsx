import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormField from "./FormField";
import daunIpb from "../../assets/daun-ipb.png";
import Button from "../ui/Button";
import PopUpNotif from "../ui/PopUpNotif";
import { CircleAlert } from "lucide-react";
import { authService } from "../../services/authService";

const normalizeRole = (value) =>
  String(value || "").toLowerCase();

const getExpectedRole = (role) => {
  if (role === "Mahasiswa IPB") return "mahasiswa";
  if (role === "Mitra") return "mitra";
  return "";
};

const getLoginPathForRole = (role) => {
  if (role === "mahasiswa") return "/login-mahasiswa";
  if (role === "mitra") return "/login-mitra";
  return "/select-role";
};

const getRoleLabel = (role) => {
  if (role === "mahasiswa") return "Mahasiswa IPB";
  if (role === "mitra") return "Mitra";
  return "User";
};

const getLoginLabel = (role) => {
  if (role === "mahasiswa") return "Login Mahasiswa";
  if (role === "mitra") return "Login Mitra";
  return "Login";
};

const LoginForm = ({
  role = "User",
  signUpPath = "/sign-up",
  dashboardPath = "/",
  emailPlaceholder = "Masukkan email",
  loginPath,
}) => {

  const [formData, setFormData] = useState({
  email: "",
  password: "",
});
  
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] =
    useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] =
    useState(false);
  const [openRolePopup, setOpenRolePopup] =
    useState(false);
  const [roleMessage, setRoleMessage] =
    useState("");
  const [redirectPath, setRedirectPath] =
    useState("");

  const navigate = useNavigate();
  const validateForm = () => {
  let newErrors = {};

  // EMAIL
  if (!formData.email) {
    newErrors.email = "Email wajib diisi.";
  }

  // PASSWORD
  if (!formData.password) {
    newErrors.password = "Password wajib diisi.";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password minimal 8 karakter.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      setIsSubmitting(true);
      const auth = await authService.login(formData);
      const expectedRole = getExpectedRole(role);
      const actualRole = normalizeRole(auth?.role);

      if (
        expectedRole &&
        actualRole &&
        actualRole !== expectedRole
      ) {
        authService.logout();
        const targetPath =
          getLoginPathForRole(actualRole);

        setRoleMessage(
          `Akun ini terdaftar sebagai ${getRoleLabel(actualRole)}. Silakan gunakan halaman ${getLoginLabel(actualRole)}.`
        );
        setRedirectPath(targetPath);
        setOpenRolePopup(true);
        return;
      }

      navigate(dashboardPath);
    } catch (error) {
      const message =
        error.message ||
        "Email atau password yang Anda masukkan salah.";

      setLoginError(message);
      setOpenLoginPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  }
};

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  setErrors((prev) => ({
    ...prev,
    [e.target.name]: "",
  }));
  setLoginError("");
};

  return (
    <div>

      {/* Card */}
      <div
        className="
          relative
          z-10
          bg-white
          rounded-2xl
          w-full
          md:w-128
          overflow-hidden
          shadow-2xl
          px-6
          md:px-10
          py-6
          md:py-10
        "
      >

      {/* Ornament */}
      <div
        className="
          absolute
          right-[-100px]
          bottom-[-50px]
          opacity-45
          pointer-events-none
          z-0
        "
      >
        <img
          src={daunIpb}
          alt="ornament"
          className="w-[400px]"
        />
      </div>

        {/* Title */}
        <h1 className="relative z-10 text-center text-bold-blue text-xl font-semibold">
          Masuk Sebagai
        </h1>
        <h1 className="relative z-10 text-center text-bold-blue text-2xl font-bold mb-6 md:mb-10">
          {role}
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col gap-2 md:gap-5"
        >

          {/* EMAIL */}
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={emailPlaceholder}
          error={errors.email}
        />

          {/* PASSWORD */}
          <div>
            <FormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password Anda"
              error={errors.password}
            />

            <button
              type="button"
              onClick={() =>
                navigate("/forget-password", {
                  state: {
                    loginPath,
                  },
                })
              }
              className="
                mt-2
                block
                text-sm
                text-bold-blue
                hover:underline
              "
            >
              Lupa Password?
            </button>

            {loginError && (
              <p className="mt-2 text-sm text-red-500">
                {loginError}
              </p>
            )}
          </div>

          {/* BUTTON */}
            <Button
            label={isSubmitting ? "Masuk..." : "Masuk"}
            type="submit"
            className="w-[200px] self-center mt-8"
            />

          {/* REGISTER */}
          <div className="text-center text-sm">
            <span className="text-black">
              Belum punya akun?
            </span>

            <button
              type="button"
              onClick={() => navigate(signUpPath)}
              className="ml-3 font-bold text-bold-blue underline hover:opacity-80"
            >
              Buat Akun
            </button>

          </div>

        </form>
      </div>

      <PopUpNotif
        isOpen={openLoginPopup}
        onClose={() =>
          setOpenLoginPopup(false)
        }
        icon={
          <CircleAlert
            size={90}
            className="text-yellow-500"
          />
        }
        title="Login Gagal"
        description={loginError}
      >
        <Button
          label="Coba Lagi"
          onClick={() =>
            setOpenLoginPopup(false)
          }
        />
      </PopUpNotif>

      <PopUpNotif
        isOpen={openRolePopup}
        onClose={() =>
          setOpenRolePopup(false)
        }
        icon={
          <CircleAlert
            size={90}
            className="text-yellow-500"
          />
        }
        title="Akses Ditolak"
        description={roleMessage}
      >
        <Button
          label="Ke Halaman Login"
          onClick={() => {
            setOpenRolePopup(false);
            navigate(redirectPath || "/select-role");
          }}
        />
      </PopUpNotif>
    </div>
  );
};

export default LoginForm;
