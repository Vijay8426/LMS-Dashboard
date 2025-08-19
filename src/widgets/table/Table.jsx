import React from "react";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const Table = ({ columns, data }) => {
  return (
    <section className="bg-white dark:bg-dark py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                {/* Table Header */}
                <thead className="text-center bg-primary">
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} className={TdStyle.ThStyle}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => {
                        const isEven = colIndex % 2 === 0; // Alternate styling
                        return (
                          <td
                            key={colIndex}
                            className={isEven ? TdStyle.TdStyle : TdStyle.TdStyle2}
                          >
                            {typeof cell === "string" || typeof cell === "number" ? (
                              cell
                            ) : (
                              cell /* In case of JSX like buttons */
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
