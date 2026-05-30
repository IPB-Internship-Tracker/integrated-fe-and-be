import { Navigate } from "react-router-dom";
import { getStoredToken } from "../../services/api";

const normalizeRole = (role) => {
  const value = String(role || "").toLowerCase();

  if (value === "mahasiswa ipb") return "mahasiswa";
  if (value === "mahasiswa") return "mahasiswa";
  if (value === "mitra") return "mitra";

  return value;
};

const ProtectedRoute = ({
  children,
  allowedRole,
}) => {
  const token = getStoredToken();
  const currentRole = normalizeRole(
    localStorage.getItem("role") ||
      sessionStorage.getItem("role")
  );
  const expectedRole = normalizeRole(allowedRole);

  if (!token) {
    return (
      <Navigate
        to="/unauthorized"
        state={{
          reason: "not-logged-in",
        }}
        replace
      />
    );
  }

  if (
    expectedRole &&
    currentRole !== expectedRole
  ) {
    return (
      <Navigate
        to="/unauthorized"
        state={{
          reason: "wrong-role",
          role: currentRole,
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
