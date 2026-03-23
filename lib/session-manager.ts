/**
 * Session Manager
 * Maneja SOLO la detección de inactividad del usuario en el frontend.
 * La expiración del token la controla el BACKEND (Laravel Sanctum).
 */

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hora de inactividad en milisegundos
const LAST_ACTIVITY_KEY = 'last_activity';

let inactivityTimer: NodeJS.Timeout | null = null;
let onSessionExpired: (() => void) | null = null;

/**
 * Actualiza el timestamp de última actividad
 */
export function updateActivity(): void {
  if (typeof window === 'undefined') return;
  
  const now = Date.now().toString();
  localStorage.setItem(LAST_ACTIVITY_KEY, now);
  
  // Reiniciar el timer de inactividad
  resetInactivityTimer();
}

/**
 * Verifica si la sesión ha expirado por inactividad del usuario
 * NOTA: El backend controla la expiración real del token
 */
export function isSessionExpired(): boolean {
  if (typeof window === 'undefined') return false;
  
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
  const authToken = localStorage.getItem('auth_token');
  
  // Si no hay token pero sí hay datos de sesión antiguos, limpiarlos
  if (!authToken && lastActivity) {
    clearSessionData();
    return false;
  }
  
  if (!lastActivity) return false;
  
  const lastActivityTime = parseInt(lastActivity, 10);
  const now = Date.now();
  
  // Verificar expiración por INACTIVIDAD solamente
  const timeSinceLastActivity = now - lastActivityTime;
  if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
    console.log('⏱️ Usuario inactivo por más de 1 hora');
    return true;
  }
  
  return false;
}

/**
 * Reinicia el timer de inactividad
 */
function resetInactivityTimer(): void {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  inactivityTimer = setTimeout(() => {
    if (onSessionExpired) {
      console.log('⏱️ Sesión expirada por inactividad');
      onSessionExpired();
    }
  }, INACTIVITY_TIMEOUT);
}

/**
 * Inicia el monitoreo de actividad del usuario
 * SOLO detecta inactividad en el frontend. El backend controla la expiración real.
 */
export function startSessionMonitoring(onExpired: () => void): void {
  if (typeof window === 'undefined') return;
  
  onSessionExpired = onExpired;
  
  // Verificar si ya expiró por inactividad al iniciar
  if (isSessionExpired()) {
    console.log('⏱️ Usuario estaba inactivo');
    onExpired();
    return;
  }
  
  // Actualizar actividad inicial
  updateActivity();
  
  // Eventos que indican actividad del usuario
  const events = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
  ];
  
  // Agregar listeners con throttle para no actualizar constantemente
  let lastUpdate = 0;
  const throttleDelay = 30000; // Actualizar máximo cada 30 segundos
  
  const throttledUpdate = () => {
    const now = Date.now();
    if (now - lastUpdate > throttleDelay) {
      lastUpdate = now;
      updateActivity();
    }
  };
  
  events.forEach(event => {
    window.addEventListener(event, throttledUpdate, true);
  });
  
  // Guardar referencia para limpieza posterior
  if (!window.__sessionMonitoringActive) {
    window.__sessionMonitoringActive = true;
  }
}

/**
 * Detiene el monitoreo de sesión
 */
export function stopSessionMonitoring(): void {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    window.__sessionMonitoringActive = false;
  }
  
  onSessionExpired = null;
}

/**
 * Limpia los datos de sesión
 */
export function clearSessionData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LAST_ACTIVITY_KEY);
}

// Declaración de tipos globales
declare global {
  interface Window {
    __sessionMonitoringActive?: boolean;
  }
}
