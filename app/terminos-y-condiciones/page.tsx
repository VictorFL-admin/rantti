import { Metadata } from 'next'
import HeroClient from "@/components/HeroClient";

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Lee los términos y condiciones de uso de Rantti. Conoce las reglas y políticas de nuestra plataforma de compra y venta de objetos únicos.',
  openGraph: {
    title: 'Términos y Condiciones | Rantti',
    description: 'Términos de uso de la plataforma Rantti',
    url: 'https://rantti.com/terminos-y-condiciones',
  },
}

export default function TermsPage() {
  return <HeroClient />;
}
