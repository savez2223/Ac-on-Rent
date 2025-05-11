import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Services } from "@/components/Services";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TestimonialPage } from "@/components/Testinomial";
import { Map } from "@/components/Map";
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        <Hero />
        <FeaturedProducts />
        <Services />
        <TestimonialPage />
        <Map />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;
