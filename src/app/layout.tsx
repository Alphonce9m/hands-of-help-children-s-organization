import { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
// import Layout from '@/components/Layout' // Remove this import
import { Toaster } from 'react-hot-toast'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
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
    icon: '/icons/icon-192x192.png',
    shortcut: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
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

import ParticleBackground from '@/components/ParticleBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hands of Help" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text">
        {/* Particle animated background (from CodePen) */}
        <ParticleBackground />
        {/* Optional: CSS overlays, uncomment to enable */}
        {/* <div className="fixed inset-0 -z-50 live-gradient"></div> */}
        {/* <div className="fixed inset-0 -z-40 grain-overlay"></div> */}
        {/* <div className="fixed inset-0 -z-30 grain-overlay-fine"></div> */}
        {/* <div className="fixed inset-0 -z-20 light-sweep"></div> */}
        {/* <div className="fixed inset-0 -z-10 color-wash"></div> */}
        <AccessibilityProvider>
          <Toaster />
          {children}
        </AccessibilityProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}