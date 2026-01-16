"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, Menu, LogOut, Package, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { SearchIcon } from "@/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Footer from "./Footer";
import { logoImage } from "@/lib/images";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";

interface ResetPasswordPageProps {
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  user?: { email: string; name: string; avatar?: string } | null;
  onLogout?: () => void;
  token?: string;
  email?: string;
}

export default function ResetPasswordPage({ onNavigate, user = null, onLogout, token, email }: ResetPasswordPageProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (!token || !email) {
      setTokenValid(false);
      setError("No se proporcionó un token o email válido");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !email) {
      setError("Token o email no válido");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.AUTH.RESET_PASSWORD), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          email,
          newPassword 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          onNavigate('login');
        }, 3000);
      } else {
        setError(data.error || 'Error al restablecer la contraseña');
        if (data.error?.includes('expirado') || data.error?.includes('inválido')) {
          setTokenValid(false);
        }
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
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
            {success ? (
              <>
                {/* Success state */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-3xl text-gray-900 mb-2">
                    ¡Contraseña actualizada! ✓
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Tu contraseña ha sido restablecida exitosamente
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700 text-center">
                    Redirigiendo al login en unos segundos...
                  </p>
                </div>

                <Button 
                  onClick={() => onNavigate('login')}
                  className="w-full h-12 bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl hover:shadow-[#0047FF]/30 transition-all"
                >
                  Ir al login ahora
                </Button>
              </>
            ) : !tokenValid ? (
              <>
                {/* Invalid token state */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl text-gray-900 mb-2">
                    Enlace inválido o expirado
                  </h1>
                  <p className="text-gray-600">
                    El enlace de recuperación no es válido o ha expirado
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Por favor, solicita un nuevo enlace de recuperación desde la página de login.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => onNavigate('home')}
                    className="w-full h-12 bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl hover:shadow-[#0047FF]/30 transition-all"
                  >
                    Volver al inicio
                  </Button>
                  <Button 
                    onClick={() => onNavigate('login')}
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:bg-gray-50"
                  >
                    Ir al login
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl text-gray-900 mb-2">
                    Crear nueva contraseña
                  </h1>
                  <p className="text-gray-600">
                    Ingresa tu nueva contraseña para tu cuenta de Rantti
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-900 flex items-center gap-1">
                      Nueva contraseña
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#0047FF] transition-colors" />
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-12 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Mínimo 8 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-900 flex items-center gap-1">
                      Confirmar contraseña
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#0047FF] transition-colors" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-12 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl hover:shadow-[#0047FF]/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Actualizando...' : 'Restablecer contraseña'}
                  </Button>

                  <div className="text-center">
                    <button 
                      type="button"
                      onClick={() => onNavigate('login')}
                      className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors"
                    >
                      Volver al login
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
