import React, { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "./firebase-config";
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { FaDownload, FaSearch } from 'react-icons/fa';

interface MaintenanceRequest {
  id: string;
  name: string;
  phone: string;
  issue: string;
  timestamp: string;
  status: string;
  lastUpdated?: string;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
];

const AdminMaintenance: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const requestRef = ref(db, "maintenanceRequests");
    const unsubscribe = onValue(requestRef, (snapshot) => {
      const data = snapshot.val();
      const formattedRequests = data
        ? Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value,
          }))
        : [];
      setRequests(formattedRequests);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const requestRef = ref(db, `maintenanceRequests/${id}`);
      await update(requestRef, {
        status: newStatus,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      requests.map((request) => ({
        Name: request.name,
        Phone: request.phone,
        Issue: request.issue,
        Status: STATUS_OPTIONS.find(opt => opt.value === request.status)?.label || 'Pending',
        'Last Updated': request.lastUpdated ? new Date(request.lastUpdated).toLocaleString() : 'N/A',
        'Created At': new Date(request.timestamp).toLocaleString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Maintenance Requests");
    XLSX.writeFile(workbook, `maintenance-requests-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone?.includes(searchTerm) ||
      request.issue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Maintenance Requests
          </h1>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={downloadExcel}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaDownload /> Export to Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading requests...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Phone", "Issue", "Status", "Last Updated", "Created At"].map((header) => (
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
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.phone}</td>
                        <td className="px-6 py-4">{request.issue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={request.status || 'pending'}
                            onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
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
                          {request.lastUpdated 
                            ? new Date(request.lastUpdated).toLocaleString()
                            : 'Not updated yet'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(request.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No maintenance requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMaintenance;
