import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Menu, LogOut, Settings, Package, MessageSquare } from "lucide-react";

interface MobileMenuProps {
  user: { email: string; name: string; avatar?: string } | null;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  onLogout: () => void;
}

export default function MobileMenu({ user, onNavigate, onLogout }: MobileMenuProps) {
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
          ) : (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <Button 
                onClick={() => onNavigate('login')}
                className="w-full bg-[#0047FF] hover:bg-[#0039CC] text-white h-11 shadow-lg shadow-[#0047FF]/30"
              >
                Iniciar Sesión
              </Button>
            </div>
          )}

          <nav className="flex flex-col gap-1 mb-6">
            <a href="#como-funciona" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
              Cómo funciona
            </a>
            <a href="#categorias" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
              Categorías
            </a>
            <a href="#negociaciones-activas" className="px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900">
              Negociaciones Activas
            </a>
          </nav>

          {user && (
            <>
              <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-gray-200">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-left"
                >
                  <Package className="w-5 h-5" />
                  Mi Dashboard
                </button>
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-left">
                  <MessageSquare className="w-5 h-5" />
                  Negociaciones
                </button>
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-left">
                  <Settings className="w-5 h-5" />
                  Configuración
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
  );
}
