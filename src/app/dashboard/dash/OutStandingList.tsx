"use client";

import React, { useState } from "react";
import ToggleGraphData from "./ToggleData";
import { FiRefreshCcw } from "react-icons/fi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Customer A",
    mobile: "9876543210",
    balance: 12000,
    creditLimit: 20000,
  },
  {
    name: "Customer B",
    mobile: "9876543211",
    balance: 8000,
    creditLimit: 15000,
  },
  {
    name: "Customer C",
    mobile: "9876543212",
    balance: 5000,
    creditLimit: 10000,
  },
  {
    name: "Customer A",
    mobile: "9876543210",
    balance: 12000,
    creditLimit: 20000,
  },
  {
    name: "Customer B",
    mobile: "9876543211",
    balance: 8000,
    creditLimit: 15000,
  },
  {
    name: "Customer C",
    mobile: "9876543212",
    balance: 5000,
    creditLimit: 10000,
  },
  {
    name: "Customer A",
    mobile: "9876543210",
    balance: 12000,
    creditLimit: 20000,
  },
  {
    name: "Customer B",
    mobile: "9876543211",
    balance: 8000,
    creditLimit: 15000,
  },
  {
    name: "Customer C",
    mobile: "9876543212",
    balance: 5000,
    creditLimit: 10000,
  },
];

const OutstandingList: React.FC = () => {
  const [view, setView] = useState<"graph" | "data">("data");
  const [showData, setShowData] = useState(false);

  const handleGetData = () => {
    setShowData(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[18px] font-semibold text-gray-700 font-mono">
          List Of Outstanding
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGetData}
            className="px-3 py-1 bg-green-500 text-white rounded flex items-center gap-2 cursor-pointer"
          >
            <span>Get Data</span>
            <FiRefreshCcw />
          </button>
          <ToggleGraphData view={view} onChange={setView} />
        </div>
      </div>

      {showData ? (
        view === "data" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 border border-gray-200">Name</th>
                  <th className="px-2 py-1 border border-gray-200">Mobile</th>
                  <th className="px-2 py-1 border border-gray-200">Balance</th>
                  <th className="px-2 py-1 border border-gray-200">
                    Credit Limit
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="even:bg-gray-50">
                    <td className="px-2 py-1 border border-gray-200">
                      {row.name}
                    </td>
                    <td className="px-2 py-1 border border-gray-200">
                      {row.mobile}
                    </td>
                    <td className="px-2 py-1 border border-gray-200">
                      ₹{row.balance}
                    </td>
                    <td className="px-2 py-1 border border-gray-200">
                      ₹{row.creditLimit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="balance" fill="#4299e1" name="Balance" />
            </BarChart>
          </ResponsiveContainer>
        )
      ) : (
        <div className="text-gray-400 text-sm italic text-center py-6">
          Click Get Data to view outstanding list.
        </div>
      )}
    </div>
  );
};

export default OutstandingList;
