import { Metadata } from 'next'
import HeroClient from "@/components/HeroClient";

export const metadata: Metadata = {
  title: 'Mi Dashboard',
  description: 'Gestiona tus publicaciones, mensajes y transacciones en Rantti. Accede a tu panel de control personalizado.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardPage() {
  return <HeroClient />;
}
