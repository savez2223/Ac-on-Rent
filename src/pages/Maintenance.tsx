import { db } from "../firebase-config"; // Firebase configuration
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Phone, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { ref, push, set } from "firebase/database";

const Maintenance = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestRef = ref(db, "maintenanceRequests");
      const newRequestRef = push(requestRef);
      await set(newRequestRef, {
        name: formData.name,
        phone: formData.phone,
        issue: formData.issue,
        timestamp: Date.now(),
      });
      alert("Request successfully submitted!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save the request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Helmet>
        <title>Maintenance Services | Ac On Rent Gurugram</title>
        <meta
          name="description"
          content="Professional maintenance services for all your appliances. 24/7 support, expert technicians, and comprehensive care."
        />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">
          Maintenance Services
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Wrench className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Expert Technicians</h2>
              </div>
              <p className="text-muted-foreground">
                Our certified technicians provide professional maintenance for
                all types of appliances.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">24/7 Support</h2>
              </div>
              <p className="text-muted-foreground">
                Round-the-clock customer support for emergency maintenance
                needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Clock className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Quick Response</h2>
              </div>
              <p className="text-muted-foreground">
                Same-day service for urgent maintenance requests.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">Service Guarantee</h2>
              </div>
              <p className="text-muted-foreground">
                All maintenance work comes with our satisfaction guarantee.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold">Need Maintenance?</h3>
          <p className="text-muted-foreground">
            Contact us for immediate assistance
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
            Request Maintenance
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Maintenance Form</h2>
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
                <textarea
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  placeholder="Describe the issue"
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

export default Maintenance;
