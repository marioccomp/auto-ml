import type { AuthRouteMode } from '../../app/routes'

export type AuthMode = AuthRouteMode

export type AuthFeedback = {
  variant: 'success' | 'guest'
  message: string
}
