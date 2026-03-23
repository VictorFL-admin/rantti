import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, MoreHorizontal, Share2 } from "lucide-react";

export default function TusPublicacionesContent() {
  const productos = [
    {
      id: 1,
      titulo: 'MacBook Pro M3 Max 16"',
      precio: "10.999",
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      estado: "Disponible - Publicado",
      diasPublicacion: 0
    },
    {
      id: 2,
      titulo: 'MacBook Pro M3 Max 16"',
      precio: "10.999",
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      estado: "Disponible - Publicado",
      diasPublicacion: 0
    },
    {
      id: 3,
      titulo: 'MacBook Pro M3 Max 16"',
      precio: "10.999",
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      estado: "Disponible - Publicado",
      diasPublicacion: 0
    }
  ];

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
              placeholder="Buscar en Rantti"
              className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </Card>

      {/* Lista de Productos */}
      <div className="space-y-4">
        {productos.map((producto) => (
          <Card 
            key={producto.id} 
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Imagen del producto */}
              <div className="shrink-0 w-full md:w-48 h-48 bg-gradient-to-br from-purple-100 to-gray-100 rounded-xl overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.titulo}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                <p className="font-['Poppins',sans-serif] text-sm text-[#0047FF] font-medium mb-2">
                  Sugerencia: ¿Renovar la publicación?
                </p>
                <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-gray-900 mb-3">
                  {producto.titulo}
                </h3>
                <p className="font-['Poppins',sans-serif] text-2xl font-bold text-[#0047FF] mb-3">
                  S/ {producto.precio}
                </p>
                <div className="space-y-1 mb-4">
                  <p className="font-['Poppins',sans-serif] text-xs text-gray-600">
                    {producto.estado}
                  </p>
                  <p className="font-['Poppins',sans-serif] text-xs text-gray-500">
                    Disponibilidad en Marketplace - {producto.diasPublicacion} días en publicación
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
        ))}
      </div>
    </div>
  );
}
