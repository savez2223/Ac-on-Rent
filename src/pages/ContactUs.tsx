import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/frame1.png";
import bGcontact from "../assets/Product Image/bg contact us.jpg";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        {/* Hero Section */}
        <section className="relative bg-primary rounded-lg shadow-md mb-12">
          <img
            src={photo}
            alt="Contact Us - AC On Rent Gurugram"
            className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center ">
            <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
            <p className="text-lg text-white/80">
              Get in touch with AC On Rent Gurugram
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 border border-gray-200 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">
              Send Us a Message
            </h2>
            <section className="mb-6">
              <label
                htmlFor="name"
                className="text-xl font-semibold text-primary mb-2 block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Name"
                required
              />
            </section>

            <section className="mb-6">
              <label
                htmlFor="email"
                className="text-xl font-semibold text-primary mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Email"
                required
              />
            </section>

            <section className="mb-6">
              <label
                htmlFor="message"
                className="text-xl font-semibold text-primary mb-2 block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                placeholder="Your Message"
                required
              ></textarea>
            </section>

            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="p-6 border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Contact Information
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You can also reach us via the following methods:
            </p>
            <ul className="text-gray-700 space-y-4">
              <li>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+918744982935"
                  className="hover:text-primary transition-colors"
                >
                  +91 8744982935
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:AcOnRentGurugram24@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  AcOnRentGurugram24@gmail.com
                </a>
              </li>
              <li>
                <strong>Address:</strong>{" "}
                <a
                  href="https://maps.app.goo.gl/wPoCLe43kB94Pvqq8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Shop- 5&6, Hariram Complex, Main Branch Rd, Badshahpur, Sector
                  70, Gurugram, Haryana 122103
                </a>
              </li>
            </ul>

            {/* Map */}
            <div className="mt-8 w-full h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.1161480713519!2d77.03043793139277!3d28.39472805333506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d237cc8650911%3A0xfc965420f437bf49!2sHariram%20complex%20supermarket!5e1!3m2!1sen!2sin!4v1737865670505!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section
          className="bg-primary text-white text-center p-6 rounded-lg shadow-md"
          style={{
            backgroundImage: `url(${bGcontact})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="text-black text-3xl font-bold mb-4">
            Let's Connect and Build Together
          </h2>
          <p className="text-black text-lg mb-6">
            Discover how AC On Rent Gurugram can help with your cooling needs.
          </p>
          <button
            onClick={() => navigate(`/contact`)}
            className="bg-white text-primary px-6 py-2 rounded-lg font-semibold transition-colors duration-300 hover:text-black"
          >
            Get in Touch
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
