import { AuthLayout } from '../../components/layout/AuthLayout'
import { AuthForm } from '../../features/auth/components/AuthForm'
import type { AuthMode } from '../../features/auth/types'

type AuthPageProps = {
  mode: AuthMode
}

export function AuthPage({ mode }: AuthPageProps) {
  return (
    <AuthLayout>
      <AuthForm mode={mode} />
    </AuthLayout>
  )
}
