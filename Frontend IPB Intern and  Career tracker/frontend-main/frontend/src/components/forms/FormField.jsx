import { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";

const FormField = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error,
  options = [],
  min,
  max,
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword = type === "password";
  const inputType =
    isPassword && showPassword ? "text" : type;

  return (
    <div>

      {/* LABEL */}
      <label className="text-left block text-bold-blue text-md font-bold mb-2">
        {label}
      </label>

      {/* SELECT */}
      {type === "select" ? (
      <>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full
            rounded-lg
            border
            bg-light-blue-2
            px-4
            py-2
            text-md
            text-bold-blue
            focus:outline-none
            focus:ring-1

            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-light-blue focus:ring-light-blue"
            }
          `}
        >

          <option value="">
            {placeholder}
          </option>

          {options.map((option, index) => (

            <option
              key={index}
              value={option}
            >
              {option}
            </option>

          ))}

        </select>

        {error && (
          <p className="text-left font-regular italic text-red-500 text-sm mt-1">
            {error}
          </p>
        )}
      </>

      ) : (

  <>
  
    {/* INPUT */}
    <div className="relative">
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max} 
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-2
          text-md
          bg-light-blue-2
          text-bold-blue
          placeholder:text-light-blue
          placeholder:font-light
          placeholder:italic
          focus:outline-none
          focus:ring-1

          ${isPassword ? "pr-12" : ""}

          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-light-blue focus:ring-light-blue"
          }
        `}
      />

      {isPassword && (
        <button
          type="button"
          aria-label={
            showPassword
              ? "Sembunyikan password"
              : "Tampilkan password"
          }
          onClick={() =>
            setShowPassword((current) => !current)
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-bold-blue
            hover:text-light-blue
            transition
            cursor-pointer
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      )}
    </div>

    {error && (
      <p className="text-left font-regular italic text-red-500 text-sm mt-1">
        {error}
      </p>
    )}

  </>

)}

    </div>
  );
};

export default FormField;
