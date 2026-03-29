import { Bell } from "lucide-react";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface Notification {
  id: number;
  type: 'offer' | 'expiring' | 'published' | 'reposted';
  title: string;
  description?: string;
  productName: string;
  productImage: string;
  amount?: number;
  daysLeft?: number;
  userName?: string;
  time: string;
  read: boolean;
}

export default function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'offer',
      title: 'Nueva oferta recibida',
      productName: 'Rolex Mariner 2023',
      productImage: 'https://images.unsplash.com/photo-1702865053958-71ec751c4118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByb2xleCUyMHdhdGNofGVufDF8fHx8MTc3NDc1MDUyNnww&ixlib=rb-4.1.0&q=80&w=400',
      amount: 100,
      userName: 'PersonaX',
      time: 'Hace 2h',
      read: false
    },
    {
      id: 2,
      type: 'expiring',
      title: 'Tu publicación está por vencer',
      productName: 'Rolex Mariner 2023',
      productImage: 'https://images.unsplash.com/photo-1702865053958-71ec751c4118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByb2xleCUyMHdhdGNofGVufDF8fHx8MTc3NDc1MDUyNnww&ixlib=rb-4.1.0&q=80&w=400',
      daysLeft: 7,
      description: 'Renueva tu publicación si aún tienes disponible el producto.',
      time: 'Hace 1 día',
      read: false
    },
    {
      id: 3,
      type: 'published',
      title: 'Publicación exitosa',
      productName: 'Laptop Framework 2023',
      productImage: 'https://images.unsplash.com/photo-1620233389768-4eafd182841a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBmcmFtZXdvcmt8ZW58MXx8fHwxNzc0NzUwNTI2fDA&ixlib=rb-4.1.0&q=80&w=400',
      time: 'Hace 3 días',
      read: true
    },
    {
      id: 4,
      type: 'reposted',
      title: 'Producto reposteado',
      productName: 'Laptop Framework 2023',
      productImage: 'https://images.unsplash.com/photo-1620233389768-4eafd182841a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBmcmFtZXdvcmt8ZW58MXx8fHwxNzc0NzUwNTI2fDA&ixlib=rb-4.1.0&q=80&w=400',
      time: 'Hace 5 días',
      read: true
    }
  ];

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === 'offer') {
      toast.success("Redirigiendo al chat...");
      console.log("Abrir chat con oferta automática:", notification.amount);
      // Aquí se redigiría al chat con el mensaje automático de la oferta
    }
  };

  const getNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case 'offer':
        return (
          <>
            <span className="font-semibold">{notification.userName}</span> ha ofrecido{' '}
            <span className="font-semibold text-green-600">${notification.amount}</span> por tu{' '}
            <span className="font-semibold">{notification.productName}</span>.
          </>
        );
      case 'expiring':
        return (
          <>
            La publicación de tu producto <span className="font-semibold">{notification.productName}</span>{' '}
            vence en <span className="font-semibold text-orange-600">{notification.daysLeft} días</span>,{' '}
            {notification.description}
          </>
        );
      case 'published':
        return (
          <>
            Se ha publicado satisfactoriamente tu producto{' '}
            <span className="font-semibold">{notification.productName}</span>
          </>
        );
      case 'reposted':
        return (
          <>
            Se ha reposteado satisfactoriamente tu producto{' '}
            <span className="font-semibold">{notification.productName}</span>
          </>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
      </div>

      {/* Lista de Notificaciones */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`p-5 border rounded-2xl transition-all ${
              notification.read
                ? 'bg-white border-gray-200 hover:border-gray-300'
                : 'bg-blue-50 border-blue-200 hover:border-blue-300'
            } ${
              notification.type === 'offer' ? 'cursor-pointer hover:shadow-md' : ''
            }`}
          >
            <div className="flex gap-4">
              {/* Imagen del Producto */}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={notification.productImage}
                  alt={notification.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <p className={`font-['Poppins',sans-serif] text-sm mb-2 ${
                  notification.read ? 'text-gray-700' : 'text-gray-900'
                }`}>
                  {getNotificationContent(notification)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-['Poppins',sans-serif] text-xs text-gray-500">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Estado vacío si no hay notificaciones */}
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
