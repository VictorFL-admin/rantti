import { Metadata } from 'next'
import HeroClient from "@/components/HeroClient";

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Conoce cómo Rantti protege tus datos personales. Lee nuestra política de privacidad y seguridad de la información.',
  openGraph: {
    title: 'Política de Privacidad | Rantti',
    description: 'Protección de datos en Rantti',
    url: 'https://rantti.com/politica-de-privacidad',
  },
}

export default function PrivacyPage() {
  return <HeroClient />;
}
