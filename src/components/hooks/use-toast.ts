import { useState } from 'react';

import { ReactNode } from 'react';

interface Toast {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
  id: string;
  action?: ReactNode;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function toast({ 
    title, 
    description, 
    variant = 'default',
    action 
  }: { 
    title: string; 
    description: string; 
    variant?: 'default' | 'destructive';
    action?: ReactNode;
  }) {
    const toast: Toast = {
      title,
      description,
      variant,
      action,
      id: Math.random().toString(36).substr(2, 9)
    };
    setToasts(prev => [...prev, toast]);
  }

  return { toasts, toast };
}
