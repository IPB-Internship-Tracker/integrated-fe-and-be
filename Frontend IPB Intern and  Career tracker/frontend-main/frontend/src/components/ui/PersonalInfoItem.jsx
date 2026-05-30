const PersonalInfoItem = ({
  label,
  value,
}) => {

  return (

    <div>

      <p className="text-bold-blue font-semibold text-md mb-1">
        {label}
      </p>

      <p className="text-md text-black">
        {value}
      </p>

    </div>
  );
};

export default PersonalInfoItem;