import { ref, push } from "firebase/database"; // Import Firebase methods
import { db } from "../firebase-config"; // Your Firebase configuration file
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Info, Tag, CheckCircle } from "lucide-react";
import { useState } from "react";

const ProductReturn = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    product: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      product: formData.product,
      reason: formData.reason,
      timestamp: Date.now(), // Add a timestamp for reference
    };

    try {
      // Reference the "productReturns" node in the Realtime Database
      const productReturnsRef = ref(db, "productReturns");

      // Push the form data to the database
      await push(productReturnsRef, formDataToSend);

      alert("Request submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        address: "",
        product: "",
        reason: "",
      });
      setShowForm(false); // Optionally hide the form
    } catch (error) {
      console.error("Error submitting the request:", error);
      alert("Failed to send the request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Helmet>
        <title>Product Return | Your Company Name</title>
        <meta
          name="description"
          content="Submit your product return requests easily and efficiently. Hassle-free process with quick support."
        />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Product Return</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Hassle-Free Returns</h2>
              </div>
              <p className="text-muted-foreground">
                Return your products with ease through our streamlined process.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Info className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Detailed Guidance</h2>
              </div>
              <p className="text-muted-foreground">
                Get step-by-step instructions for a smooth return experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Tag className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Refund or Exchange</h2>
              </div>
              <p className="text-muted-foreground">
                Choose between a refund or product exchange as per your need.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">
                  Customer Satisfaction
                </h2>
              </div>
              <p className="text-muted-foreground">
                Your satisfaction is our top priority with every return.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold">Need to Return a Product?</h3>
          <p className="text-muted-foreground">
            Contact us for quick assistance.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="tel:+918744982935"
              className="text-primary hover:underline"
            >
              📞 Call Now
            </a>
            <a
              href="https://wa.me/+918744982935"
              className="text-green-500 hover:underline"
            >
              WhatsApp
            </a>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover"
          >
            Submit Return Request
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Return Form</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Your Address"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Reason for Return"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductReturn;
