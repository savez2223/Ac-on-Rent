import { motion } from "framer-motion";
import { Clock, Truck, Wrench, Shield } from "lucide-react";

const services = [
  {
    icon: Clock,
    title: "Flexible Plans",
    description: "Daily, monthly, or yearly rental options to suit your needs",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery and professional installation",
  },
  {
    icon: Wrench,
    title: "24/7 Support",
    description: "Round-the-clock maintenance and technical assistance",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All appliances undergo rigorous quality checks",
  },
];

export const Services = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 mb-4 text-sm font-medium bg-primary/20 text-primary rounded-full uppercase tracking-wide">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
            Exceptional Service, Every Step
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure your complete satisfaction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
