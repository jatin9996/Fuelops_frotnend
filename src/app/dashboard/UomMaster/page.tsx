"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaGasPump, FaHandHoldingUsd, FaList, FaPlus } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Uom } from "@/app/dashboard/UomMaster/types/Uom";
import UomList from "./UomList";
import UomMaster from "./UomMaster";

const menuItems = [
  {
    label: "Item Master",
    icon: <FaGasPump />,
    href: "/dashboard/ItemMaster",
  },
  {
    label: "Item Group",
    icon: <FaDroplet />,
    href: "/dashboard/ItemGroup",
  },
  {
    label: "UOM Master",
    icon: <FaHandHoldingUsd />,
    href: "/dashboard/UomMaster",
  },

  {
    label: "Rate Master",
    icon: <MdOutlineCurrencyRupee />,
    href: "/dashboard/RateMaster",
  },
];

const Page = () => {
  const [showList, setShowList] = useState(false);
  const [uoms, setUoms] = useState<Uom[]>([]);
  const [editUom, setEditUom] = useState<Uom | null>(null);

  const handleSave = (uom: Uom) => {
    if (uom.id) {
      // Edit case
      setUoms((prev) => prev.map((v) => (v.id === uom.id ? uom : v)));
    } else {
      // New entry
      const newUom = { ...uom, id: Date.now().toString() };
      setUoms((prev) => [...prev, newUom]);
    }
    setEditUom(null);
  };

  const handleEdit = (uom: Uom) => {
    setEditUom(uom);
    setShowList(false);
  };

  const handleDelete = (id: string) => {
    setUoms((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div>
      <div className="flex gap-1 items-center bg-orange-500 py-3 w-full">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-1 px-[5px] border-r-2 border-gray-500 text-white hover:text-gray-200 text-[14px]"
          >
            {item.icon} <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div
        className={`mx-auto mt-4 mb-16 border border-gray-400 rounded-lg ${
          showList ? "w-[80%]" : "w-1/2"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-2 bg-gray-200 rounded-t-lg">
          {showList ? (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              UOM List
            </h1>
          ) : (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              UOM Master
            </h1>
          )}

          <button
            className="bg-orange-500 text-white px-4 py-1 rounded flex items-center gap-2 cursor-pointer"
            onClick={() => setShowList(!showList)}
          >
            {showList ? (
              <>
                <FaPlus className="text-sm" />
                Add New
              </>
            ) : (
              <>
                <FaList className="text-sm" />
                List
              </>
            )}
          </button>
        </div>
        {showList ? (
          <UomList uoms={uoms} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <UomMaster onSave={handleSave} editUom={editUom} />
        )}
      </div>
    </div>
  );
};

export default Page;
