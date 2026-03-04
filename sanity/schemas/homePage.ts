export default {
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    
    // ==================== HERO ====================
    {
      name: 'hero',
      title: '🎯 Sección Principal',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Etiqueta Superior',
          type: 'string',
          initialValue: 'Compra y vende al precio justo.'
        },
        {
          name: 'title',
          title: 'Título Principal',
          type: 'text',
          rows: 2,
          initialValue: 'Negocia libremente. El pago se acuerda entre las partes.'
        },
        {
          name: 'subtitle',
          title: 'Descripción',
          type: 'text',
          rows: 2,
          initialValue: 'Un marketplace donde compradores y vendedores acuerdan el precio en minutos, sin intermediarios ni complicaciones.'
        },
        {
          name: 'primaryButton',
          title: 'Botón Principal',
          type: 'string',
          initialValue: 'Publicar Gratis'
        },
        {
          name: 'secondaryButton',
          title: 'Botón Secundario',
          type: 'string',
          initialValue: 'Explorar'
        }
      ]
    },

    // ==================== CÓMO FUNCIONA (COMPLETO) ====================
    {
      name: 'howItWorks',
      title: '📋 Cómo Funciona',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Proceso Simple'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: '¿Cómo funciona?',
          description: 'Primera parte del título'
        },
        {
          name: 'titleHighlight',
          title: 'Título Resaltado',
          type: 'string',
          initialValue: 'Super fácil',
          description: 'Segunda parte del título (aparece en azul)'
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 2,
          initialValue: 'Solo 4 pasos para comprar o vender. Sin complicaciones, sin letra chica.'
        },
        {
          name: 'sellButtonText',
          title: 'Texto Botón Vender',
          type: 'string',
          initialValue: 'Cómo Vender'
        },
        {
          name: 'buyButtonText',
          title: 'Texto Botón Comprar',
          type: 'string',
          initialValue: 'Cómo Comprar'
        },
        {
          name: 'sellSteps',
          title: 'Pasos para Vender (4 pasos)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Título' },
              { name: 'description', type: 'text', title: 'Descripción', rows: 2 }
            ]
          }],
          validation: (Rule: any) => Rule.length(4)
        },
        {
          name: 'buySteps',
          title: 'Pasos para Comprar (4 pasos)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Título' },
              { name: 'description', type: 'text', title: 'Descripción', rows: 2 }
            ]
          }],
          validation: (Rule: any) => Rule.length(4)
        },
        {
          name: 'ctaTitle',
          title: 'Título del CTA Final',
          type: 'string',
          initialValue: '¿Listo para empezar? ¡Es gratis!',
          description: 'Texto que aparece al final de la sección'
        },
        {
          name: 'ctaSubtitle',
          title: 'Subtítulo del CTA',
          type: 'text',
          rows: 2,
          initialValue: 'Únete a miles de personas que ya están negociando de forma inteligente'
        },
        {
          name: 'ctaButton',
          title: 'Texto Botón del CTA',
          type: 'string',
          initialValue: 'Regístrate Ya'
        }
      ]
    },

    // ==================== BENEFICIOS ====================
    {
      name: 'benefits',
      title: '⭐ Beneficios',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Beneficios Reales'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: '¿Por qué elegir Rantti?'
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 2,
          initialValue: 'Negociaciones directas, precios justos y tratos entre personas.'
        },
        {
          name: 'benefitsList',
          title: 'Lista de Beneficios',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Título' },
              { name: 'description', type: 'text', title: 'Descripción', rows: 2 }
            ]
          }],
          validation: (Rule: any) => Rule.max(6)
        }
      ]
    },

    // ==================== SERVICIOS ====================
    {
      name: 'services',
      title: '💼 Servicios',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Servicios'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Servicios opcionales para vender más rápido.'
        },
        {
          name: 'description',
          title: 'Descripción',
          type: 'text',
          rows: 3,
          initialValue: 'Publicar y negociar en Rantti es gratis. Estos servicios te ayudan a tener más visibilidad y cerrar tratos antes.'
        },
        {
          name: 'highlightTitle',
          title: 'Título del Servicio Destacado',
          type: 'string',
          initialValue: 'Destaca tu Publicación'
        },
        {
          name: 'highlightSubtitle',
          title: 'Subtítulo del Servicio',
          type: 'string',
          initialValue: '(Vende más rápido destacando tu publicación)'
        },
        {
          name: 'highlightDescription',
          title: 'Descripción del Servicio',
          type: 'text',
          rows: 2,
          initialValue: 'Haz que tu producto aparezca primero y reciba más ofertas reales.'
        },
        {
          name: 'benefits',
          title: 'Beneficios de Destacar',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.max(5)
        }
      ]
    },

    // ==================== CTA FINAL ====================
    {
      name: 'finalCta',
      title: '🚀 Llamado Final',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Etiqueta',
          type: 'string',
          initialValue: 'Comienza ahora'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Publica en 1 minuto'
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'string',
          initialValue: 'Es gratis'
        },
        {
          name: 'description',
          title: 'Descripción',
          type: 'text',
          rows: 3,
          initialValue: 'Únete a cientos de personas que ya están negociando artículos exclusivos de forma directa, rápida y sin comisiones.'
        },
        {
          name: 'features',
          title: 'Características (3 items)',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.length(3),
          description: 'Ej: "Solo 1 minuto", "100% Gratis", "Sin comisiones"'
        },
        {
          name: 'buttonText',
          title: 'Texto del Botón',
          type: 'string',
          initialValue: 'Publicar Gratis'
        },
        {
          name: 'trustText',
          title: 'Texto Inferior',
          type: 'string',
          initialValue: 'No necesitas tarjeta de crédito • Activa tu cuenta en segundos'
        }
      ]
    }
  ]
}
