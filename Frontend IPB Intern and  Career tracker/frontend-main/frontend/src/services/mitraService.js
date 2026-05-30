import { apiRequest } from "./api";
import { mapMitraProfileToPayload } from "./adapters";

export const mitraService = {
  getMe() {
    return apiRequest("/mitra/me");
  },

  updateMe(formData) {
    return apiRequest("/mitra/me", {
      method: "PATCH",
      body: mapMitraProfileToPayload(formData),
    });
  },

  uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append("file", file);

    return apiRequest("/mitra/me/upload-foto", {
      method: "POST",
      body: formData,
    });
  },

  list() {
    return apiRequest("/mitra/");
  },

  detail(id) {
    return apiRequest(`/mitra/${id}`);
  },
};
