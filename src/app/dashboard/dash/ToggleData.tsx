import React from "react";
import { AiFillDatabase } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa";

interface ToggleGraphDataProps {
  view: "graph" | "data";
  onChange: (view: "graph" | "data") => void;
}

const ToggleGraphData: React.FC<ToggleGraphDataProps> = ({
  view,
  onChange,
}) => (
  <div className="inline-flex border border-gray-400 rounded overflow-hidden">
    <button
      className={`px-4 py-1 flex items-center gap-2 cursor-pointer ${
        view === "graph" ? "bg-orange-500 text-white" : "bg-white text-gray-700"
      }`}
      onClick={() => onChange("graph")}
    >
      <FaRegChartBar />
      <span>Graph</span>
    </button>
    <button
      className={`px-4 py-1 flex items-center gap-2 cursor-pointer ${
        view === "data" ? "bg-orange-500 text-white" : "bg-white text-gray-700"
      }`}
      onClick={() => onChange("data")}
    >
      <AiFillDatabase />
      <span>Data</span>
    </button>
  </div>
);

export default ToggleGraphData;
