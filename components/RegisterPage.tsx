import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, Lock, User, Phone, Zap, Menu, Users, TrendingUp, Shield, DollarSign, Star, LogOut, Package, Eye, EyeOff } from "lucide-react";
import { SearchIcon } from "@/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Footer from "./Footer";
import { logoImage } from "@/lib/images";
import { register, loginWithGoogle, loginWithFacebook } from "@/lib/auth";

interface RegisterPageProps {
  onRegisterSuccess: (email: string, password: string, name: string) => void;
  onNavigate: (page: 'home' | 'login' | 'dashboard') => void;
  user?: { email: string; name: string; avatar?: string } | null;
  onLogout?: () => void;
}

export default function RegisterPage({ onRegisterSuccess, onNavigate, user = null, onLogout }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!name || !email || !password) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        phone: phone || "",
        accept_terms: true, // Ya validado con el checkbox required
      });

      if (response.success) {
        // Registro exitoso
        onRegisterSuccess(email, password, name);
      } else {
        // Error del servidor
        setError(response.error?.message || "Error al crear la cuenta");
      }
    } catch {
      setError("Error de conexión. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleFacebookLogin = () => {
    loginWithFacebook();
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
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 via-blue-50 to-blue-100">
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
              <Link href="/#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cómo funciona
              </Link>
              <Link href="/#categorias" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Categorías
              </Link>
              <Link href="/#negociaciones-activas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Negociaciones Activas
              </Link>
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
                    <Link href="/#como-funciona" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
                      Cómo funciona
                    </Link>
                    <Link href="/#categorias" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
                      Categorías
                    </Link>
                    <Link href="/#negociaciones-activas" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
                      Negociaciones Activas
                    </Link>
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
              onClick={() => user ? onNavigate('dashboard') : onNavigate('login')}
              className="bg-[#0047FF] hover:bg-[#0039CC] text-white h-8 sm:h-9 px-4 sm:px-5 rounded-lg text-sm shadow-lg shadow-[#0047FF]/30 transition-all"
            >
              Publicar
            </Button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - TWO COLUMNS */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-300 grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - PROMOTIONAL INFO */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-full self-start shadow-sm">
              <Zap className="w-4 h-4 text-[#0047FF]" />
              <span className="text-sm text-[#0047FF]">¡Únete Gratis!</span>
            </div>

            {/* Main heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
                Empieza a negociar como un{" "}
                <span className="text-[#0047FF]">pro</span>
              </h1>
              <p className="text-lg text-gray-600">
                Miles de usuarios ya están cerrando negocios increíbles. ¡Es tu turno de unirte a la comunidad!
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#0047FF]" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Negocia directamente con compradores y vendedores verificados.
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#0047FF]" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Sistema de ofertas y contraofertas en tiempo real.
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#0047FF]" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Protección total y verificación de identidad.
                </p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-[#0047FF]" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Sin comisiones ocultas, 100% transparente.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl text-[#0047FF] mb-1">15K+</p>
                  <p className="text-xs text-gray-600">Usuarios felices</p>
                </div>
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl bg-linear-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-1">$2.5M+</p>
                  <p className="text-xs text-gray-600">Negociados</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-1">98%</p>
                  <p className="text-xs text-gray-600">Satisfacción</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
              <p className="text-gray-800 italic mb-2">
                &ldquo;Vendí mi auto en 3 días y conseguí el mejor precio. ¡Increíble!&rdquo; ⭐⭐⭐⭐⭐
              </p>
              <p className="text-xs text-gray-500">- María G., CDMX</p>
            </div>
          </div>

          {/* RIGHT COLUMN - REGISTRATION FORM */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 border border-blue-200 rounded-full mb-4">
                  <Zap className="w-3 h-3 text-[#0047FF]" />
                  <span className="text-xs text-[#0047FF]">Registro Rápido y Gratis</span>
                </div>
                <h2 className="text-3xl text-gray-900 mb-2">
                  ¡Bienvenido! ✨
                </h2>
                <p className="text-gray-600">
                  Crea tu cuenta en menos de 2 minutos
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Mensaje de error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Nombre completo
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0047FF] transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Correo electrónico
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0047FF] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Teléfono (opcional)
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0047FF] transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+52 123 456 7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Contraseña
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0047FF] transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0047FF] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirmar contraseña
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0047FF] transition-colors" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repite tu contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-11 focus:ring-2 focus:ring-[#0047FF] focus:border-[#0047FF] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0047FF] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms"
                    className="mt-1 rounded border-gray-300 bg-white text-[#0047FF] focus:ring-2 focus:ring-[#0047FF] focus:ring-offset-0 cursor-pointer" 
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    Al registrarte, aceptas nuestros{" "}
                    <a href="#" className="text-[#0047FF] hover:text-[#0039CC] transition-colors">
                      Términos y Privacidad
                    </a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 bg-[#0047FF] hover:bg-[#0039CC] shadow-lg hover:shadow-xl hover:shadow-[#0047FF]/30 transition-all transform hover:scale-[1.02] text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creando cuenta..." : "Crear mi cuenta gratis 🚀"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">o regístrate con</span>
                </div>
              </div>

              {/* Social login */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-11 transition-all group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  type="button" 
                  onClick={handleFacebookLogin}
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-11 transition-all group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>

              {/* Login link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <button 
                    onClick={() => onNavigate('login')}
                    className="text-[#0047FF] hover:text-[#0039CC] transition-colors"
                  >
                    Inicia sesión aquí 👋
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
