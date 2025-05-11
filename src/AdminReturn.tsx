import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "./firebase-config";
import { FaSearch, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import { format } from "date-fns";

interface ProductReturn {
  id: string;
  name: string;
  phone: string;
  address: string;
  product: string;
  reason: string;
  timestamp: number;
  status?: string;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
  { value: 'completed', label: 'Return Completed', color: 'bg-blue-100 text-blue-800' }
];

const AdminReturn: React.FC = () => {
  const [returns, setReturns] = useState<ProductReturn[]>([]);
  const [filteredReturns, setFilteredReturns] = useState<ProductReturn[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productReturnsRef = ref(db, "productReturns");
    const unsubscribe = onValue(productReturnsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setReturns(formattedData);
        setFilteredReturns(formattedData);
      } else {
        setReturns([]);
        setFilteredReturns([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = returns.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.phone.includes(value) ||
        item.product.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredReturns(filtered);
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const returnRef = ref(db, `productReturns/${id}`);
      await update(returnRef, {
        status: newStatus,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredReturns.map((item) => ({
        "Customer Name": item.name,
        "Phone Number": item.phone,
        "Address": item.address,
        "Product": item.product,
        "Return Reason": item.reason,
        "Status": STATUS_OPTIONS.find(opt => opt.value === item.status)?.label || 'Pending Review',
        "Request Date": new Date(item.timestamp).toLocaleString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Return Requests");
    XLSX.writeFile(workbook, `return-requests-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Return Management</h1>
          <p className="mt-2 text-gray-600">Track and manage product return requests</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or product..."
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button
              onClick={downloadExcel}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaDownload className="mr-2" /> Export to Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading return requests...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Customer", "Phone", "Product", "Reason", "Status", "Date"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReturns.map((returnItem) => (
                    <tr key={returnItem.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">{returnItem.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{returnItem.phone}</td>
                      <td className="px-6 py-4">{returnItem.product}</td>
                      <td className="px-6 py-4">{returnItem.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={returnItem.status || 'pending'}
                          onChange={(e) => handleStatusUpdate(returnItem.id, e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(returnItem.timestamp).toLocaleString()}
                      </td>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredReturns.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No return requests found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReturn;
