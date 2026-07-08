"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/lib/icons";
import { MapPin, Eye, Heart, Shield, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { isAuthenticated } from "@/lib/auth";
import type { ListingDetails } from "@/lib/types/listings";

interface Props {
  listing: ListingDetails;
}

const logoImage = "/images/logo_rantti.png";

export default function ListingDetailClient({ listing }: Props) {
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);

  const images = listing.images?.length
    ? listing.images.sort((a, b) => a.order - b.order)
    : [{ id: 0, url: "/images/placeholder.jpg", is_primary: true, order: 0 }];

  const price = listing.pricing.formatted?.current
    ?? `${listing.pricing.currency} ${listing.pricing.current_price.toLocaleString("es-PE")}`;

  const memberSince = listing.seller?.member_since
    ? new Date(listing.seller.member_since).getFullYear()
    : null;

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins',sans-serif]">
      {/* Navbar simple */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="hover:opacity-80 transition-opacity">
            <img src={logoImage} alt="Rantti" className="h-7 object-contain" />
          </button>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Galería */}
          <div className="space-y-3">
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 aspect-square">
              <img
                src={images[activeImg].url}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => Math.max(0, i - 1))}
                    disabled={activeImg === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow disabled:opacity-30 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => Math.min(images.length - 1, i + 1))}
                    disabled={activeImg === images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow disabled:opacity-30 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <div className="absolute top-3 left-3">
                <Badge className={listing.listing_type === "VENTA"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-purple-100 text-purple-700 border-purple-200"
                }>
                  {listing.listing_type === "VENTA" ? "En venta" : "Busco comprar"}
                </Badge>
              </div>
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImg === i ? "border-[#0047FF]" : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <img src={img.thumbnail_url ?? img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            {/* Categoría + título */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {listing.category.name}
              </p>
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{listing.title}</h1>
            </div>

            {/* Precio */}
            <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Precio</p>
                <p className="text-3xl font-bold text-[#0047FF]">{price}</p>
                {listing.pricing.is_negotiable && (
                  <p className="text-xs text-gray-500 mt-1">Precio negociable</p>
                )}
              </div>
              {listing.pricing.discount_percentage && listing.pricing.discount_percentage > 0 && (
                <Badge className="bg-red-100 text-red-600 border-red-200 text-sm">
                  -{listing.pricing.discount_percentage}%
                </Badge>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {listing.location.formatted}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {listing.views_count} vistas
              </span>
              {listing.favorites_count > 0 && (
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {listing.favorites_count}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push(isAuthenticated() ? "/dashboard" : "/login")}
                className="flex-1 bg-[#0047FF] hover:bg-[#0039CC] text-white h-12 text-sm shadow-lg shadow-[#0047FF]/30"
              >
                Hacer una oferta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(isAuthenticated() ? "/dashboard" : "/login")}
                className="flex-1 h-12 text-sm border-gray-200"
              >
                Contactar vendedor
              </Button>
            </div>

            {/* Seguridad */}
            {listing.security && (
              <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl p-3 text-sm text-green-700">
                <Shield className="w-4 h-4 mt-0.5 shrink-0" />
                <p>{listing.security.message}</p>
              </div>
            )}

            {/* Descripción */}
            {listing.description && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Especificaciones */}
            {listing.specifications && listing.specifications.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Especificaciones</h2>
                <div className="grid grid-cols-2 gap-2">
                  {listing.specifications.map((spec, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-100 p-3">
                      <p className="text-xs text-gray-400">{spec.label}</p>
                      <p className="text-sm font-medium text-gray-800">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vendedor */}
            {listing.seller && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Publicado por</h2>
                <div className="flex items-center gap-3">
                  {listing.seller.avatar ? (
                    <img src={listing.seller.avatar} alt={listing.seller.name} className="w-11 h-11 rounded-full object-cover" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#0047FF] flex items-center justify-center text-white font-bold text-sm">
                      {listing.seller.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900">{listing.seller.name}</p>
                      {listing.seller.is_verified && (
                        <Shield className="w-3.5 h-3.5 text-[#0047FF]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {listing.seller.stats.rating.toFixed(1)}
                      </span>
                      {memberSince && (
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          Desde {memberSince}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
