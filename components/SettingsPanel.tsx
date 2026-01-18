import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";
import { apiGet, apiPut, apiDelete, removeAuthToken } from "@/lib/api-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";
import UpdatePasswordModal from "./UpdatePasswordModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface SettingsPanelProps {
  user: { email: string; name: string; avatar?: string };
  onUpdateUser: (updates: { name?: string; avatar?: string }) => void;
}

export default function SettingsPanel({ user, onUpdateUser }: SettingsPanelProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    newOffers: true,
    counterOffers: true,
    messages: true,
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Actualizar estados cuando cambia el user prop
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setAvatarPreview(user.avatar || "");
  }, [user]);

  // Cargar username del perfil
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await apiGet(getApiUrl(API_ENDPOINTS.USER.PROFILE));
        if (response.ok) {
          const data = await response.json();
          setUsername(data.user?.username || "");
        }
      } catch (error) {
        console.error('Error al cargar username:', error);
      }
    };
    fetchUsername();
  }, []);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiGet(getApiUrl(API_ENDPOINTS.USER.NOTIFICATIONS));
        
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error al cargar notificaciones:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen es muy grande", {
          description: "Por favor selecciona una imagen menor a 5MB",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Archivo inválido", {
          description: "Por favor selecciona una imagen (JPG, PNG, etc.)",
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        
        try {
          setIsLoading(true);
          const response = await apiPut(getApiUrl(API_ENDPOINTS.USER.PROFILE), { avatar: result });

          if (response.ok) {
            onUpdateUser({ avatar: result });
            toast.success("Foto de perfil actualizada", {
              description: "Tu foto ha sido actualizada correctamente",
            });
          } else {
            throw new Error('Error al actualizar');
          }
        } catch (error) {
          console.error('Error al actualizar avatar:', error);
          toast.error("Error al actualizar", {
            description: "No se pudo actualizar la foto de perfil",
          });
          setAvatarPreview(user.avatar || "");
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setIsLoading(true);
      const response = await apiDelete(getApiUrl(API_ENDPOINTS.USER.AVATAR));

      if (response.ok) {
        setAvatarPreview("");
        onUpdateUser({ avatar: "" });
        toast.success("Foto de perfil eliminada", {
          description: "Tu foto de perfil ha sido eliminada",
        });
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      toast.error("Error al eliminar", {
        description: "No se pudo eliminar la foto de perfil",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const response = await apiPut(getApiUrl(API_ENDPOINTS.USER.PROFILE), { 
        name,
        username: username || ""
      });

      if (response.ok) {
        onUpdateUser({ name });
        toast.success("Perfil actualizado", {
          description: "Tus cambios han sido guardados correctamente",
        });
      } else {
        throw new Error('Error al actualizar');
      }
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      toast.error("Error al actualizar", {
        description: "No se pudo actualizar tu perfil",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const response = await apiDelete(getApiUrl(API_ENDPOINTS.USER.ACCOUNT));

      if (response.ok) {
        toast.success("Cuenta eliminada", {
          description: "Tu cuenta ha sido eliminada permanentemente",
        });
        setShowDeleteDialog(false);
        // Redirigir al login o home después de eliminar
        removeAuthToken();
        window.location.href = '/';
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      toast.error("Error al eliminar", {
        description: "No se pudo eliminar tu cuenta",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = async (key: keyof typeof notifications, value: boolean) => {
    const updatedNotifications = { ...notifications, [key]: value };
    setNotifications(updatedNotifications);

    try {
      const response = await apiPut(getApiUrl(API_ENDPOINTS.USER.NOTIFICATIONS), updatedNotifications);

      if (!response.ok) {
        throw new Error('Error al actualizar');
      }
    } catch (error) {
      console.error('Error al actualizar notificaciones:', error);
      // Revertir el cambio en caso de error
      setNotifications(notifications);
      toast.error("Error al actualizar", {
        description: "No se pudo actualizar las preferencias de notificaciones",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Perfil de Usuario</CardTitle>
          <CardDescription className="text-gray-600">
            Actualiza tu información personal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt={name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-[#0047FF] to-[#0039CC] text-white text-2xl">
                    {getInitials(name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#0047FF] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#0039CC] transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Foto de Perfil</h3>
              <p className="text-sm text-gray-600 mb-3">
                JPG, PNG o GIF. Máximo 5MB. (Opcional)
              </p>
              {avatarPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Eliminar foto
                </Button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Nombre completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border-gray-300 text-gray-900 focus:border-[#0047FF] focus:ring-[#0047FF]"
              />
              <p className="text-xs text-gray-500">
                Solo se mostrará tu primer nombre en el perfil público
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Nombre de usuario (opcional)</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="juanperez123"
                className="bg-gray-50 border-gray-300 text-gray-900 focus:border-[#0047FF] focus:ring-[#0047FF]"
              />
              <p className="text-xs text-gray-500">
                Usa solo letras, números y guiones bajos
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
              <Input
                id="email"
                value={email}
                disabled
                className="bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">
                El correo no puede ser modificado
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#0047FF] hover:bg-[#0039CC] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Configuración de Cuenta</CardTitle>
          <CardDescription className="text-gray-600">
            Administra la seguridad de tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Cambiar contraseña</Label>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordModal(true)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              >
                Cambiar contraseña
              </Button>
            </div>
            {showPasswordModal && (
              <UpdatePasswordModal
                onClose={() => setShowPasswordModal(false)}
              />
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Label className="text-red-600">Zona de peligro</Label>
            <p className="text-sm text-gray-600 mt-2 mb-3">
              Eliminar tu cuenta de forma permanente
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                >
                  Eliminar cuenta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900">¿Estás completamente seguro?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos tus datos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900">Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    onClick={handleDeleteAccount}
                  >
                    Sí, eliminar cuenta
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Notificaciones</CardTitle>
          <CardDescription className="text-gray-600">
            Configura cómo quieres recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Nuevas ofertas</p>
              <p className="text-sm text-gray-600">Recibe notificaciones de nuevas ofertas</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.newOffers}
              onChange={(e) => handleNotificationChange('newOffers', e.target.checked)}
              className="w-4 h-4 accent-[#0047FF]" 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Contraofertas</p>
              <p className="text-sm text-gray-600">Notificaciones de contraofertas</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.counterOffers}
              onChange={(e) => handleNotificationChange('counterOffers', e.target.checked)}
              className="w-4 h-4 accent-[#0047FF]" 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Mensajes</p>
              <p className="text-sm text-gray-600">Notificaciones de mensajes nuevos</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.messages}
              onChange={(e) => handleNotificationChange('messages', e.target.checked)}
              className="w-4 h-4 accent-[#0047FF]" 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Boletín de noticias</p>
              <p className="text-sm text-gray-600">Recibe emails con novedades</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.newsletter}
              onChange={(e) => handleNotificationChange('newsletter', e.target.checked)}
              className="w-4 h-4 accent-[#0047FF]" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
