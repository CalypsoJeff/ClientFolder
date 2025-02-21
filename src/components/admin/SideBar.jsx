import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ActivityIcon,
  Briefcase,
  LayoutList,
  Calendar,
  ShoppingCartIcon,
  FileText,
  X,
} from "lucide-react";

// Sidebar Menu Items
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "User List", path: "/admin/userlist" },
  { icon: ActivityIcon, label: "Fitness", path: "/admin/fitness" },
  { icon: Briefcase, label: "Competitions", path: "/admin/competitions" },
  { icon: LayoutList, label: "Riders", path: "/admin/riders" },
  { icon: Calendar, label: "Category", path: "/admin/category" },
  { icon: ShoppingCartIcon, label: "Products", path: "/admin/products" },
  { icon: FileText, label: "Trekking", path: "/admin/trekking" },
  { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
];

export default function SideBar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-6 bg-indigo-600 text-white">
        <span className="text-2xl font-semibold">Admin Panel</span>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
