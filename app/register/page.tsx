import { Metadata } from 'next'
import HeroClient from "@/components/HeroClient";

export const metadata: Metadata = {
  title: 'Crear Cuenta',
  description: 'Regístrate en Rantti y comienza a comprar y vender objetos únicos de alto valor. Únete a nuestra comunidad de usuarios verificados en Perú.',
  openGraph: {
    title: 'Crear Cuenta | Rantti',
    description: 'Regístrate gratis en Rantti',
    url: 'https://rantti.com/register',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function RegisterPage() {
  return <HeroClient />;
}
