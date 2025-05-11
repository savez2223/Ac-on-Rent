import {
  Mail,
  PhoneCall,
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#0097b2]">
              Ac On Rent Gurugram
            </h3>
            <p className="text-gray-400">
              Premium appliance rental solutions with flexible plans and
              exceptional service.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/products" className="hover:text-[#0097b2]">
                  Products
                </a>
              </li>
              <li>
                <a href="/sell" className="hover:text-[#0097b2]">
                  Sell Your Old AC
                </a>
              </li>
              <li>
                <a href="/maintenance" className="hover:text-[#0097b2]">
                  Maintenance
                </a>
              </li>
              <li>
                <a href="/return" className="hover:text-[#0097b2]">
                  Return Your Rented Product
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#0097b2]">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#0097b2]">
                  Contact
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-[#0097b2]">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:AcOnRentGurugram24@gmail.com"
                  className="hover:text-[#0097b2]"
                >
                  AcOnRentGurugram24@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                <a href="tel:+918744982935" className="hover:text-[#0097b2]">
                  8744982935
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shop- 5&6, Hariram Complex, Main Branch Rd, Badshahpur, Sector
                70, Gurugram, Haryana 122103
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/privacy" className="hover:text-[#0097b2]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#0097b2]">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-gray-400 text-sm leading-relaxed">
          <p>
            We provide Air Conditioners On Rent like Window AC 1ton on Rent,
            Window AC 1.5ton On Rent, Window AC 2 Ton On Rent, Split AC 1ton On
            Rent, Split AC 1.5Ton On Rent, Split AC 2Ton On Rent And Other
            Appliances Refrigerator & Washing Machine On Rent Available. Special
            Rental Appliances For Winter period Oil Filled Heater On Rent 9Fin
            to 13Fin Oil Heater On Rent available And Water Geyser On Rent Also
            available. Installation & Maintenance Covered Free off cost. Service
            Area: All Gurugram & All Sohna City.
          </p>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 text-gray-400">
            <a
              href="https://www.facebook.com/profile.php?id=61567274079370"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0097b2]"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/zuridox"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0097b2]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/zuridox/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0097b2]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center justify-center text-gray-400 mt-4">
            <Copyright className="h-4 w-4 mr-2" />
            <p>{currentYear} Ac On Rent Gurugram. All rights reserved.</p>
          </div>
          <div className="mt-4 text-center text-gray-400">
            <p>
              Website designed by{" "}
              <a
                href="https://www.zuridox.com"
                className="text-[#0097b2] hover:underline"
              >
                Zuridox
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
