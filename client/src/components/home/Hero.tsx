import React from "react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="bg-primary text-white py-20 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
            Keep Your Lunch <span className="text-secondary">Hot</span> Anywhere You Go
          </h1>
          <p className="text-lg mb-8">
            Premium heated lunch boxes designed for busy professionals, students, and anyone on the go. 
            Enjoy a hot meal anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              asChild
              className="bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
              size="lg"
            >
              <a href="#products">Shop Now</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white hover:bg-opacity-90 text-primary font-bold py-3 px-8 rounded-full shadow-lg transition"
              size="lg"
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1544403894-8a2be1e6fe75?auto=format&fit=crop&q=80&w=2069"
            alt="Premium Heated Lunch Box"
            className="rounded-xl shadow-2xl max-w-full h-auto mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
