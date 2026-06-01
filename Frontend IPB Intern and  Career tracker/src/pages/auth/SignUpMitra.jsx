import bgImage from "../../assets/bg-ahn.png";
import Logo from "../../components/common/Logo";
import BackButton from "../../components/ui/BackButton";
import SignUpForm from "../../components/forms/SignUpForm";
import { authService } from "../../services/authService";

const SignUpMitra = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bold-blue via-bold-blue/80 to-bold-blue/40"></div>
        
        <BackButton />

      {/* Content */}
        <div className="relative z-10 text-center text-white px-6 items-center">

            <div className="flex flex-col items-center gap-8 py-20">
                <Logo 
                    logoSize="w-80 md:w-100"
                    textSize="text-xl md:text-2xl"
                />
                <SignUpForm
                    role="Mitra"
                    fields={[
                        { name: "instanceName", label: "Nama Instansi", type: "text", placeholder: "Masukkan nama instansi" },
                        { name: "instance", label: "Jenis Instansi",
                          type: "select",
                          placeholder: "Pilih jenis instansi",
                          options: [
                            "Instansi Pemerintah",
                            "Instansi Swasta",
                          ]
                        },    
                        { name: "email", label: "Email Instansi", type: "email", placeholder: "Masukkan email instansi" },
                        { name: "password", label: "Password", type: "password", placeholder: "Masukkan password" },
                        { name: "confirmPassword", label: "Konfirmasi Password", type: "password", placeholder: "Konfirmasi password" },
                    ]}
                    className="text-light-blue"
                    loginPath="/login-mitra"
                    onSubmit={authService.registerMitra}
                />
            </div>
        </div>
     
      </div>
      
  );
};

export default SignUpMitra;
