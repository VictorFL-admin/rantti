"use client";

import { TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface ActiveNegotiationsProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
}

export default function ActiveNegotiations({ onNavigate }: ActiveNegotiationsProps) {
  const negotiations = [
    {
      id: 1,
      product: "Rolex Submariner 2023",
      category: "⌚ Relojes",
      initialPrice: "S/ 45,000",
      currentOffer: "S/ 42,500",
      status: "Negociando",
      timeAgo: "Hace 5 min",
    },
    {
      id: 2,
      product: "Anillo Diamante 2.5ct",
      category: "💎 Joyas",
      initialPrice: "S/ 28,000",
      currentOffer: "S/ 26,000",
      status: "Negociando",
      timeAgo: "Hace 12 min",
    },
    {
      id: 3,
      product: "MacBook Pro M3 Max",
      category: "📱 Tech Premium",
      initialPrice: "S/ 12,500",
      currentOffer: "S/ 11,800",
      status: "Negociando",
      timeAgo: "Hace 23 min",
    },
  ];

  return (
    <section id="negociaciones" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700 font-['Poppins',sans-serif]">Ahora mismo</span>
          </motion.div>
          <h2 className="text-gray-900 mb-4">
            Negociaciones <span className="text-[#0047FF]">activas</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-['Poppins',sans-serif]">
            Otros usuarios ya están publicando y negociando ahora
          </p>
        </motion.div>

        {/* Negotiations Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
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
          {negotiations.map((negotiation, index) => (
            <motion.div
              key={negotiation.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1]
                  }
                }
              }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-['Poppins',sans-serif] mb-1">
                    {negotiation.category}
                  </p>
                  <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-base">
                    {negotiation.product}
                  </h3>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-700 font-['Poppins',sans-serif]">
                    {negotiation.status}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-['Poppins',sans-serif]">
                    Precio inicial:
                  </span>
                  <span className="text-sm text-gray-400 line-through font-['Poppins',sans-serif]">
                    {negotiation.initialPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-['Poppins',sans-serif] font-medium">
                    Oferta actual:
                  </span>
                  <span className="text-lg text-[#0047FF] font-['Poppins',sans-serif] font-bold">
                    {negotiation.currentOffer}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-['Poppins',sans-serif]">
                    {negotiation.timeAgo}
                  </span>
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="inline-block p-8 bg-white border-2 border-[#0047FF] rounded-2xl shadow-lg">
            <p className="text-lg text-gray-900 mb-4 font-['Poppins',sans-serif]">
              ¿Tienes algo similar? <span className="text-[#0047FF] font-semibold">Publícalo ahora</span>
            </p>
            <Button
              onClick={() => onNavigate('register')}
              className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-8 py-6 text-base font-['Poppins',sans-serif] shadow-lg shadow-[#0047FF]/30 hover:shadow-xl hover:shadow-[#0047FF]/50 transition-all rounded-xl group/btn"
            >
              Publica algo similar
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
