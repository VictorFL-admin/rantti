'use client';

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, MoreHorizontal, Share2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { UserListingsAPI, type UserListing } from "@/lib/user-listings-api";
import { toast } from "sonner";

interface TusPublicacionesProps {
  refreshTrigger?: number;
}

export default function TusPublicacionesContent({ refreshTrigger }: TusPublicacionesProps) {
  const [listings, setListings] = useState<UserListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar TODAS las publicaciones del usuario (venta y compra)
  useEffect(() => {
    loadAllListings();
  }, [refreshTrigger]);

  const loadAllListings = async () => {
    try {
      setLoading(true);
      
      // Cargar todas las publicaciones sin filtro de tipo
      const response = await UserListingsAPI.fetchUserListings();
      
      // Backend devuelve data.data (paginación Laravel)
      const allListings = response.data?.data || response.data || [];
      setListings(Array.isArray(allListings) ? allListings : []);
    } catch (error) {
      console.error('Error loading listings:', error);
      toast.error('Error al cargar publicaciones', {
        icon: <AlertCircle className="w-5 h-5" />
      });
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSold = async (listingId: number) => {
    try {
      await UserListingsAPI.markAsSold(listingId);
      toast.success('Publicación marcada como vendida', {
        icon: <CheckCircle2 className="w-5 h-5" />
      });
      loadAllListings(); // Recargar
    } catch (error) {
      toast.error('Error al marcar como vendida', {
        icon: <AlertCircle className="w-5 h-5" />
      });
    }
  };

  const handleBoostListing = async (listingId: number) => {
    try {
      await UserListingsAPI.repostListing(listingId);
      toast.success('Publicación impulsada exitosamente', {
        icon: <CheckCircle2 className="w-5 h-5" />
      });
      loadAllListings();
    } catch (error) {
      toast.error('Error al impulsar publicación', {
        icon: <AlertCircle className="w-5 h-5" />
      });
    }
  };

  // Filtrar publicaciones por búsqueda
  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para obtener el badge de estado
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { text: string; color: string }> = {
      'publicado': { text: 'Disponible - Publicado', color: 'text-green-600 bg-green-50' },
      'vendido': { text: 'Vendido', color: 'text-gray-600 bg-gray-100' },
      'agotado': { text: 'Agotado', color: 'text-red-600 bg-red-50' },
      'borrador': { text: 'Borrador', color: 'text-yellow-600 bg-yellow-50' },
      'pendiente': { text: 'En Moderación', color: 'text-blue-600 bg-blue-50' },
      'expirado': { text: 'Expirado', color: 'text-orange-600 bg-orange-50' },
    };
    return statusMap[status] || { text: status, color: 'text-gray-600 bg-gray-100' };
  };

  return (
    <div className="space-y-6">
      {/* Card de Información Superior */}
      <Card className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-['Poppins',sans-serif] text-lg font-semibold text-gray-900 mb-2">
          Mantén tus publicaciones actualizadas
        </h3>
        <p className="font-['Poppins',sans-serif] text-sm text-gray-600 mb-4">
          Marca los artículos como vendidos para reducir los mensajes no deseados y garantizar la transparencia a los compradores potenciales.
        </p>
        <Button className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg py-2.5">
          Más información
        </Button>
      </Card>

      {/* Header con Título y Búsqueda */}
      <Card className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-['Poppins',sans-serif] text-xl font-semibold text-gray-900">
            Tus Publicaciones
          </h2>
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar en tus publicaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando tus publicaciones...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredListings.length === 0 && (
        <Card className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-gray-500 mb-2">
            {searchQuery ? 'No se encontraron publicaciones' : 'Aún no tienes publicaciones'}
          </p>
          {!searchQuery && (
            <p className="text-sm text-gray-400">
              Crea tu primera publicación usando el botón "Nueva Publicación"
            </p>
          )}
        </Card>
      )}

      {/* Lista de Productos */}
      <div className="space-y-4">
        {filteredListings.map((listing) => {
          const statusInfo = getStatusBadge(listing.status);
          const primaryImage = listing.images?.find(img => img.is_primary)?.url || listing.images?.[0]?.url;
          
          return (
          <Card 
            key={listing.id} 
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Imagen del producto */}
              <div className="shrink-0 w-full md:w-48 h-48 bg-gradient-to-br from-purple-100 to-gray-100 rounded-xl overflow-hidden">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                {listing.days_active && listing.days_active > 30 && listing.status === 'publicado' && (
                  <p className="font-['Poppins',sans-serif] text-sm text-[#0047FF] font-medium mb-2">
                    Sugerencia: ¿Renovar la publicación?
                  </p>
                )}
                
                {/* Badge de tipo */}
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-2 ${
                  listing.type === 'venta' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {listing.type === 'venta' ? '🏷️ VENTA' : '🛒 COMPRA'}
                </span>
                
                <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-gray-900 mb-3">
                  {listing.title}
                </h3>
                <p className="font-['Poppins',sans-serif] text-2xl font-bold text-[#0047FF] mb-3">
                  {listing.currency} {parseFloat(listing.price).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
                <div className="space-y-1 mb-4">
                  <p className={`font-['Poppins',sans-serif] text-xs font-medium ${statusInfo.color} inline-block px-2 py-1 rounded`}>
                    {statusInfo.text}
                  </p>
                  <p className="font-['Poppins',sans-serif] text-xs text-gray-500">
                    {listing.days_active !== undefined ? `${listing.days_active} días en publicación` : 'Recién publicado'} • {listing.views_count || 0} vistas
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-wrap gap-2">
                  {listing.status === 'publicado' && listing.type === 'venta' && (
                    <Button 
                      onClick={() => handleMarkAsSold(listing.id)}
                      className="bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2"
                    >
                      Marcar como vendido
                    </Button>
                  )}
                  {listing.status === 'publicado' && (
                    <Button 
                      onClick={() => handleBoostListing(listing.id)}
                      variant="outline" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2"
                    >
                      Impulsar publicación
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Compartir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
