'use client';

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState, useEffect } from "react";
import { UserListingsAPI, type UserListing } from "@/lib/user-listings-api";
import { toast } from "sonner";

interface ActividadRecienteContentProps {
  user: { email: string; name: string; avatar?: string };
  onOpenPerfilModal: () => void;
}

export default function ActividadRecienteContent({ user, onOpenPerfilModal }: ActividadRecienteContentProps) {
  const [listings, setListings] = useState<UserListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [repostingId, setRepostingId] = useState<number | null>(null);

  // Cargar publicaciones de COMPRA del usuario
  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setLoading(true);
      // Backend usa 'compra' en minúsculas y no necesitamos filtrar por status
      const response = await UserListingsAPI.fetchUserListings('COMPRA');
      
      // Backend devuelve data.data (paginación Laravel)
      const listingsData = response.data?.data || response.data || [];
      setListings(Array.isArray(listingsData) ? listingsData : []);
    } catch (error) {
      console.error('Error loading purchase listings:', error);
      toast.error('Error al cargar publicaciones');
      setListings([]); // Asegurar array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleRepost = async (listingId: number) => {
    try {
      setRepostingId(listingId);
      await UserListingsAPI.repostListing(listingId);
      toast.success('Publicación reposteada exitosamente');
      loadListings(); // Recargar lista
    } catch (error) {
      toast.error('Error al repostear publicación');
    } finally {
      setRepostingId(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna izquierda - Productos */}
      <div className="lg:col-span-2 space-y-4">
        {loading ? (
          <Card className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="font-['Poppins',sans-serif] text-gray-500">Cargando publicaciones...</p>
          </Card>
        ) : listings.length === 0 ? (
          <Card className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="font-['Poppins',sans-serif] text-gray-500 mb-4">
              No tienes publicaciones de compra activas
            </p>
            <Button className="bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg px-4 py-2">
              <Plus className="w-4 h-4 mr-2" />
              Crear Primera Publicación
            </Button>
          </Card>
        ) : (
          listings.map((listing) => (
            <Card 
              key={listing.id} 
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Imagen del producto */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={listing.images?.[0]?.url || listing.primary_image || 'https://via.placeholder.com/150'}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Poppins',sans-serif] text-sm sm:text-base font-medium text-gray-900 mb-1">
                    {listing.title}
                  </h3>
                  <p className="font-['Poppins',sans-serif] text-lg sm:text-xl font-semibold text-[#0047FF] mb-1">
                    {listing.formatted_price || `${listing.currency} ${Number(listing.price || listing.current_price || 0).toFixed(2)}`}
                  </p>
                  <p className="font-['Poppins',sans-serif] text-xs sm:text-sm text-gray-500">
                    Publicación activa por {Math.ceil(listing.days_active || 0)} días
                  </p>
                </div>

                {/* Botón Repostear */}
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => handleRepost(listing.id)}
                    disabled={repostingId === listing.id}
                    className="bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${repostingId === listing.id ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Repostear</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Columna derecha - Perfil y Ayuda */}
      <div className="lg:col-span-1 space-y-4">
        {/* Card de Perfil de Marketplace */}
        <Card className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-gray-900 mb-4">
            Perfil de Marketplace
          </h3>
          
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#0047FF] text-white text-lg font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-['Poppins',sans-serif] text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="font-['Poppins',sans-serif] text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline"
              className="w-full justify-center border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Publicación
            </Button>
            
            <Button 
              className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg py-2"
              onClick={onOpenPerfilModal}
            >
              Ver perfil de Marketplace
            </Button>
          </div>
        </Card>

        {/* Card de Ayuda */}
        <Card className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-gray-900 mb-2">
            ¿Necesitas ayuda?
          </h3>
          <button className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-[#0047FF] transition-colors flex items-center gap-2">
            <span className="text-gray-400">≡</span>
            Ver todos los temas de ayuda
          </button>
        </Card>
      </div>
    </div>
  );
}
