import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "/logo.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Window AC On Rent", path: "/rent/window-ac" },
    { title: "Split AC On Rent", path: "/rent/split-ac" },
    { title: "Oil Heater On Rent", path: "/rent/room-heater" },
    { title: "Maintenance", path: "/maintenance" },
    { title: "Return Your Rented Product", path: "/return" },
  ];

  return (
    <nav className="border-b bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 md:h-20" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button
              key={link.path}
              variant="outline"
              asChild
              className="bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-primary hover:border-primary transition-colors"
            >
              <Link to={link.path}>{link.title}</Link>
            </Button>
          ))}
        </div>

        {/* Contact Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            asChild
            className="bg-white border-gray-200"
          >
            <a href="tel:+918744982935" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91-8744982935</span>
            </a>
          </Button>

          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white border-none"
          >
            <a
              href="https://wa.me/+918744982935"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-lg lg:hidden">
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="outline"
                  asChild
                  className="w-full justify-start bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-primary hover:border-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={link.path}>{link.title}</Link>
                </Button>
              ))}

              <div className="pt-4 space-y-2 border-t">
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start bg-white border-gray-200"
                >
                  <a
                    href="tel:+918744982935"
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+91-8744982935</span>
                  </a>
                </Button>

                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
                >
                  <a
                    href="https://wa.me/+918744982935"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
