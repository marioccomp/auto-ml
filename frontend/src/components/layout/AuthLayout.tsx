import type { ReactNode } from 'react'

import { ThemeToggle } from '../theme/ThemeToggle'
import './AuthLayout.css'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="auth-layout">
      <ThemeToggle />
      <section className="auth-layout__panel" aria-label="Autenticacao">
        {children}
      </section>
    </main>
  )
}
