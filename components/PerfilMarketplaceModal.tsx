import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { X, Star, Package } from "lucide-react";
import svgPaths from "../imports/svg-peqj1oeayz";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";
import { apiGet } from "@/lib/api-client";

interface SellerListing {
  id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  image: string | null;
  listing_type: string;
}

interface PerfilMarketplaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { name: string; avatar?: string; memberSince?: string; email?: string };
  sellerId?: number;
  onSendMessage?: () => void;
}

export default function PerfilMarketplaceModal({ open, onOpenChange, user, sellerId, onSendMessage }: PerfilMarketplaceModalProps) {
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'comprador' | 'vendedor'>('vendedor');
  const [isFollowing, setIsFollowing] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const firstName = user.name.split(" ")[0];

  const memberSinceText = user.memberSince
    ? new Date(user.memberSince).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    : null;

  const fetchSellerListings = useCallback(async () => {
    if (!sellerId) return;
    setLoadingListings(true);
    try {
      const url = getApiUrl(`${API_ENDPOINTS.LISTINGS.PUBLIC}?seller_id=${sellerId}&per_page=6`);
      const response = await apiGet(url);
      if (!response.ok) return;
      const data = await response.json();
      let result: SellerListing[] = [];
      if (data?.data?.listings) {
        result = data.data.listings;
      } else if (Array.isArray(data)) {
        result = data;
      }
      setListings(result);
    } catch {
      setListings([]);
    } finally {
      setLoadingListings(false);
    }
  }, [sellerId]);

  useEffect(() => {
    if (open && sellerId) {
      fetchSellerListings();
      setActiveProfileTab('vendedor');
      setIsFollowing(false);
    } else if (!open) {
      setListings([]);
    }
  }, [open, sellerId, fetchSellerListings]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 bg-[#f9fafb] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
        <VisuallyHidden>
          <DialogTitle>Perfil de Marketplace</DialogTitle>
          <DialogDescription>
            Perfil de {user.name} en el marketplace de Rantti.
          </DialogDescription>
        </VisuallyHidden>

        {/* Botón cerrar personalizado */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="w-full pb-8">
          {/* Banner Superior */}
          <div className="h-[180px] md:h-[240px] w-full bg-[rgba(217,217,217,0.55)] relative" />

          {/* Avatar */}
          <div className="absolute left-6 md:left-10 top-[120px] md:top-[160px] w-[100px] h-[100px] md:w-[140px] md:h-[140px]">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-4 border-[#0047FF]"
              />
            ) : (
              <>
                <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176 176">
                  <circle cx="88" cy="88" fill="#0047FF" r="88" />
                </svg>
                <p className="absolute inset-0 flex items-center justify-center font-['Poppins',sans-serif] text-[40px] md:text-[56px] text-white">
                  {getInitials(user.name)}
                </p>
              </>
            )}
          </div>

          {/* Contenedor principal */}
          <div className="px-6 md:px-10 pt-[70px] md:pt-[90px] space-y-5">
            {/* Nombre y fecha */}
            <div>
              <h2 className="font-['Poppins',sans-serif] text-lg md:text-2xl text-black mb-1">
                {user.name}
              </h2>
              {memberSinceText && (
                <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-[#546a88]">
                  Miembro desde {memberSinceText}
                </p>
              )}
            </div>

            {/* Tabs y botones */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Tabs Comprador/Vendedor */}
              <div className="flex gap-6">
                {(['comprador', 'vendedor'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveProfileTab(tab)}
                    className="flex flex-col items-start cursor-pointer"
                  >
                    <p className={`font-['Poppins',sans-serif] text-sm md:text-base capitalize transition-colors ${
                      activeProfileTab === tab
                        ? 'font-medium text-[#111827]'
                        : 'text-[#546a88] hover:text-[#374151]'
                    }`}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </p>
                    <div className={`h-[2px] w-full mt-1 transition-all ${
                      activeProfileTab === tab ? 'bg-[#0047FF]' : 'bg-transparent'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Botón Enviar Mensaje */}
              <button
                onClick={() => {
                  if (onSendMessage) {
                    onOpenChange(false);
                    onSendMessage();
                  }
                }}
                disabled={!onSendMessage}
                className="cursor-pointer bg-white h-[36px] rounded-lg px-5 border border-[#314158] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <p className="font-['Poppins',sans-serif] font-medium text-xs md:text-sm text-[#2e3a4b]">Enviar Mensaje</p>
              </button>
            </div>

            {/* Botón Seguir */}
            <button
              onClick={() => setIsFollowing((prev) => !prev)}
              className={`cursor-pointer h-[38px] rounded-lg w-full sm:w-auto sm:min-w-[300px] flex items-center justify-center transition-colors border ${
                isFollowing
                  ? 'bg-white border-[#0047FF] hover:bg-blue-50'
                  : 'bg-[#0047ff] border-[#0047ff] hover:bg-[#0039CC]'
              }`}
            >
              <p className={`font-['Poppins',sans-serif] text-sm md:text-base ${isFollowing ? 'text-[#0047FF]' : 'text-white'}`}>
                {isFollowing ? 'Siguiendo ✓' : 'Seguir'}
              </p>
            </button>

            {/* Grid de Cards - Calificaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card: Calificaciones como vendedor */}
              <div className="bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.15)] shadow-sm p-5 flex flex-col justify-center min-h-[140px]">
                <p className="font-['Poppins',sans-serif] text-sm md:text-base text-black mb-1">
                  Calificaciones como vendedor
                </p>
                <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs text-[#546a88] mb-3">
                  Aún no hay calificaciones
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5" fill="#e5e7eb" stroke="#e5e7eb" strokeWidth={1} />
                  ))}
                </div>
              </div>

              {/* Card: Sin reseñas aún */}
              <div className="bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.15)] shadow-sm p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
                <Star className="w-8 h-8 text-gray-200 mb-2" fill="#e5e7eb" strokeWidth={0} />
                <p className="font-['Poppins',sans-serif] text-sm text-[#546a88]">
                  Aún no hay reseñas
                </p>
                <p className="font-['Poppins',sans-serif] text-[10px] text-[#9ca3af] mt-1">
                  Las reseñas aparecerán aquí después de completar transacciones
                </p>
              </div>
            </div>

            {/* Card: Publicaciones del vendedor/comprador */}
            <div className="bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.15)] shadow-sm p-5">
              {(() => {
                const typeFilter = activeProfileTab === 'vendedor' ? 'VENTA' : 'COMPRA';
                const filtered = listings.filter((l) => l.listing_type === typeFilter);
                const tabLabel = activeProfileTab === 'vendedor' ? 'vendedor' : 'comprador';
                const emptyLabel = activeProfileTab === 'vendedor'
                  ? `${firstName} no tiene artículos en venta`
                  : `${firstName} no tiene búsquedas activas`;

                return (
                  <>
                    <p className="font-['Poppins',sans-serif] text-sm md:text-base text-black mb-1">
                      {activeProfileTab === 'vendedor' ? `Artículos en venta de ${firstName}` : `${firstName} está buscando`}
                    </p>
                    <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs text-[#546a88] mb-4">
                      {loadingListings
                        ? 'Cargando...'
                        : filtered.length === 0
                          ? `Sin publicaciones como ${tabLabel}`
                          : `${filtered.length} publicación${filtered.length !== 1 ? 'es' : ''} activa${filtered.length !== 1 ? 's' : ''}`}
                    </p>

                    {loadingListings ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047FF]" />
                      </div>
                    ) : filtered.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Package className="w-10 h-10 text-gray-200 mb-2" />
                        <p className="font-['Poppins',sans-serif] text-sm text-[#546a88]">
                          {emptyLabel}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {filtered.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-white rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md border border-[rgba(0,0,0,0.15)] shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-[140px] overflow-hidden bg-gray-100">
                        {listing.image ? (
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Package className="w-8 h-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-black mb-2 line-clamp-2">
                          {listing.title}
                        </p>
                        <p className="font-['Poppins',sans-serif] text-base md:text-lg text-[#0047ff] mb-2 font-semibold">
                          {listing.currency} {listing.price.toLocaleString('es-PE')}
                        </p>
                        {listing.location && (
                          <div className="flex items-center gap-1 text-[#546a88]">
                            <svg width="8" height="12" fill="none" viewBox="0 0 10 15">
                              <g clipPath="url(#clip0_575_204)">
                                <path d={svgPaths.p2aa6c00} fill="#8B9CB4" />
                                <path d={svgPaths.p1821f8f0} fill="#8B9CB4" />
                              </g>
                              <defs>
                                <clipPath id="clip0_575_204">
                                  <rect fill="white" height="15" width="10" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs">
                              {listing.location}
                            </p>
                          </div>
                        )}
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
