import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const WhatsAppButton: React.FC = () => {
  // WhatsApp phone number - would typically come from configuration or environment variable
  const whatsappNumber = "15551234567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="fixed bottom-5 right-5 w-14 h-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 flex items-center justify-center z-50"
            size="icon"
            asChild
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6 text-white" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Contact us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
