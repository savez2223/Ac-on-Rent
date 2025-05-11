import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image from  "@/assets/main-image.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative  flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-secondary py-12">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {/* Left Text Section */}
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Be Prepared for This Summer
              <br />
              <span className="text-primary">
                Exclusive Offers on AC Rentals
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Stay cool this summer with our great rental deals on Window ACs
              and Split ACs. Flexible plans and free installation included!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                onClick={() => navigate(`/rent/window-ac`)}
              >
                Rent Window AC
              </button>
              <button
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                onClick={() => navigate(`/rent/split-ac`)}
              >
                Rent Split AC
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="relative bg-gradient-to-b from-transparent to-secondary rounded-lg shadow-lg p-4">
              <img
                src={image}
                alt="Air Conditioner Offer"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
