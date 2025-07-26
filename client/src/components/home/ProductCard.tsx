import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Star, StarHalf } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: string;
    reviewCount: number;
    badge?: string | null;
    sizes: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  // Helper to render rating stars
  const renderRating = (rating: string) => {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-secondary text-secondary" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-secondary text-secondary" />);
    }

    // Add empty stars to reach 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      return; // Require size selection
    }

    setIsAdding(true);
    try {
      await addToCart(product.id, selectedSize);
      
      // Show success state briefly
      setTimeout(() => {
        setIsAdding(false);
      }, 1500);
    } catch (error) {
      setIsAdding(false);
    }
  };

  return (
    <Card className="overflow-hidden product-card transition">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.badge && (
          <Badge
            className="absolute top-4 right-4 bg-secondary text-white font-bold px-3 py-1"
            variant="secondary"
          >
            {product.badge}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary text-lg font-bold">
            {formatCurrency(parseFloat(product.price))}
          </span>
          <div className="flex items-center">
            <div className="flex">{renderRating(product.rating)}</div>
            <span className="text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="font-medium text-primary mb-2">Size:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className={
                  selectedSize === size
                    ? "bg-secondary hover:bg-secondary hover:text-white text-white border-secondary"
                    : "border-primary text-primary hover:bg-secondary hover:text-white hover:border-secondary"
                }
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          className={`w-full ${
            isAdding ? "bg-green-600" : "bg-primary"
          } hover:bg-opacity-90 text-white font-bold py-3 px-6 transition flex items-center justify-center`}
          onClick={handleAddToCart}
          disabled={!selectedSize || isAdding}
        >
          {isAdding ? (
            <>
              <Check className="mr-2" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
