import React, { useState } from "react";
import { Link } from "wouter";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
    closeMenu();
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo size="md" className="mr-2" />
          <span className="text-2xl md:text-3xl font-bold font-heading text-primary">
            Flaze
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <a href="#products" className="text-primary hover:text-secondary font-medium transition">
            Products
          </a>
          <a href="#features" className="text-primary hover:text-secondary font-medium transition">
            Features
          </a>
          <a href="#about" className="text-primary hover:text-secondary font-medium transition">
            About
          </a>
          <a href="#contact" className="text-primary hover:text-secondary font-medium transition">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="relative hidden md:flex" 
            onClick={openCart}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? (
              <X className="text-primary text-xl" />
            ) : (
              <Menu className="text-primary text-xl" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-3">
            <a 
              href="#products" 
              className="text-primary hover:text-secondary font-medium transition"
              onClick={closeMenu}
            >
              Products
            </a>
            <a 
              href="#features" 
              className="text-primary hover:text-secondary font-medium transition"
              onClick={closeMenu}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-primary hover:text-secondary font-medium transition"
              onClick={closeMenu}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-primary hover:text-secondary font-medium transition"
              onClick={closeMenu}
            >
              Contact
            </a>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 justify-start px-0"
              onClick={openCart}
            >
              <div className="relative">
                <ShoppingCart className="text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-primary">Cart</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
