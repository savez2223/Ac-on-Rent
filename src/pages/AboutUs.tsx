import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/frame1.png";
import bGcontact from "../assets/Product Image/bg contact us.jpg";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        {/* Hero Section */}
        <section className="relative rounded-lg shadow-md mb-12">
          <img
            src={photo}
            alt="AC On Rent Gurugram Team"
            className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center ">
            <h1 className="text-4xl font-bold text-white mb-2">
              About AC On Rent Gurugram
            </h1>
            <p className="text-lg text-white/80">
              Delivering excellence, innovation, and reliability.
            </p>
          </div>
        </section>

        {/* Company Details */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At{" "}
              <span className="font-bold text-primary">
                AC On Rent Gurugram
              </span>
              , we provide top-notch services tailored to meet your cooling
              needs. Our team is dedicated to innovation, excellence, and
              fostering long-term partnerships that empower your success and
              deliver unmatched value.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To provide reliable, high-quality air conditioning solutions that
              enhance comfort and efficiency.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To be a market leader in rental air conditioning services,
              delivering unmatched value and service excellence.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Our Values
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Integrity, customer satisfaction, innovation, and sustainable
              practices are at the core of our operations.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center text-primary mb-8">
            Why Choose AC On Rent Gurugram?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-black leading-relaxed">
                With years of expertise, AC On Rent Gurugram offers reliable,
                energy-efficient air conditioning solutions to businesses and
                individuals. Our team ensures personalized service, timely
                delivery, and unparalleled customer support.
              </p>
              <p className="text-lg text-black leading-relaxed mt-4">
                We are committed to understanding your unique requirements and
                delivering customized solutions that exceed expectations.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/7347538/pexels-photo-7347538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Innovation at AC On Rent Gurugram"
              className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
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
            Let’s Build the Future Together
          </h2>
          <p className="text-black text-lg mb-6">
            Discover how AC On Rent Gurugram can transform your comfort. Reach
            out to learn more about our tailored solutions.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-primary px-6 py-2 rounded-lg font-semibold transition-colors duration-300 hover:text-black"
          >
            Contact Us
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
