// Declare global types to include gtag function
declare global {
  interface Window {
    gtag: (command: string, eventName: string, params: Record<string, any>) => void;
  }
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure gtag is available on window object
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11524510391/-DkSCP-Vyf4ZELelqPcq',  // Conversion ID
        'value': 2.0,                                      // Conversion value
        'currency': 'INR'                                  // Currency for the conversion
      });
    } else {
      console.error('Google Tag Manager gtag function is not available.');
    }

    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-5">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-lg mx-auto"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-24 h-24 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Thank You!</h1>
          <p className="text-xl text-gray-600">
            Your rental request has been successfully submitted. We will contact you
            shortly to confirm your order.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to homepage in a few seconds...
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
