import React from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/home/ProductCard";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";

const Home: React.FC = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const featuredProducts = products.filter((product: any) => product.featured);

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Featured Products */}
        <section id="products" className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
                Our Premium Heated Lunch Boxes
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our range of innovative heated lunch boxes designed to keep your
                meals warm and delicious no matter where you are.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-custom h-96 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <a
                href="#"
                className="inline-block bg-white border-2 border-primary hover:bg-primary hover:text-white text-primary font-bold py-3 px-8 rounded-full shadow-lg transition"
              >
                View All Products
              </a>
            </div>
          </div>
        </section>

        <Features />
        <Testimonials />
        <HowItWorks />
        <CTA />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
