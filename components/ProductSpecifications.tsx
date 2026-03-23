import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  MapPin, 
  Star, 
  Shield, 
  MessageCircle, 
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  TrendingDown,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function ProductSpecifications() {
  // Mock data del producto
  const product = {
    id: 1,
    title: "Rolex Submariner Oro Blanco",
    category: "Relojes de Lujo",
    location: "Ciudad de México, CDMX",
    description: "Rolex Submariner original en oro blanco de 18k, modelo 116619LB con bisel de cerámica azul. El reloj está en excelente condición, incluye caja original, papeles y garantía. Movimiento automático calibre 3135, resistente al agua hasta 300 metros.",
    image: "https://images.unsplash.com/photo-1666374796260-6f9d3af1e3ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGNsb3NldXB8ZW58MXx8fHwxNzY2MjkyNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 1250000,
    originalPrice: 1450000,
    negotiable: true,
    timePosted: "Hace 2 días",
    views: 487,
    favorites: 23
  };

  // Mock data del vendedor
  const seller = {
    id: 1,
    name: "Carlos Mendoza",
    avatar: "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWxsZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYzMzA2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    totalReviews: 127,
    memberSince: "Marzo 2022",
    verified: true,
    responseRate: "98%",
    responseTime: "~2 horas",
    totalSales: 84
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Side - Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-gray-200">
              <div className="relative aspect-square bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-[#0047FF] text-white border-0 shadow-lg">
                    {product.category}
                  </Badge>
                </div>

                {/* Actions on image */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Stats on bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0">
                    👁️ {product.views} vistas
                  </Badge>
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0">
                    ❤️ {product.favorites} favoritos
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Additional images could go here */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="aspect-square overflow-hidden border-gray-200 cursor-pointer hover:border-[#0047FF] transition-all">
                  <ImageWithFallback
                    src={product.image}
                    alt={`Vista ${i}`}
                    className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Specifications */}
          <div className="space-y-6">
            {/* Title & Location */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-gray-900 text-lg md:text-xl lg:text-2xl">{product.title}</h1>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{product.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{product.timePosted}</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <Card className="bg-gradient-to-br from-[#0047FF]/5 to-[#0047FF]/10 border-[#0047FF]/20 p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Precio original</span>
                  <span className="text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs md:text-sm text-[#0047FF] mb-1">Precio actual</div>
                    <div className="text-xl md:text-2xl lg:text-3xl text-[#0047FF]">{formatPrice(product.price)}</div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 px-2 md:px-3 py-1.5 md:py-2 rounded-lg">
                    <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    <span className="text-xs md:text-sm text-green-700">-14% OFF</span>
                  </div>
                </div>

                {product.negotiable && (
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-[#0047FF]/30">
                    <CheckCircle2 className="w-5 h-5 text-[#0047FF]" />
                    <span className="text-sm text-gray-700">Precio negociable - ¡Haz tu oferta!</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-gray-900 text-base md:text-lg mb-3">Descripción</h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white shadow-lg hover:shadow-xl transition-all py-4 md:py-5 text-sm md:text-base">
                Hacer una oferta
              </Button>
              <Button variant="outline" className="w-full border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF]/5 py-4 md:py-5 text-sm md:text-base">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactar vendedor
              </Button>
            </div>

            {/* Safety Notice */}
            <Card className="bg-blue-50 border-blue-200 p-3 md:p-4">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-[#0047FF] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm text-gray-900 mb-1">Compra segura</h3>
                  <p className="text-xs text-gray-600">
                    Todas las transacciones están protegidas. Nunca realices pagos fuera de Rantti.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

      {/* Seller Profile Section - Full Width Below */}
      <Card className="border-gray-200 p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Seller Avatar & Basic Info */}
            <div className="flex items-center gap-3 md:gap-4 lg:border-r lg:border-gray-200 lg:pr-6">
              <Avatar className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 border-[#0047FF]">
                <AvatarImage src={seller.avatar} alt={seller.name} />
                <AvatarFallback className="bg-[#0047FF] text-white text-sm md:text-base lg:text-xl">
                  {seller.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900 text-sm md:text-base lg:text-lg">{seller.name}</h3>
                  {seller.verified && (
                    <div className="relative group">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#0047FF] fill-[#0047FF]" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Vendedor verificado
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs md:text-sm text-gray-900">{seller.rating}</span>
                  <span className="text-xs md:text-sm text-gray-500">({seller.totalReviews} opiniones)</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                  <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                  <span>Miembro desde {seller.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Seller Stats */}
            <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center lg:text-left">
                <div className="text-lg md:text-xl lg:text-2xl text-[#0047FF] mb-0.5 md:mb-1">{seller.totalSales}</div>
                <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">Ventas exitosas</div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-lg md:text-xl lg:text-2xl text-[#0047FF] mb-0.5 md:mb-1">{seller.responseRate}</div>
                <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">Tasa de respuesta</div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-lg md:text-xl lg:text-2xl text-[#0047FF] mb-0.5 md:mb-1">{seller.responseTime}</div>
                <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">Tiempo de respuesta</div>
              </div>
            </div>

            {/* View Profile Button */}
            <div className="flex items-center justify-center lg:justify-start">
              <Button variant="outline" className="border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF]/5 whitespace-nowrap text-xs md:text-sm px-3 md:px-4 py-2">
                Ver perfil completo
              </Button>
            </div>
          </div>
        </Card>
    </div>
  );
}
