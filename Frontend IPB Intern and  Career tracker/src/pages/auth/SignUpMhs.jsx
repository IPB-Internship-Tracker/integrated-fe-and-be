import bgImage from "../../assets/bg-illust.png";
import Logo from "../../components/common/Logo";
import BackButton from "../../components/ui/BackButton";
import SignUpForm from "../../components/forms/SignUpForm";
import { authService } from "../../services/authService";

const SignUpMhs = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
        
        <BackButton />

      {/* Content */}
        <div className="relative z-10 text-center text-white px-6 items-center">

            <div className="flex flex-col items-center gap-8 py-20">
                <Logo 
                    logoSize="w-20 md:w-30"
                    textSize="text-xl md:text-2xl"
                />
                <SignUpForm
                    role="Mahasiswa IPB"
                    fields={[
                        { name: "fullName", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama lengkap" },
                        { name: "nim", label: "NIM", type: "text", placeholder: "Masukkan NIM" },
                        { name: "faculty", label: "Fakultas",
                          type: "select",
                          placeholder: "Pilih fakultas",
                          options: [
                            "Fakultas Pertanian",
                            "Sekolah Kedokteran Hewan dan Biomedis",
                            "Fakultas Perikanan dan Ilmu Kelautan",
                            "Fakultas Peternakan",
                            "Fakultas Kehunanan dan Lingkungan",
                            "Fakultas Teknik dan Teknologi",
                            "Fakultas Matematika dan Ilmu Pengetahuan Alam",
                            "Fakulas Ekonomi dan Manajemen",
                            "Fakultas Ekologi Manusia",
                            "Sekolah Vokasi",
                            "Sekolah Bisnis",
                            "Fakultas Kedokteran dan Gizi",
                            "Sekolah Sains Data, Matematika, dan Informatika",
                          ]
                        }, 
                        { name: "studyProgram", label: "Program Studi", type: "text", placeholder: "Masukkan program studi" },
                        { name: "email", label: "Email", type: "email", placeholder: "Gunakan email IPB" },
                        { name: "password", label: "Password", type: "password", placeholder: "Masukkan password" },
                        { name: "confirmPassword", label: "Konfirmasi Password", type: "password", placeholder: "Konfirmasi password" },
                    ]}
                    className="text-light-blue"
                    loginPath="/login-mahasiswa"
                    onSubmit={authService.registerMahasiswa}
                />
            </div>
        </div>
     
      </div>
      
  );
};

export default SignUpMhs;
