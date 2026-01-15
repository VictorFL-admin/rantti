import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { logoImage } from "@/lib/images";

interface TermsAndConditionsProps {
  onNavigate: (page: 'home') => void;
}

export default function TermsAndConditions({ onNavigate }: TermsAndConditionsProps) {
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
          Términos y Condiciones
        </h1>
        <p className="text-sm text-gray-500 font-['Poppins',sans-serif] mb-8">
          Última actualización: 10 de enero de 2025
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              1. Aceptación de los Términos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Al acceder y utilizar Rantti, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              2. Descripción del Servicio
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti es un marketplace digital que conecta compradores y vendedores de artículos únicos de alto valor. Nuestra plataforma permite:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Publicar productos de forma gratuita</li>
              <li>Negociar directamente entre compradores y vendedores</li>
              <li>Realizar ofertas y contraofertas en tiempo real</li>
              <li>Coordinar la entrega y el pago directamente entre las partes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              3. Registro y Cuenta de Usuario
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Para utilizar ciertas funciones de Rantti, debes crear una cuenta. Te comprometes a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Proporcionar información precisa, completa y actualizada</li>
              <li>Mantener la seguridad de tu contraseña</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta</li>
              <li>Ser responsable de todas las actividades que ocurran bajo tu cuenta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              4. Publicaciones y Contenido
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Al publicar contenido en Rantti, garantizas que:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Eres el propietario legítimo del producto o tienes autorización para venderlo</li>
              <li>El contenido no infringe derechos de terceros</li>
              <li>Las descripciones e imágenes son precisas y no engañosas</li>
              <li>Los productos cumplen con las leyes aplicables</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              5. Negociaciones y Transacciones
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti actúa únicamente como intermediario digital. Las transacciones se realizan directamente entre compradores y vendedores:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>No procesamos pagos ni participamos en la entrega de productos</li>
              <li>No garantizamos el cumplimiento de las transacciones</li>
              <li>No somos responsables de disputas entre usuarios</li>
              <li>Recomendamos usar métodos de pago seguros y verificar la autenticidad de los productos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              6. Tarifas y Pagos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Publicar en Rantti es gratuito. Ofrecemos servicios opcionales de pago para impulsar publicaciones. No cobramos comisiones sobre las ventas realizadas. Las tarifas de servicios premium se comunican claramente antes de la contratación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              7. Productos Prohibidos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Está prohibido publicar:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Productos falsificados o réplicas</li>
              <li>Artículos robados</li>
              <li>Productos ilegales o regulados sin permisos</li>
              <li>Contenido que viole derechos de propiedad intelectual</li>
              <li>Servicios que no sean artículos físicos únicos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              8. Suspensión y Terminación
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos, sin previo aviso. Los usuarios pueden cerrar sus cuentas en cualquier momento desde la configuración.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              9. Limitación de Responsabilidad
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Rantti no se hace responsable de pérdidas, daños o perjuicios derivados del uso de la plataforma, transacciones entre usuarios, o la calidad, seguridad o legalidad de los productos publicados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              10. Modificaciones
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos se comunicarán a los usuarios registrados. El uso continuado de la plataforma después de los cambios constituye la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              11. Ley Aplicable
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Estos términos se rigen por las leyes de Perú. Cualquier disputa se resolverá en los tribunales competentes de Lima, Perú.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              12. Contacto
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Para preguntas sobre estos términos, contáctanos en:
              <br />
              <a href="mailto:legal@rantti.com" className="text-[#0047FF] hover:underline">legal@rantti.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
