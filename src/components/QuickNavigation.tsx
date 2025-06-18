'use client';

import React from 'react';

// Define types for the section items
interface Section {
  id: string;
  name: string;
  icon: React.ReactNode; // Using React namespace for ReactNode type
}

// Define props interface with proper TypeScript types
interface QuickNavigationProps {
  /**
   * Array of section items to display in the navigation
   */
  sections: Section[];
  
  /**
   * Currently active section ID
   */
  activeSection?: string;
  
  /**
   * Callback function when a section is selected
   * @param sectionId - The ID of the selected section
   */
  onSectionChange?: (sectionId: string) => void;
  
  /**
   * Whether to show the home button
   * @default true
   */
  showHomeButton?: boolean;
}

// Component
function QuickNavigation({
  sections = [],
  activeSection = '',
  onSectionChange,
  showHomeButton = true,
}: QuickNavigationProps) {
  const [showQuickNav, setShowQuickNav] = React.useState<boolean>(false);

  const toggleQuickNav = () => {
    setShowQuickNav(!showQuickNav);
  };

  const handleSectionClick = React.useCallback((sectionId: string) => {
    onSectionChange?.(sectionId);
    setShowQuickNav(false);
  }, [onSectionChange]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleQuickNav}
        className="fixed right-4 bottom-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Quick navigation menu"
      >
        {showQuickNav ? '×' : '☰'}
      </button>

      {showQuickNav && (
        <div className="fixed right-4 bottom-20 z-50 w-64 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Navigation</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {showHomeButton && (
              <button
                onClick={() => handleSectionClick('home')}
                className={`w-full px-4 py-3 text-left text-sm font-medium ${
                  activeSection === 'home' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">🏠</span>
                  <span>Home</span>
                </div>
              </button>
            )}

            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full px-4 py-3 text-left text-sm font-medium ${
                  activeSection === section.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{section.icon}</span>
                  <span>{section.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickNavigation;
