import { AuthPage } from './pages/auth/AuthPage'
import { RegressionPage } from './pages/home/regression/RegressionPage'
import { routes } from './app/routes'

function App() {
  if (window.location.pathname === routes.regression) {
    return <RegressionPage />
  }

  return <AuthPage />
}

export default App
