import { useEffect, useRef } from 'react';

interface UseKeyboardNavigationProps {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
}

export const useKeyboardNavigation = ({
  onEnter,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
}: UseKeyboardNavigationProps = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onEnter?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
        case 'Tab':
          onTab?.();
          break;
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
    }

    return () => {
      if (element) {
        element.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]);

  return elementRef;
}; 