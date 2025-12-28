import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Search, TrendingUp } from "lucide-react";

interface BenefitsBlocksProps {
  onNavigate: (page: 'login' | 'register') => void;
}

export default function BenefitsBlocks({ onNavigate }: BenefitsBlocksProps) {
  return (
    <div className="bg-white py-24 relative overflow-hidden">
      {/* Decorative elements - siguiendo el patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header siguiendo el patrón */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
            <span className="text-sm text-[#0047FF]">Beneficios Reales</span>
          </div>
          <h2 className="text-gray-900 mb-4">
            ¿Por qué elegir <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">Rantti</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
            Negociaciones directas, precios justos y tratos entre personas.
          </p>
          
          {/* Key Benefits */}
          <div className="space-y-6 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-base md:text-lg text-gray-900 mb-1">
                  Precio real, no inflado
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  El precio lo decide el trato, no un algoritmo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-base md:text-lg text-gray-900 mb-1">
                  Más rápido que tiendas
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Hablas directo con quien vende.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-base md:text-lg text-gray-900 mb-1">
                  Trato entre personas
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Nada de intermediarios, comisiones ocultas o letras chicas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Buyer Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-2">
                  ¿Buscas algo que comprar?
                </h3>
                <p className="text-base text-gray-700 italic">
                  Compra mejor, pagando lo justo
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Negocia antes de decidir</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Evita precios inflados de tiendas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Llega a acuerdos rápidos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Compra a personas reales</span>
                </li>
              </ul>

              <div className="pt-4">
                <Button 
                  onClick={() => onNavigate('register')}
                  className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white py-6 group/btn"
                >
                  <Search className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                  Buscar productos y negociar
                </Button>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-2">
                  ¿Buscas algo que vender?
                </h3>
                <p className="text-base text-gray-700 italic">
                  Vende más rápido negociando
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Publica con un precio base</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Recibe ofertas reales</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Cierra tratos sin perder tiempo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0047FF] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Decide con quién vender</span>
                </li>
              </ul>

              <div className="pt-4">
                <Button 
                  onClick={() => onNavigate('register')}
                  className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white py-6 group/btn"
                >
                  <TrendingUp className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                  Publicar producto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
