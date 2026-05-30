import { apiRequest } from "./api";
import { mapMahasiswaProfileToPayload } from "./adapters";

export const mahasiswaService = {
  getMe() {
    return apiRequest("/mahasiswa/me");
  },

  updateMe(formData) {
    return apiRequest("/mahasiswa/me", {
      method: "PATCH",
      body: mapMahasiswaProfileToPayload(formData),
    });
  },

  uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append("file", file);

    return apiRequest("/mahasiswa/me/upload-foto", {
      method: "POST",
      body: formData,
    });
  },

  list() {
    return apiRequest("/mahasiswa/");
  },

  detail(id) {
    return apiRequest(`/mahasiswa/${id}`);
  },
};
