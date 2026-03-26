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
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { ListingDetails } from "@/lib/types/listings";

interface ProductSpecificationsProps {
  listing?: ListingDetails;
  onMakeOffer?: (amount: number, currency: string) => void;
  onContactSeller?: () => void;
  onClose?: () => void;
}

export default function ProductSpecifications({ 
  listing,
  onMakeOffer,
  onContactSeller,
  onClose
}: ProductSpecificationsProps) {
  // Si no hay listing, usar datos mock para preview
  const mockProduct = {
    id: 1,
    title: "Rolex Submariner Oro Blanco",
    category: { name: "Relojes de Lujo" },
    location: { formatted: "Ciudad de México, CDMX" },
    description: "Rolex Submariner original en oro blanco de 18k, modelo 116619LB con bisel de cerámica azul. El reloj está en excelente condición, incluye caja original, papeles y garantía. Movimiento automático calibre 3135, resistente al agua hasta 300 metros.",
    images: [{
      id: 1,
      url: "https://images.unsplash.com/photo-1666374796260-6f9d3af1e3ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGNsb3NldXB8ZW58MXx8fHwxNzY2MjkyNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      thumbnail_url: "",
      is_primary: true,
      order: 1
    }],
    pricing: {
      currency: "MXN",
      current_price: 1250000,
      original_price: 1450000,
      discount_percentage: 14,
      is_negotiable: true,
      formatted: {
        current: "$1,250,000",
        original: "$1,450,000"
      }
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views_count: 487,
    favorites_count: 23,
    seller: {
      id: 1,
      name: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZWxsZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYzMzA2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      is_verified: true,
      profile_url: "/seller/1",
      member_since: "2022-03-01",
      stats: {
        rating: 4.9,
        total_reviews: 127,
        successful_sales: 84,
        response_rate: 98,
        avg_response_time_hours: 2
      }
    }
  };

  // Usar datos reales si están disponibles, sino mock
  const data = listing || mockProduct;
  
  // Estado para el carousel de imágenes
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Estado para el ajuste de precio en ofertas
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  
  const handlePrevImage = () => {
    if (data.images && data.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? data.images.length - 1 : prev - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (data.images && data.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === data.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Hace 1 día";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const currentImage = data.images && data.images.length > 0 ? data.images[currentImageIndex].url : "";
  const hasDiscount = data.pricing.discount_percentage && data.pricing.discount_percentage > 0;

  return (
    <div className="space-y-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Side - Image Carousel */}
          <div className="space-y-4 lg:col-span-2">
            {/* Imagen Principal con Carousel */}
            <Card className="overflow-hidden border-gray-200">
              <div className="relative aspect-video bg-white group">
                <ImageWithFallback
                  src={currentImage}
                  alt={data.title}
                  className="w-full h-full object-contain"
                />
                
                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-[#0047FF] text-white border-0 shadow-lg">
                    {data.category.name}
                  </Badge>
                </div>

                {/* Actions on image */}
                <div className="absolute top-4 right-4 flex flex-row gap-2">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Carousel Navigation Buttons */}
                {data.images && data.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-8 h-8 text-gray-900" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-8 h-8 text-gray-900" />
                    </button>
                  </>
                )}

                {/* Carousel Indicators (Dots) */}
                {data.images && data.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {data.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Descripción del Producto */}
            <div className="py-4">
              <h2 className="text-gray-900 text-base md:text-lg mb-3 font-semibold">Descripción</h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right Side - Specifications */}
          <div className="space-y-6">
            {/* Title & Location */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-gray-900 text-lg md:text-xl lg:text-2xl">{data.title}</h1>
              </div>
              
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{data.location.formatted}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{formatDate(data.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <Card className="bg-gradient-to-br from-[#0047FF]/5 to-[#0047FF]/10 border-[#0047FF]/20 p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs md:text-sm text-gray-600 mb-1">Precio actual</div>
                    <div className="text-2xl md:text-3xl font-bold text-[#0047FF]">
                      {data.pricing.formatted?.current || formatPrice(data.pricing.current_price)}
                    </div>
                  </div>
                  {hasDiscount && data.pricing.discount_percentage && (
                    <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-lg">
                      <TrendingDown className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 font-semibold">-{data.pricing.discount_percentage}%</span>
                    </div>
                  )}
                </div>

                {data.pricing.is_negotiable && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#0047FF]" />
                      <span>Precio negociable - ¡Haz tu oferta!</span>
                    </div>
                    
                    {/* Comprar Button */}
                    <Button 
                      className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white py-3 text-base font-medium"
                    >
                      Comprar
                    </Button>

                    {/* Price Adjustment Controls - InDrive Style */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <button
                          onClick={() => setPriceAdjustment(prev => prev + 10)}
                          className="px-4 py-2.5 rounded-lg border bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 font-medium transition-all"
                        >
                          +10%
                        </button>
                        <div className="flex flex-col items-center justify-center px-2 py-2 bg-white rounded-lg border border-gray-300">
                          <span className="text-base font-semibold text-[#0047FF]">
                            {formatPrice(data.pricing.current_price * (1 + priceAdjustment / 100))}
                          </span>
                          {priceAdjustment !== 0 && (
                            <span className="text-xs text-gray-500">
                              {priceAdjustment > 0 ? '+' : ''}{priceAdjustment}%
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setPriceAdjustment(prev => prev - 10)}
                          className="px-4 py-2.5 rounded-lg border bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 font-medium transition-all"
                        >
                          -10%
                        </button>
                      </div>

                      <Button 
                        onClick={() => {
                          if (onMakeOffer) {
                            const adjustedPrice = data.pricing.current_price * (1 + priceAdjustment / 100);
                            onMakeOffer(adjustedPrice, data.pricing.currency);
                          }
                        }}
                        className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white py-3 text-base font-medium"
                      >
                        Mandar Oferta
                      </Button>
                      
                      <button
                        onClick={onContactSeller}
                        className="w-full mt-2 flex items-center justify-center gap-2 text-gray-600 hover:text-[#0047FF] py-2 text-sm transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Enviar Mensaje
                      </button>
                    </div>
                  </div>
                )}

                {!data.pricing.is_negotiable && (
                  <div className="space-y-3 pt-2">
                    <Button 
                      className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white py-3 text-base font-medium"
                    >
                      Comprar ahora
                    </Button>
                    <Button 
                      onClick={onContactSeller}
                      variant="outline" 
                      className="w-full border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF]/5 py-3 text-base"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contactar vendedor
                    </Button>
                  </div>
                )}
              </div>
            </Card>

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
                <AvatarImage src={data.seller.avatar} alt={data.seller.name} />
                <AvatarFallback className="bg-[#0047FF] text-white text-sm md:text-base lg:text-xl">
                  {data.seller.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900 text-sm md:text-base lg:text-lg">{data.seller.name}</h3>
                  {data.seller.is_verified && (
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
                  <span className="text-xs md:text-sm text-gray-900">{data.seller.stats.rating}</span>
                  <span className="text-xs md:text-sm text-gray-500">({data.seller.stats.total_reviews} opiniones)</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                  <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                  <span>Miembro desde {new Date(data.seller.member_since).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span>
                </div>
              </div>
            </div>

            {/* Seller Stats */}
            <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center lg:text-left">
                <div className="text-lg md:text-xl lg:text-2xl text-[#0047FF] mb-0.5 md:mb-1">{data.seller.stats.successful_sales}</div>
                <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">Ventas exitosas</div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-lg md:text-xl lg:text-2xl text-[#0047FF] mb-0.5 md:mb-1">{data.seller.stats.response_rate}%</div>
                <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">Tasa de respuesta</div>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="text-lg md:text-xl lg:text-2xl text-[#0047FF] mb-0.5 md:mb-1">~{data.seller.stats.avg_response_time_hours} horas</div>
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
