import React from "react";
import FlazeLogo from "@assets/image_1747225074181.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <img 
      src={FlazeLogo} 
      alt="Flaze Logo" 
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export default Logo;
