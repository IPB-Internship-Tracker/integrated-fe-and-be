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

export const attachMitraCompanies = async (kegiatans = []) => {
  const mitraCache = new Map();

  return Promise.all(
    kegiatans.map(async (kegiatan) => {
      if (!kegiatan?.mitra_id || hasCompanyName(kegiatan)) {
        return kegiatan;
      }

      if (!mitraCache.has(kegiatan.mitra_id)) {
        mitraCache.set(
          kegiatan.mitra_id,
          mitraService.detail(kegiatan.mitra_id).catch(() => null)
        );
      }

      const mitra = await mitraCache.get(kegiatan.mitra_id);

      if (!mitra) {
        return kegiatan;
      }

      return {
        ...kegiatan,
        nama_instansi: mitra?.nama_instansi || mitra?.user?.nama || "",
        mitra: kegiatan.mitra || mitra,
      };
    })
  );
};
