import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import photo from "../assets/frame1.png";
import bGcontact from "../assets/Product Image/bg contact us.jpg";

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        {/* Hero Section */}
        <section className="relative bg-primary rounded-lg shadow-md mb-12">
          <img
            src={photo}
            alt="Terms and Conditions"
            className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Terms and Conditions
            </h1>
            <p className="text-lg text-white/80">
              Understand the terms that govern our services.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            By using our services, you agree to the following terms and
            conditions. Please read them carefully to understand your rights and
            responsibilities.
          </p>
        </div>

        {/* Terms Sections */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              1. Payment Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The rental fee, security deposit, and any additional charges must
              be paid in full before or at the time of AC delivery or
              installation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              2. Accepted Payment Methods
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Google Pay</li>
              <li>PhonePe</li>
              <li>Paytm</li>
              <li>UPI</li>
              <li>IMPS</li>
              <li>Net banking</li>
              <li>Direct bank transfers</li>
              <li>Cash</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              3. Security Deposit
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A refundable security deposit of ₹2,000 is required. This deposit
              will be refunded at the time of product pickup, provided no
              damages are found.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              4. Refund Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The rental amount is non-refundable, even if the rented products
              are returned early. Only the security deposit is refundable,
              subject to the condition of the product.
            </p>
          </div>
        </section>

        {/* Additional Terms */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-8">
            Delivery, Damage, and Other Policies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                5. Delivery Policy
              </h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>
                  The customer or their representative must be present to verify
                  the item's condition upon delivery.
                </li>
                <li>
                  The product must be returned in the same condition as
                  delivered.
                </li>
                <li>
                  A cancellation fee of ₹1,000 applies for orders canceled after
                  delivery.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                6. Pickup Policy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Notify us at least one week in advance to arrange for product
                pickup.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                7. Damage Policy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Customers are responsible for damage, loss, or theft of the
                product during the rental period. Charges are based on market
                value.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                8. Relocation Policy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Relocation to a different site is strictly prohibited. The
                product must remain at the original installation site, or the
                security deposit will be forfeited.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
            Have Questions?
          </h2>
          <p className="text-black text-lg mb-6">
            If you need clarification on any terms, contact us for assistance.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-primary px-6 py-2 rounded-lg font-semibold transition-colors duration-300 hover:text-black"
          >
            Contact Support
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
