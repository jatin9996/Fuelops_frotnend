"use client";

import { useState, useEffect, useRef } from "react";

import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import user from "@/assets/user.jpg";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const admin = {
    name: "John Doe",
    email: "admin@example.com",
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Clear the cookie manually
    document.cookie =
      "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login
    window.location.href = "/login"; // or use router.push("/login")
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <div className="w-8 h-8 rounded-full  flex items-center justify-center gap-10 ">
          <Image src={user} alt="user" className="w-8 h-8 rounded-full" />
        </div>
        <span className="text-[16px] font-semibold flex items-center gap-1">
          {admin.name} {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 text-sm">
          <div className="p-4 border-b border-gray-200 ">
            <p className="font-semibold text-gray-600 ">{admin.name}</p>
            <p className="text-gray-600">{admin.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-100 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
