// Cliente API centralizado con manejo automático de autenticación

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
  return fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
}

/**
 * Realiza una petición POST autenticada
 */
export async function apiPost(url: string, body: any): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
}

/**
 * Realiza una petición PUT autenticada
 */
export async function apiPut(url: string, body: any): Promise<Response> {
  return fetch(url, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
}

/**
 * Realiza una petición DELETE autenticada
 */
export async function apiDelete(url: string): Promise<Response> {
  return fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
}
