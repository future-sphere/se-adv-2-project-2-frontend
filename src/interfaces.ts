export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category: Category;
  thumbnailImage: string;
  reviews: Review[];
  description: string;
  productHighlights: ProductHighlight[];
  highlightTitle: string;
  highlightDescription: string;
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
  title: string;
  products: Product[];
  description: string;
  thumbnailImageUrl: string;
  heroImageUrl: string;
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
