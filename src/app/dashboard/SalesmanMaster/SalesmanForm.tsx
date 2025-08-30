"use client";

import React, { useEffect, useState } from "react";
import { Salesman } from "@/app/dashboard/SalesmanMaster/types/Salesman";

interface Props {
  onSave: (salesman: Salesman) => void;
  editSalesman: Salesman | null;
}

const formFields = [
  { label: "Salesman Name", name: "salesmanName", type: "text" },
  { label: "Ledger Name", name: "ledgerName", type: "text" },
  {
    label: "Employee",
    name: "employee",
    type: "select",
    options: ["sonu", "monu"],
  },
  { label: "Opening", name: "opening", type: "text" },
];

const FormField = ({
  field,
  value,
  onChange,
  disabled = false,
}: {
  field: any;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
}) => (
  <div className="relative group">
    <label
      htmlFor={field.name}
      className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
    >
      {field.label}
    </label>
    {field.type === "select" ? (
      <select
        id={field.name}
        name={field.name}
        value={value || ""}
        onChange={onChange}
        disabled={Boolean(disabled)}
        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
      >
        <option value="">Select</option>
        {field.options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value || ""}
        onChange={onChange}
        disabled={Boolean(disabled)}
        className="w-full border border-gray-400 px-2 py-2 text-gray-600 rounded focus:outline-none disabled:bg-gray-100"
      />
    )}
  </div>
);

const SalesmanForm: React.FC<Props> = ({ onSave, editSalesman }) => {
  const [form, setForm] = useState<Record<string, any>>({
    salesmanName: "",
    ledgerName: "",
    employee: "",
    opening: "",
  });

  useEffect(() => {
    if (editSalesman) {
      setForm(editSalesman);
    }
  }, [editSalesman]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.salesmanName || !form.ledgerName) {
      return;
    }
    onSave(form as Salesman);
    setForm({
      salesmanName: "",
      ledgerName: "",
      employee: "",
      opening: "",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={form[field.name] || ""}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="bg-teal-700 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() =>
            setForm({
              salesmanName: "",
              ledgerName: "",
              employee: "",
              opening: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SalesmanForm;
