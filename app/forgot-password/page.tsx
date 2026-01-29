import { Metadata } from 'next'
import HeroClient from "@/components/HeroClient";

export const metadata: Metadata = {
  title: 'Recuperar Contraseña',
  description: 'Recupera el acceso a tu cuenta de Rantti. Solicita un enlace para restablecer tu contraseña.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ForgotPasswordPage() {
  return <HeroClient />;
}
