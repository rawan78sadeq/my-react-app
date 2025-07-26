import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  productId: number;
  size: string;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
  } | null;
}

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (productId: number, size: string, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE = "https://your-backend-domain.com/api";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Fetch cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: [`${API_BASE}/cart`],
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: (newItem: { productId: number; size: string; quantity: number }) => 
      apiRequest('POST', `${API_BASE}/cart`, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${API_BASE}/cart`] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add item",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `${API_BASE}/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${API_BASE}/cart`] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to remove item",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) => 
      apiRequest('PATCH', `${API_BASE}/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${API_BASE}/cart`] });
    },
    onError: (error) => {
      toast({
        title: "Failed to update quantity",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => apiRequest('DELETE', `${API_BASE}/cart`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${API_BASE}/cart`] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to clear cart",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  // Calculate cart totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product ? parseFloat(item.product.price) : 0;
    return sum + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const value = {
    cartItems,
    isLoading,
    isCartOpen,
    totalItems,
    subtotal,
    shipping,
    total,
    addToCart: async (productId, size, quantity = 1) => {
      await addToCartMutation.mutateAsync({ productId, size, quantity });
    },
    removeFromCart: async (id) => {
      await removeFromCartMutation.mutateAsync(id);
    },
    updateQuantity: async (id, quantity) => {
      await updateQuantityMutation.mutateAsync({ id, quantity });
    },
    clearCart: async () => {
      await clearCartMutation.mutateAsync();
    },
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
