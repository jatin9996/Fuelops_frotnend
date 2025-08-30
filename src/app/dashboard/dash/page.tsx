import Link from "next/link";
import React from "react";
import {
  FaBook,
  FaFileInvoice,
  FaGasPump,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { TiPrinter } from "react-icons/ti";
import MonthWisePurchase from "./MonthWisePurchaseReport";
import AvailableStock from "./AvailableStock";
import YearWisePurchase from "./YearWisePurchase";
import OutstandingList from "./OutStandingList";

const menuItems = [
  {
    label: "Meter Reading",
    icon: <FaGasPump />,
    href: "/dashboard/Vmaster",
  },
  {
    label: "Lubricant Sale",
    icon: <FaDroplet />,
    href: "/dashboard/lubricant-sale",
  },
  {
    label: "Sale Bill",
    icon: <FaHandHoldingUsd />,
    href: "/dashboard/sale-bill",
  },
  {
    label: "Voucher Entry",
    icon: <TiPrinter />,
    href: "/dashboard/voucher-entry",
  },
  {
    label: "Day Book",
    icon: <FaBook />,
    href: "/dashboard/day-book",
  },
  {
    label: "Purchase Invoice",
    icon: <FaFileInvoice />,
    href: "/dashboard/purchase-invoice",
  },
];

const Page = () => {
  return (
    <div>
      <div className="flex gap-2 items-center bg-orange-500 py-3 w-full">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-2 px-3 border-r-2 border-gray-500 text-white hover:text-gray-200"
          >
            {item.icon} <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-between p-2 mb-16">
        <div className="w-[49.5%] mt-5 border border-gray-300 shadow-lg rounded-lg p-3">
          <MonthWisePurchase />
        </div>
        <div className="w-[49.5%] mt-5 border border-gray-300 shadow-lg rounded-lg p-3">
          <AvailableStock />
        </div>
        <div className="w-[49.5%] mt-5 border border-gray-300 shadow-lg rounded-lg p-3">
          <YearWisePurchase />
        </div>
        <div className="w-[49.5%] mt-5 border border-gray-300 shadow-lg rounded-lg p-3">
          <OutstandingList />
        </div>
      </div>
    </div>
  );
};

export default Page;
