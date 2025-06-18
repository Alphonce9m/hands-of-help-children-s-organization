/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Add type declarations for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Add React types for global use
declare global {
  type ReactNode = import('react').ReactNode;
  type ReactElement = import('react').ReactElement;
  type ReactChildren = import('react').ReactChildren;
}

// Add any other global type declarations here
interface Window {
  // Add any global window properties here if needed
}
