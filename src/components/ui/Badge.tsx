import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'brand' | 'gray' | 'amber'

const tones: Record<Tone, string> = {
  brand: 'border border-[#343439] bg-[#1a1a1d] text-zinc-300',
  gray: 'border border-[#303036] bg-[#17171a] text-zinc-300',
  amber: 'border border-[#343439] bg-[#202024] text-zinc-200',
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