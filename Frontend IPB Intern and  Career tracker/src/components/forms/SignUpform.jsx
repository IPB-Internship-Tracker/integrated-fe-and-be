import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormField from "./FormField";
import Button from "../ui/Button";
import daunIpb from "../../assets/daun-ipb.png";
import { showAlert } from "../../services/alertService";

const SignUpForm = ({
  role = "User",
  fields = [],
  loginPath = "/login",
  onSubmit,
}) => {

  const navigate = useNavigate();

  const initialFormData = {};

  fields.forEach((field) => {
    initialFormData[field.name] = "";
  });

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));

  };

  const validateForm = () => {

    let newErrors = {};

    fields.forEach((field) => {

      const value = formData[field.name]?.trim();

      // REQUIRED FIELD
      if (!value) {
        newErrors[field.name] =
          `${field.label} wajib diisi.`;

        return;
      }

      // EMAIL VALIDATION
      if (field.type === "email") {

        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          newErrors[field.name] =
            "Format email tidak valid.";
        }
      }

      // NIM VALIDATION
      if (field.name === "nim") {

        if (value.length < 11) {
          newErrors[field.name] =
            "NIM minimal 11 karakter.";
        }
      }

      // FACULTY VALIDATION
      if (
        (field.name === "faculty" ||
          field.name === "fakultas") &&
        field.options?.length &&
        !field.options.includes(value)
      ) {
        newErrors[field.name] =
          "Fakultas yang dipilih tidak valid.";
      }

      // PASSWORD VALIDATION
      if (field.name === "password") {

        if (value.length < 8) {
          newErrors[field.name] =
            "Password minimal 8 karakter.";
        }
      }

      // CONFIRM PASSWORD
      if (field.name === "confirmPassword") {

        if (value !== formData.password) {
          newErrors[field.name] =
            "Konfirmasi password tidak cocok.";
        }
      }

    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validateForm()) {

      try {
        setIsSubmitting(true);
        if (onSubmit) {
          await onSubmit(formData);
        }
        navigate(loginPath);
      } catch (error) {
        const message =
          error.message || "Registrasi gagal.";
        const lowerMessage =
          message.toLowerCase();

        if (lowerMessage.includes("nim")) {
          setErrors((prev) => ({
            ...prev,
            nim: message,
          }));
        } else if (
          lowerMessage.includes("fakultas") ||
          lowerMessage.includes("faculty")
        ) {
          setErrors((prev) => ({
            ...prev,
            faculty: message,
          }));
        } else if (lowerMessage.includes("email")) {
          setErrors((prev) => ({
            ...prev,
            email: message,
          }));
        } else {
          showAlert(message);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const middleIndex = Math.ceil(fields.length / 2);
  const leftFields = fields.slice(0, middleIndex);
  const rightFields = fields.slice(middleIndex);

  return (

    <div className="relative z-10 bg-white rounded-2xl w-4xl overflow-hidden shadow-2xl px-10 py-10">

      {/* Ornament */}
      <div className="absolute right-[-100px] bottom-[-50px] opacity-45 pointer-events-none">
        <img
          src={daunIpb}
          alt="ornament"
          className="w-[500px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-center text-bold-blue text-2xl font-bold mb-10">
        Buat Akun {role}
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10"
      >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {leftFields.map((field, index) => (

            <FormField
              key={index}

              label={field.label}
              type={field.type}
              placeholder={field.placeholder}

              name={field.name}

              value={formData[field.name]}
              onChange={handleChange}

              options={field.options}

              error={errors[field.name]}
            />
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {rightFields.map((field, index) => (

            <FormField
              key={index}

              label={field.label}
              type={field.type}
              placeholder={field.placeholder}

              name={field.name}

              value={formData[field.name]}
              onChange={handleChange}

              options={field.options}

              error={errors[field.name]}
            />

          ))}
        </div>
      </div>

        {/* BUTTON */}
        <div className="mt-10">

          <Button
            label={isSubmitting ? "Daftar..." : "Daftar"}
            type="submit"
            className="w-auto md:w-[200px] self-center"
          />

        </div>

        {/* LOGIN */}
        <div className="text-center text-sm mt-5">

          <span className="text-black">
            Sudah punya akun?
          </span>

          <button
            type="button"
            onClick={() => navigate(loginPath)}
            className="ml-2 font-bold text-bold-blue underline"
          >
            Masuk
          </button>

        </div>

      </form>
    </div>
  );
};

export default SignUpForm;
