// src/components/DataTable.jsx
import React, { useState, useMemo } from "react";

export  function DataTable({ columns, rows, pageSize = 5, searchable = true }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter rows by search
  const filteredRows = useMemo(() => {
    if (!searchQuery) return rows;
    return rows.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, rows, columns]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden text-gray-700 bg-white shadow-md rounded-lg">
      {/* ---- Header with Search ---- */}
      <div className="w-full flex justify-between items-center mb-3 mt-1 px-3 py-2">
        <h3 className="text-lg font-semibold text-slate-800">Data Table</h3>
        {searchable && (
          <div className="w-full max-w-sm min-w-[200px] relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
              className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            />
            <span className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center text-slate-600">
              🔍
            </span>
          </div>
        )}
      </div>

      {/* ---- Table ---- */}
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  {col.label}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <td key={col.accessor} className="p-4 py-5">
                  <p
                    className={`text-sm ${
                      col.bold ? "font-semibold text-slate-800" : "text-slate-500"
                    }`}
                  >
                    {row[col.accessor]}
                  </p>
                </td>
              ))}
            </tr>
          ))}

          {paginatedRows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-slate-400">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ---- Pagination ---- */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500">
          Showing <b>{(currentPage - 1) * pageSize + 1}</b>-
          <b>{Math.min(currentPage * pageSize, filteredRows.length)}</b> of{" "}
          {filteredRows.length}
        </div>
        <div className="flex space-x-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 min-w-9 text-sm text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`px-3 py-1 min-w-9 text-sm border rounded transition ${
                currentPage === n
                  ? "text-white bg-slate-800 border-slate-800"
                  : "text-slate-500 bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 min-w-9 text-sm text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default DataTable;