"use client";
import React, { useState } from "react";
import { Group } from "@/app/dashboard/ItemGroup/types/Group";

import { GrFormAdd } from "react-icons/gr";

interface LineItem {
  effectiveDate: string;
  stateName: string;
  sgst?: string;
  cgst?: string;
  igst?: string;
  ugst?: string;
  licenseFee?: string;
  licenseType?: string;
  dealerCommission?: string;
  cess?: string;
  cessType?: string;
  cst?: string;
  tax?: string;
  taxType?: string;
  surcharge?: string;
  surchargeType?: string;
}

interface Props {
  onSave: (item: Group) => void;
  editGroup: Group | null;
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const GroupMaintenance: React.FC<Props> = ({ onSave, editGroup }) => {
  const [form, setForm] = useState<Partial<Group>>(
    editGroup || { groupType: "HSD/MS" }
  );
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      effectiveDate: "24-06-2025",
      stateName: "",
    },
  ]);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLineItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [name]: value };
    setLineItems(updated);
  };

  const handleSave = () => {
    onSave?.({ ...form }); // save the Group data
    console.log("Line Items:", lineItems);
    handleReset();
  };

  const handleReset = () => {
    setForm({ groupType: "HSD/MS" });
    setLineItems([
      {
        effectiveDate: "24-06-2025",
        stateName: "",
      },
    ]);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Group Type and Group Name */}
      <div className="flex items-center gap-3">
        <div className="relative group w-[20%]">
          <label
            className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
          >
            Group Type
          </label>
          <select
            className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
            name="groupType"
            value={form.groupType || ""}
            onChange={handleFieldChange}
          >
            <option value="HSD/MS">HSD/MS</option>
            <option value="Others">Others</option>
            <option value="SKO">SKO</option>
          </select>
        </div>
        <div className="relative group w-[20%]">
          <label
            className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white rounded-md
                 group-focus-within:bg-green-300 group-focus-within:text-white"
          >
            Group Name
          </label>
          <input
            className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
            name="groupName"
            value={form.groupName || ""}
            onChange={handleFieldChange}
            placeholder="Enter Group Name"
          />
        </div>
      </div>

      {/* Dynamic Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-max border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-1 py-2">
                Effective Date
              </th>
              <th className="border border-gray-200 p-2">State Name</th>
              <th className="border border-gray-200 p-2">SGST</th>
              <th className="border border-gray-200 p-2">CGST</th>
              <th className="border border-gray-200 p-2">IGST</th>
              <th className="border border-gray-200 p-2">UTGST</th>
              <th className="border border-gray-200 p-2">License Fee</th>
              <th className="border border-gray-200 p-2">LicenseFee Type</th>
              <th className="border border-gray-200 p-2">Dealer Comm.</th>
              <th className="border border-gray-200 p-2">Cess</th>
              <th className="border border-gray-200 p-2">Cess. Type</th>
              <th className="border border-gray-200 p-2">CST</th>
              <th className="border border-gray-200 p-2">Tax</th>
              <th className="border border-gray-200 p-2">Tax Type</th>
              <th className="border border-gray-200 p-2">Surcharge</th>
              <th className="border border-gray-200 p-2">Sur. Type</th>
              <th className="border border-gray-200 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={index}>
                {[
                  "effectiveDate",
                  "stateName",
                  "sgst",
                  "cgst",
                  "igst",
                  "ugst",
                  "licenseFee",
                  "licenseType",
                  "dealerCommission",
                  "cess",
                  "cessType",
                  "cst",
                  "tax",
                  "taxType",
                  "surcharge",
                  "surchargeType",
                ].map((field) =>
                  field === "effectiveDate" ? (
                    <td className="border border-gray-200 p-2" key={field}>
                      <input
                        type="date"
                        name={field}
                        value={(item as any)[field] || ""}
                        onChange={(e) => handleLineItemChange(index, e)}
                        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none"
                      />
                    </td>
                  ) : field === "stateName" ? (
                    <td className="border border-gray-200 p-2" key={field}>
                      <select
                        name={field}
                        value={(item as any)[field] || ""}
                        onChange={(e) => handleLineItemChange(index, e)}
                        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none"
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </td>
                  ) : [
                      "licenseType",
                      "cessType",
                      "taxType",
                      "surchargeType",
                    ].includes(field) ? (
                    <td className="border border-gray-200 p-2" key={field}>
                      <select
                        name={field}
                        value={(item as any)[field] || ""}
                        onChange={(e) => handleLineItemChange(index, e)}
                        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="IN %">IN %</option>
                      </select>
                    </td>
                  ) : (
                    <td className="border border-gray-200 p-2" key={field}>
                      <input
                        name={field}
                        value={(item as any)[field] || "0.00"}
                        onChange={(e) => handleLineItemChange(index, e)}
                        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none"
                      />
                    </td>
                  )
                )}
                <td className="border border-gray-200 p-2 text-center">
                  <button
                    onClick={handleSave}
                    className="text-green-600 font-bold cursor-pointer"
                  >
                    <GrFormAdd className="text-3xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GroupMaintenance;
