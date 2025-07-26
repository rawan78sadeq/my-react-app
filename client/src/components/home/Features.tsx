import React from "react";
import { Flame, Battery, Utensils, Smartphone } from "lucide-react";

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            Why Choose Flaze?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our heated lunch boxes are designed with your needs in mind, combining
            convenience with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-xl bg-background">
            <div className="text-secondary text-4xl mb-4 flex justify-center">
              <Flame className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Fast Heating</h3>
            <p className="text-muted-foreground">
              Quickly heat your meal within minutes, perfect for busy schedules.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 rounded-xl bg-background">
            <div className="text-secondary text-4xl mb-4 flex justify-center">
              <Battery className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Long Battery Life</h3>
            <p className="text-muted-foreground">
              Up to 12 hours of battery life on a single charge.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 rounded-xl bg-background">
            <div className="text-secondary text-4xl mb-4 flex justify-center">
              <Utensils className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Multiple Compartments
            </h3>
            <p className="text-muted-foreground">
              Separate your foods with our clever compartment design.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-center p-6 rounded-xl bg-background">
            <div className="text-secondary text-4xl mb-4 flex justify-center">
              <Smartphone className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Smart Control</h3>
            <p className="text-muted-foreground">
              Premium models feature app control for remote temperature adjustment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
