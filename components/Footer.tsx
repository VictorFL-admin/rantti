import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { logoImage } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand con Logo Real de Rantti */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="Rantti Logo" 
                className="w-auto h-8 object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 mb-6 max-w-sm">
              Tu plataforma de confianza para negociar objetos únicos de alto valor. Sin intermediarios, sin complicaciones.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:soporte@gmail.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0047FF] transition-colors">
                <Mail className="w-4 h-4" />
                soporte@gmail.com
              </a>
              <a href="tel:+51999999999" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0047FF] transition-colors">
                <Phone className="w-4 h-4" />
                +51 999 999 999
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                Lima, Perú
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#0047FF] rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#0047FF] rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#0047FF] rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#0047FF] rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Marketplace - Solo Objetos Únicos */}
          <div>
            <h4 className="text-gray-900 mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Joyas Exclusivas</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Relojes de Lujo</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Arte & Coleccionables</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Consolas Retro</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Tech Premium</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Objetos Únicos</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-gray-900 mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Cómo Funciona</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Trabaja con Nosotros</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Prensa</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terminos-y-condiciones" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Términos y Condiciones</a></li>
              <li><a href="/politica-de-privacidad" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Política de Cambios y Devoluciones</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Libro de Reclamaciones</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#0047FF] transition-colors">Seguridad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Rantti. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
