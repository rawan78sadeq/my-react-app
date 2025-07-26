// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  products;
  cart;
  currentUserId;
  currentProductId;
  currentCartItemId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.products = /* @__PURE__ */ new Map();
    this.cart = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.seedProducts();
  }
  seedProducts() {
    const productList = [
      {
        name: "Flaze Classic",
        description: "Perfect for office workers. Three compartments with independent temperature control.",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "5.0",
        reviewCount: 124,
        badge: "Best Seller",
        sizes: ["S", "M", "L"],
        featured: true
      },
      {
        name: "Flaze Premium",
        description: "Premium stainless steel design with digital temperature control and app connectivity.",
        price: "69.99",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "4.5",
        reviewCount: 89,
        badge: "New",
        sizes: ["S", "M", "L"],
        featured: true
      },
      {
        name: "Flaze Compact",
        description: "Lightweight design perfect for students and travelers. Fast heating with long battery life.",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1600453287014-2b6ec3b2c118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "4.0",
        reviewCount: 76,
        badge: null,
        sizes: ["S", "M"],
        featured: true
      },
      {
        name: "Flaze Family",
        description: "Extra-large capacity for family meals or meal prep. Multiple compartments and temperature zones.",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "4.8",
        reviewCount: 54,
        badge: null,
        sizes: ["M", "L", "XL"],
        featured: false
      },
      {
        name: "Flaze Mini",
        description: "Ultra-compact design for snacks or small meals. Perfect for short trips or commutes.",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1576013551627-0ae7d1cd5a1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "4.3",
        reviewCount: 42,
        badge: "Value Pick",
        sizes: ["XS", "S"],
        featured: false
      },
      {
        name: "Flaze Pro",
        description: "For professionals and chefs. Advanced temperature control with app integration and analytics.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1606324547087-a23a22ce2e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "4.9",
        reviewCount: 37,
        badge: "Premium",
        sizes: ["M", "L"],
        featured: false
      }
    ];
    for (const product of productList) {
      this.createProduct(product);
    }
  }
  // Product methods
  async getAllProducts() {
    return Array.from(this.products.values());
  }
  async getFeaturedProducts() {
    return Array.from(this.products.values()).filter((product) => product.featured);
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = this.currentProductId++;
    const product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Cart methods
  async getCartItems(userId) {
    if (userId) {
      return Array.from(this.cart.values()).filter((item) => item.userId === userId);
    }
    return Array.from(this.cart.values()).filter((item) => item.userId === void 0);
  }
  async addToCart(insertCartItem) {
    const existingItem = Array.from(this.cart.values()).find(
      (item) => item.productId === insertCartItem.productId && item.size === insertCartItem.size && item.userId === insertCartItem.userId
    );
    if (existingItem) {
      return this.updateCartItemQuantity(
        existingItem.id,
        existingItem.quantity + (insertCartItem.quantity || 1)
      );
    }
    const id = this.currentCartItemId++;
    const cartItem = { ...insertCartItem, id };
    this.cart.set(id, cartItem);
    return cartItem;
  }
  async updateCartItemQuantity(id, quantity) {
    const cartItem = this.cart.get(id);
    if (!cartItem) return void 0;
    const updatedItem = { ...cartItem, quantity };
    this.cart.set(id, updatedItem);
    return updatedItem;
  }
  async removeFromCart(id) {
    return this.cart.delete(id);
  }
  async clearCart(userId) {
    if (userId) {
      Array.from(this.cart.entries()).filter(([_, item]) => item.userId === userId).forEach(([id, _]) => this.cart.delete(id));
    } else {
      Array.from(this.cart.entries()).filter(([_, item]) => item.userId === void 0).forEach(([id, _]) => this.cart.delete(id));
    }
    return true;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, decimal, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull().default(0),
  badge: text("badge"),
  sizes: json("sizes").$type().notNull(),
  featured: boolean("featured").notNull().default(false)
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true
});
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  size: text("size").notNull(),
  quantity: integer("quantity").notNull().default(1)
});
var insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getAllProducts();
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
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
  app2.get("/api/cart", async (req, res) => {
    try {
      const cartItems2 = await storage.getCartItems();
      const products2 = await storage.getAllProducts();
      const cartWithDetails = await Promise.all(
        cartItems2.map(async (item) => {
          const product = products2.find((p) => p.id === item.productId);
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
  app2.post("/api/cart", async (req, res) => {
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
  app2.patch("/api/cart/:id", async (req, res) => {
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
  app2.delete("/api/cart/:id", async (req, res) => {
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
  app2.delete("/api/cart", async (req, res) => {
    try {
      await storage.clearCart();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.mjs
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  base: "/my-react-app/",
  plugins: [react(), runtimeErrorOverlay()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
