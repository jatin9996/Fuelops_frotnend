"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const mockData = [
  "Dashboard",
  "Transactions",
  "Vault Management",
  "Token Bridge",
  "Settings",
  "Support",
  "Profile",
  "Notifications",
  "Analytics",
  "Reports",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter results based on input
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const results = mockData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
    setShowDropdown(true);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative hidden md:block w-64" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-3 pr-10 py-2 w-full border border-gray-300 rounded-lg outline-none text-sm text-gray-700 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <Search />
      </button>

      {/* Dropdown results */}
      {showDropdown && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-700">
          {filtered.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-white">
              {filtered.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setQuery(item);
                    setShowDropdown(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
