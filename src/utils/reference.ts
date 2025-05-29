/**
 * Generates a unique reference number for donations
 * Format: DON-YYYYMMDD-XXXXX
 * Where XXXXX is a random 5-digit number
 */
export function generateReference(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  
  return `DON-${year}${month}${day}-${random}`;
} 