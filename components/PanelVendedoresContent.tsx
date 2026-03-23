import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MoreHorizontal, Share2 } from "lucide-react";

export default function PanelVendedoresContent() {
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
              0
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
              0
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Requieren Atención
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              0
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Activos y Pendientes
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              0
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Vendidos y agotados
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              0
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Borradores
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              0
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Por renovar
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 mb-1">
              0
            </p>
            <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
              Para eliminar y volver a publicar
            </p>
          </div>
        </div>

        {/* Producto Sugerido */}
        <div className="flex flex-col sm:flex-row gap-6 items-start pt-6 border-t border-gray-200">
          {/* Imagen del producto */}
          <div className="shrink-0 w-full sm:w-40 h-40 bg-gradient-to-br from-purple-100 to-gray-100 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
              alt="MacBook Pro M3 Max 16&quot;"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información del producto */}
          <div className="flex-1 min-w-0">
            <p className="font-['Poppins',sans-serif] text-sm text-[#0047FF] font-medium mb-1">
              Sugerencia: ¿Renovar la publicación?
            </p>
            <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-gray-900 mb-2">
              MacBook Pro M3 Max 16&quot;
            </h3>
            <p className="font-['Poppins',sans-serif] text-2xl font-bold text-[#0047FF] mb-3">
              S/ 10.999
            </p>
            <div className="space-y-1 mb-4">
              <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
                Disponible - Publicado
              </p>
              <p className="font-['Poppins',sans-serif] text-xs text-gray-500">
                Disponibilidad en Marketplace - 0 días en publicación
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-2">
              <Button className="bg-[#0047FF] hover:bg-[#0039CC] text-white rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2">
                Marcar como agotado
              </Button>
              <Button 
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
      </Card>
    </div>
  );
}
