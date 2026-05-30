import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CircleAlert } from "lucide-react";
import Button from "../../components/ui/Button";

const normalizeRole = (role) => {
  const value = String(role || "").toLowerCase();

  if (value === "mahasiswa ipb") return "mahasiswa";
  if (value === "mahasiswa") return "mahasiswa";
  if (value === "mitra") return "mitra";

  return value;
};

const getDashboardPath = (role) => {
  if (role === "mahasiswa") {
    return "/dashboard-mahasiswa";
  }

  if (role === "mitra") {
    return "/dashboard-mitra";
  }

  return "/select-role";
};

const UnauthorizedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const reason = location.state?.reason;
  const role = normalizeRole(
    location.state?.role ||
      localStorage.getItem("role")
  );

  const backPath =
    reason === "wrong-role"
      ? getDashboardPath(role)
      : "/select-role";

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-6
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          p-8
          text-center
          max-w-md
          w-full
        "
      >
        <CircleAlert
          size={80}
          className="
            mx-auto
            text-red-500
            mb-4
          "
        />

        <h1
          className="
            text-2xl
            font-bold
            text-bold-blue
            mb-3
          "
        >
          Akses Ditolak
        </h1>

        <p
          className="
            text-gray-600
            mb-6
          "
        >
          Anda tidak diizinkan untuk mengakses halaman ini.
        </p>

        <Button
          label="Kembali"
          onClick={() =>
            navigate(backPath)
          }
        />
      </div>
    </div>
  );
};

export default UnauthorizedPage;
