export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  category: Category;
  subCategory: SubCategory;
  thumbnailImage: string;
  reviews: Review[];
  description: string;
  productHighlights: ProductHighlight[];
  highlightTitle: string;
  highlightDescription: string;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: Product['id'];
  quantity: number;
  product: Product;
}

export interface Cart {
  createdAt: Date;
  id: number;
  studentId: number;
  cartItems: CartItem[];
}

export interface Order {
  id: number;
  student: Student;
  studentId: number;
  createdAt: Date;
  cart: Cart;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  card: {
    last4: string;
    brand: string;
    funding: string;
  };
}

export interface ShippingAddress {
  id: string;
  streetAddress: String;
  city: String;
  state: String;
  zipCode: String;
}

export interface ProductHighlight {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  product: Product;
  productId: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  product: Product;
  productId: number;
  student: Student;
}

export interface Category {
  id: number;
  slug: string;
  title: string;
  products: Product[];
  description: string;
  thumbnailImageUrl: string;
  heroImageUrl: string;
  subCategory: SubCategory[];
}

export interface SubCategory {
  id: string;
  title: string;
  slug: string;
  category: Category;
  categoryId: string;
  products: Product[];
  thumbnailImageUrl: string;
}

export interface Student {
  id: number;
  email: string;
  avatar: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  grade: number;
  reviews: Review[];
}
