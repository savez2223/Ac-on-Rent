import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import React from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/frame1.png";
import bGcontact from "../assets/Product Image/bg contact us.jpg";


const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        {/* Hero Section */}
        <section className="relative bg-primary rounded-lg shadow-md mb-12">
          <img
            src={photo}
            alt="Privacy Policy"
            className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/80">
              Your privacy matters to us at AC On Rent Gurugram.
            </p>
          </div>
        </section>

        {/* Privacy Policy Details */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Our Commitment
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At{" "}
              <span className="font-bold text-primary">
                AC On Rent Gurugram
              </span>
              , we are dedicated to protecting your privacy. Please read our
              Privacy Policy to understand how we collect, use, and safeguard
              your information.
            </p>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              1. Information We Collect
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We collect personal information such as your name, email address,
              phone number, and payment details to provide our services
              effectively.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              2. How We Use Your Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your information is used for processing orders, customer support,
              and enhancing our services. We prioritize transparency in our
              operations.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              3. Data Security
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We implement robust security measures to protect your data from
              unauthorized access or breaches.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              4. Sharing Your Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We do not share your personal data without consent unless required
              by law.
            </p>
          </div>
        </section>

        {/* Additional Information */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-8">
            Your Rights and Our Responsibilities
          </h2>
          <p className="text-lg text-black leading-relaxed">
            You have the right to access, update, or delete your personal data.
            We continually strive to ensure your information is handled with the
            utmost care.
          </p>
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
            Stay Secure with Us
          </h2>
          <p className="text-black text-lg mb-6">
            If you have questions about our Privacy Policy, feel free to contact
            us.
          </p>
          <button
            onClick={() => navigate(`/contact`)}
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

export default PrivacyPolicy;
