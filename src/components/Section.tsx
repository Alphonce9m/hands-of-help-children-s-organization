'use client';

import { forwardRef, FC, ReactNode, MouseEvent } from 'react';

interface SectionProps {
  className?: string;
  children: ReactNode;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
}

const Section: FC<SectionProps> = ({
  className = '',
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <section
      className={`py-12 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </section>
  );
};

Section.displayName = 'Section';

export default Section;