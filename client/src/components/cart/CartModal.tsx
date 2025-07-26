import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";

const CartModal: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    total,
  } = useCart();

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </DialogTitle>
          <DialogDescription>
            Review your items before checkout
          </DialogDescription>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button
              className="mt-4"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b border-gray-200 pb-4"
                >
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    {item.product?.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">
                      {item.product?.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">Size: {item.size}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {item.product ? formatCurrency(parseFloat(item.product.price) * item.quantity) : "N/A"}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 text-sm hover:text-red-600 p-0 h-auto mt-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-primary">Total</span>
                <span className="font-bold text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-col gap-2">
              <Button
                className="w-full bg-secondary hover:bg-opacity-90"
                onClick={() => {
                  // Checkout process would go here
                  alert("Checkout functionality would be implemented here");
                }}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
