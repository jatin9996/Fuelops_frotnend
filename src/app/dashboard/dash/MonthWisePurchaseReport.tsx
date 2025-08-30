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
} from "@/app/Data/ChartData/MonthWisePurchase";

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

const MonthWisePurchase: React.FC = () => {
  const [type, setType] = useState("purchase");
  const [item, setItem] = useState("all");
  const [pump, setPump] = useState("pump");
  const [view, setView] = useState<"graph" | "data">("graph");

  // Get filtered data
  const chartData = useMemo(() => {
    const records =
      mockData[type as ReportType]?.[item as FuelType]?.[pump as Pump] || [];
    return records.map(
      (d): { month: string; [key: string]: number | string } => ({
        month: d.month,
        [type]: d.value,
      })
    );
  }, [type, item, pump]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[18px] font-semibold text-gray-700 font-mono">
          Month Wise {type === "purchase" ? "Purchase" : "Sale"} Report
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
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={type}
              fill={type === "purchase" ? "#3182ce" : "#f6ad55"}
              name={type.charAt(0).toUpperCase() + type.slice(1)}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-fixed border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/2 px-4 py-2 text-left border border-gray-200">
                  Month
                </th>
                <th className="w-1/2 px-4 py-2 text-left border border-gray-200">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row) => (
                <tr key={row.month} className="even:bg-gray-50">
                  <td className="w-1/2 px-4 py-2 border border-gray-200">
                    {row.month}
                  </td>
                  <td className="w-1/2 px-4 py-2 border border-gray-200">
                    {row[type as "purchase" | "sale"]}
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

export default MonthWisePurchase;
