import { getApiUrl, API_ENDPOINTS } from "./api-config";
import { clearSessionData } from "./session-manager";
import { presenceService } from "./services/presence-service";

// Tipos
export interface RegisterData {
  name: string;
  email: string;
  username?: string;
  password: string;
  password_confirmation: string;
  phone: string;
  accept_terms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  avatar?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string; // Token puede estar en el nivel superior
  data?: {
    user: User;
    token?: string; // O dentro de data
    token_type?: string;
  };
  user?: User; // Usuario puede estar en el nivel superior también
  error?: {
    message: string;
    code: string;
    errors?: { [key: string]: string[] }; // Errores de validación por campo
  };
}

// Función de registro
export async function register(userData: RegisterData): Promise<AuthResponse> {
  try {
    // Paso 1: Obtener cookie CSRF
    const csrfUrl = getApiUrl("/sanctum/csrf-cookie");
    await fetch(csrfUrl, {
      method: "GET",
      credentials: "include",
    });

    // Paso 2: Hacer el registro
    const url = getApiUrl(API_ENDPOINTS.AUTH.REGISTER);
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data: AuthResponse = await response.json();

    // Si la respuesta HTTP no es exitosa pero tenemos data, devolver el error del backend
    if (!response.ok) {
      // Extraer los errores específicos si existen
      let errorMessage = data.error?.message || data.message || "Error al crear la cuenta";
      
      // Si hay errores de validación específicos, construir un mensaje más detallado
      if (data.error?.errors) {
        const errorMessages: string[] = [];
        Object.values(data.error.errors).forEach(fieldErrors => {
          errorMessages.push(...fieldErrors);
        });
        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join('. ');
        }
      }

      return {
        success: false,
        error: {
          message: errorMessage,
          code: data.error?.code || "REGISTER_ERROR",
          errors: data.error?.errors,
        },
      };
    }

    if (data.success) {
      // El token puede estar en data.token o data.data.token
      const token = data.token || data.data?.token;
      if (token) {
        localStorage.setItem("auth_token", token);
        // 🟢 REDIS PRESENCE: Iniciar servicio
        presenceService.start(token);
      }
      // El usuario puede estar en data.user o data.data.user
      const user = data.data?.user || data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      // Inicializar timestamp de actividad (para detección de inactividad)
      const now = Date.now().toString();
      localStorage.setItem("last_activity", now);
    }

    return data;
  } catch (error) {
    console.error("Error en registro:", error);
    return {
      success: false,
      error: {
        message: "Error de conexión con el servidor",
        code: "CONNECTION_ERROR",
      },
    };
  }
}

// Función de login
export async function login(credentials: LoginData): Promise<AuthResponse> {
  try {
    // Paso 1: Obtener cookie CSRF
    const csrfUrl = getApiUrl("/sanctum/csrf-cookie");
    await fetch(csrfUrl, {
      method: "GET",
      credentials: "include",
    });

    // Paso 2: Hacer el login
    const url = getApiUrl(API_ENDPOINTS.AUTH.LOGIN);
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse = await response.json();

    console.log('🔵 Respuesta del backend en login:', data);
    console.log('🔵 Token:', data.token);
    console.log('🔵 Usuario:', data.data?.user);

    // Si la respuesta HTTP no es exitosa pero tenemos data, devolver el error del backend
    if (!response.ok) {
      // Extraer los errores específicos si existen
      let errorMessage = data.error?.message || data.message || "Credenciales incorrectas";
      
      // Si hay errores de validación específicos, construir un mensaje más detallado
      if (data.error?.errors) {
        const errorMessages: string[] = [];
        Object.values(data.error.errors).forEach(fieldErrors => {
          errorMessages.push(...fieldErrors);
        });
        if (errorMessages.length > 0) {
          errorMessage = errorMessages.join('. ');
        }
      }

      return {
        success: false,
        error: {
          message: errorMessage,
          code: data.error?.code || "LOGIN_ERROR",
          errors: data.error?.errors,
        },
      };
    }

    if (data.success) {
      // El token puede estar en data.token o data.data.token
      const token = data.token || data.data?.token;
      if (token) {
        localStorage.setItem("auth_token", token);
        console.log('🔵 Token guardado:', token);
        // 🟢 REDIS PRESENCE: Desactivado hasta que backend implemente endpoints
        // presenceService.start(token);
        // console.log('🟢 Presence service iniciado');
      }
      // El usuario puede estar en data.user o data.data.user
      const user = data.data?.user || data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log('🔵 Usuario guardado en localStorage:', user);
      }
      // Inicializar timestamp de actividad (para detección de inactividad)
      const now = Date.now().toString();
      localStorage.setItem("last_activity", now);
      console.log('🔵 Timestamp de actividad inicializado');
    } else {
      console.log('🔵 Login falló - success:', data.success);
    }

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    return {
      success: false,
      error: {
        message: "Error de conexión con el servidor",
        code: "CONNECTION_ERROR",
      },
    };
  }
}

// Función de logout
export async function logout(): Promise<AuthResponse> {
  try {
    const token = localStorage.getItem("auth_token");
    const url = getApiUrl(API_ENDPOINTS.AUTH.LOGOUT);

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data: AuthResponse = await response.json();

    // 🔴 REDIS PRESENCE: Detener servicio
    presenceService.stop();

    // Limpiar localStorage y datos de sesión
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    clearSessionData();

    // Si el error es de no autenticación, considerarlo como éxito
    // (la sesión ya estaba cerrada, que es el objetivo del logout)
    if (!response.ok && data.error?.code === "UNAUTHENTICATED") {
      return {
        success: true,
        message: "Sesión cerrada correctamente",
      };
    }

    return data;
  } catch (error) {
    console.error("Error en logout:", error);
    // 🔴 REDIS PRESENCE: Detener servicio
    presenceService.stop();
    // Limpiar localStorage y datos de sesión aunque haya error
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    clearSessionData();
    
    return {
      success: false,
      error: {
        message: "Error de conexión con el servidor",
        code: "CONNECTION_ERROR",
      },
    };
  }
}

// Función para obtener usuario autenticado
export async function fetchUserData(): Promise<AuthResponse> {
  try {
    const token = localStorage.getItem("auth_token");
    
    if (!token) {
      return {
        success: false,
        error: {
          message: "No hay token de autenticación",
          code: "NO_TOKEN",
        },
      };
    }

    const url = getApiUrl(API_ENDPOINTS.AUTH.USER);
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return {
      success: false,
      error: {
        message: "Error de conexión con el servidor",
        code: "CONNECTION_ERROR",
      },
    };
  }
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem("auth_token");
}

// Función para obtener el token
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("auth_token");
}

// Función para obtener el usuario almacenado
export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// OAuth Google
export function loginWithGoogle(): void {
  const url = getApiUrl(API_ENDPOINTS.AUTH.GOOGLE);
  window.location.href = url;
}

// OAuth Facebook
export function loginWithFacebook(): void {
  const url = getApiUrl(API_ENDPOINTS.AUTH.FACEBOOK);
  window.location.href = url;
}
