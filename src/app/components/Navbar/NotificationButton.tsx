"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const mockNotifications = [
  { id: 1, message: "Transaction completed successfully." },
  { id: 2, message: "Your vault has been updated." },
  { id: 3, message: "New feature launched in the dashboard." },
  { id: 4, message: "System maintenance scheduled for 9 PM." },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setShowAll(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleNotifications = showAll
    ? mockNotifications
    : mockNotifications.slice(0, 2);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 cursor-pointer"
      >
        <Bell className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        {mockNotifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {mockNotifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200 bg-green-100 rounded-t-lg text-[18px] font-semibold text-gray-500 font-mono">
            New Notifications
          </div>

          <ul className="max-h-64 overflow-y-auto cursor-pointer">
            {visibleNotifications.map((notif) => (
              <li
                key={notif.id}
                className="px-4 py-2 text-[14px] text-gray-700  border-b border-gray-100 font-medium"
              >
                {notif.message}
              </li>
            ))}
          </ul>

          {!showAll && mockNotifications.length > 2 && (
            <div
              onClick={() => setShowAll(true)}
              className="p-2 text-center bg-green-300 rounded-b-lg cursor-pointer"
            >
              <button
                onClick={() => setShowAll(true)}
                className="text-[16px] font-semibold text-white cursor-pointer"
              >
                Show All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
