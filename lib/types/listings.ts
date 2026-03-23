// Types for Listings API - "Explorar Hoy" Dashboard

export interface ListingCategory {
  id: number;
  name: string;
}

export interface Listing {
  id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  category: ListingCategory;
  listing_type: 'VENTA' | 'COMPRA';
  views: number;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ListingsResponse {
  success: boolean;
  data: {
    listings: Listing[];
    pagination: Pagination;
  };
}
