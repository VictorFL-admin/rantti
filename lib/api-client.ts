// Cliente API centralizado con manejo automático de autenticación
import { clearSessionData } from "./session-manager";

// Callback para manejar sesión expirada (será establecido por el componente principal)
let onSessionExpiredCallback: (() => void) | null = null;

/**
 * Establece el callback para cuando la sesión expire
 */
export function setSessionExpiredCallback(callback: () => void): void {
  onSessionExpiredCallback = callback;
}

/**
 * Maneja errores 401 (token expirado/inválido)
 */
function handleUnauthorized(): void {
  console.error('🔒 Token expirado o inválido - cerrando sesión');
  
  // Limpiar datos
  removeAuthToken();
  localStorage.removeItem('user');
  clearSessionData();
  
  // Llamar al callback si existe
  if (onSessionExpiredCallback) {
    onSessionExpiredCallback();
  }
}

/**
 * Obtiene el token de autenticación del localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Guarda el token de autenticación en localStorage
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Elimina el token de autenticación del localStorage
 */
export function removeAuthToken(): void {
  localStorage.removeItem('auth_token');
}

/**
 * Obtiene los headers por defecto con autenticación
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Realiza una petición GET autenticada
 */
export async function apiGet(url: string): Promise<Response> {
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  
  // Detectar token expirado
  if (response.status === 401) {
    handleUnauthorized();
  }
  
  return response;
}

/**
 * Realiza una petición POST autenticada
 */
export async function apiPost(url: string, body: any): Promise<Response> {
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  
  // Detectar token expirado
  if (response.status === 401) {
    handleUnauthorized();
  }
  
  return response;
}

/**
 * Realiza una petición PUT autenticada
 */
export async function apiPut(url: string, body: any): Promise<Response> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  
  // Detectar token expirado
  if (response.status === 401) {
    handleUnauthorized();
  }
  
  return response;
}

/**
 * Realiza una petición DELETE autenticada
 */
export async function apiDelete(url: string): Promise<Response> {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  // Detectar token expirado
  if (response.status === 401) {
    handleUnauthorized();
  }
  
  return response;
}

/**
 * Realiza una petición POST con FormData (para archivos/imágenes)
 */
export async function apiPostFormData(url: string, formData: FormData): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // NO establecer Content-Type manualmente - el navegador lo hace automáticamente con boundary
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  // Detectar token expirado
  if (response.status === 401) {
    handleUnauthorized();
  }
  
  return response;
}
