"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, X } from "@/lib/icons";
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-config";
import type { Listing } from "@/lib/types/listings";

interface Category {
  id: number;
  name: string;
  slug: string;
  active_listings: number;
  icon: string;
}

interface SearchBarProps {
  onClose: () => void;
  categories?: Category[];
}

export default function SearchBar({ onClose, categories = [] }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  // Foco automático al montar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);


  // Búsqueda con debounce
  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const url = getApiUrl(`${API_ENDPOINTS.LISTINGS.PUBLIC}?search=${encodeURIComponent(q)}&per_page=6`);
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return;
      const data = await res.json();
      const listings: Listing[] = data?.data?.listings ?? data?.data ?? [];
      setResults(Array.isArray(listings) ? listings.slice(0, 6) : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  const goToListing = (id: number) => {
    onClose();
    router.push(`/listing/${id}`);
  };

  const showCategories = !query.trim() && categories.length > 0;
  const showResults = query.trim().length > 0;

  return (
    <div className="w-full" ref={containerRef}>
      {/* Input */}
      <div className="relative flex items-center bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <SearchIcon className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Busca joyas, relojes, tech..."
          className="w-full pl-11 pr-10 py-3.5 text-sm font-['Poppins',sans-serif] text-gray-800 placeholder-gray-400 outline-none bg-transparent"
        />
        <button
          onClick={onClose}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown */}
      {(showCategories || showResults) && (
        <div className="mt-1 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">

          {/* Categorías sugeridas (sin texto) */}
          {showCategories && (
            <div className="p-3">
              <p className="text-xs font-['Poppins',sans-serif] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Categorías populares
              </p>
              <div className="flex flex-col">
                {categories.slice(0, 5).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setQuery(cat.name);
                    }}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-lg leading-none">{cat.icon}</span>
                    <span className="text-sm font-['Poppins',sans-serif] text-gray-700">{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-400">{cat.active_listings} activos</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultados de búsqueda */}
          {showResults && (
            <div className="p-3">
              {loading && (
                <div className="flex items-center justify-center py-6">
                  <div className="w-5 h-5 border-2 border-[#0047FF] border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!loading && results.length === 0 && (
                <p className="text-sm font-['Poppins',sans-serif] text-gray-500 text-center py-6">
                  Sin resultados para &ldquo;{query}&rdquo;
                </p>
              )}

              {!loading && results.length > 0 && (
                <>
                  <p className="text-xs font-['Poppins',sans-serif] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                    Resultados
                  </p>
                  <div className="flex flex-col">
                    {results.map(listing => (
                      <button
                        key={listing.id}
                        onClick={() => goToListing(listing.id)}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <img
                          src={listing.image || "/images/placeholder.jpg"}
                          alt={listing.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-['Poppins',sans-serif] font-medium text-gray-800 truncate">
                            {listing.title}
                          </p>
                          <p className="text-xs text-gray-500 font-['Poppins',sans-serif]">
                            {listing.category?.name}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-['Poppins',sans-serif] font-semibold text-[#0047FF]">
                            {listing.currency} {listing.price.toLocaleString("es-PE")}
                          </p>
                          <span className={`text-xs font-['Poppins',sans-serif] ${listing.listing_type === "VENTA" ? "text-green-600" : "text-purple-600"}`}>
                            {listing.listing_type === "VENTA" ? "Venta" : "Compra"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
