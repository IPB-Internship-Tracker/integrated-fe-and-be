const DashboardFooter = ({ role }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-indigo-100
        bg-white
        px-8
        py-4
        text-sm
        text-gray-500
      "
    >
      <div
        className="
          flex
          flex-col
          gap-1
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <p>
          &copy; {currentYear} ICON - IPB Career Opportunity Network
        </p>

        <p className="font-medium text-bold-blue">
          Dashboard {role}
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
