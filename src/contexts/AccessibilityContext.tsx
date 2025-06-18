'use client';

import React from 'react';

interface AccessibilityContextType {
  announceMessage: (message: string) => void;
  setFocus: (element: HTMLElement) => void;
  skipToMain: () => void;
}

const AccessibilityContext = React.createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [announcement, setAnnouncement] = React.useState<string>('');
  const mainContentRef = React.useRef<HTMLElement | null>(null);

  const announceMessage = (message: string) => {
    setAnnouncement(message);
    // Clear the announcement after it's been read
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const setFocus = (element: HTMLElement) => {
    element.focus();
  };

  const skipToMain = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  };

  return (
    <AccessibilityContext.Provider value={{ announceMessage, setFocus, skipToMain }}>
      <div role="region" aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <button
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to main content
      </button>
      <main ref={mainContentRef} tabIndex={-1}>
        {children}
      </main>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = React.useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};