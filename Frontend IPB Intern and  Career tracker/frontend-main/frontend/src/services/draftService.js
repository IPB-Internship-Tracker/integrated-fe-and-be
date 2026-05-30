import { kegiatanService } from "./kegiatanService";

export const draftService = {
  create(kategoriMbkm, data) {
    return kegiatanService.saveDraft(kategoriMbkm, data);
  },

  listMine() {
    return kegiatanService.listDrafts();
  },

  detail(id) {
    return kegiatanService.detailDraft(id);
  },

  update(id, kategoriMbkm, data) {
    return kegiatanService.updateDraft(id, kategoriMbkm, data);
  },

  remove(id) {
    return kegiatanService.removeDraft(id);
  },

  publish(id) {
    return kegiatanService.publishDraft(id);
  },
};
