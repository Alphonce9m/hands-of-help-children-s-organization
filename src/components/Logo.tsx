'use client';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Logo = ({ 
  className = '', 
  width = 48, 
  height = 48 
}: LogoProps) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <img
        src="/IMG-20250514-WA0001.jpg"
        alt="Hands of Help Logo"
        width={width}
        height={height}
        className="w-full h-full rounded-full object-cover"
        loading="eager"
      />
    </div>
  );
};

export default Logo; 