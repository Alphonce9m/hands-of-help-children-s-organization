import { ReactNode } from 'react';

export interface Program {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface ProgramsSectionProps {
  programs?: Program[];
  className?: string;
}

export interface ImpactStat {
  number?: string;
  label: string;
  icon?: string;
  image?: string;
  title?: string;
  description?: string;
}

export interface ImpactStatsProps {
  stats?: ImpactStat[];
  className?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  className?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface TeamSectionProps {
  className?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  description?: string;
}

export interface GallerySectionProps {
  className?: string;
}

export interface ImpactImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ImpactSectionProps {
  className?: string;
}

export interface CallToActionButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface CallToActionProps {
  title: string;
  description: string;
  buttons?: CallToActionButton[];
  className?: string;
}

export interface SectionProps {
  children?: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: string;
} 