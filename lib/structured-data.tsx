// JSON-LD Structured Data para SEO

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rantti',
    url: 'https://rantti.com',
    logo: 'https://rantti.com/images/logo_rantti.png',
    description: 'Tu plataforma de confianza para negociar objetos únicos de alto valor. Sin intermediarios, sin complicaciones.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+51-936-151-017',
      contactType: 'customer service',
      areaServed: 'PE',
      availableLanguage: ['es'],
    },
    sameAs: [
      'https://www.facebook.com/share/1757t7fP9n/',
    ],
  }
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rantti',
    url: 'https://rantti.com',
    description: 'Marketplace de objetos únicos de alto valor en Perú',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://rantti.com/buscar?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getProductSchema(product: {
  name: string
  description: string
  image: string
  price: number
  currency: string
  availability: string
  condition: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      itemCondition: `https://schema.org/${product.condition}`,
      seller: {
        '@type': 'Organization',
        name: 'Rantti',
      },
    },
  }
}

// Componente para renderizar JSON-LD
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
