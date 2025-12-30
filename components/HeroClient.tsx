"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Categories from "./Categories";
import FeaturedListings from "./FeaturedListings";
import BenefitsBlocks from "./BenefitsBlocks";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Dashboard from "./Dashboard";
import { logout, getStoredUser, isAuthenticated } from "@/lib/auth";

export default function HeroClient() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Estado de usuario - carga desde localStorage
  const [user, setUser] = useState<{ email: string; name: string; avatar?: string } | null>(null);
  
  // Estado para controlar qué página mostrar - inicializa basado en la URL
  const getPageFromPath = () => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname === '/login') return 'login';
    if (pathname === '/register') return 'register';
    if (pathname === '/forgot-password') return 'forgot-password';
    return 'home';
  };
  
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'dashboard' | 'forgot-password'>(getPageFromPath());

  // Sincronizar currentPage con cambios en la URL
  useEffect(() => {
    setCurrentPage(getPageFromPath());
  }, [pathname]);

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser({
          name: storedUser.name,
          email: storedUser.email,
          avatar: "",
        });
        
        // Si está autenticado y la URL es /dashboard, mantener en dashboard
        if (pathname === '/dashboard') {
          setCurrentPage('dashboard');
        }
        // Si está autenticado pero en home, enviar a dashboard
        else if (pathname === '/') {
          setCurrentPage('dashboard');
          router.push('/dashboard');
        }
      }
    } else {
      // Si no está autenticado y está intentando acceder a dashboard, redirigir a home
      if (pathname === '/dashboard') {
        setCurrentPage('home');
        router.push('/');
      }
    }
  }, [pathname, router]);

  // Función para manejar navegación
  const handleNavigate = (page: 'home' | 'login' | 'register' | 'dashboard' | 'forgot-password' | 'product-specs') => {
    if (page === 'product-specs') {
      console.log('Navegando a detalles del producto');
      // Aquí implementarías la navegación a la página de producto
      return;
    }
    setCurrentPage(page as 'home' | 'login' | 'register' | 'dashboard' | 'forgot-password');
    
    // Cambiar la URL usando router
    const paths = {
      'home': '/',
      'login': '/login',
      'register': '/register',
      'dashboard': '/dashboard',
      'forgot-password': '/forgot-password'
    };
    router.push(paths[page]);
    
    // Scroll al inicio cuando cambies de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para manejar logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setCurrentPage('home');
      router.push('/');
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Limpiar estado local aunque falle
      setUser(null);
      setCurrentPage('home');
      router.push('/');
    }
  };

  // Función para manejar login exitoso
  const handleLoginSuccess = (email: string, password: string) => {
    console.log('🔹 handleLoginSuccess llamado');
    // Recargar usuario desde localStorage
    const storedUser = getStoredUser();
    console.log('🔹 Usuario desde localStorage:', storedUser);
    if (storedUser) {
      const newUser = {
        name: storedUser.name,
        email: storedUser.email,
        avatar: "",
      };
      setUser(newUser);
      console.log('🔹 Usuario establecido:', newUser);
      console.log('🔹 Navegando a /dashboard...');
      setCurrentPage('dashboard');
      router.push('/dashboard');
    }
    console.log('Login exitoso:', email);
  };

  // Función para manejar registro exitoso
  const handleRegisterSuccess = (email: string, password: string, name: string) => {
    // Recargar usuario desde localStorage
    const storedUser = getStoredUser();
    if (storedUser) {
      const newUser = {
        name: storedUser.name,
        email: storedUser.email,
        avatar: "",
      };
      setUser(newUser);
      // Navegar al dashboard
      setCurrentPage('dashboard');
      router.push('/dashboard');
    }
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
    // Si no hay usuario aún, mostrar loading mientras el useEffect carga desde localStorage
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0047FF] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      );
    }
    return (
      <Dashboard 
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onUpdateUser={(updates) => {
          if (user) {
            setUser({ ...user, ...updates });
          }
        }}
      />
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
