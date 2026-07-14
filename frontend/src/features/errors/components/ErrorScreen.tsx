import { Button, Heading, Label, Text } from '@primer/react'

import { ThemeToggle } from '../../../components/theme/ThemeToggle'

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

const screenClassName =
  'relative grid min-h-svh place-items-center overflow-hidden bg-[var(--color-canvas)] px-[var(--space-6)] py-[var(--space-7)] text-[var(--color-text)] [--button-default-bgColor-active:var(--color-surface-subtle)] [--button-default-bgColor-hover:var(--color-surface-muted)] [--button-default-bgColor-rest:var(--color-surface)] [--button-default-borderColor-hover:var(--color-border)] [--button-default-borderColor-rest:var(--color-border)] [--button-default-fgColor-rest:var(--color-text)] [--button-primary-bgColor-active:var(--color-action-active)] [--button-primary-bgColor-hover:var(--color-action-hover)] [--button-primary-bgColor-rest:var(--color-action)] [--button-primary-borderColor-hover:var(--color-action-border)] [--button-primary-borderColor-rest:var(--color-action-border)] [--button-primary-fgColor-rest:var(--color-action-text)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(var(--color-border-muted)_1px,transparent_1px),linear-gradient(90deg,var(--color-border-muted)_1px,transparent_1px)] before:bg-[length:64px_64px] before:opacity-[0.42] before:[mask-image:linear-gradient(to_bottom,#000_0%,transparent_70%)] after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[34%] after:bg-[linear-gradient(180deg,transparent,var(--color-surface-muted))] max-[480px]:items-start max-[480px]:px-[var(--space-4)] max-[480px]:pt-[72px] max-[480px]:pb-[var(--space-5)]'

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
    <main className={screenClassName}>
      <ThemeToggle />

      <section
        className="relative z-0 grid w-[min(100%,960px)] grid-cols-[minmax(0,1fr)_minmax(280px,360px)] items-center gap-[var(--space-7)] max-[820px]:grid-cols-1 max-[820px]:gap-[var(--space-6)]"
        aria-labelledby="error-screen-title"
      >
        <div className="grid min-w-0 gap-[var(--space-4)] motion-safe:animate-[error-screen-enter_260ms_ease-out_both]">
          <Label className="w-fit !border-[var(--color-danger-border)] !bg-[var(--color-danger-muted)] !text-[var(--color-danger)]">
            {eyebrow}
          </Label>
          <Text
            as="p"
            className="m-0 text-[8.5rem] leading-[0.82] font-bold tracking-normal text-[var(--color-text)] max-[480px]:text-[5.5rem]"
          >
            {statusCode}
          </Text>
          <Heading
            as="h1"
            className="m-0 max-w-[620px] text-4xl leading-[1.12] tracking-normal text-[var(--color-text)] max-[480px]:text-[1.75rem]"
            id="error-screen-title"
          >
            {title}
          </Heading>
          <Text
            as="p"
            className="m-0 max-w-[560px] text-base leading-[1.6] text-[var(--color-text-muted)]"
          >
            {description}
          </Text>

          {actions.length > 0 ? (
            <div className="flex flex-wrap gap-[var(--space-3)] pt-[var(--space-2)] max-[480px]:grid">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  className="min-w-[132px] justify-center motion-safe:transition-[transform,background-color,border-color] motion-safe:duration-150 hover:motion-safe:-translate-y-px max-[480px]:w-full"
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

        <aside
          className="grid gap-[var(--space-4)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5)] text-[var(--color-text)] shadow-[var(--shadow-lg)] motion-safe:animate-[error-screen-enter_260ms_ease-out_80ms_both] motion-safe:transition-[transform,box-shadow] motion-safe:duration-150 hover:motion-safe:-translate-y-0.5 max-[820px]:max-w-[560px] max-[480px]:p-[var(--space-4)]"
          aria-label="Detalhes do erro"
        >
          <div className="flex items-center gap-[var(--space-3)]">
            <span
              className="h-2.5 w-2.5 flex-none rounded-full bg-[var(--color-danger)] shadow-[0_0_0_5px_var(--color-danger-muted)]"
              aria-hidden="true"
            />
            <Text as="p" className="m-0 font-semibold text-[var(--color-text)]">
              Diagnostico
            </Text>
          </div>

          {details ? (
            <Text
              as="p"
              className="m-0 text-[0.9375rem] leading-[1.55] text-[var(--color-text-muted)]"
            >
              {details}
            </Text>
          ) : null}

          {meta.length > 0 ? (
            <dl className="m-0 grid">
              {meta.map((item) => (
                <div
                  className="grid gap-[var(--space-1)] border-t border-[var(--color-border-muted)] py-[var(--space-3)] first:border-t-0 first:pt-0 last:pb-0"
                  key={item.label}
                >
                  <dt className="text-xs font-semibold tracking-normal text-[var(--color-text-muted)] uppercase">
                    {item.label}
                  </dt>
                  <dd className="m-0 [overflow-wrap:anywhere] font-mono text-sm leading-[1.45] text-[var(--color-text)]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </aside>
      </section>
    </main>
  )
}
