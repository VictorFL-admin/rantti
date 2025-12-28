"use client";

import { useState } from "react";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Categories from "./Categories";
import FeaturedListings from "./FeaturedListings";
import BenefitsBlocks from "./BenefitsBlocks";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";

export default function HeroClient() {
  // Estado de usuario simulado - en producción vendría de tu sistema de auth
  const [user, setUser] = useState<{ email: string; name: string; avatar?: string } | null>(null);
  
  // Estado para controlar qué página mostrar
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'dashboard' | 'forgot-password'>('home');

  // Función para manejar navegación
  const handleNavigate = (page: 'home' | 'login' | 'register' | 'dashboard' | 'forgot-password' | 'product-specs') => {
    if (page === 'product-specs') {
      console.log('Navegando a detalles del producto');
      // Aquí implementarías la navegación a la página de producto
      return;
    }
    setCurrentPage(page as 'home' | 'login' | 'register' | 'dashboard' | 'forgot-password');
    // Scroll al inicio cuando cambies de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para manejar logout
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    console.log('Usuario cerró sesión');
  };

  // Función para manejar login exitoso
  const handleLoginSuccess = (email: string, password: string) => {
    setUser({
      name: email.split('@')[0], // Usar parte del email como nombre temporal
      email: email,
      avatar: ""
    });
    setCurrentPage('home');
    console.log('Login exitoso:', email);
  };

  // Función para manejar registro exitoso
  const handleRegisterSuccess = (email: string, password: string, name: string) => {
    setUser({
      name: name,
      email: email,
      avatar: ""
    });
    setCurrentPage('home');
    console.log('Registro exitoso:', name, email);
  };

  // Renderizar página según el estado
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <RegisterPage 
        onRegisterSuccess={handleRegisterSuccess}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'forgot-password') {
    return (
      <ForgotPasswordPage 
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">Bienvenido, {user?.name}!</p>
          <button
            onClick={() => handleNavigate('home')}
            className="bg-[#0047FF] hover:bg-[#0039CC] text-white px-6 py-3 rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Página principal (home)
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
      <div id="categorias">
        <Categories />
      </div>
      
      {/* Sección Negociaciones Activas */}
      <div id="negociaciones-activas">
        <FeaturedListings onNavigate={handleNavigate} />
      </div>
      
      {/* Sección Beneficios */}
      <BenefitsBlocks onNavigate={handleNavigate} />
      
      {/* Footer */}
      <Footer />
    </>
  );
}
