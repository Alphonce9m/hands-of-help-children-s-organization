import React, { useState } from 'react';

export const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <button className="hamburger" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      <ul className={`mobile-menu${open ? ' open' : ''}`} role="menu">
        <li><a href="/" role="menuitem">Home</a></li>
        <li><a href="/about" role="menuitem">About</a></li>
        <li><a href="/donate" role="menuitem">Donate</a></li>
        <li><a href="/contact" role="menuitem">Contact</a></li>
      </ul>
    </nav>
  );
};
