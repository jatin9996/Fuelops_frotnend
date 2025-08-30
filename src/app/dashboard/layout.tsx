// import Navbar from "../components/Navbar/navbar";
// import Sidebar from "../components/Sidebar/Sidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex h-screen">
//       <Sidebar isOpen={false} />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="p-4 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Navbar from "../components/Navbar/navbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Navbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main content with Sidebar and page content */}
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
