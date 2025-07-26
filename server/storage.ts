import { 
  products, users, cartItems, 
  type Product, type InsertProduct, 
  type User, type InsertUser,
  type CartItem, type InsertCartItem
} from "@shared/schema";

export interface IStorage {
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Cart methods
  getCartItems(userId?: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId?: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cart: Map<number, CartItem>;
  
  currentUserId: number;
  currentProductId: number;
  currentCartItemId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cart = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;

    // Initialize with some products
    this.seedProducts();
  }

  private seedProducts() {
    const productList: InsertProduct[] = [
      {
        name: "Flaze Classic",
        description: "Perfect for office workers. Three compartments with independent temperature control.",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        rating: "5.0",
        reviewCount: 124,
        badge: "Best Seller",
        sizes: ["S", "M", "L"],
        featured: true,
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
        featured: true,
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
        featured: true,
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
        featured: false,
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
        featured: false,
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
        featured: false,
      },
    ];

    for (const product of productList) {
      this.createProduct(product);
    }
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Cart methods
  async getCartItems(userId?: number): Promise<CartItem[]> {
    if (userId) {
      return Array.from(this.cart.values()).filter(item => item.userId === userId);
    }
    return Array.from(this.cart.values()).filter(item => item.userId === undefined);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the same product and size combo exists for the user
    const existingItem = Array.from(this.cart.values()).find(
      item => 
        item.productId === insertCartItem.productId && 
        item.size === insertCartItem.size &&
        item.userId === insertCartItem.userId
    );

    if (existingItem) {
      // Update quantity of existing item
      return this.updateCartItemQuantity(
        existingItem.id, 
        existingItem.quantity + (insertCartItem.quantity || 1)
      ) as Promise<CartItem>;
    }

    // Otherwise create a new cart item
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cart.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cart.get(id);
    if (!cartItem) return undefined;

    const updatedItem = { ...cartItem, quantity };
    this.cart.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cart.delete(id);
  }

  async clearCart(userId?: number): Promise<boolean> {
    if (userId) {
      // Clear only items for this user
      Array.from(this.cart.entries())
        .filter(([_, item]) => item.userId === userId)
        .forEach(([id, _]) => this.cart.delete(id));
    } else {
      // Clear guest cart items
      Array.from(this.cart.entries())
        .filter(([_, item]) => item.userId === undefined)
        .forEach(([id, _]) => this.cart.delete(id));
    }
    return true;
  }
}

export const storage = new MemStorage();
