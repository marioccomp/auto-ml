import { Button, Heading, Label, Text } from '@primer/react'

import { ThemeToggle } from '../../../components/theme/ThemeToggle'
import './ErrorScreen.css'

export type ErrorScreenAction = {
  label: string
  href?: string
  onSelect?: () => void
  variant?: 'default' | 'primary' | 'invisible'
}

export type ErrorScreenMeta = {
  label: string
  value: string
}

type ErrorScreenProps = {
  statusCode: string
  eyebrow?: string
  title: string
  description: string
  details?: string
  actions?: ErrorScreenAction[]
  meta?: ErrorScreenMeta[]
}

function selectAction(action: ErrorScreenAction) {
  if (action.onSelect) {
    action.onSelect()
    return
  }

  if (action.href) {
    window.location.assign(action.href)
  }
}

export function ErrorScreen({
  statusCode,
  eyebrow = 'Algo saiu do esperado',
  title,
  description,
  details,
  actions = [],
  meta = [],
}: ErrorScreenProps) {
  return (
    <main className="error-screen">
      <ThemeToggle />

      <section className="error-screen__shell" aria-labelledby="error-screen-title">
        <div className="error-screen__copy">
          <Label className="error-screen__label">{eyebrow}</Label>
          <Text as="p" className="error-screen__status">
            {statusCode}
          </Text>
          <Heading as="h1" className="error-screen__title" id="error-screen-title">
            {title}
          </Heading>
          <Text as="p" className="error-screen__description">
            {description}
          </Text>

          {actions.length > 0 ? (
            <div className="error-screen__actions">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  className="error-screen__action"
                  type="button"
                  variant={action.variant ?? 'default'}
                  onClick={() => selectAction(action)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="error-screen__diagnostic" aria-label="Detalhes do erro">
          <div className="error-screen__diagnostic-header">
            <span className="error-screen__signal" aria-hidden="true" />
            <Text as="p" className="error-screen__diagnostic-title">
              Diagnostico
            </Text>
          </div>

          {details ? (
            <Text as="p" className="error-screen__details">
              {details}
            </Text>
          ) : null}

          {meta.length > 0 ? (
            <dl className="error-screen__meta">
              {meta.map((item) => (
                <div className="error-screen__meta-row" key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </aside>
      </section>
    </main>
  )
}
