import React, { useState, useEffect } from "react";
import logo1 from "../assets/Screenshot 2024-12-26 082704.png";
import logo2 from "../assets/Screenshot 2024-12-26 082914.png";
import logo3 from "../assets/Screenshot 2024-12-26 082900.png";

const testimonials = [
  {
    id: 1,
    name: "Manoj Kumar",
    role: "Product Manager",
    company: "TechFlow Inc.",
    text: "The AC rental service exceeded my expectations. The units were delivered on time and the cooling performance was excellent. Their team was professional and installation was quick.",
    image: logo1,
  },
  {
    id: 2,
    name: "Rajesh Patel",
    role: "Restaurant Owner",
    company: "Spice Garden",
    text: "We've been using their AC rental service for our restaurant during peak summer months. The service is reliable and their maintenance team responds quickly to any issues.",
    image: logo2,
  },
  {
    id: 3,
    name: "Rahul Sharma",
    role: "Event Coordinator",
    company: "Celebrations Ltd",
    text: "Perfect solution for our outdoor events. The portable AC units work great and their team helps with setup. Highly recommend for any event planning needs.",
    image: logo3,
  },
];

export const TestimonialPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          What Our Customers Say
        </h2>

        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none -translate-x-1/2"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Testimonial Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-none">
                  <div className="mx-auto max-w-2xl px-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full border-2 border-[#0097b2] object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                            {testimonial.text}
                          </p>
                          <div className="pt-4 border-t border-gray-100">
                            <p className="font-semibold text-gray-900">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none translate-x-1/2"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-[#0097b2]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
