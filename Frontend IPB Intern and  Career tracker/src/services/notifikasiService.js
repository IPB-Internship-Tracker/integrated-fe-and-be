import { apiRequest } from "./api";

export const notifikasiService = {
  list(params = {}) {
    return apiRequest("/notifikasi/saya", { query: params });
  },

  countUnread() {
    return apiRequest("/notifikasi/saya/count-belum-dibaca");
  },

  markRead(id) {
    return apiRequest(`/notifikasi/${id}/baca`, { method: "PATCH" });
  },

  markAllRead() {
    return apiRequest("/notifikasi/saya/baca-semua", { method: "POST" });
  },
};
