"use client";

import React, { useEffect, useState } from "react";
import { Uom } from "@/app/dashboard/UomMaster/types/Uom";

interface Props {
  onSave: (uom: Uom) => void;
  editUom: Uom | null;
}

const formFields = [
  { label: "UOM Name", name: "uomName", type: "text" },
  { label: "UOM Desc", name: "uomDesc", type: "text" },
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

    <input
      id={field.name}
      name={field.name}
      type={field.type}
      value={value || ""}
      onChange={onChange}
      disabled={Boolean(disabled)}
      className="w-full border border-gray-400 px-2 py-2 text-gray-600 rounded focus:outline-none disabled:bg-gray-100"
    />
  </div>
);

const UomMaster: React.FC<Props> = ({ onSave, editUom }) => {
  const [form, setForm] = useState<Record<string, any>>({
    uomName: "",
    uomDesc: "",
  });

  useEffect(() => {
    if (editUom) {
      setForm(editUom);
    }
  }, [editUom]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.uomName || !form.uomDesc) {
      return;
    }
    onSave(form as Uom);
    setForm({
      uomName: "",
      uomDesc: "",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
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
              uomName: "",
              uomDesc: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UomMaster;
