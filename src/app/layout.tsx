import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
// import Layout from '@/components/Layout' // Remove this import
import { Toaster } from 'react-hot-toast'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  title: 'Hands of Help - Making a Difference in Communities',
  description: 'Join us in our mission to transform lives and empower communities through education, healthcare, and sustainable development initiatives.',
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
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Hands of Help - Making a Difference in Communities',
    description: 'Join us in our mission to transform lives and empower communities through education, healthcare, and sustainable development initiatives.',
    url: 'https://handsofhelp.org',
    siteName: 'Hands of Help',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
      <body className="min-h-screen flex flex-col bg-background text-text">
        <AccessibilityProvider>
          <Toaster />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  )
}