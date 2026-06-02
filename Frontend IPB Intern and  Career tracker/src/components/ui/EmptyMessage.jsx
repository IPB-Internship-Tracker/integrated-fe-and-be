const EmptyMessage = ({ message }) => {
  return (
    <div
      className="
        bg-white
        border
        border-light-blue/40
        rounded-xl
        py-8
        px-6
        text-center
        text-light-blue
        italic
      "
    >
      {message}
    </div>
  );
};

export default EmptyMessage;
