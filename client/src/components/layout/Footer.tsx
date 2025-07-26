import React from "react";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription would go here
  };

  return (
    <footer className="bg-primary text-white pt-12 pb-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo className="w-10 h-10 mr-2" />
              <span className="text-xl font-bold font-heading">Flaze</span>
            </div>
            <p className="text-white text-opacity-80 mb-4">
              Revolutionizing the way you enjoy meals on the go with our innovative heated lunch boxes.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-secondary transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-secondary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-white text-opacity-80 hover:text-secondary transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#features" className="text-white text-opacity-80 hover:text-secondary transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-white text-opacity-80 hover:text-secondary transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white text-opacity-80 hover:text-secondary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-secondary transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-secondary transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-secondary transition">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-secondary transition">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-opacity-80 hover:text-secondary transition">
                  User Manual
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white text-opacity-80 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex mb-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-r-none text-primary"
                required
              />
              <Button 
                type="submit"
                className="bg-secondary hover:bg-opacity-90 rounded-l-none"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright and Policy Links */}
        <div className="border-t border-white border-opacity-20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-opacity-60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Flaze Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-white text-opacity-60">
            <a href="#" className="hover:text-secondary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-secondary transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
