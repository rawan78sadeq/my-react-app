import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Using your Flaze heated lunch box is simple and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Pack Your Meal</h3>
            <p className="text-muted-foreground">
              Fill the compartments with your favorite foods, just like any lunch box.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Set Temperature</h3>
            <p className="text-muted-foreground">
              Turn on your Flaze and set your desired temperature using the simple
              controls.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Enjoy Hot Food</h3>
            <p className="text-muted-foreground">
              When you're ready to eat, your meal will be perfectly heated and ready
              to enjoy.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <img
            src="https://images.unsplash.com/photo-1517949908114-71669a64d885?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
            alt="Person enjoying meal from heated lunch box"
            className="rounded-xl shadow-lg max-w-full h-auto mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
