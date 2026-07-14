import type { ReactNode } from 'react'

import { ThemeToggle } from '../theme/ThemeToggle'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-svh place-items-center bg-[var(--color-canvas)] p-[var(--space-6)] max-[480px]:items-start max-[480px]:p-[var(--space-4)]">
      <ThemeToggle />
      <section className="w-[min(100%,420px)]" aria-label="Autenticacao">
        {children}
      </section>
    </main>
  )
}
