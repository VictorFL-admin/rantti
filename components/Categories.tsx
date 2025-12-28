import { Watch, Gem, Palette, Gamepad2, Smartphone, PopularIcon } from "../lib/icons";

export default function Categories() {
  const categories = [
    {
      icon: Gem,
      name: "Joyas Exclusivas",
      count: "230+",
      trending: true,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      gradient: "from-purple-500/80 to-pink-500/80"
    },
    {
      icon: Watch,
      name: "Relojes de Lujo",
      count: "180+",
      trending: true,
      image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjIxMDExOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: "from-blue-500/80 to-cyan-500/80"
    },
    {
      icon: Palette,
      name: "Arte & Coleccionables",
      count: "310+",
      trending: false,
      image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      gradient: "from-orange-500/80 to-red-500/80"
    },
    {
      icon: Gamepad2,
      name: "Consolas Retro",
      count: "150+",
      trending: false,
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      gradient: "from-green-500/80 to-emerald-500/80"
    },
    {
      icon: Smartphone,
      name: "Tech Premium",
      count: "270+",
      trending: true,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      gradient: "from-cyan-500/80 to-blue-500/80"
    },
    {
      icon: Gem,
      name: "Objetos Únicos",
      count: "420+",
      trending: true,
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      gradient: "from-yellow-500/80 to-orange-500/80"
    }
  ];

  return (
    <div className="bg-gray-50 py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
            <span className="text-sm text-[#0047FF]">Categorías Populares</span>
          </div>
          <h2 className="text-gray-900 mb-4">
            ¿Qué estás buscando <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">hoy</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Objetos únicos de alto valor. Desde joyas exclusivas hasta tecnología premium.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {/* Background image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} mix-blend-multiply`}></div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

              {/* Trending badge */}
              {category.trending && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full">
                  <PopularIcon className="w-5 h-2 text-yellow-900" />
                  <span className="text-xs text-yellow-900">Popular</span>
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top: Icon */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Bottom: Info */}
                <div className="transform group-hover:translate-y-[-8px] transition-transform duration-300">
                  <h3 className="text-white text-xl mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {category.count} disponibles
                    </p>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-gray-900">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 rounded-2xl transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
