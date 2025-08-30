"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaGasPump, FaHandHoldingUsd, FaList, FaPlus } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";

import { Group } from "@/app/dashboard/ItemGroup/types/Group";

import GroupMaintenanceList from "./types/GroupMaintenanceList";
import GroupMaintenance from "./GroupMaintenance";

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
  const [groups, setGroups] = useState<Group[]>([]);
  const [editGroup, setEditGroup] = useState<Group | null>(null);

  const handleSave = (group: Group) => {
    if (group.id) {
      // Edit case
      setGroups((prev) => prev.map((v) => (v.id === group.id ? group : v)));
    } else {
      // New entry
      const newGroup = { ...group, id: Date.now().toString() };
      setGroups((prev) => [...prev, newGroup]);
    }
    setEditGroup(null);
  };

  const handleEdit = (group: Group) => {
    setEditGroup(group);
    setShowList(false);
  };

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((v) => v.id !== id));
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
          showList ? "w-[90%]" : "w-[90%]"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-2 bg-gray-200 rounded-t-lg">
          {showList ? (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              Group Maintenance List
            </h1>
          ) : (
            <h1 className="text-[18px] font-mono text-gray-600 font-semibold">
              Group Maintenance
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
          <GroupMaintenanceList
            groups={groups}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <GroupMaintenance onSave={handleSave} editGroup={editGroup} />
        )}
      </div>
    </div>
  );
};

export default Page;
