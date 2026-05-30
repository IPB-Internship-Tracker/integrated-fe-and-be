import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({
  to = "/",
  label = "Kembali",
  color = "text-white",
  position = "absolute top-10 left-10",
  className = "",
  onClick,
}) => {

  const navigate = useNavigate();

  const handleClick = () => {

    // kalau ada onClick
    if (onClick) {
      onClick();
    }

    // kalau tidak ada onClick
    else if (to) {
      navigate(to);
    }
  };

  return (

    <div className={position}>

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