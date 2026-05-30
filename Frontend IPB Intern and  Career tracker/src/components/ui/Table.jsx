const Table = ({
  columns = [],
  data = [],
}) => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        {/* HEADER */}
        <thead>
          <tr className="bg-kuning-muda text-bold-blue">
            {columns.map((column, index) => (
              <th
                key={index}
                className="
                  px-6
                  py-3
                  text-left
                  text-md
                  font-bold
                  border-y
                  border-kuning-tua">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* BODY */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="
                bg-white
                shadow-sm
                hover:bg-light
                transition">

              {columns.map((column, colIndex) => (

                <td
                  key={colIndex}
                  className="
                    px-6
                    py-4
                    border-t
                    border-y
                    border-light-blue/40
                    text-black
                    text-sm ">

                  {/* CUSTOM RENDER */}
                  {column.render
                    ? column.render(row)
                    : row[column.accessor]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;