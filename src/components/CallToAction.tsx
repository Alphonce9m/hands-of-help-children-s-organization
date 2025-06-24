'use client';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface CallToActionProps {
  title: string;
  description: string;
  buttons: {
    text: string;
    href: string;
    variant: ButtonVariant;
  }[];
  className?: string;
}

export default function CallToAction({
  title,
  description,
  buttons,
  className,
}: CallToActionProps) {
  return (
    <section className={cn('py-20 px-4', className)}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button) => (
            <div key={button.href} className={cn(
              'inline-block',
              button.variant === 'primary' &&
                'bg-primary text-white hover:bg-primary/90',
              button.variant === 'outline' &&
                'border-2 border-primary text-primary hover:bg-primary/10',
              button.variant === 'ghost' &&
                'text-primary hover:bg-gray-100'
            )}>
              <a
                href={button.href}
                className="block px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {button.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
