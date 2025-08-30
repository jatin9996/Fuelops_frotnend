"use client";

import { Menu, Megaphone, ChevronRight, Phone } from "lucide-react";
import Image from "next/image";

import fuelops from "@/assets/fuelops.png";
import NotificationDropdown from "./NotificationButton";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <>
      <nav className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 justify-between shadow-sm">
        <div className="flex items-center gap-4">
          {/* Sidebar toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 border border-gray-400 rounded-md cursor-pointer"
          >
            {sidebarOpen ? (
              <Menu className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Company Logo */}
          <Image src={fuelops} alt="Company Logo" className="ms-28 w-14 h-14" />

          {/* Search Bar */}
          <SearchBar />

          {/* Company Name */}
          <span className="text-gray-600 font-semibold text-[24px] hidden sm:inline-block ms-12">
            FuelOps <span className="text-[16px] font-medium">(2025-2026)</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification */}

          <NotificationDropdown />

          {/* Announcement */}
          <button className="p-2 cursor-pointer">
            <Megaphone className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>

          {/* Support */}
          <button className="p-2 cursor-pointer flex items-center gap-2  text-gray-500 hover:text-gray-700">
            <Phone className="w-5 h-5 " />
            <span className="font-semibold">Support</span>
          </button>

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
