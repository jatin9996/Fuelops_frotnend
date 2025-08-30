"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Item } from "@/app/dashboard/ItemMaster/types/Item";

interface ItemListProps {
  items: Item[];
  onEdit: (v: Item) => void;
  onDelete: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const entriesPerPage = 10;

  // STEP 1: Filter based on search
  const filteredItems = items.filter((v) =>
    [v.itemType ?? "", v.itemName ?? "", v.itemGroup ?? ""].some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // STEP 2: Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

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
          placeholder="Search by Item Name , Item Type or Item Group..."
          className="w-full p-2 border border-gray-400 text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
        />
      </div>

      {currentItems.length === 0 ? (
        <div className="p-4 text-gray-500">No matching Items found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-fixed border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Item Name
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Item Type
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Group Name
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    HSN Number
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Reorder Level
                  </th>
                  <th className="px-4 py-2 text-left border border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-200">
                      {item.itemName}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.itemType}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.itemGroup}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.hsnNumber}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {item.reorderLevel}
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

export default ItemList;
