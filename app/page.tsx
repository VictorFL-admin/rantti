import HeroClient from "@/components/HeroClient";
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-config";
import { getHomePageData } from "@/sanity/lib/queries";

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

async function fetchCategories(): Promise<Category[]> {
  try {
    const url = getApiUrl(API_ENDPOINTS.CATEGORIES.FEATURED);
    
    // Timeout de 5 segundos para evitar que la página se cuelgue
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache de 5 minutos
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      // Silenciar error si el endpoint no existe aún (404) o error del servidor (500)
      // En producción, las categorías son opcionales para el home
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Categories API not available: ${response.status}`);
      }
      return [];
    }

    const data: ApiResponse = await response.json();
    
    if (data.success && data.data.categories) {
      return data.data.categories;
    }
    return [];
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('Fetch timeout: La API tardó más de 5 segundos');
    } else {
      console.error('Error fetching categories:', err);
    }
    return []; // Devuelve vacío, la página carga sin categorías
  }
}

export default async function Home() {
  // Obtener datos de Sanity y categorías del backend en paralelo
  const [sanityData, categories] = await Promise.all([
    getHomePageData(),
    fetchCategories()
  ]);

  return (
    <main className="min-h-screen bg-white">
      <HeroClient 
        categories={categories} 
        sanityData={sanityData}
      />
    </main>
  );
}
