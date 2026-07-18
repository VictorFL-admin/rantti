import { getApiUrl, API_ENDPOINTS } from './api-config';
import { apiGet, apiPost } from './api-client';

export type NotificationType =
  | 'NUEVA_OFERTA'
  | 'CONTRAOFERTA'
  | 'OFERTA_ACEPTADA'
  | 'OFERTA_RECHAZADA'
  | 'MENSAJE'
  | 'PUBLICACION_APROBADA'
  | 'PAGO_RECIBIDO';

export interface NotificationPayload {
  listing_id?: number;
  listing_title?: string;
  listing_image?: string | null;
  listing_type?: 'VENTA' | 'COMPRA';
  offer_id?: number;
  amount?: number;
  currency?: string;
  buyer_name?: string;
  seller_name?: string;
  conversation_id?: number;
  action?: 'REPOST';
}

export interface ApiNotification {
  id: number;
  user_id: number;
  type: NotificationType;
  payload_json: NotificationPayload;
  status: string;
  read: boolean;
  created_at: string;
  sent_at: string | null;
}

export interface NotificationsResponse {
  success: boolean;
  data: {
    notifications: ApiNotification[];
    unread_count: number;
  };
}

export async function fetchNotifications(): Promise<NotificationsResponse> {
  const res = await apiGet(getApiUrl(API_ENDPOINTS.NOTIFICATIONS.LIST));
  if (!res.ok) throw new Error('Error al obtener notificaciones');
  return res.json();
}

export async function fetchUnreadCount(): Promise<number> {
  const res = await apiGet(getApiUrl(API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT));
  if (!res.ok) return 0;
  const json = await res.json();
  return json?.data?.unread_count ?? 0;
}

export async function markNotificationRead(id: number): Promise<void> {
  await apiPost(getApiUrl(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)), {});
}

export async function markAllNotificationsRead(): Promise<void> {
  await apiPost(getApiUrl(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ), {});
}
