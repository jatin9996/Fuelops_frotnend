"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Dropdown from "./Dropdown";
import ToggleGraphData from "./ToggleData";

// Dropdown options
const pumpOptions = [
  { label: "Pump", value: "pump" },
  { label: "Sodala Pump", value: "sodala" },
  { label: "Test Loc 12", value: "testloc" },
  { label: "Town", value: "town" },
];

// Mock stock data for each pump
const stockByPump: Record<
  string,
  { petrol: number; diesel: number; hsd: number; ms21: number }
> = {
  pump: {
    petrol: 148803.56,
    diesel: 27990,
    hsd: 35201.91,
    ms21: 10000,
  },
  sodala: {
    petrol: 125800.56,
    diesel: 22990,
    hsd: 27201.91,
    ms21: 1000,
  },
  testloc: {
    petrol: 100000,
    diesel: 20000,
    hsd: 25000,
    ms21: 15000,
  },
  town: {
    petrol: 80000,
    diesel: 15000,
    hsd: 18000,
    ms21: 12000,
  },
};

const COLORS = ["#f6ad55", "#ecc94b", "#e53e3e", "#3182ce"];

const AvailableStock: React.FC = () => {
  const [pump, setPump] = useState("sodala");
  const [view, setView] = useState<"graph" | "data">("graph");

  const stockData = stockByPump[pump] || stockByPump["sodala"];

  const chartData = [
    { name: "Petrol", value: stockData.petrol },
    { name: "MS 21", value: stockData.ms21 },
    { name: "HSD", value: stockData.hsd },
    { name: "Diesel", value: stockData.diesel },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-semibold text-gray-700 font-mono">
          Available Stock
        </h2>
        <ToggleGraphData view={view} onChange={setView} />
      </div>

      <div className="flex items-center gap-2 my-4">
        <Dropdown options={pumpOptions} value={pump} onChange={setPump} />
      </div>

      {view === "graph" ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-fixed border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/2 px-4 py-2 text-left border border-gray-200">
                  Product
                </th>
                <th className="w-1/2 px-4 py-2 text-left border border-gray-200">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="w-1/2 px-4 py-2 border border-gray-200">
                    {item.name}
                  </td>
                  <td className="w-1/2 px-4 py-2 border border-gray-200">
                    {item.value.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AvailableStock;
