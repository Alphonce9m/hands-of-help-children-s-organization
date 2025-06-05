'use client';

import { forwardRef, ReactNode, MouseEvent, ForwardedRef } from 'react';

interface SectionProps {
  className?: string;
  children: ReactNode;
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
  id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
  id,
}, ref: ForwardedRef<HTMLElement>) => {
  return (
    <section
      ref={ref}
      id={id}
      className={`py-12 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;