import React, { useEffect, useState } from "react";
import { ref, get, remove, update } from "firebase/database";
import { db } from "./firebase-config";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FaSearch, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { format } from "date-fns";

interface ApplianceListing {
  id: string;
  name: string;
  phone: string;
  location: string;
  applianceType: string;
  brand: string;
  model: string;
  age: number;
  condition: string;
  price: number;
  timestamp: number;
}

const AdminSell: React.FC = () => {
  const { toast } = useToast();
  const [applianceListings, setApplianceListings] = useState<
    ApplianceListing[]
  >([]);
  const [filteredListings, setFilteredListings] = useState<ApplianceListing[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const applianceRef = ref(db, "applianceListings");
      const snapshot = await get(applianceRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const listingsArray = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setApplianceListings(listingsArray);
        setFilteredListings(listingsArray);
      }
    } catch (error) {
      toast({
        title: "Error Fetching Data",
        description: "Unable to load appliance listings. Please refresh.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = applianceListings.filter((listing) =>
      Object.values(listing).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredListings(filtered);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await remove(ref(db, `applianceListings/${id}`));
        toast({
          title: "Success",
          description: "Listing deleted successfully",
        });
        fetchListings();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete listing",
          variant: "destructive",
        });
      }
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredListings.map((listing) => ({
        "Seller Name": listing.name,
        Phone: listing.phone,
        Location: listing.location,
        "Appliance Type": listing.applianceType,
        Brand: listing.brand,
        Model: listing.model,
        "Age (Years)": listing.age,
        Condition: listing.condition,
        "Price (₹)": listing.price,
        "Listed Date": format(new Date(listing.timestamp), "dd/MM/yyyy HH:mm"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appliance Listings");
    XLSX.writeFile(
      workbook,
      `appliance-listings-${format(new Date(), "yyyy-MM-dd")}.xlsx`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Used Appliance Listings
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and track all second-hand appliance listings
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button
              onClick={downloadExcel}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FaDownload /> Export to Excel
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading listings...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <thead className="bg-gray-50">
                    <tr>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seller Name
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Appliance Type
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brand
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </TableCell>
                      <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </TableCell>
                    </tr>
                  </thead>
                  <TableBody>
                    {filteredListings.map((listing) => (
                      <TableRow key={listing.id} className="hover:bg-gray-50">
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.name}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.phone}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.location}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.applianceType}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.brand}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.model}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          {listing.age} years
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              listing.condition === "Excellent"
                                ? "bg-green-100 text-green-800"
                                : listing.condition === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {listing.condition}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          ₹{listing.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FaEdit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <FaTrash className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSell;
