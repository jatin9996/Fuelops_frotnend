"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBook,
  FaHandHoldingUsd,
  FaList,
  FaPlus,
  FaPrint,
  FaTruck,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import {
  MdAccountTree,
  MdOutlineCategory,
  MdOutlineCurrencyRupee,
} from "react-icons/md";
import { TiPrinter } from "react-icons/ti";

import { Salesman } from "@/app/dashboard/SalesmanMaster/types/Salesman";
import SalesmanList from "./SalesmanList";
import SalesmanForm from "./SalesmanForm";

const menuItems = [
  {
    label: "Account Link",
    icon: <MdAccountTree />,
    href: "/dashboard/Vmaster",
  },
  {
    label: "Ledger Master",
    icon: <FaDroplet />,
    href: "/dashboard/lubricant-sale",
  },
  {
    label: "Account Head",
    icon: <FaHandHoldingUsd />,
    href: "/dashboard/sale-bill",
  },
  {
    label: "Account Sub Group",
    icon: <TiPrinter />,
    href: "/dashboard/voucher-entry",
  },
  {
    label: "Narration Master",
    icon: <FaBook />,
    href: "/dashboard/day-book",
  },
  {
    label: "Currency Master",
    icon: <MdOutlineCurrencyRupee />,
    href: "/dashboard/purchase-invoice",
  },
  {
    label: "Category Master",
    icon: <MdOutlineCategory />,
    href: "/dashboard/purchase-invoice",
  },
  {
    label: "Vehicle Master",
    icon: <FaTruck />,
    href: "/dashboard/VehicleMaster",
  },
  {
    label: "Salesman Master",
    icon: <FaPrint />,
    href: "/dashboard/SalesmanMaster",
  },
];

const Page = () => {
  const [showList, setShowList] = useState(false);
  const [salesmans, setSalesmans] = useState<Salesman[]>([]);
  const [editSalesman, setEditSalesman] = useState<Salesman | null>(null);

  const handleSave = (salesman: Salesman) => {
    if (salesman.id) {
      // Edit case
      setSalesmans((prev) =>
        prev.map((v) => (v.id === salesman.id ? salesman : v))
      );
    } else {
      // New entry
      const newSalesman = { ...salesman, id: Date.now().toString() };
      setSalesmans((prev) => [...prev, newSalesman]);
    }
    setEditSalesman(null);
  };

  const handleEdit = (salesman: Salesman) => {
    setEditSalesman(salesman);
    setShowList(false);
  };

  const handleDelete = (id: string) => {
    setSalesmans((prev) => prev.filter((v) => v.id !== id));
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
              Salesman Master List
            </h1>
          ) : (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              Salesman Master
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
          <SalesmanList
            salesmans={salesmans}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <SalesmanForm onSave={handleSave} editSalesman={editSalesman} />
        )}
      </div>
    </div>
  );
};

export default Page;
