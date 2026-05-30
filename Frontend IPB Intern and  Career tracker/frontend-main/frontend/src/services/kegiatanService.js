import { apiRequest } from "./api";
import {
  mapMagangFormToPayload,
  mapProgramFormToPayload,
} from "./adapters";

export const kegiatanService = {
  list(params = {}) {
    return apiRequest("/kegiatan/", { query: params });
  },

  detail(id) {
    return apiRequest(`/kegiatan/${id}`);
  },

  createMagang(formData, selectedDocs = []) {
    return apiRequest("/kegiatan/magang", {
      method: "POST",
      body: mapMagangFormToPayload(formData, selectedDocs),
    });
  },

  createLomba(formData) {
    return apiRequest("/kegiatan/lomba", {
      method: "POST",
      body: mapProgramFormToPayload(formData),
    });
  },

  createStudiIndependen(formData) {
    return apiRequest("/kegiatan/studi-independen", {
      method: "POST",
      body: mapProgramFormToPayload(formData),
    });
  },

  updateMagang(id, formData, selectedDocs = []) {
    return apiRequest(`/kegiatan/magang/${id}`, {
      method: "PATCH",
      body: mapMagangFormToPayload(formData, selectedDocs),
    });
  },

  updateLomba(id, formData) {
    return apiRequest(`/kegiatan/lomba/${id}`, {
      method: "PATCH",
      body: mapProgramFormToPayload(formData),
    });
  },

  updateStudiIndependen(id, formData) {
    return apiRequest(`/kegiatan/studi-independen/${id}`, {
      method: "PATCH",
      body: mapProgramFormToPayload(formData),
    });
  },

  uploadImage(file) {
    const body = new FormData();
    body.append("file", file);

    return apiRequest("/kegiatan/upload-gambar", {
      method: "POST",
      body,
    });
  },

  remove(id) {
    return apiRequest(`/kegiatan/${id}`, { method: "DELETE" });
  },

  saveDraft(kategoriMbkm, data) {
    return apiRequest("/kegiatan/draft", {
      method: "POST",
      body: {
        kategori_mbkm: kategoriMbkm,
        data,
      },
    });
  },

  listDrafts() {
    return apiRequest("/kegiatan/draft/saya");
  },

  detailDraft(id) {
    return apiRequest(`/kegiatan/draft/${id}`);
  },

  updateDraft(id, kategoriMbkm, data) {
    return apiRequest(`/kegiatan/draft/${id}`, {
      method: "PATCH",
      body: {
        kategori_mbkm: kategoriMbkm,
        data,
      },
    });
  },

  removeDraft(id) {
    return apiRequest(`/kegiatan/draft/${id}`, { method: "DELETE" });
  },

  publishDraft(id) {
    return apiRequest(`/kegiatan/draft/${id}/publish`, { method: "POST" });
  },
};
