'use client';

import { FC } from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <Image
      src="/logo.svg"
      alt="Hands of Help Logo"
      width={40}
      height={40}
      className={className}
      priority
    />
  );
};

export default Logo; 