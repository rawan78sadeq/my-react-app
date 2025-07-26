import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would be replaced with an API call to send the message
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <section id="contact" className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products? We're here to help.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-custom">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-secondary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-primary">Address</p>
                      <p className="text-muted-foreground">
                        123 Innovation Drive, Tech City, TC 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-secondary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-primary">Email</p>
                      <p className="text-muted-foreground">hello@flaze.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-secondary mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-primary">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-primary hover:bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                      aria-label="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="#"
                      className="bg-primary hover:bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="bg-primary hover:bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      className="bg-primary hover:bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                      aria-label="YouTube"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Send a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Label htmlFor="name" className="block text-primary font-medium mb-2">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="email" className="block text-primary font-medium mb-2">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="message" className="block text-primary font-medium mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
