import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { TrendingUp, TrendingDown, MapPin, Clock, Heart, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'product-specs';

interface FeaturedListingsProps {
  onNavigate?: (page: Page) => void;
}

export default function FeaturedListings({ onNavigate }: FeaturedListingsProps) {
  const listings = [
    {
      id: 1,
      title: "Rolex Submariner Oro Blanco",
      category: "Relojes de Lujo",
      location: "Ciudad de México",
      image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjIxMDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      initialPrice: 1250000,
      currentOffer: 1180000,
      totalOffers: 8,
      timeLeft: "2 días",
      hot: true
    },
    {
      id: 2,
      title: "Collar de Diamantes 18K",
      category: "Joyas Exclusivas",
      location: "Monterrey, N.L.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialPrice: 850000,
      currentOffer: 880000,
      totalOffers: 12,
      timeLeft: "5 días",
      hot: false
    },
    {
      id: 3,
      title: "MacBook Pro M3 Max 16\"",
      category: "Tech Premium",
      location: "Guadalajara, Jal.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialPrice: 95000,
      currentOffer: 92000,
      totalOffers: 15,
      timeLeft: "1 día",
      hot: true
    },
    {
      id: 4,
      title: "Pintura Original Frida Kahlo",
      category: "Arte & Coleccionables",
      location: "Ciudad de México",
      image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialPrice: 3200000,
      currentOffer: 3000000,
      totalOffers: 6,
      timeLeft: "3 días",
      hot: false
    },
    {
      id: 5,
      title: "Nintendo 64 Gold Edition",
      category: "Consolas Retro",
      location: "Puebla, Pue.",
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialPrice: 45000,
      currentOffer: 43000,
      totalOffers: 4,
      timeLeft: "7 días",
      hot: false
    },
    {
      id: 6,
      title: "Violín Stradivarius 1721",
      category: "Objetos Únicos",
      location: "San Miguel de Allende",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialPrice: 8500000,
      currentOffer: 8200000,
      totalOffers: 9,
      timeLeft: "4 días",
      hot: false
    }
  ];

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  return (
    <div className="bg-gray-50 py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
            <span className="text-sm text-[#0047FF] flex items-center gap-1">
              Negociaciones Activas
            </span>
          </div>
          <h2 className="text-gray-900 mb-4">
            Los mejores <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">deals</span> en vivo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Únete a las negociaciones más candentes. ¡Estos precios no durarán mucho!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.slice(0, 3).map((listing) => (
            <Card key={listing.id} className="bg-white border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 group relative">
              {/* Hot badge */}
              {listing.hot && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse shadow-lg">
                    <Zap className="w-3 h-3 text-white fill-white" />
                    <span className="text-xs text-white">HOT</span>
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40"></div>

                {/* Top badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0">
                    {listing.category}
                  </Badge>
                  <Badge className={`border-0 backdrop-blur-sm ${listing.totalOffers > 5 ? 'bg-green-500/90' : 'bg-blue-500/90'} text-white`}>
                    {listing.totalOffers} ofertas
                  </Badge>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {listing.timeLeft}
                  </Badge>
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                    <Heart className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-gray-900 mb-2 text-lg group-hover:text-[#0047FF] transition-colors">
                  {listing.title}
                </h3>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </div>

                {/* Price negotiation section */}
                <div className="bg-gradient-to-br from-[#0047FF]/5 to-[#0047FF]/10 rounded-xl p-4 mb-4 border border-[#0047FF]/20">
                  <div className="space-y-3">
                    {/* Initial price */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Precio inicial</span>
                      <span className="text-sm text-gray-500 line-through">{formatPrice(listing.initialPrice)}</span>
                    </div>

                    {/* Current offer */}
                    <div className="flex justify-between items-center bg-white rounded-lg p-2 border border-[#0047FF]/30 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#0047FF]">Mejor oferta</span>
                        {listing.currentOffer > listing.initialPrice ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <span className="text-lg text-[#0047FF]">{formatPrice(listing.currentOffer)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl transition-all group-hover:scale-105" onClick={() => onNavigate?.('product-specs')}>
                  Ver Publicación
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl px-8 py-6">
            Ver todas las negociaciones
            <TrendingUp className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Se actualizan cada 5 minutos con nuevas ofertas
          </p>
        </div>
      </div>
    </div>
  );
}
