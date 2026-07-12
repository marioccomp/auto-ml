import { AuthLayout } from '../../components/layout/AuthLayout'
import { AuthForm } from '../../features/auth/components/AuthForm'

export function AuthPage() {
  return (
    <AuthLayout>
      <AuthForm />
    </AuthLayout>
  )
}
