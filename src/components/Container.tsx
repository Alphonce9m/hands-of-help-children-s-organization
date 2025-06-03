'use client';

import { FC } from 'react';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;