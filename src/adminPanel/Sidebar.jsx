import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/admin/dashboard", // Add path for each menu item
    },
    {
      id: "driverDashboard",
      icon: <Users size={20} />,
      label: "Drivers",
      path: "/admin/driverDashboard", // Add path for each menu item
    },
    {
      id: "products",
      icon: <ShoppingCart size={20} />,
      label: "Products",
      path: "/products", // Add path for each menu item
    },
    {
      id: "analytics",
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "/analytics", // Add path for each menu item
    },
    {
      id: "settings",
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings", // Add path for each menu item
    },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0a2351] text-white flex flex-col">
      {/* Brand/Logo Section */}
      <div className="p-5 border-b border-[#1a3663] flex items-center">
        <div className="h-8 w-8 rounded-md bg-yellow-500 flex items-center justify-center font-bold text-[#0a2351]">
          A
        </div>
        <span className="ml-3 font-semibold text-lg">AdminPanel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path} // Use the path for navigation
                className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                  activeItem === item.id
                    ? "bg-[#1a3663] text-yellow-400"
                    : "text-gray-300 hover:bg-[#1a3663] hover:text-yellow-300"
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {activeItem === item.id && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-yellow-400"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-[#1a3663]">
        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <Bell
              size={20}
              className="text-gray-300 hover:text-yellow-400 cursor-pointer"
            />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-medium text-[#0a2351]">
              3
            </span>
          </div>
          <button className="text-gray-300 hover:text-yellow-400">
            <LogOut size={20} />
          </button>
        </div>
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User profile"
            className="h-10 w-10 rounded-full border-2 border-yellow-500"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;