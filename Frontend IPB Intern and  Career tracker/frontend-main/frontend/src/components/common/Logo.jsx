import logo from "../../assets/logo-icon.png";

const Logo = ({
  logoSize = "w-40 md:w-150",
  textSize = "text-3xl",
}) => {

  return (
    <div className="flex flex-col items-center">

      {/* LOGO */}
      <img
        src={logo}
        alt="ICON Logo"
        className={`${logoSize} mb-2`}
      />

      {/* TEXT */}
      <p className={`${textSize} font-medium text-white text-center`}>
        <span className="text-yellow-400 font-bold">I</span>PB{" "}
        <span className="text-yellow-400 font-bold">C</span>areer{" "}
        <span className="text-yellow-400 font-bold">O</span>pportunity{" "}
        <span className="text-yellow-400 font-bold">N</span>etwork
      </p>

    </div>
  );
};

export default Logo;