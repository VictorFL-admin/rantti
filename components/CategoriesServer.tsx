import { getApiUrl, API_ENDPOINTS } from "@/lib/api-config";
import CategoriesClient from "./CategoriesClient";

// Tipos para la respuesta de la API
interface Category {
  id: number;
  name: string;
  slug: string;
  active_listings: number;
  icon: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

async function fetchCategories(): Promise<{ categories: Category[]; error: string | null }> {
  try {
    const url = getApiUrl(API_ENDPOINTS.CATEGORIES.FEATURED);
    const response = await fetch(url, {
      next: { revalidate: 300 } // Revalidar cada 5 minutos
    });
    
    if (!response.ok) {
      console.error(`Error fetching categories: ${response.status}`);
      return { categories: [], error: `Error: ${response.status}` };
    }

    const data: ApiResponse = await response.json();
    
    if (data.success && data.data.categories) {
      return { categories: data.data.categories, error: null };
    } else {
      return { categories: [], error: 'Formato de respuesta inválido' };
    }
  } catch (err) {
    console.error('Error fetching categories:', err);
    return { categories: [], error: err instanceof Error ? err.message : 'Error al cargar categorías' };
  }
}

export default async function CategoriesServer() {
  const { categories, error } = await fetchCategories();
  
  return <CategoriesClient categories={categories} error={error} />;
}
