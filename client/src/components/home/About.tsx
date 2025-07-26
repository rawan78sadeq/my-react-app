import React from "react";
import { CheckCircle } from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=1000"
              alt="About Flaze"
              className="rounded-xl shadow-lg max-w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-6">
              About Flaze
            </h2>
            <p className="text-muted-foreground mb-4">
              At Flaze, we believe that everyone deserves to enjoy a hot, home-cooked
              meal no matter where they are. Our journey began when our founder, a busy
              professional, grew tired of cold lunches and unhealthy takeout options.
            </p>
            <p className="text-muted-foreground mb-6">
              Today, we're proud to offer innovative heated lunch box solutions that
              combine cutting-edge technology with practical design. Our mission is to
              help you eat better, save money, and reduce waste by making it easy to
              bring your favorite meals anywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <CheckCircle className="text-secondary text-xl mr-2" />
                <span className="text-primary font-medium">Premium Materials</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-secondary text-xl mr-2" />
                <span className="text-primary font-medium">Innovative Technology</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-secondary text-xl mr-2" />
                <span className="text-primary font-medium">2-Year Warranty</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-secondary text-xl mr-2" />
                <span className="text-primary font-medium">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
