'use client';

import React from 'react';
import Container from './Container';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroHeight?: string;
  className?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}

interface NavigationLink {
  name: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/hhcokenya/',
    icon: FaFacebook,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/handsofhelp_ke/',
    icon: FaInstagram,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/handsofhelp_ke',
    icon: FaTwitter,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/handsofhelp-kenya',
    icon: FaLinkedin,
  },
];

const navigationLinks: NavigationLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Programs', href: '/programs' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const Layout = ({
  children,
  showHero = true,
  heroTitle = 'Creating a Future of Opportunity',
  heroSubtitle = 'Empowering children and young adults through education, digital literacy, and community support',
  heroImage,
  heroHeight = 'h-96',
  className = ''
}: LayoutProps) => {
  // State for mobile menu (commented out for now as it's not being used)
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      <header className="fixed w-full z-50 bg-gradient-to-r from-primary to-secondary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <div className="relative w-10 h-10 mr-2">
                  <img
                    src="/IMG-20250514-WA0001.jpg"
                    alt="Hands of Help"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white">Hands of Help</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Donate Button */}
            <a
              href="/donate"
              className="hidden md:block bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              Donate
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {showHero && (
        <section className={`relative ${heroHeight} overflow-hidden`}>
          {heroImage && (
            <img
              src={heroImage}
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {heroTitle}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {heroSubtitle}
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <a
                  href="/donate"
                  className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Donate Now
                </a>
                <a
                  href="/about"
                  className="border border-white hover:bg-white hover:text-primary text-white px-6 py-3 rounded-lg transition-colors cursor-pointer inline-block"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="mt-24">
        <Container>{children}</Container>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-white/90">
                Hands of Help Children's Organization is dedicated to creating a
                future of opportunity for children and young adults through
                education, digital literacy, and community support.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link: SocialLink) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/70">
            &copy; {new Date().getFullYear()} e Children's Organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;