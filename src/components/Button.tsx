'use client';

import { FC } from 'react';
import { cn } from '../lib/utils';

import React from 'react';

interface BaseButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

// For anchor
type AnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
// For button
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = AnchorProps | NativeButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...rest
  } = props as any;

  const variants: Record<NonNullable<BaseButtonProps['variant']>, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizes: Record<NonNullable<BaseButtonProps['size']>, string> = {
    sm: 'h-9 rounded-md px-3',
    md: 'h-10 rounded-md px-4 py-2',
    lg: 'h-11 rounded-md px-8',
  };

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <a
        href={href}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          className
        )}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant as keyof typeof variants],
        sizes[size as keyof typeof sizes],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;