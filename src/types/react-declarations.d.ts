declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module 'react' {
  export interface ReactElement {
    type: any;
    props: any;
    key: any;
  }
  export interface ReactNode {
    [key: string]: any;
  }
  export interface SVGProps<T> {
    className?: string;
    fill?: string;
    viewBox?: string;
  }
  export interface SVGElement extends HTMLElement {
    className: string;
  }
}

declare module 'next/image' {
  import { ReactNode } from 'react';
  export interface ImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
  }
  export const Image: React.ComponentType<ImageProps>;
}
