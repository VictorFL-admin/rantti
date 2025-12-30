"use client";

import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  onNavigate: (page: 'home' | 'login' | 'register' | 'dashboard') => void;
  onLogout: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function DashboardLayout({
  children,
  user,
  onNavigate,
  onLogout,
  currentSection,
  onSectionChange,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed en desktop */}
      <DashboardSidebar
        user={user}
        currentSection={currentSection}
        onSectionChange={onSectionChange}
        onNavigate={onNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <DashboardHeader
          user={user}
          onLogout={onLogout}
          onNavigate={onNavigate}
        />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 Rantti. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <button className="hover:text-[#0047FF] transition-colors">
                Ayuda
              </button>
              <button className="hover:text-[#0047FF] transition-colors">
                Términos
              </button>
              <button className="hover:text-[#0047FF] transition-colors">
                Privacidad
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
