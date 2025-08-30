import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Uom } from "@/app/dashboard/UomMaster/types/Uom";

interface UomListProps {
  uoms: Uom[];
  onEdit: (v: Uom) => void;
  onDelete: (id: string) => void;
}

const UomList: React.FC<UomListProps> = ({ uoms, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const entriesPerPage = 10;

  const filteredUoms = uoms.filter((v) =>
    [v.uomName ?? ""].some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // STEP 2: Pagination Logic
  const totalPages = Math.ceil(filteredUoms.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentUoms = filteredUoms.slice(indexOfFirst, indexOfLast);

  // STEP 3: Event handlers
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleFirst = () => setCurrentPage(1);
  const handleLast = () => setCurrentPage(totalPages);

  return (
    <div className="bg-white p-4 rounded-lg w-[100%] shadow-lg">
      {/* SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by UOM Name..."
          className="w-full p-2 border border-gray-400 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {currentUoms.length === 0 ? (
        <div className="p-4 text-gray-500">No matching UOM found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-fixed border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    UOM Name
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    UOM Desc
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUoms.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">
                      {item.uomName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.uomDesc}
                    </td>

                    <td className="px-4 py-2 border border-gray-200 flex items-center justify-between gap-3">
                      <FaEdit
                        className="text-green-500 text-[21px] cursor-pointer"
                        onClick={() => onEdit(item)}
                      />
                      <FaTrash
                        className="text-red-500 text-[21px] cursor-pointer"
                        onClick={() => onDelete(item.id!)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={handleFirst}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 rounded px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 rounded px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`rounded px-3 py-1 cursor-pointer ${
                    currentPage === pageNumber
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 rounded px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
            <button
              onClick={handleLast}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 rounded px-3 py-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UomList;
