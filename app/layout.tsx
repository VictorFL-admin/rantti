import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { StructuredData, getOrganizationSchema, getWebsiteSchema } from "@/lib/structured-data";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rantti.com'),
  title: {
    default: "Rantti - Compra y Vende Objetos Únicos de Alto Valor en Perú",
    template: "%s | Rantti"
  },
  description: "Tu plataforma de confianza para negociar objetos únicos de alto valor. Compra y vende joyas exclusivas, relojes de lujo, arte, coleccionables y tech premium sin intermediarios, sin complicaciones. Marketplace de lujo en Perú.",
  keywords: [
    "compra venta objetos lujo",
    "marketplace lujo perú",
    "joyas exclusivas",
    "relojes de lujo",
    "arte coleccionables",
    "consolas retro",
    "tech premium",
    "objetos únicos alto valor",
    "marketplace sin intermediarios",
    "compra venta directa perú"
  ],
  authors: [{ name: "Rantti" }],
  creator: "Rantti",
  publisher: "Rantti",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://rantti.com",
    siteName: "Rantti",
    title: "Rantti - Compra y Vende Objetos Únicos de Alto Valor",
    description: "Tu plataforma de confianza para negociar objetos únicos de alto valor. Sin intermediarios, sin complicaciones.",
    images: [
      {
        url: "/images/transparent-photoroom.webp",
        width: 1200,
        height: 630,
        alt: "Rantti - Marketplace de objetos únicos de lujo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rantti - Compra y Vende Objetos Únicos de Alto Valor",
    description: "Tu plataforma de confianza para negociar objetos únicos de alto valor. Sin intermediarios, sin complicaciones.",
    images: ["/images/transparent-photoroom.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/LOGO-AZUL-RANTTI.ico",
    shortcut: "/images/LOGO-AZUL-RANTTI.ico",
    apple: "/images/LOGO-AZUL-RANTTI.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: "MoN0c45dIj6TilOIyAar6a0yaPc6CIulK8K736wP8g8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <StructuredData data={getOrganizationSchema()} />
        <StructuredData data={getWebsiteSchema()} />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
