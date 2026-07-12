import { useEffect, useState } from 'react'

import { getAuthModeFromPathname, navigateTo, navigationChangeEvent, routes } from './app/routes'
import { AuthPage } from './pages/auth/AuthPage'
import { RegressionPage } from './pages/home/regression/RegressionPage'
import { NotFoundPage } from './pages/errors/NotFoundPage'

function getCurrentPathname() {
  return window.location.pathname
}

function App() {
  const [pathname, setPathname] = useState(getCurrentPathname)

  useEffect(() => {
    function handleLocationChange() {
      setPathname(getCurrentPathname())
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener(navigationChangeEvent, handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener(navigationChangeEvent, handleLocationChange)
    }
  }, [])

  useEffect(() => {
    if (pathname === routes.root) {
      navigateTo(routes.login, { replace: true })
    }
  }, [pathname])

  if (pathname === routes.root) {
    return null
  }

  const authMode = getAuthModeFromPathname(pathname)

  if (authMode) {
    return <AuthPage mode={authMode} />
  }

  if (pathname === routes.regression) {
    return <RegressionPage />
  }

  return <NotFoundPage />
}

export default App
