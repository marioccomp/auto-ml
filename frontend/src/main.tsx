import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@primer/primitives/dist/css/functional/themes/light.css'
import { BaseStyles, ThemeProvider } from '@primer/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/queryClient'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BaseStyles>
          <App />
        </BaseStyles>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
