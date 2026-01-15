"use client";

import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const
      }
    }
  };

  const checkItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section id="servicios" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            variants={itemVariants}
          >
            <div className="bg-[#dbeafe] border border-[#bedbff] text-[#0047ff] px-6 py-2.5 rounded-full font-['Poppins',sans-serif] text-sm font-medium">
              Servicios
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            className="text-gray-900 mb-6"
            variants={itemVariants}
          >
            Servicios opcionales para vender{" "}
            <span className="bg-gradient-to-r from-[#0047ff] to-[#0066ff] bg-clip-text text-transparent">
              más rápido.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-gray-600 mb-1">
              Publicar y negociar en Rantti es gratis.
            </p>
            <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-gray-600">
              Estos servicios te ayudan a{" "}
              <span className="font-semibold text-gray-900">tener más visibilidad y cerrar tratos antes.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Destaca tu publicación Card */}
        <motion.div 
          className="bg-white border border-[rgba(29,41,61,0.36)] rounded-2xl p-6 sm:p-8 text-center mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px", amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          whileHover={{ 
            boxShadow: "0 10px 40px rgba(0, 71, 255, 0.1)",
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Icon with gradient background */}
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
          >
            <motion.div 
              className="relative w-12 h-12"
              whileHover={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-full h-full" fill="none" viewBox="0 0 56 56">
                <defs>
                  <linearGradient id="starGradient" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0047FF" />
                    <stop offset="1" stopColor="#0066FF" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="56" height="56" rx="16" fill="url(#starGradient)" />
                <path 
                  d="M28 18l2.39 7.36h7.74l-6.26 4.55 2.39 7.36L28 32.72l-6.26 4.55 2.39-7.36-6.26-4.55h7.74L28 18z" 
                  fill="white"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="font-['Poppins',sans-serif] text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Destaca tu Publicación
          </motion.h3>

          {/* Subtitle */}
          <motion.p 
            className="font-['Poppins',sans-serif] text-sm sm:text-base italic text-gray-500 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            (Vende más rápido destacando tu publicación)
          </motion.p>

          {/* Description */}
          <motion.p 
            className="font-['Poppins',sans-serif] text-base sm:text-lg text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Haz que tu producto aparezca primero y reciba más ofertas reales.
          </motion.p>
          
          <motion.p 
            className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Destaca tus publicaciones desde <span className="text-[#0047ff] font-medium">"Mis Publicaciones"</span>
          </motion.p>
        </motion.div>

        {/* ¿Qué significa "destacar"? */}
        <div className="mb-10 max-w-2xl mx-auto">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px", amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h4 className="font-['Poppins',sans-serif] text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              ¿Qué significa{" "}
              <span className="text-[#0047ff]">"destacar"</span>?
            </h4>
            <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-gray-700 mb-6">
              Una publicación destacada:
            </p>
          </motion.div>

          {/* List with checkmarks */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px", amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
          >
            <motion.div 
              className="flex items-start gap-3 group"
              variants={checkItemVariants}
            >
              <motion.div 
                className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0047ff] flex items-center justify-center mt-0.5"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </motion.div>
              <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700">
                Aparece <span className="font-semibold text-gray-900">primero</span> en los resultados.
              </p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-3 group"
              variants={checkItemVariants}
            >
              <motion.div 
                className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0047ff] flex items-center justify-center mt-0.5"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </motion.div>
              <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700">
                Tiene <span className="font-semibold text-gray-900">mayor visibilidad</span> frente a productos similares.
              </p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-3 group"
              variants={checkItemVariants}
            >
              <motion.div 
                className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0047ff] flex items-center justify-center mt-0.5"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </motion.div>
              <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700">
                Recibe <span className="font-semibold text-gray-900">más mensajes y ofertas.</span>
              </p>
            </motion.div>

            <motion.div 
              className="flex items-start gap-3 group"
              variants={checkItemVariants}
            >
              <motion.div 
                className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0047ff] flex items-center justify-center mt-0.5"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </motion.div>
              <p className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700">
                Se vende <span className="font-semibold text-gray-900">más rápido.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Información Importante Card */}
        <motion.div 
          className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px", amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          whileHover={{ 
            borderColor: "#0047ff",
            boxShadow: "0 8px 30px rgba(0, 71, 255, 0.08)",
            y: -3,
            transition: { duration: 0.3 }
          }}
        >
          <motion.h4 
            className="font-['Poppins',sans-serif] text-base sm:text-lg font-semibold text-gray-900 mb-5 text-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Información Importante
          </motion.h4>

          <motion.ul 
            className="space-y-3 list-disc pl-5 marker:text-gray-400"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.li 
              className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              Todos los planes tienen la <span className="font-semibold text-gray-900">misma prioridad</span>.
            </motion.li>
            <motion.li 
              className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              El destaque se activa inmediatamente después del pago.
            </motion.li>
            <motion.li 
              className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              El tiempo corre de forma continua (24/7).
            </motion.li>
            <motion.li 
              className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              Puedes destacar cualquier publicación activa
            </motion.li>
            <motion.li 
              className="font-['Poppins',sans-serif] text-sm sm:text-base text-gray-700"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              Negociar siempre es gratis
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
