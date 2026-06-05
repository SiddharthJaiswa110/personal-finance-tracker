import {
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="flex bg-[#F5F5F5] min-h-screen">

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"}
          transition-transform duration-300
          lg:translate-x-0 lg:static
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />

      )}

      {/* Main Content */}
      <div className="flex-1">

        <Navbar toggleSidebar={() => setSidebarOpen(true)} />

        <div className="p-4 md:p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;