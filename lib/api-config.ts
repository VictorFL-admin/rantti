// API Configuration
// Ahora usamos rutas relativas - Next.js redirige automáticamente al backend
export const API_BASE_URL = '';

// Helper para obtener la URL absoluta del backend (para WebSocket/Pusher)
export const getBackendUrl = (): string => {
  if (typeof window === 'undefined') {
    // En el servidor, usar la URL de producción o desarrollo según NODE_ENV
    return process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
      : process.env.NEXT_PUBLIC_API_PROD_URL || 'https://api.rantti.com';
  }
  
  // En el cliente, detectar si estamos en producción o desarrollo
  const isProduction = window.location.hostname !== 'localhost';
  return isProduction
    ? process.env.NEXT_PUBLIC_API_PROD_URL || 'https://api.rantti.com'
    : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
};

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: {
    FEATURED: '/api/public/categories/featured',
  },
  LISTINGS: {
    PUBLIC: '/api/public/listings',  // Para "Explorar Hoy" en Dashboard
    DETAILS: (id: string | number) => `/api/public/listings/${id}`, // Detalles del producto
    SELL: '/api/listings/sell',     // Crear publicación de VENTA
    BUY: '/api/listings/buy',       // Crear publicación de COMPRA
    USER_LISTINGS: '/api/user/listings', // Obtener mis publicaciones (con filtros: type, status)
  },
  OFFERS: {
    SEND: '/api/offers/send',       // Enviar oferta (crea todo: oferta + chat + mensaje)
    ACCEPT: (id: string | number) => `/api/offers/${id}/accept`,
    REJECT: (id: string | number) => `/api/offers/${id}/reject`,
    COUNTER: (id: string | number) => `/api/offers/${id}/counter`,
  },
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    USER: '/api/auth/user',
    GOOGLE: '/api/auth/google',
    FACEBOOK: '/api/auth/facebook',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  DASHBOARD: '/api/dashboard',
  USER: {
    PROFILE: '/api/user/profile',
    AVATAR: '/api/user/avatar',
    PASSWORD: '/api/user/password',
    ACCOUNT: '/api/user/account',
    NOTIFICATIONS: '/api/user/notifications',
  },
};

// Helper function to build full URL
export const getApiUrl = (endpoint: string) => {
  // En el servidor, necesitamos URL absoluta
  if (typeof window === 'undefined') {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${baseUrl}${endpoint}`;
  }
  // En el cliente, URL relativa funciona bien
  return `${API_BASE_URL}${endpoint}`;
};
