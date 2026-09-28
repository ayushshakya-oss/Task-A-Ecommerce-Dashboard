export interface Rating {
  rate: number;
  count: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  thumbnail?: string;
  images?: string[];
  discountPercentage?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: ProductMeta;
}

export type SortOrder = "asc" | "desc";

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
