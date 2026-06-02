import { toApiAssetUrl } from "./api";
import fallbackLogo from "../assets/logo-shopee.png";
import fallbackPoster from "../assets/poster.png";

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DOKUMEN_DEFAULT = ["Curriculum Vitae (CV)"];

const BIDANG_MAGANG = new Set([
  "Information Technology",
  "Data & Analytics",
  "Business & Management",
  "Marketing & Communication",
  "Finance & Accounting",
  "Human Resources (HR)",
  "Operations & Logistics",
  "Administration",
  "Design & Creative",
  "Engineering (Non-IT)",
  "Research & Development",
  "Sales & Business Development",
  "Legal",
  "Healthcare / Life Sciences",
]);

export const formatDateID = (dateValue) => {
  if (!dateValue) return "-";
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return `${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatPeriod = (start, end) => {
  if (!start && !end) return "-";
  return `${formatDateID(start)} - ${formatDateID(end)}`;
};

export const categoryLabel = (category) => {
  const map = {
    magang: "Magang",
    lomba: "Kompetisi",
    studi_independen: "Studi Independen",
  };
  return map[category] || category || "-";
};

export const categoryApi = (label) => {
  const map = {
    Magang: "magang",
    Kompetisi: "lomba",
    "Studi Independen": "studi_independen",
    "Program Magang": "magang",
    "Program Kompetisi": "lomba",
    "Program Studi Independen": "studi_independen",
  };
  return map[label] || label || "magang";
};

export const lamaranStatusLabel = (status) => {
  const map = {
    telah_mendaftar: "Telah Mendaftar",
    wawancara: "Wawancara",
    diterima: "Diterima",
    ditolak: "Ditolak",
  };
  return map[status] || status || "Telah Mendaftar";
};

export const lamaranStatusApi = (status) => {
  const map = {
    "Telah Mendaftar": "telah_mendaftar",
    Wawancara: "wawancara",
    Interview: "wawancara",
    Diterima: "diterima",
    Ditolak: "ditolak",
  };
  return map[status] || status;
};

export const getKegiatanDetailRoute = (program, isMitra = false) => {
  if (program.category === "Magang") {
    return isMitra
      ? `/magang-detail-mitra/${program.id}`
      : `/magang-detail/${program.id}`;
  }
  if (program.category === "Kompetisi") {
    return isMitra
      ? `/kompetisi-detail-mitra/${program.id}`
      : `/kompetisi-detail/${program.id}`;
  }
  return isMitra
    ? `/stupen-detail-mitra/${program.id}`
    : `/studi-independen-detail/${program.id}`;
};

export const getDraftEditRoute = (program) => {
  if (program.category === "Magang") return `/edit-magang/${program.id}`;
  if (program.category === "Kompetisi") return `/edit-kompetisi/${program.id}`;
  return `/edit-studi-independen/${program.id}`;
};

const asNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const fileNameOrValue = (value, fallback = "") => {
  if (!value) return fallback;
  if (value instanceof File) return value.name;
  return String(value);
};

const isHttpUrl = (value) => /^https?:\/\//i.test(String(value || "").trim());

const isImageUrl = (value) =>
  /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(String(value || "").trim());

const extractUrl = (value) =>
  String(value || "").match(/https?:\/\/[^\s)]+/i)?.[0] || "";

const stripRegistrationLink = (description) =>
  String(description || "")
    .replace(/\n?\n?Link Pendaftaran:\s*https?:\/\/[^\s)]+/i, "")
    .trim();

export const getRegistrationLink = (item) =>
  [item?.info_lebih_lanjut, extractUrl(item?.deskripsi), item?.poster].find(
    isHttpUrl
  ) || "";

export const matchesSearch = (item, search, fields = []) => {
  const keyword = String(search || "").trim().toLowerCase();
  if (!keyword) return true;

  return fields.some((field) =>
    String(item?.[field] || "")
      .toLowerCase()
      .includes(keyword)
  );
};

const mapProgramPoster = (poster, fallback) => {
  if (isHttpUrl(poster) && !isImageUrl(poster)) {
    return fallback;
  }

  return toApiAssetUrl(poster, fallback);
};

const resolveLocalImage = (value) => {
  if (!value || !String(value).startsWith("local:")) {
    return value || "";
  }

  try {
    return localStorage.getItem(String(value).replace(/^local:/, "")) || "";
  } catch {
    return "";
  }
};

const getCompanyName = (item) =>
  item?.nama_perusahaan ||
  item?.nama_instansi ||
  item?.mitra?.nama_instansi ||
  item?.mitra?.nama_perusahaan ||
  item?.mitra?.user?.nama ||
  "Mitra";

export const mapMahasiswaProfileToUi = (data) => ({
  id: data?.mahasiswa_id || "",
  userId: data?.user_id || data?.user?.user_id || "",
  nama: data?.nama || data?.user?.nama || "",
  email: data?.email || data?.user?.email || "",
  hp: data?.kontak || "",
  nim: data?.nim || "",
  semester: String(data?.semester || ""),
  fakultas: data?.fakultas || "",
  prodi: data?.program_studi || "",
  fotoProfile: toApiAssetUrl(resolveLocalImage(data?.foto_profile)),
});

export const mapMahasiswaProfileToPayload = (data) => ({
  nama: data.nama,
  fakultas: data.fakultas,
  program_studi: data.prodi,
  semester: asNumber(data.semester, 1),
});

export const mapMitraProfileToUi = (data) => ({
  id: data?.mitra_id || "",
  userId: data?.user_id || data?.user?.user_id || "",
  namaInstansi: data?.nama_instansi || "",
  jenisInstansi: data?.jenis_instansi || "",
  emailInstansi: data?.email || data?.user?.email || "",
  alamat: data?.alamat || "",
  kontak: data?.kontak || "",
  fotoProfile: toApiAssetUrl(data?.foto_profile),
});

export const mapMitraProfileToPayload = (data) => ({
  nama_instansi: data.namaInstansi,
  jenis_instansi: data.jenisInstansi,
});

export const mapKegiatanToCard = (item, logo = fallbackLogo) => ({
  id: item.mbkm_id,
  logo: toApiAssetUrl(item.logo_url || item.poster, logo),
  title: item.nama_kegiatan,
  company: getCompanyName(item),
  category: categoryLabel(item.kategori_mbkm),
  location: item.kota_lokasi || item.bidang || "-",
  deadline: formatDateID(item.deadline_pendaftaran),
  period: formatPeriod(item.tanggal_mulai, item.tanggal_selesai),
  status: item.status || "Registrasi Dibuka",
  participantInfo:
    item.kategori_mbkm === "magang" ? "Total Pendaftar: - Orang" : "",
  raw: item,
});

export const mapDraftToCard = (draft, logo = fallbackLogo) => {
  const data = draft.data || {};
  return {
    id: draft.draft_id,
    logo: toApiAssetUrl(data.logo_url || data.poster, logo),
    title: data.nama_kegiatan || data.judulLamaran || "Draft Program",
    company: getCompanyName(data),
    category: categoryLabel(draft.kategori_mbkm),
    program: `Program ${categoryLabel(draft.kategori_mbkm)}`,
    status: "Draft",
    raw: draft,
  };
};

export const mapKegiatanToMagangDetail = (item, logo = fallbackLogo) => ({
  id: item?.mbkm_id,
  title: item?.nama_kegiatan || "",
  company: getCompanyName(item),
  logo: toApiAssetUrl(item?.logo_url, logo),
  role: item?.posisi || "-",
  city: item?.kota_lokasi || "-",
  deadline: formatDateID(item?.deadline_pendaftaran),
  timeline: formatPeriod(item?.tanggal_mulai, item?.tanggal_selesai),
  quota: item?.kuota || 0,
  salary: item?.gaji_perbulan || 0,
  placement: item?.penempatan || "-",
  address: item?.alamat_lengkap || "-",
  phone: item?.narahubung || "-",
  instagram: item?.info_lebih_lanjut || "-",
  description: item?.deskripsi || "-",
  documents: item?.dokumen_dibutuhkan?.length
    ? item.dokumen_dibutuhkan
    : DOKUMEN_DEFAULT,
  status: item?.status || "Registrasi Dibuka",
});

export const mapKegiatanToProgramDetail = (
  item,
  logo = fallbackLogo,
  poster = fallbackPoster
) => ({
  id: item?.mbkm_id,
  title: item?.nama_kegiatan || "",
  company: getCompanyName(item),
  logo: toApiAssetUrl(item?.logo_url, logo),
  poster: mapProgramPoster(item?.poster, poster),
  deadline: formatDateID(item?.deadline_pendaftaran),
  timeline: formatPeriod(item?.tanggal_mulai, item?.tanggal_selesai),
  link: getRegistrationLink(item),
  description: stripRegistrationLink(item?.deskripsi) || "-",
  status: item?.status || "Registrasi Dibuka",
});

export const mapMagangFormToPayload = (formData, selectedDocs = []) => ({
  nama_kegiatan: formData.judulLamaran,
  deskripsi: formData.deskripsi,
  deadline_pendaftaran: formData.tenggat,
  tanggal_mulai: formData.mulai,
  tanggal_selesai: formData.berakhir,
  narahubung: formData.narahubung,
  kuota: asNumber(formData.kuota, 1),
  syarat_ketentuan:
    "Syarat dan ketentuan mengikuti dokumen yang diminta oleh mitra.",
  info_lebih_lanjut: formData.informasi || "-",
  bidang: BIDANG_MAGANG.has(formData.bidang)
    ? formData.bidang
    : "Information Technology",
  posisi: formData.posisi,
  nama_perusahaan: formData.namaPerusahaan,
  logo_url: fileNameOrValue(formData.logo, null),
  penempatan: formData.penempatan || "WFO",
  kota_lokasi: formData.kota,
  alamat_lengkap: formData.alamat,
  tipe_gaji: asNumber(formData.salary, 0) > 0 ? "Paid" : "Unpaid",
  gaji_perbulan: asNumber(formData.salary, 0),
  dokumen_dibutuhkan: selectedDocs.length ? selectedDocs : DOKUMEN_DEFAULT,
});

export const mapProgramFormToPayload = (formData) => ({
  nama_kegiatan: formData.title,
  poster: fileNameOrValue(formData.poster),
  logo_url: fileNameOrValue(formData.logo, null),
  deskripsi: stripRegistrationLink(formData.description),
  info_lebih_lanjut: String(formData.link || "").trim() || "-",
  deadline_pendaftaran: formData.deadline,
  tanggal_mulai: formData.startDate,
  tanggal_selesai: formData.endDate,
  bidang: "Umum",
});

export const mapKegiatanToMagangForm = (item) => ({
  namaPerusahaan: item?.nama_perusahaan || "",
  logo: item?.logo_url || null,
  judulLamaran: item?.nama_kegiatan || "",
  posisi: item?.posisi || "",
  deskripsi: item?.deskripsi || "",
  bidang: item?.bidang || "",
  kuota: String(item?.kuota || ""),
  salary: String(item?.gaji_perbulan || ""),
  penempatan: item?.penempatan || "",
  tenggat: item?.deadline_pendaftaran || "",
  mulai: item?.tanggal_mulai || "",
  berakhir: item?.tanggal_selesai || "",
  kota: item?.kota_lokasi || "",
  alamat: item?.alamat_lengkap || "",
  narahubung: item?.narahubung || "",
  informasi: item?.info_lebih_lanjut || "",
});

export const mapKegiatanToProgramForm = (item) => ({
  logo: item?.logo_url || null,
  poster: item?.poster || null,
  title: item?.nama_kegiatan || "",
  description: stripRegistrationLink(item?.deskripsi),
  link: getRegistrationLink(item),
  deadline: item?.deadline_pendaftaran || "",
  startDate: item?.tanggal_mulai || "",
  endDate: item?.tanggal_selesai || "",
});

export const mapRegisterMahasiswaPayload = (formData) => ({
  nama: formData.fullName,
  nim: formData.nim,
  fakultas: formData.faculty,
  program_studi: formData.studyProgram,
  semester: 1,
  email: formData.email,
  password: formData.password,
});

export const mapRegisterMitraPayload = (formData) => ({
  nama: formData.instanceName,
  nama_instansi: formData.instanceName,
  jenis_instansi: formData.instance,
  alamat: "Belum diisi",
  kontak: "Belum diisi",
  email: formData.email,
  password: formData.password,
});

export const mapLamaranToListItem = (lamaran) => {
  const kegiatan = lamaran.kegiatan || {};
  return {
    id: lamaran.lamaran_id,
    logo: toApiAssetUrl(kegiatan.logo_url || kegiatan.poster, fallbackLogo),
    title: kegiatan.nama_kegiatan || `Lamaran #${lamaran.lamaran_id}`,
    company: getCompanyName(kegiatan),
    category: categoryLabel(kegiatan.kategori_mbkm),
    appliedDate: formatDateID(lamaran.tanggal_daftar),
    updatedDate: formatDateID(lamaran.tanggal_daftar),
    status: lamaranStatusLabel(lamaran.status_pendaftaran),
    raw: lamaran,
  };
};

export const mapLamaranDetailToUi = (data) => ({
  id: data?.lamaran_id,
  mbkmId: data?.mbkm_id,
  status: lamaranStatusLabel(data?.status_pendaftaran),
  programDetail: mapKegiatanToCard(data?.kegiatan || {}, fallbackLogo),
  personalData: {
    name: data?.mahasiswa?.nama || "",
    email: data?.mahasiswa?.email || "",
    nim: data?.mahasiswa?.nim || "",
    faculty: data?.mahasiswa?.fakultas || "",
    phone: data?.mahasiswa?.kontak || "-",
    semester: String(data?.mahasiswa?.semester || ""),
    major: data?.mahasiswa?.program_studi || "",
  },
  documents: Object.entries(data?.berkas_pendaftaran || {}).map(
    ([title, fileUrl]) => ({
      title,
      label: title,
      fileName: fileUrl?.split("/").pop() || title,
      fileUrl: toApiAssetUrl(fileUrl),
    })
  ),
});

export const mapApplicant = (lamaran) => ({
  id: lamaran.lamaran_id,
  applicantName: lamaran.mahasiswa?.nama || "-",
  email: lamaran.mahasiswa?.email || "-",
  applyDate: formatDateID(lamaran.tanggal_daftar),
  status: lamaranStatusLabel(lamaran.status_pendaftaran),
  raw: lamaran,
});

export const mapNotification = (notification) => {
  const message = notification.pesan || "";
  const lowerMessage = message.toLowerCase();
  let status = "Telah Mendaftar";
  if (lowerMessage.includes("wawancara")) status = "Wawancara";
  if (lowerMessage.includes("diterima")) status = "Diterima";
  if (lowerMessage.includes("ditolak")) status = "Ditolak";

  return {
    id: notification.notifikasi_id,
    title: notification.judul,
    message,
    status,
    isRead: notification.status_baca,
    raw: notification,
  };
};

export const mapLogbookToRow = (logbook, index) => {
  const totalMinutes = logbook.durasi || 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const durasiLabel =
    minutes > 0 && hours > 0
      ? `${hours} Jam ${minutes} Menit`
      : minutes > 0
        ? `${minutes} Menit`
        : `${hours} Jam`;

  const fotoUrl = logbook.foto ? toApiAssetUrl(logbook.foto) : null;

  let aktivitasAsli = logbook.aktivitas;
  let media = "-";
  let lokasi = "-";
  let waktuMulai = "-";
  let waktuSelesai = "-";

  try {
    const parsed = JSON.parse(logbook.aktivitas);
    if (parsed && typeof parsed === "object" && parsed.teks !== undefined) {
      aktivitasAsli = parsed.teks || "-";
      media = parsed.media || "-";
      lokasi = parsed.lokasi || "-";
      waktuMulai = parsed.waktuMulai || "-";
      waktuSelesai = parsed.waktuSelesai || "-";
    }
  } catch (e) {
    // If it's not JSON, it means it's the old format where aktivitas is just a string
    console.debug("Aktivitas bukan format JSON, fallback ke format lama:", e.message);
  }

  return {
    id: logbook.logbook_id,
    no: index + 1,
    tanggal: formatDateID(logbook.tanggal),
    waktuMulai: waktuMulai,
    waktuSelesai: waktuSelesai,
    durasi: durasiLabel,
    aktivitas: aktivitasAsli,
    media: media,
    lokasi: lokasi,
    dokumentasi: fotoUrl,
    raw: logbook,
  };
};

export const getProfileImageStorageKey = (data) => {
  if (data?.id) {
    return `mahasiswa_profile_image_${data.id}`;
  }
  if (data?.userId) {
    return `mahasiswa_profile_image_user_${data.userId}`;
  }
  return "mahasiswa_profile_image_me";
};

export const applyStoredProfileImage = (data) => {
  if (!data) return data;
  const storageKey = getProfileImageStorageKey(data);
  try {
    const storedImage = localStorage.getItem(storageKey);
    if (storedImage) {
      return {
        ...data,
        fotoProfile: storedImage,
      };
    }
  } catch {
    return data;
  }
  return data;
};

export const saveProfileImage = (data, imageData) => {
  if (!imageData?.isChanged) {
    return data.fotoProfile;
  }

  if (!imageData.dataUrl) {
    throw new Error("Gambar profil belum selesai diproses. Coba simpan ulang.");
  }

  const storageKey = getProfileImageStorageKey(data);

  try {
    localStorage.setItem(storageKey, imageData.dataUrl);
    // Trigger custom event so TopbarMhs can react to it
    window.dispatchEvent(new Event("profileImageUpdated"));
  } catch {
    throw new Error("Gagal menyimpan foto profil di browser. Coba gunakan gambar yang lebih kecil.");
  }

  return imageData.dataUrl;
};
