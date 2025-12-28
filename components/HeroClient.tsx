"use client";

import { useState } from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Categories from "./Categories";
import FeaturedListings from "./FeaturedListings";
import BenefitsBlocks from "./BenefitsBlocks";
import Footer from "./Footer";

export default function HeroClient() {
  // Estado de usuario simulado - en producción vendría de tu sistema de auth
  const [user, setUser] = useState<{ email: string; name: string; avatar?: string } | null>(null);

  // Función para manejar navegación
  const handleNavigate = (page: 'home' | 'login' | 'register' | 'dashboard' | 'product-specs') => {
    // Aquí puedes implementar la navegación real con Next.js router
    console.log(`Navegando a: ${page}`);
  };

  // Función para manejar logout
  const handleLogout = () => {
    setUser(null);
    console.log('Usuario cerró sesión');
  };

  // Función simulada de login (para pruebas)
  const handleLogin = () => {
    setUser({
      name: "Juan Pérez",
      email: "juan@example.com",
      avatar: ""
    });
  };

  return (
    <>
      <Hero 
        user={user} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
      />
      
      {/* Sección Cómo Funciona */}
      <div id="como-funciona">
        <HowItWorks onNavigate={handleNavigate} />
      </div>
      
      {/* Sección Categorías Populares */}
      <Categories />
      
      {/* Sección Negociaciones Activas */}
      <FeaturedListings onNavigate={handleNavigate} />
      
      {/* Sección Beneficios */}
      <BenefitsBlocks onNavigate={handleNavigate} />
      
      {/* Footer */}
      <Footer />

      {/* Botón temporal para simular login (solo para desarrollo) */}
      {!user && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            Simular Login (Dev)
          </button>
        </div>
      )}
    </>
  );
}
