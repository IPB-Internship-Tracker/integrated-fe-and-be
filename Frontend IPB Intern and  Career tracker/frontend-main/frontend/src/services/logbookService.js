import { apiRequest } from "./api";

const diffMinutes = (start, end) => {
  if (!start || !end) return 60;
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  return Math.max(1, endHour * 60 + endMinute - (startHour * 60 + startMinute));
};

const buildLogbookPayload = (formData, foto) => {
  const enrichedAktivitas = JSON.stringify({
    teks: formData.aktivitas,
    media: formData.media,
    lokasi: formData.lokasi,
    waktuMulai: formData.waktuMulai,
    waktuSelesai: formData.waktuSelesai,
  });

  return {
    aktivitas: enrichedAktivitas,
    durasi: diffMinutes(formData.waktuMulai, formData.waktuSelesai),
    tanggal: formData.tanggal,
    foto,
  };
};

export const logbookService = {
  create(payload) {
    return apiRequest("/logbook/", {
      method: "POST",
      body: payload,
    });
  },

  uploadFoto(lamaranId, file) {
    const body = new FormData();
    body.append("file", file);

    return apiRequest(`/logbook/lamaran/${lamaranId}/upload-foto`, {
      method: "POST",
      body,
    });
  },

  listByLamaran(lamaranId) {
    return apiRequest(`/logbook/lamaran/${lamaranId}`);
  },

  update(id, payload) {
    return apiRequest(`/logbook/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  remove(id) {
    return apiRequest(`/logbook/${id}`, { method: "DELETE" });
  },

  async createFromForm(lamaranId, formData, photoFile) {
    let foto = null;
    if (photoFile) {
      const uploaded = await this.uploadFoto(lamaranId, photoFile);
      foto = uploaded.path;
    }

    return this.create({
      lamaran_id: Number(lamaranId),
      ...buildLogbookPayload(formData, foto),
    });
  },

  async updateFromForm(logbookId, lamaranId, formData, photoFile, currentFoto) {
    let foto = currentFoto || null;
    if (photoFile) {
      const uploaded = await this.uploadFoto(lamaranId, photoFile);
      foto = uploaded.path;
    }

    return this.update(logbookId, {
      ...buildLogbookPayload(formData, foto),
    });
  },
};
