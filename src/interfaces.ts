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
