import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Mail, Lock, Menu, Sparkles, LogOut, Package } from "lucide-react";
import { SearchIcon } from "@/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Footer from "./Footer";
import { logoImage } from "@/lib/images";

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  onNavigate: (page: 'home' | 'register' | 'dashboard' | 'forgot-password') => void;
  prefillEmail?: string;
  prefillPassword?: string;
  user?: { email: string; name: string; avatar?: string } | null;
  onLogout?: () => void;
}

export default function LoginPage({ onLoginSuccess, onNavigate, prefillEmail = "", prefillPassword = "", user = null, onLogout }: LoginPageProps) {
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState(prefillPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Login successful, pass email to get user data
      onLoginSuccess(email);
    }
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
      {/* NAVIGATION */}
      <nav className="relative z-50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-full px-4 sm:px-6 h-12 sm:h-14 border border-gray-200 shadow-sm">
          {/* Left side - Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
            >
              <img 
                src={logoImage} 
                alt="Rantti Logo" 
                className="w-auto h-7 sm:h-8 object-contain"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="/#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cómo funciona
              </a>
              <a href="/#categorias" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Categorías
              </a>
              <a href="/#negociaciones-activas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Negociaciones Activas
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
                          <p className="text-gray-900 font-medium">{getFirstName(user.name)}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <nav className="flex flex-col gap-1 mb-6">
                    <a href="/#como-funciona" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
                      Cómo funciona
                    </a>
                    <a href="/#categorias" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
                      Categorías
                    </a>
                    <a href="/#negociaciones-activas" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
                      Negociaciones Activas
                    </a>
                  </nav>

                  {user && onLogout && (
                    <>
                      <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-gray-200">
                        <button
                          onClick={() => onNavigate('dashboard')}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-left"
                        >
                          <Package className="w-5 h-5" />
                          Mi Dashboard
                        </button>
                      </div>

                      <div className="mt-auto pb-8">
                        <button
                          onClick={onLogout}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600 hover:text-red-700 w-full text-left"
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

            {/* Search Icon - Desktop */}
            <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
              <SearchIcon className="w-4 h-4" />
            </button>

            {/* User Menu - Desktop (only if logged in) */}
            {user && (
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
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm text-gray-900">{getFirstName(user.name)}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => onNavigate('dashboard')}
                    className="cursor-pointer"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Mi Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {onLogout && (
                    <DropdownMenuItem 
                      onClick={onLogout}
                      className="cursor-pointer text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Publicar button */}
            <Button 
              onClick={() => user ? onNavigate('dashboard') : onNavigate('register')}
              className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-8 sm:h-9 px-4 sm:px-5 rounded-lg text-sm shadow-lg shadow-[#0047FF]/30 transition-all"
            >
              Publicar
            </Button>
          </div>
        </div>
      </nav>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 border border-blue-200 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-[#0047FF]" />
                <span className="text-xs text-[#0047FF]">Inicio de Sesión Seguro</span>
              </div>
              <h1 className="text-3xl text-gray-900 mb-2">
                ¡Hola de nuevo!
              </h1>
              <p className="text-gray-600">
                Nos alegra verte. Continúa negociando donde lo dejaste.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 flex items-center gap-1">
                  Correo electrónico
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#0047FF] transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-12 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 flex items-center gap-1">
                  Contraseña
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#0047FF] transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-12 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 bg-white text-[#0047FF] focus:ring-2 focus:ring-[#0047FF] focus:ring-offset-0 cursor-pointer" 
                  />
                  <span className="group-hover:text-gray-900 transition-colors">Recordarme</span>
                </label>
                <button 
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-[#0047FF] hover:text-[#0039CC] transition-colors cursor-pointer"
                >
                  ¿Olvidaste tu contraseña? 🔑
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl hover:shadow-[#0047FF]/30 transition-all transform hover:scale-[1.02]"
              >
                Iniciar Sesión 🚀
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <Separator className="bg-gray-200" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                o continúa con
              </span>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-12 transition-all group">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-12 transition-all group">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            {/* Register link */}
            <div className="text-center">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  ¿Primera vez aquí? 
                  <button 
                    onClick={() => onNavigate('register')}
                    className="ml-1 text-[#0047FF] hover:text-[#0039CC] transition-colors cursor-pointer"
                  >
                    ¡Únete gratis! ✨
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
