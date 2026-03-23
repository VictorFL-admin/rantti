/**
 * 🎣 Hooks de React para Sistema de Presencia Redis
 * 
 * Hooks personalizados para usar el servicio de presencia en componentes
 */

import { useEffect, useState } from 'react';
import { presenceService } from '@/lib/services/presence-service';

/**
 * Hook para verificar si un usuario específico está online
 * 
 * @param userId - ID del usuario a verificar
 * @returns boolean - true si está online
 * 
 * @example
 * ```tsx
 * function ChatListItem({ userId }) {
 *   const isOnline = useIsUserOnline(userId);
 *   return <div>{isOnline ? '🟢 En línea' : '⚪ Desconectado'}</div>;
 * }
 * ```
 */
export function useIsUserOnline(userId: number | undefined): boolean {
  const [isOnline, setIsOnline] = useState(false);
  
  useEffect(() => {
    if (!userId) {
      setIsOnline(false);
      return;
    }
    
    // Callback que se ejecuta cuando cambia la presencia
    const handlePresenceChange = (onlineUserIds: Set<number>) => {
      setIsOnline(onlineUserIds.has(userId));
    };
    
    // Suscribirse a cambios
    const unsubscribe = presenceService.subscribe(handlePresenceChange);
    
    // Verificar estado inicial
    setIsOnline(presenceService.isUserOnline(userId));
    
    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [userId]);
  
  return isOnline;
}

/**
 * Hook para obtener todos los contactos online
 * 
 * @returns number[] - Array de IDs de usuarios online
 * 
 * @example
 * ```tsx
 * function OnlineUsers() {
 *   const onlineContacts = useOnlineContacts();
 *   return <div>Usuarios online: {onlineContacts.length}</div>;
 * }
 * ```
 */
export function useOnlineContacts(): number[] {
  const [onlineContacts, setOnlineContacts] = useState<number[]>([]);
  
  useEffect(() => {
    // Callback que se ejecuta cuando cambia la presencia
    const handlePresenceChange = (onlineUserIds: Set<number>) => {
      setOnlineContacts(Array.from(onlineUserIds));
    };
    
    // Suscribirse a cambios
    const unsubscribe = presenceService.subscribe(handlePresenceChange);
    
    // Obtener estado inicial
    setOnlineContacts(presenceService.getOnlineContacts());
    
    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);
  
  return onlineContacts;
}

/**
 * Hook para obtener un Set de usuarios online
 * Útil para verificaciones rápidas con .has()
 * 
 * @returns Set<number> - Set de IDs de usuarios online
 * 
 * @example
 * ```tsx
 * function ChatList({ chats }) {
 *   const onlineUserIds = useOnlineUserIds();
 *   return chats.map(chat => (
 *     <div key={chat.id}>
 *       {onlineUserIds.has(chat.userId) && '🟢'}
 *     </div>
 *   ));
 * }
 * ```
 */
export function useOnlineUserIds(): Set<number> {
  const [onlineUserIds, setOnlineUserIds] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    // Callback que se ejecuta cuando cambia la presencia
    const handlePresenceChange = (onlineUserIds: Set<number>) => {
      setOnlineUserIds(new Set(onlineUserIds));
    };
    
    // Suscribirse a cambios
    const unsubscribe = presenceService.subscribe(handlePresenceChange);
    
    // Obtener estado inicial
    setOnlineUserIds(presenceService.getOnlineUserIds());
    
    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);
  
  return onlineUserIds;
}

/**
 * Hook para verificar múltiples usuarios a la vez
 * Útil para listas de chats
 * 
 * @param userIds - Array de IDs de usuarios a verificar
 * @returns Map<number, boolean> - Map con estado online de cada usuario
 * 
 * @example
 * ```tsx
 * function ChatList({ chats }) {
 *   const userIds = chats.map(c => c.userId);
 *   const onlineStatus = useMultipleUsersOnline(userIds);
 *   
 *   return chats.map(chat => (
 *     <div key={chat.id}>
 *       {onlineStatus.get(chat.userId) && '🟢'}
 *     </div>
 *   ));
 * }
 * ```
 */
export function useMultipleUsersOnline(userIds: number[]): Map<number, boolean> {
  const [onlineStatus, setOnlineStatus] = useState<Map<number, boolean>>(new Map());
  
  useEffect(() => {
    if (userIds.length === 0) {
      setOnlineStatus(new Map());
      return;
    }
    
    // Callback que se ejecuta cuando cambia la presencia
    const handlePresenceChange = (onlineUserIds: Set<number>) => {
      const statusMap = new Map<number, boolean>();
      userIds.forEach(userId => {
        statusMap.set(userId, onlineUserIds.has(userId));
      });
      setOnlineStatus(statusMap);
    };
    
    // Suscribirse a cambios
    const unsubscribe = presenceService.subscribe(handlePresenceChange);
    
    // Calcular estado inicial
    const currentOnlineIds = presenceService.getOnlineUserIds();
    const initialStatusMap = new Map<number, boolean>();
    userIds.forEach(userId => {
      initialStatusMap.set(userId, currentOnlineIds.has(userId));
    });
    setOnlineStatus(initialStatusMap);
    
    // Cleanup
    return () => {
      unsubscribe();
    };
  }, [userIds.join(',')]); // Dependencia: cambios en la lista de IDs
  
  return onlineStatus;
}

/**
 * Hook para verificar si el servicio de presencia está activo
 * 
 * @returns boolean - true si el servicio está corriendo
 * 
 * @example
 * ```tsx
 * function PresenceIndicator() {
 *   const isActive = usePresenceServiceActive();
 *   if (!isActive) return <div>⚠️ Servicio de presencia detenido</div>;
 *   return <div>✅ Servicio activo</div>;
 * }
 * ```
 */
export function usePresenceServiceActive(): boolean {
  const [isActive, setIsActive] = useState(presenceService.isActive());
  
  useEffect(() => {
    // Verificar cada 5 segundos si el servicio sigue activo
    const interval = setInterval(() => {
      setIsActive(presenceService.isActive());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return isActive;
}
