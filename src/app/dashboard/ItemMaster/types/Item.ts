export interface Item {
  id?: string;

  // Left Section
  itemType?: string;
  itemName?: string;
  shortName?: string;
  noOfUOM?: string;
  saleUOM?: string;
  stockUOMTwo?: string;
  noOfUnits1?: string;
  noOfUnits2?: string;
  hsnNumber?: string;
  reorderLevel?: string;
  packingType?: string;
  sgst?: string;
  cgst?: string;
  igst?: string;
  remark?: string;

  // Middle Section
  itemGroup?: string;
  purchaseAccountHeadTaxable?: string;
  purchaseAccountHeadTaxPaid?: string;
  saleAccountHeadTaxable?: string;
  saleAccountHeadTaxPaid?: string;
  sgstTaxAccount?: string;
  cgstTaxAccount?: string;
  igstTaxAccount?: string;
  utgstTaxAccount?: string;
  gstCessAccount?: string;
  taxAccount?: string;
  licenseFeeAccount?: string;
  dealerCommissionAccount?: string;

  // Right Section (Switches + Date)
  inactiveDate?: string;
  underGST?: boolean;
  nonInventory?: boolean;
  ineligibleInput?: boolean;

  // General
  status: "Active" | "InActive";
}

