import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIdelBienestar - AI del Bienestar",
  description: "La primera inteligencia artificial creada para el pueblo.",
  metadataBase: new URL('https://bozogpt.com'),
  applicationName: 'AIdelBienestar',
  keywords: [
    'AI del Bienestar', 'AIdelBienestar', 'IA', 'chatbot', 'parodia', '4T', 'Morena', 'México',
    'chat', 'humor político', 'chatbot en español', 'inteligencia artificial'
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "AIdelBienestar - AI del Bienestar",
    description: "La primera inteligencia artificial creada para el pueblo.",
    url: 'https://bozogpt.com',
    siteName: 'AIdelBienestar',
    images: [
      {
        url: '/main-bienestar.jpg',
        width: 1200,
        height: 630,
        alt: 'AIdelBienestar - AI del Bienestar',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AIdelBienestar - AI del Bienestar",
    description: "La primera inteligencia artificial creada para el pueblo.",
    images: ['/main-bienestar.jpg'],
    site: '@artmichel_eth',
    creator: '@artmichel_eth',
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
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    other: {
      'google-site-verification': 'tu-codigo-de-verificacion-google',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta viewport para viewport dinámico */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content" 
        />
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6477883622948797" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-6477883622948797" />
        {/* Facebook App ID para extracción de datos */}
        <meta property="fb:app_id" content="123456789012345" />
        {/* Favicon para máxima compatibilidad */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bozo-dark text-zinc-100 viewport-dynamic`}
      >
        {/* Fixed header with AIdelBienestar icon - no space in document flow */}
        <div className="fixed top-0 left-0 z-30">
          <div className="touch:px-1.5 px-2">
            <div className="h-16 flex items-center">
              <Link 
                aria-label="AIdelBienestar" 
                className="text-zinc-100 no-draggable hover:bg-white/10 focus-visible:bg-white/10 touch:h-12 touch:w-12 flex h-12 w-12 items-center justify-center rounded-lg focus-visible:outline-0 disabled:opacity-50 transition-colors duration-200" 
                href="/" 
                data-discover="true"
              >
                <Image 
                  src="/bozogpt-icon.svg" 
                  alt="AIdelBienestar" 
                  width="40" 
                  height="40" 
                  className="text-zinc-100"
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main content area - no interference from fixed header */}
        <main className="flex flex-col h-viewport overflow-hidden viewport-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
