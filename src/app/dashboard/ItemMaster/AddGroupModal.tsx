import { X } from "lucide-react";
import React, { useState } from "react";

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (newItemGroup: string) => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isOpen,
  onClose,
  onAddGroup,
}) => {
  const [form, setForm] = useState({
    itemType: "HSD/MS",
    itemGroup: "",
    effectiveFrom: "",
    sgst: "0.00",
    cgst: "0.00",
    igst: "0.00",
    ugst: "0.00",
    licenceFee: "0.00",
    dealerCommission: "0.00",
    cess: "0.00",
    cst: "0.00",
    tax: "0.00",
    surcharge: "0.00",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    if (form.itemGroup.trim() !== "") {
      onAddGroup(form.itemGroup);
      setForm({
        itemType: "HSD/MS",
        itemGroup: "",
        effectiveFrom: "",
        sgst: "0.00",
        cgst: "0.00",
        igst: "0.00",
        ugst: "0.00",
        licenceFee: "0.00",
        dealerCommission: "0.00",
        cess: "0.00",
        cst: "0.00",
        tax: "0.00",
        surcharge: "0.00",
      });
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-200 rounded-lg shadow-xl w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 bg-gray-400  rounded-t-lg">
          <h2 className="text-lg font-bold text-white">Add Group</h2>
          <button
            onClick={onClose}
            className="text-white font-bold text-xl cursor-pointer"
          >
            <X />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 p-4">
          {/* Item Type (Select) */}
          <div className="flex flex-col relative group">
            <label
              className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
            >
              Item Type
            </label>
            <select
              name="itemType"
              value={form.itemType}
              onChange={handleChange}
              className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
            >
              <option value="HSD/MS">HSD/MS</option>
              <option value="Others">Others</option>
              <option value="SKO">SKO</option>
            </select>
          </div>
          {/* Item Group */}
          <div className="flex flex-col relative group">
            <label
              className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
            >
              Item Group
            </label>
            <input
              type="text"
              name="itemGroup"
              value={form.itemGroup}
              onChange={handleChange}
              className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
            />
          </div>
          {/* Effective From */}
          <div className="flex flex-col relative group">
            <label
              className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
            >
              Effective From
            </label>
            <input
              type="date"
              name="effectiveFrom"
              value={form.effectiveFrom}
              onChange={handleChange}
              className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
            />
          </div>

          {[
            { label: "SGST", name: "sgst" },
            { label: "CGST", name: "cgst" },
            { label: "IGST", name: "igst" },
            { label: "UGST", name: "ugst" },
            { label: "Licence Fee", name: "licenceFee" },
            { label: "Dealer Commission", name: "dealerCommission" },
            { label: "Cess", name: "cess" },
            { label: "CST", name: "cst" },
            { label: "Tax", name: "tax" },
            { label: "Surcharge", name: "surcharge" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col relative group">
              <label
                className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
              >
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4 gap-3 p-4">
          <button
            className="bg-[#1e697f] text-white rounded px-4 py-1 cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white rounded px-4 py-1 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
