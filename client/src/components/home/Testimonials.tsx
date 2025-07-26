import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  occupation: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah T.",
    occupation: "Healthcare Professional",
    comment:
      "I love my Flaze lunch box! As a nurse working 12-hour shifts, I can finally enjoy hot meals during my breaks without using the shared microwave.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael J.",
    occupation: "Construction Supervisor",
    comment:
      "The battery life is incredible! I can heat my lunch without worrying about finding an outlet. Perfect for my construction site job.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amanda R.",
    occupation: "Parent of Two",
    comment:
      "My kids love taking their Flaze Compact to school. The compartments keep their food perfectly separated and at the right temperature.",
    rating: 4.5,
  },
];

const Testimonials: React.FC = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="fill-secondary text-secondary" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="fill-secondary text-secondary" />
      );
    }

    return stars;
  };

  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            What Our Customers Say
          </h2>
          <p className="text-white text-opacity-80 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            lunchtime routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white bg-opacity-10 border-0"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-secondary">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="mb-4 italic">{testimonial.comment}</p>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-white text-opacity-70 text-sm">
                  {testimonial.occupation}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
