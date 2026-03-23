import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { X } from "lucide-react";
import svgPaths from "../imports/svg-peqj1oeayz";

interface PerfilMarketplaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: { email: string; name: string; avatar?: string };
}

export default function PerfilMarketplaceModal({ open, onOpenChange, user }: PerfilMarketplaceModalProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 bg-[#f9fafb] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
        <VisuallyHidden>
          <DialogTitle>Perfil de Marketplace</DialogTitle>
          <DialogDescription>
            Perfil de usuario de Carlos Mendoza en el marketplace de Rantti. Visualiza calificaciones, reseñas y publicaciones activas.
          </DialogDescription>
        </VisuallyHidden>

        {/* Botón cerrar personalizado */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="w-full pb-8">
          {/* Banner Superior */}
          <div className="h-[180px] md:h-[240px] w-full bg-[rgba(217,217,217,0.55)] relative" />

          {/* Avatar */}
          <div className="absolute left-6 md:left-10 top-[120px] md:top-[160px] w-[100px] h-[100px] md:w-[140px] md:h-[140px]">
            <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176 176">
              <circle cx="88" cy="88" fill="#0047FF" r="88" />
            </svg>
            <p className="absolute inset-0 flex items-center justify-center font-['Poppins',sans-serif] text-[40px] md:text-[56px] text-white">
              {getInitials(user.name)}
            </p>
          </div>

          {/* Contenedor principal */}
          <div className="px-6 md:px-10 pt-[70px] md:pt-[90px] space-y-5">
            {/* Nombre y fecha */}
            <div>
              <h2 className="font-['Poppins',sans-serif] text-lg md:text-2xl text-black mb-1">
                Carlos Mendoza
              </h2>
              <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-[#546a88]">
                Miembro desde Marzo 2022
              </p>
            </div>

            {/* Tabs y botones */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Tabs Comprador/Vendedor */}
              <div className="flex gap-6 relative">
                <div>
                  <p className="font-['Poppins',sans-serif] font-medium text-sm md:text-base text-[#546a88] cursor-pointer">
                    Comprador
                  </p>
                  <div className="h-[2px] w-full bg-[#546a88] mt-1" />
                </div>
                <p className="font-['Poppins',sans-serif] text-sm md:text-base text-[#546a88] cursor-pointer">
                  Vendedor
                </p>
              </div>

              {/* Botón Enviar Mensaje */}
              <button className="bg-white h-[36px] rounded-lg px-5 border border-[#314158] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <p className="font-['Poppins',sans-serif] font-medium text-xs md:text-sm text-[#2e3a4b]">Enviar Mensaje</p>
              </button>
            </div>

            {/* Botón Seguir */}
            <button className="bg-[#0047ff] hover:bg-[#0039CC] h-[38px] rounded-lg w-full sm:w-auto sm:min-w-[300px] flex items-center justify-center transition-colors">
              <p className="font-['Poppins',sans-serif] text-sm md:text-base text-white">Seguir</p>
            </button>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card: Calificaciones como vendedor */}
              <div className="bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.15)] shadow-sm p-5">
                <p className="font-['Poppins',sans-serif] text-sm md:text-base text-black mb-1">
                  Calificaciones como vendedor
                </p>
                <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs text-[#546a88] mb-3">
                  Según 6 calificaciones
                </p>
                {/* Logo Rantti */}
                <div className="mt-3">
                  <svg width="160" height="27" fill="none" viewBox="0 0 220 37" className="w-full max-w-[180px]">
                    <g clipPath="url(#clip0_575_190)">
                      <path d={svgPaths.p1ca6a80} fill="#0047FF" />
                      <path d={svgPaths.p60ecb00} fill="#0047FF" />
                      <path d={svgPaths.p39714800} fill="#0047FF" />
                      <path d={svgPaths.pae39a80} fill="#0047FF" />
                      <path d={svgPaths.p1fe55200} fill="#0047FF" />
                      <path d={svgPaths.p25701f80} fill="#0047FF" />
                      <path d={svgPaths.p2c1a5d00} fill="#0047FF" />
                      <path d={svgPaths.p22668100} fill="#0047FF" />
                      <path d={svgPaths.p3a4d7400} fill="#0047FF" />
                      <path d={svgPaths.p2b1e5900} fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_575_190">
                        <rect fill="white" height="37" width="220" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Card: Reseña de María González */}
              <div className="bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.15)] shadow-sm p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-['Poppins',sans-serif] text-sm md:text-base text-black mb-1">
                      María González
                    </p>
                    <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs text-[#546a88] mb-3">
                      Hace 2 días
                    </p>
                    {/* Logo Rantti mini */}
                    <div className="mb-3">
                      <svg width="90" height="15" fill="none" viewBox="0 0 116 19" className="w-full max-w-[100px]">
                        <g clipPath="url(#clip0_575_171)">
                          <path d={svgPaths.p329c4280} fill="#0047FF" />
                          <path d={svgPaths.p322cc000} fill="#0047FF" />
                          <path d={svgPaths.p14cd8480} fill="#0047FF" />
                          <path d={svgPaths.p3cf82f00} fill="#0047FF" />
                          <path d={svgPaths.p1108fe00} fill="#0047FF" />
                          <path d={svgPaths.p2c405b00} fill="#0047FF" />
                          <path d={svgPaths.p1b64c800} fill="#0047FF" />
                          <path d={svgPaths.p1657cd00} fill="#0047FF" />
                          <path d={svgPaths.p1a8edac0} fill="#0047FF" />
                          <path d={svgPaths.p3bfd1dc0} fill="#0047FF" />
                        </g>
                        <defs>
                          <clipPath id="clip0_575_171">
                            <rect fill="white" height="19" width="116" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs text-[#546a88] leading-relaxed mb-3">
                      Excelente vendedor, muy profesional y confiable. El producto llegó exactamente como se describía.
                    </p>
                    <button className="bg-white h-[34px] rounded-lg px-3 w-full sm:w-auto border border-[rgba(49,65,88,0.36)] flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <p className="font-['Poppins',sans-serif] font-medium text-xs md:text-sm text-[#546a88]">
                        Compro: Rolex 2022
                      </p>
                    </button>
                  </div>
                  {/* Botón siguiente */}
                  <button className="flex-shrink-0 flex items-center justify-center w-[38px] h-[38px] bg-[#546A88] rounded-full cursor-pointer hover:bg-[#3d4e65] transition-colors">
                    <svg width="9" height="15" fill="none" viewBox="0 0 11 18">
                      <g clipPath="url(#clip0_575_185)">
                        <path d={svgPaths.p181a9500} fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_575_185">
                          <rect fill="white" height="18" width="11" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Card: Publicaciones de Carlos */}
            <div className="bg-white rounded-2xl border-2 border-[rgba(0,0,0,0.15)] shadow-sm p-5">
              <p className="font-['Poppins',sans-serif] text-sm md:text-base text-black mb-1">
                Publicaciones de Carlos
              </p>
              <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs text-[#546a88] mb-4">
                4 publicaciones activas
              </p>

              {/* Botón Buscar Publicaciones */}
              <button className="bg-white h-[34px] rounded-lg px-4 w-full sm:w-auto border border-[rgba(49,65,88,0.36)] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mb-5">
                <svg width="12" height="12" fill="none" viewBox="0 0 16 16">
                  <g clipPath="url(#clip0_575_208)">
                    <path d={svgPaths.p1893a40} fill="#546A88" />
                  </g>
                  <defs>
                    <clipPath id="clip0_575_208">
                      <rect fill="white" height="16" width="16" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-[#546a88]">
                  Buscar Publicaciones
                </p>
              </button>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {/* Producto 1: MacBook Pro */}
                <div className="bg-white rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md border border-[rgba(0,0,0,0.15)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-[140px] overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" alt="MacBook Pro" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-black mb-2 line-clamp-2">
                      MacBook Pro M3 Max 16"
                    </p>
                    <p className="font-['Poppins',sans-serif] text-base md:text-lg text-[#0047ff] mb-2 font-semibold">
                      S/ 10.999
                    </p>
                    <div className="flex items-center gap-1 text-[#546a88]">
                      <svg width="8" height="12" fill="none" viewBox="0 0 10 15">
                        <g clipPath="url(#clip0_575_204)">
                          <path d={svgPaths.p2aa6c00} fill="#8B9CB4" />
                          <path d={svgPaths.p1821f8f0} fill="#8B9CB4" />
                        </g>
                        <defs>
                          <clipPath id="clip0_575_204">
                            <rect fill="white" height="15" width="10" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs">Lima - Miraflores</p>
                    </div>
                  </div>
                </div>

                {/* Producto 2: iPhone */}
                <div className="bg-white rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md border border-[rgba(0,0,0,0.15)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-[140px] overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1592286927505-2fd11b3e7579?w=400&h=300&fit=crop" alt="iPhone 15 Pro Max" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-black mb-2 line-clamp-2">
                      iPhone 15 Pro Max 1TB
                    </p>
                    <p className="font-['Poppins',sans-serif] text-base md:text-lg text-[#0047ff] mb-2 font-semibold">
                      S/ 2.999
                    </p>
                    <div className="flex items-center gap-1 text-[#546a88]">
                      <svg width="8" height="12" fill="none" viewBox="0 0 10 15">
                        <g clipPath="url(#clip0_575_204)">
                          <path d={svgPaths.p2aa6c00} fill="#8B9CB4" />
                          <path d={svgPaths.p1821f8f0} fill="#8B9CB4" />
                        </g>
                        <defs>
                          <clipPath id="clip0_575_204">
                            <rect fill="white" height="15" width="10" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs">Lima - Barranco</p>
                    </div>
                  </div>
                </div>

                {/* Producto 3: Omega */}
                <div className="bg-white rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md border border-[rgba(0,0,0,0.15)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-[140px] overflow-hidden bg-gray-100">
                    <img src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=300&fit=crop" alt="Omega Speedmaster" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="font-['Poppins',sans-serif] text-xs md:text-sm text-black mb-2 line-clamp-2">
                      Omega Speedmaster
                    </p>
                    <p className="font-['Poppins',sans-serif] text-base md:text-lg text-[#0047ff] mb-2 font-semibold">
                      S/ 4.999
                    </p>
                    <div className="flex items-center gap-1 text-[#546a88]">
                      <svg width="8" height="12" fill="none" viewBox="0 0 10 15">
                        <g clipPath="url(#clip0_575_204)">
                          <path d={svgPaths.p2aa6c00} fill="#8B9CB4" />
                          <path d={svgPaths.p1821f8f0} fill="#8B9CB4" />
                        </g>
                        <defs>
                          <clipPath id="clip0_575_204">
                            <rect fill="white" height="15" width="10" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="font-['Poppins',sans-serif] text-[10px] md:text-xs">Lima - San Isidro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
