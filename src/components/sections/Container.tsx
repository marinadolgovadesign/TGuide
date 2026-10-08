import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Page gutter: 16 → 32 → 48 → 96 px at 375 / 768 / 1024 / 1440, centred at 1440. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-16 md:px-32 lg:px-48 2xl:px-96', className)}>{children}</div>
}
