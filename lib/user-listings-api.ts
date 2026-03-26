// API client para publicaciones del usuario
import { getApiUrl } from './api-config';
import { API_ENDPOINTS } from './api-config';

// Tipos TypeScript
export interface UserListingImage {
  id: number;
  url: string;
  thumbnail_url?: string;
  is_primary: boolean;
  order: number;
}

export interface UserListing {
  id: number;
  title: string;
  slug?: string;
  type: 'venta' | 'compra'; // Backend usa minúsculas
  listing_type?: 'VENTA' | 'COMPRA'; // Alias para compatibilidad
  status: string; // Backend: "publicado", "vendido", "borrador", etc.
  created_at: string;
  updated_at: string;
  views_count: number;
  favorites_count?: number;
  
  // Pricing
  currency: string;
  price: string; // Backend devuelve string "2400.00"
  current_price?: number; // Alias para compatibilidad
  original_price?: number;
  discount_percentage?: number;
  is_negotiable?: boolean;
  formatted_price?: string;
  
  // Location & Description
  location?: string;
  description?: string;
  category_id?: number;
  
  // Images
  images: UserListingImage[];
  primary_image?: string; // URL de la imagen principal
  
  // Metadata
  days_active?: number;
  unread_messages_count?: number;
  total_offers_count?: number;
  offers_count?: number; // Backend usa "offers_count"
}

export interface UserListingsResponse {
  success: boolean;
  data: {
    data: UserListing[]; // Paginación Laravel: data.data
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
}

export type ListingType = 'COMPRA' | 'VENTA';
export type ListingStatus = 'active' | 'sold' | 'draft' | 'expired' | 'deleted';

// Función helper para obtener headers de autenticación
const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// 1. Obtener publicaciones del usuario con filtros
export const fetchUserListings = async (
  type?: ListingType,
  status?: ListingStatus,
  page: number = 1
): Promise<UserListingsResponse> => {
  try {
    const params = new URLSearchParams();
    
    if (type) params.append('type', type.toLowerCase());
    if (status) params.append('status', status);
    params.append('page', page.toString());

    const queryString = params.toString();
    const url = queryString 
      ? `${API_ENDPOINTS.LISTINGS.USER_LISTINGS}?${queryString}`
      : API_ENDPOINTS.LISTINGS.USER_LISTINGS;

    const response = await fetch(getApiUrl(url), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching user listings:', error);
    throw error;
  }
};

// 2. Marcar publicación como vendida
export const markAsSold = async (listingId: number): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(getApiUrl(`${API_ENDPOINTS.LISTINGS.USER_LISTINGS}/${listingId}/mark-sold`), {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error marking as sold:', error);
    throw error;
  }
};

// 3. Repostear publicación (bump/refresh)
export const repostListing = async (listingId: number): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(getApiUrl(`${API_ENDPOINTS.LISTINGS.USER_LISTINGS}/${listingId}/repost`), {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error reposting listing:', error);
    throw error;
  }
};

// 4. Eliminar publicación
export const deleteListing = async (listingId: number): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(getApiUrl(`${API_ENDPOINTS.LISTINGS.USER_LISTINGS}/${listingId}`), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error deleting listing:', error);
    throw error;
  }
};

export const UserListingsAPI = {
  fetchUserListings,
  markAsSold,
  repostListing,
  deleteListing,
};
