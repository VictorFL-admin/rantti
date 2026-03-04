// Tipos para el contenido de Sanity

export interface Step {
  title: string
  description: string
}

export interface Benefit {
  title: string
  description: string
}

export interface HomePageData {
  _id: string
  _type: 'homePage'
  hero: {
    badge: string
    title: string
    subtitle: string
    primaryButton: string
    secondaryButton: string
  }
  howItWorks: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    sellButtonText: string
    buyButtonText: string
    sellSteps: Step[]
    buySteps: Step[]
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
  }
  benefits: {
    badge: string
    title: string
    subtitle: string
    benefitsList: Benefit[]
  }
  services: {
    badge: string
    title: string
    description: string
    highlightTitle: string
    highlightSubtitle: string
    highlightDescription: string
    benefits: string[]
  }
  finalCta: {
    badge: string
    title: string
    subtitle: string
    description: string
    features: string[]
    buttonText: string
    trustText: string
  }
}
