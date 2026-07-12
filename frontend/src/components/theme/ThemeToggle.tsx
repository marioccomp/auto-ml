import { useEffect, useState } from 'react'
import { SegmentedControl } from '@primer/react'

import './ThemeToggle.css'

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
    <div className="theme-toggle">
      <SegmentedControl aria-label="Tema" size="small" onChange={handleThemeChange}>
        <SegmentedControl.Button selected={theme === 'light'}>Claro</SegmentedControl.Button>
        <SegmentedControl.Button selected={theme === 'dark'}>Escuro</SegmentedControl.Button>
      </SegmentedControl>
    </div>
  )
}
