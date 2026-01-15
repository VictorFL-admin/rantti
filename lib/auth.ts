import { getApiUrl, API_ENDPOINTS } from "./api-config";

// Tipos
export interface RegisterData {
  name: string;
  email: string;
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
      return {
        success: false,
        error: {
          message: data.error?.message || data.message || "Error al crear la cuenta",
          code: data.error?.code || "REGISTER_ERROR",
        },
      };
    }

    if (data.success) {
      // El token puede estar en data.token o data.data.token
      const token = data.token || data.data?.token;
      if (token) {
        localStorage.setItem("auth_token", token);
      }
      // El usuario puede estar en data.user o data.data.user
      const user = data.data?.user || data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
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
      return {
        success: false,
        error: {
          message: data.error?.message || data.message || "Credenciales incorrectas",
          code: data.error?.code || "LOGIN_ERROR",
        },
      };
    }

    if (data.success) {
      // El token puede estar en data.token o data.data.token
      const token = data.token || data.data?.token;
      if (token) {
        localStorage.setItem("auth_token", token);
        console.log('🔵 Token guardado:', token);
      }
      // El usuario puede estar en data.user o data.data.user
      const user = data.data?.user || data.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log('🔵 Usuario guardado en localStorage:', user);
      }
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

    // Limpiar localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    return data;
  } catch (error) {
    console.error("Error en logout:", error);
    // Limpiar localStorage aunque haya error
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    
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
