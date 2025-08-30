import React, { useEffect, useState } from "react";
import { Vehicle } from "@/app/dashboard/VehicleMaster/types/Vehicle";

interface Props {
  onSave: (vehicle: Vehicle) => void;
  editVehicle: Vehicle | null;
}

const formFields = [
  { label: "Vehicle Number", name: "vehicleNumber", type: "text" },
  { label: "Party Name", name: "partyName", type: "text" },
  { label: "Owner Name", name: "ownerName", type: "text" },
  { label: "Mobile Number", name: "mobileNumber", type: "text" },
  {
    label: "Item Name",
    name: "itemName",
    type: "select",
    options: ["Item A", "Item B"],
  },
  { label: "Credit Limit", name: "creditLimit", type: "text" },
  { label: "Insurance Date", name: "insuranceDate", type: "date" },
  { label: "Pollution Date", name: "pollutionDate", type: "date" },
  { label: "Contractor Name", name: "contractorName", type: "text" },
  { label: "Contractor No", name: "contractorNo", type: "text" },
  { label: "Creation Date", name: "creationDate", type: "date" },
  {
    label: "Card Expiry Date",
    name: "cardExpiryDate",
    type: "date",
    conditional: "cardDetails",
  },
  {
    label: "Card Number",
    name: "cardNumber",
    type: "text",
    conditional: "cardDetails",
  },
  {
    label: "Customer Name",
    name: "customerName",
    type: "text",
    conditional: "cardDetails",
  },
  { label: "Remark", name: "remark", type: "text" },
  { label: "Loyalty Opening Point", name: "loyaltyOpeningPoint", type: "text" },
];

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
      className="absolute -top-2 left-2 text-xs text-gray-400 px-1 bg-white group-focus-within:bg-green-300 group-focus-within:text-white transition-all duration-200 rounded-md"
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
        className="w-full border border-gray-400 text-gray-600 px-2 py-2 rounded focus:outline-none  disabled:bg-gray-100"
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
        className="w-full border border-gray-400 px-2 py-2 text-gray-600 rounded focus:outline-none  disabled:bg-gray-100"
      />
    )}
  </div>
);

const VehicleForm: React.FC<Props> = ({ onSave, editVehicle }) => {
  const [form, setForm] = useState<Record<string, any>>({
    vehicleNumber: "",
    partyName: "",
    creationDate: new Date().toISOString().split("T")[0],
    status: "Active",
  });

  useEffect(() => {
    if (editVehicle) {
      setForm(editVehicle);
    }
  }, [editVehicle]);

  const [cardDetails, setCardDetails] = useState(false);
  const [sendSMS, setSendSMS] = useState(false);
  const [ownVehicle, setOwnVehicle] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.vehicleNumber || !form.partyName) return;
    onSave(form as Vehicle);
    setForm({
      vehicleNumber: "",
      partyName: "",
      creationDate: new Date().toISOString().split("T")[0],
      status: "Active",
    });
    setCardDetails(false);
    setSendSMS(false);
    setOwnVehicle(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        {formFields.map((field) => {
          if (field.name === "creationDate") {
            return (
              <div
                key="creationDate-cardToggle"
                className="col-span-2 grid grid-cols-2 gap-4"
              >
                <FormField
                  field={field}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2 pl-10">
                  <span className="text-sm text-gray-700">Card Details</span>
                  <Toggle
                    checked={cardDetails}
                    onChange={() => setCardDetails(!cardDetails)}
                  />
                </div>
              </div>
            );
          }
          const shouldDisable =
            field.conditional === "cardDetails" && !cardDetails;
          return (
            <FormField
              key={field.name}
              field={field}
              value={form[field.name] || ""}
              onChange={handleChange}
              disabled={shouldDisable}
            />
          );
        })}
      </div>

      <div className="flex gap-10 mt-6">
        <div className="flex items-center gap-2">
          <Toggle
            checked={form.status === "Active"}
            onChange={() =>
              setForm({
                ...form,
                status: form.status === "Active" ? "InActive" : "Active",
              })
            }
          />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-2">
          <Toggle checked={sendSMS} onChange={() => setSendSMS(!sendSMS)} />
          <span>Send SMS</span>
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            checked={ownVehicle}
            onChange={() => setOwnVehicle(!ownVehicle)}
          />
          <span>Own Vehicle</span>
        </div>
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
              vehicleNumber: "",
              partyName: "",
              creationDate: new Date().toISOString().split("T")[0],
              status: "Active",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;
