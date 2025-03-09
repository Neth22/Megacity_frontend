import React from "react";
import {
  Users,
  ShoppingCart,
  Truck,
  BarChart2,
  Clock,
  Bell,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for metrics
  const metrics = [
    {
      id: 1,
      title: "Total Users",
      value: "1,234",
      icon: <Users size={24} className="text-blue-500" />,
      change: "+12%",
    },
    {
      id: 2,
      title: "Total Drivers",
      value: "456",
      icon: <Truck size={24} className="text-green-500" />,
      change: "+8%",
    },
    {
      id: 3,
      title: "Total Orders",
      value: "789",
      icon: <ShoppingCart size={24} className="text-yellow-500" />,
      change: "+5%",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$12,345",
      icon: <BarChart2 size={24} className="text-purple-500" />,
      change: "+15%",
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      description: "New order placed by John Doe",
      time: "2 mins ago",
    },
    {
      id: 2,
      description: "Driver Jane Smith updated her profile",
      time: "10 mins ago",
    },
    {
      id: 3,
      description: "New user registered: Alice Johnson",
      time: "15 mins ago",
    },
    {
      id: 4,
      description: "Order #1234 delivered successfully",
      time: "30 mins ago",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-sm text-green-500">{metric.change}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">{metric.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-full">
                <Bell size={18} className="text-gray-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
            <Users size={24} className="text-blue-500" />
            <p className="text-lg font-medium">Manage Users</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
            <Truck size={24} className="text-green-500" />
            <p className="text-lg font-medium">Manage Drivers</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
            <ShoppingCart size={24} className="text-yellow-500" />
            <p className="text-lg font-medium">Manage Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;