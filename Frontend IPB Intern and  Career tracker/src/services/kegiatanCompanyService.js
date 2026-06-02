import { mitraService } from "./mitraService";

const hasCompanyName = (item) =>
  Boolean(
    item?.nama_perusahaan ||
      item?.nama_instansi ||
      item?.mitra?.nama_instansi ||
      item?.mitra?.nama_perusahaan ||
      item?.mitra?.user?.nama ||
      item?.user?.nama
  );

export const attachMitraCompany = async (kegiatan) => {
  if (!kegiatan?.mitra_id || hasCompanyName(kegiatan)) {
    return kegiatan;
  }

  try {
    const mitra = await mitraService.detail(kegiatan.mitra_id);

    return {
      ...kegiatan,
      nama_instansi: mitra?.nama_instansi || mitra?.user?.nama || "",
      mitra: kegiatan.mitra || mitra,
    };
  } catch {
    return kegiatan;
  }
};
