"use client";

import { useState, useEffect } from "react";
import { Watch, Gem, Palette, Gamepad2, Smartphone, PopularIcon } from "../lib/icons";
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-config";
import { motion } from "framer-motion";

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

// Mapeo de íconos por emoji
const iconMap: { [key: string]: any } = {
  "💎": Gem,
  "⌚": Watch,
  "📦": Watch,
  "🎨": Palette,
  "🎮": Gamepad2,
  "📱": Smartphone,
  "✨": Gem,
};

// Imágenes por categoría (puedes personalizarlas según el slug)
const categoryImages: { [key: string]: string } = {
  "joyas-exclusivas": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "relojes-de-lujo": "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjIxMDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "arte-coleccionables": "https://images.unsplash.com/photo-1561214115-f2f134cc4912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "consolas-retro": "https://images.unsplash.com/photo-1486401899868-0e435ed85128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "tech-premium": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "objetos-unicos": "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

// Gradientes por categoría
const categoryGradients: { [key: string]: string } = {
  "joyas-exclusivas": "from-purple-500/80 to-pink-500/80",
  "relojes-de-lujo": "from-blue-500/80 to-cyan-500/80",
  "arte-coleccionables": "from-orange-500/80 to-red-500/80",
  "consolas-retro": "from-green-500/80 to-emerald-500/80",
  "tech-premium": "from-cyan-500/80 to-blue-500/80",
  "objetos-unicos": "from-yellow-500/80 to-orange-500/80",
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const url = getApiUrl(API_ENDPOINTS.CATEGORIES.FEATURED);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        if (data.success && data.data.categories) {
          setCategories(data.data.categories);
        } else {
          throw new Error('Formato de respuesta inválido');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
              <span className="text-sm text-[#0047FF]">Categorías Populares</span>
            </div>
            <h2 className="text-gray-900 mb-4">
              ¿Qué estás buscando <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">hoy</span>?
            </h2>
            <p className="text-gray-600 mb-8">Cargando categorías...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0047FF]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 relative overflow-hidden">;
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div 
            className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-sm text-[#0047FF]">Categorías Populares</span>
          </motion.div>
          <h2 className="text-gray-900 mb-4">
            ¿Qué estás buscando <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">hoy</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Objetos únicos de alto valor. Desde joyas exclusivas hasta tecnología premium.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
        >
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Gem;
            const image = categoryImages[category.slug] || categoryImages["objetos-unicos"];
            const gradient = categoryGradients[category.slug] || "from-blue-500/80 to-cyan-500/80";
            const isTrending = category.active_listings > 0;

            return (
              <motion.div
                key={category.id}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      ease: [0.25, 0.4, 0.25, 1]
                    }
                  }
                }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              >
                {/* Background image */}
                <img
                  src={image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} mix-blend-multiply`}></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

                {/* Trending badge */}
                {isTrending && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full">
                    <PopularIcon className="w-5 h-2 text-yellow-900" />
                    <span className="text-xs text-yellow-900">Popular</span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top: Icon */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Bottom: Info */}
                  <div className="transform group-hover:translate-y-[-8px] transition-transform duration-300">
                    <h3 className="text-white text-xl mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        {category.active_listings}+ disponibles
                      </p>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-gray-900">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 rounded-2xl transition-colors duration-300"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
