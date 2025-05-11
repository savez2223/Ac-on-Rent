import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaExchangeAlt, FaTools, FaStore } from "react-icons/fa";

interface DashboardCard {
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const AdminDashboard: React.FC = () => {
  const dashboardItems: DashboardCard[] = [
    {
      title: "Products",
      path: "/admin/products",
      icon: <FaBox className="h-6 w-6" />,
      description: "Manage product inventory and listings",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Returns",
      path: "/admin/return",
      icon: <FaExchangeAlt className="h-6 w-6" />,
      description: "Handle product returns and refunds",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Maintenance",
      path: "/admin/maintenance",
      icon: <FaTools className="h-6 w-6" />,
      description: "Schedule and track maintenance requests",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Sell Old AC",
      path: "/admin/sell",
      icon: <FaStore className="h-6 w-6" />,
      description: "Manage used AC sales and listings",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your control center</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="transform transition-all duration-200 hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`p-4 ${item.color}`}>
                  <div className="flex justify-center">
                    <div className="p-3 bg-white bg-opacity-30 rounded-full">
                      {item.icon}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 text-center">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
