// API Configuration
// Ahora usamos rutas relativas - Next.js redirige automáticamente al backend
export const API_BASE_URL = '';

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: {
    FEATURED: '/api/public/categories/featured',
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
