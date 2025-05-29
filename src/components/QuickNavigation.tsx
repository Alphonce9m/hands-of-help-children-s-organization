'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
  href?: string;
}

interface QuickNavigationProps {
  sections: Section[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  showHomeButton?: boolean;
}

const QuickNavigation: FC<QuickNavigationProps> = ({
  sections,
  activeSection,
  onSectionChange,
  showHomeButton = true
}) => {
  const [showQuickNav, setShowQuickNav] = useState(false);

  const navigateToSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.href) {
      window.location.href = section.href;
      return;
    }
    onSectionChange?.(sectionId);
    setShowQuickNav(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Quick Navigation Menu */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <motion.button
          className="bg-white p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 relative overflow-hidden group"
          onClick={() => setShowQuickNav(!showQuickNav)}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.span
            className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            initial={false}
            animate={{ scale: showQuickNav ? 1.5 : 1 }}
          />
          <motion.span
            className="relative z-10"
            animate={{ rotate: showQuickNav ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {showQuickNav ? 'Close' : 'Menu'}
          </motion.span>
        </motion.button>
        
        <AnimatePresence>
          {showQuickNav && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-lg shadow-lg p-2 space-y-2 mt-2"
            >
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => onSectionChange && onSectionChange(section.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Button */}
      {showHomeButton && (
        <motion.button
          className="fixed left-4 bottom-4 bg-white p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 relative overflow-hidden group"
          onClick={() => window.location.href = '/'}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.span
            className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.5 }}
          />
          <motion.span
            className="relative z-10"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            Home
          </motion.span>
        </motion.button>
      )}
    </>
  );
};

export default QuickNavigation; 