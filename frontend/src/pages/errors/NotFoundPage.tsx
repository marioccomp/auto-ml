import { navigateTo, routes } from '../../app/routes'
import { ErrorScreen } from '../../features/errors/components/ErrorScreen'

export function NotFoundPage() {
  const path = window.location.pathname || '/'

  return (
    <ErrorScreen
      statusCode="404"
      eyebrow="Not found"
      title="Pagina nao encontrada"
      description="Nao encontramos o caminho solicitado. Confira a URL ou volte para a tela inicial."
      details="A rota nao esta cadastrada na aplicacao atual."
      actions={[
        {
          label: 'Ir para login',
          onSelect: () => navigateTo(routes.login),
          variant: 'primary',
        },
        {
          label: 'Recarregar',
          onSelect: () => window.location.reload(),
        },
      ]}
      meta={[
        {
          label: 'Status',
          value: '404 Not Found',
        },
        {
          label: 'Rota',
          value: path,
        },
      ]}
    />
  )
}
