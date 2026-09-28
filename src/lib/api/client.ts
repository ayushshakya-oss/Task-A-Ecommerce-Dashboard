import { Product, Rating, SortOrder } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

interface RawProduct extends Omit<Product, "rating" | "image"> {
  image?: string;
  thumbnail?: string;
  rating?: number | Rating;
}

interface RawProductsResponse {
  products?: RawProduct[];
  total?: number;
  skip?: number;
  limit?: number;
}

function normalizeProduct(raw: RawProduct): Product {
  const rate =
    typeof raw.rating === "number"
      ? raw.rating
      : typeof raw.rating === "object" && raw.rating !== null
        ? raw.rating.rate
        : 0;

  const count =
    typeof raw.rating === "object" && raw.rating !== null
      ? raw.rating.count
      : Array.isArray(raw.reviews)
        ? raw.reviews.length
        : 0;

  const fallbackImage =
    raw.image ||
    raw.thumbnail ||
    (Array.isArray(raw.images) && raw.images.length > 0 ? raw.images[0] : "") ||
    "";

  return {
    ...raw,
    image: fallbackImage,
    thumbnail: raw.thumbnail || fallbackImage,
    rating: {
      rate,
      count,
    },
  };
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new ApiError(
        response.status,
        `Request failed with status ${response.status}: ${errorBody || response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      error instanceof Error ? error.message : "An unexpected network error occurred"
    );
  }
}

export const api = {
  getProducts: async (sort?: SortOrder): Promise<Product[]> => {
    const params = new URLSearchParams();
    params.set("limit", "100");
    if (sort) {
      params.set("sortBy", "title");
      params.set("order", sort);
      params.set("sort", sort);
    }
    const query = params.toString() ? `?${params.toString()}` : "";

    const data = await apiClient<RawProductsResponse | RawProduct[]>(`/products${query}`, {
      cache: "no-store",
    });

    const rawProducts = Array.isArray(data) ? data : data.products ?? [];
    return rawProducts.map(normalizeProduct);
  },

  getProductById: async (id: string | number): Promise<Product> => {
    const raw = await apiClient<RawProduct>(`/products/${id}`, {
      cache: "no-store",
    });
    return normalizeProduct(raw);
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const data = await apiClient<Array<string | { slug: string; name: string }>>(
        "/products/category-list",
        {
          next: { revalidate: 3600 },
        }
      );
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => (typeof item === "string" ? item : item.slug || item.name));
      }
    } catch {
      // fallback if category-list endpoint fails
    }

    const fallbackData = await apiClient<Array<string | { slug: string; name: string }>>(
      "/products/categories",
      {
        next: { revalidate: 3600 },
      }
    );

    if (Array.isArray(fallbackData)) {
      return fallbackData.map((item) =>
        typeof item === "string" ? item : item.slug || item.name
      );
    }

    return [];
  },
};
