import { classNames } from '@/lib/classNames';

export function cn(...classes: string[]): string {
  return classNames(...classes);
}

export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Handle different input formats
  if (digits.startsWith('254')) {
    return digits;
  } else if (digits.startsWith('0')) {
    return `254${digits.slice(1)}`;
  } else if (digits.length === 9) {
    return `254${digits}`;
  }
  
  return digits;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-3])|(?:4[5-9])|(?:5[7-9])|(?:6[0-8])|(?:9[0-9]))[0-9]{6})$/;
  return phoneRegex.test(phone);
}