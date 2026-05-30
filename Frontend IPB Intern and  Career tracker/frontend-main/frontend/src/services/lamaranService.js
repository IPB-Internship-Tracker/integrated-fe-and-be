import { apiRequest } from "./api";
import { lamaranStatusApi } from "./adapters";

export const lamaranService = {
  uploadBerkas(mbkmId, dokumen, file) {
    const body = new FormData();
    body.append("dokumen", dokumen);
    body.append("file", file);

    return apiRequest(`/lamaran/${mbkmId}/upload-berkas`, {
      method: "POST",
      body,
    });
  },

  create(payload) {
    return apiRequest("/lamaran/", {
      method: "POST",
      body: payload,
    });
  },

  async applyWithFiles(mbkmId, filesByDokumen) {
    const berkasPendaftaran = {};
    const entries = Object.entries(filesByDokumen).filter(([, file]) => file);

    for (const [dokumen, file] of entries) {
      const uploaded = await this.uploadBerkas(mbkmId, dokumen, file);
      berkasPendaftaran[dokumen] = uploaded.path;
    }

    return this.create({
      mbkm_id: Number(mbkmId),
      berkas_pendaftaran: berkasPendaftaran,
    });
  },

  listMine(params = {}) {
    return apiRequest("/lamaran/saya", { query: params });
  },

  async listMineWithDetails(params = {}) {
    const lamarans = await this.listMine(params);
    return Promise.all(
      lamarans.map((lamaran) => this.detail(lamaran.lamaran_id))
    );
  },

  listByKegiatan(mbkmId) {
    return apiRequest(`/lamaran/kegiatan/${mbkmId}`);
  },

  detail(id) {
    return apiRequest(`/lamaran/${id}`);
  },

  updateStatus(id, status) {
    return apiRequest(`/lamaran/${id}/status`, {
      method: "PATCH",
      body: {
        status_pendaftaran: lamaranStatusApi(status),
      },
    });
  },
};
