'use client';

interface NavLinkProps {
  href: string;
  label: string;
  target?: string;
  rel?: string;
}

const currentYear = new Date().getFullYear();

const NAV_LINKS: NavLinkProps[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Team' },
  { href: '/programs', label: 'Programs' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const Footer: React.FC = () => {
  const renderNavLink = (link: NavLinkProps) => (
    <a
      key={link.href}
      href={link.href}
      className="text-gray-400 hover:text-white transition-colors"
      target={link.target}
      rel={link.rel}
    >
      {link.label}
    </a>
  );

  return (
    <footer className="pt-16 pb-8 text-white relative overflow-hidden group footer-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo.svg" 
                  alt="Hands of Help Logo" 
                  className="w-10 h-10"
                  width={40}
                  height={40}
                />
                <a href="/" className="text-2xl font-bold">
                  Hands of Help
                </a>
              </div>
            </div>
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
            <ul className="flex flex-col space-y-3">
              {NAV_LINKS.map(renderNavLink)}
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
          <p className="text-gray-400">
            &copy; {currentYear} Hands of Help Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 