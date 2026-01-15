"use client";

import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface FinalCTAProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
}

export default function FinalCTA({ onNavigate }: FinalCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0047FF] to-[#0066FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-full mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-['Poppins',sans-serif]">Comienza ahora</span>
        </motion.div>

        {/* Heading */}
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-['Poppins',sans-serif] font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Publica en 1 minuto
        </motion.h2>

        {/* Subheading */}
        <motion.p 
          className="text-xl sm:text-2xl text-white/90 font-['Poppins',sans-serif] mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Es <span className="font-bold underline decoration-2 underline-offset-4">gratis</span>
        </motion.p>

        {/* Description */}
        <motion.p 
          className="text-base sm:text-lg text-white/80 font-['Poppins',sans-serif] max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Únete a cientos de personas que ya están negociando artículos exclusivos de forma directa, rápida y sin comisiones.
        </motion.p>

        {/* Features list */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
        >
          <motion.div 
            className="flex items-center gap-2 text-white"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.4 }
              }
            }}
          >
            <Clock className="w-5 h-5" />
            <span className="font-['Poppins',sans-serif]">Solo 1 minuto</span>
          </motion.div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <motion.div 
            className="flex items-center gap-2 text-white"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.4 }
              }
            }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-['Poppins',sans-serif]">100% Gratis</span>
          </motion.div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <motion.div 
            className="flex items-center gap-2 text-white"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.4 }
              }
            }}
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-['Poppins',sans-serif]">Sin comisiones</span>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={() => onNavigate('register')}
            className="bg-white text-[#0047FF] hover:bg-gray-100 px-10 py-7 text-lg font-['Poppins',sans-serif] font-semibold shadow-2xl hover:shadow-3xl transition-all rounded-xl group/btn"
          >
            Publicar Gratis
            <ArrowRight className="w-6 h-6 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Trust text */}
        <motion.p 
          className="text-sm text-white/70 font-['Poppins',sans-serif] mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          No necesitas tarjeta de crédito • Activa tu cuenta en segundos
        </motion.p>
      </motion.div>
    </section>
  );
}
