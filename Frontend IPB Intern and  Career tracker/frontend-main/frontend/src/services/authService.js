import { apiRequest, clearAuthSession, saveAuthSession } from "./api";
import {
  mapRegisterMahasiswaPayload,
  mapRegisterMitraPayload,
} from "./adapters";

export const authService = {
  async login(credentials) {
    const auth = await apiRequest("/auth/login-json", {
      method: "POST",
      body: {
        email: credentials.email,
        password: credentials.password,
      },
      auth: false,
    });
    saveAuthSession(auth);
    return auth;
  },

  registerMahasiswa(formData) {
    return apiRequest("/auth/register/mahasiswa", {
      method: "POST",
      body: mapRegisterMahasiswaPayload(formData),
      auth: false,
    });
  },

  registerMitra(formData) {
    return apiRequest("/auth/register/mitra", {
      method: "POST",
      body: mapRegisterMitraPayload(formData),
      auth: false,
    });
  },

  forgotPassword(email) {
    return apiRequest("/auth/forgot-password", {
      method: "POST",
      body: { email },
      auth: false,
    });
  },

  resetPassword(token, password) {
    return apiRequest("/auth/reset-password", {
      method: "POST",
      body: {
        token,
        password_baru: password,
      },
      auth: false,
    });
  },

  logout() {
    clearAuthSession();
  },
};
