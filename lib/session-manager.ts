/**
 * Session Manager
 * Maneja la expiración automática de sesión por inactividad y tiempo absoluto
 */

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hora en milisegundos
const ABSOLUTE_TIMEOUT = 60 * 60 * 1000; // 1 hora desde el login (igual que el backend)
const LAST_ACTIVITY_KEY = 'last_activity';
const LOGIN_TIME_KEY = 'login_time';

let inactivityTimer: NodeJS.Timeout | null = null;
let absoluteTimer: NodeJS.Timeout | null = null;
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
 * Verifica si la sesión ha expirado por inactividad o tiempo absoluto
 */
export function isSessionExpired(): boolean {
  if (typeof window === 'undefined') return false;
  
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
  const loginTime = localStorage.getItem(LOGIN_TIME_KEY);
  
  if (!lastActivity || !loginTime) return false;
  
  const lastActivityTime = parseInt(lastActivity, 10);
  const loginTimestamp = parseInt(loginTime, 10);
  const now = Date.now();
  
  // Verificar expiración por inactividad
  const timeSinceLastActivity = now - lastActivityTime;
  if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
    console.log('⏱️ Sesión expirada por INACTIVIDAD');
    return true;
  }
  
  // Verificar expiración por tiempo absoluto desde el login
  const timeSinceLogin = now - loginTimestamp;
  if (timeSinceLogin > ABSOLUTE_TIMEOUT) {
    console.log('⏱️ Sesión expirada por TIEMPO ABSOLUTO (60 min desde login)');
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
 */
export function startSessionMonitoring(onExpired: () => void): void {
  if (typeof window === 'undefined') return;
  
  onSessionExpired = onExpired;
  
  // Verificar si ya expiró al iniciar
  if (isSessionExpired()) {
    console.log('⏱️ Sesión ya estaba expirada');
    onExpired();
    return;
  }
  
  // Establecer timestamp de login si no existe
  if (!localStorage.getItem(LOGIN_TIME_KEY)) {
    const now = Date.now().toString();
    localStorage.setItem(LOGIN_TIME_KEY, now);
  }
  
  // Actualizar actividad inicial
  updateActivity();
  
  // Timer absoluto: expira después de 60 minutos desde el login
  const loginTime = parseInt(localStorage.getItem(LOGIN_TIME_KEY) || Date.now().toString(), 10);
  const timeUntilAbsoluteExpiration = ABSOLUTE_TIMEOUT - (Date.now() - loginTime);
  
  if (timeUntilAbsoluteExpiration > 0) {
    absoluteTimer = setTimeout(() => {
      console.log('⏱️ Sesión expirada por tiempo absoluto (60 min desde login)');
      if (onSessionExpired) {
        onSessionExpired();
      }
    }, timeUntilAbsoluteExpiration);
  }
  
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
  
  if (absoluteTimer) {
    clearTimeout(absoluteTimer);
    absoluteTimer = null;
  }
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.removeItem(LOGIN_TIME_KEY);
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
  localStorage.removeItem(LOGIN_TIME_KEY);
}

// Declaración de tipos globales
declare global {
  interface Window {
    __sessionMonitoringActive?: boolean;
  }
}
