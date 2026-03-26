'use client';

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MoreHorizontal, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { UserListingsAPI, type UserListing } from "@/lib/user-listings-api";
import { toast } from "sonner";

interface Stats {
  chatsToRespond: number;
  requireAttention: number;
  activeAndPending: number;
  soldAndOut: number;
  drafts: number;
  toRenew: number;
  toRepost: number;
}

export default function PanelVendedoresContent() {
  const [listings, setListings] = useState<UserListing[]>([]);
  const [stats, setStats] = useState<Stats>({
    chatsToRespond: 0,
    requireAttention: 0,
    activeAndPending: 0,
    soldAndOut: 0,
    drafts: 0,
    toRenew: 0,
    toRepost: 0
  });
  const [loading, setLoading] = useState(true);
  const [suggestedListing, setSuggestedListing] = useState<UserListing | null>(null);
  const [markingSold, setMarkingSold] = useState(false);

  // Cargar publicaciones de VENTA del usuario
  useEffect(() => {
    loadSalesData();
  }, []);

  const loadSalesData = async () => {
    try {
      setLoading(true);
      
      // Cargar todas las publicaciones de venta (sin filtro de status)
      const response = await UserListingsAPI.fetchUserListings('VENTA');
      
      // Backend devuelve data.data (paginación Laravel)
      const allListings = response.data?.data || response.data || [];
      setListings(Array.isArray(allListings) ? allListings : []);

      // Calcular estadísticas (backend usa status en español)
      const calculatedStats: Stats = {
        chatsToRespond: allListings.reduce((sum, l) => sum + (l.unread_messages_count || 0), 0),
        requireAttention: allListings.filter(l => (l.unread_messages_count || 0) > 0).length,
        activeAndPending: allListings.filter(l => l.status === 'publicado' || l.status === 'pendiente').length,
        soldAndOut: allListings.filter(l => l.status === 'vendido' || l.status === 'agotado').length,
        drafts: allListings.filter(l => l.status === 'borrador').length,
        toRenew: allListings.filter(l => l.status === 'expirado').length,
        toRepost: allListings.filter(l => l.days_active && l.days_active > 30 && l.status === 'publicado').length
      };
      setStats(calculatedStats);

      // Encontrar una publicación sugerida (la más antigua activa)
      const activeSorted = allListings
        .filter(l => l.status === 'publicado')
        .sort((a, b) => (b.days_active || 0) - (a.days_active || 0));
      
      if (activeSorted.length > 0) {
        setSuggestedListing(activeSorted[0]);
      }
    } catch (error) {
      console.error('Error loading sales data:', error);
      toast.error('Error al cargar datos de ventas');
      setListings([]); // Asegurar array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSold = async () => {
    if (!suggestedListing) return;
    
    try {
      setMarkingSold(true);
      await UserListingsAPI.markAsSold(suggestedListing.id);
      toast.success('Publicación marcada como vendida');
      loadSalesData(); // Recargar datos
    } catch (error) {
      toast.error('Error al marcar como vendida');
    } finally {
      setMarkingSold(false);
    }
  };

  const handleBoostListing = async () => {
    if (!suggestedListing) return;
    
    try {
      await UserListingsAPI.repostListing(suggestedListing.id);
      toast.success('Publicación impulsada exitosamente');
      loadSalesData();
    } catch (error) {
      toast.error('Error al impulsar publicación');
    }
  };

  return (
    <div className="space-y-6">
      {/* Información General */}
      <div>
        <h2 className="font-['Poppins',sans-serif] text-lg font-semibold text-gray-900 mb-4">
          Información General
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="font-['Poppins',sans-serif] text-3xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.chatsToRespond}
            </p>
            <p className="font-['Poppins',sans-serif] text-sm text-gray-600">
              Chats por responder
            </p>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="font-['Poppins',sans-serif] text-3xl font-semibold text-gray-900 mb-1">
              1
            </p>
            <p className="font-['Poppins',sans-serif] text-sm text-gray-600">
              Calificación como Vendedor
            </p>
          </Card>
        </div>
      </div>

      {/* Estadísticas de Publicaciones */}
      <Card className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.requireAttention}
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Requieren Atención
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.activeAndPending}
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Activos y Pendientes
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.soldAndOut}
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Vendidos y agotados
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.drafts}
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Borradores
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.toRenew}
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Por renovar
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              {loading ? '...' : stats.toRepost}
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Para eliminar y volver a publicar
            </p>
          </div>
        </div>

        {/* Producto Sugerido */}
        {loading ? (
          <div className="pt-6 border-t border-gray-200 text-center text-gray-500">
            Cargando sugerencias...
          </div>
        ) : suggestedListing ? (
          <div className="flex flex-col sm:flex-row gap-6 items-start pt-6 border-t border-gray-200">
            {/* Imagen del producto */}
            <div className="shrink-0 w-full sm:w-40 h-40 bg-gradient-to-br from-purple-100 to-gray-100 rounded-xl overflow-hidden">
              <img
                src={suggestedListing.images?.[0]?.url || suggestedListing.primary_image || 'https://via.placeholder.com/400'}
                alt={suggestedListing.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Información del producto */}
            <div className="flex-1 min-w-0">
              <p className="font-['Poppins',sans-serif] text-sm text-[#0047FF] font-medium mb-1">
                Sugerencia: ¿Renovar la publicación?
              </p>
              <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-gray-900 mb-2">
                {suggestedListing.title}
              </h3>
              <p className="font-['Poppins',sans-serif] text-2xl font-bold text-[#0047FF] mb-3">
                {suggestedListing.formatted_price || `${suggestedListing.currency} ${Number(suggestedListing.price || suggestedListing.current_price || 0).toFixed(2)}`}
              </p>
              <div className="space-y-1 mb-4">
                <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
                  {suggestedListing.status === 'publicado' ? 'Disponible - Publicado' : 
                   suggestedListing.status === 'vendido' ? 'Vendido' : 
                   'No disponible'}
                </p>
                <p className="font-['Poppins',sans-serif] text-xs text-gray-500">
                  Disponibilidad en Marketplace - {Math.ceil(suggestedListing.days_active || 0)} días en publicación
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleMarkAsSold}
                  disabled={markingSold}
                  className="bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2 disabled:opacity-50"
                >
                  {markingSold ? 'Marcando...' : 'Marcar como agotado'}
                </Button>
                <Button 
                  onClick={handleBoostListing}
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2"
                >
                  Impulsar publicación
                </Button>
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
        ) : (
          <div className="pt-6 border-t border-gray-200 text-center">
            <p className="font-['Poppins',sans-serif] text-sm text-gray-500 mb-3">
              No tienes publicaciones de venta activas
            </p>
            <Button className="bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg px-4 py-2">
              Crear Primera Publicación
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
