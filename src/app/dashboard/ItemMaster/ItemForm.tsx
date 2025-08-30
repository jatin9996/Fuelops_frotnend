"use client";
import React, { useState } from "react";
import { Item } from "@/app/dashboard/ItemMaster/types/Item";
import AddGroupModal from "./AddGroupModal";

interface Props {
  onSave: (item: Item) => void;
  editItem: Item | null;
}

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-10 h-5 rounded-full ${
      checked ? "bg-green-300" : "bg-gray-300"
    } relative transition-colors duration-300 cursor-pointer`}
  >
    <span
      className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
);

const FormField = ({
  field,
  value,
  onChange,
  disabled,
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
        <option value="">Select One</option>
        {(field.options || []).map((opt: string) => (
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
        readOnly={field.readOnly}
        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
      />
    )}
  </div>
);

const ItemForm: React.FC<Props> = ({ onSave, editItem }) => {
  const [form, setForm] = useState<Partial<Item>>(
    editItem || { itemType: "HSD/MS" }
  );
  const [underGST, setUnderGST] = useState(false);
  const [inactiveDate, setInactiveDate] = useState(false);
  const [nonInventory, setNonInventory] = useState(false);
  const [ineligibleInput, setIneligibleInput] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [itemGroups, setItemGroups] = useState(["Group A", "Group B"]);

  const handleAddGroup = (newItemGroup: string) => {
    setItemGroups((prev) => [...prev, newItemGroup]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    onSave?.(form as Item);
    setForm({ itemType: "HSD/MS" });
  };
  const handleReset = () => {
    setForm({});
    setUnderGST(false);
    setInactiveDate(false);
    setNonInventory(false);
    setIneligibleInput(false);
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Header Toggle */}
      <div className="flex items-center justify-start gap-2">
        <span className="text-sm text-gray-700">Under GST</span>
        <Toggle checked={underGST} onChange={() => setUnderGST(!underGST)} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-3">
        {/* Left Section */}
        <div className="space-y-3">
          <FormField
            field={{
              label: "Item Type",
              name: "itemType",
              type: "select",
              options: ["HSD/MS", "Others", "SKO"],
            }}
            value={form.itemType || ""}
            onChange={handleChange}
          />
          <div className="flex items-center gap-2">
            <FormField
              field={{ label: "Item Name", name: "itemName", type: "text" }}
              value={form.itemName || ""}
              onChange={handleChange}
            />
            <FormField
              field={{ label: "Short Name", name: "shortName", type: "text" }}
              value={form.shortName || ""}
              onChange={handleChange}
            />
            <FormField
              field={{ label: "No. Of UOM", name: "noOfUOM", type: "text" }}
              value={form.noOfUOM || ""}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          <FormField
            field={{
              label: "Sale UOM",
              name: "saleUOM",
              type: "select",
              options: ["Unit A", "Unit B"],
            }}
            value={form.saleUOM || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "Stock UOM Two",
              name: "stockUOMTwo",
              type: "select",
              options: ["Unit X", "Unit Y"],
            }}
            value={form.stockUOMTwo || ""}
            onChange={handleChange}
            disabled={true}
          />
          <div className="flex items-center space-x-2">
            <FormField
              field={{
                label: "No. Of Unit(s)",
                name: "noOfUnits1",
                type: "text",
              }}
              value={form.noOfUnits1 || ""}
              onChange={handleChange}
              disabled={true}
            />
            <span className="text-gray-600">Equals</span>
            <FormField
              field={{
                label: "No. Of Unit(s)",
                name: "noOfUnits2",
                type: "text",
              }}
              value={form.noOfUnits2 || ""}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          <FormField
            field={{ label: "HSN Number", name: "hsnNumber", type: "text" }}
            value={form.hsnNumber || ""}
            onChange={handleChange}
          />
          <div className="flex space-x-2">
            <FormField
              field={{
                label: "Reorder Level",
                name: "reorderLevel",
                type: "text",
              }}
              value={form.reorderLevel || ""}
              onChange={handleChange}
            />
            <FormField
              field={{
                label: "Packing Type",
                name: "packingType",
                type: "text",
              }}
              value={form.packingType || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2">
            <FormField
              field={{ label: "SGST %", name: "sgst", type: "text" }}
              value={form.sgst || ""}
              onChange={handleChange}
              disabled={true}
            />
            <FormField
              field={{ label: "CGST %", name: "cgst", type: "text" }}
              value={form.cgst || ""}
              onChange={handleChange}
              disabled={true}
            />
            <FormField
              field={{ label: "IGST %", name: "igst", type: "text" }}
              value={form.igst || ""}
              onChange={handleChange}
              disabled={true}
            />
          </div>
          <FormField
            field={{ label: "Remark", name: "remark", type: "text" }}
            value={form.remark || ""}
            onChange={handleChange}
          />
        </div>

        {/* Middle Section */}
        <div className="space-y-3">
          <FormField
            field={{
              label: "Item Group",
              name: "itemGroup",
              type: "select",
              options: itemGroups,
            }}
            value={(form.itemGroup ?? "") as string}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "Purchase Account Head Taxable",
              name: "purchaseAccountHeadTaxable",
              type: "text",
            }}
            value={form.purchaseAccountHeadTaxable || ""}
            onChange={handleChange}
          />

          <FormField
            field={{
              label: "Sale Account Head Taxable",
              name: "saleAccountHeadTaxable",
              type: "text",
            }}
            value={form.saleAccountHeadTaxable || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "Sale Account Head Tax Paid",
              name: "saleAccountHeadTaxPaid",
              type: "text",
            }}
            value={form.saleAccountHeadTaxPaid || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "SGST Tax Account",
              name: "sgstTaxAccount",
              type: "text",
            }}
            value={form.sgstTaxAccount || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "IGST Tax Account",
              name: "igstTaxAccount",
              type: "text",
            }}
            value={form.igstTaxAccount || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "GST Cess Account",
              name: "gstCessAccount",
              type: "text",
            }}
            value={form.gstCessAccount || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "License Fee Account",
              name: "licenseFeeAccount",
              type: "text",
            }}
            value={form.licenseFeeAccount || ""}
            onChange={handleChange}
          />
        </div>

        {/* Right Section */}
        <div className="space-y-3">
          <button
            className="bg-[#1e697f] text-white px-3 py-2 rounded-lg w-full cursor-pointer"
            onClick={() => setShowAddGroup(true)}
          >
            Add Group
          </button>

          <FormField
            field={{
              label: "Purchase Account Head Tax Paid",
              name: "purchaseAccountHeadTaxPaid",
              type: "text",
            }}
            value={form.purchaseAccountHeadTaxPaid || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "Sale Account Head Tax Paid",
              name: "saleAccountHeadTaxPaid",
              type: "text",
            }}
            value={form.purchaseAccountHeadTaxPaid || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "CGST Tax Account",
              name: "cgstTaxAccount",
              type: "text",
            }}
            value={form.cgstTaxAccount || ""}
            onChange={handleChange}
          />
          <FormField
            field={{
              label: "UTGST Tax Account",
              name: "utgstTaxAccount",
              type: "text",
            }}
            value={form.utgstTaxAccount || ""}
            onChange={handleChange}
          />
          <FormField
            field={{ label: "Tax Account", name: "taxAccount", type: "text" }}
            value={form.taxAccount || ""}
            onChange={handleChange}
          />

          <FormField
            field={{
              label: "Dealer Commission Account",
              name: "dealerCommissionAccount",
              type: "text",
            }}
            value={form.dealerCommissionAccount || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Switches */}
      <div className="flex items-center justify-end space-x-8 mt-4">
        <input
          type="date"
          disabled={!inactiveDate}
          value={form.inactiveDate || ""}
          onChange={(e) => setForm({ ...form, inactiveDate: e.target.value })}
          className="border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none disabled:bg-gray-100"
        />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Inactive Date</span>
          <Toggle
            checked={inactiveDate}
            onChange={() => setInactiveDate(!inactiveDate)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Non Inventory</span>
          <Toggle
            checked={nonInventory}
            onChange={() => setNonInventory(!nonInventory)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Ineligible Input</span>
          <Toggle
            checked={ineligibleInput}
            onChange={() => setIneligibleInput(!ineligibleInput)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="bg-teal-700 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <AddGroupModal
        isOpen={showAddGroup}
        onClose={() => setShowAddGroup(false)}
        onAddGroup={handleAddGroup}
      />
    </div>
  );
};

export default ItemForm;
