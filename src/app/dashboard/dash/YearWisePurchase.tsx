"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Dropdown from "./Dropdown";
import ToggleGraphData from "./ToggleData";
import {
  mockData,
  ReportType,
  FuelType,
  Pump,
} from "@/app/Data/ChartData/yearWisePurchase";

const purchaseSaleOptions = [
  { label: "Purchase", value: "purchase" },
  { label: "Sale", value: "sale" },
];
const itemOptions = [
  { label: "All Items", value: "all" },
  { label: "HSD", value: "hsd" },
  { label: "Petrol", value: "petrol" },
  { label: "Green Diesel", value: "greenDiesel" },
  { label: "Diesel", value: "diesel" },
  { label: "MS 21", value: "ms21" },
  { label: "Ajay Petrol", value: "ajay" },
  { label: "CNG", value: "cng" },
  { label: "VAT Test", value: "vat" },
  { label: "Diesel HSD", value: "dieselhsd" },
];
const pumpOptions = [
  { label: "Pump", value: "pump" },
  { label: "Sodala Pump", value: "sodala" },
  { label: "Test Loc 12", value: "testloc" },
  { label: "Town", value: "town" },
];

const YearWisePurchase: React.FC = () => {
  const [type, setType] = useState("purchase");
  const [item, setItem] = useState("all");
  const [pump, setPump] = useState("pump");
  const [view, setView] = useState<"graph" | "data">("graph");

  const chartData = useMemo(() => {
    const records =
      mockData[type as ReportType]?.[item as FuelType]?.[pump as Pump] || [];

    const groupedByMonth: Record<
      string,
      { month: string; [key: string]: number | string }
    > = {};

    records.forEach((rec) => {
      if (!groupedByMonth[rec.month]) {
        groupedByMonth[rec.month] = { month: rec.month };
      }
      groupedByMonth[rec.month][rec.year] = rec.value;
    });

    return Object.values(groupedByMonth);
  }, [type, item, pump]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-semibold text-gray-700 font-mono">
          Year Wise {type === "purchase" ? "Purchase" : "Sale"} Comparison
        </h2>
        <ToggleGraphData view={view} onChange={setView} />
      </div>
      <div className="flex items-center gap-2 my-4">
        <Dropdown
          options={purchaseSaleOptions}
          value={type}
          onChange={setType}
        />
        <Dropdown options={itemOptions} value={item} onChange={setItem} />
        <Dropdown options={pumpOptions} value={pump} onChange={setPump} />
      </div>
      {view === "graph" ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="2024" fill="#3182ce" name="2024" />
            <Bar dataKey="2025" fill="#f6ad55" name="2025" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-fixed border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Month
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  2024
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  2025
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row) => (
                <tr key={row.month} className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    {row.month}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {row["2024"] ?? 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {row["2025"] ?? 0}
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

export default YearWisePurchase;
