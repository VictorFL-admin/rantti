import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { logoImage } from "@/lib/images";

interface TermsAndConditionsProps {
  onNavigate: (page: 'home') => void;
}

export default function TermsAndConditions({ onNavigate }: TermsAndConditionsProps) {
  const TERMS_TEXT = String.raw`TÉRMINOS Y CONDICIONES DE
RANTTI

1. Introducción y aceptación de los Términos
1.1 Alcance del documento
Los presentes Términos y Condiciones regulan el acceso, registro y uso de la plataforma digital Rantti (en adelante, "Rantti" o la "Plataforma"), la cual funciona como un marketplace que conecta compradores y vendedores para la publicación y visualización de productos ofrecidos por terceros. Rantti actúa únicamente como intermediario tecnológico, proporcionando un espacio digital donde los usuarios pueden publicar productos y contactarse entre sí. Rantti no es propietario, vendedor, distribuidor ni proveedor de los productos publicados en la Plataforma. El uso de Rantti está sujeto a la aceptación plena y sin reservas de estos Términos y Condiciones, así como de las políticas complementarias que puedan ser publicadas por Rantti.

1.2 Aceptación expresa al registrarse y usar la plataforma
El acceso, registro y uso de Rantti implica que el usuario ha leído, entendido y aceptado expresamente los presentes Términos y Condiciones. La aceptación se entiende otorgada en cualquiera de los siguientes casos:
● Al crear una cuenta en la Plataforma.

● Al publicar, visualizar o interactuar con publicaciones.

● Al utilizar cualquier funcionalidad ofrecida por Rantti.

● Al contratar servicios pagos dentro de la Plataforma.

Si el usuario no está de acuerdo con estos Términos y Condiciones, deberá abstenerse de registrarse o utilizar la Plataforma.

1.3 Carácter vinculante de los Términos y Condiciones
Estos Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y Rantti, y regulan la relación entre ambas partes durante el uso de la Plataforma. El usuario reconoce que estos Términos tienen el mismo valor legal que un contrato firmado de manera física, y acepta cumplirlos en su totalidad mientras haga uso de Rantti. El incumplimiento de cualquiera de las disposiciones aquí establecidas podrá dar lugar a la suspensión o cancelación de la cuenta del usuario, sin perjuicio de otras acciones que pudieran corresponder conforme a la legislación aplicable.

2. Definiciones
Para efectos de los presentes Términos y Condiciones, los términos que se indican a continuación tendrán el significado que se les atribuye en esta sección, ya sea que se utilicen en singular o plural:

2.1 Rantti
"Rantti" se refiere a la plataforma digital de tipo marketplace, incluyendo su sitio web y cualesquiera aplicaciones móviles que puedan desarrollarse en el futuro, dominios, subdominios, funcionalidades y servicios asociados, cuya finalidad es conectar a compradores y vendedores para la publicación y visualización de productos ofrecidos por terceros. Rantti actúa exclusivamente como intermediario tecnológico y no participa como parte en las transacciones que se realicen entre los usuarios.

2.2 Usuario
"Usuario" es toda persona natural mayor de edad que accede, navega, se registra o utiliza la Plataforma, ya sea de forma ocasional o mediante una cuenta registrada. El término "Usuario" incluye tanto a compradores como a vendedores, sin que ello implique una relación contractual distinta con Rantti más allá de la aceptación de estos Términos y Condiciones.

2.3 Comprador y Vendedor
● "Comprador" es el Usuario que utiliza la Plataforma con el propósito de buscar,
visualizar, contactar o adquirir productos ofrecidos por otros usuarios. Asimismo, el Comprador podrá publicar solicitudes o anuncios relacionados con productos que desee adquirir, con el fin de atraer a potenciales vendedores.

● "Vendedor" es el Usuario que publica productos en la Plataforma con el fin de
ofrecerlos a potenciales compradores, ya sea a título personal o comercial, siendo el único responsable de la información proporcionada, del producto ofrecido y del cumplimiento de la normativa aplicable.

Rantti no garantiza la calidad, existencia, legalidad ni entrega de los productos ofrecidos por los Vendedores.

2.4 Publicación
"Publicación" es todo contenido creado, cargado o difundido por un Usuario dentro de la Plataforma, incluyendo, de manera enunciativa mas no limitativa, la oferta o demanda de productos, descripciones, imágenes, precios, solicitudes de compra, textos, mensajes y cualquier otra información asociada a productos o intenciones de compra o venta. Cada Publicación es de exclusiva responsabilidad del Usuario que la realiza.

2.5 Planes Destacados
"Planes Destacados" son los servicios pagos ofrecidos por Rantti que permiten a los Usuarios otorgar mayor visibilidad a sus Publicaciones dentro de la Plataforma, por un período de tiempo determinado y conforme a las condiciones específicas de cada plan. La contratación de Planes Destacados no garantiza ventas, contactos ni resultados comerciales, ya que estos dependen de factores ajenos a Rantti.

2.6 Plataforma
"Plataforma" se refiere al entorno digital administrado por Rantti, a través del cual los Usuarios pueden registrarse, publicar productos, interactuar entre sí, comunicarse mediante herramientas internas y acceder a los servicios ofrecidos por Rantti.
3. Naturaleza del servicio de Rantti
3.1 Rantti como plataforma intermediaria
Rantti es una plataforma digital de tipo marketplace que actúa exclusivamente como intermediario tecnológico, poniendo a disposición de los Usuarios un espacio digital para la publicación de ofertas y demandas de productos, así como para la comunicación directa entre compradores y vendedores. Rantti no participa como parte en las negociaciones, acuerdos o transacciones que se realicen entre los Usuarios, ni interviene en la determinación de precios, condiciones de venta, entrega, pago o devolución de los productos.

3.2 Ausencia de relación contractual entre Rantti y los Usuarios
El uso de la Plataforma no crea, bajo ninguna circunstancia, una relación laboral, societaria, de agencia, representación, franquicia o asociación entre Rantti y los Usuarios. Cada Usuario actúa de manera independiente, ya sea a título personal o comercial, y es el único responsable de las obligaciones legales, fiscales y comerciales que pudieran derivarse de sus actividades dentro o fuera de la Plataforma.

3.3 Rantti no es vendedor ni comprador
Rantti no es propietario, vendedor, distribuidor, comprador ni revendedor de los productos publicados en la Plataforma, ni asume responsabilidad alguna sobre la existencia, calidad, legalidad, seguridad o disponibilidad de dichos productos. Asimismo, Rantti no garantiza que las publicaciones de oferta o demanda generen contactos, negociaciones o transacciones efectivas entre los Usuarios.

3.4 Transacciones y acuerdos entre Usuarios
Cualquier negociación, acuerdo o transacción que pudiera surgir a partir de una Publicación es realizada única y exclusivamente entre los Usuarios involucrados, bajo su propia responsabilidad. Rantti no valida ni supervisa las condiciones acordadas entre compradores y vendedores, ni interviene en disputas, reclamos, devoluciones, incumplimientos o conflictos que puedan surgir entre ellos.

3.5 Limitación de responsabilidad por el uso de la Plataforma
Rantti no asume responsabilidad alguna por los daños, pérdidas o perjuicios que pudieran derivarse del uso de la Plataforma, incluyendo aquellos relacionados con publicaciones de oferta o demanda, comunicaciones entre Usuarios o acuerdos alcanzados fuera o dentro de la Plataforma. El Usuario reconoce y acepta que el uso de Rantti se realiza bajo su propia responsabilidad, y que Rantti no garantiza el correcto comportamiento, solvencia o cumplimiento de los demás Usuarios.
4. Requisitos para el uso de la Plataforma
4.1 Edad mínima y capacidad legal
El uso de la Plataforma está permitido únicamente a personas mayores de dieciocho (18) años que cuenten con la capacidad legal necesaria para aceptar estos Términos y Condiciones y para celebrar acuerdos jurídicamente válidos. Al registrarse o utilizar Rantti, el Usuario declara y garantiza que cumple con el requisito de edad mínima y que tiene plena capacidad legal para obligarse conforme a estos Términos.

4.2 Uso conforme a la ley
El Usuario se compromete a utilizar la Plataforma de manera lícita, responsable y conforme a la legislación vigente en la República del Perú, así como a las disposiciones de estos Términos y Condiciones. Queda estrictamente prohibido el uso de Rantti para fines ilegales, fraudulentos o contrarios al orden público, la moral o las buenas costumbres.

4.3 Uso permitido de la Plataforma
El Usuario podrá utilizar la Plataforma exclusivamente para:
● Publicar ofertas o demandas de productos permitidos por la ley.

● Buscar, visualizar e interactuar con Publicaciones.

● Comunicarse con otros Usuarios a través de las herramientas habilitadas por Rantti.

● Contratar servicios ofrecidos por Rantti, incluyendo Planes Destacados.

Cualquier uso distinto a los señalados podrá ser considerado indebido y dar lugar a las medidas previstas en estos Términos.

4.4 Usos prohibidos
Sin perjuicio de otras prohibiciones establecidas en estos Términos, el Usuario se compromete a no utilizar la Plataforma para:
● Publicar, ofrecer o solicitar productos o actividades ilegales.

● Proporcionar información falsa, engañosa o inexacta.

● Suplantar la identidad de otras personas o entidades.

● Realizar prácticas fraudulentas, estafas o engaños.

● Utilizar la Plataforma con fines distintos a aquellos para los que fue creada.

● Interferir o intentar interferir con el funcionamiento normal de la Plataforma.

4.5 Consecuencias del incumplimiento
El incumplimiento de cualquiera de los requisitos establecidos en esta sección podrá dar lugar, a criterio de Rantti, a la suspensión temporal o cancelación definitiva de la cuenta del Usuario, sin necesidad de previo aviso y sin que ello genere derecho a indemnización alguna.

5. Registro de usuarios y cuentas
5.1 Registro en la Plataforma
El acceso a determinadas funcionalidades de la Plataforma requiere que el Usuario se registre y cree una cuenta personal en Rantti. El registro es libre y gratuito, y el Usuario se compromete a proporcionar información veraz, actualizada y completa durante el proceso de registro y en el uso posterior de la Plataforma.

5.2 Datos del Usuario
El Usuario es el único responsable de la información que proporciona a Rantti, incluyendo datos personales, datos de contacto y cualquier otra información asociada a su cuenta. Rantti no se responsabiliza por la exactitud, veracidad o legalidad de los datos ingresados por los Usuarios, ni por los perjuicios que puedan derivarse del uso de información incorrecta o falsa.

5.3 Uso de alias y nombre comercial
El Usuario podrá utilizar un alias o nombre visible dentro de la Plataforma, el cual podrá corresponder a su nombre personal, nombre comercial o denominación con la que desee identificarse frente a otros Usuarios. El uso de un alias no exime al Usuario de su responsabilidad legal, ni implica que Rantti verifique, avale o certifique la identidad, actividad comercial o existencia legal del Usuario.

5.4 Responsabilidad sobre la cuenta
El Usuario es exclusivamente responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que se realicen desde su cuenta. Cualquier acción realizada a través de la cuenta del Usuario se considerará efectuada por el propio Usuario, quien asumirá todas las consecuencias derivadas de su uso. El Usuario se compromete a notificar de inmediato a Rantti ante cualquier uso no autorizado de su cuenta o vulneración de seguridad.

5.5 Uso personal de la cuenta
La cuenta creada en la Plataforma es personal e intransferible. El Usuario no podrá ceder, vender, prestar o transferir su cuenta a terceros sin autorización expresa de Rantti. Rantti se reserva el derecho de suspender o cancelar cuentas que sean utilizadas por terceros o de manera contraria a estos Términos y Condiciones.

5.6 Suspensión o cancelación de cuentas
Rantti podrá suspender o cancelar cuentas de Usuario en caso de:
● Incumplimiento de estos Términos y Condiciones.

● Uso indebido o fraudulento de la Plataforma.

● Provisión de información falsa o engañosa.

● Actividades ilegales o contrarias a la ley.

Dicha suspensión o cancelación podrá realizarse sin previo aviso en casos graves, sin que ello genere derecho a compensación alguna.

6. Obligaciones del Usuario
6.1 Cumplimiento de los Términos y la ley
El Usuario se compromete a utilizar la Plataforma de conformidad con los presentes Términos y Condiciones, así como con la legislación vigente en la República del Perú. El Usuario es responsable de conocer y cumplir las normas legales que resulten aplicables a las actividades que realice dentro y fuera de la Plataforma.

6.2 Obligaciones generales del Usuario
Sin perjuicio de otras obligaciones establecidas en estos Términos, el Usuario se compromete a:
● Proporcionar información veraz, completa y actualizada.

● Utilizar la Plataforma de manera responsable y conforme a su finalidad.

● Abstenerse de realizar conductas que puedan afectar el funcionamiento de la
Plataforma o la experiencia de otros Usuarios.

● Respetar los derechos de terceros, incluyendo derechos de propiedad intelectual,
privacidad y protección de datos.

6.3 Obligaciones específicas del Vendedor
El Usuario que actúe como Vendedor se obliga a:
● Publicar información clara, veraz y precisa sobre los productos ofrecidos.

● Garantizar que los productos ofrecidos sean lícitos y cumplan con la normativa
aplicable.

● Asumir total responsabilidad sobre la existencia, calidad, estado, legalidad y entrega de
los productos.

● Cumplir con las condiciones ofrecidas al Comprador.

Rantti no asume responsabilidad alguna por los productos ofrecidos por los Vendedores.

6.4 Obligaciones específicas del Comprador
El Usuario que actúe como Comprador se obliga a:
● Utilizar la Plataforma de buena fe.

● Evaluar cuidadosamente las Publicaciones antes de contactar o acordar con un
Vendedor.

● Asumir responsabilidad por las solicitudes de productos que publique.

● Cumplir con los acuerdos alcanzados con los Vendedores.

6.5 Prohibición de conductas indebidas
El Usuario se compromete a no realizar, directa o indirectamente, conductas que puedan considerarse indebidas, incluyendo, de manera enunciativa mas no limitativa:
● Publicar contenido ilegal, engañoso o fraudulento.

● Utilizar la Plataforma para estafas o intentos de fraude.

● Manipular, interferir o dañar la Plataforma o sus sistemas.

● Utilizar la Plataforma para fines distintos a los permitidos.

6.6 Responsabilidad por el uso de la Plataforma
El Usuario reconoce y acepta que es el único responsable por el uso que haga de la Plataforma, así como por las consecuencias que se deriven de sus acciones, publicaciones, comunicaciones y acuerdos con otros Usuarios. Rantti no será responsable por el incumplimiento de las obligaciones del Usuario ni por los daños o perjuicios derivados de su conducta.
7. Publicaciones y contenido
7.1 Responsabilidad sobre las Publicaciones
Toda Publicación realizada en la Plataforma es de exclusiva responsabilidad del Usuario que la crea, ya sea que se trate de una oferta o de una demanda de productos. El Usuario garantiza que la información contenida en sus Publicaciones es veraz, precisa y conforme a la legislación vigente, y asume plena responsabilidad por cualquier consecuencia derivada de su contenido.

7.2 Contenido permitido
Los Usuarios podrán publicar contenido relacionado únicamente con:
● La oferta de productos lícitos.

● La demanda o solicitud de productos lícitos.

● Información necesaria para facilitar el contacto y la comunicación entre Usuarios.

Las Publicaciones deberán respetar la ley, el orden público, la moral y las buenas costumbres.

7.3 Contenido prohibido
Queda estrictamente prohibido publicar contenido que:
● Sea ilegal o promueva actividades ilícitas.

● Infrinja derechos de terceros.

● Sea falso, engañoso o fraudulento.

● Contenga información ofensiva, violenta, discriminatoria o contraria al orden público.

● Tenga como finalidad engañar o perjudicar a otros Usuarios.

Rantti se reserva el derecho de determinar, a su exclusivo criterio, qué contenido se considera prohibido.

7.4 Revisión y moderación de Publicaciones
Rantti no realiza una revisión previa obligatoria de las Publicaciones. No obstante, podrá revisar, supervisar y moderar el contenido con posterioridad a su publicación, de manera manual o automatizada. Rantti podrá eliminar, modificar, suspender o bloquear cualquier Publicación que, a su criterio, incumpla estos Términos y Condiciones, sin necesidad de previo aviso.

7.5 Eliminación de Publicaciones
Rantti podrá eliminar Publicaciones en cualquier momento, incluso aquellas que hayan sido destacadas mediante Planes Destacados, sin que ello genere derecho a reembolso o indemnización alguna para el Usuario. La eliminación de una Publicación no implica responsabilidad alguna para Rantti.

7.6 Derechos sobre el contenido
El Usuario otorga a Rantti una autorización gratuita, no exclusiva y por tiempo indefinido para utilizar, reproducir, mostrar y difundir las Publicaciones dentro de la Plataforma y en canales asociados a su funcionamiento. Esta autorización tiene como única finalidad el correcto funcionamiento y promoción de la Plataforma.

7.7 Exoneración de responsabilidad
Rantti no garantiza la veracidad, calidad, legalidad ni exactitud de las Publicaciones realizadas por los Usuarios, ni asume responsabilidad por los daños o perjuicios que pudieran derivarse del contenido publicado. El Usuario reconoce que utiliza la información contenida en las Publicaciones bajo su propia responsabilidad.
8. Moderación y control de contenido
8.1 Facultades de moderación
Rantti se reserva el derecho, mas no la obligación, de supervisar, revisar, moderar y controlar las Publicaciones, comunicaciones y demás contenidos generados por los Usuarios dentro de la Plataforma. La moderación podrá realizarse de forma manual, automatizada o mixta, y tendrá como finalidad proteger el correcto funcionamiento de la Plataforma, la seguridad de los Usuarios y el cumplimiento de estos Términos y Condiciones.

8.2 Criterios de moderación
Rantti podrá adoptar medidas de moderación cuando detecte, o razonablemente considere, que un contenido:
● Incumple estos Términos y Condiciones.

● Sea contrario a la ley, al orden público o a las buenas costumbres.

● Pueda generar riesgos legales, técnicos o reputacionales para la Plataforma o para
terceros.

● Afecte negativamente la experiencia de otros Usuarios.

La aplicación de estos criterios queda a exclusivo criterio de Rantti.

8.3 Medidas aplicables
Como resultado de los procesos de moderación, Rantti podrá, entre otras medidas:
● Eliminar o modificar Publicaciones.

● Suspender o bloquear temporalmente contenido.

● Limitar funcionalidades de la cuenta.

● Suspender o cancelar cuentas de Usuario.

Dichas medidas podrán adoptarse sin previo aviso, especialmente en casos graves o reiterados.

8.4 Ausencia de obligación de supervisión permanente
El Usuario reconoce y acepta que Rantti no está obligado a realizar una supervisión continua o permanente del contenido publicado por los Usuarios. La ausencia de intervención por parte de Rantti respecto de una Publicación o conducta específica no implica aprobación, validación ni renuncia a ejercer acciones futuras.

8.5 Denuncia de contenidos
Rantti podrá habilitar mecanismos para que los Usuarios reporten contenidos que consideren contrarios a estos Términos o a la ley. La recepción de una denuncia no implica obligación alguna de eliminar el contenido reportado, quedando la decisión final sujeta al criterio de Rantti.

8.6 Exoneración de responsabilidad
Rantti no será responsable por los daños o perjuicios que pudieran derivarse de las decisiones de moderación adoptadas conforme a esta sección, ni por la permanencia o eliminación de contenidos publicados por los Usuarios.
9. Planes destacados y servicios pagos
9.1 Servicios pagos ofrecidos por Rantti
Rantti ofrece a los Usuarios determinados servicios pagos, entre los cuales se incluyen los Planes Destacados, cuya finalidad es otorgar mayor visibilidad a las Publicaciones dentro de la Plataforma, conforme a las condiciones de cada plan. La contratación de servicios pagos es opcional y no condiciona el uso básico de la Plataforma.

9.2 Descripción de los Planes Destacados
Los Planes Destacados permiten resaltar Publicaciones por un período de tiempo determinado, mejorando su ubicación o exposición dentro de la Plataforma. Las características específicas, duración y precios de cada Plan Destacado serán informados de manera clara al Usuario antes de su contratación.

9.3 Ausencia de garantía de resultados
El Usuario reconoce y acepta que la contratación de Planes Destacados no garantiza ventas, contactos, negociaciones ni resultados comerciales, ya que estos dependen de factores ajenos a Rantti, tales como la demanda del mercado, el precio del producto, la calidad de la Publicación y la conducta de otros Usuarios. Rantti no asume obligación alguna de resultado respecto de los Planes Destacados.

9.4 Pago de los servicios
El pago de los Planes Destacados y demás servicios pagos ofrecidos por Rantti es de carácter único, conforme a los precios y condiciones vigentes al momento de la contratación. Rantti no cobra comisiones por las transacciones que puedan realizarse entre Usuarios.

9.5 Política de no reembolso
Los pagos efectuados por la contratación de Planes Destacados no son reembolsables, incluso en los siguientes casos:
● Eliminación de la Publicación por incumplimiento de estos Términos y Condiciones.

● Falta de resultados comerciales.

● Decisión del Usuario de retirar la Publicación antes del vencimiento del plan.

9.6 Suspensión o cancelación de servicios pagos
Rantti se reserva el derecho de suspender o cancelar Planes Destacados asociados a Publicaciones o cuentas que incumplan estos Términos y Condiciones, sin que ello genere derecho a reembolso o indemnización alguna.
10. Pagos y política de no reembolso
10.1 Condiciones de pago
Los pagos por los servicios ofrecidos por Rantti, incluyendo los Planes Destacados, deberán realizarse conforme a los precios, métodos y condiciones indicados en la Plataforma al momento de la contratación. El Usuario reconoce que es su responsabilidad revisar cuidadosamente las condiciones del servicio antes de efectuar cualquier pago.

10.2 Precios, moneda e impuestos
Todos los precios publicados en la Plataforma se expresan en soles peruanos (PEN) e incluyen los impuestos aplicables, de conformidad con la normativa vigente en la República del Perú. Rantti se reserva el derecho de modificar los precios de sus servicios en cualquier momento, sin que ello afecte los servicios ya contratados y pagados.

10.3 Pago único
Los servicios pagos ofrecidos por Rantti se contratan mediante un pago único, sin que ello implique suscripciones automáticas, cargos recurrentes ni renovaciones periódicas, salvo que se indique expresamente lo contrario en el futuro.

10.4 Política de no reembolso
Todos los pagos realizados a favor de Rantti por servicios contratados son definitivos y no reembolsables, sin excepción. El Usuario acepta expresamente que no tendrá derecho a reembolso, total ni parcial, incluso en los siguientes supuestos, de manera enunciativa mas no limitativa:
● Falta de resultados comerciales o de ventas.

● Eliminación de Publicaciones por incumplimiento de estos Términos y Condiciones.

● Suspensión o cancelación de la cuenta del Usuario.

● Decisión unilateral del Usuario de dejar de utilizar la Plataforma antes del vencimiento
del servicio contratado.

10.5 Reclamaciones relacionadas con pagos
Cualquier consulta o reclamo relacionado con pagos deberá realizarse exclusivamente a través de los canales oficiales de contacto de Rantti. La presentación de un reclamo no suspende ni modifica la aplicación de la política de no reembolso establecida en esta sección.

10.6 Exoneración de responsabilidad
Rantti no será responsable por errores, fallas, retrasos o interrupciones atribuibles a terceros proveedores de servicios de pago, ni por los cargos adicionales que pudieran aplicar dichas entidades, los cuales serán de exclusiva responsabilidad del Usuario.

11. Comunicaciones entre usuarios
11.1 Canales de comunicación habilitados
Rantti pone a disposición de los Usuarios un sistema de comunicación interna dentro de la Plataforma, con el fin de facilitar el contacto entre Compradores y Vendedores en relación con las Publicaciones de oferta o demanda de productos. Las comunicaciones entre Usuarios se realizan exclusivamente a través de los canales internos habilitados por Rantti, conforme a las funcionalidades disponibles en cada momento. Rantti no garantiza la disponibilidad continua, inmediata o libre de errores de los sistemas de comunicación interna, ni asegura que los mensajes enviados sean leídos o respondidos por otros Usuarios. El uso de los canales de comunicación interna es voluntario y se realiza bajo la exclusiva responsabilidad de los Usuarios involucrados.

11.2 Comunicaciones fuera de la Plataforma
Los Usuarios reconocen y aceptan que, como resultado del contacto iniciado a través de la Plataforma, podrán decidir comunicarse entre sí por medios externos a Rantti, tales como llamadas telefónicas, aplicaciones de mensajería instantánea, correos electrónicos u otros medios de comunicación. Dichas comunicaciones externas se realizan por decisión exclusiva de los Usuarios y fuera del ámbito de control, supervisión o intervención de Rantti. Rantti no participa, ni directa ni indirectamente, en las comunicaciones, negociaciones, acuerdos o transacciones que se realicen fuera de la Plataforma, ni asume responsabilidad alguna por el contenido, alcance, resultado o consecuencias de dichas comunicaciones.

11.3 Responsabilidad sobre el contenido de las comunicaciones
Cada Usuario es el único y exclusivo responsable del contenido de las comunicaciones que mantenga con otros Usuarios, ya sea a través de los canales internos de la Plataforma o mediante medios externos. Rantti no revisa de forma previa las comunicaciones privadas entre Usuarios y no garantiza su veracidad, legalidad, exactitud o buena fe. En consecuencia, Rantti no será responsable por:
● Información falsa, engañosa o incompleta compartida entre Usuarios.

● Conductas inapropiadas, fraudulentas o ilegales.

● Incumplimientos de acuerdos alcanzados entre Usuarios.

● Daños, pérdidas o perjuicios derivados de las comunicaciones, negociaciones o
interacciones entre Usuarios.

El Usuario acepta que cualquier comunicación o interacción con otros Usuarios se realiza bajo su propio riesgo.

11.4 Recomendaciones de seguridad
Rantti recomienda a los Usuarios actuar con prudencia y sentido común en sus comunicaciones, incluyendo:
● No compartir información personal o financiera sensible.

● Verificar la identidad y reputación del otro Usuario.

● Documentar los acuerdos alcanzados de manera clara.

● Desconfiar de solicitudes inusuales, urgentes o poco claras.

Estas recomendaciones no constituyen garantía ni asesoramiento legal, financiero o comercial.

11.5 Reporte de conductas indebidas
Los Usuarios podrán reportar a Rantti cualquier comportamiento que consideren sospechoso, fraudulento o contrario a estos Términos y Condiciones, utilizando los canales habilitados en la Plataforma. Rantti podrá evaluar dichos reportes y, de considerarlo pertinente, adoptar medidas conforme a la Sección de Moderación y Control de Contenido, sin que ello implique obligación de intervenir o resolver conflictos entre Usuarios.

11.6 Limitación de responsabilidad
Rantti no será responsable por daños directos, indirectos, incidentales o consecuenciales derivados de:
● Comunicaciones entre Usuarios.

● Negociaciones o acuerdos celebrados entre Usuarios.

● Uso indebido de información compartida voluntariamente por los Usuarios.

El Usuario acepta que cualquier interacción con otros Usuarios se realiza bajo su propio riesgo.
12. Limitación de responsabilidad general
12.1 Rol de Rantti como intermediario
El Usuario reconoce y acepta que Rantti actúa únicamente como una plataforma tecnológica que facilita la publicación de ofertas y demandas de productos, así como el contacto entre Usuarios. Rantti no es propietario, vendedor, comprador, distribuidor, intermediario comercial, agente, representante ni garante de los productos ofrecidos o solicitados por los Usuarios, ni participa en las transacciones que puedan derivarse de dichas publicaciones.

12.2 Exclusión de responsabilidad sobre productos y transacciones
Rantti no asume responsabilidad alguna respecto de:
● La existencia, calidad, estado, legalidad, seguridad o idoneidad de los productos
ofrecidos o solicitados.

● La veracidad, exactitud o integridad de la información contenida en las Publicaciones.

● El cumplimiento o incumplimiento de acuerdos entre Usuarios.

● Los envíos, entregas, devoluciones, garantías o reembolsos.

● Pagos realizados entre Usuarios fuera de la Plataforma.

Toda transacción que se realice como consecuencia del uso de la Plataforma es responsabilidad exclusiva de los Usuarios involucrados.

12.3 Disponibilidad y funcionamiento de la Plataforma
Rantti no garantiza que la Plataforma funcione de manera ininterrumpida, segura o libre de errores, ni que esté disponible en todo momento. Rantti podrá realizar mantenimientos, actualizaciones, modificaciones o suspensiones temporales de la Plataforma, sin que ello genere derecho a indemnización alguna para los Usuarios.

12.4 Seguridad y riesgos tecnológicos
El Usuario reconoce que el uso de plataformas digitales conlleva riesgos inherentes, incluyendo, pero no limitándose a, fallas técnicas, interrupciones del servicio, accesos no autorizados o pérdida de información. Rantti adopta medidas razonables de seguridad, pero no garantiza la invulnerabilidad absoluta de sus sistemas y no será responsable por daños derivados de eventos fuera de su control razonable.

12.5 Daños excluidos
En la máxima medida permitida por la legislación aplicable, Rantti no será responsable por daños directos, indirectos, incidentales, especiales, consecuenciales o punitivos, incluyendo, sin limitación:
● Pérdida de ingresos, ganancias o oportunidades comerciales.

● Daños reputacionales.

● Pérdida de datos.

● Conflictos o disputas entre Usuarios.

12.6 Alcance legal de la limitación
Las limitaciones de responsabilidad establecidas en esta sección se aplican incluso cuando Rantti haya sido advertido de la posibilidad de dichos daños y constituyen una condición esencial para el uso de la Plataforma. Nada en estos Términos y Condiciones excluye o limita responsabilidades que no puedan ser legalmente excluidas conforme a la legislación peruana aplicable.

13. Suspensión, cancelación y cierre de cuentas
13.1 Facultades de Rantti
Rantti se reserva el derecho de suspender, restringir, cancelar o cerrar, de forma temporal o definitiva, las cuentas de los Usuarios, así como limitar su acceso a la Plataforma o a determinadas funcionalidades, cuando lo considere necesario para proteger el correcto funcionamiento de la Plataforma, a otros Usuarios o a Rantti. Estas medidas podrán adoptarse con o sin previo aviso, dependiendo de la gravedad del caso.

13.2 Causales de suspensión o cancelación
Sin perjuicio de otras medidas, Rantti podrá suspender o cancelar una cuenta cuando el Usuario:
● Incumpla estos Términos y Condiciones.

● Publique contenido falso, engañoso, ilícito o prohibido.

● Realice actividades fraudulentas, abusivas o que generen riesgos para otros Usuarios.

● Utilice la Plataforma con fines ilegales o no autorizados.

● Intente eludir sistemas de moderación, seguridad o control de Rantti.

● Afecte la reputación, seguridad o estabilidad de la Plataforma.

La enumeración anterior es enunciativa y no limitativa.

13.3 Casos graves
En casos considerados graves, incluyendo pero no limitándose a fraude, actividades ilegales, suplantación de identidad o riesgos para terceros, Rantti podrá:
● Cancelar la cuenta de manera inmediata.

● Eliminar publicaciones y contenidos asociados.

● Restringir de forma permanente el acceso del Usuario a la Plataforma.

13.4 Efectos de la suspensión o cancelación
La suspensión o cancelación de una cuenta implica:
● La pérdida de acceso a la cuenta y a las funcionalidades asociadas.

● La imposibilidad de crear nuevas cuentas, cuando así lo determine Rantti.

● La eliminación o desactivación de publicaciones activas.

Los pagos realizados por servicios pagos o Planes Destacados no serán reembolsables, incluso en caso de suspensión o cancelación de la cuenta.

13.5 Cierre voluntario de cuenta
El Usuario podrá solicitar el cierre de su cuenta conforme a los mecanismos habilitados por Rantti. El cierre voluntario de la cuenta no genera derecho a reembolso alguno por servicios contratados y no exime al Usuario de responsabilidades derivadas de usos previos de la Plataforma.

13.6 Conservación de información
Rantti podrá conservar determinada información del Usuario, incluso tras el cierre de la cuenta, cuando sea necesario para:
● Cumplir obligaciones legales.

● Resolver disputas.

● Prevenir fraudes.

● Proteger derechos e intereses de Rantti o de terceros.
14. Propiedad intelectual
14.1 Titularidad de la Plataforma
Todos los derechos de propiedad intelectual e industrial relacionados con la Plataforma Rantti, incluyendo, de manera enunciativa mas no limitativa, su nombre, marca, logotipo, diseño, estructura, software, código fuente, funcionalidades, bases de datos, textos, gráficos, imágenes y demás contenidos propios, son de titularidad exclusiva de Rantti o de terceros que hayan autorizado su uso. El uso de la Plataforma por parte del Usuario no implica la cesión, licencia ni transferencia de derecho alguno sobre dichos elementos, salvo lo expresamente permitido en estos Términos y Condiciones.

14.2 Uso permitido del contenido de Rantti
El Usuario podrá utilizar la Plataforma y sus contenidos únicamente para fines personales y conforme a estos Términos y Condiciones. Queda expresamente prohibido:
● Copiar, reproducir, modificar, distribuir o explotar comercialmente el contenido de la
Plataforma.

● Realizar ingeniería inversa, descompilación o cualquier otra forma de extracción del
software.

● Utilizar la marca o signos distintivos de Rantti sin autorización previa y expresa.

14.3 Contenido generado por los Usuarios
El Usuario conserva la titularidad de los derechos de propiedad intelectual sobre el contenido que publique en la Plataforma, incluyendo textos, imágenes, descripciones y cualquier otro material. Al publicar contenido en Rantti, el Usuario otorga a Rantti una licencia no exclusiva, gratuita, mundial y por el tiempo necesario para:
● Alojar, reproducir, mostrar, adaptar y comunicar dicho contenido dentro de la
Plataforma.

● Utilizar el contenido con fines operativos, promocionales y de mejora del servicio.

Esta licencia no implica cesión de derechos a terceros fuera del ámbito de la Plataforma.

14.4 Responsabilidad sobre derechos de terceros
El Usuario declara y garantiza que:
● Es titular de los derechos sobre el contenido que publica o cuenta con las
autorizaciones necesarias.

● El contenido no infringe derechos de propiedad intelectual, industrial o derechos de
imagen de terceros.

Rantti no será responsable por reclamaciones de terceros derivadas del contenido publicado por los Usuarios.

14.5 Infracciones y medidas
Ante una presunta infracción de derechos de propiedad intelectual, Rantti podrá:
● Retirar o desactivar el contenido presuntamente infractor.

● Suspender o cancelar la cuenta del Usuario responsable.

● Adoptar otras medidas conforme a estos Términos y Condiciones y a la legislación
aplicable.
15. Protección de datos y privacidad
15.1 Tratamiento de datos personales
Rantti recopila y trata los datos personales de los Usuarios con la finalidad de permitir el registro, uso y correcto funcionamiento de la Plataforma, así como para la gestión de cuentas, publicaciones, comunicaciones internas y servicios ofrecidos. El tratamiento de los datos personales se realiza conforme a la legislación peruana vigente en materia de protección de datos personales.

15.2 Datos recopilados
Rantti podrá recopilar, entre otros, los siguientes datos:
● Información de identificación proporcionada por el Usuario al registrarse.

● Datos de contacto.

● Información relacionada con el uso de la Plataforma.

● Contenido de las comunicaciones internas entre Usuarios.

● Información técnica necesaria para el funcionamiento y seguridad de la Plataforma.

El Usuario garantiza que los datos proporcionados son veraces, actualizados y de su titularidad.

15.3 Finalidad del uso de los datos
Los datos personales serán utilizados para:
● Permitir el acceso y uso de la Plataforma.

● Gestionar publicaciones y Planes Destacados.

● Facilitar comunicaciones internas entre Usuarios.

● Mejorar la experiencia y seguridad de la Plataforma.

● Cumplir obligaciones legales y regulatorias.

Rantti no comercializa ni vende los datos personales de los Usuarios.

15.4 Conservación de la información
Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades para las que fueron recopilados, así como para atender obligaciones legales, resolver disputas o prevenir fraudes. Incluso tras el cierre de la cuenta, Rantti podrá conservar cierta información conforme a la ley aplicable.

15.5 Derechos del Usuario
El Usuario podrá ejercer los derechos de acceso, rectificación, cancelación y oposición (derechos ARCO), conforme a la normativa vigente, a través de los canales que Rantti habilite para tal efecto.

15.6 Medidas de seguridad
Rantti adopta medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida, alteración o uso indebido. No obstante, el Usuario reconoce que ningún sistema es completamente seguro y que el uso de plataformas digitales conlleva riesgos inherentes.

15.7 Política de privacidad
El tratamiento de datos personales se rige además por la Política de Privacidad de Rantti, la cual forma parte integrante de estos Términos y Condiciones.
16. Modificaciones de los Términos y Condiciones
Rantti se reserva el derecho de modificar, actualizar o sustituir, total o parcialmente, los presentes Términos y Condiciones en cualquier momento, cuando lo considere necesario para reflejar cambios legales, técnicos, operativos o comerciales de la Plataforma. Las modificaciones entrarán en vigor desde su publicación en la Plataforma, salvo que se indique expresamente una fecha distinta. El uso continuado de la Plataforma por parte del Usuario después de la publicación de las modificaciones implica la aceptación expresa de los nuevos Términos y Condiciones. Rantti podrá, pero no estará obligada a, notificar a los Usuarios sobre cambios relevantes a través de la Plataforma o por otros medios disponibles.
17. Ley aplicable y jurisdicción
Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes de la República del Perú. Cualquier controversia, conflicto o reclamación que se derive de la interpretación, ejecución, validez o uso de la Plataforma Rantti, y que no pueda resolverse de manera amistosa, será sometida a la competencia exclusiva de los jueces y tribunales de la ciudad de Lima, Perú, salvo que la normativa aplicable disponga de manera imperativa otra jurisdicción.
18. Duración y terminación
18.1 Vigencia de los Términos y Condiciones
Los presentes Términos y Condiciones entran en vigor desde el momento en que el Usuario accede, se registra o utiliza la Plataforma Rantti, y permanecerán vigentes mientras el Usuario mantenga una cuenta activa o haga uso de la Plataforma.

18.2 Terminación por parte del Usuario
El Usuario podrá dejar de utilizar la Plataforma y solicitar el cierre de su cuenta en cualquier momento, conforme a los mecanismos habilitados por Rantti. La terminación voluntaria de la cuenta por parte del Usuario:
● No genera derecho a reembolso alguno por servicios pagos contratados.

● No exime al Usuario de responsabilidades derivadas de usos previos de la Plataforma.

● No afecta la validez de obligaciones asumidas con otros Usuarios.

18.3 Terminación por parte de Rantti
Rantti podrá terminar la relación con el Usuario, suspender o cancelar su cuenta conforme a lo establecido en la Sección de Suspensión, Cancelación y Cierre de Cuentas, cuando exista incumplimiento de estos Términos y Condiciones o por razones operativas, legales o de seguridad.

18.4 Efectos de la terminación
La terminación del acceso a la Plataforma implica:
● La pérdida del derecho a utilizar la cuenta y sus funcionalidades.

● La desactivación o eliminación de publicaciones activas.

● La conservación de información conforme a la legislación aplicable y a lo dispuesto en
la Política de Privacidad.

Las disposiciones que, por su naturaleza, deban sobrevivir a la terminación (incluyendo limitación de responsabilidad, propiedad intelectual y ley aplicable) continuarán vigentes.
19. Contacto
Para cualquier consulta, reclamo, solicitud o comunicación relacionada con la Plataforma, los Usuarios podrán contactar a Rantti exclusivamente a través de los canales oficiales que la Plataforma ponga a disposición. Rantti no se responsabiliza por comunicaciones realizadas a través de medios no oficiales, ni por mensajes enviados a terceros que se hagan pasar por representantes de la Plataforma. Los Usuarios reconocen que únicamente las comunicaciones realizadas mediante los canales oficiales habilitados por Rantti serán consideradas válidas a efectos legales y administrativos.
20. Disposiciones finales
20.1 Nulidad parcial
En caso de que alguna disposición de los presentes Términos y Condiciones sea declarada nula, inválida o inaplicable por autoridad competente, dicha disposición se considerará separable y no afectará la validez, legalidad ni aplicabilidad del resto de las disposiciones, las cuales permanecerán plenamente vigentes.

20.2 Integridad del acuerdo
Los presentes Términos y Condiciones, junto con la Política de Privacidad y cualquier otro documento referido expresamente, constituyen el acuerdo íntegro entre el Usuario y Rantti respecto al uso de la Plataforma, y sustituyen cualquier acuerdo, comunicación o entendimiento previo, ya sea oral o escrito.

20.3 Idioma oficial
Los presentes Términos y Condiciones se encuentran redactados en idioma español, el cual será el idioma oficial y prevalente para su interpretación. En caso de existir traducciones a otros idiomas, estas tendrán carácter meramente informativo.
`;

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
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl  font-bold text-gray-900 mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-gray-500  mb-8">
          Última actualización: 18 de enero de 2025
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          {/* 1. Introducción */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introducción y aceptación de los Términos
            </h2>

            <h4 className="font-semibold text-gray-900 mb-2">1.1 Alcance del documento</h4>
            <p className="text-gray-600 leading-relaxed">
              Los presentes <strong>Términos y Condiciones</strong> regulan el acceso, registro y uso de la
              plataforma digital <strong>Rantti</strong> (en adelante, “Rantti” o la “Plataforma”), la cual
              funciona como un <strong>marketplace</strong> que conecta compradores y vendedores para la
              publicación y visualización de productos ofrecidos por terceros.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti actúa únicamente como intermediario tecnológico, proporcionando un espacio digital
              donde los usuarios pueden publicar productos y contactarse entre sí. Rantti no es
              propietario, vendedor, distribuidor ni proveedor de los productos publicados en la
              Plataforma.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              El uso de Rantti está sujeto a la aceptación plena y sin reservas de estos Términos y
              Condiciones, así como de las políticas complementarias que puedan ser publicadas por Rantti.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">
              1.2 Aceptación expresa al registrarse y usar la plataforma
            </h4>
            <p className="text-gray-600 leading-relaxed">
              El acceso, registro y uso de Rantti implica que el usuario ha leído, entendido y aceptado
              expresamente los presentes Términos y Condiciones.
            </p>

            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Al crear una cuenta en la Plataforma.</li>
              <li>Al publicar, visualizar o interactuar con publicaciones.</li>
              <li>Al utilizar cualquier funcionalidad ofrecida por Rantti.</li>
              <li>Al contratar servicios pagos dentro de la Plataforma.</li>
            </ul>

            <p className="text-gray-600 leading-relaxed mt-3">
              Si el usuario no está de acuerdo con estos Términos y Condiciones, deberá abstenerse de
              registrarse o utilizar la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">
              1.3 Carácter vinculante de los Términos y Condiciones
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Estos Términos y Condiciones constituyen un acuerdo legal vinculante entre el usuario y
              Rantti, y regulan la relación entre ambas partes durante el uso de la Plataforma.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              El usuario reconoce que estos Términos tienen el mismo valor legal que un contrato firmado
              de manera física, y acepta cumplirlos en su totalidad mientras haga uso de Rantti.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              El incumplimiento de cualquiera de las disposiciones aquí establecidas podrá dar lugar a la
              suspensión o cancelación de la cuenta del usuario, sin perjuicio de otras acciones que
              pudieran corresponder conforme a la legislación aplicable.
            </p>
          </section>

          {/* 2. Definiciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definiciones</h2>

            <h4 className="font-semibold text-gray-900 mb-2">2.1 Rantti</h4>
            <p className="text-gray-600 leading-relaxed">
              “Rantti” se refiere a la plataforma digital de tipo marketplace, incluyendo su sitio web y
              cualesquiera aplicaciones móviles que puedan desarrollarse en el futuro, dominios,
              subdominios, funcionalidades y servicios asociados, cuya finalidad es conectar a
              compradores y vendedores para la publicación y visualización de productos ofrecidos por
              terceros.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti actúa exclusivamente como intermediario tecnológico y no participa como parte en las
              transacciones que se realicen entre los usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">2.2 Usuario</h4>
            <p className="text-gray-600 leading-relaxed">
              “Usuario” es toda persona natural mayor de edad que accede, navega, se registra o utiliza
              la Plataforma, ya sea de forma ocasional o mediante una cuenta registrada.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">2.3 Comprador y Vendedor</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Comprador:</strong> Usuario que busca, visualiza, contacta o adquiere productos
                ofrecidos por otros usuarios.
              </li>
              <li>
                <strong>Vendedor:</strong> Usuario que publica productos, siendo responsable de la
                información, del producto y del cumplimiento normativo.
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti no garantiza la calidad, existencia, legalidad ni entrega de los productos ofrecidos
              por los Vendedores.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">2.4 Publicación</h4>
            <p className="text-gray-600 leading-relaxed">
              “Publicación” es todo contenido creado, cargado o difundido por un Usuario dentro de la Plataforma, incluyendo, de manera enunciativa mas no limitativa, la oferta o demanda de productos, descripciones, imágenes, precios, solicitudes de compra, textos, mensajes y cualquier otra información asociada a productos o intenciones de compra o venta.
              <br />
              Cada Publicación es de exclusiva responsabilidad del Usuario que la realiza.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">2.5 Planes Destacados</h4>
            <p className="text-gray-600 leading-relaxed">
              <strong>“Planes Destacados”</strong> son los servicios pagos ofrecidos por Rantti que permiten a los Usuarios otorgar mayor visibilidad a sus Publicaciones dentro de la Plataforma, por un período de tiempo determinado y conforme a las condiciones específicas de cada plan.
              <br />
              La contratación de Planes Destacados <strong>no garantiza ventas, contactos ni resultados comerciales,</strong> ya que estos dependen de factores ajenos a Rantti.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">2.6 Plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              <strong>“Plataforma” </strong> se refiere al entorno digital administrado por Rantti, a través del cual los Usuarios pueden registrarse, publicar productos, interactuar entre sí, comunicarse mediante herramientas internas y acceder a los servicios ofrecidos por Rantti.
            </p>
          </section>

          {/* 3. Naturaleza del servicio de Rantti */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Naturaleza del servicio de Rantti</h2>

            <h4 className="font-semibold text-gray-900 mb-2">3.1 Rantti como plataforma intermediaria</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti es una plataforma digital de tipo marketplace que actúa <strong>exclusivamente como intermediario tecnológico,</strong> poniendo a disposición de los Usuarios un espacio digital para la <strong>publicación de ofertas y demandas de productos,</strong> así como para la comunicación directa entre compradores y vendedores.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti <strong>no participa como parte</strong> en las negociaciones, acuerdos o transacciones que se realicen entre los Usuarios, ni interviene en la determinación de precios, condiciones de venta, entrega, pago o devolución de los productos.

            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">3.2 Ausencia de relación contractual entre Rantti y los Usuarios</h4>
            <p className="text-gray-600 leading-relaxed">
              El uso de la Plataforma no crea, bajo ninguna circunstancia, una relación laboral, societaria, de agencia, representación, franquicia o asociación entre Rantti y los Usuarios.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Cada Usuario actúa de manera <strong>independiente</strong>, ya sea a título personal o comercial, y es el único responsable de las obligaciones legales, fiscales y comerciales que pudieran derivarse de sus actividades dentro o fuera de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">3.3 Rantti no es vendedor ni comprador</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti <strong>no es propietario, vendedor, distribuidor, comprador ni revendedor</strong> de los productos publicados en la Plataforma, ni asume responsabilidad alguna sobre la existencia, calidad, legalidad, seguridad o disponibilidad de dichos productos.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Asimismo, Rantti no garantiza que las publicaciones de oferta o demanda generen contactos, negociaciones o transacciones efectivas entre los Usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">3.4 Transacciones y acuerdos entre Usuarios</h4>
            <p className="text-gray-600 leading-relaxed">
              Cualquier negociación, acuerdo o transacción que pudiera surgir a partir de una Publicación es realizada <strong>única y exclusivamente entre los Usuarios involucrados,</strong> bajo su propia responsabilidad.
              <br />
              Rantti no valida ni supervisa las condiciones acordadas entre compradores y vendedores, ni interviene en disputas, reclamos, devoluciones, incumplimientos o conflictos que puedan surgir entre ellos.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">3.5 Limitación de responsabilidad por el uso de la Plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti no asume responsabilidad alguna por los daños, pérdidas o perjuicios que pudieran derivarse del uso de la Plataforma, incluyendo aquellos relacionados con publicaciones de oferta o demanda, comunicaciones entre Usuarios o acuerdos alcanzados fuera o dentro de la Plataforma.
              <br />
              El Usuario reconoce y acepta que el uso de Rantti se realiza <strong>bajo su propia responsabilidad,</strong> y que Rantti no garantiza el correcto comportamiento, solvencia o cumplimiento de los demás Usuarios.
            </p>
          </section>

          {/* 4. Requisitos para el uso de la Plataforma */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Requisitos para el uso de la Plataforma</h2>

            <h4 className="font-semibold text-gray-900 mb-2">4.1 Edad minima y capacidad legal</h4>
            <p className="text-gray-600 leading-relaxed">
              El uso de la Plataforma está permitido únicamente a personas <strong>mayores de dieciocho (18)</strong> años que cuenten con la capacidad legal necesaria para aceptar estos Términos y Condiciones y para celebrar acuerdos jurídicamente válidos.
              <br />
              Al registrarse o utilizar Rantti, el Usuario declara y garantiza que cumple con el requisito de edad mínima y que tiene plena capacidad legal para obligarse conforme a estos Términos.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">4.2 Uso conforme a la ley</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario se compromete a utilizar la Plataforma de manera <strong>lícita</strong>, responsable y conforme a la legislación vigente en la República del Perú, así como a las disposiciones de estos Términos y Condiciones.
              <br />
              Queda estrictamente prohibido el uso de Rantti para fines ilegales, fraudulentos o contrarios al orden público, la moral o las buenas costumbres.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">4.3 Uso permitido de la Plataforma</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario podrá utilizar la Plataforma exclusivamente para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Publicar ofertas o demandas de productos permitidos por la ley.</li>
              <li>Buscar, visualizar e interactuar con Publicaciones.</li>
              <li>Buscar, visualizar e interactuar con Publicaciones.</li>
              <li>Contratar servicios ofrecidos por Rantti, incluyendo Planes Destacados.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Cualquier uso distinto a los señalados podrá ser considerado indebido y dar lugar a las medidas previstas en estos Términos.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">4.4 Usos prohibidos</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Sin perjuicio de otras prohibiciones establecidas en estos Términos, el Usuario se compromete a <strong>no utilizar</strong> la Plataforma para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Publicar, ofrecer o solicitar productos o actividades ilegales.</li>
              <li>Proporcionar información falsa, engañosa o inexacta.</li>
              <li>Suplantar la identidad de otras personas o entidades.</li>
              <li>Realizar prácticas fraudulentas, estafas o engaños.</li>
              <li>Utilizar la Plataforma con fines distintos a aquellos para los que fue creada.</li>
              <li>Interferir o intentar interferir con el funcionamiento normal de la Plataforma.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">4.5 Consecuencias del incumplimiento</h4>
            <p className="text-gray-600 leading-relaxed">
              El incumplimiento de cualquiera de los requisitos establecidos en esta sección podrá dar lugar, a criterio de Rantti, a la <strong>suspensión temporal o cancelación definitiva</strong> de la cuenta del Usuario, sin necesidad de previo aviso y sin que ello genere derecho a indemnización alguna.
            </p>
          </section>

          {/* 5. Requisitos para el uso de la Plataforma */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Registro de usuarios y cuentas</h2>

            <h4 className="font-semibold text-gray-900 mb-2">5.1 Registro en la plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              El acceso a determinadas funcionalidades de la Plataforma requiere que el Usuario se registre y cree una cuenta personal en Rantti.
              <br />
              El registro es <strong>libre y gratuito</strong>, y el Usuario se compromete a proporcionar información <strong>veraz, actualizada y completa</strong> durante el proceso de registro y en el uso posterior de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">5.2 Datos del Usuario</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario es el único responsable de la información que proporciona a Rantti, incluyendo datos personales, datos de contacto y cualquier otra información asociada a su cuenta.
              <br />
              Rantti no se responsabiliza por la exactitud, veracidad o legalidad de los datos ingresados por los Usuarios, ni por los perjuicios que puedan derivarse del uso de información incorrecta o falsa.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">5.3 Responsabilidad sobre la cuenta</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario podrá utilizar un <strong>alias o nombre visible</strong> dentro de la Plataforma, el cual podrá corresponder a su nombre personal, nombre comercial o denominación con la que desee identificarse frente a otros Usuarios.
              <br />
              El uso de un alias no exime al Usuario de su responsabilidad legal, ni implica que Rantti verifique, avale o certifique la identidad, actividad comercial o existencia legal del Usuario.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">5.4 Responsabilidad sobre la cuenta</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario es <strong>exclusivamente responsable</strong> de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que se realicen desde su cuenta.
              <br />
              Cualquier acción realizada a través de la cuenta del Usuario se considerará efectuada por el propio Usuario, quien asumirá todas las consecuencias derivadas de su uso.
              <br />
              El Usuario se compromete a notificar de inmediato a Rantti ante cualquier uso no autorizado de su cuenta o vulneración de seguridad.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">5.5 Uso personal de la cuenta</h4>
            <p className="text-gray-600 leading-relaxed">
              La cuenta creada en la Plataforma es <strong>personal e intransferible</strong>. El Usuario no podrá ceder, vender, prestar o transferir su cuenta a terceros sin autorización expresa de Rantti.
              <br />
              Rantti se reserva el derecho de suspender o cancelar cuentas que sean utilizadas por terceros o de manera contraria a estos Términos y Condiciones.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">5.6 Suspensión o cancelación de cuentas</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti podrá suspender o cancelar cuentas de Usuario en caso de:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Incumplimiento de estos Términos y Condiciones.</li>
              <li>Uso indebido o fraudulento de la Plataforma.</li>
              <li>Provisión de información falsa o engañosa.</li>
              <li>Actividades ilegales o contrarias a la ley.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Dicha suspensión o cancelación podrá realizarse <strong>sin previo aviso</strong> en casos graves, sin que ello genere derecho a compensación alguna.
            </p>
          </section>

          {/* 6. Obligaciones del Usuario */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Obligaciones del Usuario</h2>

            <h4 className="font-semibold text-gray-900 mb-2">6.1 Cumplimiento de los Términos y la ley</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario se compromete a utilizar la Plataforma de conformidad con los presentes Términos y Condiciones, así como con la legislación vigente en la República del Perú.
              <br />
              El Usuario es responsable de conocer y cumplir las normas legales que resulten aplicables a las actividades que realice dentro y fuera de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">6.2 Obligaciones generales del Usuario</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Sin perjuicio de otras obligaciones establecidas en estos Términos, el Usuario se compromete a:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Proporcionar información veraz, completa y actualizada.</li>
              <li>Utilizar la Plataforma de manera responsable y conforme a su finalidad.</li>
              <li>Abstenerse de realizar conductas que puedan afectar el funcionamiento de la Plataforma o la experiencia de otros Usuarios.</li>
              <li>Respetar los derechos de terceros, incluyendo derechos de propiedad intelectual, privacidad y protección de datos.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">6.3 Obligaciones específicas del Vendedor</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario que actúe como Vendedor se obliga a:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Publicar información clara, veraz y precisa sobre los productos ofrecidos.</li>
              <li>Garantizar que los productos ofrecidos sean lícitos y cumplan con la normativa aplicable.</li>
              <li>Asumir total responsabilidad sobre la existencia, calidad, estado, legalidad y entrega de los productos.</li>
              <li>Cumplir con las condiciones ofrecidas al Comprador.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti no asume responsabilidad alguna por los productos ofrecidos por los Vendedores.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">6.4 Obligaciones específicas del Comprador</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario que actúe como Comprador se obliga a:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Utilizar la Plataforma de buena fe.</li>
              <li>Evaluar cuidadosamente las Publicaciones antes de contactar o acordar con un Vendedor.</li>
              <li>Asumir responsabilidad por las solicitudes de productos que publique.</li>
              <li>Cumplir con los acuerdos alcanzados con los Vendedores.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">6.5 Prohibición de conductas indebidas</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario se compromete a no realizar, directa o indirectamente, conductas que puedan considerarse indebidas, incluyendo, de manera enunciativa mas no limitativa:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Publicar contenido ilegal, engañoso o fraudulento.</li>
              <li>Utilizar la Plataforma para estafas o intentos de fraude.</li>
              <li>Manipular, interferir o dañar la Plataforma o sus sistemas.</li>
              <li>Utilizar la Plataforma para fines distintos a los permitidos.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">6.6 Responsabilidad por el uso de la Plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario reconoce y acepta que es el único responsable por el uso que haga de la Plataforma, así como por las consecuencias que se deriven de sus acciones, publicaciones, comunicaciones y acuerdos con otros Usuarios.
              <br />
              Rantti no será responsable por el incumplimiento de las obligaciones del Usuario ni por los daños o perjuicios derivados de su conducta.
            </p>
          </section>

          {/* 7. Publicaciones y contenido */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Publicaciones y contenido</h2>

            <h4 className="font-semibold text-gray-900 mb-2">7.1 Responsabilidad sobre las Publicaciones</h4>
            <p className="text-gray-600 leading-relaxed">
              Toda Publicación realizada en la Plataforma es de <strong>exclusiva responsabilidad del Usuario</strong> que la crea, ya sea que se trate de una oferta o de una demanda de productos.
              <br />
              El Usuario garantiza que la información contenida en sus Publicaciones es veraz, precisa y conforme a la legislación vigente, y asume plena responsabilidad por cualquier consecuencia derivada de su contenido.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">7.2 Contenido permitido</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Los Usuarios podrán publicar contenido relacionado únicamente con:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>La oferta de productos lícitos.</li>
              <li>La demanda o solicitud de productos lícitos.</li>
              <li>Información necesaria para facilitar el contacto y la comunicación entre Usuarios.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Las Publicaciones deberán respetar la ley, el orden público, la moral y las buenas costumbres.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">7.3 Contenido prohibido</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Queda estrictamente prohibido publicar contenido que:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Sea ilegal o promueva actividades ilícitas.</li>
              <li>Infrinja derechos de terceros.</li>
              <li>Sea falso, engañoso o fraudulento.</li>
              <li>Contenga información ofensiva, violenta, discriminatoria o contraria al orden público.</li>
              <li>Tenga como finalidad engañar o perjudicar a otros Usuarios.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti se reserva el derecho de determinar, a su exclusivo criterio, qué contenido se considera prohibido.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">7.4 Revisión y moderación de Publicaciones</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti no realiza una revisión previa obligatoria de las Publicaciones. No obstante, podrá revisar, supervisar y moderar el contenido <strong>con posterioridad a su publicación</strong>, de manera manual o automatizada.
              <br />
              Rantti podrá eliminar, modificar, suspender o bloquear cualquier Publicación que, a su criterio, incumpla estos Términos y Condiciones, sin necesidad de previo aviso.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">7.5 Eliminación de Publicaciones</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti podrá eliminar Publicaciones en cualquier momento, incluso aquellas que hayan sido destacadas mediante Planes Destacados, sin que ello genere derecho a reembolso o indemnización alguna para el Usuario.
              <br />
              La eliminación de una Publicación no implica responsabilidad alguna para Rantti.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">7.6 Derechos sobre el contenido</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario otorga a Rantti una autorización gratuita, no exclusiva y por tiempo indefinido para utilizar, reproducir, mostrar y difundir las Publicaciones dentro de la Plataforma y en canales asociados a su funcionamiento.
              <br />
              Esta autorización tiene como única finalidad el correcto funcionamiento y promoción de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">7.7 Exoneración de responsabilidad</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti no garantiza la veracidad, calidad, legalidad ni exactitud de las Publicaciones realizadas por los Usuarios, ni asume responsabilidad por los daños o perjuicios que pudieran derivarse del contenido publicado.
              <br />
              El Usuario reconoce que utiliza la información contenida en las Publicaciones <strong>bajo su propia responsabilidad</strong>.
            </p>
          </section>

          {/* 8. Moderación y control de contenido */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Moderación y control de contenido</h2>

            <h4 className="font-semibold text-gray-900 mb-2">8.1 Facultades de moderación</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti se reserva el derecho, mas no la obligación, de <strong>supervisar, revisar, moderar y controlar</strong> las Publicaciones, comunicaciones y demás contenidos generados por los Usuarios dentro de la Plataforma.
              <br />
              La moderación podrá realizarse de forma manual, automatizada o mixta, y tendrá como finalidad proteger el correcto funcionamiento de la Plataforma, la seguridad de los Usuarios y el cumplimiento de estos Términos y Condiciones.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">8.2 Criterios de moderación</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti podrá adoptar medidas de moderación cuando detecte, o razonablemente considere, que un contenido:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Incumple estos Términos y Condiciones.</li>
              <li>Sea contrario a la ley, al orden público o a las buenas costumbres.</li>
              <li>Pueda generar riesgos legales, técnicos o reputacionales para la Plataforma o para terceros.</li>
              <li>Afecte negativamente la experiencia de otros Usuarios.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              La aplicación de estos criterios queda a exclusivo criterio de Rantti.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">8.3 Medidas aplicables</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Como resultado de los procesos de moderación, Rantti podrá, entre otras medidas:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Eliminar o modificar Publicaciones.</li>
              <li>Suspender o bloquear temporalmente contenido.</li>
              <li>Limitar funcionalidades de la cuenta.</li>
              <li>Suspender o cancelar cuentas de Usuario.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Dichas medidas podrán adoptarse <strong>sin previo aviso</strong>, especialmente en casos graves o reiterados.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">8.4 Ausencia de obligación de supervisión permanente</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario reconoce y acepta que Rantti <strong>no está obligado a realizar una supervisión continua o permanente</strong> del contenido publicado por los Usuarios.
              <br />
              La ausencia de intervención por parte de Rantti respecto de una Publicación o conducta específica no implica aprobación, validación ni renuncia a ejercer acciones futuras.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">8.5 Denuncia de contenidos</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti podrá habilitar mecanismos para que los Usuarios reporten contenidos que consideren contrarios a estos Términos o a la ley.
              <br />
              La recepción de una denuncia no implica obligación alguna de eliminar el contenido reportado, quedando la decisión final sujeta al criterio de Rantti.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">8.6 Exoneración de responsabilidad</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti no será responsable por los daños o perjuicios que pudieran derivarse de las decisiones de moderación adoptadas conforme a esta sección, ni por la permanencia o eliminación de contenidos publicados por los Usuarios.
            </p>
          </section>

          {/* 9. Planes destacados y servicios pagos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Planes destacados y servicios pagos</h2>

            <h4 className="font-semibold text-gray-900 mb-2">9.1 Servicios pagos ofrecidos por Rantti</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti ofrece a los Usuarios determinados <strong>servicios pagos</strong>, entre los cuales se incluyen los <strong>Planes Destacados</strong>, cuya finalidad es otorgar <strong>mayor visibilidad</strong> a las Publicaciones dentro de la Plataforma, conforme a las condiciones de cada plan.
              <br />
              La contratación de servicios pagos es opcional y no condiciona el uso básico de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">9.2 Descripción de los Planes Destacados</h4>
            <p className="text-gray-600 leading-relaxed">
              Los Planes Destacados permiten resaltar Publicaciones por un período de tiempo determinado, mejorando su ubicación o exposición dentro de la Plataforma.
              <br />
              Las características específicas, duración y precios de cada Plan Destacado serán informados de manera clara al Usuario antes de su contratación.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">9.3 Ausencia de garantía de resultados</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario reconoce y acepta que la contratación de Planes Destacados <strong>no garantiza ventas, contactos, negociaciones ni resultados comerciales</strong>, ya que estos dependen de factores ajenos a Rantti, tales como la demanda del mercado, el precio del producto, la calidad de la Publicación y la conducta de otros Usuarios.
              <br />
              Rantti no asume obligación alguna de resultado respecto de los Planes Destacados.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">9.4 Pago de los servicios</h4>
            <p className="text-gray-600 leading-relaxed">
              El pago de los Planes Destacados y demás servicios pagos ofrecidos por Rantti es de <strong>carácter único</strong>, conforme a los precios y condiciones vigentes al momento de la contratación.
              <br />
              Rantti no cobra comisiones por las transacciones que puedan realizarse entre Usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">9.5 Política de no reembolso</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Los pagos efectuados por la contratación de Planes Destacados <strong>no son reembolsables</strong>, incluso en los siguientes casos:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Eliminación de la Publicación por incumplimiento de estos Términos y Condiciones.</li>
              <li>Falta de resultados comerciales.</li>
              <li>Decisión del Usuario de retirar la Publicación antes del vencimiento del plan.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">9.6 Suspensión o cancelación de servicios pagos</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti se reserva el derecho de suspender o cancelar Planes Destacados asociados a Publicaciones o cuentas que incumplan estos Términos y Condiciones, sin que ello genere derecho a reembolso o indemnización alguna.
            </p>
          </section>

          {/* 10. Pagos y política de no reembolso */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Pagos y política de no reembolso</h2>

            <h4 className="font-semibold text-gray-900 mb-2">10.1 Condiciones de pago</h4>
            <p className="text-gray-600 leading-relaxed">
              Los pagos por los servicios ofrecidos por Rantti, incluyendo los Planes Destacados, deberán realizarse conforme a los precios, métodos y condiciones indicados en la Plataforma al momento de la contratación.
              <br />
              El Usuario reconoce que es su responsabilidad revisar cuidadosamente las condiciones del servicio antes de efectuar cualquier pago.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">10.2 Precios, moneda e impuestos</h4>
            <p className="text-gray-600 leading-relaxed">
              Todos los precios publicados en la Plataforma se expresan en <strong>soles peruanos (PEN)</strong> e <strong>incluyen los impuestos aplicables</strong>, de conformidad con la normativa vigente en la República del Perú.
              <br />
              Rantti se reserva el derecho de modificar los precios de sus servicios en cualquier momento, sin que ello afecte los servicios ya contratados y pagados.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">10.3 Pago único</h4>
            <p className="text-gray-600 leading-relaxed">
              Los servicios pagos ofrecidos por Rantti se contratan mediante un <strong>pago único</strong>, sin que ello implique suscripciones automáticas, cargos recurrentes ni renovaciones periódicas, salvo que se indique expresamente lo contrario en el futuro.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">10.4 Política de no reembolso</h4>
            <p className="text-gray-600 leading-relaxed">
              Todos los pagos realizados a favor de Rantti por servicios contratados son <strong>definitivos y no reembolsables</strong>, sin excepción.
              <br />
              El Usuario acepta expresamente que no tendrá derecho a reembolso, total ni parcial, incluso en los siguientes supuestos, de manera enunciativa mas no limitativa:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Falta de resultados comerciales o de ventas.</li>
              <li>Eliminación de Publicaciones por incumplimiento de estos Términos y Condiciones.</li>
              <li>Suspensión o cancelación de la cuenta del Usuario.</li>
              <li>Decisión unilateral del Usuario de dejar de utilizar la Plataforma antes del vencimiento del servicio contratado.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">10.5 Reclamaciones relacionadas con pagos</h4>
            <p className="text-gray-600 leading-relaxed">
              Cualquier consulta o reclamo relacionado con pagos deberá realizarse exclusivamente a través de los canales oficiales de contacto de Rantti.
              <br />
              La presentación de un reclamo no suspende ni modifica la aplicación de la política de no reembolso establecida en esta sección.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">10.6 Exoneración de responsabilidad</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti no será responsable por errores, fallas, retrasos o interrupciones atribuibles a terceros proveedores de servicios de pago, ni por los cargos adicionales que pudieran aplicar dichas entidades, los cuales serán de exclusiva responsabilidad del Usuario.
            </p>
          </section>

          {/* 11. Comunicaciones entre usuarios */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Comunicaciones entre usuarios</h2>

            <h4 className="font-semibold text-gray-900 mb-2">11.1 Canales de comunicación habilitados</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti pone a disposición de los Usuarios un sistema de comunicación interna dentro de la Plataforma, con el fin de facilitar el contacto entre Compradores y Vendedores en relación con las Publicaciones de oferta o demanda de productos.
              <br />
              Las comunicaciones entre Usuarios se realizan exclusivamente a través de los canales internos habilitados por Rantti, conforme a las funcionalidades disponibles en cada momento.
              <br />
              Rantti no garantiza la disponibilidad continua, inmediata o libre de errores de los sistemas de comunicación interna, ni asegura que los mensajes enviados sean leídos o respondidos por otros Usuarios.
              <br />
              El uso de los canales de comunicación interna es voluntario y se realiza bajo la exclusiva responsabilidad de los Usuarios involucrados.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">11.2 Comunicaciones fuera de la Plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              Los Usuarios reconocen y aceptan que, como resultado del contacto iniciado a través de la Plataforma, podrán decidir comunicarse entre sí por medios externos a Rantti, tales como llamadas telefónicas, aplicaciones de mensajería instantánea, correos electrónicos u otros medios de comunicación.
              <br />
              Dichas comunicaciones externas se realizan por decisión exclusiva de los Usuarios y <strong>fuera del ámbito de control, supervisión o intervención de Rantti</strong>.
              <br />
              Rantti no participa, ni directa ni indirectamente, en las comunicaciones, negociaciones, acuerdos o transacciones que se realicen fuera de la Plataforma, ni asume responsabilidad alguna por el contenido, alcance, resultado o consecuencias de dichas comunicaciones.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">11.3 Responsabilidad sobre el contenido de las comunicaciones</h4>
            <p className="text-gray-600 leading-relaxed">
              Cada Usuario es el único y exclusivo responsable del contenido de las comunicaciones que mantenga con otros Usuarios, ya sea a través de los canales internos de la Plataforma o mediante medios externos.
              <br />
              Rantti no revisa de forma previa las comunicaciones privadas entre Usuarios y no garantiza su veracidad, legalidad, exactitud o buena fe.
              <br />
              En consecuencia, Rantti no será responsable por:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Información falsa, engañosa o incompleta compartida entre Usuarios.</li>
              <li>Conductas inapropiadas, fraudulentas o ilegales.</li>
              <li>Incumplimientos de acuerdos alcanzados entre Usuarios.</li>
              <li>Daños, pérdidas o perjuicios derivados de las comunicaciones, negociaciones o interacciones entre Usuarios.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario acepta que cualquier comunicación o interacción con otros Usuarios se realiza bajo su propio riesgo.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">11.4 Recomendaciones de seguridad</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti recomienda a los Usuarios actuar con prudencia y sentido común en sus comunicaciones, incluyendo:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>No compartir información personal o financiera sensible.</li>
              <li>Verificar la identidad y reputación del otro Usuario.</li>
              <li>Documentar los acuerdos alcanzados de manera clara.</li>
              <li>Desconfiar de solicitudes inusuales, urgentes o poco claras.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Estas recomendaciones no constituyen garantía ni asesoramiento legal, financiero o comercial.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">11.5 Reporte de conductas indebidas</h4>
            <p className="text-gray-600 leading-relaxed">
              Los Usuarios podrán reportar a Rantti cualquier comportamiento que consideren sospechoso, fraudulento o contrario a estos Términos y Condiciones, utilizando los canales habilitados en la Plataforma.
              <br />
              Rantti podrá evaluar dichos reportes y, de considerarlo pertinente, adoptar medidas conforme a la Sección de Moderación y Control de Contenido, sin que ello implique obligación de intervenir o resolver conflictos entre Usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">11.6 Limitación de responsabilidad</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti no será responsable por daños directos, indirectos, incidentales o consecuenciales derivados de:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Comunicaciones entre Usuarios.</li>
              <li>Negociaciones o acuerdos celebrados entre Usuarios.</li>
              <li>Uso indebido de información compartida voluntariamente por los Usuarios.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario acepta que cualquier interacción con otros Usuarios se realiza bajo su propio riesgo.
            </p>
          </section>

          {/* 12. Limitación de responsabilidad general */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Limitación de responsabilidad general</h2>

            <h4 className="font-semibold text-gray-900 mb-2">12.1 Rol de Rantti como intermediario</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario reconoce y acepta que Rantti actúa únicamente como una plataforma tecnológica que facilita la publicación de ofertas y demandas de productos, así como el contacto entre Usuarios.
              <br />
              Rantti <strong>no es propietario, vendedor, comprador, distribuidor, intermediario comercial, agente, representante ni garante</strong> de los productos ofrecidos o solicitados por los Usuarios, ni participa en las transacciones que puedan derivarse de dichas publicaciones.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">12.2 Exclusión de responsabilidad sobre productos y transacciones</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti no asume responsabilidad alguna respecto de:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>La existencia, calidad, estado, legalidad, seguridad o idoneidad de los productos ofrecidos o solicitados.</li>
              <li>La veracidad, exactitud o integridad de la información contenida en las Publicaciones.</li>
              <li>El cumplimiento o incumplimiento de acuerdos entre Usuarios.</li>
              <li>Los envíos, entregas, devoluciones, garantías o reembolsos.</li>
              <li>Pagos realizados entre Usuarios fuera de la Plataforma.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Toda transacción que se realice como consecuencia del uso de la Plataforma es responsabilidad exclusiva de los Usuarios involucrados.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">12.3 Disponibilidad y funcionamiento de la Plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti no garantiza que la Plataforma funcione de manera ininterrumpida, segura o libre de errores, ni que esté disponible en todo momento.
              <br />
              Rantti podrá realizar mantenimientos, actualizaciones, modificaciones o suspensiones temporales de la Plataforma, sin que ello genere derecho a indemnización alguna para los Usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">12.4 Seguridad y riesgos tecnológicos</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario reconoce que el uso de plataformas digitales conlleva riesgos inherentes, incluyendo, pero no limitándose a, fallas técnicas, interrupciones del servicio, accesos no autorizados o pérdida de información.
              <br />
              Rantti adopta medidas razonables de seguridad, pero <strong>no garantiza la invulnerabilidad absoluta de sus sistemas</strong> y no será responsable por daños derivados de eventos fuera de su control razonable.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">12.5 Daños excluidos</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              En la máxima medida permitida por la legislación aplicable, Rantti no será responsable por daños directos, indirectos, incidentales, especiales, consecuenciales o punitivos, incluyendo, sin limitación:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Pérdida de ingresos, ganancias o oportunidades comerciales.</li>
              <li>Daños reputacionales.</li>
              <li>Pérdida de datos.</li>
              <li>Conflictos o disputas entre Usuarios.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">12.6 Alcance legal de la limitación</h4>
            <p className="text-gray-600 leading-relaxed">
              Las limitaciones de responsabilidad establecidas en esta sección se aplican incluso cuando Rantti haya sido advertido de la posibilidad de dichos daños y constituyen una condición esencial para el uso de la Plataforma.
              <br />
              Nada en estos Términos y Condiciones excluye o limita responsabilidades que no puedan ser legalmente excluidas conforme a la legislación peruana aplicable.
            </p>
          </section>

          {/* 13. Suspensión, cancelación y cierre de cuentas */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Suspensión, cancelación y cierre de cuentas</h2>

            <h4 className="font-semibold text-gray-900 mb-2">13.1 Facultades de Rantti</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti se reserva el derecho de suspender, restringir, cancelar o cerrar, de forma temporal o definitiva, las cuentas de los Usuarios, así como limitar su acceso a la Plataforma o a determinadas funcionalidades, cuando lo considere necesario para proteger el correcto funcionamiento de la Plataforma, a otros Usuarios o a Rantti.
              <br />
              Estas medidas podrán adoptarse <strong>con o sin previo aviso</strong>, dependiendo de la gravedad del caso.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">13.2 Causales de suspensión o cancelación</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Sin perjuicio de otras medidas, Rantti podrá suspender o cancelar una cuenta cuando el Usuario:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Incumpla estos Términos y Condiciones.</li>
              <li>Publique contenido falso, engañoso, ilícito o prohibido.</li>
              <li>Realice actividades fraudulentas, abusivas o que generen riesgos para otros Usuarios.</li>
              <li>Utilice la Plataforma con fines ilegales o no autorizados.</li>
              <li>Intente eludir sistemas de moderación, seguridad o control de Rantti.</li>
              <li>Afecte la reputación, seguridad o estabilidad de la Plataforma.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              La enumeración anterior es enunciativa y no limitativa.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">13.3 Casos graves</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              En casos considerados graves, incluyendo pero no limitándose a fraude, actividades ilegales, suplantación de identidad o riesgos para terceros, Rantti podrá:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Cancelar la cuenta de manera inmediata.</li>
              <li>Eliminar publicaciones y contenidos asociados.</li>
              <li>Restringir de forma permanente el acceso del Usuario a la Plataforma.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">13.4 Efectos de la suspensión o cancelación</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              La suspensión o cancelación de una cuenta implica:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>La pérdida de acceso a la cuenta y a las funcionalidades asociadas.</li>
              <li>La imposibilidad de crear nuevas cuentas, cuando así lo determine Rantti.</li>
              <li>La eliminación o desactivación de publicaciones activas.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Los pagos realizados por servicios pagos o Planes Destacados <strong>no serán reembolsables</strong>, incluso en caso de suspensión o cancelación de la cuenta.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">13.5 Cierre voluntario de cuenta</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario podrá solicitar el cierre de su cuenta conforme a los mecanismos habilitados por Rantti.
              <br />
              El cierre voluntario de la cuenta no genera derecho a reembolso alguno por servicios contratados y no exime al Usuario de responsabilidades derivadas de usos previos de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">13.6 Conservación de información</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti podrá conservar determinada información del Usuario, incluso tras el cierre de la cuenta, cuando sea necesario para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Cumplir obligaciones legales.</li>
              <li>Resolver disputas.</li>
              <li>Prevenir fraudes.</li>
              <li>Proteger derechos e intereses de Rantti o de terceros.</li>
            </ul>
          </section>

          {/* 14. Propiedad intelectual */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Propiedad intelectual</h2>

            <h4 className="font-semibold text-gray-900 mb-2">14.1 Titularidad de la Plataforma</h4>
            <p className="text-gray-600 leading-relaxed">
              Todos los derechos de propiedad intelectual e industrial relacionados con la Plataforma Rantti, incluyendo, de manera enunciativa mas no limitativa, su nombre, marca, logotipo, diseño, estructura, software, código fuente, funcionalidades, bases de datos, textos, gráficos, imágenes y demás contenidos propios, son de titularidad exclusiva de Rantti o de terceros que hayan autorizado su uso.
              <br />
              El uso de la Plataforma por parte del Usuario no implica la cesión, licencia ni transferencia de derecho alguno sobre dichos elementos, salvo lo expresamente permitido en estos Términos y Condiciones.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">14.2 Uso permitido del contenido de Rantti</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario podrá utilizar la Plataforma y sus contenidos únicamente para fines personales y conforme a estos Términos y Condiciones.
              <br />
              Queda expresamente prohibido:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Copiar, reproducir, modificar, distribuir o explotar comercialmente el contenido de la Plataforma.</li>
              <li>Realizar ingeniería inversa, descompilación o cualquier otra forma de extracción del software.</li>
              <li>Utilizar la marca o signos distintivos de Rantti sin autorización previa y expresa.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">14.3 Contenido generado por los Usuarios</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario conserva la titularidad de los derechos de propiedad intelectual sobre el contenido que publique en la Plataforma, incluyendo textos, imágenes, descripciones y cualquier otro material.
              <br />
              Al publicar contenido en Rantti, el Usuario otorga a Rantti una licencia <strong>no exclusiva, gratuita, mundial y por el tiempo necesario</strong> para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Alojar, reproducir, mostrar, adaptar y comunicar dicho contenido dentro de la Plataforma.</li>
              <li>Utilizar el contenido con fines operativos, promocionales y de mejora del servicio.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Esta licencia no implica cesión de derechos a terceros fuera del ámbito de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">14.4 Responsabilidad sobre derechos de terceros</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario declara y garantiza que:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Es titular de los derechos sobre el contenido que publica o cuenta con las autorizaciones necesarias.</li>
              <li>El contenido no infringe derechos de propiedad intelectual, industrial o derechos de imagen de terceros.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti no será responsable por reclamaciones de terceros derivadas del contenido publicado por los Usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">14.5 Infracciones y medidas</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Ante una presunta infracción de derechos de propiedad intelectual, Rantti podrá:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Retirar o desactivar el contenido presuntamente infractor.</li>
              <li>Suspender o cancelar la cuenta del Usuario responsable.</li>
              <li>Adoptar otras medidas conforme a estos Términos y Condiciones y a la legislación aplicable.</li>
            </ul>
          </section>

          {/* 15. Protección de datos y privacidad */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Protección de datos y privacidad</h2>

            <h4 className="font-semibold text-gray-900 mb-2">15.1 Tratamiento de datos personales</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti recopila y trata los datos personales de los Usuarios con la finalidad de permitir el registro, uso y correcto funcionamiento de la Plataforma, así como para la gestión de cuentas, publicaciones, comunicaciones internas y servicios ofrecidos.
              <br />
              El tratamiento de los datos personales se realiza conforme a la legislación peruana vigente en materia de protección de datos personales.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">15.2 Datos recopilados</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti podrá recopilar, entre otros, los siguientes datos:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Información de identificación proporcionada por el Usuario al registrarse.</li>
              <li>Datos de contacto.</li>
              <li>Información relacionada con el uso de la Plataforma.</li>
              <li>Contenido de las comunicaciones internas entre Usuarios.</li>
              <li>Información técnica necesaria para el funcionamiento y seguridad de la Plataforma.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              El Usuario garantiza que los datos proporcionados son veraces, actualizados y de su titularidad.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">15.3 Finalidad del uso de los datos</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              Los datos personales serán utilizados para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>Permitir el acceso y uso de la Plataforma.</li>
              <li>Gestionar publicaciones y Planes Destacados.</li>
              <li>Facilitar comunicaciones internas entre Usuarios.</li>
              <li>Mejorar la experiencia y seguridad de la Plataforma.</li>
              <li>Cumplir obligaciones legales y regulatorias.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Rantti no comercializa ni vende los datos personales de los Usuarios.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">15.4 Conservación de la información</h4>
            <p className="text-gray-600 leading-relaxed">
              Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades para las que fueron recopilados, así como para atender obligaciones legales, resolver disputas o prevenir fraudes.
              <br />
              Incluso tras el cierre de la cuenta, Rantti podrá conservar cierta información conforme a la ley aplicable.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">15.5 Derechos del Usuario</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario podrá ejercer los derechos de acceso, rectificación, cancelación y oposición (derechos ARCO), conforme a la normativa vigente, a través de los canales que Rantti habilite para tal efecto.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">15.6 Medidas de seguridad</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti adopta medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida, alteración o uso indebido.
              <br />
              No obstante, el Usuario reconoce que ningún sistema es completamente seguro y que el uso de plataformas digitales conlleva riesgos inherentes.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">15.7 Política de privacidad</h4>
            <p className="text-gray-600 leading-relaxed">
              El tratamiento de datos personales se rige además por la Política de Privacidad de Rantti, la cual forma parte integrante de estos Términos y Condiciones.
            </p>
          </section>

          {/* 16. Modificaciones de los Términos y Condiciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Modificaciones de los Términos y Condiciones</h2>
            <p className="text-gray-600 leading-relaxed">
              Rantti se reserva el derecho de modificar, actualizar o sustituir, total o parcialmente, los presentes Términos y Condiciones en cualquier momento, cuando lo considere necesario para reflejar cambios legales, técnicos, operativos o comerciales de la Plataforma.
              <br />
              Las modificaciones entrarán en vigor desde su publicación en la Plataforma, salvo que se indique expresamente una fecha distinta.
              <br />
              El uso continuado de la Plataforma por parte del Usuario después de la publicación de las modificaciones implica la <strong>aceptación expresa de los nuevos Términos y Condiciones</strong>.
              <br />
              Rantti podrá, pero no estará obligada a, notificar a los Usuarios sobre cambios relevantes a través de la Plataforma o por otros medios disponibles.
            </p>
          </section>

          {/* 17. Ley aplicable y jurisdicción */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Ley aplicable y jurisdicción</h2>
            <p className="text-gray-600 leading-relaxed">
              Los presentes Términos y Condiciones se rigen e interpretan de conformidad con las leyes de la República del Perú.
              <br />
              Cualquier controversia, conflicto o reclamación que se derive de la interpretación, ejecución, validez o uso de la Plataforma Rantti, y que no pueda resolverse de manera amistosa, será sometida a la competencia exclusiva de los jueces y tribunales de la ciudad de Lima, Perú, salvo que la normativa aplicable disponga de manera imperativa otra jurisdicción.
            </p>
          </section>

          {/* 18. Duración y terminación */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Duración y terminación</h2>

            <h4 className="font-semibold text-gray-900 mb-2">18.1 Vigencia de los Términos y Condiciones</h4>
            <p className="text-gray-600 leading-relaxed">
              Los presentes Términos y Condiciones entran en vigor desde el momento en que el Usuario accede, se registra o utiliza la Plataforma Rantti, y permanecerán vigentes mientras el Usuario mantenga una cuenta activa o haga uso de la Plataforma.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">18.2 Terminación por parte del Usuario</h4>
            <p className="text-gray-600 leading-relaxed">
              El Usuario podrá dejar de utilizar la Plataforma y solicitar el cierre de su cuenta en cualquier momento, conforme a los mecanismos habilitados por Rantti.
              <br />
              La terminación voluntaria de la cuenta por parte del Usuario:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>No genera derecho a reembolso alguno por servicios pagos contratados.</li>
              <li>No exime al Usuario de responsabilidades derivadas de usos previos de la Plataforma.</li>
              <li>No afecta la validez de obligaciones asumidas con otros Usuarios.</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">18.3 Terminación por parte de Rantti</h4>
            <p className="text-gray-600 leading-relaxed">
              Rantti podrá terminar la relación con el Usuario, suspender o cancelar su cuenta conforme a lo establecido en la Sección de Suspensión, Cancelación y Cierre de Cuentas, cuando exista incumplimiento de estos Términos y Condiciones o por razones operativas, legales o de seguridad.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">18.4 Efectos de la terminación</h4>
            <p className="text-gray-600 leading-relaxed mt-3">
              La terminación del acceso a la Plataforma implica:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
              <li>La pérdida del derecho a utilizar la cuenta y sus funcionalidades.</li>
              <li>La desactivación o eliminación de publicaciones activas.</li>
              <li>La conservación de información conforme a la legislación aplicable y a lo dispuesto en la Política de Privacidad.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Las disposiciones que, por su naturaleza, deban sobrevivir a la terminación (incluyendo limitación de responsabilidad, propiedad intelectual y ley aplicable) continuarán vigentes.
            </p>
          </section>

          {/* 19. Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">19. Contacto</h2>
            <p className="text-gray-600 leading-relaxed">
              Para cualquier consulta, reclamo, solicitud o comunicación relacionada con la Plataforma, los Usuarios podrán contactar a Rantti exclusivamente a través de los canales oficiales que la Plataforma ponga a disposición.
              <br />
              Rantti no se responsabiliza por comunicaciones realizadas a través de medios no oficiales, ni por mensajes enviados a terceros que se hagan pasar por representantes de la Plataforma.
              <br />
              Los Usuarios reconocen que únicamente las comunicaciones realizadas mediante los canales oficiales habilitados por Rantti serán consideradas válidas a efectos legales y administrativos.
            </p>
          </section>

          {/* 20. Disposiciones finales */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">20. Disposiciones finales</h2>

            <h4 className="font-semibold text-gray-900 mb-2">20.1 Nulidad parcial</h4>
            <p className="text-gray-600 leading-relaxed">
              En caso de que alguna disposición de los presentes Términos y Condiciones sea declarada nula, inválida o inaplicable por autoridad competente, dicha disposición se considerará separable y no afectará la validez, legalidad ni aplicabilidad del resto de las disposiciones, las cuales permanecerán plenamente vigentes.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">20.2 Integridad del acuerdo</h4>
            <p className="text-gray-600 leading-relaxed">
              Los presentes Términos y Condiciones, junto con la Política de Privacidad y cualquier otro documento referido expresamente, constituyen el acuerdo íntegro entre el Usuario y Rantti respecto al uso de la Plataforma, y sustituyen cualquier acuerdo, comunicación o entendimiento previo, ya sea oral o escrito.
            </p>

            <h4 className="font-semibold text-gray-900 mt-6 mb-2">20.3 Idioma oficial</h4>
            <p className="text-gray-600 leading-relaxed">
              Los presentes Términos y Condiciones se encuentran redactados en idioma español, el cual será el idioma oficial y prevalente para su interpretación. En caso de existir traducciones a otros idiomas, estas tendrán carácter meramente informativo.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
