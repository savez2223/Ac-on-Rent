import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa"; // Importing WhatsApp and Phone icons from react-icons

const FloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+918744982935"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+918744982935"
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        aria-label="Call"
      >
        <FaPhoneAlt className="h-8 w-8" />
      </a>
    </div>
  );
};

export default FloatingButton;
