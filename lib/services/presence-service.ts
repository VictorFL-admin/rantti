/**
 * 🚀 Sistema de Presencia Redis - Escalable a Millones de Usuarios
 * 
 * Sistema de presencia basado en Redis + HTTP polling
 * - Heartbeat cada 60 segundos
 * - Fetch contactos online cada 30 segundos
 * - TTL 65 segundos en Redis
 * - Sin WebSocket, solo HTTP
 */

import { getApiUrl } from '@/lib/api-config';

interface OnlineStatus {
  [userId: number]: boolean;
}

type PresenceCallback = (onlineUserIds: Set<number>) => void;

/**
 * Servicio Singleton de Presencia
 * Gestiona heartbeats y polling de usuarios online
 */
class PresenceService {
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private fetchInterval: NodeJS.Timeout | null = null;
  private onlineUserIds: Set<number> = new Set();
  private callbacks: Set<PresenceCallback> = new Set();
  private isRunning = false;
  private token: string | null = null;
  
  /**
   * Iniciar el servicio de presencia
   * Llamar cuando el usuario hace login
   */
  start(authToken?: string) {
    if (this.isRunning) {
      console.log('🔵 Presence service already running');
      return;
    }
    
    // Obtener token de autenticación
    this.token = authToken || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);
    
    if (!this.token) {
      console.warn('⚠️ No auth token, presence service not started');
      return;
    }
    
    console.log('🟢 Starting Redis presence service...');
    this.isRunning = true;
    
    // Marcar como online inmediatamente
    this.sendHeartbeat();
    
    // Obtener contactos online inmediatamente
    this.fetchOnlineContacts();
    
    // Enviar heartbeat cada 60 segundos
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
    }, 60000); // 60 segundos
    
    // Obtener contactos online cada 30 segundos
    this.fetchInterval = setInterval(() => {
      this.fetchOnlineContacts();
    }, 30000); // 30 segundos
    
    // Marcar como offline al cerrar navegador
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.setOffline();
      });
    }
  }
  
  /**
   * Detener el servicio de presencia
   * Llamar cuando el usuario hace logout
   */
  stop() {
    if (!this.isRunning) {
      return;
    }
    
    console.log('🔴 Stopping Redis presence service...');
    
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
      this.fetchInterval = null;
    }
    
    // Marcar como offline en el servidor
    this.setOffline();
    
    this.isRunning = false;
    this.onlineUserIds.clear();
    this.token = null;
  }
  
  /**
   * Enviar heartbeat al servidor (mantener usuario online)
   */
  private async sendHeartbeat() {
    if (!this.token) return;
    
    try {
      const response = await fetch(getApiUrl('/api/presence/heartbeat'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('💓 Heartbeat sent:', data);
      } else {
        console.error('❌ Heartbeat failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Heartbeat error:', error);
    }
  }
  
  /**
   * Obtener contactos online desde el servidor
   */
  private async fetchOnlineContacts() {
    if (!this.token) return;
    
    try {
      const response = await fetch(getApiUrl('/api/presence/contacts'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const onlineIds = data.online_contacts || [];
        
        // Actualizar set de usuarios online
        const previousSize = this.onlineUserIds.size;
        this.onlineUserIds = new Set(onlineIds.map((id: number | string) => parseInt(id.toString(), 10)));
        
        console.log(`🟢 Online contacts (${this.onlineUserIds.size}):`, Array.from(this.onlineUserIds));
        
        // Notificar solo si hubo cambios
        if (previousSize !== this.onlineUserIds.size || !this.setsAreEqual(this.onlineUserIds, new Set(onlineIds))) {
          console.log('📡 Presence changed, notifying listeners');
          this.notifyCallbacks();
        }
      } else {
        console.error('❌ Failed to fetch online contacts:', response.status);
      }
    } catch (error) {
      console.error('❌ Fetch online contacts error:', error);
    }
  }
  
  /**
   * Marcar como offline
   */
  private async setOffline() {
    if (!this.token) return;
    
    try {
      await fetch(getApiUrl('/api/presence/offline'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
      });
      console.log('🔴 Marked as offline');
    } catch (error) {
      console.error('❌ Failed to set offline:', error);
    }
  }
  
  /**
   * Verificar si un usuario está online
   */
  isUserOnline(userId: number): boolean {
    return this.onlineUserIds.has(userId);
  }
  
  /**
   * Verificar un usuario específico en el servidor
   */
  async checkUser(userId: number): Promise<boolean> {
    if (!this.token) return false;
    
    try {
      const response = await fetch(getApiUrl(`/api/presence/user/${userId}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.online || false;
      }
      return false;
    } catch (error) {
      console.error('❌ Failed to check user:', error);
      return false;
    }
  }
  
  /**
   * Verificar múltiples usuarios a la vez
   */
  async bulkCheck(userIds: number[]): Promise<OnlineStatus> {
    if (!this.token || userIds.length === 0) return {};
    
    try {
      const response = await fetch(getApiUrl('/api/presence/bulk-check'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ user_ids: userIds }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.online_status || {};
      }
      return {};
    } catch (error) {
      console.error('❌ Failed to bulk check:', error);
      return {};
    }
  }
  
  /**
   * Suscribirse a cambios de presencia
   * Retorna función para desuscribirse
   */
  subscribe(callback: PresenceCallback): () => void {
    this.callbacks.add(callback);
    
    // Notificar estado actual inmediatamente
    callback(new Set(this.onlineUserIds));
    
    // Retornar función de limpieza
    return () => {
      this.callbacks.delete(callback);
    };
  }
  
  /**
   * Desuscribirse manualmente
   */
  unsubscribe(callback: PresenceCallback) {
    this.callbacks.delete(callback);
  }
  
  /**
   * Notificar a todos los suscriptores
   */
  private notifyCallbacks() {
    const currentIds = new Set(this.onlineUserIds);
    this.callbacks.forEach(callback => {
      callback(currentIds);
    });
  }
  
  /**
   * Obtener todos los IDs de usuarios online
   */
  getOnlineUserIds(): Set<number> {
    return new Set(this.onlineUserIds);
  }
  
  /**
   * Obtener lista de IDs online como array
   */
  getOnlineContacts(): number[] {
    return Array.from(this.onlineUserIds);
  }
  
  /**
   * Obtener estadísticas (debug)
   */
  async getStats(): Promise<{ total_online: number; online_users: number[] } | null> {
    if (!this.token) return null;
    
    try {
      const response = await fetch(getApiUrl('/api/presence/stats'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to get stats:', error);
      return null;
    }
  }
  
  /**
   * Verificar si el servicio está corriendo
   */
  isActive(): boolean {
    return this.isRunning;
  }
  
  /**
   * Comparar dos sets (helper)
   */
  private setsAreEqual(setA: Set<number>, setB: Set<number>): boolean {
    if (setA.size !== setB.size) return false;
    for (const item of setA) {
      if (!setB.has(item)) return false;
    }
    return true;
  }
}

// Exportar instancia singleton
export const presenceService = new PresenceService();

// ✅ AUTO-START ACTIVADO: Backend Redis implementado
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // Esperar a que React se monte antes de iniciar
    setTimeout(() => {
      presenceService.start(token);
    }, 1000);
  }
}
