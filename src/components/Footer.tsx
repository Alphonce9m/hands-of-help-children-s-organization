'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'About Us': [
      { name: 'Our Story', href: '/about' },
      { name: 'Team', href: '/about#team' },
      { name: 'Impact', href: '/impact' },
    ],
    'Programs': [
      { name: 'Education', href: '/programs#education' },
      { name: 'Healthcare', href: '/programs#healthcare' },
      { name: 'Community Development', href: '/programs#community' },
    ],
    'Get Involved': [
      { name: 'Donate', href: '/donate' },
      { name: 'Volunteer', href: '/volunteer' },
      { name: 'Partnerships', href: '/partnerships' },
    ],
  };

  const socialLinks = [
    { href: 'https://facebook.com/handsofhelp', label: 'Facebook' },
    { href: 'https://twitter.com/handsofhelp', label: 'Twitter' },
    { href: 'https://instagram.com/handsofhelp', label: 'Instagram' },
    { href: 'https://linkedin.com/company/handsofhelp', label: 'LinkedIn' }
  ];

  return (
    <footer className="pt-16 pb-8 text-white relative overflow-hidden group footer-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/logo.svg" alt="Hands of Help Logo" width={40} height={40} />
              <span className="text-2xl font-bold">Hands of Help</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering children and young adults in Kasabuni, Nairobi through education, 
              digital literacy, and community support since 2015.
            </p>
            <div className="space-y-2 text-gray-400">
              <p>
                <a href="mailto:handsofhelpchildrenorg@gmail.com" className="hover:text-white transition-colors">
                  handsofhelpchildrenorg@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+254718782488" className="hover:text-white transition-colors">
                  +254 718 782 488
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-400 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Havens Community Library</li>
              <li>Kasabuni, Nairobi</li>
              <li>Kenya</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Hands of Help. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 