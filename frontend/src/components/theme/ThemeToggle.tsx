import { useEffect, useState } from 'react'
import { SegmentedControl } from '@primer/react'

type ThemeMode = 'light' | 'dark'

const storageKey = 'auto-ml-theme'

function getInitialTheme(): ThemeMode {
  const savedTheme = window.localStorage.getItem(storageKey)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  function handleThemeChange(index: number) {
    setTheme(index === 0 ? 'light' : 'dark')
  }

  return (
    <div className="fixed top-[var(--space-4)] right-[var(--space-4)] z-[1] max-[480px]:top-[var(--space-3)] max-[480px]:right-[var(--space-3)] [&>:first-child]:!border-[var(--color-border)] [&>:first-child]:!bg-[var(--color-segment-bg)] [&>:first-child]:shadow-[var(--shadow-sm)] [&>:first-child_button]:!text-[var(--color-segment-text)] [&>:first-child_span]:!text-[var(--color-segment-text)] [&>:first-child_button[aria-checked='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[aria-current='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[aria-pressed='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[aria-selected='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[data-selected='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[data-selected]]:!bg-[var(--color-segment-active-bg)]">
      <SegmentedControl aria-label="Tema" size="small" onChange={handleThemeChange}>
        <SegmentedControl.Button selected={theme === 'light'}>Claro</SegmentedControl.Button>
        <SegmentedControl.Button selected={theme === 'dark'}>Escuro</SegmentedControl.Button>
      </SegmentedControl>
    </div>
  )
}
