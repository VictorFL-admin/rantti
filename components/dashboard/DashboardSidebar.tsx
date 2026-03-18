"use client";

import { 
  LayoutDashboard, 
  Settings, 
  LogOut,
  MessageCircle,
  Box,
  FileText,
  Bell,
  ArrowDownRight,
  Search,
  ShoppingCart,
  ShoppingBag,
  ArrowLeft,
  Clock,
  Bookmark,
  AlertCircle,
  Users,
  BarChart3,
  Percent
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "../ui/sheet";
import { VisuallyHidden } from "../ui/visually-hidden";

interface DashboardSidebarProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  currentSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  onLogout?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  collapsed?: boolean;
}

export default function DashboardSidebar({
  user,
  currentSection,
  onSectionChange,
  onNavigate,
  onLogout,
  mobileMenuOpen = false,
  setMobileMenuOpen,
  collapsed = false,
}: DashboardSidebarProps) {
  const [submenuView, setSubmenuView] = useState<'main' | 'compras' | 'ventas'>('main');
  const [comprasSubSection, setComprasSubSection] = useState('actividad-reciente');
  const [ventasSubSection, setVentasSubSection] = useState('panel-vendedores');

  const handleSetMobileMenuOpen = (open: boolean) => {
    console.log('📋 Sheet estado cambiando a:', open);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(open);
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

  const renderSidebarContent = (onItemClick?: () => void) => {
    // Vista Principal
    if (submenuView === 'main') {
      return (
        <>
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex justify-center">
            <button 
              onClick={() => {
                onNavigate('home');
                onItemClick?.();
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="/images/logo_rantti.png" 
                alt="Rantti Logo" 
                className="w-auto h-8 object-contain"
              />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="bg-[#0047FF] text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{getFirstName(user.name)}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en Rantti"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047FF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={currentSection === "overview" ? "default" : "ghost"}
              className={currentSection === "overview" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                onSectionChange("overview");
                onItemClick?.();
              }}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Explorar Hoy
            </Button>
            <Button
              variant={currentSection === "notifications" ? "default" : "ghost"}
              className={currentSection === "notifications" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                onSectionChange("notifications");
                onItemClick?.();
              }}
            >
              <Bell className="w-5 h-5 mr-3" />
              Notificaciones
            </Button>
            <Button
              variant={currentSection === "chats" ? "default" : "ghost"}
              className={currentSection === "chats" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                onSectionChange("chats");
                onItemClick?.();
              }}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Chats
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-gray-400 hover:bg-transparent opacity-50 cursor-not-allowed"
              disabled
            >
              <FileText className="w-5 h-5 mr-3" />
              Especificaciones
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => {
                setSubmenuView('compras');
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Compras
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => {
                setSubmenuView('ventas');
              }}
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Ventas
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-gray-400 hover:bg-transparent opacity-50 cursor-not-allowed"
              disabled
            >
              <Box className="w-5 h-5 mr-3" />
              Paquete
            </Button>
            <Button
              variant={currentSection === "settings" ? "default" : "ghost"}
              className={currentSection === "settings" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                onSectionChange("settings");
                onItemClick?.();
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              Configuración
            </Button>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              onClick={() => {
                onNavigate('home');
                onItemClick?.();
              }}
            >
              <ArrowDownRight className="w-5 h-5 mr-3" />
              Ir al Marketplace
            </Button>
            {onLogout && (
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  onLogout();
                  onItemClick?.();
                }}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Cerrar Sesión
              </Button>
            )}
          </div>
        </>
      );
    }

    // Vista Submenu COMPRAS
    if (submenuView === 'compras') {
      return (
        <>
          {/* Header con Flecha de Regreso */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSubmenuView('main')}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <p className="text-sm text-gray-500">Marketplace</p>
                <p className="text-lg font-semibold text-[#0047FF]">COMPRA</p>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en Rantti"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047FF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Compras */}
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={comprasSubSection === "actividad-reciente" ? "default" : "ghost"}
              className={comprasSubSection === "actividad-reciente" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setComprasSubSection("actividad-reciente");
                onSectionChange("negotiations");
                onItemClick?.();
              }}
            >
              <Clock className="w-5 h-5 mr-3" />
              Actividad Reciente
            </Button>
            <Button
              variant={comprasSubSection === "guardados" ? "default" : "ghost"}
              className={comprasSubSection === "guardados" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setComprasSubSection("guardados");
                onSectionChange("negotiations");
                onItemClick?.();
              }}
            >
              <Bookmark className="w-5 h-5 mr-3" />
              Guardados
            </Button>
            <Button
              variant={comprasSubSection === "tus-alertas" ? "default" : "ghost"}
              className={comprasSubSection === "tus-alertas" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setComprasSubSection("tus-alertas");
                onSectionChange("negotiations");
                onItemClick?.();
              }}
            >
              <AlertCircle className="w-5 h-5 mr-3" />
              Tus alertas
            </Button>
            <Button
              variant={comprasSubSection === "seguidos" ? "default" : "ghost"}
              className={comprasSubSection === "seguidos" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setComprasSubSection("seguidos");
                onSectionChange("negotiations");
                onItemClick?.();
              }}
            >
              <Users className="w-5 h-5 mr-3" />
              Seguidos
            </Button>
            <Button
              variant={comprasSubSection === "perfil-marketplace" ? "default" : "ghost"}
              className={comprasSubSection === "perfil-marketplace" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setComprasSubSection("perfil-marketplace");
                onSectionChange("negotiations");
                onItemClick?.();
              }}
            >
              <Avatar className="w-5 h-5 mr-3">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="bg-[#0047FF] text-white text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span>Perfil de Marketplace</span>
            </Button>
          </nav>

          {/* Botón Crear Publicación */}
          <div className="p-4 border-t border-gray-200">
            <Button
              className="w-full justify-center bg-[#0047FF] hover:bg-[#0039CC] text-white"
              onClick={() => {
                // Aquí puedes agregar la lógica para crear publicación
                onItemClick?.();
              }}
            >
              Crear Publicación
            </Button>
          </div>
        </>
      );
    }

    // Vista Submenu VENTAS
    if (submenuView === 'ventas') {
      return (
        <>
          {/* Header con Flecha de Regreso */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSubmenuView('main')}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <p className="text-sm text-gray-500">Marketplace</p>
                <p className="text-lg font-semibold text-[#0047FF]">VENTA</p>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en Rantti"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0047FF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Ventas */}
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={ventasSubSection === "panel-vendedores" ? "default" : "ghost"}
              className={ventasSubSection === "panel-vendedores" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setVentasSubSection("panel-vendedores");
                onSectionChange("payments");
                onItemClick?.();
              }}
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Panel de vendedores
            </Button>
            <Button
              variant={ventasSubSection === "tus-publicaciones" ? "default" : "ghost"}
              className={ventasSubSection === "tus-publicaciones" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setVentasSubSection("tus-publicaciones");
                onSectionChange("payments");
                onItemClick?.();
              }}
            >
              <Box className="w-5 h-5 mr-3" />
              Tus publicaciones
            </Button>
            <Button
              variant={ventasSubSection === "avisos" ? "default" : "ghost"}
              className={ventasSubSection === "avisos" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setVentasSubSection("avisos");
                onSectionChange("payments");
                onItemClick?.();
              }}
            >
              <Bell className="w-5 h-5 mr-3" />
              Avisos
            </Button>
            <Button
              variant={ventasSubSection === "estadisticas" ? "default" : "ghost"}
              className={ventasSubSection === "estadisticas" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setVentasSubSection("estadisticas");
                onSectionChange("payments");
                onItemClick?.();
              }}
            >
              <Percent className="w-5 h-5 mr-3" />
              Estadísticas
            </Button>
            <Button
              variant={ventasSubSection === "perfil-marketplace" ? "default" : "ghost"}
              className={ventasSubSection === "perfil-marketplace" 
                ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
                : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
              onClick={() => {
                setVentasSubSection("perfil-marketplace");
                onSectionChange("payments");
                onItemClick?.();
              }}
            >
              <Avatar className="w-5 h-5 mr-3">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="bg-[#0047FF] text-white text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span>Perfil de Marketplace</span>
            </Button>
          </nav>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex-col ${
        collapsed ? 'hidden' : 'hidden md:flex'
      }`}>
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sidebar - Sheet/Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={handleSetMobileMenuOpen}>
        <SheetContent side="left" className="w-64 bg-white border-gray-200 p-0">
          <VisuallyHidden>
            <SheetTitle>Menú de Navegación</SheetTitle>
            <SheetDescription>
              Navega por el dashboard de Rantti
            </SheetDescription>
          </VisuallyHidden>
          <div className="flex flex-col h-full">
            {renderSidebarContent(() => handleSetMobileMenuOpen(false))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
