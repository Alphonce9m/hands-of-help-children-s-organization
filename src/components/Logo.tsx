'use client';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={`w-12 h-12 rounded-full overflow-hidden ${className}`}>
      <img
        src="/IMG-20250514-WA0001.jpg"
        alt="Hands of Help Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Logo; 