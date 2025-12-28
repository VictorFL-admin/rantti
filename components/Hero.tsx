import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { mascotImage, logoImage } from "../lib/images";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import { 
  ArrowRight, 
  Sparkles,
  SearchIcon,
  UserIcon,
  CheckIcon
} from "../lib/icons";

interface HeroProps {
  user: { email: string; name: string; avatar?: string } | null;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  onLogout: () => void;
}

export default function Hero({ user, onNavigate, onLogout }: HeroProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-white text-foreground overflow-hidden">
      {/* Decorative background - Más sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      {/* STICKY NAVIGATION - Appears on scroll */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-100 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 ${
          scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: scrolled ? 0 : -100, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <button 
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
              >
                <Image 
                  src={logoImage} 
                  alt="Rantti Logo" 
                  width={120}
                  height={28}
                  className="w-auto h-7 object-contain"
                />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-6">
                <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cómo funciona
                </a>
                <a href="#categorias" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Categorías
                </a>
                <a href="#negociaciones-activas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Negociaciones Activas
                </a>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Menu */}
              <MobileMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />

              {/* Search button */}
              <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <SearchIcon className="w-4 h-4" />
              </button>
              
              {/* User Menu */}
              {user ? (
                <UserMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />
              ) : null}

              {/* Publicar button */}
              <Button 
                onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
                className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-9 px-5 rounded-lg text-sm shadow-lg shadow-[#0047FF]/30 transition-all"
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* INTEGRATED NAVIGATION */}
      <nav className={`relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 transition-opacity duration-300 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex items-center justify-between bg-card/80 backdrop-blur-md rounded-full px-4 sm:px-6 h-12 sm:h-14 border border-border shadow-sm">
          {/* Left side - Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
            >
              <Image 
                src={logoImage} 
                alt="Rantti Logo" 
                width={120}
                height={32}
                className="w-auto h-7 sm:h-8 object-contain"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cómo funciona
              </a>
              <a href="#categorias" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Categorías
              </a>
              <a href="#negociaciones-activas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Negociaciones Activas
              </a>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu */}
            <MobileMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />

            {/* Search button - Hidden on mobile */}
            <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
              <SearchIcon className="w-4 h-4" />
            </button>
            
            {/* User Menu - Hidden on mobile */}
            {user ? (
              <UserMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Publicar button - Always visible */}
            <Button 
              onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
              className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-8 sm:h-9 px-4 sm:px-5 rounded-lg text-sm shadow-lg shadow-[#0047FF]/30 transition-all"
            >
              Publicar
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 lg:py-32">
        {/* LAYOUT CON DIVISIÓN CLARA - 2 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* COLUMNA IZQUIERDA - Presentación del Concepto */}
          <motion.div
            className="space-y-8 lg:pr-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Badge */}
            <Badge icon={<Sparkles className="w-4 h-4" />}>
              Compra y Vende al precio justo.
            </Badge>

            {/* Título Principal */}
            <div className="space-y-6">
              <h1 className="leading-tight font-semibold text-[20px] text-gray-900">
                Negocia Libremente. El pago se acuerda entre las partes.
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Un marketplace donde compradores y vendedores acuerdan el precio en minutos, sin intermediarios ni complicaciones.
              </p>
            </div>

            {/* División visual */}
            <div className="h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>

            {/* Beneficios clave */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Chat directo para negociar.</h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Tratos rápidos, sin vueltas.</h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Precio justo para ambos.</h3>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
                className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-8 py-6 text-base shadow-lg shadow-[#0047FF]/30 hover:shadow-xl hover:shadow-[#0047FF]/50 transition-all rounded-xl group/btn"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* DIVISIÓN VERTICAL (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-purple-600/20 to-transparent dark:via-purple-400/20"></div>

          {/* COLUMNA DERECHA - Visual / Mascota */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-200 overflow-hidden">
              {/* Mascot */}
              <div className="relative z-10 flex items-center justify-center">
                <Image 
                  src={mascotImage} 
                  alt="Rantti Mascot" 
                  width={448}
                  height={448}
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
