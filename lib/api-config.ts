// API Configuration
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDevelopment 
  ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
  : process.env.NEXT_PUBLIC_API_PROD_URL || 'https://api.rantti.com';

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
  return `${API_BASE_URL}${endpoint}`;
};
