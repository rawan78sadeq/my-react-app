import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get featured products
  app.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get cart items
  app.get("/api/cart", async (req, res) => {
    try {
      // In a real app, you'd get userId from session
      const cartItems = await storage.getCartItems();
      const products = await storage.getAllProducts();
      
      // Combine cart items with product details
      const cartWithDetails = await Promise.all(
        cartItems.map(async (item) => {
          const product = products.find(p => p.id === item.productId);
          return {
            ...item,
            product: product || null
          };
        })
      );
      
      res.json(cartWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  // Add item to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const parsedBody = insertCartItemSchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ 
          message: "Invalid cart item data",
          errors: parsedBody.error.errors 
        });
      }
      
      const newCartItem = await storage.addToCart(parsedBody.data);
      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  // Update cart item quantity
  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const quantitySchema = z.object({
        quantity: z.number().int().positive()
      });
      
      const parsedBody = quantitySchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ 
          message: "Invalid quantity",
          errors: parsedBody.error.errors 
        });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(id, parsedBody.data.quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const success = await storage.removeFromCart(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart", async (req, res) => {
    try {
      // In a real app, you'd get userId from session
      await storage.clearCart();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
