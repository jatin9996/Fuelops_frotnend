import React from "react";

type Option = { label: string; value: string };

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  className,
}) => (
  <select
    className={`border border-gray-500 rounded px-2 py-1 text-[16px] text-gray-700 cursor-pointer ${
      className || ""
    }`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
