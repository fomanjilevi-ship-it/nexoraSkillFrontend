import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Fusionne des classes Tailwind sans conflit
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'EUR') {
  if (price === 0) return 'Gratuit'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(price)
}