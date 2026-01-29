import { Metadata } from 'next'
import HeroClient from "@/components/HeroClient";

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicia sesión en Rantti para acceder a tu cuenta y negociar objetos únicos de alto valor. Compra y vende joyas, relojes, arte y más.',
  openGraph: {
    title: 'Iniciar Sesión | Rantti',
    description: 'Accede a tu cuenta de Rantti',
    url: 'https://rantti.com/login',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginPage() {
  return <HeroClient />;
}
