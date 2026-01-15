import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Settings, Package, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users, Menu, X, DollarSign, Zap, Award, Star, SearchIcon, UserIcon } from "../lib/icons";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import type { CarouselApi } from "./ui/carousel";

interface HeroProps {
  user: { email: string; name: string; avatar?: string } | null;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  onLogout: () => void;
}

export default function Hero({ user, onNavigate, onLogout }: HeroProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

  // Categorías para el carousel - SOLO OBJETOS ÚNICOS
  const categories = [
    { id: 1, emoji: "💎", title: "Joyas Exclusivas", count: "23 activos" },
    { id: 2, emoji: "⌚", title: "Relojes de Lujo", count: "18 activos" },
    { id: 3, emoji: "🎨", title: "Arte & Coleccionables", count: "31 activos" },
    { id: 4, emoji: "🎮", title: "Consolas Retro", count: "15 activos" },
    { id: 5, emoji: "📱", title: "Tech Premium", count: "27 activos" }
  ];

  const logoImage = "/images/logo_rantti.png";
  const mascotImage = "/images/transparent-photoroom.webp";

  return (
    <div className="relative bg-white text-foreground overflow-hidden">
      {/* Decorative background - Más sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>
  {/* STICKY NAVIGATION - Appears on scroll */}
  <motion.nav 
    className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 ${
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
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
          >
            <img 
              src={logoImage} 
              alt="Rantti Logo" 
              className="w-auto h-7 object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#negociaciones" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Negociaciones Activas
            </a>
            <a href="#como-funciona" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Cómo funciona
            </a>
            <a href="#categorias" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Categorías
            </a>
            <a href="#servicios" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Servicios
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
            <SheetContent side="right" className="w-[280px] bg-white border-gray-200 text-gray-900 p-0">
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <SheetDescription className="sr-only">
                Accede a todas las opciones de navegación y configuración de tu cuenta
              </SheetDescription>
              
              <div className="flex flex-col h-full pt-16 px-6">
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

                <nav className="flex flex-col gap-1 mb-6">
                  <a href="#negociaciones" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                    Negociaciones Activas
                  </a>
                  <a href="#como-funciona" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                    Cómo funciona
                  </a>
                  <a href="#categorias" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                    Categorías
                  </a>
                  <a href="#servicios" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                    Servicios
                  </a>
                </nav>

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

          {/* SearchIcon button */}
          <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <SearchIcon className="w-4 h-4" />
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
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-full px-4 sm:px-6 h-12 sm:h-14 border border-gray-200 shadow-sm">
      {/* Left side - Logo + Navigation */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
        >
          <img 
            src={logoImage} 
            alt="Rantti Logo" 
            className="w-auto h-7 sm:h-8 object-contain"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#negociaciones" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Negociaciones Activas
          </a>
          <a href="#como-funciona" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Cómo funciona
          </a>
          <a href="#categorias" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Categorías
          </a>
          <a href="#servicios" className="font-['Poppins',sans-serif] text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Servicios
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
          <SheetContent side="right" className="w-[280px] bg-white border-gray-200 text-gray-900 p-0">
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
                <a href="#negociaciones" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                  Negociaciones Activas
                </a>
                <a href="#como-funciona" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                  Cómo funciona
                </a>
                <a href="#categorias" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                  Categorías
                </a>
                <a href="#servicios" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors font-['Poppins',sans-serif] text-gray-700 hover:text-gray-900">
                  Servicios
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

        {/* SearchIcon button - Hidden on mobile */}
        <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <SearchIcon className="w-4 h-4" />
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
            <UserIcon className="w-4 h-4" />
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
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-32">
    {/* LAYOUT CON DIVISIÓN CLARA - 2 COLUMNAS */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
      
      {/* COLUMNA IZQUIERDA - Presentación del Concepto */}
      <motion.div
        className="space-y-6 lg:space-y-8 lg:pr-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
          <Sparkles className="w-4 h-4 text-[#0047FF]" />
          <span className="text-sm text-[#0047FF] font-['Poppins',sans-serif]">Negocia sin intermediarios</span>
        </div>

        {/* Título Principal */}
        <div className="space-y-6">
          <p className="text-2xl text-gray-700 font-['Poppins',sans-serif] leading-relaxed font-semibold">
            El marketplace donde publicas gratis tus artículos exclusivos y negocias directamente con compradores reales.
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
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
            className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-8 py-6 text-base font-['Poppins',sans-serif] shadow-lg shadow-[#0047FF]/30 hover:shadow-xl hover:shadow-[#0047FF]/50 transition-all rounded-xl group/btn"
          >
            Publicar Gratis
            <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          
          <button className="inline-flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-6 h-[52px] text-base font-['Poppins',sans-serif] rounded-xl transition-all font-medium">
            Explorar
          </button>
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
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-gray-200 overflow-visible group/mascot">
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
          
          {/* Efecto de Pulso/Glow en esquinas */}
          <motion.div
            className="absolute -top-4 -left-4 w-20 h-20 bg-[#0047FF]/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Partículas flotantes animadas */}
          <motion.div
            className="absolute top-16 left-12 w-3 h-3 rounded-full bg-[#0047FF]/40"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-24 right-16 w-2 h-2 rounded-full bg-purple-400/50"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-2.5 h-2.5 rounded-full bg-[#0047FF]/30"
            animate={{
              y: [0, -18, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-2 h-2 rounded-full bg-purple-500/40"
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          
          {/* Más partículas en diferentes posiciones */}
          <motion.div
            className="absolute top-40 left-8 w-2 h-2 rounded-full bg-[#0047FF]/35"
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
          <motion.div
            className="absolute top-52 right-24 w-2.5 h-2.5 rounded-full bg-purple-300/45"
            animate={{
              y: [0, -14, 0],
              x: [0, -3, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
          
          {/* Iconos flotantes con significado */}
          <motion.div
            className="absolute top-20 right-12 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <TrendingUp className="w-4 h-4 text-green-600" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-36 left-8 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -8, 8, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          >
            <DollarSign className="w-4 h-4 text-[#0047FF]" />
          </motion.div>
          
          <motion.div
            className="absolute top-44 left-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.3,
            }}
          >
            <Zap className="w-4 h-4 text-yellow-500" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-24 right-16 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            animate={{
              y: [0, -11, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <Award className="w-4 h-4 text-purple-600" />
          </motion.div>
          
          {/* Estrellas brillantes */}
          <motion.div
            className="absolute top-36 right-20"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-48 left-12"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
          </motion.div>
          
          {/* Sparkles animadas */}
          <motion.div
            className="absolute top-32 right-28"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#0047FF]" />
          </motion.div>
          <motion.div
            className="absolute bottom-28 left-24"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.9, 0.4],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </motion.div>
          <motion.div
            className="absolute top-28 left-28"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Sparkles className="w-3 h-3 text-blue-400" />
          </motion.div>
          
          {/* Líneas decorativas flotantes */}
          <motion.div
            className="absolute top-24 left-16 w-12 h-0.5 bg-gradient-to-r from-[#0047FF]/40 to-transparent rounded-full"
            animate={{
              x: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-44 right-12 w-10 h-0.5 bg-gradient-to-l from-purple-400/40 to-transparent rounded-full"
            animate={{
              x: [0, -8, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Mascot con hover */}
          <div className="relative z-10 flex items-center justify-center cursor-pointer">
            <img 
              src={mascotImage} 
              alt="Rantti Mascot" 
              className="w-full max-w-xs h-auto object-contain drop-shadow-2xl group-hover/mascot:scale-105 transition-transform duration-500"
            />
            
            {/* Burbuja de diálogo que aparece al hover - Estilo mejorado - SOLO DESKTOP */}
            <div className="hidden lg:block absolute -top-36 left-1/2 -translate-x-1/2 opacity-0 group-hover/mascot:opacity-100 transition-all duration-300 pointer-events-none z-20 group-hover/mascot:translate-y-2">
              <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl px-6 py-4 shadow-2xl border-2 border-[#0047FF]/20 min-w-[320px] backdrop-blur-sm">
                {/* Brillo superior */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#0047FF]/40 to-transparent"></div>
                
                {/* Contenido de la burbuja */}
                <div className="space-y-1">
                  <p className="text-base font-['Poppins',sans-serif] font-semibold text-gray-900 text-center leading-snug">
                    Negocia Libremente.
                  </p>
                  <p className="text-sm font-['Poppins',sans-serif] text-gray-700 text-center leading-relaxed">
                    El pago se acuerda entre las partes.
                  </p>
                </div>
                
                {/* Icono decorativo */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#0047FF] rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                
                {/* Punta de la burbuja (apuntando hacia abajo) */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-blue-50"></div>
                  <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-[#0047FF]/20"></div>
                </div>
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
