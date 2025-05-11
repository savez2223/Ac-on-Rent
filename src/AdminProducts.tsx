import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { ref, onValue } from "firebase/database";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { FaDownload, FaFilter, FaRedo, FaSearch } from 'react-icons/fa';

interface RentalRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  productId: string;
  variant: string;
  duration: string;
  months: string;
  price: number;
  timestamp: string;
}

const AdminProducts: React.FC = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RentalRequest[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const rentalRequestsRef = ref(db, "rentalRequests");
    const unsubscribe = onValue(rentalRequestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setRentalRequests(formattedData);
        setFilteredRequests(formattedData);
      } else {
        setRentalRequests([]);
        setFilteredRequests([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filterByDate = () => {
    if (!startDate || !endDate) {
      setFilteredRequests(rentalRequests);
      return;
    }

    const filtered = rentalRequests.filter((request) => {
      const requestDate = new Date(request.timestamp);
      const start = new Date(startDate.setHours(0, 0, 0, 0));
      const end = new Date(endDate.setHours(23, 59, 59, 999));
      return requestDate >= start && requestDate <= end;
    });

    setFilteredRequests(filtered);
  };

  const resetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
    setFilteredRequests(rentalRequests);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const searchResults = rentalRequests.filter(
      (request) =>
        request.name.toLowerCase().includes(value.toLowerCase()) ||
        request.email.toLowerCase().includes(value.toLowerCase()) ||
        request.phone.includes(value) ||
        request.productId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(searchResults);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredRequests.map((request) => ({
        "Customer Name": request.name,
        "Email": request.email,
        "Phone Number": request.phone,
        "Delivery Address": request.address,
        "Product ID": request.productId,
        "Variant": request.variant,
        "Duration": request.duration,
        "Months": request.months,
        "Price (₹)": request.price,
        "Request Date": new Date(request.timestamp).toLocaleString(),
      }))
    );

    // Set column widths
    const colWidths = [
      { wch: 20 }, // Customer Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Address
      { wch: 15 }, // Product ID
      { wch: 15 }, // Variant
      { wch: 12 }, // Duration
      { wch: 10 }, // Months
      { wch: 12 }, // Price
      { wch: 20 }, // Timestamp
    ];
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rental Requests");
    const fileName = `rental-requests-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rental Requests</h1>
          <p className="mt-2 text-gray-600">Manage and track all rental requests</p>
        </div>

        {/* Controls Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                placeholderText="Start Date"
                className="w-full p-2 border rounded-lg"
                dateFormat="dd/MM/yyyy"
                maxDate={endDate || new Date()}
                isClearable
              />
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                placeholderText="End Date"
                className="w-full p-2 border rounded-lg"
                dateFormat="dd/MM/yyyy"
                minDate={startDate}
                maxDate={new Date()}
                isClearable
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={filterByDate}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFilter className="mr-2" /> Filter
              </button>
              <button
                onClick={resetFilter}
                className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FaRedo className="mr-2" /> Reset
              </button>
              <button
                onClick={downloadExcel}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaDownload className="mr-2" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading rental requests...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Customer",
                      "Email",
                      "Phone",
                      "Address",
                      "Product",
                      "Variant",
                      "Duration",
                      "Months",
                      "Price",
                      "Timestamp",
                    ].map((header) => (
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
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{request.name || "N/A"}</td>
                      <td className="px-6 py-4">{request.email || "N/A"}</td>
                      <td className="px-6 py-4">{request.phone || "N/A"}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{request.address || "N/A"}</td>
                      <td className="px-6 py-4">{request.productId || "N/A"}</td>
                      <td className="px-6 py-4">{request.variant || "N/A"}</td>
                      <td className="px-6 py-4">{request.duration || "N/A"}</td>
                      <td className="px-6 py-4">{request.months || "N/A"}</td>
                      <td className="px-6 py-4 font-medium">₹{request.price?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4">{new Date(request.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRequests.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No rental requests found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
