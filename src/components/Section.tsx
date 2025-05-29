'use client';

import { forwardRef } from 'react';
import { SectionProps } from '@/types/sections';

const Section = forwardRef<HTMLDivElement, SectionProps & {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}>(({ children, className = '', onMouseEnter, onMouseLeave, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section; 