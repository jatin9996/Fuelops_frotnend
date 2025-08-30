"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaDownload,
  FaGasPump,
  FaHandHoldingUsd,
  FaList,
  FaPlus,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";

import { Item } from "@/app/dashboard/ItemMaster/types/Item";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import * as XLSX from "xlsx";

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
  const [items, setItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleDownload = () => {
    if (!items || items.length === 0) {
      alert("No items available for download");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(items);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
    XLSX.writeFile(workbook, "items.xlsx");
  };

  const handleSave = (item: Item) => {
    if (item.id) {
      // Edit case
      setItems((prev) => prev.map((v) => (v.id === item.id ? item : v)));
    } else {
      // New entry
      const newItem = { ...item, id: Date.now().toString() };
      setItems((prev) => [...prev, newItem]);
    }
    setEditItem(null);
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setShowList(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((v) => v.id !== id));
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
          showList ? "w-[80%]" : "w-[90%]"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-2 bg-gray-200 rounded-t-lg">
          {showList ? (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              Item Maintenance List
            </h1>
          ) : (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              Item Maintenance
            </h1>
          )}
          <div className="flex items-center gap-3">
            {showList && (
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
              >
                <FaDownload />
              </button>
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
        </div>
        {showList ? (
          <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <ItemForm onSave={handleSave} editItem={editItem} />
        )}
      </div>
    </div>
  );
};

export default Page;
