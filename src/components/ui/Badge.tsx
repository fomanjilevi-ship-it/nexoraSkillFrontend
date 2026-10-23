import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'brand' | 'gray' | 'green' | 'amber'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700',
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-100 text-green-700',
  amber: 'bg-amber-100 text-amber-800',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export default function Badge({ tone = 'gray', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-block rounded-md px-2 py-0.5 text-xs font-semibold', tones[tone], className)}
      {...props}
    />
  )
}