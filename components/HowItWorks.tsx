import { Upload, MessageSquare, Handshake, PartyPopper, Search, TrendingUp, CheckCircle2 } from "../lib/icons";
import { Button } from "./ui/button";
import { useState } from "react";

interface HowItWorksProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
}

export default function HowItWorks({ onNavigate }: HowItWorksProps) {
  const [activeTab, setActiveTab] = useState<'vender' | 'comprar'>('vender');

  const stepsVender = [
    {
      icon: Upload,
      title: "1. Publica tu bien",
      description: "Sube fotos, describe tu artículo y establece tu precio inicial. ¡Es súper fácil y rápido!",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Mejores fotos = Más ofertas"
    },
    {
      icon: MessageSquare,
      title: "2. Recibe ofertas",
      description: "Compradores interesados te envían propuestas. Revisa cada una y decide cuál te conviene más.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Responde rápido para cerrar antes"
    },
    {
      icon: Handshake,
      title: "3. Negocia el precio",
      description: "Intercambia contraofertas en tiempo real hasta que ambos estén contentos con el precio.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "La clave está en la comunicación"
    },
    {
      icon: PartyPopper,
      title: "4. ¡Cierra el trato!",
      description: "Acuerda los detalles finales y coordina la entrega. Todo seguro y transparente.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "¡Felicidades por tu negociación!"
    }
  ];

  const stepsComprar = [
    {
      icon: Search,
      title: "1. Encuentra lo que buscas",
      description: "Explora productos únicos de alto valor. Filtra por categoría y encuentra exactamente lo que necesitas.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Usa los filtros para ahorrar tiempo"
    },
    {
      icon: TrendingUp,
      title: "2. Haz tu oferta",
      description: "Envía una propuesta de precio al vendedor. No te quedes con las ganas, siempre hay espacio para negociar.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Ofrece un precio justo pero razonable"
    },
    {
      icon: MessageSquare,
      title: "3. Negocia en tiempo real",
      description: "Intercambia mensajes y contraofertas con el vendedor hasta llegar a un acuerdo que beneficie a ambos.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "La comunicación es clave"
    },
    {
      icon: CheckCircle2,
      title: "4. ¡Compra y disfruta!",
      description: "Finaliza la compra, coordina el encuentro o envío y recibe tu producto. ¡Así de simple!",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "¡Felicidades por tu nueva compra!"
    }
  ];

  const steps = activeTab === 'vender' ? stepsVender : stepsComprar;

  return (
    <div className="bg-white py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4">
            <span className="text-sm text-[#0047FF]">Proceso Simple</span>
          </div>
          <h2 className="text-gray-900 mb-4">
            ¿Cómo funciona? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">Super fácil</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Solo 4 pasos para comprar o vender. Sin complicaciones, sin letra chica.
          </p>

          {/* Toggle Buttons */}
          <div className="inline-flex items-center gap-2 p-1.5 bg-gray-100 rounded-xl border border-gray-200">
            <button
              onClick={() => setActiveTab('vender')}
              className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
                activeTab === 'vender'
                  ? 'bg-white text-[#0047FF] shadow-md border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cómo Vender
            </button>
            <button
              onClick={() => setActiveTab('comprar')}
              className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 ${
                activeTab === 'comprar'
                  ? 'bg-white text-[#0047FF] shadow-md border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cómo Comprar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[calc(50%+3rem)] w-[calc(100%-4rem)] h-0.5 z-0">
                  <div className="w-full h-full bg-gradient-to-r from-blue-300 via-blue-300 to-transparent"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-[#0047FF] rounded-full transform -translate-y-1/2"></div>
                </div>
              )}

              <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group h-full">
                {/* Icon */}
                <div className={`w-14 h-14 mb-4 mt-2 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-gray-900 mb-3 text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Tip badge */}
                <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                  <p className="text-xs text-[#0047FF]">{step.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md">
            <p className="text-lg text-gray-900 mb-4">
              ¿Listo para empezar? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#0066FF]">¡Es gratis!</span>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Únete a miles de personas que ya están negociando de forma inteligente
            </p>
            <Button 
              onClick={() => onNavigate('register')}
              className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] hover:from-[#0039CC] hover:to-[#0047FF] text-white px-8 py-6 text-base shadow-lg shadow-[#0047FF]/30 hover:shadow-xl hover:shadow-[#0047FF]/50 transition-all rounded-xl"
            >
              Regístrate Ya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
