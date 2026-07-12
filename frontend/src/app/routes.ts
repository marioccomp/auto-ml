export const routes = {
  root: '/',
  login: '/login',
  register: '/register',
} as const

export const navigationChangeEvent = 'auto-ml:navigation'

export type AuthRouteMode = 'login' | 'register'

export function getAuthModeFromPathname(pathname: string): AuthRouteMode | null {
  switch (pathname) {
    case routes.login:
      return 'login'
    case routes.register:
      return 'register'
    default:
      return null
  }
}

export function navigateTo(pathname: string, options?: { replace?: boolean }) {
  if (window.location.pathname === pathname) {
    return
  }

  if (options?.replace) {
    window.history.replaceState(null, '', pathname)
  } else {
    window.history.pushState(null, '', pathname)
  }

  window.dispatchEvent(new Event(navigationChangeEvent))
}
