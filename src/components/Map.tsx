import React from "react";

export const Map: React.FC = () => {
  return (
    <div className="bg-gray-50 py-4 lg:py-8 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-6">Our Location</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Visit us at our office or reach out for more information. Use the map
        below to find us.
      </p>
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl rounded-lg overflow-hidden shadow-lg">
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
  );
};
