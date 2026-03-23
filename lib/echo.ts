import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

// Configuración de Pusher (solo en el cliente)
if (typeof window !== 'undefined') {
  window.Pusher = Pusher;
}

// Función para obtener el token de autenticación
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Configurar Echo con Pusher
const initializeEcho = (): Echo<any> | null => {
  const token = getAuthToken();
  
  if (!token) {
    console.warn('⚠️ No auth token found. WebSocket connection not initialized.');
    return null;
  }

  const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '64c8c7ba34292d723e38',
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || 'us2',
    forceTLS: true,
    authEndpoint: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  });

  console.log('✅ Laravel Echo initialized with Pusher');
  return echo;
};

// Exportar instancia única de Echo
let echoInstance: Echo<any> | null = null;

export const getEcho = (): Echo<any> | null => {
  if (!echoInstance) {
    echoInstance = initializeEcho();
  }
  return echoInstance;
};

export const disconnectEcho = (): void => {
  if (echoInstance) {
    echoInstance.disconnect();
    echoInstance = null;
    console.log('🔌 Laravel Echo disconnected');
  }
};

export default getEcho;
