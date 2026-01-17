"use client";

import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Settings, 
  LogOut,
  MessageCircle,
  Menu,
  Box,
  FileText,
  Bell,
  CreditCard,
  ArrowDownRight,
  X
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
}

export default function DashboardSidebar({
  user,
  currentSection,
  onSectionChange,
  onNavigate,
  onLogout,
}: DashboardSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
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
          Dashboard
        </Button>
        <Button
          variant={currentSection === "listings" ? "default" : "ghost"}
          className={currentSection === "listings" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <Package className="w-5 h-5 mr-3" />
          Mis Publicaciones
        </Button>
        <Button
          variant={currentSection === "negotiations" ? "default" : "ghost"}
          className={currentSection === "negotiations" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <MessageSquare className="w-5 h-5 mr-3" />
          Negociaciones
        </Button>
        <Button
          variant={currentSection === "chats" ? "default" : "ghost"}
          className={currentSection === "chats" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          Chats
        </Button>
        <Button
          variant={currentSection === "notifications" ? "default" : "ghost"}
          className={currentSection === "notifications" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <Bell className="w-5 h-5 mr-3" />
          Notificaciones
        </Button>
        <Button
          variant={currentSection === "payments" ? "default" : "ghost"}
          className={currentSection === "payments" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <CreditCard className="w-5 h-5 mr-3" />
          Pagos
        </Button>
        <Button
          variant={currentSection === "packages" ? "default" : "ghost"}
          className={currentSection === "packages" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <Box className="w-5 h-5 mr-3" />
          Paquetes
        </Button>
        <Button
          variant={currentSection === "specifications" ? "default" : "ghost"}
          className={currentSection === "specifications" 
            ? "w-full justify-start bg-[#0047FF] hover:bg-[#0039CC] text-white" 
            : "w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100 opacity-50 cursor-not-allowed"
          }
          disabled
        >
          <FileText className="w-5 h-5 mr-3" />
          Especificaciones
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

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Sheet/Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 bg-white border-gray-200 p-0">
          <VisuallyHidden>
            <SheetTitle>Menú de Navegación</SheetTitle>
            <SheetDescription>
              Navega por el dashboard de Rantti
            </SheetDescription>
          </VisuallyHidden>
          <div className="flex flex-col h-full">
            <SidebarContent onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
