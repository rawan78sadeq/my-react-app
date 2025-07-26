import React from "react";
import { Button } from "@/components/ui/button";

const CTA: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
          Ready to Transform Your Lunch Experience?
        </h2>
        <p className="text-white text-opacity-90 max-w-2xl mx-auto mb-8 text-lg">
          Join thousands of happy customers enjoying hot, delicious meals wherever they go.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white hover:bg-opacity-90 text-primary font-bold py-4 px-10 rounded-full shadow-lg transition text-lg"
        >
          <a href="#products">Shop Now</a>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
