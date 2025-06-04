'use client';

import { FC, ReactNode, useState } from 'react';
import Button from './Button';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
  showHero?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  className?: string;
}

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/hhcokenya/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/hands-of-help-children-s-organization/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/hhcokenya/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'X',
    url: 'https://x.com/hhcokenya',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  }
];

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Programs', href: '/programs' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
];

const Layout: FC<LayoutProps> = ({
  children,
  showHero = true,
  heroTitle = 'Creating a Future of Opportunity',
  heroSubtitle = 'Empowering children and young adults through education, digital literacy, and community support',
  heroImage,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-black to-accent shadow-md sticky top-0 z-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30"></div>
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <Image
                src="/IMG-20250514-WA0001.jpg"
                alt="Hands of Help Logo"
                width={150}
                height={50}
                priority
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 z-10">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white hover:text-accent transition-colors ${
                    pathname === link.href ? 'font-medium text-accent' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:text-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current my-1 transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>

            {/* Desktop Social Links & Donate Button */}
            <div className="hidden md:flex items-center gap-4 z-10">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
              <Link
                href="/donate"
                className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition-colors"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-primary via-black to-accent transition-all duration-300 ease-in-out z-40 ${
              isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            } overflow-hidden`}
          >
            <nav className="py-4 space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-2 text-white hover:bg-accent/20 rounded-lg transition-colors ${
                    pathname === link.href ? 'font-medium bg-accent/20' : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-accent/20">
                <div className="flex gap-4 px-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-accent transition-colors"
                      title={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
                <Link
                  href="/donate"
                  className="block mt-4 px-4 py-2 bg-white text-primary rounded-lg hover:bg-accent hover:text-white transition-colors text-center"
                  onClick={closeMobileMenu}
                >
                  Donate
                </Link>
              </div>
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      {showHero && (
        <div className="relative h-[60vh] bg-gradient-to-r from-primary via-black to-accent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30"></div>
          {heroImage && (
            <div className="gradient-overlay">
              <Image
                src={heroImage}
                alt="Hero background"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <Container>
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-alt" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  {heroTitle}
                </h1>
                {heroSubtitle && (
                  <p className="text-xl md:text-2xl text-white/90 gradient-text-hover" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>{heroSubtitle}</p>
                )}

              </div>
            </Container>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-grow pt-16 ${className}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary via-black to-accent text-white py-12 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30"></div>
        <Container className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Logo and Description */}
          <div className="col-span-full md:col-span-1">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src="/IMG-20250514-WA0001.jpg"
                alt="Hands of Help Logo"
                width={150}
                height={50}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-200 text-sm gradient-text-hover">
              Empowering communities through education and support.
            </p>
          </div>
          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 gradient-text">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-accent transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 gradient-text">Contact</h4>
            <ul className="space-y-2 text-gray-200">
              <li>Email: info@handsofhelp.org</li>
              <li>Phone: +254 718 782 488</li>
              <li>Location: Kasabuni, Nairobi</li>
            </ul>
          </div>
          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 gradient-text">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-accent transition-colors"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </Container>
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hands of Help. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 