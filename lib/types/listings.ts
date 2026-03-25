// Types for Listings API - "Explorar Hoy" Dashboard

export interface ListingCategory {
  id: number;
  name: string;
  slug?: string;
  icon?: string;
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

// Types for Listing Details
export interface ListingImage {
  id: number;
  url: string;
  thumbnail_url?: string;
  is_primary: boolean;
  order: number;
}

export interface ListingPricing {
  currency: string;
  original_price?: number;
  current_price: number;
  discount_percentage?: number;
  is_negotiable: boolean;
  formatted?: {
    original?: string;
    current: string;
    discount?: string;
  };
}

export interface ListingLocation {
  city: string;
  state?: string;
  country: string;
  formatted: string;
}

export interface SellerStats {
  rating: number;
  total_reviews: number;
  successful_sales: number;
  response_rate: number;
  avg_response_time_hours: number;
  active_listings?: number;
  completed_transactions?: number;
}

export interface Seller {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  is_verified: boolean;
  member_since: string;
  stats: SellerStats;
  profile_url?: string;
  is_online?: boolean;
  last_seen_at?: string;
}

export interface ListingConditions {
  text?: string;
  availability_date?: string;
  payment_methods?: string[];
  delivery_options?: string[];
}

export interface Specification {
  label: string;
  value: string;
}

export interface SecurityInfo {
  is_transaction_protected: boolean;
  escrow_available?: boolean;
  seller_verified: boolean;
  message: string;
}

export interface MetaPermissions {
  can_edit: boolean;
  can_delete: boolean;
  can_make_offer: boolean;
  can_contact: boolean;
  is_owner: boolean;
}

export interface ListingDetails {
  id: number;
  title: string;
  slug?: string;
  listing_type: 'VENTA' | 'COMPRA';
  status: string;
  created_at: string;
  updated_at: string;
  views_count: number;
  favorites_count: number;
  is_favorited_by_user?: boolean;
  
  category: ListingCategory;
  pricing: ListingPricing;
  location: ListingLocation;
  description: string;
  images: ListingImage[];
  conditions?: ListingConditions;
  seller: Seller;
  specifications?: Specification[];
  security?: SecurityInfo;
  related_listings?: Listing[];
  meta?: MetaPermissions;
}

export interface ListingDetailsResponse {
  success: boolean;
  data: {
    listing: ListingDetails;
  };
}
