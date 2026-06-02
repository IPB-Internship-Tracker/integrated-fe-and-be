import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({
  fallbackTo = "/",
  label = "Kembali",
  color = "text-white",
  position = "absolute top-10 left-10",
  className = "",
  onClick,
}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (location.state?.backTo) {
      navigate(location.state.backTo, { replace: true });
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo);
  };

  return (

    <div
      className={`
        ${position}
        z-[9999]
      `}
    >

      <button
        onClick={handleClick}
        className={`
          flex
          items-center
          gap-2
          text-md
          font-medium
          hover:underline
          transition
          cursor-pointer

          ${color}
          ${className}
        `}
      >

        <ArrowLeft
          size={20}
          className={color}
        />

        {label}

      </button>

    </div>
  );
};

export default BackButton;
