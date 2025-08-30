export interface Vehicle {
   id?: string;
  vehicleNumber: string;
  partyName: string;
  ownerName?: string;
  mobileNumber?: string;
  itemName?: string;
  creditLimit?: string;
  insuranceDate?: string;
  pollutionDate?: string;
  contractorName?: string;
  contractorNo?: string;
  creationDate: string;
  cardExpiryDate?: string;
  cardNumber?: string;
  customerName?: string;
  remark?: string;
  loyaltyOpeningPoint?: string;
  status: "Active" | "InActive";
}
