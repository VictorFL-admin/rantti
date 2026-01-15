"use client";

import { UploadSellIcon, OffersSellIcon, NegotiateSellIcon, CloseDealSellIcon, SearchBuyIcon, TrendingBuyIcon, NegotiateBuyIcon, CloseDealBuyIcon } from "../lib/icons";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

interface HowItWorksProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
}

export default function HowItWorks({ onNavigate }: HowItWorksProps) {
  const [activeTab, setActiveTab] = useState<'vender' | 'comprar'>('vender');

  const stepsVender = [
    {
      icon: UploadSellIcon,
      title: "1. Publica tu bien",
      description: "Sube fotos claras, describe tu artículo, la ubicación y establece un precio inicial.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Mejores fotos = Más ofertas"
    },
    {
      icon: OffersSellIcon,
      title: "2. Recibe ofertas",
      description: "Compradores interesados te envían propuestas. Revísalas y responde para seguir negociando.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Responde rápido para cerrar antes"
    },
    {
      icon: NegotiateSellIcon,
      title: "3. Negocia el precio",
      description: "Intercambia contraofertas en tiempo real, hasta llegar a un precio que le convenga a ambos.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: La clave está en la comunicación"
    },
    {
      icon: CloseDealSellIcon,
      title: "4. ¡Cierra el trato!",
      description: "Acuerda los detalles finales y coordina la entrega.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Confirma precio, lugar y horario antes de cerrar."
    }
  ];

  const stepsComprar = [
    {
      icon: SearchBuyIcon,
      title: "1. Encuentra lo que buscas",
      description: "Explora productos nuevos y usados en todas las categorías.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Compara precios similares para negociar mejor."
    },
    {
      icon: TrendingBuyIcon,
      title: "2. Haz tu oferta",
      description: "Propón el precio que estás dispuesto a pagar. Tu oferta puede ser visible para otros vendedores interesados.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Ofrece un precio razonable para recibir más respuestas."
    },
    {
      icon: NegotiateBuyIcon,
      title: "3. Negocia",
      description: "Otros vendedores pueden contactarte con contraofertas. Compara opciones hasta llegar a un acuerdo justo.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Negocia con claridad y rapidez"
    },
    {
      icon: CloseDealBuyIcon,
      title: "4. ¡Cierra el trato!",
      description: "Cuando ambos estén de acuerdo, coordinen el pago y la entrega.",
      color: "from-[#0047FF] to-[#0066FF]",
      tip: "Tip: Deja todo claro antes de encontrarse"
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div 
            className="inline-block px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-sm text-[#0047FF]">Proceso Simple</span>
          </motion.div>
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
              className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'vender'
                  ? 'bg-white text-[#0047FF] shadow-md border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cómo Vender
            </button>
            <button
              onClick={() => setActiveTab('comprar')}
              className={`px-6 py-3 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'comprar'
                  ? 'bg-white text-[#0047FF] shadow-md border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cómo Comprar
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease: [0.25, 0.4, 0.25, 1]
                  }
                }
              }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[calc(50%+3rem)] w-[calc(100%-4rem)] h-0.5 z-0">
                  <div className="w-full h-full bg-gradient-to-r from-blue-300 via-blue-300 to-transparent"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-[#0047FF] rounded-full transform -translate-y-1/2"></div>
                </div>
              )}

              <motion.div 
                className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group h-full"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
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
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
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
        </motion.div>
      </div>
    </div>
  );
}
