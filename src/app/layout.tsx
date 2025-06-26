import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Hands of Help',
  description: 'Making a difference in our communities through education, healthcare, and nutrition',
  keywords: 'charity, non-profit, community development, education, healthcare, volunteering, Kenya',
  authors: [{ name: 'Hands of Help' }],
  creator: 'Hands of Help',
  publisher: 'Hands of Help',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
  themeColor: '#000000',
  openGraph: {
    title: 'Hands of Help - Making a Difference in Communities',
    description: 'Join us in our mission to transform lives and empower communities through education, healthcare, and sustainable development initiatives.',
    url: 'https://handsofhelp.org',
    siteName: 'Hands of Help',
    images: [
      {
        url: '/images/WhatsApp Image 2025-05-28 at 00.00.04_4d4186bf.jpg',
        width: 1200,
        height: 630,
        alt: 'Hands of Help - Making a Difference'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hands of Help - Making a Difference in Communities',
    description: 'Join us in our mission to transform lives and empower communities through education, healthcare, and sustainable development initiatives.',
    creator: '@handsofhelp',
    images: ['/images/WhatsApp Image 2025-05-28 at 00.00.04_4d4186bf.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hands of Help',
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
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
        <link
          rel="icon"
          href="/logo.svg"
          type="image/svg+xml"
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/logo.svg"
          type="image/svg+xml"
          sizes="any"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text">
        <AccessibilityProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </AccessibilityProvider>
      </body>
    </html>
  )
}