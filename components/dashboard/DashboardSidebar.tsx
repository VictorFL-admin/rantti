"use client";

import { Home, Package, MessageSquare, Heart, Settings, TrendingUp, Menu, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logoImage } from "@/lib/images";
import Image from "next/image";

interface DashboardSidebarProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  currentSection: string;
  onSectionChange: (section: string) => void;
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
}

export default function DashboardSidebar({
  user,
  currentSection,
  onSectionChange,
  onNavigate,
}: DashboardSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Inicio', icon: Home },
    { id: 'listings', label: 'Mis Publicaciones', icon: Package },
    { id: 'negotiations', label: 'Negociaciones', icon: TrendingUp, badge: 3 },
    { id: 'messages', label: 'Mensajes', icon: MessageSquare, badge: 5 },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image 
            src={logoImage} 
            alt="Rantti Logo" 
            width={120}
            height={32}
            className="w-auto h-8 object-contain"
          />
        </button>
      </div>

      {/* User Info */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 ring-2 ring-[#0047FF]/20">
            <AvatarImage src={user.avatar || ""} />
            <AvatarFallback className="bg-[#0047FF] text-white text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onSectionChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#0047FF] text-white shadow-lg shadow-[#0047FF]/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="flex-1 text-left font-medium text-sm">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#0047FF] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Action Button */}
      <div className="px-6 pb-6">
        <button className="w-full bg-gradient-to-r from-[#0047FF] to-[#0066FF] text-white py-3 px-4 rounded-lg font-semibold shadow-lg shadow-[#0047FF]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <Package className="w-5 h-5" />
          Publicar Artículo
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-700"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-white border-r border-gray-200 shadow-sm">
        <SidebarContent />
      </aside>
    </>
  );
}
