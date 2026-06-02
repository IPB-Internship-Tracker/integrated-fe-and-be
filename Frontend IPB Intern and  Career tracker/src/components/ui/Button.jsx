import { useNavigate } from "react-router-dom";

const Button = ({
  label = "",
  to,
  state,
  replace = false,
  onClick,
  type = "button",

  icon,
  iconPosition = "left",

  className = "",
  iconOnly = false,
}) => {

  const navigate = useNavigate();

  const handleClick = (e) => {

    if (onClick) {
      onClick(e);
    }

    if (to) {
      navigate(to, { state, replace });
    }
  };

  return (

    <button
      type={type}
      onClick={handleClick}
      className={`
        transition
        duration-300
        font-bold
        cursor-pointer

        ${
          iconOnly
            ? `
              p-2
              rounded-xl
              flex
              items-center
              justify-center
            `
            : `
              bg-kuning-tua
              hover:bg-bold-blue
              hover:text-white

              text-bold-blue
              text-md

              px-10
              py-2

              rounded-full
            `
        }

        ${
          icon
            ? `
              flex
              items-center
              justify-center
              gap-2
            `
            : ""
        }

        ${className}
      `}
    >

      {/* LEFT ICON */}
      {icon && iconPosition === "left" && icon}

      {/* LABEL */}
      {!iconOnly && label}

      {/* RIGHT ICON */}
      {icon && iconPosition === "right" && icon}

    </button>
  );
};

export default Button;
