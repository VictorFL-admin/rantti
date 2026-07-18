"use client";

import { Bell } from "lucide-react";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  type ApiNotification,
  type NotificationType,
} from "@/lib/notifications-api";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Ahora mismo';
  if (minutes < 60) return `Hace ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} día${days > 1 ? 's' : ''}`;
}

function getTitle(type: NotificationType, action?: string): string {
  if (type === 'PUBLICACION_APROBADA' && action === 'REPOST') return 'Producto reposteado';
  const titles: Record<NotificationType, string> = {
    NUEVA_OFERTA: 'Nueva oferta recibida',
    CONTRAOFERTA: 'Contraoferta recibida',
    OFERTA_ACEPTADA: 'Oferta aceptada',
    OFERTA_RECHAZADA: 'Oferta rechazada',
    MENSAJE: 'Nuevo mensaje',
    PUBLICACION_APROBADA: 'Publicación exitosa',
    PAGO_RECIBIDO: 'Pago recibido',
  };
  return titles[type];
}

function NotificationContent({ notification }: { notification: ApiNotification }) {
  const p = notification.payload_json;

  switch (notification.type) {
    case 'NUEVA_OFERTA':
      return (
        <>
          <span className="font-semibold">{p.buyer_name}</span> ha ofrecido{' '}
          <span className="font-semibold text-green-600">
            {p.currency} {p.amount?.toLocaleString('es-PE')}
          </span>{' '}
          por tu <span className="font-semibold">{p.listing_title}</span>.
        </>
      );
    case 'CONTRAOFERTA':
      return (
        <>
          <span className="font-semibold">{p.seller_name}</span> envió una contraoferta de{' '}
          <span className="font-semibold text-blue-600">
            {p.currency} {p.amount?.toLocaleString('es-PE')}
          </span>{' '}
          por <span className="font-semibold">{p.listing_title}</span>.
        </>
      );
    case 'OFERTA_ACEPTADA':
      return (
        <>
          <span className="font-semibold">{p.seller_name}</span> aceptó tu oferta de{' '}
          <span className="font-semibold text-green-600">
            {p.currency} {p.amount?.toLocaleString('es-PE')}
          </span>{' '}
          por <span className="font-semibold">{p.listing_title}</span>.
        </>
      );
    case 'OFERTA_RECHAZADA':
      return (
        <>
          Tu oferta de{' '}
          <span className="font-semibold text-red-600">
            {p.currency} {p.amount?.toLocaleString('es-PE')}
          </span>{' '}
          por <span className="font-semibold">{p.listing_title}</span> fue rechazada.
        </>
      );
    case 'PUBLICACION_APROBADA':
      if (p.action === 'REPOST') {
        return (
          <>
            Se reposteó satisfactoriamente tu producto{' '}
            <span className="font-semibold">{p.listing_title}</span>.
          </>
        );
      }
      return (
        <>
          Se publicó satisfactoriamente tu producto{' '}
          <span className="font-semibold">{p.listing_title}</span>.
        </>
      );
    default:
      return <span>{p.listing_title}</span>;
  }
}

const CLICKABLE_TYPES: NotificationType[] = [
  'NUEVA_OFERTA',
  'CONTRAOFERTA',
  'OFERTA_ACEPTADA',
  'OFERTA_RECHAZADA',
];

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetchNotifications();
      setNotifications(res.data.notifications);
    } catch {
      toast.error('No se pudieron cargar las notificaciones');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleClick = async (notification: ApiNotification) => {
    if (!CLICKABLE_TYPES.includes(notification.type)) return;

    if (!notification.read) {
      await markNotificationRead(notification.id).catch(() => null);
      setNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }

    const convId = notification.payload_json.conversation_id;
    if (convId) {
      toast.success('Redirigiendo al chat...');
      // La navegación al chat se maneja desde el dashboard
      window.dispatchEvent(new CustomEvent('rantti:open-chat', { detail: { conversationId: convId } }));
    }
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead().catch(() => null);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notificaciones
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          <p className="font-['Poppins',sans-serif] text-sm text-gray-500 mt-1">
            Mantente al día con ofertas y actualizaciones de tus publicaciones
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-[#0047FF] hover:underline font-medium"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const isClickable = CLICKABLE_TYPES.includes(notification.type);
          return (
            <Card
              key={notification.id}
              onClick={() => handleClick(notification)}
              className={`p-5 border rounded-2xl transition-all ${
                notification.read
                  ? 'bg-white border-gray-200 hover:border-gray-300'
                  : 'bg-blue-50 border-blue-200 hover:border-blue-300'
              } ${isClickable ? 'cursor-pointer hover:shadow-md' : ''}`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                  {notification.payload_json.listing_image ? (
                    <img
                      src={notification.payload_json.listing_image}
                      alt={notification.payload_json.listing_title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Bell className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins',sans-serif] text-xs font-semibold text-gray-500 mb-1">
                    {getTitle(notification.type, notification.payload_json.action)}
                  </p>
                  <p className={`font-['Poppins',sans-serif] text-sm mb-2 ${
                    notification.read ? 'text-gray-700' : 'text-gray-900'
                  }`}>
                    <NotificationContent notification={notification} />
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-['Poppins',sans-serif] text-xs text-gray-500">
                      {timeAgo(notification.created_at)}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Estado vacío */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-['Poppins',sans-serif] text-lg font-semibold text-gray-900 mb-2">
              No tienes notificaciones
            </h3>
            <p className="text-gray-500 text-sm">
              Aquí aparecerán tus notificaciones cuando recibas ofertas, mensajes y actualizaciones
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
