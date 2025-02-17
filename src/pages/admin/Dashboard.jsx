import React, { useState } from "react";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import SideBar from "../../components/admin/SideBar";

export default function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 focus:outline-none">
              <Bell size={24} />
            </button>
            <div className="relative">
              <button className="flex items-center text-gray-700 focus:outline-none">
                <User size={24} className="mr-2" />
                <span className="text-sm">Admin</span>
                <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
