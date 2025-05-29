'use client';

import { FC, ReactNode, TouchEvent } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
  onTouchCancel?: () => void;
}

const Card: FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default', 
  onClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel
}) => {
  const variants = {
    default: 'bg-white shadow',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-200'
  };

  return (
    <div 
      className={`rounded-lg p-6 ${variants[variant]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      {children}
    </div>
  );
};

export default Card; 