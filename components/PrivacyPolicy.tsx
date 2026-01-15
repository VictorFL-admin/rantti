import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { logoImage } from "@/lib/images";

interface PrivacyPolicyProps {
  onNavigate: (page: 'home') => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => onNavigate('home')} className="cursor-pointer">
              <img 
                src={logoImage} 
                alt="Rantti Logo" 
                className="w-auto h-8 object-contain hover:opacity-80 transition-opacity"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-['Poppins',sans-serif] font-bold text-gray-900 mb-4">
          Política de Privacidad
        </h1>
        <p className="text-sm text-gray-500 font-['Poppins',sans-serif] mb-8">
          Última actualización: 10 de enero de 2025
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              1. Introducción
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              En Rantti, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información cuando utilizas nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              2. Información que Recopilamos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Recopilamos diferentes tipos de información:
            </p>
            
            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              2.1. Información que nos proporcionas
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Nombre completo y datos de contacto (email, teléfono)</li>
              <li>Información de perfil (foto, biografía)</li>
              <li>Detalles de publicaciones (productos, descripciones, imágenes, precios)</li>
              <li>Mensajes y comunicaciones en la plataforma</li>
              <li>Información de verificación de identidad</li>
            </ul>

            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              2.2. Información recopilada automáticamente
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Dirección IP y datos de navegación</li>
              <li>Tipo de dispositivo y navegador</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Cookies y tecnologías similares</li>
              <li>Ubicación geográfica aproximada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              3. Cómo Usamos tu Información
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Proporcionar y mantener nuestros servicios</li>
              <li>Facilitar las negociaciones entre compradores y vendedores</li>
              <li>Procesar publicaciones y pagos de servicios premium</li>
              <li>Verificar tu identidad y prevenir fraudes</li>
              <li>Enviarte notificaciones sobre ofertas, mensajes y actualizaciones</li>
              <li>Mejorar y personalizar tu experiencia</li>
              <li>Cumplir con obligaciones legales</li>
              <li>Realizar análisis y estadísticas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              4. Compartir tu Información
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Compartimos tu información únicamente en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li><strong>Con otros usuarios:</strong> Tu perfil público, publicaciones y mensajes de negociación son visibles para otros usuarios</li>
              <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar la plataforma (hosting, análisis, email)</li>
              <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
              <li><strong>Transferencias comerciales:</strong> En caso de fusión, adquisición o venta de activos</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mt-3">
              <strong>Nunca vendemos tu información personal a terceros.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              5. Seguridad de los Datos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Encriptación SSL/TLS para la transmisión de datos</li>
              <li>Almacenamiento seguro en servidores protegidos</li>
              <li>Acceso limitado a la información personal</li>
              <li>Monitoreo continuo de vulnerabilidades</li>
              <li>Protocolos de respuesta ante incidentes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              6. Cookies y Tecnologías Similares
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Mantener tu sesión activa</li>
              <li>Recordar tus preferencias</li>
              <li>Analizar el uso de la plataforma</li>
              <li>Personalizar contenido y anuncios</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mt-3">
              Puedes gestionar las cookies desde la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              7. Tus Derechos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li><strong>Acceder:</strong> Solicitar una copia de tu información personal</li>
              <li><strong>Rectificar:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Eliminar:</strong> Solicitar la eliminación de tu cuenta y datos</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
              <li><strong>Oponerte:</strong> Rechazar ciertos procesamientos de tus datos</li>
              <li><strong>Limitar:</strong> Restringir el procesamiento en ciertas circunstancias</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mt-3">
              Para ejercer estos derechos, contáctanos en <a href="mailto:privacidad@rantti.com" className="text-[#0047FF] hover:underline">privacidad@rantti.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              8. Retención de Datos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Conservamos tu información personal mientras tu cuenta esté activa o sea necesario para proporcionar servicios. Después de la eliminación de tu cuenta, mantenemos ciertos datos por razones legales, fiscales o de seguridad durante el período requerido por ley.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              9. Menores de Edad
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Rantti está dirigido a mayores de 18 años. No recopilamos intencionalmente información de menores. Si descubrimos que hemos recopilado datos de un menor, eliminaremos esa información inmediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              10. Transferencias Internacionales
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Tu información puede ser transferida y procesada en países fuera de Perú. Nos aseguramos de que estas transferencias cumplan con las leyes aplicables de protección de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              11. Cambios a esta Política
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos mediante email o un aviso destacado en la plataforma. La fecha de "Última actualización" refleja cuándo se modificó por última vez.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              12. Contacto
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Para preguntas sobre esta política de privacidad o el manejo de tus datos:
              <br />
              <strong>Email:</strong> <a href="mailto:privacidad@rantti.com" className="text-[#0047FF] hover:underline">privacidad@rantti.com</a>
              <br />
              <strong>Dirección:</strong> Lima, Perú
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
