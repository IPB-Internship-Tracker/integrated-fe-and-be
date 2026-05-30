import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NextButton = ({
  to = "/",
  label = "Selengkapnya",
}) => {

  const navigate = useNavigate();

  return (

      <button
        onClick={() => navigate(to)}
        className="
            flex items-center gap-1
            text-bold-blue
            text-sm
            hover:underline 
            cursor-pointer
        "
      >

        <span>
            {label}
        </span>

        <ArrowRight size={12} />

      </button>
  );
};

export default NextButton;