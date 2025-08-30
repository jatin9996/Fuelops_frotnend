// app/components/sidebar/menuItems.ts
import {
  ArrowRightLeft,
  Asterisk,
  Boxes,
  ChartBarStacked,
  ChevronRight,
  Lightbulb,
  NotebookPen,
  Truck,
  ChartColumn,
  Calendar,
  Globe,
  HelpCircle,
  Calculator,
  BookOpen,
  ListChecks,
  Banknote,
} from "lucide-react";
import {
  MdDashboard,
  MdPrivacyTip,
  MdStickyNote2,
} from "react-icons/md";
import {
  FaLandmark,
  FaRupeeSign,
  FaUsers,
  FaCogs,
  FaGasPump,
  FaCreditCard,
  FaShoppingCart,
  FaRulerVertical,
  FaSitemap,
  FaCalculator
} from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { HiPercentBadge } from "react-icons/hi2";
import { GrCurrency } from "react-icons/gr";

export type MenuItem = {
  title: string;
  path?: string; 
  icon?: React.ElementType;
  submenu?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    path:"/dashboard/dash",
    
  },
  {
    title: "Pump",
    icon: FaLandmark,
    submenu: [
      {
        title: "Master",
        icon: Asterisk,
        submenu: [
          { title: "Vehicle Master", icon: ChevronRight,path:"/dashboard/VehicleMaster" },

          { title: "Salesman Master", icon: ChevronRight,path:"/dashboard/SalesmanMaster" },

          {
            title: "Items",
            icon: Boxes,
            submenu: [

              { title: "Item Master", icon: ChevronRight,path:"/dashboard/ItemMaster"  },
              { title: "Item Group", icon: ChevronRight,path:"/dashboard/ItemGroup" },
              { title: "UOM Master", icon: ChevronRight,path:"/dashboard/UomMaster"  },

              { title: "Rate Master", icon: ChevronRight },
            ],
          },
          {
            title: "Area/Location",
            icon: Globe,
            submenu: [
              { title: "Area Head Master", icon: ChevronRight },
              { title: "Branch Master Master", icon: ChevronRight },
              { title: "Location Master Master", icon: ChevronRight },
            ],
          },
          {
            title: "Tank",
            icon: Truck,
            submenu: [
              { title: "Lorry Master", icon: ChevronRight },
              { title: "Tank Maintenance", icon: ChevronRight },
            ],
          },
          {
            title: "Dispensing",
            icon: FaGasPump,
            submenu: [
              { title: "Dispensing Unit", icon: ChevronRight },
              { title: "Nozzle Master", icon: ChevronRight },
              { title: "Dispensing Unit Type", icon: ChevronRight },
            ],
          },
          { title: "Loyalty Scheme", icon: ChevronRight },
        ],
      },
      {
        title: "Entry",
        icon: NotebookPen,
        submenu: [
          {
            title: "Sale",
            icon: FaCreditCard,
            submenu: [
              { title: "Meter Reading", icon: ChevronRight },
              { title: "Lube Sales", icon: ChevronRight },
              { title: "Credit Sale  ", icon: ChevronRight },
              { title: "Sale Bill [Lube-GST]", icon: ChevronRight },
              { title: "D2D Sales", icon: ChevronRight },
              { title: "Daily Receipt", icon: ChevronRight },
              { title: "Item Loss", icon: ChevronRight },
              { title: "Bill Receipt ", icon: ChevronRight },
            ],
          },
          {
            title: "Purchase",
            icon: FaShoppingCart,
            submenu: [
              { title: "Purchase Bill", icon: ChevronRight },
              { title: "Purchase Bill [HSD/MS]", icon: ChevronRight },
              { title: "Purchase Return", icon: ChevronRight },
              { title: "Lubricant Purchase", icon: ChevronRight },
            ],
          },
          {
            title: "Dip",
            icon: FaRulerVertical,
            submenu: [
              { title: "Daily Dip", icon: ChevronRight },
              { title: "Dip Master", icon: ChevronRight },
            ],
          },
        ],
      },
      {
        title: "Transfer",
        icon: ArrowRightLeft,
        submenu: [
          { title: "Material Transfer", icon: ChevronRight },
          { title: "Stock Assignment", icon: ChevronRight },
          { title: "Stock Adjustment", icon: ChevronRight },
          { title: "Tank To Bowser Transfer", icon: ChevronRight },
        ],
      },
      {
        title: "Tanker",
        icon: Truck,
        submenu: [
          { title: "Tanker Maintenance", icon: ChevronRight },
          { title: "Station Maintenance", icon: ChevronRight },
          { title: "Tanker Movement", icon: ChevronRight },
        ],
      },
      {
        title: "Report(s)",
        icon: ChartBarStacked,
        submenu: [
          {
            title: "Sale",
            icon: FaSitemap,
            submenu: [
              { title: "Bill Register", icon: ChevronRight },
              { title: "Indent Approval", icon: ChevronRight },
              { title: "Bowser Transaction Report", icon: ChevronRight },
              { title: "Sale Bill Loyalty Report", icon: ChevronRight },
              { title: "Lost Customer Report", icon: ChevronRight },
            ],
          },
          {
            title: "Stock",
            icon: Boxes,
            submenu: [
              { title: "Stock Report(s)", icon: ChevronRight },
              { title: "DSR Sales(s) Report", icon: ChevronRight },
              { title: "Rate Difference Report", icon: ChevronRight },
            ],
          },
          {
            title: "Day Book",
            icon: MdStickyNote2,
            submenu: [
              { title: "Detail Sale Report", icon: ChevronRight },
              { title: "Day Book", icon: ChevronRight },
              { title: "Day Book New", icon: ChevronRight },
              { title: "Day Book Summary", icon: ChevronRight },
              { title: "DayBook Summary New", icon: ChevronRight },
            ],
          },
          {
            title: "Analytical",
            icon: Lightbulb,
            submenu: [
              { title: "Fast/Slow Moving Items Report", icon: ChevronRight },
              { title: "Month Wise Stock Report", icon: ChevronRight },
              { title: "Tanker Movement Report", icon: ChevronRight },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Accounts",
    icon: FaRupeeSign,
    submenu:[{title:"Master",icon: Asterisk,submenu: [
              { title: "Account Link", icon: ChevronRight },
              { title: "Ledger Master", icon: ChevronRight },
              { title: "Account Head", icon: ChevronRight },
              { title: "Account Sub Group", icon: ChevronRight },
              { title: "Narration Master", icon: ChevronRight },
              { title: "Currency Master", icon: ChevronRight },
              { title: "Category Master", icon: ChevronRight },
              { title: "Discount", icon: HiPercentBadge,submenu:[{title:"Commision Slab",icon: ChevronRight},{title:"Discount Slab",icon: ChevronRight}]},
            ],},{title:"Entry",icon: NotebookPen,submenu:[{title:"Bank Reconciliation",icon:ChevronRight},{title:"Voucher Entry",icon:ChevronRight}]},{title:"Report(s)",icon: ChartBarStacked,submenu:[{title:"Account Book",icon:Calculator,submenu: [
              { title: "Ledger Report - Account", icon: ChevronRight },
              { title: "Account(s) Report", icon: ChevronRight },
              { title: "Trial Balance", icon: ChevronRight },
              { title: "Party Wise Ledger Report", icon: ChevronRight },
              { title: "Account Summary Report", icon: ChevronRight },
            ],},{title:"Final Book",icon:BookOpen, submenu: [
              { title: "Trading Account", icon: ChevronRight },
              { title: "Profit & Loss", icon: ChevronRight },
              { title: "Balance Sheet", icon: ChevronRight },
            ],}]}]
    
  },
  {
    title: "HR",
    icon: FaUsers,
    submenu: [{ title: "Master",icon: Asterisk,submenu: [
              { title: "Employee Master", icon: ChevronRight },
              { title: "Designation Master", icon: ChevronRight },
              { title: "Misc. Master", icon: ChevronRight },
              { title: "Investment Head Master", icon: ChevronRight },
            ],}],
  },
  {
    title: "Reports",
    icon: ChartColumn,
    submenu:[{title:"Cash Payment Report",icon: ChevronRight},]
  },
  {
    title: "Utility",
    icon: FaCogs,
    submenu: [
              { title: "Check List", icon: ListChecks,submenu:[{title:"Account Posting Checklist",icon: ChevronRight},{title:"Sale/Purchase Posting",icon: ChevronRight},{title:"DayBook CheckList",icon: ChevronRight},{title:"Voucher Entry Checklist",icon: ChevronRight},{title:"Freeze Transaction(s)",icon: ChevronRight}] },
              { title: "Excel Upload", icon: ListChecks ,submenu:[{title:"Excel Upload",icon: ChevronRight }]},
              { title: "Document Master", icon: ChevronRight },
              { title: "Document Upload", icon: ChevronRight },
              { title: "User Rights", icon: ChevronRight },
              { title: "User Preference", icon: ChevronRight },
              { title: "Change Password", icon: ChevronRight },
              { title: "Company Master", icon: ChevronRight },
              { title: "Schedule Reminder", icon: ChevronRight },
              { title: "Opening Ledger", icon: ChevronRight },
              { title: "Opening Stock", icon: ChevronRight },
              { title: "Balance Transfer", icon: ChevronRight },
               { title: "Sales Violation Report", icon: ChevronRight },
            ]
   
  },
  {
    title: "Ragister",
    icon: IoBook,
    submenu:[{title:"Account Ragister",icon:FaCalculator,submenu:[{title:"Cash Payment Ragister",icon:ChevronRight},{title:"Voucher Ragister",icon:ChevronRight},{title:"Debtor Ragister",icon:ChevronRight},{title:"Purchase Ragister",icon:ChevronRight}]},{title:"GST Ragister",icon:GrCurrency,submenu:[{title:"GST Invoice Wise Report",icon:ChevronRight},{title:"GST Summary Report",icon:ChevronRight},{title:"GST HSN Wise Report",icon:ChevronRight},{title:"GST B2B-B2C Report",icon:ChevronRight},{title:"GST 3B Report",icon:ChevronRight},{title:"GSTR1",icon:ChevronRight}]},{title:"VAT Ragister",icon:Banknote,submenu:[{title:"VAT-7",icon:ChevronRight},{title:"VAT-8",icon:ChevronRight}]}]
  },
  {
    title: "Snapshot Reports",
    icon: ChartColumn,
    submenu: [{ title: "GST Purchase Summmary Report",icon:ChevronRight }, { title: "GST Sale Summary Report",icon:ChevronRight },{title:"Margin Wise P&L Report",icon:ChevronRight}],
  },
  {
    title: "Audit Trail",
    icon: Calendar,
    submenu:[{title:"Audit Trail Report",icon:ChevronRight}]
  },
  {
    title: "Activity Log",
    icon: Globe,
    submenu:[{title:"User Activity Log",icon:ChevronRight},{title:"Freezed Activity Log",icon:ChevronRight}]
  },
  {
    title: "About FuelOps",
    icon: FaGasPump,
  },
  {
    title: "Help",
    icon: HelpCircle,
     submenu:[{title:"Submit Ticket",icon:ChevronRight},{title:"Watch Videos",icon:ChevronRight},{title:"Tips & Tricks",icon:ChevronRight},{title:"Learn More",icon:ChevronRight}]
  },
  {
    title: "Privecy Policy",
    icon: MdPrivacyTip,
    submenu:[{title:"Privecy Policy",icon:ChevronRight}]
  },
  {
    title: "What's New",
    icon: VscLightbulbSparkle,
    
  },
  {
    title: "Support",
    icon: BiSupport,
      
  },
];
