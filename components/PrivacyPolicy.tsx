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
          Última actualización: 29 de marzo de 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              1. Identidad del Responsable del Tratamiento
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              La presente Política de Privacidad regula el tratamiento de los datos personales de los usuarios de la plataforma digital Rantti (en adelante, "Rantti" o la "Plataforma").
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              El responsable del tratamiento de los datos personales es el titular de Rantti, quien determina las finalidades y medios del tratamiento de dichos datos conforme a la normativa aplicable.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Para cualquier consulta, solicitud o ejercicio de derechos relacionados con datos personales, los usuarios pueden contactarse a través del siguiente correo electrónico: <a href="mailto:support@rantti.com" className="text-[#0047FF] hover:underline">support@rantti.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              2. Alcance de la Política
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              La presente Política de Privacidad se aplica a todas las personas que acceden, navegan o utilizan la Plataforma, ya sea como usuarios registrados o no registrados.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              El uso de Rantti implica la recopilación y tratamiento de datos personales conforme a lo establecido en este documento.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Al registrarse en la Plataforma o utilizar sus funcionalidades, el usuario declara haber leído, comprendido y aceptado la presente Política de Privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              3. Definición del Servicio
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti es una plataforma digital de intermediación que permite a los usuarios publicar anuncios relacionados con productos, tanto para su oferta como para su búsqueda.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              En particular, la Plataforma permite:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>La publicación de anuncios de oferta, mediante los cuales los usuarios ofrecen productos para la venta.</li>
              <li>La publicación de anuncios de demanda, mediante los cuales los usuarios manifiestan su intención de adquirir determinados productos.</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti actúa exclusivamente como un intermediario tecnológico que facilita la visibilidad de dichos anuncios y el contacto entre usuarios.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              En ese sentido, Rantti:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>No vende, compra ni distribuye productos.</li>
              <li>No participa en las negociaciones entre usuarios.</li>
              <li>No interviene en los pagos, entregas o cumplimiento de las transacciones.</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Las interacciones y acuerdos realizados entre usuarios son de su exclusiva responsabilidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              4. Datos Personales que se Recopilan
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti recopila datos personales de los usuarios de distintas formas, según la interacción que realicen dentro de la Plataforma.
            </p>
            
            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              4.1 Datos proporcionados directamente por el usuario
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Al registrarse y utilizar la Plataforma, los usuarios pueden proporcionar los siguientes datos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Nombre</li>
              <li>Correo electrónico</li>
              <li>Nombre de usuario (opcional)</li>
              <li>Número de teléfono (opcional)</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Asimismo, el usuario puede proporcionar información adicional al utilizar las funcionalidades de la Plataforma, incluyendo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Información contenida en los anuncios publicados (ofertas o demandas)</li>
              <li>Contenido de los mensajes enviados a través del chat interno</li>
              <li>Cualquier otro dato que el usuario decida compartir voluntariamente</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              El usuario es responsable de la veracidad y exactitud de los datos proporcionados.
            </p>

            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              4.2 Datos recopilados automáticamente
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti puede recopilar automáticamente cierta información cuando el usuario accede o navega en la Plataforma, tales como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Dirección IP</li>
              <li>Tipo de navegador</li>
              <li>Tipo de dispositivo</li>
              <li>Páginas visitadas</li>
              <li>Tiempo de navegación</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Asimismo, Rantti utiliza herramientas de análisis como Google Analytics para comprender el comportamiento de los usuarios y mejorar el funcionamiento de la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              5. Finalidades del Tratamiento de los Datos
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Los datos personales recopilados por Rantti son utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Crear y gestionar cuentas de usuario</li>
              <li>Permitir la publicación de anuncios de oferta y demanda</li>
              <li>Facilitar la comunicación entre usuarios mediante el chat interno</li>
              <li>Permitir la contratación de servicios de visibilidad (publicaciones destacadas)</li>
              <li>Enviar comunicaciones relacionadas con el servicio, tales como:
                <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                  <li>Confirmación de registro</li>
                  <li>Notificaciones sobre actividad en la cuenta</li>
                  <li>Confirmación de pagos</li>
                </ul>
              </li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Asimismo, los datos podrán ser utilizados para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Enviar comunicaciones promocionales o informativas sobre Rantti (cuando corresponda)</li>
              <li>Mejorar la experiencia del usuario y el funcionamiento de la Plataforma</li>
              <li>Prevenir fraudes, abusos o usos indebidos de la Plataforma</li>
              <li>Atender consultas, solicitudes o reclamos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              6. Base Legal del Tratamiento
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              El tratamiento de los datos personales por parte de Rantti se realiza conforme a las siguientes bases legales:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li><strong>Consentimiento del usuario:</strong> Cuando el usuario proporciona sus datos personales de manera voluntaria al registrarse o utilizar la Plataforma.</li>
              <li><strong>Ejecución de la relación contractual:</strong> Cuando el tratamiento es necesario para permitir el acceso y uso de las funcionalidades de Rantti, incluyendo la publicación de anuncios y la interacción entre usuarios.</li>
              <li><strong>Intereses legítimos de Rantti:</strong> Para garantizar la seguridad de la Plataforma, prevenir actividades fraudulentas, mejorar los servicios ofrecidos y optimizar la experiencia del usuario.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              7. Compartición de Datos Personales
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti podrá compartir datos personales en los siguientes casos:
            </p>
            
            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              7.1 Con otros usuarios de la Plataforma
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Al utilizar Rantti, el usuario acepta que cierta información podrá ser visible o compartida con otros usuarios, incluyendo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Nombre o nombre de usuario</li>
              <li>Información contenida en los anuncios publicados</li>
              <li>Información que el propio usuario decida compartir a través del chat interno o en descripciones</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Rantti no controla ni se responsabiliza por el uso que otros usuarios puedan hacer de la información compartida voluntariamente.
            </p>

            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              7.2 Con proveedores de servicios
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti podrá compartir datos personales con terceros que prestan servicios necesarios para el funcionamiento de la Plataforma, tales como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Servicios de alojamiento web proporcionados por Hostinger</li>
              <li>Servicios de procesamiento de pagos proporcionados por Culqi</li>
              <li>Herramientas de análisis como Google Analytics</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Estos proveedores acceden a los datos únicamente en la medida necesaria para prestar sus servicios y están sujetos a sus propias políticas de privacidad.
            </p>

            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              7.3 Transferencias internacionales de datos
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Debido a la naturaleza de los servicios tecnológicos utilizados por Rantti, los datos personales pueden ser almacenados o procesados en servidores ubicados fuera del Perú. En tales casos, Rantti adopta medidas razonables para asegurar que los datos personales sean tratados de forma segura y conforme a la presente Política de Privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              8. Pagos dentro de la Plataforma
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti ofrece servicios de pago únicamente en relación con la contratación de publicaciones destacadas dentro de la Plataforma.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Los pagos son procesados a través de un proveedor externo, Culqi, mediante un formulario seguro integrado en la Plataforma.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>No recopila ni almacena información financiera sensible, como datos de tarjetas de crédito o débito.</li>
              <li>No tiene acceso directo a los datos de pago ingresados por el usuario.</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              El tratamiento de los datos de pago es responsabilidad exclusiva del proveedor de servicios de pago, conforme a sus propios términos y políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              9. Chat Interno y Contenido Generado por los Usuarios
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti ofrece a los usuarios la posibilidad de comunicarse mediante un sistema de chat interno dentro de la Plataforma.
            </p>
            
            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              9.1 Almacenamiento de mensajes
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Los mensajes intercambiados entre usuarios pueden ser almacenados por Rantti con fines de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif]">
              <li>Funcionamiento de la Plataforma</li>
              <li>Seguridad</li>
              <li>Prevención de fraudes o abusos</li>
            </ul>

            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              9.2 Acceso a los mensajes
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti podrá acceder al contenido de los mensajes en casos específicos, tales como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Atención de reportes o denuncias</li>
              <li>Investigación de conductas indebidas</li>
              <li>Cumplimiento de obligaciones legales</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Rantti no realiza una supervisión activa o sistemática de las conversaciones entre usuarios.
            </p>

            <h3 className="text-xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-2 mt-4">
              9.3 Responsabilidad del usuario
            </h3>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Los usuarios son los únicos responsables del contenido que comparten a través del chat interno o en cualquier otra sección de la Plataforma.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Se recomienda a los usuarios:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>No compartir información sensible innecesaria</li>
              <li>Verificar la identidad de otros usuarios antes de realizar cualquier acuerdo</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Rantti no garantiza la veracidad de la información proporcionada por los usuarios ni se responsabiliza por las interacciones, acuerdos o conflictos que puedan surgir entre ellos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              10. Conservación de los Datos Personales
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti conservará los datos personales de los usuarios únicamente durante el tiempo necesario para cumplir con las finalidades descritas en la presente Política de Privacidad.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              En particular:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Los datos de usuarios con cuentas activas se conservarán mientras la cuenta permanezca vigente.</li>
              <li>En caso de que el usuario solicite la eliminación de su cuenta, sus datos personales serán eliminados en un plazo máximo de 90 días desde la solicitud.</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              No obstante, Rantti podrá conservar cierta información por un período adicional cuando sea necesario para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Cumplir con obligaciones legales</li>
              <li>Resolver disputas</li>
              <li>Prevenir fraudes o abusos</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Asimismo, los mensajes intercambiados a través del chat interno podrán ser conservados por un período adicional con fines de seguridad y prevención de conductas indebidas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              11. Derechos del Usuario
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              De conformidad con la normativa aplicable, los usuarios tienen derecho a ejercer control sobre sus datos personales.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              En ese sentido, el usuario puede solicitar en cualquier momento:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>Acceso a sus datos personales</li>
              <li>Rectificación de datos inexactos o incompletos</li>
              <li>Eliminación de sus datos personales</li>
              <li>Oposición al tratamiento de sus datos en determinados casos</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Para ejercer estos derechos, el usuario podrá enviar una solicitud al correo de contacto indicado en la presente Política de Privacidad.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Rantti atenderá dichas solicitudes dentro de los plazos establecidos por la normativa aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              12. Eliminación de Cuenta
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Los usuarios pueden solicitar la eliminación de su cuenta en cualquier momento.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              La eliminación de la cuenta implica:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 font-['Poppins',sans-serif] mb-3">
              <li>La eliminación de los datos personales asociados a la cuenta, conforme al plazo indicado en la presente Política</li>
              <li>La eliminación de los anuncios publicados por el usuario</li>
            </ul>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              No obstante, cierta información podrá conservarse temporalmente por razones legales, técnicas o de seguridad, incluyendo información relacionada con el uso de la Plataforma o interacciones realizadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              13. Seguridad de la Información
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti adopta medidas técnicas y organizativas razonables para proteger los datos personales de los usuarios contra el acceso no autorizado, pérdida, uso indebido o divulgación.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              La Plataforma utiliza protocolos de seguridad, incluyendo conexiones cifradas (HTTPS), para proteger la información durante su transmisión.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              No obstante, el usuario reconoce que ningún sistema es completamente seguro, por lo que Rantti no puede garantizar la seguridad absoluta de la información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              14. Uso de Cookies
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti utiliza cookies y tecnologías similares para mejorar la experiencia del usuario y analizar el uso de la Plataforma.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              En particular, la Plataforma utiliza herramientas de análisis como Google Analytics, que permiten recopilar información sobre la navegación de los usuarios, tales como páginas visitadas, tiempo de permanencia y comportamiento dentro del sitio.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              El usuario puede configurar su navegador para rechazar o eliminar cookies; sin embargo, esto podría afectar el correcto funcionamiento de algunas funcionalidades de la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              15. Restricción de Edad
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti está dirigida exclusivamente a personas mayores de 18 años.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              La Plataforma no recopila intencionalmente datos personales de menores de edad. En caso de detectarse el registro de un menor, Rantti podrá eliminar la cuenta y los datos asociados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              16. Modificaciones de la Política de Privacidad
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Rantti se reserva el derecho de modificar la presente Política de Privacidad en cualquier momento, con el fin de adaptarla a cambios normativos o mejoras en la Plataforma.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed mb-3">
              Cualquier modificación será publicada en la Plataforma, indicando la fecha de última actualización.
            </p>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              El uso continuo de Rantti después de la publicación de cambios implica la aceptación de la Política de Privacidad actualizada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-['Poppins',sans-serif] font-semibold text-gray-900 mb-3">
              17. Contacto
            </h2>
            <p className="text-gray-600 font-['Poppins',sans-serif] leading-relaxed">
              Para cualquier consulta, solicitud o reclamo relacionado con la presente Política de Privacidad o el tratamiento de datos personales, los usuarios pueden contactarse a través del siguiente correo electrónico: <a href="mailto:support@rantti.com" className="text-[#0047FF] hover:underline">support@rantti.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
