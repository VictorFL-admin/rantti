import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS, getApiUrl } from "@/lib/api-config";
import { apiPut } from "@/lib/api-client";

interface UpdatePasswordModalProps {
  onClose: () => void;
}

export default function UpdatePasswordModal({ onClose }: UpdatePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiPut(getApiUrl(API_ENDPOINTS.USER.PASSWORD), { 
        currentPassword,
        newPassword 
      });

      if (response.ok) {
        toast.success("Contraseña actualizada", {
          description: "Tu contraseña ha sido actualizada correctamente",
        });
        
        // Limpiar campos y cerrar modal
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        onClose();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Error al actualizar');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo actualizar la contraseña";
      toast.error("Error al actualizar", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] sm:max-w-[480px] bg-white rounded-[24px] p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Actualizar Contraseña</DialogTitle>
          <DialogDescription>
            Ingresa tu nueva contraseña para actualizar tu cuenta
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 md:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-[80px] h-[80px] bg-[#0047FF]/10 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-[#0047FF]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="font-['Poppins',sans-serif] text-[28px] md:text-[32px] text-center text-black mb-3">
            Actualizar Contraseña
          </h2>

          {/* Subtitle */}
          <p className="font-['Poppins',sans-serif] text-[16px] text-center text-[#546a88] mb-8">
            Ingresa tu nueva contraseña para continuar
          </p>

          {/* Form */}
          <div className="space-y-5 mb-6">
            {/* Contraseña Actual */}
            <div>
              <label className="font-['Poppins',sans-serif] text-[16px] text-[#2e3a4b] block mb-2">
                Contraseña Actual
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Ingresa tu contraseña actual"
                  className="w-full h-[50px] bg-white border border-[rgba(0,0,0,0.15)] rounded-[10px] px-4 pr-12 font-['Poppins',sans-serif] text-[16px] text-[#2e3a4b] placeholder:text-[#90a1b9] focus:outline-none focus:ring-2 focus:ring-[#0047FF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Nueva Contraseña */}
            <div>
              <label className="font-['Poppins',sans-serif] text-[16px] text-[#2e3a4b] block mb-2">
                Nueva Contraseña
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Ingresa tu nueva contraseña"
                  className="w-full h-[50px] bg-white border border-[rgba(0,0,0,0.15)] rounded-[10px] px-4 pr-12 font-['Poppins',sans-serif] text-[16px] text-[#2e3a4b] placeholder:text-[#90a1b9] focus:outline-none focus:ring-2 focus:ring-[#0047FF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="font-['Poppins',sans-serif] text-[16px] text-[#2e3a4b] block mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirma tu nueva contraseña"
                  className="w-full h-[50px] bg-white border border-[rgba(0,0,0,0.15)] rounded-[10px] px-4 pr-12 font-['Poppins',sans-serif] text-[16px] text-[#2e3a4b] placeholder:text-[#90a1b9] focus:outline-none focus:ring-2 focus:ring-[#0047FF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="font-['Poppins',sans-serif] text-[14px] text-red-600 text-center">
                {error}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isLoading}
              className="flex-1 h-[50px] border-2 border-[#0047FF] text-[#0047FF] bg-white hover:bg-[#0047FF]/10 hover:text-[#0047FF] font-['Poppins',sans-serif] text-[16px] rounded-[10px] cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 h-[50px] bg-[#0047FF] hover:bg-[#0039CC] text-white font-['Poppins',sans-serif] text-[16px] rounded-[10px] cursor-pointer"
            >
              {isLoading ? "Actualizando..." : "Confirmar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
