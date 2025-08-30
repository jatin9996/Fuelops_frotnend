import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Vehicle } from "@/app/dashboard/VehicleMaster/types/Vehicle";

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (v: Vehicle) => void;
  onDelete: (id: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const entriesPerPage = 10;

  // STEP 1: Filter based on search
  const filteredVehicles = vehicles.filter((v) =>
    [v.vehicleNumber ?? "", v.partyName ?? ""].some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // STEP 2: Pagination Logic
  const totalPages = Math.ceil(filteredVehicles.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirst, indexOfLast);

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
          placeholder="Search by Vehicle No or Party Name..."
          className="w-full p-2 border border-gray-400 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
        />
      </div>

      {currentVehicles.length === 0 ? (
        <div className="p-4 text-gray-500">No matching vehicles found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-fixed border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Vehicle No
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Party Name
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Owner Name
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Mobile Number
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Item Name
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentVehicles.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">
                      {item.vehicleNumber}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.partyName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.ownerName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.mobileNumber}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.itemName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.status}
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

export default VehicleList;
