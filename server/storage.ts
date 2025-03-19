import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  blogPosts, type BlogPost, type InsertBlogPost,
  cartItems, type CartItem, type InsertCartItem
} from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItemById(id: number): Promise<CartItem | undefined>;
  getCartItemByProductId(sessionId: string, productId: number): Promise<CartItem | undefined>;
  createCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, item: Partial<InsertCartItem>): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Shopping cart with product details
  getCartWithProducts(sessionId: string): Promise<Array<CartItem & { product: Product }>>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private cartItems: Map<number, CartItem>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentBlogPostId: number;
  private currentCartItemId: number;
  
  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.cartItems = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentBlogPostId = 1;
    this.currentCartItemId = 1;
    
    // Initialize with default admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      isAdmin: true
    });
    
    // Initialize with sample categories
    this.initializeCategories();
    
    // Initialize with sample products
    this.initializeProducts();
    
    // Initialize with sample blog posts
    this.initializeBlogPosts();
  }
  
  // Initialize sample data
  private initializeCategories() {
    const sampleCategories: InsertCategory[] = [
      {
        name: "Chăm sóc da",
        slug: "cham-soc-da",
        imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        name: "Trang điểm",
        slug: "trang-diem",
        imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        name: "Chăm sóc tóc",
        slug: "cham-soc-toc",
        imageUrl: "https://images.unsplash.com/photo-1598528738936-c50861003c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        name: "Nước hoa",
        slug: "nuoc-hoa",
        imageUrl: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      },
      {
        name: "Dụng cụ làm đẹp",
        slug: "dung-cu-lam-dep",
        imageUrl: "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      }
    ];
    
    sampleCategories.forEach(category => this.createCategory(category));
  }
  
  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Kem dưỡng ẩm cao cấp",
        slug: "kem-duong-am-cao-cap",
        description: "Kem dưỡng ẩm cao cấp giúp làn da của bạn luôn mềm mại và tràn đầy sức sống.",
        price: 500000,
        salePrice: 420000,
        imageUrl: "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        categoryId: 1,
        stock: 50,
        featured: true,
        isNew: true,
        rating: 4.5,
        numReviews: 18
      },
      {
        name: "Son môi dưỡng ẩm VN Beauty",
        slug: "son-moi-duong-am-vn-beauty",
        description: "Son môi dưỡng ẩm với công thức đặc biệt giúp môi luôn mềm mịn và căng mọng.",
        price: 300000,
        salePrice: 255000,
        imageUrl: "https://images.unsplash.com/photo-1586179253019-ac8a2522535f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        categoryId: 2,
        stock: 100,
        featured: true,
        isNew: false,
        rating: 5,
        numReviews: 32
      },
      {
        name: "Serum Vitamin C dưỡng trắng",
        slug: "serum-vitamin-c-duong-trang",
        description: "Serum Vitamin C giúp làn da trắng sáng, đều màu và ngăn ngừa lão hóa hiệu quả.",
        price: 590000,
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        categoryId: 1,
        stock: 30,
        featured: true,
        isNew: false,
        rating: 4.0,
        numReviews: 7
      },
      {
        name: "Dầu gội thảo mộc dưỡng tóc",
        slug: "dau-goi-thao-moc-duong-toc",
        description: "Dầu gội thảo mộc giúp tóc chắc khỏe, suôn mượt và giảm gãy rụng hiệu quả.",
        price: 220000,
        salePrice: 180000,
        imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        categoryId: 3,
        stock: 75,
        featured: true,
        isNew: false,
        rating: 4.5,
        numReviews: 46
      }
    ];
    
    sampleProducts.forEach(product => this.createProduct(product));
  }
  
  private initializeBlogPosts() {
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "5 bước chăm sóc da cơ bản trong mùa hè",
        slug: "5-buoc-cham-soc-da-co-ban-trong-mua-he",
        content: "Mùa hè với nắng nóng và độ ẩm cao đòi hỏi một quy trình chăm sóc da đặc biệt. Bài viết này chia sẻ 5 bước đơn giản giúp bạn bảo vệ da hiệu quả...",
        excerpt: "Mùa hè với nắng nóng và độ ẩm cao đòi hỏi một quy trình chăm sóc da đặc biệt. Bài viết này chia sẻ 5 bước đơn giản giúp bạn bảo vệ da hiệu quả...",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-06-12"),
        category: "Chăm sóc da"
      },
      {
        title: "Hướng dẫn trang điểm cơ bản cho người mới bắt đầu",
        slug: "huong-dan-trang-diem-co-ban-cho-nguoi-moi-bat-dau",
        content: "Bạn mới bắt đầu học cách trang điểm? Đừng lo lắng, bài viết này sẽ hướng dẫn bạn từng bước cơ bản nhất để có một lớp trang điểm tự nhiên và phù hợp...",
        excerpt: "Bạn mới bắt đầu học cách trang điểm? Đừng lo lắng, bài viết này sẽ hướng dẫn bạn từng bước cơ bản nhất để có một lớp trang điểm tự nhiên và phù hợp...",
        imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-06-05"),
        category: "Trang điểm"
      },
      {
        title: "Bí quyết chăm sóc tóc tự nhiên với nguyên liệu có sẵn trong nhà",
        slug: "bi-quyet-cham-soc-toc-tu-nhien-voi-nguyen-lieu-co-san-trong-nha",
        content: "Mái tóc khỏe đẹp không nhất thiết phải phụ thuộc vào các sản phẩm đắt tiền. Hãy khám phá những bí quyết chăm sóc tóc từ nguyên liệu tự nhiên...",
        excerpt: "Mái tóc khỏe đẹp không nhất thiết phải phụ thuộc vào các sản phẩm đắt tiền. Hãy khám phá những bí quyết chăm sóc tóc từ nguyên liệu tự nhiên...",
        imageUrl: "https://images.unsplash.com/photo-1598528738936-c50861003c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        publishDate: new Date("2023-05-28"),
        category: "Chăm sóc tóc"
      }
    ];
    
    sampleBlogPosts.forEach(post => this.createBlogPost(post));
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
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updatedCategory = { ...category, ...updateData };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured === true,
    );
  }
  
  async getNewProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew === true,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updateData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }
  
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const post = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }
  
  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updateData };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
  }
  
  async getCartItemById(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async getCartItemByProductId(sessionId: string, productId: number): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      (item) => item.sessionId === sessionId && item.productId === productId,
    );
  }
  
  async createCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const item = { ...insertItem, id };
    this.cartItems.set(id, item);
    return item;
  }
  
  async updateCartItem(id: number, updateData: Partial<InsertCartItem>): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, ...updateData };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
  
  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
    
    itemsToDelete.forEach(item => this.cartItems.delete(item.id));
    return true;
  }
  
  // Get cart with product details
  async getCartWithProducts(sessionId: string): Promise<Array<CartItem & { product: Product }>> {
    const cartItems = await this.getCartItems(sessionId);
    return cartItems.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      return { ...item, product };
    });
  }
}

export const storage = new MemStorage();
