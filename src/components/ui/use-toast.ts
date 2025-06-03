import { useState } from 'react';

interface Toast {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
  id: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function toast({ title, description, variant = 'default' }: { title: string; description: string; variant?: 'default' | 'destructive' }) {
    const toast: Toast = {
      title,
      description,
      variant,
      id: Math.random().toString(36).substr(2, 9)
    };
    setToasts(prev => [...prev, toast]);
  }

  return { toasts, toast };
}
