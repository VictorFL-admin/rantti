import { useState, useEffect } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Settings, Package, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Menu } from "lucide-react";
import { motion } from "framer-motion";
import svgPaths from "../imports/svg-wwcpkqc6cf";
import { mascotImage, logoImage } from "../lib/images";

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

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
                <a href="#" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Explorar
                </a>
                <a href="#" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cómo funciona
                </a>
                <a href="#" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Categorías
                </a>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search button */}
              <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p31954200} fill="#374151" />
                  <path d={svgPaths.p345dec00} fill="#374151" />
                  <path d={svgPaths.p3fd14d00} fill="#374151" />
                </svg>
              </button>
              
              {/* User Avatar */}
              {user ? (
                <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback className="bg-[#0047FF] text-white text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              ) : null}

              {/* Publicar button */}
              <Button 
                onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
                className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-9 px-5 rounded-lg font-['Poppins',sans-serif] text-sm shadow-lg shadow-[#0047FF]/30 transition-all"
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* INTEGRATED NAVIGATION */}
      <nav className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
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
              <a href="#" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Explorar
              </a>
              <a href="#" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cómo funciona
              </a>
              <a href="#" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Categorías
              </a>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-70 bg-white border-gray-200 text-gray-900 p-0">
                {/* Accessibility - Hidden but required for screen readers */}
                <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                <SheetDescription className="sr-only">
                  Accede a todas las opciones de navegación y configuración de tu cuenta
                </SheetDescription>
                
                <div className="flex flex-col h-full pt-16 px-6">
                  {/* User Section or Login */}
                  {user ? (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 ring-2 ring-[#0047FF]/30">
                          <AvatarImage src={user.avatar || ""} />
                          <AvatarFallback className="bg-[#0047FF] text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-900 font-['Poppins',sans-serif] font-medium">{getFirstName(user.name)}</p>
                          <p className="text-xs text-gray-500 font-['Poppins',sans-serif]">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <Button 
                        onClick={() => onNavigate('login')}
                        className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white h-11 font-['Poppins',sans-serif] shadow-lg shadow-[#0047FF]/30"
                      >
                        Iniciar Sesión
                      </Button>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-1 mb-6">
                    <a href="#" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                      Explorar
                    </a>
                    <a href="#" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                      Cómo funciona
                    </a>
                    <a href="#" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                      Categorías
                    </a>
                  </nav>

                  {/* User Actions */}
                  {user && (
                    <>
                      <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-gray-200">
                        <button
                          onClick={() => onNavigate('dashboard')}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900 text-left"
                        >
                          <Package className="w-5 h-5" />
                          Mi Dashboard
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900 text-left">
                          <MessageSquare className="w-5 h-5" />
                          Negociaciones
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900 text-left">
                          <Settings className="w-5 h-5" />
                          Configuración
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="mt-auto pb-8">
                        <button
                          onClick={onLogout}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors font-['Poppins',sans-serif] text-red-600 hover:text-red-700 w-full text-left"
                        >
                          <LogOut className="w-5 h-5" />
                          Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Search button - Hidden on mobile */}
            <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.p31954200} fill="#374151" />
                <path d={svgPaths.p345dec00} fill="#374151" />
                <path d={svgPaths.p3fd14d00} fill="#374151" />
              </svg>
            </button>
            
            {/* User button or Avatar - Hidden on mobile */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.avatar || ""} />
                      <AvatarFallback className="bg-[#0047FF] text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 text-gray-900 mt-2">
                  <DropdownMenuLabel className="text-gray-700">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm text-gray-900 font-['Poppins',sans-serif]">{getFirstName(user.name)}</p>
                      <p className="text-xs text-gray-500 font-['Poppins',sans-serif]">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem 
                    onClick={() => onNavigate('dashboard')}
                    className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer font-['Poppins',sans-serif]"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Mi Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer font-['Poppins',sans-serif]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Negociaciones activas
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer font-['Poppins',sans-serif]">
                    <Settings className="w-4 h-4 mr-2" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem 
                    onClick={onLogout}
                    className="focus:bg-red-50 focus:text-red-600 cursor-pointer text-red-600 font-['Poppins',sans-serif]"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1e1c9a00} fill="#374151" />
                  <path d={svgPaths.p264fa0c0} fill="#374151" />
                </svg>
              </button>
            )}

            {/* Publicar button - Always visible */}
            <Button 
              onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
              className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-8 sm:h-9 px-4 sm:px-5 rounded-lg font-['Poppins',sans-serif] text-sm shadow-lg shadow-[#0047FF]/30 transition-all"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
              <Sparkles className="w-4 h-4 text-[#0047FF]" />
              <span className="text-sm text-[#0047FF] font-['Poppins',sans-serif]">Marketplace de Lujo</span>
            </div>

            {/* Título Principal */}
            <div className="space-y-6">
              <h1 className="leading-tight font-['Poppins',sans-serif] text-gray-900">
                Negocia bienes de alto valor como un pro
              </h1>
              
              <p className="text-xl text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
                Conectamos compradores y vendedores de artículos exclusivos en un espacio seguro donde puedes negociar directamente y obtener el mejor precio.
              </p>
            </div>

            {/* División visual */}
            <div className="h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>

            {/* Beneficios clave */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 font-['Poppins',sans-serif]">Negociación Directa</h3>
                  <p className="text-sm text-gray-600 font-['Poppins',sans-serif]">Comunícate sin intermediarios y cierra el mejor trato</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 font-['Poppins',sans-serif]">Pago Seguro</h3>
                  <p className="text-sm text-gray-600 font-['Poppins',sans-serif]">Transacciones protegidas para tu tranquilidad</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 font-['Poppins',sans-serif]">Artículos Exclusivos</h3>
                  <p className="text-sm text-gray-600 font-['Poppins',sans-serif]">Joyas, relojes, arte, tech premium y coleccionables únicos</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
                className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-8 py-6 text-base font-['Poppins',sans-serif] shadow-lg shadow-[#0047FF]/30 hover:shadow-xl hover:shadow-[#0047FF]/50 transition-all rounded-xl group/btn"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-base font-['Poppins',sans-serif] rounded-xl transition-all"
              >
                Explorar
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

              {/* Floating badges */}
              <div className="absolute top-8 left-8 bg-white backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  <div>
                    <p className="text-xs text-gray-500 font-['Poppins',sans-serif]">Joyas</p>
                    <p className="text-sm font-medium text-gray-900 font-['Poppins',sans-serif]">Premium</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-32 right-8 bg-white backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⌚</span>
                  <div>
                    <p className="text-xs text-gray-500 font-['Poppins',sans-serif]">Relojes</p>
                    <p className="text-sm font-medium text-gray-900 font-['Poppins',sans-serif]">Exclusivos</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-24 left-12 bg-white backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="text-xs text-gray-500 font-['Poppins',sans-serif]">Arte</p>
                    <p className="text-sm font-medium text-gray-900 font-['Poppins',sans-serif]">Único</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
